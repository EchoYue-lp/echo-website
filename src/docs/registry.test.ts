import { describe, expect, it } from 'vitest';
import { getAvailableDocs, loadDocContent, localizedDocPath } from './loader';
import { frameworkAdrDocs } from './framework-adrs.generated';
import { getDocCategories, getAllSlugs, findDocBySlug } from './registry';

describe('documentation registry', () => {
  it.each(['echo-agent', 'eko'] as const)('uses unique slugs for %s', (product) => {
    const slugs = getAllSlugs(product);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(['echo-agent', 'eko'] as const)(
    'loads every registered %s document in both languages',
    async (product) => {
      const docs = getDocCategories(product).flatMap((category) => category.docs);
      for (const language of ['zh', 'en'] as const) {
        const contents = await Promise.all(
          docs.map((doc) => loadDocContent(product, language, doc.filePath)),
        );
        expect(contents.every((content) => content.trimStart().startsWith('#'))).toBe(true);
      }
    },
  );

  it('publishes actual English body content instead of translated navigation only', async () => {
    const english = await loadDocContent('echo-agent', 'en', './content/echo-agent/02-tools.md');
    const chinese = await loadDocContent('echo-agent', 'zh', './content/echo-agent/02-tools.md');
    expect(english).toContain('# Tool System');
    expect(chinese).toContain('# 工具系统');
    expect(english).not.toBe(chinese);
  });

  it('publishes every vendored framework ADR in both language route trees', () => {
    const availableAdrs = getAvailableDocs()
      .filter((path) => path.includes('/echo-agent/') && path.includes('/adr/'))
      .sort();
    const registeredAdrs = frameworkAdrDocs
      .flatMap((doc) =>
        (['en', 'zh'] as const).map((language) =>
          localizedDocPath('echo-agent', language, doc.filePath),
        ),
      )
      .sort();
    expect(frameworkAdrDocs.length).toBeGreaterThanOrEqual(12);
    expect(availableAdrs).toEqual(registeredAdrs);
  });
  it('将具名退役页置于历史分组并保留原入站slug', () => {
    const categories = getDocCategories('echo-agent');
    const retired = categories.find((category) => category.title.zh === '退役与历史');
    expect(retired?.docs.map((doc) => doc.slug).sort()).toEqual(['a2a-protocol', 'lsp']);
    for (const category of categories.filter((entry) => entry !== retired)) {
      expect(category.docs.some((doc) => ['a2a-protocol', 'lsp'].includes(doc.slug))).toBe(false);
    }
    expect(findDocBySlug('echo-agent', 'lsp')?.filePath).toBe(
      './content/echo-agent/31-lsp-integration.md',
    );
    expect(findDocBySlug('echo-agent', 'a2a-protocol')?.filePath).toBe(
      './content/echo-agent/knowledge/a2a-protocol.md',
    );
  });
});
