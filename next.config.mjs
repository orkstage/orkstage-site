import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/**
 * Two build modes, same pages (every route is prerendered at build time in both):
 *
 * - `export` (default): plain files in `out/`, served by Hostinger from `public_html` with
 *   `public/.htaccess`, or by S3 + CloudFront (infra/). `trailingSlash` makes every route a
 *   `<route>/index.html`, which static hosts serve without rewrites per page.
 * - `server`: a Next.js server. Used on Vercel (detected) and when `SITE_OUTPUT=server`. Hostinger's
 *   Node.js web apps always build this way: they import this file and replace `output` with
 *   `'standalone'`, so `distDir` must stay `.next` there, and they do not need `SITE_OUTPUT`.
 *
 * The headers and redirects below are defined in both modes: a Next.js server (Hostinger's Node.js
 * app, Vercel) applies them, and a static export ignores them with a build warning, because
 * `public/.htaccess` does the same job there.
 */
const mode = process.env.SITE_OUTPUT ?? (process.env.VERCEL ? 'server' : 'export');

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
];

/** @type {import('next').NextConfig} */
const config = {
  ...(mode === 'export' ? { output: 'export' } : {}),
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  // Two root layouts (app/(en) and app/(pt)) need one global 404 page: app/global-not-found.tsx.
  experimental: { globalNotFound: true },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.orkstage.io' }],
        destination: 'https://orkstage.io/:path*',
        permanent: true,
      },
      // The CLI install scripts from orkstage-cli main, which install the newest release (as in .htaccess).
      ...['install.sh', 'install.ps1'].map((file) => ({
        source: `/${file}`,
        destination: `https://raw.githubusercontent.com/orkstage/orkstage-cli/main/scripts/${file}`,
        permanent: false,
      })),
    ];
  },
};

export default withMDX(config);
