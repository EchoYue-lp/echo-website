import { describe, expect, it } from 'vitest';
import {
  getDocsBasePath,
  getHomePath,
  getRouteContext,
  languageFromPath,
  languageFromSearch,
  stripLanguagePrefix,
  withLanguage,
} from './routing';

describe('route context', () => {
  it.each([
    ['/', false, 'echo-agent'],
    ['/docs', true, 'echo-agent'],
    ['/docs/tools', true, 'echo-agent'],
    ['/eko', false, 'eko'],
    ['/eko/docs', true, 'eko'],
    ['/eko/docs/getting-started', true, 'eko'],
  ] as const)('classifies %s', (pathname, isDocs, product) => {
    expect(getRouteContext(pathname)).toEqual({ isDocs, product });
  });

  it('does not classify lookalike paths as documentation', () => {
    expect(getRouteContext('/docs-old')).toEqual({ isDocs: false, product: 'echo-agent' });
    expect(getRouteContext('/eko-docs')).toEqual({ isDocs: false, product: 'echo-agent' });
  });

  it('builds product-specific destinations', () => {
    expect(getHomePath('echo-agent')).toBe('/');
    expect(getHomePath('eko')).toBe('/eko');
    expect(getDocsBasePath('echo-agent')).toBe('/docs');
    expect(getDocsBasePath('eko')).toBe('/eko/docs');
  });
});

describe('language query', () => {
  it('uses Chinese by default and preserves an explicit English selection', () => {
    expect(languageFromSearch('')).toBe('zh');
    expect(languageFromSearch('?lang=en')).toBe('en');
    expect(languageFromPath('/en/docs/tools')).toBe('en');
    expect(languageFromPath('/docs/tools')).toBe('zh');
    expect(stripLanguagePrefix('/en/eko/docs')).toBe('/eko/docs');
    expect(getRouteContext('/en/eko/docs/overview')).toEqual({ isDocs: true, product: 'eko' });
    expect(withLanguage('/docs/tools', 'en')).toBe('/en/docs/tools');
    expect(withLanguage('/docs/tools', 'zh')).toBe('/docs/tools');
    expect(withLanguage('/en/docs/tools?lang=en#tool-trait', 'zh')).toBe('/docs/tools#tool-trait');
  });
});
