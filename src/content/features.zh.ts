// ── echo-agent (框架) 内容 ──────────────────────────────────────

export const frameworkHeroZh = {
  title: "echo-agent",
  tagline: "用 Rust 构建生产级 AI Agent",
  subtitle: "一个综合性 Rust 框架，提供 ReAct 引擎、DAG 任务编排、自检改进化循环、67+ 内置工具（MCP/LSP/Web/Data/Git）和多 Agent 编排",
  badges: ["开源", "MIT 许可", "Rust 1.95+"],
  cta: {
    primary: "查看文档",
    secondary: "GitHub 仓库",
  },
  ctaUrls: {
    primary: "https://github.com/EchoYue-lp/echo-agent/tree/main/docs/zh",
    secondary: "https://github.com/EchoYue-lp/echo-agent",
  },
  stats: [
    { value: "67+", label: "内置工具" },
    { value: "70", label: "可运行示例" },
    { value: "40+", label: "文档主题" },
    { value: "8", label: "Crate 模块" },
  ],
};

export const featuresZh = {
  title: "框架特性",
  subtitle: "用于构建生产级 AI Agent 的综合 Rust 框架",
  features: [
    {
      icon: "🦀",
      title: "Rust 原生性能",
      description: "零成本抽象、编译时类型安全、tokio 异步运行时。比 Python 框架快 10-100 倍，内存安全无数据竞争",
      highlight: "零成本抽象 + 内存安全",
    },
    {
      icon: "🔄",
      title: "ReAct 引擎",
      description: "高级推理与行动循环，支持多步规划、自我反思和自适应决策",
      highlight: "生产就绪的 Agent 循环",
    },
    {
      icon: "📊",
      title: "DAG 任务编排",
      description: "基于有向无环图的工作流引擎，支持条件分支、并行执行、数据流水线和人在回路",
      highlight: "声明式 DAG 工作流",
    },
    {
      icon: "⏱️",
      title: "长程任务支持",
      description: "检查点与恢复机制，让长程运行的 Agent 可以中断后续传，进度追踪，Cron 定时任务",
      highlight: "检查点 / 断点续传",
    },
    {
      icon: "🧪",
      title: "自检改进化",
      description: "内置评估框架与自检改进化循环，Agent 可从运行结果中学习、优化自身策略",
      highlight: "评估 + 自检改进化循环",
    },
    {
      icon: "🛠️",
      title: "丰富工具生态",
      description: "67+ 内置工具跨 8 个 Crate，涵盖 MCP/LSP/Web/Data/Git/DB 等，开箱即用",
      highlight: "MCP / LSP / Web / Data / Git",
    },
    {
      icon: "🧠",
      title: "记忆系统",
      description: "灵活的记忆架构，支持短期、长期和分层记忆，让 Agent 真正理解项目上下文",
      highlight: "分层记忆架构",
    },
    {
      icon: "🔌",
      title: "MCP 协议",
      description: "原生 Model Context Protocol 支持，无缝集成外部工具、服务和 AI 模型",
      highlight: "内置 MCP 集成",
    },
    {
      icon: "👥",
      title: "多 Agent 编排",
      description: "协调多个专业化 Agent，支持父子委托、对等协作和团队策略（Manager/Pipeline/Debate/Swarm）",
      highlight: "分布式 Agent 系统",
    },
  ],
};

export const comparisonZh = {
  title: "对比优势",
  subtitle: "echo-agent 与其他主流 Agent 框架对比",
  headers: ["特性", "echo-agent", "LangGraph", "CrewAI", "AutoGen"],
  rows: [
    ["语言", "Rust 🦀", "Python", "Python", "Python"],
    ["类型安全", "编译时 ✓", "运行时", "运行时", "运行时"],
    ["并发", "tokio 原生", "asyncio", "asyncio", "asyncio"],
    ["性能", "原生编译 (10-100x)", "解释执行", "解释执行", "解释执行"],
    ["MCP 支持", "内置 ✓", "插件", "插件", "插件"],
    ["LSP 集成", "内置 ✓", "无", "无", "无"],
    ["DAG 工作流", "内置 ✓", "内置", "有限", "有限"],
    ["检查点/恢复", "内置 ✓", "内置", "有限", "有限"],
    ["自检改进化", "内置 ✓", "无", "无", "无"],
    ["评估框架", "内置 ✓", "外部工具", "外部工具", "外部工具"],
    ["工具数量", "67+ 内置", "用户定义", "用户定义", "用户定义"],
  ],
  advantages: [
    {
      icon: "🚀",
      title: "极致性能",
      description: "Rust 原生编译，零成本抽象，tokio 异步运行时，比 Python 框架快 10-100 倍",
    },
    {
      icon: "🛡️",
      title: "编译时安全",
      description: "Rust 的类型系统在编译时捕获错误，无运行时恐慌，无数据竞争",
    },
    {
      icon: "🧪",
      title: "自检改进化",
      description: "内置评估框架与自检改进化循环，Agent 可从运行结果中学习并持续优化策略",
    },
  ],
};

// ── EchoCoWork (产品) 内容 ──────────────────────────────────────

export const productHeroZh = {
  title: "EchoCoWork",
  tagline: "你的 AI 协作伙伴",
  subtitle: "基于 echo-agent 框架构建的生产级 Agent 产品，专注于编码、数据分析、文献检索、学术论文写作和医学研究五大核心场景，支持人在回路交互",
  badges: ["生产就绪", "TUI + GUI", "Rust 驱动", "Human-in-the-Loop"],
  cta: {
    primary: "快速开始",
    secondary: "GitHub 仓库",
  },
  ctaUrls: {
    primary: "https://github.com/EchoYue-lp/echo-agent-cli/tree/main/docs",
    secondary: "https://github.com/EchoYue-lp/echo-agent-cli",
  },
  stats: [
    { value: "5", label: "核心场景" },
    { value: "2", label: "交互方式" },
    { value: "67+", label: "可用工具" },
    { value: "12", label: "产品特性" },
  ],
};

export const echocoworkFeaturesZh = {
  title: "产品特性",
  subtitle: "为开发者、研究人员和数据科学家打造的专业 Agent，支持五大核心场景",
  features: [
    {
      icon: "🤝",
      title: "Human-in-the-Loop",
      description: "高风险操作（文件写入、命令执行）自动请求确认，Once/Always/Deny 三种审批策略，作者始终保持主导权",
    },
    {
      icon: "🖥️",
      title: "双模式交互",
      description: "全屏终端界面（TUI）和桌面应用（Tauri GUI）两种交互模式，满足不同使用场景",
    },
    {
      icon: "💾",
      title: "记忆与持久化",
      description: "跨会话记忆系统、对话历史持久化、工作区管理，让 Agent 真正了解你的项目",
    },
    {
      icon: "🔄",
      title: "长程任务支持",
      description: "后台任务系统、断点续传、进度追踪、Cron 定时任务、工作流编排",
    },
    {
      icon: "🎨",
      title: "6 种内置主题",
      description: "dark、light、monokai、solarized、dracula、one-dark，支持运行时切换",
    },
    {
      icon: "⌨️",
      title: "Slash 命令系统",
      description: "/help、/mode、/model、/reset、/stats 等丰富命令，快速操控 Agent 行为",
    },
    {
      icon: "🔌",
      title: "MCP 协议集成",
      description: "Model Context Protocol 标准支持，连接浏览器、数据库、GitHub 等外部工具，无限扩展 Agent 能力边界",
    },
    {
      icon: "🧩",
      title: "插件系统",
      description: "PluginRegistry 管理插件生命周期，支持自定义工具、技能、Hooks，社区生态持续扩展",
    },
    {
      icon: "⚡",
      title: "Hooks 自动化",
      description: "生命周期钩子（SessionStart、ToolCall、TaskComplete），触发自动化脚本、Webhook、通知",
    },
    {
      icon: "💬",
      title: "IM 频道集成",
      description: "内置 QQ Bot、飞书（Webhook/Long Poll）通道，让 Agent 直接参与团队协作对话",
    },
    {
      icon: "🎯",
      title: "技能系统",
      description: "SkillsHub 管理可复用技能，支持技能市场、版本控制、自动依赖解析，一键安装社区技能",
    },
    {
      icon: "🚀",
      title: "多 Agent 编排",
      description: "SubAgent 系统支持 DAG 任务编排、并行执行、依赖管理，复杂任务自动分解执行",
    },
  ],
};

export const echocoworkUseCasesZh = {
  title: "五大核心场景",
  subtitle: "EchoCoWork 专注于以下核心能力，区别于 Claude Code / Codex / Cursor",
  cases: [
    {
      icon: "💻",
      title: "Coding",
      tagline: "代码生成、审查、重构、调试、测试",
      description: "EchoCoWork 能理解整个项目上下文，帮你快速定位 Bug、生成测试、重构代码。支持 Git 隔离工作区，让 Agent 安全地修改代码。",
      highlights: [
        "代码审查与缺陷检测",
        "自动生成单元测试",
        "Git Worktree 隔离编辑",
        "LSP 集成（go-to-definition、诊断）",
        "Ripgrep 代码搜索",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "📊",
      title: "数据分析",
      tagline: "结构化数据、统计计算、可视化报告",
      description: "结构化数据分析、统计计算、可视化报告生成。支持 Excel、CSV、数据库等多种数据源，自动化数据流水线编排。",
      highlights: [
        "数据画像与质量检查",
        "描述统计与假设检验",
        "图表自动生成",
        "数据流水线编排",
        "Excel / CSV / SQL 多源支持",
      ],
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: "🔍",
      title: "文献检索",
      tagline: "arXiv、Semantic Scholar、Web 研究",
      description: "跨平台学术论文检索，支持 arXiv、Semantic Scholar 引用分析、PDF 自动下载与解析、BibTeX 生成。",
      highlights: [
        "arXiv 论文搜索",
        "Semantic Scholar 引用分析",
        "PDF 自动下载与解析",
        "BibTeX 引用生成",
        "多关键词交叉检索",
      ],
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: "📝",
      title: "学术论文写作",
      tagline: "检索综合、交互写作、人在回路",
      description: "交互式学术写作助手，支持大纲生成、文献综合、草稿撰写、同行评审模拟和修订。Human-in-the-loop 确保作者始终保持主导权。",
      highlights: [
        "大纲 → 草稿 → 审查 → 修订 流水线",
        "文献自动综合与引用插入",
        "Human-in-the-loop 交互审批",
        "学术风格与格式检查",
        "多轮反馈迭代优化",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "🏥",
      title: "医学研究",
      tagline: "PubMed、临床试验、循证医学",
      description: "面向医学研究人员的专业 Agent，支持 PubMed 文献检索、临床试验查询、PICO 框架构建、GRADE 证据分级和 MeSH 术语匹配。",
      highlights: [
        "PubMed 文献检索",
        "ClinicalTrials.gov 临床试验查询",
        "PICO 框架自动构建",
        "GRADE 证据质量分级",
        "MeSH 术语智能匹配",
      ],
      color: "from-rose-500 to-red-500",
    },
  ],
  quickStart: {
    title: "快速开始",
    steps: [
      { cmd: "git clone https://github.com/EchoYue-lp/echo-agent-cli.git && cd echo-agent-cli", desc: "克隆仓库" },
      { cmd: "cargo fetch", desc: "安装 Rust 依赖" },
      { cmd: "cargo run --bin echo-agent-cli", desc: "启动 TUI" },
      { cmd: "cargo run --bin echo-agent-tauri", desc: "启动 GUI 桌面应用" },
    ],
  },
};

export const footerZh = {
  description: "用 Rust 构建 AI Agent 开发的未来",
  links: {
    framework: "框架",
    product: "产品",
    community: "社区",
  },
  items: {
    framework: [
      { label: "文档", href: "https://github.com/EchoYue-lp/echo-agent/tree/main/docs/zh" },
      { label: "示例", href: "https://github.com/EchoYue-lp/echo-agent/tree/main/examples" },
    ],
    product: [
      { label: "README", href: "https://github.com/EchoYue-lp/echo-agent-cli" },
      { label: "配置指南", href: "https://github.com/EchoYue-lp/echo-agent-cli/blob/main/docs/configuration.md" },
      { label: "架构说明", href: "https://github.com/EchoYue-lp/echo-agent-cli/blob/main/docs/architecture.md" },
    ],
    community: [
      { label: "GitHub (框架)", href: "https://github.com/EchoYue-lp/echo-agent" },
      { label: "GitHub (产品)", href: "https://github.com/EchoYue-lp/echo-agent-cli" },
    ],
  },
  githubUrl: "https://github.com/EchoYue-lp/echo-agent-cli",
  copyright: "© 2026 Echo Agent. MIT 许可证下开源。",
};
