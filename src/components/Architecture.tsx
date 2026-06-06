import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import AnimatedCounter from './AnimatedCounter';

interface ArchitectureProps {
  language: 'zh' | 'en';
}

const data = {
  zh: {
    title: '架构概览',
    subtitle: '8 个 Crate 组成的分层架构，模块化设计可扩展且易维护',
    layers: [
      {
        id: 'agent',
        name: 'Agent 层 (echo-agents)',
        items: ['ReAct 引擎', '规划系统', 'SubAgent 调度', '上下文管理'],
        color: '#06b6d4',
        description: '核心智能层 — 推理、决策、执行、记忆的完整循环',
      },
      {
        id: 'execution',
        name: '执行层 (echo-execution)',
        items: ['工具注册表', '技能系统', 'Hook 系统', '沙箱 (Docker/K8s)', '风险分类'],
        color: '#3b82f6',
        description: '工具执行引擎 — 注册、调度、安全隔离、生命周期管理',
      },
      {
        id: 'integration',
        name: '集成层 (echo-integration)',
        items: ['LLM 提供商 (OpenAI/Anthropic/Gemini/Ollama)', 'MCP 客户端', 'LSP 客户端', 'IM 频道 (飞书/QQ)'],
        color: '#8b5cf6',
        description: '外部系统集成 — LLM、协议、语言服务、即时通讯',
      },
      {
        id: 'orchestration',
        name: '编排层 (echo-orchestration)',
        items: ['DAG 工作流引擎', '任务调度器', '进度跟踪', '检查点存储', '后台任务'],
        color: '#f59e0b',
        description: '复杂任务编排 — DAG 依赖、并行调度、断点恢复、长时间运行',
      },
      {
        id: 'core',
        name: '核心层 (echo-core)',
        items: ['Trait 定义 (Agent/Tool/Store/Plugin)', '类型系统', '错误处理', '内存存储抽象'],
        color: '#ec4899',
        description: '抽象基础 — 所有 trait 和类型的定义，零实现依赖',
      },
      {
        id: 'tools',
        name: '工具层 (echo-tools)',
        items: ['文件操作', 'Shell/Git', 'Web 搜索/抓取', '数据 (Excel/PDF/Chart)', '研究 (arXiv/PubMed)'],
        color: '#10b981',
        description: '67+ 内置工具实现 — 开箱即用的能力集合',
      },
    ],
  },
  en: {
    title: 'Architecture Overview',
    subtitle: '8-crate layered architecture — modular, extensible, and maintainable',
    layers: [
      {
        id: 'agent',
        name: 'Agent Layer (echo-agents)',
        items: ['ReAct Engine', 'Planning System', 'SubAgent Dispatch', 'Context Manager'],
        color: '#06b6d4',
        description: 'Core intelligence — the complete loop of reasoning, decision, execution, and memory',
      },
      {
        id: 'execution',
        name: 'Execution Layer (echo-execution)',
        items: ['Tool Registry', 'Skill System', 'Hook System', 'Sandbox (Docker/K8s)', 'Risk Classification'],
        color: '#3b82f6',
        description: 'Tool execution engine — registration, scheduling, safety isolation, lifecycle management',
      },
      {
        id: 'integration',
        name: 'Integration Layer (echo-integration)',
        items: ['LLM Providers (OpenAI/Anthropic/Gemini/Ollama)', 'MCP Client', 'LSP Client', 'IM Channels (Feishu/QQ)'],
        color: '#8b5cf6',
        description: 'External system integration — LLMs, protocols, language services, messaging',
      },
      {
        id: 'orchestration',
        name: 'Orchestration Layer (echo-orchestration)',
        items: ['DAG Workflow Engine', 'Task Scheduler', 'Progress Tracking', 'Checkpoint Store', 'Background Tasks'],
        color: '#f59e0b',
        description: 'Complex task orchestration — DAG dependencies, parallel scheduling, checkpoint/resume, long-running support',
      },
      {
        id: 'core',
        name: 'Core Layer (echo-core)',
        items: ['Trait Definitions (Agent/Tool/Store/Plugin)', 'Type System', 'Error Handling', 'Memory Store Abstractions'],
        color: '#ec4899',
        description: 'Abstract foundation — all trait and type definitions with zero implementation dependencies',
      },
      {
        id: 'tools',
        name: 'Tools Layer (echo-tools)',
        items: ['File Operations', 'Shell/Git', 'Web Search/Fetch', 'Data (Excel/PDF/Chart)', 'Research (arXiv/PubMed)'],
        color: '#10b981',
        description: '67+ built-in tool implementations — ready-to-use capability set',
      },
    ],
  },
};

export default function Architecture({ language }: ArchitectureProps) {
  const content = data[language];
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const { ref, inView } = useInView(0.1);

  const counters = [
    { end: 67, suffix: '+', label: 'Built-in Tools', labelZh: '内置工具', color: 'from-blue-400 to-cyan-400' },
    { end: 70, suffix: '', label: 'Runnable Examples', labelZh: '可运行示例', color: 'from-cyan-400 to-emerald-400' },
    { end: 40, suffix: '+', label: 'Doc Topics', labelZh: '文档主题', color: 'from-purple-400 to-pink-400' },
    { end: 8, suffix: '', label: 'Core Crates', labelZh: '核心 Crates', color: 'from-pink-400 to-rose-400' },
  ];

  return (
    <section
      ref={ref}
      aria-labelledby="architecture-heading"
      className="relative py-24 px-4 bg-zinc-900 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 id="architecture-heading" className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {content.title}
          </h2>
          <p className="text-lg text-zinc-400">{content.subtitle}</p>
        </div>

        {/* Architecture diagram — interactive layers */}
        <div className="relative space-y-4 mb-20">
          {/* SVG connection lines between layers */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
            {content.layers.slice(0, -1).map((_, i) => {
              const yStart = 10 + i * 15;
              const yEnd = yStart + 3;
              return (
                <line
                  key={i}
                  x1="50%"
                  y1={`${yStart}%`}
                  x2="50%"
                  y2={`${yEnd}%`}
                  stroke={hoveredLayer === content.layers[i].id || hoveredLayer === content.layers[i + 1].id ? content.layers[i].color : '#3f3f46'}
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="transition-all duration-300"
                  style={{
                    opacity: hoveredLayer === content.layers[i].id || hoveredLayer === content.layers[i + 1].id ? 1 : 0.4,
                  }}
                />
              );
            })}
          </svg>

          {/* Layer cards */}
          {content.layers.map((layer, index) => {
            const isHovered = hoveredLayer === layer.id;
            const isAdjacent =
              hoveredLayer !== null &&
              Math.abs(
                content.layers.findIndex((l) => l.id === hoveredLayer) - index
              ) === 1;

            return (
              <div
                key={layer.id}
                className={`relative z-10 rounded-xl p-5 md:p-6 cursor-pointer transition-all duration-300 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${200 + index * 100}ms`,
                  background: isHovered
                    ? `linear-gradient(135deg, ${layer.color}15, ${layer.color}08)`
                    : 'rgba(39, 39, 42, 0.5)',
                  border: `1px solid ${isHovered ? layer.color + '60' : isAdjacent ? layer.color + '30' : '#3f3f46'}`,
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: isHovered ? `0 0 30px ${layer.color}20` : 'none',
                }}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Layer name */}
                  <div className="flex items-center gap-3 md:w-48 flex-shrink-0">
                    <div
                      className="w-3 h-3 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: layer.color,
                        boxShadow: isHovered ? `0 0 12px ${layer.color}` : 'none',
                      }}
                    />
                    <h3 className="text-lg font-bold text-white">{layer.name}</h3>
                  </div>

                  {/* Component pills */}
                  <div className="flex flex-wrap gap-2 flex-1">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-lg text-sm transition-all duration-200"
                        style={{
                          backgroundColor: isHovered ? `${layer.color}15` : 'rgba(24, 24, 27, 0.5)',
                          border: `1px solid ${isHovered ? layer.color + '40' : '#3f3f46'}`,
                          color: isHovered ? layer.color : '#a1a1aa',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Description (appears on hover) */}
                  <div
                    className="text-sm transition-all duration-300 md:w-64 flex-shrink-0"
                    style={{
                      color: isHovered ? '#d4d4d8' : '#52525b',
                      maxHeight: isHovered ? '60px' : '0',
                      opacity: isHovered ? 1 : 0,
                      overflow: 'hidden',
                    }}
                  >
                    {layer.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Animated stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {counters.map((c) => (
            <AnimatedCounter
              key={c.label}
              end={c.end}
              suffix={c.suffix}
              label={c.label}
              labelZh={c.labelZh}
              language={language}
              color={c.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
