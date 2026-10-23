import type { Messages } from './en';

/**
 * Português do Brasil. Same keys as `en.ts` (enforced by the `Messages` type and by
 * `pnpm check:i18n`). Written for engineers and tech managers: "você", and the English terms
 * Brazilian teams actually use (deploy, pipeline, template, CLI, API, state, drift).
 * The slogan does not translate "stage" as "palco": the brand keeps its name and the Portuguese
 * line says what it means (one place for every cloud).
 */
export const ptBR: Messages = {
  meta: {
    title: 'OrkStage: control plane multicloud e open source',
    description:
      'Descreva o ambiente uma vez, coloque cada recurso na nuvem certa, revise plano, políticas e custo e faça o deploy com OpenTofu. Open source.',
    ogImageAlt: 'OrkStage: orquestre todas as suas nuvens em um só lugar. Control plane multicloud e open source.',
    notFoundTitle: 'Página não encontrada',
    notFoundDescription: 'Este endereço não corresponde a nenhuma página de orkstage.io. A documentação e a página inicial levam a todo o conteúdo do site.',
  },
  og: {
    headline: 'Orquestre todas as suas nuvens em um só lugar.',
    subline: 'Control plane multicloud e open source. Template, plano, deploy e operação.',
    footer: 'Control plane multicloud e open source.',
  },
  common: {
    skipToContent: 'Pular para o conteúdo',
    homeLabel: 'Página inicial do OrkStage',
    mainNav: 'Principal',
    footerNav: 'Rodapé',
    menu: 'Menu',
    docs: 'Docs',
    api: 'API',
    enterprise: 'Enterprise',
    github: 'GitHub',
    star: 'Star',
    starLabel: 'Dar uma estrela ao orkstage/orkstage no GitHub',
    starsUnit: 'estrelas',
    getStarted: 'Começar',
    docsLanguageNote: 'A documentação está em inglês.',
  },
  language: {
    label: 'Idioma',
    suggestion: 'Esta página também está disponível em português.',
    suggestionAction: 'Ler em português',
    dismiss: 'Fechar',
    suggestionRegion: 'Sugestão de idioma',
  },
  tags: {
    available: 'disponível',
    planned: 'planejado',
    cliPreview: 'CLI preview',
  },
  hero: {
    badge: 'Alpha',
    eyebrow: 'Control plane multicloud e open source',
    title: 'Orquestre todas as suas nuvens em um só lugar.',
    lead: 'O OrkStage faz o deploy e opera seus ambientes nas nuvens que você escolher. Descreva o ambiente uma vez, revise plano, políticas e custo, e deixe o OpenTofu aplicar enquanto o OrkStage acompanha saúde, incidentes e drift.',
    primary: 'Começar',
    secondary: 'Ver no GitHub',
    points: {
      license: 'Open source, AGPL-3.0',
      hosting: 'Roda na sua infraestrutura',
      engine: 'Movido a OpenTofu',
    },
    alpha: 'Alpha: a plataforma está em validação, as funcionalidades chegam aos poucos e as APIs ainda podem mudar.',
    terminalLabel: 'Sessão de terminal: ork scan, ork template push e ork deploy --wait',
    terminalNote: 'Saída resumida. Hoje você compila o CLI ork a partir do código; ainda não há binários assinados.',
  },
  how: {
    label: 'Como funciona',
    title: 'Do template ao ambiente rodando.',
    intro: 'Nada chega à nuvem antes de alguém revisar o plano, e o worker aplica exatamente o plano que foi aprovado.',
    steps: {
      describe: {
        title: 'Descrever',
        text: 'Um template YAML diz do que o ambiente precisa: serviços, Postgres, cache, fila, storage, ingress e DNS. Sem nome de provedor.',
      },
      plan: {
        title: 'Planejar',
        text: 'Cada recurso vira um serviço concreto da nuvem. O plano mostra o resultado das políticas e um custo mensal aproximado antes de qualquer coisa existir.',
      },
      deploy: {
        title: 'Fazer o deploy',
        text: 'O OpenTofu aplica o plano aprovado como um grafo de dependências, em paralelo quando possível e com retentativas. Mudanças de risco em produção esperam aprovação.',
      },
      operate: {
        title: 'Operar',
        text: 'Health checks, incidentes, páginas de status e detecção de drift continuam acompanhando cada instância depois do deploy.',
      },
    },
    templateLabel: 'Trecho de template',
    planLabel: 'Plano de deploy em texto',
  },
  placement: {
    label: 'Multicloud',
    title: 'Coloque cada recurso onde ele faz mais sentido.',
    intro:
      'O placement é definido por recurso, e não por ambiente. Coloque o banco no Azure e o resto na AWS, ou mantenha tudo em uma conta só. O template não muda.',
    topologyTitle: 'Topologia de uma instância distribuída entre AWS, Azure e OCI',
    topologyDescription:
      'O slot primary, na AWS, contém dns, ingress, api, worker, registry e network. O slot data, no Azure, contém o banco PostgreSQL. O slot storage, na OCI, contém o object storage. A api e o worker acessam o banco por TLS com allowlist de origem; a api acessa o storage por TLS.',
    providersTitle: 'Provedores',
    availableLabel: 'Disponível',
    available: 'AWS, com provisionamento real via OpenTofu, e um simulador para testar qualquer topologia sem conta.',
    previewLabel: 'Preview',
    preview: 'Azure, Google Cloud, OCI, DigitalOcean, Vultr, CoreWeave, Magalu Cloud, Vercel, Render e Supabase, atrás de feature flags até serem validados em contas reais.',
    connectivity: 'Quando dois recursos ficam em nuvens diferentes, o plano mostra como eles se conectam: rede privada, peering ou TLS com allowlist.',
  },
  features: {
    label: 'Pronto para produção',
    title: 'Governança e operação vêm com cada instância.',
    items: {
      policies: {
        title: 'Políticas em todo plano',
        text: 'Banco público, storage aberto, backup ausente, região não aprovada e orçamento são verificados antes de qualquer recurso existir, e todos os resultados aparecem.',
      },
      cost: {
        title: 'Custo antes do deploy',
        text: 'Todo plano traz um custo mensal aproximado por recurso, com base em preços de lista. Uma estimativa, nunca uma fatura.',
      },
      approvals: {
        title: 'Aprovação e auditoria',
        text: 'Deletes, substituições e mudanças em banco de dados em produção esperam aprovação. Cada mudança vai para um audit log que ninguém edita.',
      },
      operations: {
        title: 'Saúde, incidentes e páginas de status',
        text: 'Regras de alerta sobre saúde e métricas abrem e resolvem incidentes. Os responsáveis ficam sabendo pelo console, por email ou por webhook.',
      },
      drift: {
        title: 'Detecção de drift',
        text: 'Recursos alterados ou apagados fora do OrkStage são detectados, e o próximo deploy os deixa de volta como o template define.',
      },
      automation: {
        title: 'Importação e automação',
        text: 'O scan engine transforma Terraform, CloudFormation, Kubernetes ou Compose em um template. API keys com escopo, webhooks assinados e o CLI ork se encaixam no seu CI.',
      },
    },
  },
  editions: {
    label: 'Open core',
    title: 'Open source no núcleo. Enterprise quando você precisar.',
    intro: 'Um só código e as mesmas imagens. Os recursos Enterprise são ativados por uma chave de licença que funciona offline.',
    community: {
      name: 'Community',
      price: 'Gratuito, AGPL-3.0',
      summary: 'O control plane completo, suficiente para rodar produção na AWS.',
      items: [
        'Templates, placement, planos, políticas e custo',
        'Deploys, saúde, incidentes e páginas de status',
        'Login OIDC, sete papéis nativos, audit log',
        'API keys, webhooks, importação de IaC e o CLI ork',
      ],
      cta: 'Começar',
    },
    enterprise: {
      name: 'Enterprise',
      price: 'Licença comercial',
      summary: 'Para organizações com exigências de compliance, identidade e suporte.',
      available: ['Exportação do audit log (NDJSON, CSV)'],
      planned: ['SSO com SAML e provisionamento SCIM', 'Papéis customizados e aprovações em várias etapas', 'Várias organizações e páginas de status com a sua marca', 'Suporte prioritário com SLA'],
      cta: 'Fale com a gente',
    },
    compare: 'Ver a comparação completa entre as edições',
  },
  start: {
    label: 'Começar',
    title: 'Teste a plataforma inteira na sua máquina.',
    intro: 'Você só precisa de Docker. Um comando do Compose sobe a API, o worker, o console, Postgres, Redis e um emulador local da AWS.',
    windowMeta: 'avaliação local',
    commandLabel: 'Comando do Docker Compose',
    note: 'Modo de desenvolvimento, com o dev login e o socket do Docker montado. Serve para avaliar o OrkStage, não para produção.',
    cta: 'Ler o quickstart',
    roadmapTitle: 'Próximo no roadmap',
    roadmapText: 'Mini agentes de IA vinculados aos templates (segurança, FinOps, insights) que analisam planos e deploys apenas em modo leitura, usando a sua própria API key da Anthropic, OpenAI ou Gemini.',
    roadmapLink: 'Ver o roadmap',
  },
  footer: {
    tagline: 'Orquestre todas as suas nuvens em um só lugar.',
    product: 'Produto',
    documentation: 'Documentação',
    quickstart: 'Quickstart',
    apiReference: 'Referência da API',
    roadmap: 'Roadmap',
    project: 'Projeto',
    license: 'Licença (AGPL-3.0)',
    discussions: 'Discussions',
    slack: 'Slack',
    security: 'Segurança',
    company: 'Empresa',
    enterprise: 'Enterprise',
    contact: 'Contato',
    legal:
      'O OrkStage é open source sob a GNU AGPL-3.0. Os recursos Enterprise ficam sob a OrkStage Enterprise License. OrkStage e o logo do OrkStage são marcas do projeto OrkStage.',
  },
  notFound: {
    title: 'Esta página não existe.',
    text: 'A página mudou de endereço ou nunca existiu. Comece pela documentação (em inglês) ou pela página inicial.',
    docs: 'Ler a documentação',
    home: 'Ir para a página inicial',
  },
};
