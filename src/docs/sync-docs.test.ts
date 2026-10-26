// @vitest-environment node
import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const sourceScript = resolve('scripts/sync-docs.mjs');
const fixtureParent = resolve('.echo-semantic/local/website-source-sync-20261027/fixtures');
const temporaryDirectories: string[] = [];

function write(path: string, content: string) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

function digest(content: string) {
  return createHash('sha256').update(content).digest('hex');
}

function git(root: string, ...args: string[]) {
  return execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, GIT_CONFIG_NOSYSTEM: '1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function commit(root: string) {
  git(root, 'add', '.');
  git(
    root,
    '-c',
    'commit.gpgsign=false',
    '-c',
    'user.name=Documentation fixture',
    '-c',
    'user.email=docs-fixture@example.invalid',
    'commit',
    '-m',
    'fixture',
  );
  return git(root, 'rev-parse', 'HEAD');
}

function fixture() {
  mkdirSync(fixtureParent, { recursive: true });
  const root = mkdtempSync(join(fixtureParent, 'source-'));
  temporaryDirectories.push(root);
  const site = join(root, 'site');
  const framework = join(root, 'echo-agent');
  const application = join(root, 'echo-agent-cli');
  for (const repository of [framework, application]) {
    mkdirSync(repository);
    git(repository, 'init', '-q');
    write(join(repository, 'Cargo.toml'), '[package]\nname="fixture"\nversion="0.0.0"\n');
  }
  for (const language of ['en', 'zh']) {
    write(join(framework, `docs/${language}/intro.md`), `# ${language} 框架\n`);
    write(join(framework, `docs/internal/knowledge/${language}/intro.md`), '# 知识\n');
    write(join(application, `docs/${language}/intro.md`), '# 原产品说明\n');
  }
  write(join(framework, 'docs/adr/0001-original.md'), '# 原决策\n');
  write(join(application, 'echo-agent-app-core/.keep'), '');
  // 本测试只核同步器的来源边界；产品 parity 实现不在这个最小 Git 夹具中重建。
  write(join(application, 'scripts/check-docs-parity.mjs'), 'process.exitCode = 0;\n');
  commit(framework);
  const applicationRevision = commit(application);
  const projection = {
    repository: 'https://example.invalid/application',
    reviewedRevision: applicationRevision,
    status: '原审查状态',
    authority: '原产品文档权威',
    sourceFiles: ['en', 'zh'].map((language) => ({
      sourcePath: `docs/${language}/intro.md`,
      sha256: digest('# 原产品说明\n'),
    })),
    files: ['en', 'zh'].map((language) => ({
      destination: `src/docs/content/eko/${language}/intro.md`,
      sha256: digest('# 已审查产品投影\n'),
    })),
  };
  for (const record of projection.files) {
    write(join(site, record.destination), '# 已审查产品投影\n');
  }
  write(
    join(site, 'docs-sync-manifest.json'),
    JSON.stringify({
      schemaVersion: 1,
      framework: { files: [] },
      applicationProjection: projection,
    }),
  );
  mkdirSync(join(site, 'scripts'), { recursive: true });
  copyFileSync(sourceScript, join(site, 'scripts/sync-docs.mjs'));
  const tmp = join(root, 'tmp');
  mkdirSync(tmp);
  const run = (...args: string[]) =>
    spawnSync(
      process.execPath,
      [join(site, 'scripts/sync-docs.mjs'), '--framework-root', framework, ...args],
      { cwd: site, encoding: 'utf8', env: { ...process.env, TMPDIR: tmp } },
    );
  const manifest = () => JSON.parse(readFileSync(join(site, 'docs-sync-manifest.json'), 'utf8'));
  return { root, site, framework, application, projection, run, manifest };
}

afterEach(() => {
  for (const root of temporaryDirectories.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe('文档同步的固定 Git 来源', () => {
  it('同步受控正文及双语言 ADR，忽略同目录的本地候选', () => {
    const f = fixture();
    write(join(f.framework, '.git/info/exclude'), '/docs/adr/0099-local.md\n');
    write(join(f.framework, 'docs/adr/0099-local.md'), '# 未发布候选\n');
    expect(git(f.framework, 'status', '--porcelain')).toBe('');
    expect(f.run().status).toBe(0);
    expect(f.manifest().framework.files).toHaveLength(6);
    expect(existsSync(join(f.site, 'src/docs/content/echo-agent/en/adr/0099-local.md'))).toBe(
      false,
    );
    expect(f.run('--check').status).toBe(0);
  });

  it('未传产品修订号时完整保留旧投影，不重读当前产品文档', () => {
    const f = fixture();
    for (const language of ['en', 'zh']) {
      write(join(f.application, `docs/${language}/new.md`), '# 尚未审查\n');
    }
    commit(f.application);
    expect(f.run('--application-root', f.application).status).toBe(0);
    expect(f.manifest().applicationProjection).toEqual(f.projection);
  });

  it('仅同步框架时不要求产品活工作区干净', () => {
    const f = fixture();
    write(join(f.application, 'docs/en/intro.md'), '# 产品正在独立修改\n');
    expect(f.run('--application-root', f.application).status).toBe(0);
    expect(f.manifest().applicationProjection).toEqual(f.projection);
  });

  it('check 拒绝伪造的 ignored 来源记录，即使摘要和站点文件一致', () => {
    const f = fixture();
    expect(f.run().status).toBe(0);
    const content = '# Git 树外的本地文档\n';
    const sourcePath = 'docs/en/local.md';
    const destination = 'src/docs/content/echo-agent/en/local.md';
    write(join(f.framework, '.git/info/exclude'), `/${sourcePath}\n`);
    write(join(f.framework, sourcePath), content);
    write(join(f.site, destination), content);
    const manifest = f.manifest();
    manifest.framework.files.push({ sourcePath, destination, sha256: digest(content) });
    write(join(f.site, 'docs-sync-manifest.json'), JSON.stringify(manifest));
    expect(f.run('--check').status).not.toBe(0);
  });

  it('check 拒绝同时从 manifest 和镜像删除一个受控输入', () => {
    const f = fixture();
    expect(f.run().status).toBe(0);
    const manifest = f.manifest();
    const destination = 'src/docs/content/echo-agent/en/intro.md';
    manifest.framework.files = manifest.framework.files.filter(
      (record: { destination: string }) => record.destination !== destination,
    );
    rmSync(join(f.site, destination));
    write(join(f.site, 'docs-sync-manifest.json'), JSON.stringify(manifest));
    expect(f.run('--check').status).not.toBe(0);
  });

  it('拒绝 status 隐藏的受控文件与所选 Git blob 不一致', () => {
    const f = fixture();
    git(f.framework, 'update-index', '--assume-unchanged', 'docs/en/intro.md');
    write(join(f.framework, 'docs/en/intro.md'), '# 不属于 HEAD 的正文\n');
    expect(git(f.framework, 'status', '--porcelain')).toBe('');
    expect(f.run().status).not.toBe(0);
  });

  it('check 同样拒绝脏来源，不能只校验已有文档摘要', () => {
    const f = fixture();
    expect(f.run().status).toBe(0);
    write(join(f.framework, 'Cargo.toml'), '# 未提交来源变更\n');
    expect(f.run('--check').status).not.toBe(0);
  });

  it('check 拒绝同步后 HEAD 漂移', () => {
    const f = fixture();
    expect(f.run().status).toBe(0);
    write(join(f.framework, 'docs/en/intro.md'), '# 新修订\n');
    commit(f.framework);
    expect(f.run('--check').status).not.toBe(0);
  });

  it('显式产品修订号不匹配时拒绝，且不改原 manifest', () => {
    const f = fixture();
    const before = readFileSync(join(f.site, 'docs-sync-manifest.json'), 'utf8');
    expect(
      f.run('--application-root', f.application, '--application-revision', 'invalid').status,
    ).not.toBe(0);
    expect(readFileSync(join(f.site, 'docs-sync-manifest.json'), 'utf8')).toBe(before);
  });

  it('继续检查站点自身的全部 Markdown，拒绝清单外文件', () => {
    const f = fixture();
    expect(f.run().status).toBe(0);
    write(join(f.site, 'src/docs/content/eko/en/untracked.md'), '# 清单外\n');
    expect(f.run('--check').status).not.toBe(0);
  });
});
