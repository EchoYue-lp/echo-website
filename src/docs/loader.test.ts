import { describe, expect, it } from 'vitest';
import { localizedDocPath } from './loader';

describe('localizedDocPath', () => {
  it('loads real English and Chinese framework sources', () => {
    expect(localizedDocPath('echo-agent', 'en', './content/echo-agent/02-tools.md')).toBe(
      './content/echo-agent/en/02-tools.md',
    );
    expect(localizedDocPath('echo-agent', 'zh', './content/echo-agent/02-tools.md')).toBe(
      './content/echo-agent/zh/02-tools.md',
    );
  });

  it('loads product documentation from its own namespace', () => {
    expect(localizedDocPath('eko', 'en', './content/eko/overview.md')).toBe(
      './content/eko/en/overview.md',
    );
  });

  it('localizes language-neutral framework ADR routes', () => {
    expect(
      localizedDocPath(
        'echo-agent',
        'en',
        './content/echo-agent/adr/0001-channel-session-sender-scope.md',
      ),
    ).toBe('./content/echo-agent/en/adr/0001-channel-session-sender-scope.md');
    expect(
      localizedDocPath(
        'echo-agent',
        'zh',
        './content/echo-agent/adr/0001-channel-session-sender-scope.md',
      ),
    ).toBe('./content/echo-agent/zh/adr/0001-channel-session-sender-scope.md');
  });
});
