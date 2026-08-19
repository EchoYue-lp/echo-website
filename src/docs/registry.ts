import type { Language, Product } from '../routing';

export type { Language, Product };

export interface DocEntry {
  /** Unique slug within a product's documentation route. */
  slug: string;
  /** Display title (bilingual) */
  title: { zh: string; en: string };
  /** Language-neutral path below the product content directory. */
  filePath: string;
  /** Whether this is an external link (GitHub) instead of an embedded doc */
  external?: string;
}

export interface DocCategory {
  /** Category title (bilingual) */
  title: { zh: string; en: string };
  /** Stable key rendered by the documentation UI. */
  icon:
    'rocket' | 'brain' | 'workflow' | 'plug' | 'chart' | 'flask' | 'library' | 'book' | 'monitor';
  /** Doc entries in this category */
  docs: DocEntry[];
}

export const frameworkDocCategories: DocCategory[] = [
  {
    title: { zh: '快速开始', en: 'Quick Start' },
    icon: 'rocket',
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
    icon: 'brain',
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
    icon: 'workflow',
    docs: [
      {
        slug: 'subagent',
        title: { zh: 'Subagent 多智能体', en: 'Subagent' },
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
    icon: 'plug',
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
      {
        slug: 'shell-text-tools',
        title: { zh: 'Shell 与文本工具', en: 'Shell & Text Tools' },
        filePath: './content/echo-agent/41-shell-text-tools.md',
      },
      {
        slug: 'database-tools',
        title: { zh: '数据库工具', en: 'Database Tools' },
        filePath: './content/echo-agent/42-database-tools.md',
      },
    ],
  },
  {
    title: { zh: '数据与分析', en: 'Data & Analytics' },
    icon: 'chart',
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
      {
        slug: 'data-output-format',
        title: { zh: '数据输出格式', en: 'Data Output Format' },
        filePath: './content/echo-agent/43-data-output-format.md',
      },
    ],
  },
  {
    title: { zh: '高级主题', en: 'Advanced Topics' },
    icon: 'flask',
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
    icon: 'library',
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
    icon: 'book',
    docs: [
      {
        slug: 'knowledge-overview',
        title: { zh: '知识库概述', en: 'Knowledge Base Overview' },
        filePath: './content/echo-agent/knowledge/README.md',
      },
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
];

export const ekoDocCategories: DocCategory[] = [
  {
    title: { zh: 'EKO', en: 'EKO' },
    icon: 'monitor',
    docs: [
      {
        slug: 'overview',
        title: { zh: '产品概述', en: 'Overview' },
        filePath: './content/eko/overview.md',
      },
      {
        slug: 'getting-started',
        title: { zh: '快速开始', en: 'Getting Started' },
        filePath: './content/eko/getting-started.md',
      },
      {
        slug: 'capabilities',
        title: { zh: '能力边界', en: 'Capability Scope' },
        filePath: './content/eko/capabilities.md',
      },
      {
        slug: 'storage',
        title: { zh: '本地数据', en: 'Local Data' },
        filePath: './content/eko/storage.md',
      },
    ],
  },
];

export function getDocCategories(product: Product): DocCategory[] {
  return product === 'eko' ? ekoDocCategories : frameworkDocCategories;
}

export function getDefaultSlug(product: Product): string {
  const [firstCategory] = getDocCategories(product);
  const [firstDoc] = firstCategory?.docs ?? [];
  return firstDoc?.slug ?? 'overview';
}

export function findDocBySlug(product: Product, slug: string): DocEntry | undefined {
  for (const category of getDocCategories(product)) {
    const found = category.docs.find((doc) => doc.slug === slug);
    if (found) return found;
  }
  return undefined;
}

export function findDocByFilePath(product: Product, filePath: string): DocEntry | undefined {
  const normalized = filePath.replace(/\\/g, '/');
  return getDocCategories(product)
    .flatMap((category) => category.docs)
    .find((doc) => doc.filePath.replace(/\\/g, '/') === normalized);
}

export function getAllSlugs(product: Product): string[] {
  return getDocCategories(product).flatMap((category) => category.docs.map((doc) => doc.slug));
}
