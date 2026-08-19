import { BookOpen, Braces, Home, Languages } from 'lucide-react';

type Language = 'zh' | 'en';
type Product = 'echo-agent' | 'eko';
type View = 'home' | 'docs';

interface NavbarProps {
  language: Language;
  product: Product;
  view: View;
  onToggleLanguage: () => void;
  onSwitchProduct: (product: Product) => void;
  onSwitchView: (view: View) => void;
}

const labels = {
  zh: {
    language: '切换到英文',
    navigation: '主导航',
    product: '产品切换',
    home: '首页',
    docs: '文档',
    nextLanguage: 'EN',
  },
  en: {
    language: 'Switch to Chinese',
    navigation: 'Main navigation',
    product: 'Product switcher',
    home: 'Home',
    docs: 'Docs',
    nextLanguage: '中文',
  },
} as const;

export default function Navbar({
  language,
  product,
  view,
  onToggleLanguage,
  onSwitchProduct,
  onSwitchView,
}: NavbarProps) {
  const label = labels[language];
  const productClass = (active: boolean) =>
    `min-h-9 rounded-sm px-3 py-1.5 text-xs font-semibold ${
      active ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
    }`;
  const viewClass = (active: boolean) =>
    `inline-flex min-h-9 items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-semibold ${
      active
        ? 'bg-emerald-300/15 text-emerald-200'
        : 'text-zinc-400 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <nav
      aria-label={label.navigation}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b0d0c]/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-8">
        <button
          type="button"
          onClick={() => onSwitchView('home')}
          aria-label="Echo home page"
          className="flex min-h-10 shrink-0 items-center gap-2 rounded-sm px-1 text-sm font-semibold text-white hover:text-emerald-200"
        >
          <Braces aria-hidden="true" className="size-5 text-emerald-300" />
          <span className="hidden min-[360px]:inline">Echo</span>
        </button>

        <div
          role="tablist"
          aria-label={label.product}
          className="flex shrink-0 items-center gap-0.5 rounded-md border border-white/10 bg-white/5 p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={product === 'echo-agent'}
            className={productClass(product === 'echo-agent')}
            onClick={() => onSwitchProduct('echo-agent')}
          >
            echo-agent
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={product === 'eko'}
            className={productClass(product === 'eko')}
            onClick={() => onSwitchProduct('eko')}
          >
            EKO
          </button>
        </div>

        <div className="ml-auto hidden items-center gap-0.5 sm:flex">
          <button
            type="button"
            className={viewClass(view === 'home')}
            onClick={() => onSwitchView('home')}
          >
            <Home aria-hidden="true" className="size-4" /> {label.home}
          </button>
          <button
            type="button"
            className={viewClass(view === 'docs')}
            onClick={() => onSwitchView('docs')}
          >
            <BookOpen aria-hidden="true" className="size-4" /> {label.docs}
          </button>
        </div>

        <button
          type="button"
          onClick={onToggleLanguage}
          aria-label={label.language}
          title={label.language}
          className="ml-auto inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-sm border border-white/15 px-2.5 py-1.5 text-xs font-semibold text-zinc-300 hover:border-white/30 hover:text-white sm:ml-0"
        >
          <Languages aria-hidden="true" className="size-4" />
          <span className="hidden min-[430px]:inline">{label.nextLanguage}</span>
        </button>
      </div>

      <div className="flex h-11 items-center gap-1 border-t border-white/5 px-4 sm:hidden">
        <button
          type="button"
          className={viewClass(view === 'home')}
          onClick={() => onSwitchView('home')}
        >
          <Home aria-hidden="true" className="size-4" /> {label.home}
        </button>
        <button
          type="button"
          className={viewClass(view === 'docs')}
          onClick={() => onSwitchView('docs')}
        >
          <BookOpen aria-hidden="true" className="size-4" /> {label.docs}
        </button>
      </div>
    </nav>
  );
}
