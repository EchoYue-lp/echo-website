// ── echo-agent (Framework) content ──────────────────────────────

export const frameworkHeroEn = {
  title: "echo-agent",
  tagline: "Build Production-Grade AI Agents with Rust",
  subtitle: "A comprehensive Rust framework with ReAct engine, DAG task orchestration, self-improvement loop, 67+ built-in tools (MCP/LSP/Web/Data/Git), and multi-agent orchestration",
  badges: ["Open Source", "MIT License", "Rust 1.95+"],
  cta: {
    primary: "View Documentation",
    secondary: "GitHub Repository",
  },
  ctaUrls: {
    primary: "https://github.com/EchoYue-lp/echo-agent/tree/main/docs",
    secondary: "https://github.com/EchoYue-lp/echo-agent",
  },
  stats: [
    { value: "67+", label: "Built-in Tools" },
    { value: "66", label: "Runnable Examples" },
    { value: "40+", label: "Doc Topics" },
    { value: "8", label: "Crate Modules" },
  ],
};

export const featuresEn = {
  title: "Framework Features",
  subtitle: "A comprehensive Rust framework for building production-grade AI agents",
  features: [
    {
      icon: "🦀",
      title: "Rust Native Performance",
      description: "Zero-cost abstractions, compile-time type safety, tokio async runtime. 10-100x faster than Python frameworks, memory-safe with no data races",
      highlight: "Zero-cost abstractions + memory safety",
    },
    {
      icon: "🔄",
      title: "ReAct Engine",
      description: "Advanced reasoning and action loop with multi-step planning, self-reflection, and adaptive decision making",
      highlight: "Production-ready agent loop",
    },
    {
      icon: "📊",
      title: "DAG Task Orchestration",
      description: "Directed acyclic graph workflow engine with conditional branching, parallel execution, data pipelines, and human-in-the-loop support",
      highlight: "Declarative DAG workflows",
    },
    {
      icon: "⏱️",
      title: "Long-Running Tasks",
      description: "Checkpoint and resume mechanism for long-running agents — progress tracking, checkpoint persistence, cron scheduling",
      highlight: "Checkpoint / resume support",
    },
    {
      icon: "🧪",
      title: "Self-Improvement",
      description: "Built-in evaluation framework and self-improvement loop — agents learn from execution results and optimize their own strategies",
      highlight: "Eval + self-improvement loop",
    },
    {
      icon: "🛠️",
      title: "Rich Tool Ecosystem",
      description: "67+ built-in tools across 8 crates covering MCP/LSP/Web/Data/Git/DB — ready to use out of the box",
      highlight: "MCP / LSP / Web / Data / Git",
    },
    {
      icon: "🧠",
      title: "Memory System",
      description: "Flexible memory architecture with short-term, long-term, and tiered memory — agents truly understand your project context",
      highlight: "Tiered memory architecture",
    },
    {
      icon: "🔌",
      title: "MCP Protocol",
      description: "Native Model Context Protocol support for seamless integration with external tools, services, and AI models",
      highlight: "Built-in MCP integration",
    },
    {
      icon: "👥",
      title: "Multi-Agent Orchestration",
      description: "Coordinate multiple specialized agents with parent-child delegation, peer collaboration, and team strategies (Manager/Pipeline/Debate/Swarm)",
      highlight: "Distributed agent system",
    },
  ],
};

export const comparisonEn = {
  title: "How We Compare",
  subtitle: "echo-agent vs other popular agent frameworks",
  headers: ["Feature", "echo-agent", "LangGraph", "CrewAI", "AutoGen"],
  rows: [
    ["Language", "Rust 🦀", "Python", "Python", "Python"],
    ["Type Safety", "Compile-time ✓", "Runtime", "Runtime", "Runtime"],
    ["Concurrency", "tokio native", "asyncio", "asyncio", "asyncio"],
    ["Performance", "Native compiled (10-100x)", "Interpreted", "Interpreted", "Interpreted"],
    ["MCP Support", "Built-in ✓", "Plugin", "Plugin", "Plugin"],
    ["LSP Integration", "Built-in ✓", "None", "None", "None"],
    ["DAG Workflows", "Built-in ✓", "Built-in", "Limited", "Limited"],
    ["Checkpoint/Resume", "Built-in ✓", "Built-in", "Limited", "Limited"],
    ["Self-Improvement", "Built-in ✓", "None", "None", "None"],
    ["Eval Framework", "Built-in ✓", "External", "External", "External"],
    ["Tool Count", "67+ built-in", "User-defined", "User-defined", "User-defined"],
  ],
  advantages: [
    {
      icon: "🚀",
      title: "Blazing Performance",
      description: "Native Rust compilation, zero-cost abstractions, tokio async runtime — 10-100x faster than Python frameworks",
    },
    {
      icon: "🛡️",
      title: "Compile-Time Safety",
      description: "Rust's type system catches errors at compile time — no runtime panics, no data races",
    },
    {
      icon: "🧪",
      title: "Self-Improvement",
      description: "Built-in eval framework and self-improvement loop — agents learn from execution and continuously optimize strategies",
    },
  ],
};

export const architectureEn = {
  title: "Architecture Overview",
  subtitle: "Modular design for scalability and maintainability",
  components: [
    {
      layer: "Application Layer",
      items: ["CLI Interface", "TUI (Terminal UI)", "GUI (Tauri Desktop)"],
    },
    {
      layer: "Agent Layer",
      items: ["ReAct Engine", "Planning System", "Tool Executor", "Memory Manager"],
    },
    {
      layer: "Framework Layer",
      items: ["Tool Registry (MCP/LSP/Web/Data/Git)", "MCP Client", "DAG Workflow Engine", "Multi-Agent Orchestrator", "Eval & Self-Improvement"],
    },
    {
      layer: "Infrastructure",
      items: ["tokio Runtime", "Rust Type System", "Async I/O", "Checkpoint Store"],
    },
  ],
};

// ── EchoCoWork (Product) content ────────────────────────────────

export const productHeroEn = {
  title: "EchoCoWork",
  tagline: "Your AI Collaboration Partner",
  subtitle: "A production-grade agent product built on the echo-agent framework, focused on four core scenarios: coding, data analysis, literature search, and academic paper writing, with human-in-the-loop interaction",
  badges: ["Production Ready", "TUI + GUI", "Rust Powered", "Human-in-the-Loop"],
  cta: {
    primary: "Quick Start",
    secondary: "GitHub Repository",
  },
  ctaUrls: {
    primary: "https://github.com/EchoYue-lp/echo-agent-cli/tree/main/docs",
    secondary: "https://github.com/EchoYue-lp/echo-agent-cli",
  },
  stats: [
    { value: "4", label: "Core Scenarios" },
    { value: "2", label: "Interaction Modes" },
    { value: "6", label: "Built-in Themes" },
    { value: "67+", label: "Available Tools" },
  ],
};

export const echocoworkFeaturesEn = {
  title: "Product Features",
  subtitle: "A professional agent built for developers, researchers, and data scientists across four core scenarios",
  features: [
    {
      icon: "🤝",
      title: "Human-in-the-Loop",
      description: "High-risk operations (file writes, command execution) automatically request confirmation with Once/Always/Deny approval policies — authors always retain control",
    },
    {
      icon: "🖥️",
      title: "Dual-Mode Interaction",
      description: "Full-screen terminal UI (TUI) and desktop application (Tauri GUI) — two interaction modes for different use cases",
    },
    {
      icon: "💾",
      title: "Memory & Persistence",
      description: "Cross-session memory, conversation history persistence, and workspace management — the agent truly understands your project",
    },
    {
      icon: "🔄",
      title: "Long-Running Tasks",
      description: "Background task system, checkpoint/resume, progress tracking, cron scheduling, and workflow orchestration",
    },
    {
      icon: "🎨",
      title: "6 Built-in Themes",
      description: "dark, light, monokai, solarized, dracula, one-dark — switch themes at runtime",
    },
    {
      icon: "⌨️",
      title: "Slash Command System",
      description: "/help, /mode, /model, /reset, /stats and more — quickly control agent behavior",
    },
  ],
};

export const echocoworkUseCasesEn = {
  title: "Four Core Scenarios",
  subtitle: "EchoCoWork focuses on these core capabilities, differentiated from Claude Code / Codex / Cursor",
  cases: [
    {
      icon: "💻",
      title: "Coding",
      tagline: "Code generation, review, refactoring, debugging, testing",
      description: "EchoCoWork understands your entire project context, helping you quickly locate bugs, generate tests, and refactor code. Git worktree isolation keeps agent edits safe.",
      highlights: [
        "Code review & defect detection",
        "Automatic unit test generation",
        "Git Worktree isolated editing",
        "LSP integration (go-to-definition, diagnostics)",
        "Ripgrep code search",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "📊",
      title: "Data Analysis",
      tagline: "Structured data, statistics, visualization reports",
      description: "Structured data analysis, statistical computation, and visualization report generation. Supports Excel, CSV, databases, and automated data pipeline orchestration.",
      highlights: [
        "Data profiling & quality checks",
        "Descriptive stats & hypothesis testing",
        "Automatic chart generation",
        "Data pipeline orchestration",
        "Excel / CSV / SQL multi-source support",
      ],
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: "🔍",
      title: "Literature Search",
      tagline: "arXiv, Semantic Scholar, web research",
      description: "Cross-platform academic paper search with arXiv, Semantic Scholar citation analysis, automatic PDF download & parsing, and BibTeX generation.",
      highlights: [
        "arXiv paper search",
        "Semantic Scholar citation analysis",
        "Automatic PDF download & parsing",
        "BibTeX citation generation",
        "Multi-keyword cross-retrieval",
      ],
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: "📝",
      title: "Academic Paper Writing",
      tagline: "Retrieval synthesis, interactive writing, human-in-the-loop",
      description: "Interactive academic writing assistant with outline generation, literature synthesis, draft writing, peer-review simulation, and revision. Human-in-the-loop ensures authors always retain control.",
      highlights: [
        "Outline → draft → review → revise pipeline",
        "Automatic literature synthesis & citation",
        "Human-in-the-loop approval workflow",
        "Academic style & format checking",
        "Multi-round feedback iteration",
      ],
      color: "from-purple-500 to-pink-500",
    },
  ],
  quickStart: {
    title: "Quick Start",
    steps: [
      { cmd: "git clone https://github.com/EchoYue-lp/echo-agent-cli.git && cd echo-agent-cli", desc: "Clone repository" },
      { cmd: "cargo fetch", desc: "Install Rust dependencies" },
      { cmd: "cargo run --bin echo-agent-cli", desc: "Launch TUI" },
      { cmd: "cargo run --bin echo-agent-tauri", desc: "Launch GUI desktop app" },
    ],
  },
};

export const footerEn = {
  description: "Building the future of AI agent development with Rust",
  links: {
    framework: "Framework",
    product: "Product",
    community: "Community",
  },
  items: {
    framework: [
      { label: "Documentation", href: "https://github.com/EchoYue-lp/echo-agent/tree/main/docs" },
      { label: "Examples", href: "https://github.com/EchoYue-lp/echo-agent/tree/main/examples" },
      { label: "API Reference", href: "https://github.com/EchoYue-lp/echo-agent/tree/main/docs/api" },
      { label: "Changelog", href: "https://github.com/EchoYue-lp/echo-agent/blob/main/CHANGELOG.md" },
    ],
    product: [
      { label: "Quick Start", href: "https://github.com/EchoYue-lp/echo-agent-cli/tree/main/docs" },
      { label: "Configuration", href: "https://github.com/EchoYue-lp/echo-agent-cli/tree/main/docs/configuration" },
      { label: "Architecture", href: "https://github.com/EchoYue-lp/echo-agent-cli/tree/main/docs/architecture" },
      { label: "Use Cases", href: "https://github.com/EchoYue-lp/echo-agent-cli/tree/main/docs/use-cases" },
    ],
    community: [
      { label: "GitHub", href: "https://github.com/EchoYue-lp/echo-agent-cli" },
      { label: "Contributing", href: "https://github.com/EchoYue-lp/echo-agent/blob/main/CONTRIBUTING.md" },
    ],
  },
  githubUrl: "https://github.com/EchoYue-lp/echo-agent-cli",
  copyright: "© 2026 Echo Agent. Open source under MIT License.",
};
