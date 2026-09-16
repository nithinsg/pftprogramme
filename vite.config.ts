import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { talks } from './src/data/talks';

/**
 * Writes sitemap.xml and robots.txt into the build output, derived from the
 * same `src/data/talks.ts` the site renders from — so a recording added to the
 * library is in the sitemap on the next deploy with no second edit.
 */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'pulmo-seo-files',
    apply: 'build',
    closeBundle() {
      const origin = siteUrl.replace(/\/$/, '');
      const today = new Date().toISOString().slice(0, 10);

      const routes = [
        { path: '/', priority: '1.0', changefreq: 'weekly' },
        { path: '/recordings', priority: '0.9', changefreq: 'weekly' },
        { path: '/capabilities', priority: '0.8', changefreq: 'monthly' },
        { path: '/ecmo', priority: '0.8', changefreq: 'monthly' },
        { path: '/interventions', priority: '0.8', changefreq: 'monthly' },
        { path: '/lung-transplant', priority: '0.8', changefreq: 'monthly' },
        { path: '/about', priority: '0.7', changefreq: 'monthly' },
        { path: '/doctors', priority: '0.7', changefreq: 'monthly' },
        // /event-screen and /recording-spec are internal and stay out of the index.
        ...talks.map((talk) => ({
          path: `/recordings/${talk.id}`,
          priority: '0.6',
          changefreq: 'monthly',
        })),
      ];

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

      const robots = `User-agent: *
Allow: /

# Internal production pages — working documents for the team, not for delegates.
Disallow: /event-screen
Disallow: /recording-spec

Sitemap: ${origin}/sitemap.xml
`;

      const out = path.resolve(__dirname, 'dist');
      writeFileSync(path.join(out, 'sitemap.xml'), sitemap);
      writeFileSync(path.join(out, 'robots.txt'), robots);
      console.log(`\n  sitemap.xml  ${routes.length} URLs at ${origin}`);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = env.VITE_SITE_URL || 'https://pulmomentor.example.org';

  return {
    plugins: [react(), seoFiles(siteUrl)],
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
