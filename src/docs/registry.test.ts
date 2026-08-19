import { describe, expect, it } from 'vitest';
import { loadDocContent } from './loader';
import { getDocCategories, getAllSlugs } from './registry';

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
});
