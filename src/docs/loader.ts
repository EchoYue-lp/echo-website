import type { Language, Product } from '../routing';

type MarkdownLoader = () => Promise<string>;

const docModules = import.meta.glob('./content/**/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, MarkdownLoader>;

export function localizedDocPath(product: Product, language: Language, filePath: string): string {
  const productPrefix = `./content/${product}/`;
  if (!filePath.startsWith(productPrefix)) {
    return filePath;
  }

  return `${productPrefix}${language}/${filePath.slice(productPrefix.length)}`;
}

export async function loadDocContent(
  product: Product,
  language: Language,
  filePath: string,
): Promise<string> {
  const localizedPath = localizedDocPath(product, language, filePath);
  const loader = docModules[localizedPath];
  if (!loader) {
    throw new Error(`Documentation source is missing: ${localizedPath}`);
  }
  return loader();
}

export function getAvailableDocs(): string[] {
  return Object.keys(docModules).sort();
}
