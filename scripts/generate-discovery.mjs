import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
const server = await createServer({
  root,
  appType: 'custom',
  server: { middlewareMode: true },
});

try {
  const { discoveryArtifacts } = await server.ssrLoadModule('/src/static-site.tsx');
  const artifacts = await discoveryArtifacts();
  for (const [name, content] of Object.entries(artifacts)) {
    const destination = path.join(root, 'public', name);
    if (check) {
      const current = await readFile(destination, 'utf8').catch(() => '');
      if (current !== content) throw new Error(`${name} has drifted; run npm run discovery:sync`);
    } else {
      await writeFile(destination, content);
    }
  }
  console.log(`${check ? 'Validated' : 'Generated'} ${Object.keys(artifacts).join(', ')}`);
} finally {
  await server.close();
}
