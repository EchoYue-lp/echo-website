import { beforeEach, describe, expect, it } from 'vitest';
import { applyNotFoundMetadata, applyPageMetadata } from './seo';

describe('applyPageMetadata', () => {
  beforeEach(() => {
    document.head.innerHTML = `
      <meta name="description" content="">
      <meta property="og:title" content="">
      <meta property="og:description" content="">
      <meta property="og:url" content="">
      <meta property="og:locale" content="">
      <meta name="twitter:title" content="">
      <meta name="twitter:description" content="">
      <meta name="robots" content="index, follow">
      <link rel="canonical" href="">
      <link rel="alternate" hreflang="zh-CN" href="">
      <link rel="alternate" hreflang="en" href="">
      <link rel="alternate" hreflang="x-default" href="">
      <script type="application/ld+json"></script>
    `;
  });

  it('sets product and route-specific canonical metadata', () => {
    applyPageMetadata('eko', 'docs', 'en', '/en/eko/docs/getting-started');

    expect(document.title).toBe('EKO Documentation');
    expect(document.documentElement.lang).toBe('en');
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://echo-agent.dev/en/eko/docs/getting-started',
    );
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://echo-agent.dev/en/eko/docs/getting-started',
    );
    expect(document.querySelector('link[hreflang="zh-CN"]')).toHaveAttribute(
      'href',
      'https://echo-agent.dev/eko/docs/getting-started',
    );
    const structured = JSON.parse(
      document.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}',
    ) as { '@graph'?: Array<{ '@type'?: string }> };
    expect(structured['@graph']?.map((entry) => entry['@type'])).toContain('CollectionPage');
  });

  it('replaces product structured data during client-side navigation', () => {
    applyPageMetadata('echo-agent', 'home', 'zh', '/');
    applyPageMetadata('eko', 'home', 'zh', '/eko');

    const structured = JSON.parse(
      document.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}',
    ) as { '@graph'?: Array<{ '@type'?: string }> };
    const types = structured['@graph']?.map((entry) => entry['@type']);
    expect(types).toContain('SoftwareApplication');
    expect(types).not.toContain('SoftwareSourceCode');
  });

  it('removes crawlable route identity from a client-side not-found page', () => {
    applyPageMetadata('eko', 'home', 'en', '/en/eko');
    applyNotFoundMetadata('en');

    expect(document.title).toBe('Page not found | Echo Agent');
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, follow',
    );
    expect(document.querySelector('link[rel="canonical"]')).not.toBeInTheDocument();
    expect(document.querySelectorAll('link[rel="alternate"][hreflang]')).toHaveLength(0);
    expect(document.querySelector('script[type="application/ld+json"]')).not.toBeInTheDocument();

    applyPageMetadata('echo-agent', 'home', 'en', '/en');
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      'index, follow',
    );
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://echo-agent.dev/en',
    );
    expect(document.querySelectorAll('link[rel="alternate"][hreflang]')).toHaveLength(3);
    expect(document.querySelector('script[type="application/ld+json"]')).toBeInTheDocument();
  });
});
