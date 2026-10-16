# AGENTS.md: orkstage-site

Guide for AI coding agents and the developers working with them.

## What this repository is

orkstage.io: the marketing site (English and Brazilian Portuguese) and the documentation
(English), built with Next.js 16 and Fumadocs. Every page is prerendered at build time: by default
as a **static export** (`out/`, served with `public/.htaccess`), or as a Next.js server on Vercel
and Hostinger's Node.js web apps (see Deploying). Keep pages free of request time code so both
modes keep working.

| Path | What lives there |
|---|---|
| `app/(en)`, `app/(pt)` | Marketing pages per language (`/` and `/pt-br/`) |
| `content/docs/` | Documentation in MDX, ordered by the `meta.json` files |
| `components/`, `lib/` | Shared UI, SEO helpers (metadata, JSON-LD, sitemap) |
| `openapi/orkstage.json` | API document downloaded from a running API; `content/docs/developer/api-reference/` is generated from it |
| `scripts/` | `check-prose.mjs`, `check-i18n.mjs`, `check-site.mjs` (links and anchors), `refresh-openapi.mjs`, `refresh-changelog.mjs`, `generate-api-reference.mjs`, `fix-segment-files.mjs` |
| `public/.htaccess` | HTTPS and apex redirects, directory pages, 404, security headers, caching |

## Commands

The site is its own pnpm workspace. `packageManager` pins pnpm 11 on purpose (Hostinger's
corepack cannot start pnpm 12); pnpm 12 switches to it automatically.

```bash
pnpm install
pnpm dev                 # http://localhost:3100
pnpm typecheck           # also runs check:i18n and check:prose
pnpm build               # static export to out/
pnpm check:site          # after build: every link and anchor resolves
pnpm openapi:refresh     # with the API running on http://localhost:4000
pnpm changelog:refresh   # latest CHANGELOG.md sections of each repository, for What's new
```

## Writing rules (enforced by `check:prose`)

These apply to every page, in both languages:

- No em dashes or en dashes, no " - " used as punctuation, no hyphenated prose words (write
  "open source", "multicloud", "read only"). Hyphens are fine in code, identifiers, flags, file
  names, URLs and proper names.
- No ellipsis characters, arrows, curly quotes or emoji. No buzzwords (seamless, robust, leverage,
  unlock, empower, delve). Sentence case headings.
- Do not claim features that do not exist. Providers other than AWS are documented as preview and
  disabled by default until tested on live accounts.
- Docs pages need a `title` and `description` in the frontmatter within the checker's length
  limits; marketing pages keep both languages in sync (`check:i18n`).

## Content conventions

- Facts come from the code: template fields from `orkstage/packages/templates/src/schema.ts`,
  provider fields from `orkstage/packages/contracts/src/providers.ts` and each
  `orkstage/packages/cloud-<provider>/README.md`, endpoints from the OpenAPI document.
- Link with absolute paths and a trailing slash (`/docs/providers/`); `check:site` verifies them.
- Code samples must work as written (copy them from a real run when possible).
- Diagrams are Mermaid code blocks (` ```mermaid `), rendered in the browser by
  `components/mermaid.tsx`; prefer them to ASCII art, and keep their labels in the writing rules.
- Console screenshots live in `public/screenshots/` and come from `pnpm screenshots` in
  orkstage-dev (`docs/screenshots.md` there), never from a real account. Reference them as
  `![Alt text](/screenshots/<name>.png)` with alt text that says what the screen shows.

## Deploying

Two build modes in `next.config.mjs`: `export` (default, static files in `out/`) and `server`
(Vercel, or `SITE_OUTPUT=server`). CI builds on every push to `main` and, when green, commits
`out/` to the `hostinger` branch for Hostinger's static Git deployment. Hostinger's Node.js web app
instead builds `main` as a standalone server with output directory `.next`; never set `distDir`,
and keep `nodeLinker: hoisted` (pnpm symlinks break Hostinger's copy of the server). Vercel is
prepared in `vercel.json` but not in use. Details in the README.

## Git workflow

Branch, pull request, squash merge when CI (`build`) is green, then bump the pin in `orkstage-dev`.
