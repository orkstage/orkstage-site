// Downloads CHANGELOG.md from each versioned repository's main branch and keeps the latest
// releases in content/changelog/<repository>.md, which the "What's new" page includes. Run it
// after a release (or any time), then commit the result.
// Usage: pnpm changelog:refresh
import { mkdirSync, writeFileSync } from 'node:fs';

const REPOSITORIES = ['orkstage', 'orkstage-console', 'orkstage-cli', 'orkstage-modules'];
/** Sections kept per repository, counting Unreleased: the full history stays in each repository. */
const KEEP = 4;

mkdirSync('content/changelog', { recursive: true });
for (const repo of REPOSITORIES) {
  const url = `https://raw.githubusercontent.com/orkstage/${repo}/main/CHANGELOG.md`;
  const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) {
    console.error(`[changelog] ${url} answered HTTP ${res.status}.`);
    process.exit(1);
  }
  const text = (await res.text()).replace(/\r\n/g, '\n');
  // Sections start at "## <version>" (or "## Unreleased"); the header before the first one is dropped.
  const sections = text.split(/^(?=## )/m).filter((s) => s.startsWith('## ')).slice(0, KEEP);
  // One level down, under the repository heading of the page.
  const body = escapeHtml(sections.map((s) => s.trim().replace(/^(#{2,5}) /gm, '#$1 ')).join('\n\n'));
  const full = `https://github.com/orkstage/${repo}/blob/main/CHANGELOG.md`;
  writeFileSync(`content/changelog/${repo}.md`, `${body || '### Unreleased\n\nNothing yet.'}\n\n[Full changelog](${full})\n`);
  console.log(`[changelog] ${repo}: ${sections.length} section(s).`);
}

/** Commit titles may hold text like `<slug>`: outside code it would be raw HTML, which MDX refuses. */
function escapeHtml(markdown) {
  return markdown
    .split(/(`+[^`]*`+)/)
    .map((part, i) => (i % 2 ? part : part.replace(/</g, '&lt;')))
    .join('');
}
