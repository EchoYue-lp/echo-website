import { describe, expect, it } from 'vitest';
import { getAllSlugs } from './docs/registry';
import { frameworkAdrDocs } from './docs/framework-adrs.generated';
import { getStaticRoutes } from './static-site';

describe('static route registry', () => {
  it('publishes every product, language, landing, and documentation slug once', () => {
    const routes = getStaticRoutes();
    const paths = routes.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);

    for (const prefix of ['', '/en']) {
      expect(paths).toContain(prefix || '/');
      expect(paths).toContain(`${prefix}/eko`);
      expect(paths).toContain(`${prefix}/docs`);
      expect(paths).toContain(`${prefix}/eko/docs`);
      for (const slug of getAllSlugs('echo-agent')) {
        expect(paths).toContain(`${prefix}/docs/${slug}`);
      }
      for (const slug of getAllSlugs('eko')) {
        expect(paths).toContain(`${prefix}/eko/docs/${slug}`);
      }
    }
  });

  it('gives every static route unique metadata and independent English paths', () => {
    const routes = getStaticRoutes();
    expect(new Set(routes.map((route) => route.title)).size).toBe(routes.length);
    expect(new Set(routes.map((route) => route.description)).size).toBe(routes.length);
    expect(
      routes
        .filter((route) => route.language === 'en')
        .every((route) => route.path.startsWith('/en')),
    ).toBe(true);
    expect(routes.every((route) => !route.path.includes('?lang='))).toBe(true);
  });

  it('publishes every framework ADR in bilingual discovery routes', () => {
    const paths = getStaticRoutes().map((route) => route.path);
    expect(frameworkAdrDocs.length).toBeGreaterThanOrEqual(12);
    for (const doc of frameworkAdrDocs) {
      expect(paths).toContain(`/docs/${doc.slug}`);
      expect(paths).toContain(`/en/docs/${doc.slug}`);
    }
  });
});
