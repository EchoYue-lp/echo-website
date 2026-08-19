/* eslint-disable react-refresh/only-export-components -- this module is a build-time SSR entry. */
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import HomePage, { getHomeContent } from './components/HomePage';
import DocsLanding from './components/DocsLanding';
import { resolveMarkdownAsset, resolveMarkdownHref } from './docs/links';
import { loadDocContent } from './docs/loader';
import { findDocBySlug, getAllSlugs, getDocCategories, type DocEntry } from './docs/registry';
import { getDocsBasePath, withLanguage, type Language, type Product } from './routing';
import { getDocPageMetadata, getPageMetadata, structuredData } from './seo';

const origin = 'https://echo-agent.dev';

export interface StaticRoute {
  path: string;
  language: Language;
  product: Product;
  view: 'home' | 'docs';
  slug?: string;
  title: string;
  description: string;
}

export interface DiscoveryArtifacts {
  'sitemap.xml': string;
  'robots.txt': string;
  'llms.txt': string;
  'llms-full.txt': string;
}

function docsPath(product: Product, language: Language, slug?: string): string {
  const base = getDocsBasePath(product);
  return withLanguage(slug ? `${base}/${slug}` : base, language);
}

export function getStaticRoutes(): StaticRoute[] {
  const routes: StaticRoute[] = [];
  for (const language of ['zh', 'en'] as const) {
    for (const product of ['echo-agent', 'eko'] as const) {
      const home = getPageMetadata(product, 'home', language);
      routes.push({
        path: withLanguage(product === 'eko' ? '/eko' : '/', language),
        language,
        product,
        view: 'home',
        ...home,
      });

      const landing = getPageMetadata(product, 'docs', language);
      routes.push({
        path: docsPath(product, language),
        language,
        product,
        view: 'docs',
        ...landing,
      });

      for (const slug of getAllSlugs(product)) {
        const doc = findDocBySlug(product, slug);
        if (!doc) continue;
        routes.push({
          path: docsPath(product, language, slug),
          language,
          product,
          view: 'docs',
          slug,
          ...getDocPageMetadata(product, language, doc),
        });
      }
    }
  }
  return routes;
}

function StaticDoc({
  content,
  doc,
  language,
  product,
}: {
  content: string;
  doc: DocEntry;
  language: Language;
  product: Product;
}) {
  const categories = getDocCategories(product);
  return (
    <main className="static-doc-shell">
      <header>
        <a href={withLanguage(product === 'eko' ? '/eko' : '/', language)}>
          {product === 'eko' ? 'EKO' : 'echo-agent'}
        </a>
        <a href={docsPath(product, language)}>{language === 'zh' ? '文档' : 'Documentation'}</a>
      </header>
      <div className="static-doc-layout">
        <nav aria-label={language === 'zh' ? '文档目录' : 'Documentation index'}>
          {categories.map((category) => (
            <section key={category.title.en}>
              <h2>{category.title[language]}</h2>
              <ul>
                {category.docs.map((entry) => (
                  <li key={entry.slug}>
                    <a href={docsPath(product, language, entry.slug)}>{entry.title[language]}</a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
        <article>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
            components={{
              a: ({ href, children }) => {
                const resolved = resolveMarkdownHref(href, product, language, doc);
                return <a href={resolved.href}>{children}</a>;
              },
              img: ({ src, alt }) => (
                <img src={resolveMarkdownAsset(src, product, language, doc)} alt={alt ?? ''} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}

export async function renderStaticRoute(route: StaticRoute): Promise<string> {
  if (route.view === 'home') {
    return renderToStaticMarkup(<HomePage product={route.product} language={route.language} />);
  }
  if (!route.slug) {
    return renderToStaticMarkup(<DocsLanding product={route.product} language={route.language} />);
  }
  const slug = route.slug;
  const doc = findDocBySlug(route.product, slug);
  if (!doc) throw new Error(`Static route references an unknown document: ${route.path}`);
  const markdown = await loadDocContent(route.product, route.language, doc.filePath);
  return renderToStaticMarkup(
    <StaticDoc content={markdown} doc={doc} language={route.language} product={route.product} />,
  );
}

export { structuredData };

function xmlEscape(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function sitemap(routes: StaticRoute[]): string {
  const entries = routes.map((route) => {
    const basePath =
      route.language === 'en' ? route.path.replace(/^\/en(?=\/|$)/, '') || '/' : route.path;
    const zh = `${origin}${withLanguage(basePath, 'zh')}`;
    const en = `${origin}${withLanguage(basePath, 'en')}`;
    return `  <url>\n    <loc>${xmlEscape(`${origin}${route.path}`)}</loc>\n    <xhtml:link rel="alternate" hreflang="zh-CN" href="${xmlEscape(zh)}" />\n    <xhtml:link rel="alternate" hreflang="en" href="${xmlEscape(en)}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(zh)}" />\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
}

function homeText(language: Language, product: Product): string {
  const page = getHomeContent(product, language);
  const sections = [
    `# ${page.title}`,
    page.tagline,
    page.description,
    `## ${page.evidenceTitle}`,
    page.evidenceIntro,
    ...page.evidence.map((item) => `- ${item.label}: ${item.value}. ${item.detail}`),
    `## ${page.capabilitiesTitle}`,
    page.capabilitiesIntro,
    ...page.capabilities.map((item) => `- ${item.title}: ${item.description}`),
  ];
  return sections.join('\n');
}

export async function discoveryArtifacts(): Promise<DiscoveryArtifacts> {
  const routes = getStaticRoutes();
  const compact = [
    '# Echo Agent',
    '',
    '> Official discovery index for echo-agent and EKO. Chinese routes are the default; English routes use `/en`.',
    '',
    homeText('en', 'echo-agent'),
    '',
    homeText('en', 'eko'),
    '',
    '## Documentation',
    ...routes
      .filter((route) => route.view === 'docs')
      .map((route) => `- ${route.title}: ${origin}${route.path}`),
  ].join('\n');

  const full: string[] = [compact];
  for (const route of routes) {
    if (route.view !== 'docs' || !route.slug) continue;
    const doc = findDocBySlug(route.product, route.slug);
    if (!doc) continue;
    const markdown = await loadDocContent(route.product, route.language, doc.filePath);
    full.push(`\n---\n\nSource: ${origin}${route.path}\n\n${markdown.trim()}\n`);
  }

  return {
    'sitemap.xml': sitemap(routes),
    'robots.txt': 'User-agent: *\nAllow: /\n\nSitemap: https://echo-agent.dev/sitemap.xml\n',
    'llms.txt': `${compact}\n`,
    'llms-full.txt': `${full.join('\n')}\n`,
  };
}
