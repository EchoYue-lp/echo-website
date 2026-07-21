// Documentation registry — defines sidebar structure and doc metadata.
// Doc files are imported as raw strings via Vite's ?raw suffix.
// All markdown files are stored locally in ./content/ (copied from source repos).

export type Language = 'zh' | 'en';

export interface DocEntry {
  /** Unique slug used in URL: /docs/:slug */
  slug: string;
  /** Display title (bilingual) */
  title: { zh: string; en: string };
  /** Path to the markdown file relative to docs/content/ (for ?raw import) */
  filePath: string;
  /** Whether this is an external link (GitHub) instead of an embedded doc */
  external?: string;
}

export interface DocCategory {
  /** Category title (bilingual) */
  title: { zh: string; en: string };
  /** Icon emoji */
  icon: string;
  /** Doc entries in this category */
  docs: DocEntry[];
}

// ── Sidebar Structure ──────────────────────────────────────────────
// Mirrors Claude Code's doc organization, adapted for echo ecosystem.

export const docCategories: DocCategory[] = [
  {
    title: { zh: '快速开始', en: 'Quick Start' },
    icon: '🚀',
    docs: [
      {
        slug: 'overview',
        title: { zh: '概述', en: 'Overview' },
        filePath: './content/echo-agent/README.md',
      },
      {
        slug: 'getting-started',
        title: { zh: '快速开始', en: 'Getting Started' },
        filePath: './content/echo-agent/getting-started.md',
      },
      {
        slug: 'how-it-works',
        title: { zh: 'echo-agent 如何工作', en: 'How echo-agent Works' },
        filePath: './content/echo-agent/01-react-agent.md',
      },
    ],
  },
  {
    title: { zh: '核心概念', en: 'Core Concepts' },
    icon: '🧠',
    docs: [
      {
        slug: 'tools',
        title: { zh: '工具系统', en: 'Tools' },
        filePath: './content/echo-agent/02-tools.md',
      },
      {
        slug: 'memory',
        title: { zh: '记忆系统', en: 'Memory' },
        filePath: './content/echo-agent/03-memory.md',
      },
      {
        slug: 'tiered-memory',
        title: { zh: '分层记忆架构', en: 'Tiered Memory' },
        filePath: './content/echo-agent/39-tiered-memory.md',
      },
      {
        slug: 'compression',
        title: { zh: '上下文压缩', en: 'Compression' },
        filePath: './content/echo-agent/04-compression.md',
      },
      {
        slug: 'streaming',
        title: { zh: '流式输出', en: 'Streaming' },
        filePath: './content/echo-agent/10-streaming.md',
      },
      {
        slug: 'context-system',
        title: { zh: '上下文系统', en: 'Context System' },
        filePath: './content/echo-agent/40-context-system.md',
      },
      {
        slug: 'structured-output',
        title: { zh: '结构化输出', en: 'Structured Output' },
        filePath: './content/echo-agent/11-structured-output.md',
      },
      {
        slug: 'chat',
        title: { zh: '对话系统', en: 'Chat System' },
        filePath: './content/echo-agent/13-chat.md',
      },
    ],
  },
  {
    title: { zh: '框架功能', en: 'Framework Features' },
    icon: '⚙️',
    docs: [
      {
        slug: 'subagent',
        title: { zh: 'SubAgent 多智能体', en: 'SubAgent' },
        filePath: './content/echo-agent/06-subagent.md',
      },
      {
        slug: 'multi-agent',
        title: { zh: '多 Agent 编排', en: 'Multi-Agent Orchestration' },
        filePath: './content/echo-agent/26-multi-agent.md',
      },
      {
        slug: 'human-loop',
        title: { zh: 'Human-in-the-Loop', en: 'Human-in-the-Loop' },
        filePath: './content/echo-agent/05-human-loop.md',
      },
      {
        slug: 'tasks',
        title: { zh: 'DAG 任务系统', en: 'DAG Tasks' },
        filePath: './content/echo-agent/09-tasks.md',
      },
      {
        slug: 'long-running-tasks',
        title: { zh: '长程任务', en: 'Long-Running Tasks' },
        filePath: './content/echo-agent/29-long-running-tasks.md',
      },
      {
        slug: 'skills',
        title: { zh: '技能系统', en: 'Skills' },
        filePath: './content/echo-agent/07-skills.md',
      },
      {
        slug: 'skill-authoring',
        title: { zh: '技能开发指南', en: 'Skill Authoring Guide' },
        filePath: './content/echo-agent/skill-authoring.md',
      },
      {
        slug: 'guard-system',
        title: { zh: '安全守卫', en: 'Guard System' },
        filePath: './content/echo-agent/18-guard-system.md',
      },
      {
        slug: 'eval-system',
        title: { zh: '评估框架', en: 'Eval System' },
        filePath: './content/echo-agent/24-eval-system.md',
      },
      {
        slug: 'self-improvement',
        title: { zh: '自我改进', en: 'Self-Improvement' },
        filePath: './content/echo-agent/25-self-improvement.md',
      },
      {
        slug: 'plugin-system',
        title: { zh: '插件系统', en: 'Plugins' },
        filePath: './content/echo-agent/32-plugin-system.md',
      },
      {
        slug: 'graph-workflow',
        title: { zh: 'Graph 工作流', en: 'Graph Workflow' },
        filePath: './content/echo-agent/17-graph-workflow.md',
      },
      {
        slug: 'factory-modes',
        title: { zh: '工厂模式', en: 'Factory Modes' },
        filePath: './content/echo-agent/38-factory-modes.md',
      },
    ],
  },
  {
    title: { zh: '工具与集成', en: 'Tools & Integrations' },
    icon: '🔌',
    docs: [
      {
        slug: 'mcp',
        title: { zh: 'MCP 协议', en: 'MCP Protocol' },
        filePath: './content/echo-agent/08-mcp.md',
      },
      {
        slug: 'lsp',
        title: { zh: 'LSP 集成', en: 'LSP Integration' },
        filePath: './content/echo-agent/31-lsp-integration.md',
      },
      {
        slug: 'web-tools',
        title: { zh: 'Web 工具', en: 'Web Tools' },
        filePath: './content/echo-agent/20-web-tools.md',
      },
      {
        slug: 'common-tools',
        title: { zh: '常用工具', en: 'Common Tools' },
        filePath: './content/echo-agent/21-common-tools.md',
      },
      {
        slug: 'research-tools',
        title: { zh: '研究工具', en: 'Research Tools' },
        filePath: './content/echo-agent/22-research-tools.md',
      },
      {
        slug: 'code-search',
        title: { zh: '代码搜索', en: 'Code Search' },
        filePath: './content/echo-agent/37-code-search.md',
      },
      {
        slug: 'semantic-search',
        title: { zh: '语义搜索', en: 'Semantic Search' },
        filePath: './content/echo-agent/14-semantic-search.md',
      },
      {
        slug: 'hooks',
        title: { zh: 'Hooks 自动化', en: 'Hooks' },
        filePath: './content/echo-agent/23-hooks.md',
      },
      {
        slug: 'im-channels',
        title: { zh: 'IM 频道', en: 'IM Channels' },
        filePath: './content/echo-agent/15-im-channels.md',
      },
    ],
  },
  {
    title: { zh: '数据与分析', en: 'Data & Analytics' },
    icon: '📊',
    docs: [
      {
        slug: 'pipelines',
        title: { zh: '数据管道', en: 'Data Pipelines' },
        filePath: './content/echo-agent/35-pipelines.md',
      },
      {
        slug: 'data-quality',
        title: { zh: '数据质量与统计', en: 'Data Quality & Statistics' },
        filePath: './content/echo-agent/36-data-quality-statistics.md',
      },
    ],
  },
  {
    title: { zh: '高级主题', en: 'Advanced Topics' },
    icon: '🔬',
    docs: [
      {
        slug: 'tracing',
        title: { zh: '追踪与观测', en: 'Tracing & Observability' },
        filePath: './content/echo-agent/27-tracing.md',
      },
      {
        slug: 'react-safety',
        title: { zh: 'ReAct 安全模式', en: 'ReAct Safety Patterns' },
        filePath: './content/echo-agent/30-react-safety.md',
      },
    ],
  },
  {
    title: { zh: '参考', en: 'Reference' },
    icon: '📚',
    docs: [
      {
        slug: 'config-reference',
        title: { zh: '配置参考', en: 'Config Reference' },
        filePath: './content/echo-agent/28-config-reference.md',
      },
      {
        slug: 'security',
        title: { zh: '安全', en: 'Security' },
        filePath: './content/echo-agent/security.md',
      },
      {
        slug: 'headless-mode',
        title: { zh: '无头模式', en: 'Headless Mode' },
        filePath: './content/echo-agent/33-headless-mode.md',
      },
      {
        slug: 'git-isolation',
        title: { zh: 'Git 隔离', en: 'Git Isolation' },
        filePath: './content/echo-agent/34-git-isolation.md',
      },
      {
        slug: 'testing',
        title: { zh: 'Mock 与测试', en: 'Mock & Testing' },
        filePath: './content/echo-agent/12-mock.md',
      },
    ],
  },
  {
    title: { zh: '知识库', en: 'Knowledge Base' },
    icon: '📚',
    docs: [
      {
        slug: 'agent-patterns',
        title: { zh: 'Agent 设计模式', en: 'Agent Design Patterns' },
        filePath: './content/echo-agent/knowledge/agent-patterns.md',
      },
      {
        slug: 'mcp-protocol-deep-dive',
        title: { zh: 'MCP 协议深入', en: 'MCP Protocol Deep Dive' },
        filePath: './content/echo-agent/knowledge/mcp-protocol.md',
      },
      {
        slug: 'skill-system-guide',
        title: { zh: '技能系统指南', en: 'Skill System Guide' },
        filePath: './content/echo-agent/knowledge/skill-system.md',
      },
      {
        slug: 'a2a-protocol',
        title: { zh: 'A2A 协议', en: 'A2A Protocol' },
        filePath: './content/echo-agent/knowledge/a2a-protocol.md',
      },
    ],
  },
  {
    title: { zh: 'EKO (CLI)', en: 'EKO (CLI)' },
    icon: '💻',
    docs: [
      {
        slug: 'cli-readme',
        title: { zh: 'CLI 概述', en: 'CLI Overview' },
        filePath: './content/echo-agent-cli/README.md',
      },
      {
        slug: 'cli-getting-started',
        title: { zh: 'CLI 快速入门', en: 'CLI Quick Start' },
        filePath: './content/echo-agent-cli/getting-started.md',
      },
      {
        slug: 'cli-configuration',
        title: { zh: 'CLI 配置指南', en: 'CLI Configuration' },
        filePath: './content/echo-agent-cli/configuration.md',
      },
      {
        slug: 'cli-architecture',
        title: { zh: 'CLI 架构说明', en: 'CLI Architecture' },
        filePath: './content/echo-agent-cli/architecture.md',
      },
    ],
  },
];

/** Get the first slug as the default doc to show */
export function getDefaultSlug(): string {
  return docCategories[0]?.docs[0]?.slug ?? 'overview';
}

/** Find a doc entry by slug */
export function findDocBySlug(slug: string): DocEntry | undefined {
  for (const cat of docCategories) {
    const found = cat.docs.find(d => d.slug === slug);
    if (found) return found;
  }
  return undefined;
}

/** Get all slugs for route generation */
export function getAllSlugs(): string[] {
  return docCategories.flatMap(cat => cat.docs.map(d => d.slug));
}
