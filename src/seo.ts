import {
  getDocsBasePath,
  stripLanguagePrefix,
  withLanguage,
  type Language,
  type Product,
} from './routing';
import type { DocEntry } from './docs/registry';

const origin = 'https://echo-agent.dev';

export interface PageMetadata {
  title: string;
  description: string;
}

export const metadata: Record<Product, Record<'home' | 'docs', Record<Language, PageMetadata>>> = {
  'echo-agent': {
    home: {
      zh: {
        title: 'echo-agent - Rust AI Agent 框架',
        description:
          'echo-agent 是简单易上手、功能强大的可组合 Rust Agent 框架；模块化 crate、类型化事件、示例、测试与完整双语文档帮助快速获得改动反馈。',
      },
      en: {
        title: 'echo-agent - Rust AI Agent Framework',
        description:
          'echo-agent is an easy-to-start, powerfully composable Rust Agent framework with focused crates, typed events, examples, tests, and comprehensive bilingual documentation for fast change feedback.',
      },
    },
    docs: {
      zh: {
        title: 'echo-agent 文档',
        description: 'echo-agent 框架文档，由框架仓库中的中英文源文档同步生成。',
      },
      en: {
        title: 'echo-agent Documentation',
        description:
          'echo-agent framework documentation synchronized from the English sources in the framework repository.',
      },
    },
  },
  eko: {
    home: {
      zh: {
        title: 'EKO - 本地个人 AI 助理',
        description:
          'EKO 是面向 Coding、数据处理与分析、学术研究、生物医学文献研究和数十小时长程任务的本地个人 AI 助理。',
      },
      en: {
        title: 'EKO - Local Personal AI Assistant',
        description:
          'EKO is a local personal AI assistant for coding, data processing and analysis, academic and biomedical literature research, and long-horizon tasks designed to run for hours.',
      },
    },
    docs: {
      zh: {
        title: 'EKO 文档',
        description: 'EKO 的安装、启动与本地数据说明。',
      },
      en: {
        title: 'EKO Documentation',
        description: 'Installation, startup, and local data guidance for EKO.',
      },
    },
  },
};

function setMeta(selector: string, content: string): void {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
}

function ensureLink(rel: string, hreflang?: string): HTMLLinkElement {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
  const existing = document.querySelector<HTMLLinkElement>(selector);
  if (existing) return existing;
  const link = document.createElement('link');
  link.rel = rel;
  if (hreflang) link.hreflang = hreflang;
  document.head.append(link);
  return link;
}

function setAlternate(language: 'zh-CN' | 'en' | 'x-default', href: string): void {
  ensureLink('alternate', language).href = href;
}

export interface StructuredDataRoute {
  path: string;
  language: Language;
  product: Product;
  view: 'home' | 'docs';
  slug?: string;
  title: string;
  description: string;
}

function docsPath(product: Product, language: Language): string {
  return withLanguage(getDocsBasePath(product), language);
}

export function structuredData(route: StructuredDataRoute): object {
  const canonical = `${origin}${route.path}`;
  const graph: object[] = [
    {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: 'Echo Agent',
      url: `${origin}/`,
    },
  ];

  if (route.view === 'home') {
    graph.push(
      route.product === 'echo-agent'
        ? {
            '@type': 'SoftwareSourceCode',
            name: 'echo-agent',
            description: route.description,
            codeRepository: 'https://github.com/EchoYue-lp/echo-agent',
            programmingLanguage: 'Rust',
            license: 'https://opensource.org/licenses/MIT',
            url: canonical,
          }
        : {
            '@type': 'SoftwareApplication',
            name: 'EKO',
            description: route.description,
            applicationCategory: 'DeveloperApplication',
            license: 'https://opensource.org/licenses/MIT',
            url: canonical,
            sameAs: 'https://github.com/EchoYue-lp/echo-agent-cli',
          },
    );
  } else {
    graph.push(
      route.slug
        ? {
            '@type': 'TechArticle',
            headline: route.title,
            description: route.description,
            inLanguage: route.language === 'zh' ? 'zh-CN' : 'en',
            mainEntityOfPage: canonical,
            author: { '@id': `${origin}/#organization` },
          }
        : {
            '@type': 'CollectionPage',
            name: route.title,
            description: route.description,
            inLanguage: route.language === 'zh' ? 'zh-CN' : 'en',
            url: canonical,
          },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: route.product === 'eko' ? 'EKO' : 'echo-agent',
            item: `${origin}${withLanguage(route.product === 'eko' ? '/eko' : '/', route.language)}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: route.language === 'zh' ? '文档' : 'Documentation',
            item: `${origin}${docsPath(route.product, route.language)}`,
          },
          ...(route.slug
            ? [
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: route.title.split(' | ')[0],
                  item: canonical,
                },
              ]
            : []),
        ],
      },
    );
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

function setStructuredData(route: StructuredDataRoute): void {
  let script = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    document.head.append(script);
  }
  script.textContent = JSON.stringify(structuredData(route)).replace(/</g, '\\u003c');
}

export function getPageMetadata(
  product: Product,
  view: 'home' | 'docs',
  language: Language,
): PageMetadata {
  return metadata[product][view][language];
}

export function getDocPageMetadata(
  product: Product,
  language: Language,
  doc: DocEntry,
): PageMetadata {
  const productName = product === 'eko' ? 'EKO' : 'echo-agent';
  return {
    title: `${doc.title[language]} | ${productName} ${language === 'zh' ? '文档' : 'Documentation'}`,
    description:
      language === 'zh'
        ? `阅读 ${productName} 的《${doc.title.zh}》文档；内容从产品权威仓库同步并经过链接校验。`
        : `Read ${doc.title.en} in the ${productName} documentation, synchronized from the authoritative source repository.`,
  };
}

export function applyPageMetadata(
  product: Product,
  view: 'home' | 'docs',
  language: Language,
  pathname: string,
): void {
  const page = getPageMetadata(product, view, language);
  applyMetadata(page, language, pathname);
  setStructuredData({
    path: withLanguage(stripLanguagePrefix(pathname), language),
    language,
    product,
    view,
    ...page,
  });
}

export function applyDocMetadata(
  product: Product,
  language: Language,
  doc: DocEntry,
  pathname: string,
): void {
  const page = getDocPageMetadata(product, language, doc);
  applyMetadata(page, language, pathname);
  setStructuredData({
    path: withLanguage(stripLanguagePrefix(pathname), language),
    language,
    product,
    view: 'docs',
    slug: doc.slug,
    ...page,
  });
}

export function applyNotFoundMetadata(language: Language): void {
  document.title = language === 'zh' ? '页面不存在 | Echo Agent' : 'Page not found | Echo Agent';
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  setMeta('meta[name="robots"]', 'noindex, follow');
  document.querySelector('link[rel="canonical"]')?.remove();
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
  document.querySelector('script[type="application/ld+json"]')?.remove();
}

function applyMetadata(page: PageMetadata, language: Language, pathname: string): void {
  const basePath = stripLanguagePrefix(pathname);
  const canonicalPath = withLanguage(basePath, language);
  const canonicalUrl = `https://echo-agent.dev${canonicalPath}`;
  const zhUrl = `https://echo-agent.dev${withLanguage(basePath, 'zh')}`;
  const enUrl = `https://echo-agent.dev${withLanguage(basePath, 'en')}`;
  document.title = page.title;
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  setMeta('meta[name="description"]', page.description);
  setMeta('meta[property="og:title"]', page.title);
  setMeta('meta[property="og:description"]', page.description);
  setMeta('meta[property="og:url"]', canonicalUrl);
  setMeta('meta[property="og:locale"]', language === 'zh' ? 'zh_CN' : 'en_US');
  setMeta('meta[name="twitter:title"]', page.title);
  setMeta('meta[name="twitter:description"]', page.description);
  setMeta('meta[name="robots"]', 'index, follow');
  ensureLink('canonical').href = canonicalUrl;
  setAlternate('zh-CN', zhUrl);
  setAlternate('en', enUrl);
  setAlternate('x-default', zhUrl);
}
