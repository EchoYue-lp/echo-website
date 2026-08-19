import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const origin = 'https://echo-agent.dev';
const server = await createServer({
  root,
  appType: 'custom',
  server: { middlewareMode: true },
});

function assertSocialPng(buffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (
    buffer.length < 24 ||
    !buffer.subarray(0, 8).equals(signature) ||
    buffer.readUInt32BE(16) !== 1200 ||
    buffer.readUInt32BE(20) !== 630
  ) {
    throw new Error('Static social preview must be a real 1200x630 PNG');
  }
}

function fileFor(routePath) {
  return routePath === '/'
    ? path.join(dist, 'index.html')
    : path.join(dist, routePath.slice(1), 'index.html');
}

try {
  const { getStaticRoutes } = await server.ssrLoadModule('/src/static-site.tsx');
  const routes = getStaticRoutes();
  const titles = new Set();
  const descriptions = new Set();

  for (const route of routes) {
    const html = await readFile(fileFor(route.path), 'utf8');
    const document = new JSDOM(html).window.document;
    const canonical = `https://echo-agent.dev${route.path}`;
    const title = document.querySelector('title')?.textContent;
    const description = document.querySelector('meta[name="description"]')?.content;
    if (title !== route.title || titles.has(title))
      throw new Error(`Non-unique title: ${route.path}`);
    if (description !== route.description || descriptions.has(description)) {
      throw new Error(`Non-unique description: ${route.path}`);
    }
    titles.add(title);
    descriptions.add(description);

    if (document.querySelector('link[rel="canonical"]')?.href !== canonical) {
      throw new Error(`Invalid canonical URL: ${route.path}`);
    }
    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      if (document.querySelector(selector)?.getAttribute('content') !== `${origin}/og-image.png`) {
        throw new Error(`Static social metadata is not PNG-backed: ${route.path}`);
      }
    }
    for (const language of ['zh-CN', 'en', 'x-default']) {
      if (!document.querySelector(`link[rel="alternate"][hreflang="${language}"]`)?.href) {
        throw new Error(`Missing ${language} hreflang: ${route.path}`);
      }
    }
    const staticRoot = document.querySelector('#root');
    if (
      (staticRoot?.textContent?.trim().length ?? 0) < 60 ||
      !staticRoot?.querySelector('h1') ||
      !staticRoot.querySelector('a[href]')
    ) {
      throw new Error(`Static body is not crawlable: ${route.path}`);
    }
    const graph = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((node) => JSON.parse(node.textContent ?? '{}'))
      .flatMap((value) => value['@graph'] ?? [value]);
    const types = new Set(graph.map((entry) => entry['@type']));
    if (!types.has('Organization')) throw new Error(`Missing Organization JSON-LD: ${route.path}`);
    if (route.view === 'docs' && !types.has('BreadcrumbList')) {
      throw new Error(`Missing documentation BreadcrumbList: ${route.path}`);
    }
    if (route.view === 'docs' && route.slug && !types.has('TechArticle')) {
      throw new Error(`Missing TechArticle JSON-LD: ${route.path}`);
    }
    if (
      route.view === 'docs' &&
      !route.slug &&
      (!types.has('CollectionPage') || types.has('TechArticle'))
    ) {
      throw new Error(`Invalid documentation landing JSON-LD: ${route.path}`);
    }
    if (route.product === 'eko' && route.view === 'home' && !types.has('SoftwareApplication')) {
      throw new Error('Missing EKO SoftwareApplication JSON-LD');
    }
    if (
      route.product === 'echo-agent' &&
      route.view === 'home' &&
      !types.has('SoftwareSourceCode')
    ) {
      throw new Error('Missing echo-agent SoftwareSourceCode JSON-LD');
    }
  }

  const notFound = new JSDOM(await readFile(path.join(dist, '404.html'), 'utf8')).window.document;
  if (
    notFound.querySelector('meta[name="robots"]')?.content !== 'noindex, follow' ||
    notFound.querySelector('link[rel="canonical"]') ||
    notFound.querySelector('script') ||
    !notFound.querySelector('h1')?.textContent?.includes('Page not found')
  ) {
    throw new Error('404.html must be crawl-safe and must not claim a canonical product route');
  }
  const unexpectedRoute = path.join(dist, 'en', 'docs', '__unknown__', 'index.html');
  try {
    await readFile(unexpectedRoute, 'utf8');
    throw new Error('Unknown static routes must not be generated');
  } catch (error) {
    if (error instanceof Error && error.message === 'Unknown static routes must not be generated') {
      throw error;
    }
  }

  const nginx = await readFile(path.join(root, 'nginx.conf.example'), 'utf8');
  if (
    !nginx.includes('try_files $uri $uri/ =404;') ||
    !nginx.includes('error_page 404 /404.html;')
  ) {
    throw new Error('Nginx example must return a real 404 without an SPA fallback');
  }

  const ekoHtml = await readFile(fileFor('/en/eko'), 'utf8');
  for (const fact of [
    'Coding',
    'Data processing and analysis',
    'Academic research',
    'Biomedical literature research',
    'Tens-of-hours long-horizon tasks',
  ]) {
    if (!ekoHtml.includes(fact)) throw new Error(`Static EKO homepage is missing: ${fact}`);
  }
  const capabilityHtml = await readFile(fileFor('/en/eko/docs/capabilities'), 'utf8');
  for (const fact of ['PubMed', 'Europe PMC', 'not diagnosis', 'TaskRuntime']) {
    if (!capabilityHtml.includes(fact))
      throw new Error(`Static capability doc is missing: ${fact}`);
  }

  const docsLanding = new JSDOM(await readFile(fileFor('/en/docs'), 'utf8')).window.document;
  const docsOverview = new JSDOM(await readFile(fileFor('/en/docs/overview'), 'utf8')).window
    .document;
  if (
    docsLanding.querySelector('#root')?.textContent ===
    docsOverview.querySelector('#root')?.textContent
  ) {
    throw new Error('Documentation landing and overview routes must not duplicate the same body');
  }

  const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
  const sitemapPaths = [...sitemap.matchAll(/<loc>https:\/\/echo-agent\.dev([^<]*)<\/loc>/g)].map(
    (match) => match[1] || '/',
  );
  const expectedPaths = routes.map((route) => route.path);
  if (new Set(sitemapPaths).size !== expectedPaths.length) {
    throw new Error('Sitemap route count does not match the static registry');
  }
  for (const routePath of expectedPaths) {
    if (!sitemapPaths.includes(routePath)) throw new Error(`Sitemap is missing ${routePath}`);
  }

  const [robots, llms, llmsFull] = await Promise.all([
    readFile(path.join(dist, 'robots.txt'), 'utf8'),
    readFile(path.join(dist, 'llms.txt'), 'utf8'),
    readFile(path.join(dist, 'llms-full.txt'), 'utf8'),
  ]);
  assertSocialPng(await readFile(path.join(dist, 'og-image.png')));
  if (
    /^Disallow:/m.test(robots) ||
    !robots.includes('Sitemap: https://echo-agent.dev/sitemap.xml')
  ) {
    throw new Error('robots.txt must allow crawlers and name the sitemap');
  }
  for (const fact of ['echo-agent', 'EKO', '/en/eko/docs/capabilities']) {
    if (!llms.includes(fact) || !llmsFull.includes(fact)) {
      throw new Error(`LLM discovery files are missing ${fact}`);
    }
  }
  console.log(`Validated ${routes.length} static HTML routes and discovery artifacts`);
} finally {
  await server.close();
}
