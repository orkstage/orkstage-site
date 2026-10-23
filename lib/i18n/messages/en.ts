/**
 * English copy of the marketing pages (landing, 404, language UI, metadata, OG image).
 * `pt-br.ts` must have exactly the same keys: the type below enforces it at typecheck and
 * `pnpm check:i18n` compares both dictionaries and checks the writing rules on every value.
 * Text between backticks renders as inline code (see components/rich.tsx).
 * Product output shown in the landing artifacts (terminal, plan, events) is code and stays in
 * components/landing/artifacts.tsx, untranslated.
 */
export const en = {
  meta: {
    title: 'OrkStage: open source multicloud control plane',
    description:
      'Describe an environment once, place each resource on the cloud that fits it, review plan, policies and cost, then deploy with OpenTofu. Open source.',
    ogImageAlt: 'OrkStage: orchestrate every cloud from one stage. Open source multicloud control plane.',
    notFoundTitle: 'Page not found',
    notFoundDescription: 'This address does not match any page on orkstage.io. The documentation and the home page link to everything on the site.',
  },
  og: {
    headline: 'Orchestrate every cloud from one stage.',
    subline: 'Open source multicloud control plane. Template, plan, deploy, operate.',
    footer: 'Open source multicloud control plane.',
  },
  common: {
    skipToContent: 'Skip to content',
    homeLabel: 'OrkStage home',
    mainNav: 'Main',
    footerNav: 'Footer',
    menu: 'Menu',
    docs: 'Docs',
    api: 'API',
    enterprise: 'Enterprise',
    github: 'GitHub',
    star: 'Star',
    starLabel: 'Star orkstage/orkstage on GitHub',
    starsUnit: 'stars',
    getStarted: 'Get started',
    docsLanguageNote: 'The documentation is written in English.',
  },
  language: {
    label: 'Language',
    suggestion: 'This page is also available in English.',
    suggestionAction: 'Read in English',
    dismiss: 'Dismiss',
    suggestionRegion: 'Language suggestion',
  },
  tags: {
    available: 'available',
    planned: 'planned',
    cliPreview: 'CLI preview',
  },
  hero: {
    badge: 'Alpha',
    eyebrow: 'Open source multicloud control plane',
    title: 'Orchestrate every cloud from one stage.',
    lead: 'OrkStage deploys and runs your environments on the clouds you choose. Describe an environment once, review its plan, policies and cost, and let OpenTofu apply it while OrkStage watches health, incidents and drift.',
    primary: 'Get started',
    secondary: 'View on GitHub',
    points: {
      license: 'Open source, AGPL-3.0',
      hosting: 'Runs on your infrastructure',
      engine: 'Powered by OpenTofu',
    },
    alpha: 'Alpha: the platform is being validated, features roll out gradually and APIs may still change.',
    terminalLabel: 'Terminal session: ork scan, ork template push and ork deploy --wait',
    terminalNote: 'Output shortened. The ork CLI builds from source today; signed binaries are not released yet.',
  },
  how: {
    label: 'How it works',
    title: 'From a template to a running environment.',
    intro: 'Nothing touches a cloud until someone reviews the plan, and the worker applies exactly the plan that was approved.',
    steps: {
      describe: {
        title: 'Describe',
        text: 'A YAML template states what the environment needs: services, Postgres, cache, queue, storage, ingress and DNS. No provider names inside.',
      },
      plan: {
        title: 'Plan',
        text: 'Each resource maps to a concrete cloud service. The plan shows policy results and an approximate monthly cost before anything exists.',
      },
      deploy: {
        title: 'Deploy',
        text: 'OpenTofu applies the approved plan as a dependency graph, in parallel where it can, with retries. Risky production changes wait for approval.',
      },
      operate: {
        title: 'Operate',
        text: 'Health checks, incidents, status pages and drift detection keep watching every instance after the deploy.',
      },
    },
    templateLabel: 'Template excerpt',
    planLabel: 'Deployment plan as text',
  },
  placement: {
    label: 'Multicloud',
    title: 'Place every resource where it belongs.',
    intro:
      'Choose placement per resource, not per environment. Put the database on Azure and the rest on AWS, or keep everything in one account. The template does not change.',
    topologyTitle: 'Topology of one instance across AWS, Azure and OCI',
    topologyDescription:
      'The AWS slot primary holds dns, ingress, api, worker, registry and network. The Azure slot data holds the PostgreSQL database. The OCI slot storage holds object storage. The api and worker reach the database over TLS with a source allowlist; the api reaches storage over TLS.',
    providersTitle: 'Providers',
    availableLabel: 'Available',
    available: 'AWS, provisioned for real with OpenTofu, and a simulator to try any topology without an account.',
    previewLabel: 'Preview',
    preview: 'Azure, Google Cloud, OCI, DigitalOcean, Vultr, CoreWeave, Magalu Cloud, Vercel, Render and Supabase, behind feature flags until they are validated on live accounts.',
    connectivity: 'When two resources land on different clouds, the plan shows how they connect: private network, peering, or TLS with an allowlist.',
  },
  features: {
    label: 'Built for production',
    title: 'Governance and operations come with every instance.',
    items: {
      policies: {
        title: 'Policies on every plan',
        text: 'Public databases, open storage, missing backups, unapproved regions and budgets are checked before anything is created, and every result is shown.',
      },
      cost: {
        title: 'Cost before you deploy',
        text: 'Every plan carries an approximate monthly cost per resource, from list prices. An estimate, never an invoice.',
      },
      approvals: {
        title: 'Approvals and audit',
        text: 'Production deletes, replacements and database changes wait for approval. Every change lands in an audit log that nobody can edit.',
      },
      operations: {
        title: 'Health, incidents and status pages',
        text: 'Alert rules on health and metrics open and resolve incidents. Owners hear about it in the console, by email or by webhook.',
      },
      drift: {
        title: 'Drift detection',
        text: 'Resources changed or deleted outside OrkStage are detected, and the next deploy puts them back the way the template says.',
      },
      automation: {
        title: 'Import and automate',
        text: 'The scan engine turns Terraform, CloudFormation, Kubernetes or Compose into a template. Scoped API keys, signed webhooks and the ork CLI fit your CI.',
      },
    },
  },
  editions: {
    label: 'Open core',
    title: 'Open source at the core. Enterprise when you need it.',
    intro: 'One codebase and the same images. Enterprise features turn on with a license key that works offline.',
    community: {
      name: 'Community',
      price: 'Free, AGPL-3.0',
      summary: 'The complete control plane, enough to run production on AWS.',
      items: [
        'Templates, placement, plans, policies and cost',
        'Deployments, health, incidents and status pages',
        'OIDC sign in, seven built in roles, audit log',
        'API keys, webhooks, IaC import and the ork CLI',
      ],
      cta: 'Get started',
    },
    enterprise: {
      name: 'Enterprise',
      price: 'Commercial license',
      summary: 'For organizations with compliance, identity and support requirements.',
      available: ['Audit log export (NDJSON, CSV)'],
      planned: ['SAML SSO and SCIM provisioning', 'Custom roles and approvals in several steps', 'Multiple organizations and branded status pages', 'Priority support with an SLA'],
      cta: 'Talk to us',
    },
    compare: 'Compare the editions in full',
  },
  start: {
    label: 'Get started',
    title: 'Try the whole platform on your machine.',
    intro: 'You only need Docker. One Compose command starts the API, worker, console, Postgres, Redis and a local AWS emulator.',
    windowMeta: 'local evaluation',
    commandLabel: 'Docker Compose command',
    note: 'Development mode, with the dev login and the Docker socket mounted. Use it to evaluate OrkStage, not in production.',
    cta: 'Read the quickstart',
    roadmapTitle: 'Next on the roadmap',
    roadmapText: 'AI mini agents attached to templates (security, FinOps, insights) that review plans and deployments in read only mode, with your own Anthropic, OpenAI or Gemini API key.',
    roadmapLink: 'See the roadmap',
  },
  footer: {
    tagline: 'Orchestrate every cloud from one stage.',
    product: 'Product',
    documentation: 'Documentation',
    quickstart: 'Quickstart',
    apiReference: 'API reference',
    roadmap: 'Roadmap',
    project: 'Project',
    license: 'License (AGPL-3.0)',
    discussions: 'Discussions',
    slack: 'Slack',
    security: 'Security',
    company: 'Company',
    enterprise: 'Enterprise',
    contact: 'Contact',
    legal:
      'OrkStage is open source under the GNU AGPL-3.0. Enterprise features are under the OrkStage Enterprise License. OrkStage and the OrkStage logo are trademarks of the OrkStage project.',
  },
  notFound: {
    title: 'This stage does not exist.',
    text: 'The page moved or never existed. Start from the documentation or the home page.',
    docs: 'Read the documentation',
    home: 'Go to the home page',
  },
};

export type Messages = typeof en;
