export type Language = 'zh' | 'en';
export type Product = 'echo-agent' | 'eko';

export interface RouteContext {
  isDocs: boolean;
  product: Product;
}

export function getRouteContext(pathname: string): RouteContext {
  const localizedPath = stripLanguagePrefix(pathname);
  const isEko = localizedPath === '/eko' || localizedPath.startsWith('/eko/');
  const isDocs =
    localizedPath === '/docs' ||
    localizedPath.startsWith('/docs/') ||
    localizedPath === '/eko/docs' ||
    localizedPath.startsWith('/eko/docs/');

  return {
    isDocs,
    product: isEko ? 'eko' : 'echo-agent',
  };
}

export function getHomePath(product: Product): string {
  return product === 'eko' ? '/eko' : '/';
}

export function getDocsBasePath(product: Product): string {
  return product === 'eko' ? '/eko/docs' : '/docs';
}

export function languageFromSearch(search: string): Language {
  return new URLSearchParams(search).get('lang') === 'en' ? 'en' : 'zh';
}

export function languageFromPath(pathname: string): Language {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh';
}

export function stripLanguagePrefix(pathname: string): string {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/';
  return pathname || '/';
}

export function withLanguage(path: string, language: Language): string {
  const url = new URL(path, 'https://echo-agent.dev');
  url.searchParams.delete('lang');
  const localizedPath = stripLanguagePrefix(url.pathname);
  const pathname =
    language === 'en' ? (localizedPath === '/' ? '/en' : `/en${localizedPath}`) : localizedPath;
  return `${pathname}${url.search}${url.hash}`;
}
