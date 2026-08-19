import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const hostIndex = process.argv.indexOf('--host');
const portIndex = process.argv.indexOf('--port');
const host = hostIndex >= 0 ? process.argv[hostIndex + 1] : '127.0.0.1';
const parsedPort = portIndex >= 0 ? Number.parseInt(process.argv[portIndex + 1] ?? '', 10) : 4173;
const port = Number.isSafeInteger(parsedPort) && parsedPort > 0 ? parsedPort : 4173;

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

async function existingFile(requestPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(requestPath);
  } catch {
    return undefined;
  }
  const candidate = path.resolve(root, decoded.replace(/^\/+/, ''));
  if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) return undefined;
  const details = await stat(candidate).catch(() => undefined);
  if (details?.isFile()) return candidate;
  if (details?.isDirectory()) {
    const indexFile = path.join(candidate, 'index.html');
    if ((await stat(indexFile).catch(() => undefined))?.isFile()) return indexFile;
  }
  return undefined;
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? '/', `http://${request.headers.host ?? host}`);
  const file = await existingFile(requestUrl.pathname);
  const status = file ? 200 : 404;
  const responseFile = file ?? path.join(root, '404.html');
  const body = await readFile(responseFile).catch(() => Buffer.from('Not found'));
  response.writeHead(status, {
    'Content-Type': contentTypes.get(path.extname(responseFile)) ?? 'application/octet-stream',
    'Content-Length': body.length,
    'Cache-Control': 'no-store',
  });
  response.end(body);
});

server.listen(port, host, () => {
  console.log(`Static preview: http://${host}:${port}`);
});
