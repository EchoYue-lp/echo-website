// Documentation registry — defines sidebar structure and doc metadata.
// Doc files are imported as raw strings via Vite's ?raw suffix.

export type Language = 'zh' | 'en';

export interface DocEntry {
  /** Unique slug used in URL: /docs/:slug */
  slug: string;
  /** Display title (bilingual) */
  title: { zh: string; en: string };
  /** Path to the markdown file relative to echo-agent root (for ?raw import) */
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
        filePath: '../echo-agent/docs/zh/README.md',
      },
      {
        slug: 'getting-started',
        title: { zh: '快速开始', en: 'Getting Started' },
        filePath: '../echo-agent/docs/zh/getting-started.md',
      },
      {
        slug: 'how-it-works',
        title: { zh: 'echo-agent 如何工作', en: 'How echo-agent Works' },
        filePath: '../echo-agent/docs/zh/01-react-agent.md',
      },
    ],
  },
  {
    title: { zh: '核心概念', en: 'Core Concepts' },
    icon: '🧠',
    docs: [
      {
        slug: 'react-agent',
        title: { zh: 'ReAct Agent', en: 'ReAct Agent' },
        filePath: '../echo-agent/docs/zh/01-react-agent.md',
      },
      {
        slug: 'tools',
        title: { zh: '工具系统', en: 'Tools' },
        filePath: '../echo-agent/docs/zh/02-tools.md',
      },
      {
        slug: 'memory',
        title: { zh: '记忆系统', en: 'Memory' },
        filePath: '../echo-agent/docs/zh/03-memory.md',
      },
      {
        slug: 'compression',
        title: { zh: '上下文压缩', en: 'Compression' },
        filePath: '../echo-agent/docs/zh/04-compression.md',
      },
      {
        slug: 'streaming',
        title: { zh: '流式输出', en: 'Streaming' },
        filePath: '../echo-agent/docs/zh/10-streaming.md',
      },
      {
        slug: 'context-system',
        title: { zh: '上下文系统', en: 'Context System' },
        filePath: '../echo-agent/docs/zh/40-context-system.md',
      },
      {
        slug: 'structured-output',
        title: { zh: '结构化输出', en: 'Structured Output' },
        filePath: '../echo-agent/docs/zh/11-structured-output.md',
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
        filePath: '../echo-agent/docs/zh/06-subagent.md',
      },
      {
        slug: 'human-loop',
        title: { zh: 'Human-in-the-Loop', en: 'Human-in-the-Loop' },
        filePath: '../echo-agent/docs/zh/05-human-loop.md',
      },
      {
        slug: 'tasks',
        title: { zh: 'DAG 任务系统', en: 'DAG Tasks' },
        filePath: '../echo-agent/docs/zh/09-tasks.md',
      },
      {
        slug: 'long-running-tasks',
        title: { zh: '长程任务', en: 'Long-Running Tasks' },
        filePath: '../echo-agent/docs/zh/29-long-running-tasks.md',
      },
      {
        slug: 'skills',
        title: { zh: '技能系统', en: 'Skills' },
        filePath: '../echo-agent/docs/zh/07-skills.md',
      },
      {
        slug: 'guard-system',
        title: { zh: '安全守卫', en: 'Guard System' },
        filePath: '../echo-agent/docs/zh/18-guard-system.md',
      },
      {
        slug: 'eval-system',
        title: { zh: '评估框架', en: 'Eval System' },
        filePath: '../echo-agent/docs/zh/24-eval-system.md',
      },
      {
        slug: 'self-improvement',
        title: { zh: '自我改进', en: 'Self-Improvement' },
        filePath: '../echo-agent/docs/zh/25-self-improvement.md',
      },
      {
        slug: 'plugin-system',
        title: { zh: '插件系统', en: 'Plugins' },
        filePath: '../echo-agent/docs/zh/32-plugin-system.md',
      },
      {
        slug: 'graph-workflow',
        title: { zh: 'Graph 工作流', en: 'Graph Workflow' },
        filePath: '../echo-agent/docs/zh/17-graph-workflow.md',
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
        filePath: '../echo-agent/docs/zh/08-mcp.md',
      },
      {
        slug: 'lsp',
        title: { zh: 'LSP 集成', en: 'LSP Integration' },
        filePath: '../echo-agent/docs/zh/31-lsp-integration.md',
      },
      {
        slug: 'web-tools',
        title: { zh: 'Web 工具', en: 'Web Tools' },
        filePath: '../echo-agent/docs/zh/20-web-tools.md',
      },
      {
        slug: 'common-tools',
        title: { zh: '常用工具', en: 'Common Tools' },
        filePath: '../echo-agent/docs/zh/21-common-tools.md',
      },
      {
        slug: 'hooks',
        title: { zh: 'Hooks 自动化', en: 'Hooks' },
        filePath: '../echo-agent/docs/zh/23-hooks.md',
      },
      {
        slug: 'im-channels',
        title: { zh: 'IM 频道', en: 'IM Channels' },
        filePath: '../echo-agent/docs/zh/15-im-channels.md',
      },
      {
        slug: 'a2a',
        title: { zh: 'A2A 协议', en: 'A2A Protocol' },
        filePath: '../echo-agent/docs/zh/knowledge/a2a-protocol.md',
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
        filePath: '../echo-agent/docs/zh/28-config-reference.md',
      },
      {
        slug: 'security',
        title: { zh: '安全', en: 'Security' },
        filePath: '../echo-agent/docs/zh/security.md',
      },
      {
        slug: 'tool-permissions',
        title: { zh: '工具权限', en: 'Tool Permissions' },
        filePath: '../echo-agent/docs/zh/tool-permissions.md',
      },
      {
        slug: 'headless-mode',
        title: { zh: '无头模式', en: 'Headless Mode' },
        filePath: '../echo-agent/docs/zh/33-headless-mode.md',
      },
      {
        slug: 'git-isolation',
        title: { zh: 'Git 隔离', en: 'Git Isolation' },
        filePath: '../echo-agent/docs/zh/34-git-isolation.md',
      },
      {
        slug: 'testing',
        title: { zh: 'Mock 与测试', en: 'Mock & Testing' },
        filePath: '../echo-agent/docs/zh/12-mock.md',
      },
    ],
  },
  {
    title: { zh: 'EchoCoWork (CLI)', en: 'EchoCoWork (CLI)' },
    icon: '💻',
    docs: [
      {
        slug: 'cli-readme',
        title: { zh: 'CLI 概述', en: 'CLI Overview' },
        filePath: '../echo-agent-cli/README.md',
      },
      {
        slug: 'cli-getting-started',
        title: { zh: 'CLI 快速入门', en: 'CLI Quick Start' },
        filePath: '../echo-agent-cli/docs/getting-started.md',
      },
      {
        slug: 'cli-configuration',
        title: { zh: 'CLI 配置指南', en: 'CLI Configuration' },
        filePath: '../echo-agent-cli/docs/configuration.md',
      },
      {
        slug: 'cli-architecture',
        title: { zh: 'CLI 架构说明', en: 'CLI Architecture' },
        filePath: '../echo-agent-cli/docs/architecture.md',
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
