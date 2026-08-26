import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { resolveMarkdownAsset, resolveMarkdownHref } from './links';
import { findDocByFilePath, findDocBySlug } from './registry';

function frameworkDoc(slug: string) {
  const doc = findDocBySlug('echo-agent', slug);
  if (!doc) throw new Error(`Missing test fixture: ${slug}`);
  return doc;
}

describe('resolveMarkdownHref', () => {
  it('maps registered Markdown files to localized site slugs', () => {
    expect(
      resolveMarkdownHref('./02-tools.md#tool-trait', 'echo-agent', 'en', frameworkDoc('overview')),
    ).toEqual({
      href: '/en/docs/tools#tool-trait',
      internal: true,
    });
  });

  it('maps source-language switches to the same site slug', () => {
    expect(
      resolveMarkdownHref('../zh/README.md', 'echo-agent', 'en', frameworkDoc('overview')),
    ).toEqual({
      href: '/docs/overview',
      internal: true,
    });
  });

  it('maps cross-language knowledge sources using the current UI language', () => {
    expect(
      resolveMarkdownHref(
        '../internal/knowledge/zh/agent-patterns.md',
        'echo-agent',
        'en',
        frameworkDoc('overview'),
      ),
    ).toEqual({
      href: '/en/docs/agent-patterns',
      internal: true,
    });

    expect(
      resolveMarkdownHref(
        '../internal/knowledge/en/README.md',
        'echo-agent',
        'zh',
        frameworkDoc('overview'),
      ),
    ).toEqual({
      href: '/docs/knowledge-overview',
      internal: true,
    });
  });

  it('sends unregistered source documents to the authoritative repository', () => {
    expect(
      resolveMarkdownHref('./tool-permissions.md', 'echo-agent', 'en', frameworkDoc('overview')),
    ).toEqual({
      href: 'https://github.com/EchoYue-lp/echo-agent/blob/main/docs/en/tool-permissions.md',
      internal: false,
    });
  });

  it('maps source files, directories, and cross-repository links to GitHub', () => {
    expect(
      resolveMarkdownHref('../examples/', 'echo-agent', 'en', frameworkDoc('getting-started')),
    ).toEqual({
      href: 'https://github.com/EchoYue-lp/echo-agent/tree/main/examples/',
      internal: false,
    });
    expect(
      resolveMarkdownHref('../../src/state/mod.rs', 'echo-agent', 'en', frameworkDoc('chat')),
    ).toEqual({
      href: 'https://github.com/EchoYue-lp/echo-agent/blob/main/src/state/mod.rs',
      internal: false,
    });
    expect(
      resolveMarkdownHref(
        '../../../echo-agent-cli/docs/system-deep-dive/07-cross-cutting.md',
        'echo-agent',
        'en',
        frameworkDoc('skills'),
      ),
    ).toEqual({
      href: 'https://github.com/EchoYue-lp/echo-agent-cli/blob/main/docs/system-deep-dive/07-cross-cutting.md',
      internal: false,
    });
  });

  it('does not duplicate language directories in standard source fallbacks', () => {
    expect(
      resolveMarkdownHref('./missing.md', 'echo-agent', 'en', {
        ...frameworkDoc('overview'),
        filePath: './content/echo-agent/en/README.md',
      }),
    ).toEqual({
      href: 'https://github.com/EchoYue-lp/echo-agent/blob/main/docs/en/missing.md',
      internal: false,
    });
  });

  it('uses the authoritative bilingual knowledge tree for source fallbacks', () => {
    expect(
      resolveMarkdownHref('./missing.md', 'echo-agent', 'en', frameworkDoc('knowledge-overview')),
    ).toEqual({
      href: 'https://github.com/EchoYue-lp/echo-agent/blob/main/docs/internal/knowledge/en/missing.md',
      internal: false,
    });
    expect(
      resolveMarkdownHref('./missing.md', 'echo-agent', 'zh', frameworkDoc('knowledge-overview')),
    ).toEqual({
      href: 'https://github.com/EchoYue-lp/echo-agent/blob/main/docs/internal/knowledge/zh/missing.md',
      internal: false,
    });
  });

  it('keeps anchors and external URLs intact', () => {
    expect(resolveMarkdownHref('#usage', 'echo-agent', 'en', frameworkDoc('tools'))).toEqual({
      href: '#usage',
      internal: true,
    });
    expect(
      resolveMarkdownHref('https://example.com/docs', 'echo-agent', 'en', frameworkDoc('tools')),
    ).toEqual({ href: 'https://example.com/docs', internal: false });
  });

  it('preserves query strings and fragments', () => {
    expect(
      resolveMarkdownHref(
        './02-tools.md?mode=full#tool-trait',
        'echo-agent',
        'en',
        frameworkDoc('overview'),
      ),
    ).toEqual({
      href: '/en/docs/tools?mode=full#tool-trait',
      internal: true,
    });
  });

  it('maps relative images to raw authoritative source assets', () => {
    expect(
      resolveMarkdownAsset(
        '../assets/runtime.png?raw=1',
        'echo-agent',
        'en',
        frameworkDoc('overview'),
      ),
    ).toBe(
      'https://raw.githubusercontent.com/EchoYue-lp/echo-agent/main/docs/assets/runtime.png?raw=1',
    );
    expect(
      resolveMarkdownAsset(
        'https://example.com/runtime.png',
        'echo-agent',
        'en',
        frameworkDoc('overview'),
      ),
    ).toBe('https://example.com/runtime.png');
  });

  it('maps bilingual knowledge assets to the authoritative raw source tree', () => {
    expect(
      resolveMarkdownAsset(
        './assets/runtime.png',
        'echo-agent',
        'en',
        frameworkDoc('knowledge-overview'),
      ),
    ).toBe(
      'https://raw.githubusercontent.com/EchoYue-lp/echo-agent/main/docs/internal/knowledge/en/assets/runtime.png',
    );
    expect(
      resolveMarkdownAsset(
        './assets/runtime.png?raw=1#preview',
        'echo-agent',
        'zh',
        frameworkDoc('knowledge-overview'),
      ),
    ).toBe(
      'https://raw.githubusercontent.com/EchoYue-lp/echo-agent/main/docs/internal/knowledge/zh/assets/runtime.png?raw=1#preview',
    );
  });

  it('resolves every Markdown destination without raw relative URLs or duplicate languages', () => {
    const rootPath = join(process.cwd(), 'src/docs/content/echo-agent');
    const markdownFiles: string[] = [];
    const collect = (directory: string) => {
      for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) collect(path);
        else if (path.endsWith('.md')) markdownFiles.push(path);
      }
    };
    collect(rootPath);

    let scanned = 0;
    for (const file of markdownFiles) {
      const sourceRelative = relative(rootPath, file).replace(/\\/g, '/');
      const [languagePart, ...documentParts] = sourceRelative.split('/');
      const language = languagePart === 'en' ? 'en' : 'zh';
      const doc = findDocByFilePath(
        'echo-agent',
        `./content/echo-agent/${documentParts.join('/')}`,
      );
      if (!doc) throw new Error(`Registry is missing ${sourceRelative}`);

      const markdown = readFileSync(file, 'utf8');
      for (const match of markdown.matchAll(/(!?)\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g)) {
        const [, imageMarker, destination] = match;
        const resolved = imageMarker
          ? resolveMarkdownAsset(destination, 'echo-agent', language, doc)
          : resolveMarkdownHref(destination, 'echo-agent', language, doc).href;
        expect(resolved, `${sourceRelative}: ${destination}`).not.toMatch(/^\.\.?\//);
        expect(resolved, `${sourceRelative}: ${destination}`).not.toMatch(
          /\/docs\/(?:en|zh)\/(?:en|zh)\//,
        );
        scanned += 1;
      }
    }

    expect(scanned).toBeGreaterThanOrEqual(254);
  });
});
