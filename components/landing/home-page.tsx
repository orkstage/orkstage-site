import { Activity, ArrowRight, Check, Coins, FileSearch, GitCompareArrows, type LucideIcon, ShieldCheck, Stamp } from 'lucide-react';
import type { ReactNode } from 'react';
import { JsonLd } from '@/components/json-ld';
import { PlanText, TemplateExcerpt, TerminalSession, Window } from '@/components/landing/artifacts';
import { Topology } from '@/components/landing/topology';
import { Rich } from '@/components/rich';
import { LocaleHint, SiteFooter, SiteHeader, SkipLink } from '@/components/site/chrome';
import { getMessages, type Locale } from '@/lib/i18n';
import { landingJsonLd } from '@/lib/seo';
import { links } from '@/lib/shared';

/**
 * The landing page, rendered once per locale (app/(en)/page.tsx and app/(pt)/pt-br/page.tsx).
 * Server components only; the one client island is the language hint. Links are plain anchors:
 * the docs use another root layout, so client side navigation would not apply anyway. All copy comes from the
 * locale dictionary; product output inside the artifacts stays as the product prints it.
 */
export function HomePage({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  const docsLang = locale === 'en' ? undefined : 'en';
  const features: [LucideIcon, { title: string; text: string }][] = [
    [ShieldCheck, m.features.items.policies],
    [Coins, m.features.items.cost],
    [Stamp, m.features.items.approvals],
    [Activity, m.features.items.operations],
    [GitCompareArrows, m.features.items.drift],
    [FileSearch, m.features.items.automation],
  ];
  return (
    <div className="bg-obsidian text-ink [color-scheme:dark]">
      <JsonLd data={landingJsonLd(locale)} />
      <SkipLink locale={locale} />
      <SiteHeader locale={locale} />

      <main id="main">
        {/* Hero */}
        <section aria-labelledby="hero-title" className="bg-grid relative overflow-hidden">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 pb-16 pt-14 sm:px-6 md:pt-20 lg:grid-cols-12 lg:gap-12 lg:pb-24">
            <div className="lg:col-span-6">
              <p className="flex flex-wrap items-center gap-2.5 text-[13px] text-ink-muted">
                <a
                  href={links.roadmap}
                  hrefLang={docsLang}
                  title={m.hero.alpha}
                  className="rounded-full border border-forge/50 bg-forge/10 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-forge hover:bg-forge/15"
                >
                  {m.hero.badge}
                </a>
                <span>{m.hero.eyebrow}</span>
              </p>
              <h1 id="hero-title" className="mt-5 font-display text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[3.4rem]">
                {m.hero.title}
              </h1>
              <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-ink-muted sm:text-lg">{m.hero.lead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryLink href={links.quickstart} hrefLang={docsLang}>
                  {m.hero.primary}
                  <ArrowRight size={16} aria-hidden />
                </PrimaryLink>
                <SecondaryLink href={links.github}>{m.hero.secondary}</SecondaryLink>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-ink-muted">
                {[m.hero.points.license, m.hero.points.hosting, m.hero.points.engine].map((point) => (
                  <li key={point} className="flex items-center gap-1.5">
                    <Check size={14} aria-hidden className="text-mint" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-[60ch] text-[12.5px] leading-relaxed text-ink-subtle">{m.hero.alpha}</p>
            </div>
            <div className="min-w-0 lg:col-span-6">
              <TerminalSession label={m.hero.terminalLabel} tag={m.tags.cliPreview} />
              <p className="mt-3 font-mono text-[11.5px] text-ink-subtle">{m.hero.terminalNote}</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <Section id="how" label={m.how.label} title={m.how.title} intro={m.how.intro}>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[m.how.steps.describe, m.how.steps.plan, m.how.steps.deploy, m.how.steps.operate].map((step, i) => (
              <li key={step.title} className="rounded-lg border border-hairline bg-slate-1/60 p-5">
                <p className="font-mono text-[12px] text-mint">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="min-w-0">
              <TemplateExcerpt label={m.how.templateLabel} />
            </div>
            <div className="min-w-0">
              <PlanText label={m.how.planLabel} />
            </div>
          </div>
        </Section>

        {/* Placement */}
        <Section id="placement" label={m.placement.label} title={m.placement.title} intro={m.placement.intro}>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-7">
              <Topology title={m.placement.topologyTitle} description={m.placement.topologyDescription} />
            </div>
            <div className="lg:col-span-5">
              <h3 className="font-display text-lg font-semibold">{m.placement.providersTitle}</h3>
              <dl className="mt-4 space-y-4 text-[14.5px] leading-relaxed">
                <div>
                  <dt>
                    <Tag tone="mint">{m.placement.availableLabel}</Tag>
                  </dt>
                  <dd className="mt-1.5 text-ink-muted">{m.placement.available}</dd>
                </div>
                <div>
                  <dt>
                    <Tag>{m.placement.previewLabel}</Tag>
                  </dt>
                  <dd className="mt-1.5 text-ink-muted">{m.placement.preview}</dd>
                </div>
              </dl>
              <p className="mt-6 border-t border-hairline pt-5 text-[14px] leading-relaxed text-ink-subtle">{m.placement.connectivity}</p>
            </div>
          </div>
        </Section>

        {/* Governance and operations */}
        <Section id="features" label={m.features.label} title={m.features.title}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(([FeatureIcon, item]) => (
              <li key={item.title} className="rounded-lg border border-hairline bg-slate-1/60 p-6">
                <span className="inline-flex size-9 items-center justify-center rounded-md border border-hairline-strong bg-obsidian text-mint">
                  <FeatureIcon size={18} aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-[17px] font-semibold">{item.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Editions */}
        <Section id="editions" label={m.editions.label} title={m.editions.title} intro={m.editions.intro}>
          <div className="grid gap-4 md:grid-cols-2">
            <Edition
              name={m.editions.community.name}
              price={m.editions.community.price}
              summary={m.editions.community.summary}
              items={m.editions.community.items.map((text) => [text, null] as const)}
              cta={
                <PrimaryLink href={links.quickstart} hrefLang={docsLang}>
                  {m.editions.community.cta}
                </PrimaryLink>
              }
              highlight
            />
            <Edition
              name={m.editions.enterprise.name}
              price={m.editions.enterprise.price}
              summary={m.editions.enterprise.summary}
              items={[
                ...m.editions.enterprise.available.map((text) => [text, <Tag key="a" tone="mint">{m.tags.available}</Tag>] as const),
                ...m.editions.enterprise.planned.map((text) => [text, <Tag key="p">{m.tags.planned}</Tag>] as const),
              ]}
              cta={<SecondaryLink href={links.contact}>{m.editions.enterprise.cta}</SecondaryLink>}
            />
          </div>
          <p className="mt-6 text-[14px]">
            <a href={links.editions} hrefLang={docsLang} className="inline-flex items-center gap-1.5 text-mint underline-offset-4 hover:underline">
              {m.editions.compare}
              <ArrowRight size={14} aria-hidden />
            </a>
          </p>
        </Section>

        {/* Get started */}
        <Section id="start" label={m.start.label} title={m.start.title} intro={m.start.intro}>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-7">
              <Window title="shell" meta={m.start.windowMeta}>
                <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[1.7] text-ink" aria-label={m.start.commandLabel}>
                  <span className="block">
                    <span className="select-none text-mint">$ </span>git clone https://github.com/orkstage/orkstage &amp;&amp; cd orkstage
                  </span>
                  <span className="block">
                    <span className="select-none text-mint">$ </span>docker compose -f infra/local/docker-compose.yml \
                  </span>
                  <span className="block">{'    --profile platform --profile aws-emulator up -d --build --wait'}</span>
                </pre>
              </Window>
              <p className="mt-3 text-[13px] text-ink-subtle">{m.start.note}</p>
              <div className="mt-6">
                <PrimaryLink href={links.quickstart} hrefLang={docsLang}>
                  {m.start.cta}
                  <ArrowRight size={16} aria-hidden />
                </PrimaryLink>
              </div>
            </div>
            <aside className="rounded-lg border border-hairline bg-slate-1/60 p-6 lg:col-span-5">
              <h3 className="font-display text-lg font-semibold">{m.start.roadmapTitle}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{m.start.roadmapText}</p>
              <a href={links.roadmap} hrefLang={docsLang} className="mt-4 inline-flex items-center gap-1.5 text-[14px] text-mint underline-offset-4 hover:underline">
                {m.start.roadmapLink}
                <ArrowRight size={14} aria-hidden />
              </a>
            </aside>
          </div>
        </Section>
      </main>

      <SiteFooter locale={locale} />
      <LocaleHint locale={locale} />
    </div>
  );
}

/* Primitives */

function Section({ id, label, title, intro, children }: { id: string; label: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-hairline">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 md:py-24">
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-mint">{label}</p>
        <h2 id={`${id}-title`} className="mt-3 max-w-[24ch] font-display text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.4rem]">
          {title}
        </h2>
        {intro ? (
          <p className="mt-4 max-w-[64ch] text-[16.5px] leading-relaxed text-ink-muted">
            <Rich text={intro} codeClassName="font-mono text-[15px] text-ink" />
          </p>
        ) : null}
        <div className="mt-10 md:mt-12">{children}</div>
      </div>
    </section>
  );
}

function PrimaryLink({ href, hrefLang, children }: { href: string; hrefLang?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      hrefLang={hrefLang}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-mint px-5 text-[15px] font-semibold text-obsidian transition-colors hover:bg-[#33f5af] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
    >
      {children}
    </a>
  );
}

function SecondaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-hairline-strong px-5 text-[15px] font-medium text-ink transition-colors hover:border-ink-subtle hover:bg-slate-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
    >
      {children}
    </a>
  );
}

function Tag({ children, tone = 'muted' }: { children: ReactNode; tone?: 'muted' | 'mint' }) {
  const tones = {
    muted: 'border-hairline-strong text-ink-muted',
    mint: 'border-mint/40 text-mint',
  } as const;
  return <span className={`inline-flex items-center rounded border px-1.5 py-px font-mono text-[10.5px] uppercase tracking-wider ${tones[tone]}`}>{children}</span>;
}

function Edition({
  name,
  price,
  summary,
  items,
  cta,
  highlight = false,
}: {
  name: string;
  price: string;
  summary: string;
  items: readonly (readonly [string, ReactNode])[];
  cta: ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className={`flex flex-col rounded-lg border p-6 sm:p-8 ${highlight ? 'border-mint/40 bg-slate-1' : 'border-hairline bg-slate-1/60'}`}>
      <h3 className="font-display text-2xl font-semibold">{name}</h3>
      <p className="mt-1 font-mono text-[12.5px] text-ink-subtle">{price}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{summary}</p>
      <ul className="mt-6 flex-1 space-y-3 text-[14.5px]">
        {items.map(([text, tag]) => (
          <li key={text} className="flex gap-2.5">
            <Check size={16} aria-hidden className="mt-0.5 shrink-0 text-mint" />
            <span className="flex flex-wrap items-center gap-2 text-ink">
              {text} {tag}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8">{cta}</div>
    </div>
  );
}
