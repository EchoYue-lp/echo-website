import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import AnimatedCounter from './AnimatedCounter';

interface ArchitectureProps {
  language: 'zh' | 'en';
}

const data = {
  zh: {
    title: '架构概览',
    subtitle: '模块化设计，可扩展且易维护',
    layers: [
      {
        id: 'app',
        name: '应用层',
        items: ['CLI 接口', 'TUI 终端', 'GUI 桌面'],
        color: '#3b82f6',
        description: '用户直接交互的界面层，支持终端、桌面两种模式',
      },
      {
        id: 'agent',
        name: 'Agent 层',
        items: ['ReAct 引擎', '规划系统', '工具执行器', '记忆管理'],
        color: '#06b6d4',
        description: '核心智能层 — 推理、决策、执行、记忆的完整循环',
      },
      {
        id: 'framework',
        name: '框架层',
        items: ['工具注册表（MCP/LSP/Web/Data/Git）', 'MCP 客户端', 'DAG 工作流引擎', '多 Agent 编排', '评估与自检改进化'],
        color: '#8b5cf6',
        description: '基础设施层 — 提供 Agent 所需的所有能力原语',
      },
      {
        id: 'infra',
        name: '基础设施',
        items: ['tokio 运行时', '类型系统', '异步 I/O', '检查点存储'],
        color: '#ec4899',
        description: 'Rust 提供的零成本抽象 — 安全、并发、高性能',
      },
    ],
  },
  en: {
    title: 'Architecture Overview',
    subtitle: 'Modular design for scalability and maintainability',
    layers: [
      {
        id: 'app',
        name: 'Application Layer',
        items: ['CLI Interface', 'TUI Terminal', 'GUI Desktop'],
        color: '#3b82f6',
        description: 'The user-facing interface layer with terminal and desktop modes',
      },
      {
        id: 'agent',
        name: 'Agent Layer',
        items: ['ReAct Engine', 'Planning System', 'Tool Executor', 'Memory Manager'],
        color: '#06b6d4',
        description: 'Core intelligence — the complete loop of reasoning, decision, execution, and memory',
      },
      {
        id: 'framework',
        name: 'Framework Layer',
        items: ['Tool Registry (MCP/LSP/Web/Data/Git)', 'MCP Client', 'DAG Workflow Engine', 'Multi-Agent Orchestrator', 'Eval & Self-Improvement'],
        color: '#8b5cf6',
        description: 'Capability primitives — everything an agent needs to operate',
      },
      {
        id: 'infra',
        name: 'Infrastructure',
        items: ['tokio Runtime', 'Type System', 'Async I/O', 'Checkpoint Store'],
        color: '#ec4899',
        description: 'Zero-cost Rust abstractions — safety, concurrency, and performance',
      },
    ],
  },
};

export default function Architecture({ language }: ArchitectureProps) {
  const content = data[language];
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const { ref, inView } = useInView(0.1);

  const counters = language === 'zh'
    ? [
        { end: 67, suffix: '+', label: 'Built-in Tools', labelZh: '内置工具', color: 'from-blue-400 to-cyan-400' },
        { end: 66, suffix: '', label: 'Runnable Examples', labelZh: '可运行示例', color: 'from-cyan-400 to-emerald-400' },
        { end: 40, suffix: '+', label: 'Doc Topics', labelZh: '文档主题', color: 'from-purple-400 to-pink-400' },
        { end: 8, suffix: '', label: 'Core Crates', labelZh: '核心 Crates', color: 'from-pink-400 to-rose-400' },
      ]
    : [
        { end: 67, suffix: '+', label: 'Built-in Tools', labelZh: '内置工具', color: 'from-blue-400 to-cyan-400' },
        { end: 66, suffix: '', label: 'Runnable Examples', labelZh: '可运行示例', color: 'from-cyan-400 to-emerald-400' },
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
          {/* SVG connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
            {[0, 1, 2].map((i) => (
              <line
                key={i}
                x1="50%"
                y1={`${22 + i * 26}%`}
                x2="50%"
                y2={`${26 + i * 26}%`}
                stroke={hoveredLayer === content.layers[i].id || hoveredLayer === content.layers[i + 1].id ? content.layers[i].color : '#3f3f46'}
                strokeWidth="2"
                strokeDasharray="6 4"
                className="transition-all duration-300"
                style={{
                  opacity: hoveredLayer === content.layers[i].id || hoveredLayer === content.layers[i + 1].id ? 1 : 0.4,
                }}
              />
            ))}
            {/* Arrow heads */}
            {[0, 1, 2].map((i) => (
              <polygon
                key={`arrow-${i}`}
                points="0,-6 5,0 -5,0"
                fill={hoveredLayer === content.layers[i + 1].id ? content.layers[i].color : '#52525b'}
                className="transition-all duration-300"
                style={{
                  transform: `translate(50%, ${26 + i * 26}%)`,
                  opacity: hoveredLayer === content.layers[i + 1].id ? 1 : 0.4,
                }}
              />
            ))}
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
