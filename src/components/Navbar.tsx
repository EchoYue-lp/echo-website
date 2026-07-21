type Language = 'zh' | 'en';
type Product = 'echo-agent' | 'eko';
type View = 'home' | 'docs';

interface NavbarProps {
  language: Language;
  product: Product;
  view: View;
  onToggleLanguage: () => void;
  onSwitchProduct: (p: Product) => void;
  onSwitchView: (v: View) => void;
}

const labels: Record<Language, { agent: string; product: string; lang: string; langLabel: string; navLabel: string; switchLabel: string; docs: string }> = {
  zh: {
    agent: 'echo-agent',
    product: 'EKO',
    lang: 'EN',
    langLabel: '切换到英文',
    navLabel: '主导航',
    switchLabel: '产品切换',
    docs: '文档',
  },
  en: {
    agent: 'echo-agent',
    product: 'EKO',
    lang: '中文',
    langLabel: 'Switch to Chinese',
    navLabel: 'Main navigation',
    switchLabel: 'Product switcher',
    docs: 'Docs',
  },
};

export default function Navbar({ language, product, view, onToggleLanguage, onSwitchProduct, onSwitchView }: NavbarProps) {
  const l = labels[language];

  const tabClass = (active: boolean) =>
    `px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
      active
        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
        : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
    }`;

  const viewClass = (active: boolean) =>
    `px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
      active
        ? 'text-white bg-zinc-800'
        : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'
    }`;

  return (
    <nav aria-label={l.navLabel} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSwitchView('home')}
            aria-label="Echo home page"
            className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer"
          >
            Echo
          </button>

          {/* Home / Docs toggle */}
          <div className="hidden sm:flex items-center gap-0.5 ml-3 bg-zinc-900/60 rounded-full p-0.5 border border-zinc-800/50">
            <button
              onClick={() => onSwitchView('home')}
              className={viewClass(view === 'home')}
            >
              Home
            </button>
            <button
              onClick={() => onSwitchView('docs')}
              className={viewClass(view === 'docs')}
            >
              {l.docs}
            </button>
          </div>
        </div>

        {/* Product tabs (only show on home view) */}
        {view === 'home' && (
          <div role="tablist" aria-label={l.switchLabel} className="flex items-center gap-1 bg-zinc-900/80 rounded-full p-1 border border-zinc-800">
            <button
              role="tab"
              aria-selected={product === 'echo-agent'}
              className={tabClass(product === 'echo-agent')}
              onClick={() => onSwitchProduct('echo-agent')}
            >
              {l.agent}
            </button>
            <button
              role="tab"
              aria-selected={product === 'eko'}
              className={tabClass(product === 'eko')}
              onClick={() => onSwitchProduct('eko')}
            >
              {l.product}
            </button>
          </div>
        )}

        {/* Spacer when no product tabs */}
        {view !== 'home' && <div className="flex-1" />}

        {/* Language switch */}
        <button
          onClick={onToggleLanguage}
          aria-label={l.langLabel}
          className="px-3 py-1.5 text-xs font-medium text-zinc-400 border border-zinc-700 rounded-full hover:text-white hover:border-zinc-500 transition-all cursor-pointer"
        >
          {l.lang}
        </button>
      </div>

      {/* Mobile: Home/Docs toggle below main nav */}
      <div className="flex sm:hidden items-center gap-0.5 px-4 pb-2 bg-zinc-950/80">
        <button
          onClick={() => onSwitchView('home')}
          className={viewClass(view === 'home')}
        >
          Home
        </button>
        <button
          onClick={() => onSwitchView('docs')}
          className={viewClass(view === 'docs')}
        >
          {l.docs}
        </button>
      </div>
    </nav>
  );
}
