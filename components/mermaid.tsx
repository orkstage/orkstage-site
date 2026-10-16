'use client';

import { useTheme } from 'next-themes';
import { Suspense, use, useEffect, useId, useState } from 'react';

/**
 * A Mermaid diagram. Docs pages write a ```mermaid code block, which `remarkMdxMermaid` (lib/source.ts)
 * turns into this component. It renders in the browser, after hydration, so prerendered pages stay
 * static; mermaid itself is loaded only on pages that have a diagram.
 */
export function Mermaid({ chart }: { chart: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const placeholder = <div className="my-6 min-h-24" aria-hidden />;
  if (!mounted) return placeholder;
  return (
    <Suspense fallback={placeholder}>
      <MermaidContent chart={chart} />
    </Suspense>
  );
}

const cache = new Map<string, Promise<unknown>>();

function cached<T>(key: string, create: () => Promise<T>): Promise<T> {
  if (!cache.has(key)) cache.set(key, create());
  return cache.get(key) as Promise<T>;
}

function MermaidContent({ chart }: { chart: string }) {
  const id = useId().replaceAll(':', '');
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'neutral';
  const { default: mermaid } = use(cached('mermaid', () => import('mermaid')));
  // Wider labels than the default 200px, so steps read on one line and diagrams stay short.
  mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', fontFamily: 'inherit', theme, flowchart: { wrappingWidth: 320 } });
  const { svg } = use(cached(`${theme}:${chart}`, () => mermaid.render(`mermaid${id}`, chart.replaceAll('\\n', '\n'))));
  return <div className="not-prose my-6 flex justify-center overflow-x-auto [&_svg]:max-w-full" dangerouslySetInnerHTML={{ __html: svg }} />;
}
