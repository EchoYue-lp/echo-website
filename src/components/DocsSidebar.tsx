import { useState } from 'react';
import { docCategories, type DocCategory, type Language } from '../docs/registry';

interface DocsSidebarProps {
  language: Language;
  activeSlug: string;
  onNavigate: (slug: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function DocsSidebar({
  language,
  activeSlug,
  onNavigate,
  isOpen,
  onClose,
}: DocsSidebarProps) {
  const [expandedCats, setExpandedCats] = useState<Set<number>>(() => {
    // Auto-expand the category containing the active doc
    const initial = new Set<number>();
    docCategories.forEach((cat, idx) => {
      if (cat.docs.some(d => d.slug === activeSlug)) {
        initial.add(idx);
      }
    });
    return initial;
  });

  const toggleCategory = (idx: number) => {
    setExpandedCats(prev => {
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
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-14 left-0 bottom-0 z-40 w-72
          bg-zinc-950 border-r border-zinc-800
          overflow-y-auto overscroll-contain
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <nav className="py-4 px-3 space-y-1">
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

  return (
    <div className="mb-1">
      {/* Category header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors cursor-pointer"
      >
        <span className="text-base">{category.icon}</span>
        <span className="flex-1 text-left">{title}</span>
        <svg
          className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Doc items */}
      {isExpanded && (
        <div className="ml-4 mt-0.5 space-y-0.5 border-l border-zinc-800 pl-3">
          {category.docs.map(doc => {
            const isActive = doc.slug === activeSlug;
            const docTitle = language === 'zh' ? doc.title.zh : doc.title.en;

            if (doc.external) {
              return (
                <a
                  key={doc.slug}
                  href={doc.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-400 hover:text-blue-400 transition-colors rounded-md"
                >
                  {docTitle}
                  <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              );
            }

            return (
              <button
                key={doc.slug}
                onClick={() => onNavigate(doc.slug)}
                className={`
                  w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors cursor-pointer
                  ${isActive
                    ? 'bg-blue-500/10 text-blue-400 font-medium border-l-2 border-blue-400 -ml-[13px] pl-[25px]'
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
