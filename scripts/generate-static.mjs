import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const baseHtml = await readFile(path.join(dist, 'index.html'), 'utf8');
const server = await createServer({
  root,
  appType: 'custom',
  server: { middlewareMode: true },
});

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function languageLinks(route) {
  const unlocalized =
    route.language === 'en' ? route.path.replace(/^\/en(?=\/|$)/, '') || '/' : route.path;
  const zh = unlocalized;
  const en = unlocalized === '/' ? '/en' : `/en${unlocalized}`;
  return { zh, en };
}

function renderHtml(route, body, jsonLd) {
  const links = languageLinks(route);
  const canonical = `https://echo-agent.dev${route.path}`;
  const zh = `https://echo-agent.dev${links.zh}`;
  const en = `https://echo-agent.dev${links.en}`;
  const language = route.language === 'zh' ? 'zh-CN' : 'en';
  const locale = route.language === 'zh' ? 'zh_CN' : 'en_US';
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const structured = JSON.stringify(jsonLd).replaceAll('<', '\\u003c');
  const managedHead = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="zh-CN" href="${zh}" />
    <link rel="alternate" hreflang="en" href="${en}" />
    <link rel="alternate" hreflang="x-default" href="${zh}" />
    <meta property="og:type" content="${route.view === 'docs' ? 'article' : 'website'}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="https://echo-agent.dev/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="echo-agent and EKO" />
    <meta property="og:site_name" content="Echo Agent" />
    <meta property="og:locale" content="${locale}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="https://echo-agent.dev/og-image.png" />
    <meta name="twitter:image:alt" content="echo-agent and EKO" />
    <script type="application/ld+json">${structured}</script>`;

  return baseHtml
    .replace(/<html\s+lang="[^"]*"/, `<html lang="${language}"`)
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta\s+(?:name|property)="(?:description|og:[^"]+|twitter:[^"]+)"[^>]*\/>/g, '')
    .replace(/\s*<link\s+rel="(?:canonical|alternate)"[^>]*\/>/g, '')
    .replace(/\s*<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
    .replace('</head>', `${managedHead}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

function renderNotFound() {
  const route = {
    path: '/404.html',
    language: 'en',
    product: 'echo-agent',
    view: 'home',
    title: 'Page not found | Echo Agent',
    description: 'The requested Echo Agent page does not exist.',
  };
  return renderHtml(
    route,
    '<main><h1>Page not found</h1><p>The requested Echo Agent page does not exist.</p><a href="/">Echo Agent home</a></main>',
    {},
  )
    .replace(
      '<meta name="robots" content="index, follow" />',
      '<meta name="robots" content="noindex, follow" />',
    )
    .replace(/\s*<link\s+rel="(?:canonical|alternate)"[^>]*\/>/g, '')
    .replace(/\s*<script(?:\s[^>]*)?>[\s\S]*?<\/script>/g, '');
}

function destinationFor(routePath) {
  if (!routePath.startsWith('/') || routePath.includes('..')) {
    throw new Error(`Refusing unsafe static route path: ${routePath}`);
  }
  return routePath === '/'
    ? path.join(dist, 'index.html')
    : path.join(dist, routePath.slice(1), 'index.html');
}

try {
  const site = await server.ssrLoadModule('/src/static-site.tsx');
  const routes = site.getStaticRoutes();
  for (const route of routes) {
    const destination = destinationFor(route.path);
    const body = await site.renderStaticRoute(route);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, renderHtml(route, body, site.structuredData(route)));
  }
  await writeFile(path.join(dist, '404.html'), renderNotFound());

  const artifacts = await site.discoveryArtifacts();
  for (const [name, content] of Object.entries(artifacts)) {
    await writeFile(path.join(dist, name), content);
  }
  console.log(`Generated ${routes.length} static route documents, 404.html, and discovery files`);
} finally {
  await server.close();
}
