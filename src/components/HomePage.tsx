/* eslint-disable react-refresh/only-export-components -- static generation shares this page's content authority. */
import {
  Activity,
  ArrowRight,
  BookOpen,
  Boxes,
  Braces,
  FileText,
  Github,
  Layers3,
  MemoryStick,
  Plug,
  Terminal,
  Workflow,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { withLanguage, type Language, type Product } from '../routing';

export interface Capability {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  href: string;
}

export interface ProductContent {
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  command: string;
  repository: string;
  docsLabel: string;
  repositoryLabel: string;
  evidenceTitle: string;
  evidenceIntro: string;
  evidence: Array<{ label: string; value: string; detail: string }>;
  capabilitiesTitle: string;
  capabilitiesIntro: string;
  capabilityLinkLabel: string;
  capabilities: Capability[];
  architectureTitle: string;
  architectureIntro: string;
  architecture: Array<{ label: string; detail: string }>;
  quickStartTitle: string;
  quickStartIntro: string;
  quickStart: string[];
  quickStartNote: string;
  docsCta: string;
  scene: string[];
}

const icons = {
  runtime: Activity,
  tools: Wrench,
  context: MemoryStick,
  tasks: Workflow,
  integrations: Plug,
  artifacts: Boxes,
} as const;

export const content: Record<Product, Record<Language, ProductContent>> = {
  'echo-agent': {
    en: {
      eyebrow: 'Reusable Rust agent framework',
      title: 'echo-agent',
      tagline: 'Build agents from explicit, composable runtime parts.',
      description:
        'A Rust workspace for ReAct execution, tools, context, tasks, subagents, integrations, and observable event streams. Product policy stays in the application that embeds it.',
      command: 'cargo run --example demo01_tools',
      repository: 'https://github.com/EchoYue-lp/echo-agent',
      docsLabel: 'Read framework docs',
      repositoryLabel: 'Open repository',
      evidenceTitle: 'Easy to start, powerful to compose',
      evidenceIntro:
        'Runnable examples, focused crates, typed events, optional features, tests, and bilingual documentation keep the path from first run to extension explicit.',
      evidence: [
        {
          label: 'Start',
          value: 'Runnable examples',
          detail: 'Clone the repository, configure a provider, and run a checked-in example.',
        },
        {
          label: 'Compose',
          value: 'Focused crates + features',
          detail:
            'ReAct, tools, skills, state, tasks, Subagents, and integrations stay at explicit boundaries.',
        },
        {
          label: 'Learn',
          value: 'Typed APIs + bilingual docs',
          detail: 'Typed events, examples, tests, guides, and references shorten change feedback.',
        },
      ],
      capabilitiesTitle: 'Framework capabilities',
      capabilitiesIntro:
        'Every item below corresponds to code and documentation in the echo-agent workspace.',
      capabilityLinkLabel: 'Read the docs',
      capabilities: [
        {
          title: 'Simple to start',
          description:
            'Use the public builder and runnable examples to assemble and run a first agent.',
          icon: icons.runtime,
          accent: 'text-emerald-300',
          href: '/docs/getting-started',
        },
        {
          title: 'Powerful by composition',
          description:
            'Combine ReAct, typed tools, skills, memory, tasks, Subagents, and streamed events.',
          icon: icons.tools,
          accent: 'text-amber-300',
          href: '/docs/overview',
        },
        {
          title: 'Fast feedback for iteration',
          description:
            'Focused crates, feature flags, typed events, examples, and tests keep changes bounded.',
          icon: icons.context,
          accent: 'text-cyan-300',
          href: '/docs/plugin-system',
        },
        {
          title: 'Bilingual documentation',
          description:
            'Follow English and Chinese onboarding, concepts, references, and knowledge guides.',
          icon: icons.tasks,
          accent: 'text-rose-300',
          href: '/docs/knowledge-overview',
        },
        {
          title: 'Tasks and Subagents',
          description:
            'Model task graphs and delegate bounded work through one Subagent vocabulary.',
          icon: icons.integrations,
          accent: 'text-lime-300',
          href: '/docs/tasks',
        },
        {
          title: 'Open integration boundaries',
          description: 'Connect MCP, LSP, channels, hooks, and tracing through optional adapters.',
          icon: Braces,
          accent: 'text-sky-300',
          href: '/docs/mcp',
        },
      ],
      architectureTitle: 'Workspace structure',
      architectureIntro:
        'The root crate is a facade over focused packages. Applications select the parts and features they need.',
      architecture: [
        { label: 'echo-agent', detail: 'Public facade and ReAct implementation' },
        { label: 'echo-core', detail: 'Shared types and model contracts' },
        { label: 'echo-macros', detail: 'Procedural macros for framework consumers' },
        { label: 'echo-execution', detail: 'Sandbox, skills, and tool management' },
        { label: 'echo-orchestration', detail: 'Workflows, HITL, tasks, and scheduling' },
        { label: 'echo-tools', detail: 'Domain tools and built-in capabilities' },
        { label: 'echo-state', detail: 'Memory, compression, and audit facilities' },
        { label: 'echo-integration', detail: 'Providers, MCP, LSP, and channels' },
      ],
      quickStartTitle: 'Run the real example',
      quickStartIntro: 'Clone the framework and execute an example from the repository.',
      quickStart: [
        'git clone https://github.com/EchoYue-lp/echo-agent.git',
        'cd echo-agent',
        'cargo run --example demo01_tools',
      ],
      quickStartNote: 'The repository documentation covers provider setup and additional examples.',
      docsCta: 'Browse all framework documentation',
      scene: ['ThinkStart', 'ToolCall { invocation }', 'ToolResult { result }', 'FinalAnswer'],
    },
    zh: {
      eyebrow: '可复用的 Rust Agent 框架',
      title: 'echo-agent',
      tagline: '用明确、可组合的运行时部件构建 Agent。',
      description:
        '一个覆盖 ReAct 执行、工具、上下文、任务、Subagent、集成与可观测事件流的 Rust workspace。具体产品策略由接入框架的应用负责。',
      command: 'cargo run --example demo01_tools',
      repository: 'https://github.com/EchoYue-lp/echo-agent',
      docsLabel: '阅读框架文档',
      repositoryLabel: '打开代码仓库',
      evidenceTitle: '简单易上手，也能组合强大能力',
      evidenceIntro:
        '可运行示例、聚焦 crate、类型化事件、可选 feature、测试和双语文档，让首次运行到扩展实现的路径保持明确。',
      evidence: [
        {
          label: '开始',
          value: '可运行示例',
          detail: '克隆仓库、配置模型提供方，即可运行仓库内经过检查的示例。',
        },
        {
          label: '组合',
          value: '聚焦 crate + feature',
          detail: 'ReAct、工具、技能、状态、任务、Subagent 与集成都有明确边界。',
        },
        {
          label: '学习',
          value: '类型 API + 双语文档',
          detail: '类型化事件、示例、测试、指南与参考资料缩短改动反馈路径。',
        },
      ],
      capabilitiesTitle: '框架能力',
      capabilitiesIntro: '以下模块均可在 echo-agent workspace 的代码和文档中找到对应实现。',
      capabilityLinkLabel: '阅读对应文档',
      capabilities: [
        {
          title: '简单易上手',
          description: '通过公共 Builder 与可运行示例，组合并启动第一个 Agent。',
          icon: icons.runtime,
          accent: 'text-emerald-300',
          href: '/docs/getting-started',
        },
        {
          title: '通过组合获得强大能力',
          description: '组合 ReAct、类型化工具、技能、记忆、任务、Subagent 与流式事件。',
          icon: icons.tools,
          accent: 'text-amber-300',
          href: '/docs/overview',
        },
        {
          title: '降低迭代反馈成本',
          description: '聚焦 crate、feature flag、类型化事件、示例和测试让改动保持局部。',
          icon: icons.context,
          accent: 'text-cyan-300',
          href: '/docs/plugin-system',
        },
        {
          title: '完整双语文档',
          description: '阅读中英文上手指南、核心概念、参考资料与知识库。',
          icon: icons.tasks,
          accent: 'text-rose-300',
          href: '/docs/knowledge-overview',
        },
        {
          title: '任务与 Subagent',
          description: '建立任务图，并用统一的 Subagent 术语委派边界清晰的工作。',
          icon: icons.integrations,
          accent: 'text-lime-300',
          href: '/docs/tasks',
        },
        {
          title: '开放的集成边界',
          description: '通过可选适配器连接 MCP、LSP、渠道、Hook 与追踪。',
          icon: Braces,
          accent: 'text-sky-300',
          href: '/docs/mcp',
        },
      ],
      architectureTitle: 'Workspace 结构',
      architectureIntro: '根 crate 是一组聚焦 package 的门面，应用只启用自己需要的部件和 feature。',
      architecture: [
        { label: 'echo-agent', detail: '公共门面与 ReAct 实现' },
        { label: 'echo-core', detail: '共享类型与模型契约' },
        { label: 'echo-macros', detail: '面向框架复用方的过程宏' },
        { label: 'echo-execution', detail: 'Sandbox、技能与工具管理' },
        { label: 'echo-orchestration', detail: '工作流、HITL、任务与调度' },
        { label: 'echo-tools', detail: '领域工具与内置能力' },
        { label: 'echo-state', detail: '记忆、压缩与审计能力' },
        { label: 'echo-integration', detail: '模型提供方、MCP、LSP 与渠道' },
      ],
      quickStartTitle: '运行真实示例',
      quickStartIntro: '克隆框架仓库，并直接运行仓库中的示例。',
      quickStart: [
        'git clone https://github.com/EchoYue-lp/echo-agent.git',
        'cd echo-agent',
        'cargo run --example demo01_tools',
      ],
      quickStartNote: '代码仓库文档包含模型提供方配置和更多示例。',
      docsCta: '浏览全部框架文档',
      scene: ['ThinkStart', 'ToolCall { invocation }', 'ToolResult { result }', 'FinalAnswer'],
    },
  },
  eko: {
    en: {
      eyebrow: 'Local personal AI assistant',
      title: 'EKO',
      tagline: 'One capable agent, built for your own machine.',
      description:
        'EKO is the desktop, terminal, CLI, and channel application built on echo-agent. Its interfaces use the shared application core; capability parity across those interfaces is the product contract.',
      command: 'cargo run --bin echo-agent-cli',
      repository: 'https://github.com/EchoYue-lp/echo-agent-cli',
      docsLabel: 'Read EKO docs',
      repositoryLabel: 'Open repository',
      evidenceTitle: 'Purpose-built local workspaces',
      evidenceIntro:
        'Coding, data analysis, academic research, biomedical literature research, and long-horizon work are routed through explicit application profiles and inspectable local artifacts.',
      evidence: [
        {
          label: 'Work profiles',
          value: 'Code · data · research',
          detail:
            'Each profile binds relevant tools and evidence expectations through the application core.',
        },
        {
          label: 'Research trail',
          value: 'Sources + artifacts',
          detail:
            'Research connectors and workspaces keep sources, entities, citations, and outputs visible.',
        },
        {
          label: 'Long horizon',
          value: 'Budget + checkpoint + resume',
          detail:
            'Task runtime state supports scheduled, pausable, and resumable work on the local machine.',
        },
      ],
      capabilitiesTitle: 'Work EKO is designed to carry',
      capabilitiesIntro:
        'Each capability below is grounded in a production binding in the current application code. Duration and results depend on configuration, models, tools, and source availability.',
      capabilityLinkLabel: 'See implementation scope',
      capabilities: [
        {
          title: 'Coding',
          description:
            'Work with files, shells, Git, LSP, isolated worktrees, and bounded Subagent runs.',
          icon: Terminal,
          accent: 'text-amber-300',
          href: '/eko/docs/capabilities#coding',
        },
        {
          title: 'Data processing and analysis',
          description:
            'Use data workspaces and Polars-backed tools with reviewable Python or R scripts, manifests, and artifacts.',
          icon: Activity,
          accent: 'text-emerald-300',
          href: '/eko/docs/capabilities#data-analysis',
        },
        {
          title: 'Academic research',
          description:
            'Search arXiv and Semantic Scholar, work with Zotero, and retain sources in a research workspace.',
          icon: BookOpen,
          accent: 'text-cyan-300',
          href: '/eko/docs/capabilities#academic-research',
        },
        {
          title: 'Biomedical literature research',
          description:
            'Search PubMed and Europe PMC and organize biomedical entities and sources for literature synthesis, not diagnosis.',
          icon: FileText,
          accent: 'text-rose-300',
          href: '/eko/docs/capabilities#biomedical-literature-research',
        },
        {
          title: 'Tens-of-hours long-horizon tasks',
          description:
            'TaskRuntime, checkpoints, pause and resume, budgets, and scheduling support work designed to continue for hours or tens of hours.',
          icon: Workflow,
          accent: 'text-lime-300',
          href: '/eko/docs/capabilities#long-horizon-tasks',
        },
        {
          title: 'Complete local multi-interface agent',
          description:
            'TUI, GUI, CLI, and channels use the shared application core; capability parity is the product contract.',
          icon: Layers3,
          accent: 'text-sky-300',
          href: '/eko/docs/capabilities#local-application-core',
        },
      ],
      architectureTitle: 'One core, several interfaces',
      architectureIntro:
        'Interface-specific code renders events and captures input. Agent behavior remains in the shared application core.',
      architecture: [
        { label: 'echo-agent-app-core', detail: 'Product policy and shared agent-driving path' },
        { label: 'TUI', detail: 'Complete terminal interaction' },
        { label: 'Tauri GUI', detail: 'Desktop rendering and native integration' },
        { label: 'CLI', detail: 'Scriptable command-line access' },
        { label: 'Channels', detail: 'Remote interaction adapters' },
        { label: 'File + memory stores', detail: 'Local conversation and runtime state' },
      ],
      quickStartTitle: 'Start in the terminal',
      quickStartIntro: 'Clone the EKO repository and run the CLI entry point.',
      quickStart: [
        'git clone https://github.com/EchoYue-lp/echo-agent-cli.git',
        'cd echo-agent-cli',
        'cargo run --bin echo-agent-cli',
      ],
      quickStartNote:
        'Provider credentials are configured locally. Desktop setup is covered in the EKO docs.',
      docsCta: 'Browse all EKO documentation',
      scene: [
        'TaskRun { status: Running }',
        'PlanTask { dependencies: [] }',
        'SubagentRun { status: Running }',
        'FileRuntimeStateStore::save',
      ],
    },
    zh: {
      eyebrow: '本地个人超级智能助理',
      title: 'EKO',
      tagline: '在自己的机器上，使用一个完整的 Agent。',
      description:
        'EKO 是基于 echo-agent 构建的桌面、终端、CLI 与渠道应用。各交互界面使用共享应用核心，多模式能力对等是强制产品契约。',
      command: 'cargo run --bin echo-agent-cli',
      repository: 'https://github.com/EchoYue-lp/echo-agent-cli',
      docsLabel: '阅读 EKO 文档',
      repositoryLabel: '打开代码仓库',
      evidenceTitle: '面向真实任务的本地工作空间',
      evidenceIntro:
        '编码、数据分析、学术研究、医学文献研究和长程任务均由明确的应用 Profile 与可检查的本地产物承载。',
      evidence: [
        {
          label: '工作 Profile',
          value: '编码 · 数据 · 研究',
          detail: '每种 Profile 通过应用核心绑定相关工具和证据要求。',
        },
        {
          label: '研究轨迹',
          value: '来源 + 产物',
          detail: '研究连接器和工作空间保留来源、实体、引用与输出。',
        },
        {
          label: '长程运行',
          value: '预算 + 检查点 + 恢复',
          detail: '任务运行时状态支持在本机调度、暂停并恢复工作。',
        },
      ],
      capabilitiesTitle: 'EKO 面向的核心任务',
      capabilitiesIntro:
        '以下每项能力都能在当前应用代码中找到生产绑定。持续时长与结果取决于配置、模型、工具和来源可用性。',
      capabilityLinkLabel: '查看实现边界',
      capabilities: [
        {
          title: 'Coding 编码',
          description: '使用文件、Shell、Git、LSP、隔离 Worktree 与边界明确的 Subagent 运行。',
          icon: Terminal,
          accent: 'text-amber-300',
          href: '/eko/docs/capabilities#coding',
        },
        {
          title: '数据处理与分析',
          description: '使用数据工作空间和 Polars 工具，产出可审阅的 Python/R 脚本、清单与产物。',
          icon: Activity,
          accent: 'text-emerald-300',
          href: '/eko/docs/capabilities#data-analysis',
        },
        {
          title: '学术研究',
          description: '检索 arXiv 与 Semantic Scholar，连接 Zotero，并把来源保留在研究工作空间。',
          icon: BookOpen,
          accent: 'text-cyan-300',
          href: '/eko/docs/capabilities#academic-research',
        },
        {
          title: '生物医学文献研究',
          description: '检索 PubMed 与 Europe PMC，整理生物医学实体和来源，用于文献综合而非诊断。',
          icon: FileText,
          accent: 'text-rose-300',
          href: '/eko/docs/capabilities#biomedical-literature-research',
        },
        {
          title: '数十小时长程任务',
          description:
            'TaskRuntime、检查点、暂停恢复、预算与调度支持设计为持续数小时到数十小时的工作。',
          icon: Workflow,
          accent: 'text-lime-300',
          href: '/eko/docs/capabilities#long-horizon-tasks',
        },
        {
          title: '本地多界面完整体',
          description: 'TUI、GUI、CLI 与渠道使用共享应用核心；能力对等是产品契约。',
          icon: Layers3,
          accent: 'text-sky-300',
          href: '/eko/docs/capabilities#local-application-core',
        },
      ],
      architectureTitle: '一个核心，多种界面',
      architectureIntro: '界面代码只负责渲染事件与接收输入，Agent 行为保留在共享应用核心。',
      architecture: [
        { label: 'echo-agent-app-core', detail: '产品策略与共享 Agent 驱动路径' },
        { label: 'TUI', detail: '完整的终端交互' },
        { label: 'Tauri GUI', detail: '桌面渲染与原生集成' },
        { label: 'CLI', detail: '可脚本化的命令行入口' },
        { label: '渠道', detail: '远程交互适配器' },
        { label: '文件 + 内存存储', detail: '本地会话与运行时状态' },
      ],
      quickStartTitle: '从终端开始',
      quickStartIntro: '克隆 EKO 仓库并运行 CLI 入口。',
      quickStart: [
        'git clone https://github.com/EchoYue-lp/echo-agent-cli.git',
        'cd echo-agent-cli',
        'cargo run --bin echo-agent-cli',
      ],
      quickStartNote: '模型凭据保存在本地；桌面端配置请继续阅读 EKO 文档。',
      docsCta: '浏览全部 EKO 文档',
      scene: [
        'TaskRun { status: Running }',
        'PlanTask { dependencies: [] }',
        'SubagentRun { status: Running }',
        'FileRuntimeStateStore::save',
      ],
    },
  },
};

export function getHomeContent(product: Product, language: Language): ProductContent {
  return content[product][language];
}

function HeroScene({ lines }: { lines: string[] }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-y-0 left-[8%] w-px bg-white/5" />
      <div className="absolute inset-y-0 left-[50%] w-px bg-white/5" />
      <div className="absolute inset-y-0 right-[8%] w-px bg-white/5" />
      <div className="absolute top-28 right-[7%] hidden w-[42%] border-t border-white/10 pt-4 font-mono text-xs text-zinc-500 sm:block">
        {lines.map((line, index) => (
          <div key={line} className="grid grid-cols-[2rem_1fr] border-b border-white/5 py-3">
            <span className="text-zinc-700">{String(index + 1).padStart(2, '0')}</span>
            <span className="truncate">{line}</span>
          </div>
        ))}
      </div>
      <div className="absolute right-[11%] bottom-14 hidden font-mono text-[10px] text-emerald-300/35 uppercase sm:block">
        event stream / local process
      </div>
    </div>
  );
}

export default function HomePage({ language, product }: { language: Language; product: Product }) {
  const copy = getHomeContent(product, language);
  const docsPath = product === 'eko' ? '/eko/docs' : '/docs';
  const accentButton =
    product === 'eko' ? 'bg-amber-300 text-zinc-950' : 'bg-emerald-300 text-zinc-950';

  return (
    <main className="overflow-x-clip bg-[#0b0d0c] text-zinc-100">
      <section className="relative min-h-[calc(100svh-10rem)] overflow-hidden border-b border-white/10 bg-[#0b0d0c] sm:min-h-[calc(100svh-9rem)]">
        <HeroScene lines={copy.scene} />
        <div className="relative mx-auto flex min-h-[calc(100svh-10rem)] max-w-6xl items-center px-5 pt-28 pb-11 sm:min-h-[calc(100svh-9rem)] sm:px-8 sm:pt-24 sm:pb-12">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold text-zinc-400 uppercase">
              {product === 'eko' ? (
                <img
                  src="/eko-icon.png"
                  width="40"
                  height="40"
                  alt="EKO application icon"
                  className="size-10 rounded-md"
                />
              ) : (
                <span className="flex size-10 items-center justify-center rounded-md border border-emerald-300/40 bg-emerald-300/10 text-emerald-200">
                  <Braces aria-hidden="true" className="size-5" />
                </span>
              )}
              <span>{copy.eyebrow}</span>
            </div>
            <h1 className="text-5xl leading-none font-semibold text-white sm:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-tight font-medium text-zinc-200 sm:text-3xl">
              {copy.tagline}
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
              {copy.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={withLanguage(docsPath, language)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold ${accentButton} hover:brightness-110`}
              >
                <BookOpen aria-hidden="true" className="size-4" />
                {copy.docsLabel}
              </a>
              <a
                href={copy.repository}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                <Github aria-hidden="true" className="size-4" />
                {copy.repositoryLabel}
              </a>
            </div>
            <div className="mt-7 max-w-xl border-l-2 border-zinc-600 bg-black/25 px-4 py-3 font-mono text-xs text-zinc-300 sm:text-sm">
              <span className="mr-3 text-emerald-300" aria-hidden="true">
                $
              </span>
              <code className="break-all whitespace-pre-wrap">{copy.command}</code>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="product-evidence-heading"
        className="border-b border-zinc-300 bg-[#f1f0ea] text-zinc-900"
      >
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold text-emerald-800 uppercase">
              {product === 'eko' ? 'EKO / application' : 'echo-agent / framework'}
            </p>
            <h2 id="product-evidence-heading" className="mt-3 text-3xl font-semibold sm:text-4xl">
              {copy.evidenceTitle}
            </h2>
            <p className="mt-4 text-sm leading-6 text-zinc-600 sm:text-base">
              {copy.evidenceIntro}
            </p>
          </div>
          <dl className="mt-9 grid border-y border-zinc-300 md:grid-cols-3 md:divide-x md:divide-zinc-300">
            {copy.evidence.map((item) => (
              <div key={item.label} className="py-6 md:px-7 md:first:pl-0 md:last:pr-0">
                <dt className="text-xs font-bold text-zinc-500 uppercase">{item.label}</dt>
                <dd className="mt-2 font-mono text-base font-semibold text-zinc-950">
                  {item.value}
                </dd>
                <dd className="mt-2 text-sm leading-6 text-zinc-600">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="capabilities-heading"
        className="border-b border-white/10 bg-[#111411]"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-3xl">
            <h2 id="capabilities-heading" className="text-3xl font-semibold text-white sm:text-4xl">
              {copy.capabilitiesTitle}
            </h2>
            <p className="mt-4 text-sm leading-6 text-zinc-400 sm:text-base">
              {copy.capabilitiesIntro}
            </p>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {copy.capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <article
                  key={capability.title}
                  className="flex min-h-56 flex-col bg-[#111411] p-6 sm:p-7"
                >
                  <Icon aria-hidden="true" className={`size-5 ${capability.accent}`} />
                  <h3 className="mt-6 text-base font-semibold text-white">{capability.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{capability.description}</p>
                  <a
                    href={withLanguage(capability.href, language)}
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                  >
                    {copy.capabilityLinkLabel}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="architecture-heading"
        className="border-b border-white/10 bg-[#0b0d0c]"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Boxes aria-hidden="true" className="size-6 text-amber-300" />
            <h2
              id="architecture-heading"
              className="mt-5 text-3xl font-semibold text-white sm:text-4xl"
            >
              {copy.architectureTitle}
            </h2>
            <p className="mt-4 text-sm leading-6 text-zinc-400 sm:text-base">
              {copy.architectureIntro}
            </p>
          </div>
          <ol className="border-t border-white/15">
            {copy.architecture.map((item, index) => (
              <li
                key={item.label}
                className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-white/10 py-5 sm:grid-cols-[3rem_0.8fr_1.2fr]"
              >
                <span className="font-mono text-xs text-zinc-600">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <strong className="font-mono text-sm font-semibold text-zinc-100">
                  {item.label}
                </strong>
                <span className="col-start-2 text-sm leading-6 text-zinc-400 sm:col-start-auto">
                  {item.detail}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="quick-start-heading" className="bg-[#18382d]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <Terminal aria-hidden="true" className="size-6 text-amber-200" />
            <h2
              id="quick-start-heading"
              className="mt-5 text-3xl font-semibold text-white sm:text-4xl"
            >
              {copy.quickStartTitle}
            </h2>
            <p className="mt-4 text-sm leading-6 text-emerald-50/75 sm:text-base">
              {copy.quickStartIntro}
            </p>
          </div>
          <div>
            <pre className="overflow-x-auto rounded-md border border-emerald-50/20 bg-[#091511] p-5 text-xs leading-7 text-zinc-200 sm:p-6 sm:text-sm">
              <code>{copy.quickStart.map((line) => `$ ${line}`).join('\n')}</code>
            </pre>
            <p className="mt-4 text-sm leading-6 text-emerald-50/70">{copy.quickStartNote}</p>
            <a
              href={withLanguage(docsPath, language)}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-amber-200 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-100"
            >
              {copy.docsCta}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0b0d0c]" role="contentinfo">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            {product === 'eko' ? (
              <img
                src="/eko-icon.png"
                width="28"
                height="28"
                alt=""
                className="size-7 rounded-md"
              />
            ) : (
              <Braces aria-hidden="true" className="size-5 text-emerald-300" />
            )}
            <span>Echo · {copy.title}</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a className="hover:text-white" href={withLanguage(docsPath, language)}>
              {copy.docsLabel}
            </a>
            <a
              className="inline-flex items-center gap-1.5 hover:text-white"
              href={copy.repository}
              target="_blank"
              rel="noreferrer"
            >
              <Github aria-hidden="true" className="size-4" /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
