/**
 * Renders the Open Graph / WhatsApp preview card and the touch icon.
 *
 *   npm run og
 *
 * Why a render step rather than a hand-made JPEG: the card is laid out in HTML,
 * so when the event name, the tagline or the brand mark changes, the team edits
 * `scripts/og-template.html` and re-runs this — no design tool round-trip.
 *
 * Output is PNG: every OG consumer that matters (WhatsApp, Facebook, LinkedIn,
 * X, Slack, iMessage) accepts it, the card is flat navy and type so it stays
 * well inside WhatsApp's size budget, and it keeps this script down to one
 * dependency — a Chromium binary, which Playwright or any CI image already has.
 *
 * Override the browser with CHROME_BIN.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'media');
const work = path.join(tmpdir(), `og-${Date.now()}`);

const FONT_CSS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36';

const firstExisting = (envVar, candidates) => {
  if (process.env[envVar] && existsSync(process.env[envVar])) return process.env[envVar];
  const found = candidates.find((c) => existsSync(c));
  if (!found) {
    throw new Error(
      `Could not find a binary for ${envVar}. Set ${envVar} to its path, or install it.`,
    );
  }
  return found;
};

/**
 * Prefer Playwright's `headless_shell`: its --window-size is the viewport
 * exactly, with no window chrome to compensate for. A full Chrome binary works
 * too — the calibration below measures whatever it reserves.
 */
const chrome = firstExisting('CHROME_BIN', [
  '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
]);

/** headless_shell is always headless and rejects nothing; full Chrome needs the flag. */
const headlessFlag = path.basename(chrome).includes('headless_shell') ? [] : ['--headless=new'];

const curl = (url, binary = false) =>
  execFileSync('curl', ['-sSL', '-A', UA, url], {
    maxBuffer: 64 * 1024 * 1024,
    encoding: binary ? 'buffer' : 'utf8',
  });

/**
 * Pull only the `latin` subset of each weight and inline it as a data URI, so
 * the render does not depend on the network reaching fonts.gstatic.com at
 * screenshot time (headless Chrome often cannot, behind a proxy).
 */
function buildEmbeddedFontCss() {
  const css = curl(FONT_CSS_URL);
  const blocks = css.split('@font-face').slice(1);
  const faces = [];

  for (const block of blocks) {
    // Google labels each block with the subset in a comment that follows it.
    const url = block.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
    const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
    const range = block.match(/unicode-range:\s*([^;]+);/)?.[1] ?? '';
    if (!url || !weight) continue;

    // The latin subset is the only one that carries basic ASCII (U+0000-00FF).
    const isLatin = range.includes('U+0000-00FF');
    if (!isLatin) continue;

    const data = curl(url, true).toString('base64');
    faces.push(
      `@font-face{font-family:'Inter';font-style:normal;font-weight:${weight};font-display:block;src:url(data:font/woff2;base64,${data}) format('woff2');}`,
    );
  }

  if (faces.length === 0) throw new Error('No Inter latin subsets were resolved from Google Fonts.');
  console.log(`  · embedded ${faces.length} Inter weights`);
  return `<style>${faces.join('')}</style>`;
}

/**
 * Headless Chrome's --window-size counts window chrome, so the real viewport
 * comes out shorter than asked for — about 87px on this build, but it is not a
 * constant across platforms or Chrome versions. --screenshot captures the
 * VIEWPORT, so getting an exact 1200×630 card means asking for a window that is
 * 630 + chrome tall.
 *
 * Rather than hard-coding a magic number that silently crops the footer when it
 * is wrong, measure it once: load a page that reports its own innerHeight and
 * read it back through --dump-dom.
 */
function measureWindowChrome() {
  const probePath = path.join(work, 'probe.html');
  const requested = 800;
  writeFileSync(
    probePath,
    `<!doctype html><html><body><script>document.body.dataset.h=window.innerHeight;</scr` +
      `ipt></body></html>`,
  );

  const dom = execFileSync(
    chrome,
    [
      ...headlessFlag,
      '--no-sandbox',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=1200,${requested}`,
      '--virtual-time-budget=2000',
      '--dump-dom',
      `file://${probePath}`,
    ],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 4 * 1024 * 1024 },
  );

  const inner = Number(dom.match(/data-h="(\d+)"/)?.[1]);
  if (!inner || inner > requested) {
    console.warn('  · could not measure window chrome; assuming 0');
    return 0;
  }

  const chromeHeight = requested - inner;
  console.log(
    chromeHeight === 0
      ? '  · viewport matches --window-size exactly'
      : `  · compensating for ${chromeHeight}px of window chrome`,
  );
  return chromeHeight;
}

let windowChrome = 0;

/**
 * `scale` is the device pixel ratio. 1 keeps the OG card at its native 1200×630
 * and the file small; the icon is rendered at 2 and declared at half size so it
 * stays sharp on retina home screens.
 */
function shoot(htmlPath, pngPath, width, height, scale = 1) {
  execFileSync(
    chrome,
    [
      ...headlessFlag,
      '--no-sandbox',
      '--disable-gpu',
      '--hide-scrollbars',
      `--force-device-scale-factor=${scale}`,
      `--window-size=${width},${height + windowChrome}`,
      '--virtual-time-budget=5000',
      `--screenshot=${pngPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: ['ignore', 'ignore', 'ignore'] },
  );
}

const ICON_TEMPLATE = (fonts) => `<!doctype html><html><head><meta charset="utf-8">${fonts}
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:180px;height:180px}
  body{font-family:'Inter',system-ui,sans-serif;background:#0A1A2F;
    background-image:radial-gradient(ellipse 90% 80% at 30% 0%, rgba(42,90,138,0.55), transparent 65%);
    display:flex;align-items:center;justify-content:center;-webkit-font-smoothing:antialiased}
  .mark{width:108px;height:108px;border:2px solid rgba(255,255,255,0.3);border-radius:20px;
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px}
  .yh{font-size:40px;font-weight:600;letter-spacing:-0.03em;color:#fff;line-height:1}
  .rule{width:24px;height:2px;background:#D9924B;border-radius:2px}
</style></head><body>
  <div class="mark"><div class="yh">YH</div><div class="rule"></div></div>
</body></html>`;

/** Read a PNG's IHDR and fail loudly if the render came out the wrong size. */
function assertSize(file, width, height) {
  const buf = readFileSync(path.join(outDir, file));
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  if (w !== width || h !== height) {
    throw new Error(`${file} rendered at ${w}×${h}, expected ${width}×${height}.`);
  }
}

/* ── Run ─────────────────────────────────────────────────────────────────── */

mkdirSync(work, { recursive: true });
mkdirSync(outDir, { recursive: true });

try {
  console.log('→ calibrating the headless viewport…');
  windowChrome = measureWindowChrome();

  console.log('→ fetching Inter…');
  const fonts = buildEmbeddedFontCss();

  console.log('→ rendering the Open Graph card (1200×630)…');
  const ogHtml = readFileSync(path.join(root, 'scripts', 'og-template.html'), 'utf8').replace(
    '<!--FONTS-->',
    fonts,
  );
  const ogHtmlPath = path.join(work, 'og.html');
  writeFileSync(ogHtmlPath, ogHtml);
  shoot(ogHtmlPath, path.join(outDir, 'og-pulmo-mentor-pft.png'), 1200, 630, 1);

  console.log('→ rendering the touch icon (180×180 @2x)…');
  const iconHtmlPath = path.join(work, 'icon.html');
  writeFileSync(iconHtmlPath, ICON_TEMPLATE(fonts));
  shoot(iconHtmlPath, path.join(outDir, 'apple-touch-icon.png'), 180, 180, 2);

  assertSize('og-pulmo-mentor-pft.png', 1200, 630);
  assertSize('apple-touch-icon.png', 360, 360);

  const kb = (f) => (statSync(path.join(outDir, f)).size / 1024).toFixed(0);
  console.log(
    `\n✓ og-pulmo-mentor-pft.png (${kb('og-pulmo-mentor-pft.png')} KB) · apple-touch-icon.png (${kb('apple-touch-icon.png')} KB)`,
  );
  console.log('  WhatsApp caches previews aggressively — bump the ?v= query in index.html');
  console.log('  if you re-render this after the link has already been shared.');
} finally {
  rmSync(work, { recursive: true, force: true });
}
