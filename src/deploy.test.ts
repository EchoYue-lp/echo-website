import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const temporaryDirectories: string[] = [];
const releaseIds = [
  '20260816T010101Z-aaaaaaa',
  '20260816T020202Z-bbbbbbb',
  '20260816T030303Z-ccccccc',
  '20260816T040404Z-ddddddd',
  '20260816T050505Z-eeeeeee',
];

function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'echo-website-release-test-'));
  temporaryDirectories.push(root);
  const releases = join(root, 'releases');
  mkdirSync(releases);
  for (const id of releaseIds) mkdirSync(join(releases, id));
  mkdirSync(join(releases, 'do-not-delete'));
  mkdirSync(join(releases, '.staging-incomplete'));
  return { root, releases };
}

function prune(root: string, releases: string, keep = 3) {
  execFileSync(
    'bash',
    [
      '-c',
      'set -Eeuo pipefail; source "$1"; prune_releases',
      'prune-test',
      join(process.cwd(), 'scripts/deploy-releases.sh'),
    ],
    {
      env: {
        ...process.env,
        RELEASES_DIR: releases,
        CURRENT_LINK: join(root, 'current'),
        PREVIOUS_LINK: join(root, 'previous'),
        RELEASES_TO_KEEP: String(keep),
      },
    },
  );
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe('release pruning', () => {
  it('protects current and previous, keeps bounded history, and ignores unmanaged directories', () => {
    const { root, releases } = fixture();
    symlinkSync(join(releases, releaseIds[4]), join(root, 'current'));
    symlinkSync(join(releases, releaseIds[3]), join(root, 'previous'));
    prune(root, releases);

    expect(existsSync(join(releases, releaseIds[4]))).toBe(true);
    expect(existsSync(join(releases, releaseIds[3]))).toBe(true);
    expect(existsSync(join(releases, releaseIds[2]))).toBe(true);
    expect(existsSync(join(releases, releaseIds[1]))).toBe(false);
    expect(existsSync(join(releases, releaseIds[0]))).toBe(false);
    expect(existsSync(join(releases, 'do-not-delete'))).toBe(true);
    expect(existsSync(join(releases, '.staging-incomplete'))).toBe(true);
  });

  it('does not prune when a protected symlink points outside managed releases', () => {
    const { root, releases } = fixture();
    symlinkSync('/tmp/not-an-echo-release', join(root, 'current'));
    prune(root, releases);
    expect(releaseIds.every((id) => existsSync(join(releases, id)))).toBe(true);
  });
});
