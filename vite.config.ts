import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { writeFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Writes sitemap.xml and robots.txt into the build output, derived from the
 * same `src/data/talks.ts` the site renders from — so a recording added to the
 * library is in the sitemap on the next deploy with no second edit.
 */
function seoFiles(siteUrl: string, indexable: boolean): Plugin {
  return {
    name: 'pulmo-seo-files',
    apply: 'build',
    closeBundle() {
      const origin = siteUrl.replace(/\/$/, '');
      const today = new Date().toISOString().slice(0, 10);

      // This is a single-page site: one public URL. /event-screen and
      // /recording-spec are internal production documents and stay out.
      const routes = [{ path: '/', priority: '1.0', changefreq: 'weekly' }];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url>\n    <loc>${origin}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

      // A staging deployment carries a real hospital's name next to placeholder
      // content. It is disallowed wholesale until VITE_ROBOTS=index at go-live.
      const robots = indexable
        ? `User-agent: *
Allow: /

# Internal production pages — working documents for the team, not for delegates.
Disallow: /event-screen
Disallow: /recording-spec

Sitemap: ${origin}/sitemap.xml
`
        : `# Staging / review deployment — not for indexing.
User-agent: *
Disallow: /
`;

      const out = path.resolve(__dirname, 'dist');
      writeFileSync(path.join(out, 'sitemap.xml'), sitemap);
      writeFileSync(path.join(out, 'robots.txt'), robots);
      console.log(
        `\n  sitemap.xml  ${routes.length} URLs at ${origin}` +
          (indexable ? '' : '  ·  robots.txt: Disallow / (staging, not indexable)'),
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = env.VITE_SITE_URL || 'https://pulmomentor.example.org';
  const indexable = env.VITE_ROBOTS === 'index';

  return {
    plugins: [react(), seoFiles(siteUrl, indexable)],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Keep the landing-page bundle small: React and the router are shared
          // across every route, and each page below is code-split by React.lazy
          // in src/App.tsx.
          manualChunks: { react: ['react', 'react-dom', 'react-router-dom'] },
        },
      },
    },
  };
});
