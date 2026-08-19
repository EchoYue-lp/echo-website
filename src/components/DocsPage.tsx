import { useCallback, useEffect, useMemo, useState } from 'react';
import { Menu, Undo2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import DocsSidebar from './DocsSidebar';
import DocsLanding from './DocsLanding';
import { resolveMarkdownAsset, resolveMarkdownHref } from '../docs/links';
import { loadDocContent } from '../docs/loader';
import {
  findDocBySlug,
  getDefaultSlug,
  getDocCategories,
  type Language,
  type Product,
} from '../docs/registry';
import { getDocsBasePath, withLanguage } from '../routing';
import { applyDocMetadata } from '../seo';

interface DocsPageProps {
  language: Language;
  product: Product;
  initialSlug?: string;
}

type ContentState =
  | { status: 'idle'; content: null }
  | { status: 'loading'; content: null }
  | { status: 'ready'; content: string }
  | { status: 'error'; content: null };

export default function DocsPage({ language, product, initialSlug }: DocsPageProps) {
  const isLanding = initialSlug === undefined;
  const activeSlug = initialSlug ?? '';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contentState, setContentState] = useState<ContentState>({
    status: 'idle',
    content: null,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const doc = useMemo(() => findDocBySlug(product, activeSlug), [activeSlug, product]);
  const docCategories = useMemo(() => getDocCategories(product), [product]);

  const handleNavigate = useCallback(
    (slug: string) => {
      navigate(withLanguage(`${getDocsBasePath(product)}/${slug}`, language));
      setSidebarOpen(false);
      window.scrollTo(0, 0);
    },
    [language, navigate, product],
  );

  useEffect(() => {
    let active = true;
    if (isLanding || !doc) {
      setContentState({ status: 'idle', content: null });
      return () => {
        active = false;
      };
    }

    setContentState({ status: 'loading', content: null });
    void loadDocContent(product, language, doc.filePath)
      .then((content) => {
        if (active) setContentState({ status: 'ready', content });
      })
      .catch(() => {
        if (active) setContentState({ status: 'error', content: null });
      });

    return () => {
      active = false;
    };
  }, [doc, isLanding, language, product]);

  useEffect(() => {
    if (doc) applyDocMetadata(product, language, doc, location.pathname);
  }, [doc, language, location.pathname, product]);

  useEffect(() => {
    if (contentState.status !== 'ready' || !location.hash) return;
    let targetId = location.hash.slice(1);
    try {
      targetId = decodeURIComponent(targetId);
    } catch {
      // Keep the literal fragment when an external link contains invalid encoding.
    }
    window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView());
  }, [contentState.status, location.hash]);

  const docTitle = doc ? doc.title[language] : '';
  const category = docCategories.find((candidate) =>
    candidate.docs.some((entry) => entry.slug === activeSlug),
  );
  const categoryTitle = category ? category.title[language] : '';

  return (
    <div className="min-h-screen bg-[#0b0d0c] pt-[108px] sm:pt-16">
      <DocsSidebar
        language={language}
        product={product}
        activeSlug={activeSlug}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-72">
        {!isLanding && (
          <div className="sticky top-[108px] z-20 flex min-w-0 items-center gap-3 border-b border-white/10 bg-[#0b0d0c]/95 px-4 py-2 backdrop-blur-sm sm:top-16 lg:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="shrink-0 rounded-md p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
              aria-label={language === 'zh' ? '打开文档导航' : 'Open documentation navigation'}
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
            <span className="truncate text-sm text-zinc-400">{categoryTitle}</span>
            <span className="text-zinc-600">/</span>
            <span className="truncate text-sm font-medium text-zinc-200">{docTitle}</span>
          </div>
        )}

        {!isLanding && (
          <div className="hidden items-center gap-2 px-8 pb-2 pt-6 text-sm text-zinc-500 lg:flex">
            <span>{categoryTitle}</span>
            <span>/</span>
            <span className="text-zinc-300">{docTitle}</span>
          </div>
        )}

        {isLanding ? (
          <DocsLanding language={language} product={product} onNavigate={handleNavigate} />
        ) : (
          <article className="max-w-4xl px-4 py-6 lg:px-8 lg:py-4">
            {doc && contentState.status === 'ready' ? (
              <div className="prose-docs">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSlug]}
                  components={{
                    h1: ({ children, id }) => (
                      <h1
                        id={id}
                        className="mt-2 border-b border-zinc-800 pb-3 text-3xl font-bold text-white"
                      >
                        {children}
                      </h1>
                    ),
                    h2: ({ children, id }) => (
                      <h2
                        id={id}
                        className="mt-10 border-b border-zinc-800/50 pb-2 text-2xl font-bold text-white"
                      >
                        {children}
                      </h2>
                    ),
                    h3: ({ children, id }) => (
                      <h3 id={id} className="mt-8 text-xl font-semibold text-zinc-100">
                        {children}
                      </h3>
                    ),
                    h4: ({ children, id }) => (
                      <h4 id={id} className="mt-6 text-lg font-semibold text-zinc-200">
                        {children}
                      </h4>
                    ),
                    code: ({ className, children, ...props }) => {
                      const isBlock = className?.includes('language-');
                      return isBlock ? (
                        <code
                          className={`${className ?? ''} block overflow-x-auto rounded-md border border-zinc-800 bg-zinc-900 p-4 text-sm`}
                          {...props}
                        >
                          {children}
                        </code>
                      ) : (
                        <code
                          className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-emerald-300"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="my-4 overflow-hidden rounded-md">{children}</pre>
                    ),
                    a: ({ href, children }) => {
                      const resolved = resolveMarkdownHref(href, product, language, doc);
                      const isRoute = resolved.internal && resolved.href.startsWith('/');
                      return (
                        <a
                          href={resolved.href}
                          className="text-emerald-300 underline decoration-emerald-300/30 underline-offset-2 hover:text-emerald-200 hover:decoration-emerald-200/50"
                          target={resolved.internal ? undefined : '_blank'}
                          rel={resolved.internal ? undefined : 'noopener noreferrer'}
                          onClick={
                            isRoute
                              ? (event) => {
                                  event.preventDefault();
                                  navigate(resolved.href);
                                  window.scrollTo(0, 0);
                                }
                              : undefined
                          }
                        >
                          {children}
                        </a>
                      );
                    },
                    img: ({ src, alt }) => (
                      <img
                        src={resolveMarkdownAsset(src, product, language, doc)}
                        alt={alt ?? ''}
                        loading="lazy"
                        className="my-5 h-auto max-w-full rounded-md border border-white/10"
                      />
                    ),
                    table: ({ children }) => (
                      <div className="my-4 overflow-x-auto rounded-md border border-zinc-800">
                        <table className="w-full text-sm">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => <thead className="bg-zinc-900">{children}</thead>,
                    th: ({ children }) => (
                      <th className="border-b border-zinc-800 px-4 py-2.5 text-left font-semibold text-zinc-200">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border-b border-zinc-800/50 px-4 py-2.5 text-zinc-300">
                        {children}
                      </td>
                    ),
                    ul: ({ children }) => (
                      <ul className="my-3 list-inside list-disc space-y-1 text-zinc-300 marker:text-zinc-600">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="my-3 list-inside list-decimal space-y-1 text-zinc-300 marker:text-zinc-600">
                        {children}
                      </ol>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="my-4 rounded-r-md border-l-4 border-emerald-300/40 bg-emerald-300/5 py-2 pl-4 text-zinc-300">
                        {children}
                      </blockquote>
                    ),
                    p: ({ children }) => (
                      <p className="my-3 leading-relaxed text-zinc-300">{children}</p>
                    ),
                    hr: () => <hr className="my-8 border-zinc-800" />,
                    strong: ({ children }) => (
                      <strong className="font-semibold text-white">{children}</strong>
                    ),
                  }}
                >
                  {contentState.content}
                </ReactMarkdown>
              </div>
            ) : doc && contentState.status === 'loading' ? (
              <div className="py-20 text-center text-zinc-400" role="status">
                {language === 'zh' ? '正在加载文档...' : 'Loading documentation...'}
              </div>
            ) : (
              <div className="py-20 text-center text-zinc-400">
                <h1 className="mb-3 text-2xl font-semibold text-white">
                  {language === 'zh' ? '找不到这篇文档' : 'Documentation not found'}
                </h1>
                <p className="text-sm">
                  {language === 'zh'
                    ? `文档标识“${activeSlug}”不存在或尚未同步。`
                    : `The document slug “${activeSlug}” does not exist or has not been synced.`}
                </p>
                <button
                  type="button"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-emerald-300 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-200"
                  onClick={() => handleNavigate(getDefaultSlug(product))}
                >
                  <Undo2 aria-hidden="true" className="size-4" />
                  {language === 'zh' ? '返回文档首页' : 'Back to documentation'}
                </button>
              </div>
            )}
          </article>
        )}
      </div>
    </div>
  );
}
