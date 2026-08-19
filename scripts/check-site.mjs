import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAllSlugs } from '../src/docs/registry.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

function assertSocialPng(buffer, name) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (
    buffer.length < 24 ||
    !buffer.subarray(0, 8).equals(signature) ||
    buffer.readUInt32BE(16) !== 1200 ||
    buffer.readUInt32BE(20) !== 630
  ) {
    throw new Error(`${name} must be a real 1200x630 PNG`);
  }
}

const [indexHtml, sitemap, manifestText, robots, llms, llmsFull] = await Promise.all([
  readFile(path.join(root, 'index.html'), 'utf8'),
  readFile(path.join(publicDir, 'sitemap.xml'), 'utf8'),
  readFile(path.join(publicDir, 'manifest.webmanifest'), 'utf8'),
  readFile(path.join(publicDir, 'robots.txt'), 'utf8'),
  readFile(path.join(publicDir, 'llms.txt'), 'utf8'),
  readFile(path.join(publicDir, 'llms-full.txt'), 'utf8'),
]);

const manifestMatch = indexHtml.match(/<link\s+rel="manifest"\s+href="([^"]+)"\s*\/>/);
if (!manifestMatch) {
  throw new Error('index.html must reference a web manifest');
}

const manifestPath = path.join(publicDir, manifestMatch[1].replace(/^\//, ''));
await access(manifestPath, constants.R_OK);

const manifest = JSON.parse(manifestText);
if (manifest.name !== 'Echo Agent' || manifest.start_url !== '/') {
  throw new Error('manifest.webmanifest must describe the current Echo Agent site');
}

const pngIcon = manifest.icons?.find(
  (icon) => icon.src === '/eko-icon.png' && icon.sizes === '256x256' && icon.type === 'image/png',
);
if (!pngIcon) {
  throw new Error('manifest.webmanifest must declare the real 256x256 EKO application icon');
}
await access(path.join(publicDir, 'eko-icon.png'), constants.R_OK);

for (const imageUrl of [
  indexHtml.match(/<meta\s+property="og:image"\s+content="([^"]+)"\s*\/>/)?.[1],
  indexHtml.match(/<meta\s+name="twitter:image"\s+content="([^"]+)"\s*\/>/)?.[1],
]) {
  if (!imageUrl) throw new Error('index.html must declare social preview images');
  const imagePath = new URL(imageUrl).pathname.replace(/^\//, '');
  if (imagePath !== 'og-image.png') throw new Error('Social metadata must use og-image.png');
  await access(path.join(publicDir, imagePath), constants.R_OK);
}
assertSocialPng(await readFile(path.join(publicDir, 'og-image.png')), 'og-image.png');

const staleFacts = [/EchoCoWork/i, /\/echocowork\b/i, /10-100x/i, /\b67\+\b/];
for (const [name, content] of [
  ['index.html', indexHtml],
  ['sitemap.xml', sitemap],
  ['manifest.webmanifest', manifestText],
]) {
  for (const staleFact of staleFacts) {
    if (staleFact.test(content)) {
      throw new Error(`${name} contains stale branding, routes, or unsupported claims`);
    }
  }
}

const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (locs.length === 0) {
  throw new Error('sitemap.xml must contain at least one canonical URL');
}

const expectedRoutes = new Set();
for (const prefix of ['', '/en']) {
  expectedRoutes.add(prefix || '/');
  expectedRoutes.add(`${prefix}/eko`);
  expectedRoutes.add(`${prefix}/docs`);
  expectedRoutes.add(`${prefix}/eko/docs`);
  for (const slug of getAllSlugs('echo-agent')) expectedRoutes.add(`${prefix}/docs/${slug}`);
  for (const slug of getAllSlugs('eko')) expectedRoutes.add(`${prefix}/eko/docs/${slug}`);
}

for (const loc of locs) {
  const url = new URL(loc);
  if (url.origin !== 'https://echo-agent.dev' || !expectedRoutes.has(url.pathname)) {
    throw new Error(`sitemap.xml contains an unregistered route: ${loc}`);
  }
}

if (locs.length !== expectedRoutes.size || new Set(locs).size !== expectedRoutes.size) {
  throw new Error('sitemap.xml must list every registered bilingual route exactly once');
}

for (const requiredRoute of expectedRoutes) {
  if (!locs.some((loc) => new URL(loc).pathname === requiredRoute)) {
    throw new Error(`sitemap.xml is missing the route ${requiredRoute}`);
  }
}

if (/^Disallow:/m.test(robots) || !robots.includes('Sitemap: https://echo-agent.dev/sitemap.xml')) {
  throw new Error('robots.txt must allow crawlers and name the canonical sitemap');
}

for (const requiredFact of ['echo-agent', 'EKO', '/en/eko/docs/capabilities']) {
  if (!llms.includes(requiredFact) || !llmsFull.includes(requiredFact)) {
    throw new Error(`LLM discovery files are missing ${requiredFact}`);
  }
}

console.log(`Validated manifest and ${locs.length} bilingual discovery routes`);
