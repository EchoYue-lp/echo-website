import { getDocsBasePath, withLanguage, type Language, type Product } from '../routing';
import { findDocByFilePath, type DocEntry } from './registry';

export interface ResolvedDocLink {
  href: string;
  internal: boolean;
}

interface SourceTarget {
  repository: 'echo-agent' | 'echo-agent-cli';
  path: string;
  search: string;
  hash: string;
  directory: boolean;
}

const sourceOrigin = 'https://echo-source.invalid';

function relativeDocPath(product: Product, filePath: string): string {
  return filePath
    .replace(/\\/g, '/')
    .replace(`./content/${product}/`, '')
    .replace(/^(?:en|zh)\//, '')
    .replace(/^(knowledge)\/(?:en|zh)\//, '$1/');
}

function sourcePath(product: Product, language: Language, filePath: string): string {
  const relative = relativeDocPath(product, filePath);
  if (product === 'eko') return relative;
  return relative.startsWith('knowledge/')
    ? `docs/knowledge/${language}/${relative.slice('knowledge/'.length)}`
    : `docs/${language}/${relative}`;
}

function resolveSourceTarget(
  href: string,
  product: Product,
  language: Language,
  currentDoc: DocEntry,
): SourceTarget {
  const currentSource = sourcePath(product, language, currentDoc.filePath);
  const targetUrl = new URL(href, `${sourceOrigin}/${currentSource}`);
  let targetPath = targetUrl.pathname.replace(/^\//, '');
  let repository: SourceTarget['repository'] =
    product === 'echo-agent' ? 'echo-agent' : 'echo-agent-cli';

  if (product === 'echo-agent' && targetPath.startsWith('echo-agent-cli/')) {
    repository = 'echo-agent-cli';
    targetPath = targetPath.slice('echo-agent-cli/'.length);
  }

  // The upstream guides historically use ../examples from docs/<lang> even
  // though examples is a repository-root directory.
  if (repository === 'echo-agent' && targetPath.startsWith('docs/examples/')) {
    targetPath = targetPath.slice('docs/'.length);
  }

  return {
    repository,
    path: targetPath,
    search: targetUrl.search,
    hash: targetUrl.hash,
    directory: href.split(/[?#]/, 1)[0]?.endsWith('/') ?? false,
  };
}

function registeredTarget(
  product: Product,
  language: Language,
  target: SourceTarget,
): { doc: DocEntry; language: Language } | undefined {
  if (product === 'eko' && target.repository === 'echo-agent-cli') {
    const doc = findDocByFilePath(product, `./content/eko/${target.path}`);
    return doc ? { doc, language } : undefined;
  }
  if (product !== 'echo-agent' || target.repository !== 'echo-agent') return undefined;

  const knowledge = target.path.match(/^docs\/knowledge\/(en|zh)\/(.+\.md)$/);
  if (knowledge) {
    const doc = findDocByFilePath(product, `./content/echo-agent/knowledge/${knowledge[2]}`);
    return doc ? { doc, language } : undefined;
  }

  const standard = target.path.match(/^docs\/(en|zh)\/(.+\.md)$/);
  if (!standard) return undefined;
  const doc = findDocByFilePath(product, `./content/echo-agent/${standard[2]}`);
  return doc ? { doc, language: standard[1] as Language } : undefined;
}

function internalUrl(path: string, language: Language, target: SourceTarget): string {
  const params = new URLSearchParams(target.search);
  params.delete('lang');
  const search = params.size > 0 ? `?${params.toString()}` : '';
  return `${withLanguage(path, language)}${search}${target.hash}`;
}

function repositoryUrl(target: SourceTarget, raw: boolean): string {
  const organization = 'EchoYue-lp';
  const suffix = `${target.search}${target.hash}`;
  if (raw) {
    return `https://raw.githubusercontent.com/${organization}/${target.repository}/main/${target.path}${suffix}`;
  }
  const view = target.directory || !/\.[^/]+$/.test(target.path) ? 'tree' : 'blob';
  return `https://github.com/${organization}/${target.repository}/${view}/main/${target.path}${suffix}`;
}

function isExternal(href: string): boolean {
  return /^[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('//');
}

export function resolveMarkdownHref(
  href: string | undefined,
  product: Product,
  language: Language,
  currentDoc: DocEntry,
): ResolvedDocLink {
  if (!href) return { href: '#', internal: true };
  if (href.startsWith('#') || href.startsWith('?') || href.startsWith('/')) {
    return { href, internal: true };
  }
  if (isExternal(href)) return { href, internal: false };

  const target = resolveSourceTarget(href, product, language, currentDoc);
  const registered = registeredTarget(product, language, target);
  if (registered) {
    return {
      href: internalUrl(
        `${getDocsBasePath(product)}/${registered.doc.slug}`,
        registered.language,
        target,
      ),
      internal: true,
    };
  }

  return { href: repositoryUrl(target, false), internal: false };
}

export function resolveMarkdownAsset(
  src: string | undefined,
  product: Product,
  language: Language,
  currentDoc: DocEntry,
): string | undefined {
  if (!src || isExternal(src) || src.startsWith('/')) return src;
  return repositoryUrl(resolveSourceTarget(src, product, language, currentDoc), true);
}
