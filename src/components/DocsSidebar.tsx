import { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  ChevronRight,
  ExternalLink,
  FlaskConical,
  Library,
  MonitorCog,
  Plug,
  Rocket,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { getDocCategories, type DocCategory, type Language, type Product } from '../docs/registry';

interface DocsSidebarProps {
  language: Language;
  product: Product;
  activeSlug: string;
  onNavigate: (slug: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<DocCategory['icon'], LucideIcon> = {
  rocket: Rocket,
  brain: BrainCircuit,
  workflow: Workflow,
  plug: Plug,
  chart: BarChart3,
  flask: FlaskConical,
  library: Library,
  book: BookOpen,
  monitor: MonitorCog,
};

export default function DocsSidebar({
  language,
  product,
  activeSlug,
  onNavigate,
  isOpen,
  onClose,
}: DocsSidebarProps) {
  const docCategories = useMemo(() => getDocCategories(product), [product]);
  const [expandedCats, setExpandedCats] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    docCategories.forEach((category, idx) => {
      if (category.docs.some((doc) => doc.slug === activeSlug)) {
        initial.add(idx);
      }
    });
    return initial;
  });

  useEffect(() => {
    const activeCategory = docCategories.findIndex((category) =>
      category.docs.some((doc) => doc.slug === activeSlug),
    );
    if (activeCategory >= 0) {
      setExpandedCats((previous) => new Set(previous).add(activeCategory));
    }
  }, [activeSlug, docCategories]);

  const toggleCategory = (idx: number) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleNavigate = (slug: string) => {
    onNavigate(slug);
    // On mobile, close sidebar after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label={language === 'zh' ? '关闭文档导航' : 'Close documentation navigation'}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-[108px] sm:top-16 left-0 bottom-0 z-40 w-72
          bg-[#0b0d0c] border-r border-white/10
          overflow-y-auto overscroll-contain
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <nav className="space-y-1 px-3 py-4">
          {docCategories.map((cat, catIdx) => (
            <CategoryGroup
              key={catIdx}
              category={cat}
              language={language}
              isExpanded={expandedCats.has(catIdx)}
              onToggle={() => toggleCategory(catIdx)}
              activeSlug={activeSlug}
              onNavigate={handleNavigate}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}

interface CategoryGroupProps {
  category: DocCategory;
  language: Language;
  isExpanded: boolean;
  onToggle: () => void;
  activeSlug: string;
  onNavigate: (slug: string) => void;
}

function CategoryGroup({
  category,
  language,
  isExpanded,
  onToggle,
  activeSlug,
  onNavigate,
}: CategoryGroupProps) {
  const title = language === 'zh' ? category.title.zh : category.title.en;
  const CategoryIcon = categoryIcons[category.icon];

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-10 w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-zinc-300 hover:bg-white/5 hover:text-white"
      >
        <CategoryIcon aria-hidden="true" className="size-4 text-zinc-500" />
        <span className="flex-1 text-left">{title}</span>
        <ChevronRight
          aria-hidden="true"
          className={`size-4 text-zinc-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="ml-4 mt-0.5 space-y-0.5 border-l border-zinc-800 pl-3">
          {category.docs.map((doc) => {
            const isActive = doc.slug === activeSlug;
            const docTitle = language === 'zh' ? doc.title.zh : doc.title.en;

            if (doc.external) {
              return (
                <a
                  key={doc.slug}
                  href={doc.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-zinc-400 hover:text-emerald-300"
                >
                  {docTitle}
                  <ExternalLink aria-hidden="true" className="size-3 opacity-60" />
                </a>
              );
            }

            return (
              <button
                type="button"
                key={doc.slug}
                onClick={() => onNavigate(doc.slug)}
                className={`
                  w-full text-left px-3 py-1.5 text-sm rounded-md
                  ${
                    isActive
                      ? 'bg-emerald-300/10 text-emerald-300 font-medium border-l-2 border-emerald-300 -ml-[13px] pl-[25px]'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }
                `}
              >
                {docTitle}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
