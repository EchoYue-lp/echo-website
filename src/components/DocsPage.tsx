import { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DocsSidebar from './DocsSidebar';
import { findDocBySlug, getDefaultSlug, docCategories, type Language } from '../docs/registry';
import { loadDocContent } from '../docs/loader';

interface DocsPageProps {
  language: Language;
  initialSlug?: string;
}

export default function DocsPage({ language, initialSlug }: DocsPageProps) {
  const [activeSlug, setActiveSlug] = useState(initialSlug ?? getDefaultSlug());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync activeSlug when URL param changes
  useEffect(() => {
    if (initialSlug) {
      setActiveSlug(initialSlug);
    }
  }, [initialSlug]);

  // Navigate to doc and update URL
  const handleNavigate = useCallback((slug: string) => {
    setActiveSlug(slug);
    // Determine base path from current location
    const basePath = location.pathname.startsWith('/eko/docs')
      ? '/eko/docs'
      : '/docs';
    navigate(`${basePath}/${slug}`);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  }, [navigate, location.pathname]);

  const doc = useMemo(() => findDocBySlug(activeSlug), [activeSlug]);
  const content = useMemo(() => {
    if (!doc) return null;
    return loadDocContent(doc.filePath);
  }, [doc]);

  const docTitle = doc
    ? language === 'zh' ? doc.title.zh : doc.title.en
    : '';

  // Find which category this doc belongs to (for breadcrumb)
  const category = docCategories.find(cat =>
    cat.docs.some(d => d.slug === activeSlug)
  );
  const catTitle = category
    ? language === 'zh' ? category.title.zh : category.title.en
    : '';

  return (
    <div className="pt-14 min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <DocsSidebar
        language={language}
        activeSlug={activeSlug}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="lg:pl-72">
        {/* Mobile header */}
        <div className="sticky top-14 z-20 flex items-center gap-3 px-4 py-2 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Open sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm text-zinc-400">{catTitle}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-sm text-zinc-200 font-medium">{docTitle}</span>
        </div>

        {/* Breadcrumb (desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-8 pt-6 pb-2 text-sm text-zinc-500">
          <span>{catTitle}</span>
          <span>/</span>
          <span className="text-zinc-300">{docTitle}</span>
        </div>

        {/* Doc content */}
        <article className="px-4 py-6 lg:px-8 lg:py-4 max-w-4xl">
          {content ? (
            <div className="prose-docs">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Custom heading renderers with anchors
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-white mt-2 mb-6 pb-3 border-b border-zinc-800">
                      {children}
                    </h1>
                  ),
                  h2: ({ children, id }) => (
                    <h2 id={id} className="text-2xl font-bold text-white mt-10 mb-4 pb-2 border-b border-zinc-800/50">
                      {children}
                    </h2>
                  ),
                  h3: ({ children, id }) => (
                    <h3 id={id} className="text-xl font-semibold text-zinc-100 mt-8 mb-3">
                      {children}
                    </h3>
                  ),
                  h4: ({ children, id }) => (
                    <h4 id={id} className="text-lg font-semibold text-zinc-200 mt-6 mb-2">
                      {children}
                    </h4>
                  ),
                  // Code blocks
                  code: ({ className, children, ...props }) => {
                    const isBlock = className?.includes('language-');
                    if (isBlock) {
                      return (
                        <code className={`${className ?? ''} block bg-zinc-900 rounded-lg p-4 text-sm overflow-x-auto border border-zinc-800`} {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className="bg-zinc-800 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="my-4 rounded-lg overflow-hidden">
                      {children}
                    </pre>
                  ),
                  // Links
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-blue-400 hover:text-blue-300 underline underline-offset-2 decoration-blue-400/30 hover:decoration-blue-300/50 transition-colors"
                      target={href?.startsWith('http') ? '_blank' : undefined}
                      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {children}
                    </a>
                  ),
                  // Tables
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4 rounded-lg border border-zinc-800">
                      <table className="w-full text-sm">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-zinc-900">{children}</thead>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-2.5 text-left font-semibold text-zinc-200 border-b border-zinc-800">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-2.5 text-zinc-300 border-b border-zinc-800/50">
                      {children}
                    </td>
                  ),
                  // Lists
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-1 my-3 text-zinc-300 marker:text-zinc-600">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-1 my-3 text-zinc-300 marker:text-zinc-600">
                      {children}
                    </ol>
                  ),
                  // Blockquotes
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500/40 bg-blue-500/5 pl-4 py-2 my-4 text-zinc-300 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),
                  // Paragraphs
                  p: ({ children }) => (
                    <p className="text-zinc-300 leading-relaxed my-3">
                      {children}
                    </p>
                  ),
                  // Horizontal rule
                  hr: () => (
                    <hr className="border-zinc-800 my-8" />
                  ),
                  // Strong
                  strong: ({ children }) => (
                    <strong className="text-white font-semibold">{children}</strong>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="text-center py-20 text-zinc-500">
              <p className="text-lg mb-2">
                {language === 'zh' ? '文档加载中...' : 'Loading document...'}
              </p>
              <p className="text-sm">
                {language === 'zh'
                  ? `未找到文档: ${activeSlug}`
                  : `Document not found: ${activeSlug}`}
              </p>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
