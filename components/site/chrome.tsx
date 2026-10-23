import { Menu, Star, X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Rich } from '@/components/rich';
import { formatStars, repoStars } from '@/lib/github';
import { type BilingualPage, getMessages, type Locale, localeConfig, localePath } from '@/lib/i18n';
import { links } from '@/lib/shared';
import { LanguageSuggestion } from './language-suggestion';
import { LanguageSwitcher } from './language-switcher';

/** Docs are English only: links to them from another locale say so with hreflang. */
function docsLang(locale: Locale) {
  return locale === 'en' ? undefined : 'en';
}

export function SkipLink({ locale }: { locale: Locale }) {
  return (
    <a href="#main" className="sr-only z-50 rounded bg-mint px-3 py-2 font-medium text-obsidian focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
      {getMessages(locale).common.skipToContent}
    </a>
  );
}

export async function SiteHeader({ locale, path = '/' }: { locale: Locale; path?: BilingualPage }) {
  const m = getMessages(locale);
  const hl = docsLang(locale);
  const stars = await repoStars();
  const nav: [string, string][] = [
    [m.common.docs, links.docs],
    [m.common.api, links.apiReference],
    [m.common.enterprise, links.enterprise],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-obsidian/90 backdrop-blur supports-[backdrop-filter]:bg-obsidian/75">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-2 px-4 sm:gap-3 sm:px-6">
        <a href={localePath(locale, '/')} aria-label={m.common.homeLabel} className="shrink-0 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint">
          <Logo height={28} forceDark alt="" />
        </a>
        <nav aria-label={m.common.mainNav} className="ml-6 hidden md:block">
          <ul className="flex items-center gap-1 text-[14px]">
            {nav.map(([label, href]) => (
              <li key={href}>
                <a href={href} hrefLang={hl} className="rounded px-3 py-2 text-ink-muted transition-colors hover:text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <GitHubStars locale={locale} stars={stars} />
          <LanguageSwitcher locale={locale} path={path} className="hidden sm:block" />
          <a
            href={links.quickstart}
            hrefLang={hl}
            className="hidden h-9 items-center whitespace-nowrap rounded-md bg-mint px-3.5 text-[14px] font-semibold text-obsidian transition-colors hover:bg-[#33f5af] sm:inline-flex"
          >
            {m.common.getStarted}
          </a>
          <details className="group relative md:hidden">
            <summary
              aria-label={m.common.menu}
              className="flex size-9 cursor-pointer list-none items-center justify-center rounded-md border border-hairline-strong text-ink-muted hover:text-ink [&::-webkit-details-marker]:hidden"
            >
              <Menu size={18} aria-hidden className="group-open:hidden" />
              <X size={18} aria-hidden className="hidden group-open:block" />
            </summary>
            <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-hairline-strong bg-slate-1 p-2 shadow-2xl shadow-black/50">
              <ul className="text-[15px]">
                {[...nav, [m.common.github, links.github] as [string, string]].map(([label, href]) => (
                  <li key={href}>
                    <a href={href} hrefLang={href.startsWith('/') ? hl : undefined} className="block rounded-md px-3 py-2.5 text-ink-muted hover:bg-slate-2 hover:text-ink">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex items-center justify-between gap-2 border-t border-hairline px-1 pt-3 sm:hidden">
                <LanguageSwitcher locale={locale} path={path} />
                <a href={links.quickstart} hrefLang={hl} className="inline-flex h-9 items-center rounded-md bg-mint px-3.5 text-[14px] font-semibold text-obsidian">
                  {m.common.getStarted}
                </a>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

/** "Star | 1.2K" button for the main repository; without a count when GitHub could not be read. */
function GitHubStars({ locale, stars }: { locale: Locale; stars: number | null }) {
  const m = getMessages(locale);
  const count = stars === null ? null : formatStars(stars, localeConfig[locale].htmlLang);
  const label = count === null ? m.common.starLabel : `${m.common.starLabel} (${count} ${m.common.starsUnit})`;
  return (
    <a
      href={links.github}
      aria-label={label}
      className="inline-flex h-9 items-center overflow-hidden rounded-md border border-hairline-strong text-[13px] text-ink-muted transition-colors hover:border-ink-subtle hover:text-ink"
    >
      <span className="flex items-center gap-1.5 px-2.5">
        <GitHubMark />
        <span className="hidden lg:inline">{m.common.star}</span>
      </span>
      {count === null ? null : (
        <span className="flex h-full items-center gap-1 border-l border-hairline-strong bg-slate-1 px-2.5 font-medium tabular-nums text-ink">
          <Star size={13} aria-hidden className="fill-mint text-mint" />
          {count}
        </span>
      )}
    </a>
  );
}

function GitHubMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" className="shrink-0">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export function SiteFooter({ locale, path = '/' }: { locale: Locale; path?: BilingualPage }) {
  const m = getMessages(locale);
  const f = m.footer;
  const hl = docsLang(locale);
  const cols: { title: string; items: [string, string][] }[] = [
    { title: f.product, items: [[f.documentation, links.docs], [f.quickstart, links.quickstart], [f.apiReference, links.apiReference], [f.roadmap, links.roadmap]] },
    { title: f.project, items: [[m.common.github, links.github], [f.discussions, links.discussions], [f.slack, links.slack], [f.license, links.license], [f.security, links.security]] },
    { title: f.company, items: [[f.enterprise, links.enterprise], [f.contact, links.contact]] },
  ];
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo height={30} forceDark />
          <p className="mt-4 max-w-sm text-[14px] text-ink-muted">{f.tagline}</p>
          <LanguageSwitcher locale={locale} path={path} className="mt-6 inline-block" />
        </div>
        <nav aria-label={m.common.footerNav} className="grid grid-cols-2 gap-8 text-[14px] sm:grid-cols-3 md:col-span-7">
          {cols.map((col) => (
            <div key={col.title}>
              <h2 className="font-mono text-[11.5px] font-normal uppercase tracking-[0.14em] text-ink-subtle">{col.title}</h2>
              <ul className="mt-3 space-y-2">
                {col.items.map(([label, href]) => (
                  <li key={label}>
                    {href.startsWith('/') ? (
                      <a href={href} hrefLang={hl} className="text-ink-muted hover:text-ink">
                        {label}
                      </a>
                    ) : (
                      <a href={href} className="text-ink-muted hover:text-ink">
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="space-y-2 text-[12.5px] text-ink-subtle md:col-span-12">
          {locale !== 'en' ? <p>{m.common.docsLanguageNote}</p> : null}
          <p>
            <Rich text={f.legal} codeClassName="font-mono" />
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Suggests the other locale when the browser language points there (client only). */
export function LocaleHint({ locale, path = '/' }: { locale: Locale; path?: BilingualPage }) {
  const target: Locale = locale === 'en' ? 'pt-BR' : 'en';
  const t = getMessages(target).language;
  return (
    <LanguageSuggestion
      currentLocale={locale}
      targetHref={localePath(target, path)}
      targetLang={target}
      text={t.suggestion}
      action={t.suggestionAction}
      dismiss={t.dismiss}
      region={t.suggestionRegion}
    />
  );
}
