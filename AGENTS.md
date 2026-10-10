# AGENTS.md: orkstage-site

Guide for AI coding agents and the developers working with them.

## What this repository is

orkstage.io: the marketing site (English and Brazilian Portuguese) and the documentation
(English), built with Next.js 16 and Fumadocs as a **static export** (`output: 'export'`, written
to `out/`). Nothing runs on a server; Hostinger serves the files with `public/.htaccess`.

| Path | What lives there |
|---|---|
| `app/(en)`, `app/(pt)` | Marketing pages per language (`/` and `/pt-br/`) |
| `content/docs/` | Documentation in MDX, ordered by the `meta.json` files |
| `components/`, `lib/` | Shared UI, SEO helpers (metadata, JSON-LD, sitemap) |
| `openapi/orkstage.json` | API document downloaded from a running API; `content/docs/developer/api-reference/` is generated from it |
| `scripts/` | `check-prose.mjs`, `check-i18n.mjs`, `check-site.mjs` (links and anchors), `refresh-openapi.mjs`, `generate-api-reference.mjs`, `fix-segment-files.mjs` |
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

## Deploying

CI builds on every push to `main` and, when green, commits `out/` to the `hostinger` branch.
Hostinger either serves that branch (no build there) or builds `main` itself with output directory
`out` and a static site type; see the README.

## Git workflow

Branch, pull request, squash merge when CI (`build`) is green, then bump the pin in `orkstage-dev`.
