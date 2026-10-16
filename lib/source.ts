import { loader } from 'fumadocs-core/source';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { remarkMdxMermaid } from 'fumadocs-core/mdx-plugins';
import { applyMdxPreset } from 'fumadocs-mdx/config';
import { defineDocs } from 'fumadocs-mdx/macro';
import { openapiPlugin } from 'fumadocs-openapi/server';
import { docsRoute } from './shared';

const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    // ```mermaid code blocks become <Mermaid /> (components/mermaid.tsx); the default plugins stay.
    mdxOptions: applyMdxPreset({ remarkPlugins: (plugins) => [remarkMdxMermaid, ...plugins] }),
  },
  meta: { schema: metaSchema },
});

/**
 * Docs source. Top-level folders are sidebar tabs (`"root": true` in their meta.json). The
 * Get started index is served at /docs itself, so the docs home is the Introduction and its tab
 * is active there (Formbricks-style information architecture).
 */
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  slugs: (file, next) => (file.path === 'get-started/index.mdx' ? [] : next()),
  plugins: [openapiPlugin()],
});
