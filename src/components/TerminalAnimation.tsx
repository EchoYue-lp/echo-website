import { useEffect, useState, useCallback } from 'react';

interface TerminalLine {
  type: 'command' | 'output' | 'success' | 'error' | 'info' | 'tool' | 'think';
  text: string;
  delay?: number;
}

const frameworkScenes: TerminalLine[][] = [
  // Scene 1: Code review
  [
    { type: 'command', text: '$ echo-agent "review src/auth.rs for security issues"' },
    { type: 'think', text: '⟡ Reading src/auth.rs...' },
    { type: 'tool', text: '🔧 read_file("src/auth.rs") → 142 lines' },
    { type: 'think', text: '⟡ Analyzing authentication flow...' },
    { type: 'error', text: '⚠ Line 67: SQL injection risk in query param' },
    { type: 'error', text: '⚠ Line 89: Token expiry not validated' },
    { type: 'tool', text: '🔧 edit_file("src/auth.rs") → 2 fixes applied' },
    { type: 'success', text: '✓ All security issues resolved' },
  ],
  // Scene 2: Data analysis
  [
    { type: 'command', text: '$ echo-agent "analyze sales_2024.csv"' },
    { type: 'tool', text: '🔧 read_file("sales_2024.csv") → 15,832 rows' },
    { type: 'tool', text: '🔧 profile_data() → 12 columns detected' },
    { type: 'info', text: '  Revenue: ¥2.4M | Growth: +23% YoY' },
    { type: 'info', text: '  Top category: Electronics (38%)' },
    { type: 'tool', text: '🔧 generate_chart("revenue_trend.png")' },
    { type: 'success', text: '✓ Report saved → report_2024.md' },
  ],
  // Scene 3: Build project
  [
    { type: 'command', text: '$ echo-agent "create a REST API with Rust + Axum"' },
    { type: 'think', text: '⟡ Planning project structure...' },
    { type: 'tool', text: '🔧 write_file("Cargo.toml")' },
    { type: 'tool', text: '🔧 write_file("src/main.rs")' },
    { type: 'tool', text: '🔧 write_file("src/routes/mod.rs")' },
    { type: 'tool', text: '🔧 write_file("src/models/user.rs")' },
    { type: 'tool', text: '🔧 shell("cargo build") → compiled in 2.3s' },
    { type: 'success', text: '✓ Project ready — 4 files, 312 lines' },
  ],
];

const ekoScenesZh: TerminalLine[][] = [
  // Scene 1: TUI interaction
  [
    { type: 'command', text: '> 帮我重构这个函数，提高可读性' },
    { type: 'think', text: '⟡ 分析 process_data() 函数...' },
    { type: 'tool', text: '📖 read_file("src/processor.rs")' },
    { type: 'think', text: '⟡ 发现 3 个可优化点：嵌套过深、命名不清、缺少错误处理' },
    { type: 'tool', text: '✏️ edit_file → 提取 validate_input()' },
    { type: 'tool', text: '✏️ edit_file → 重命名 data → records' },
    { type: 'tool', text: '✏️ edit_file → 添加 Result<T> 返回类型' },
    { type: 'success', text: '✓ 重构完成 — 可读性评分 6.2 → 8.7' },
  ],
  // Scene 2: Research mode
  [
    { type: 'command', text: '> 搜索 2024 年 LLM Agent 最新论文' },
    { type: 'tool', text: '🔍 arxiv_search("LLM Agent", 2024)' },
    { type: 'info', text: '  📄 "Toolformer: Language Models as Tool Users"' },
    { type: 'info', text: '  📄 "Voyager: An Open-Ended Embodied Agent"' },
    { type: 'info', text: '  📄 "AutoGPT: An Autonomous Agent Framework"' },
    { type: 'tool', text: '🔍 semantic_scholar_citations() → sorted' },
    { type: 'tool', text: '📄 pdf_fetch(top_3) → downloaded' },
    { type: 'success', text: '✓ 已整理到 research_notes.md' },
  ],
  // Scene 3: Data mode
  [
    { type: 'command', text: '> 分析这个 Excel 里的销售数据趋势' },
    { type: 'tool', text: '📊 read_excel("sales_q4.xlsx") → 3 sheets' },
    { type: 'tool', text: '📊 descriptive_stats() → generated' },
    { type: 'info', text: '  Q4 总营收: ¥1,247万  |  环比 +18.3%' },
    { type: 'info', text: '  爆款产品: A系列 (占比 42%)' },
    { type: 'tool', text: '📊 generate_chart("trend.png")' },
    { type: 'success', text: '✓ 分析报告已保存 → sales_report.md' },
  ],
];

const ekoScenesEn: TerminalLine[][] = [
  // Scene 1: TUI interaction
  [
    { type: 'command', text: '> Refactor this function for better readability' },
    { type: 'think', text: '⟡ Analyzing process_data() function...' },
    { type: 'tool', text: '📖 read_file("src/processor.rs")' },
    { type: 'think', text: '⟡ Found 3 optimization points: deep nesting, unclear naming, missing error handling' },
    { type: 'tool', text: '✏️ edit_file → extract validate_input()' },
    { type: 'tool', text: '✏️ edit_file → rename data → records' },
    { type: 'tool', text: '✏️ edit_file → add Result<T> return type' },
    { type: 'success', text: '✓ Refactored — readability score 6.2 → 8.7' },
  ],
  // Scene 2: Research mode
  [
    { type: 'command', text: '> Search for latest LLM Agent papers from 2024' },
    { type: 'tool', text: '🔍 arxiv_search("LLM Agent", 2024)' },
    { type: 'info', text: '  📄 "Toolformer: Language Models as Tool Users"' },
    { type: 'info', text: '  📄 "Voyager: An Open-Ended Embodied Agent"' },
    { type: 'info', text: '  📄 "AutoGPT: An Autonomous Agent Framework"' },
    { type: 'tool', text: '🔍 semantic_scholar_citations() → sorted' },
    { type: 'tool', text: '📄 pdf_fetch(top_3) → downloaded' },
    { type: 'success', text: '✓ Saved to research_notes.md' },
  ],
  // Scene 3: Data mode
  [
    { type: 'command', text: '> Analyze sales data trends in this Excel' },
    { type: 'tool', text: '📊 read_excel("sales_q4.xlsx") → 3 sheets' },
    { type: 'tool', text: '📊 descriptive_stats() → generated' },
    { type: 'info', text: '  Q4 Revenue: ¥12.47M  |  MoM +18.3%' },
    { type: 'info', text: '  Top product: Series A (42% share)' },
    { type: 'tool', text: '📊 generate_chart("trend.png")' },
    { type: 'success', text: '✓ Report saved → sales_report.md' },
  ],
];

interface TerminalAnimationProps {
  product: 'echo-agent' | 'eko';
  language?: 'zh' | 'en';
}

export default function TerminalAnimation({ product, language = 'zh' }: TerminalAnimationProps) {
  const scenes = product === 'echo-agent'
    ? frameworkScenes
    : (language === 'en' ? ekoScenesEn : ekoScenesZh);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [currentText, setCurrentText] = useState('');

  const scene = scenes[sceneIndex];

  const advanceScene = useCallback(() => {
    setSceneIndex((prev) => (prev + 1) % scenes.length);
    setLineIndex(0);
    setCharIndex(0);
    setDisplayedLines([]);
    setCurrentText('');
  }, [scenes.length]);

  // Reset when product changes
  useEffect(() => {
    setSceneIndex(0);
    setLineIndex(0);
    setCharIndex(0);
    setDisplayedLines([]);
    setCurrentText('');
  }, [product]);

  // Typing effect
  useEffect(() => {
    if (lineIndex >= scene.length) {
      // Scene done, wait then advance
      const timer = setTimeout(advanceScene, 3000);
      return () => clearTimeout(timer);
    }

    const line = scene[lineIndex];
    const fullText = line.text;

    if (charIndex < fullText.length) {
      // Type speed varies by line type
      const baseSpeed = line.type === 'command' ? 40 : 15;
      const jitter = Math.random() * 20;
      const speed = line.delay ?? (baseSpeed + jitter);

      const timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      // Line complete, pause then move to next
      const pauseTime = line.type === 'command' ? 500 : 200;
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, { ...line, text: fullText }]);
        setLineIndex(lineIndex + 1);
        setCharIndex(0);
        setCurrentText('');
      }, pauseTime);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, charIndex, scene, advanceScene]);

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command': return 'text-emerald-400';
      case 'output': return 'text-zinc-300';
      case 'success': return 'text-emerald-400 font-medium';
      case 'error': return 'text-red-400';
      case 'info': return 'text-cyan-400';
      case 'tool': return 'text-yellow-400';
      case 'think': return 'text-purple-400 italic';
      default: return 'text-zinc-400';
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto lg:mx-0">
      {/* Terminal window */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-700/50 shadow-2xl shadow-black/50 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/80 border-b border-zinc-700/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-zinc-500 font-mono">
              {product === 'echo-agent' ? 'echo-agent' : 'eko'} — bash
            </span>
          </div>
          <div className="w-[52px]" />
        </div>

        {/* Terminal content */}
        <div className="p-4 font-mono text-sm min-h-[320px] max-h-[380px] overflow-y-auto scrollbar-thin">
          {/* Completed lines */}
          {displayedLines.map((line, i) => (
            <div key={i} className={`${getLineColor(line.type)} leading-relaxed`}>
              {line.text}
            </div>
          ))}

          {/* Current typing line */}
          {lineIndex < scene.length && (
            <div className={`${getLineColor(scene[lineIndex].type)} leading-relaxed`}>
              {currentText}
              <span className="animate-pulse text-zinc-400">▊</span>
            </div>
          )}

          {/* Scene complete indicator */}
          {lineIndex >= scene.length && (
            <div className="text-zinc-600 mt-2 animate-pulse">
              ─── press any key to continue ───
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
