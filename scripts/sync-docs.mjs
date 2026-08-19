import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentRoot = join(siteRoot, 'src/docs/content');
const manifestPath = join(siteRoot, 'docs-sync-manifest.json');

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv.at(index + 1) : undefined;
}

function discoverFrameworkRoot() {
  const candidates = [
    process.env.ECHO_AGENT_ROOT,
    resolve(siteRoot, '../echo-agent'),
    resolve(siteRoot, '../../echo-agent'),
  ].filter(Boolean);
  const frameworkRoot = candidates.find(
    (candidate) =>
      existsSync(join(candidate, 'Cargo.toml')) && existsSync(join(candidate, 'docs/en')),
  );

  if (!frameworkRoot) {
    throw new Error(
      'Could not find echo-agent. Set ECHO_AGENT_ROOT or pass --framework-root <path>.',
    );
  }
  return frameworkRoot;
}

function discoverApplicationRoot() {
  const candidates = [
    process.env.ECHO_AGENT_CLI_ROOT,
    resolve(siteRoot, '../echo-agent-cli'),
    resolve(siteRoot, '../../echo-agent-cli'),
  ].filter(Boolean);
  const applicationRoot = candidates.find(
    (candidate) =>
      existsSync(join(candidate, 'Cargo.toml')) &&
      existsSync(join(candidate, 'echo-agent-app-core')),
  );

  if (!applicationRoot) {
    throw new Error(
      'Could not find echo-agent-cli. Set ECHO_AGENT_CLI_ROOT or pass --application-root <path>.',
    );
  }
  return applicationRoot;
}

function filesBelow(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? filesBelow(path) : [path];
    })
    .filter((path) => path.endsWith('.md'))
    .sort();
}

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function relativeMarkdownPaths(directory) {
  return filesBelow(directory).map((path) => relative(directory, path).replaceAll('\\', '/'));
}

function bilingualMarkdownPaths(englishRoot, chineseRoot) {
  const chinesePaths = new Set(relativeMarkdownPaths(chineseRoot));
  return relativeMarkdownPaths(englishRoot).filter((path) => chinesePaths.has(path));
}

function copyTree(sourceRoot, destinationRoot, sourcePrefix, relativePaths) {
  return relativePaths.map((relativePath) => {
    const source = join(sourceRoot, relativePath);
    const destination = join(destinationRoot, relativePath);
    mkdirSync(dirname(destination), { recursive: true });
    cpSync(source, destination);
    return {
      sourcePath: `${sourcePrefix}/${relativePath}`.replaceAll('\\', '/'),
      destination: relative(siteRoot, destination).replaceAll('\\', '/'),
      sha256: sha256(destination),
    };
  });
}

function gitRevision(repositoryRoot) {
  return execFileSync('git', ['rev-parse', 'HEAD'], {
    cwd: repositoryRoot,
    encoding: 'utf8',
  }).trim();
}

function projectionFiles() {
  return filesBelow(join(contentRoot, 'eko')).map((path) => ({
    destination: relative(siteRoot, path).replaceAll('\\', '/'),
    sha256: sha256(path),
  }));
}

function applicationProjection(applicationRevision, applicationStatus, applicationAuthority) {
  const existingManifest = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, 'utf8'))
    : undefined;
  const existingProjection = existingManifest?.applicationProjection;
  const reviewedRevision = applicationRevision ?? existingProjection?.reviewedRevision;
  if (!reviewedRevision) {
    throw new Error(
      'Pass --application-revision <sha> for the initial documentation synchronization.',
    );
  }

  return {
    repository: existingProjection?.repository ?? 'https://github.com/EchoYue-lp/echo-agent-cli',
    reviewedRevision,
    status: applicationStatus ?? existingProjection?.status ?? 'pending-application-review-sync',
    authority:
      applicationAuthority ??
      existingProjection?.authority ??
      'These short pages are code-audited website projections. Replace them with reviewed application source docs after the parallel application review lands.',
    files: projectionFiles(),
  };
}

function syncFramework(
  frameworkRoot,
  applicationRevision,
  applicationStatus,
  applicationAuthority,
) {
  const resolvedRoot = resolve(frameworkRoot);
  for (const required of ['docs/en', 'docs/zh', 'docs/knowledge/en', 'docs/knowledge/zh']) {
    if (!statSync(join(resolvedRoot, required)).isDirectory()) {
      throw new Error(`Framework documentation directory is missing: ${required}`);
    }
  }

  const destinationRoot = join(contentRoot, 'echo-agent');
  rmSync(destinationRoot, { recursive: true, force: true });
  rmSync(join(contentRoot, 'echo-agent-cli'), { recursive: true, force: true });

  const standardPaths = bilingualMarkdownPaths(
    join(resolvedRoot, 'docs/en'),
    join(resolvedRoot, 'docs/zh'),
  );
  const knowledgePaths = bilingualMarkdownPaths(
    join(resolvedRoot, 'docs/knowledge/en'),
    join(resolvedRoot, 'docs/knowledge/zh'),
  );
  const files = [];
  for (const language of ['en', 'zh']) {
    files.push(
      ...copyTree(
        join(resolvedRoot, `docs/${language}`),
        join(destinationRoot, language),
        `docs/${language}`,
        standardPaths,
      ),
      ...copyTree(
        join(resolvedRoot, `docs/knowledge/${language}`),
        join(destinationRoot, language, 'knowledge'),
        `docs/knowledge/${language}`,
        knowledgePaths,
      ),
    );
  }

  const manifest = {
    schemaVersion: 1,
    framework: {
      repository: 'https://github.com/EchoYue-lp/echo-agent',
      revision: gitRevision(resolvedRoot),
      authority:
        'Framework documents with matching English and Chinese source paths are copied without semantic edits. Language-specific contributor material remains authoritative upstream.',
      files: files.sort((left, right) => left.destination.localeCompare(right.destination)),
    },
    applicationProjection: applicationProjection(
      applicationRevision,
      applicationStatus,
      applicationAuthority,
    ),
  };

  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

function verifyRecord(record) {
  const path = join(siteRoot, record.destination);
  if (!existsSync(path))
    throw new Error(`Vendored documentation is missing: ${record.destination}`);
  if (sha256(path) !== record.sha256) {
    throw new Error(
      `Vendored documentation changed without a manifest update: ${record.destination}`,
    );
  }
}

function checkManifest(frameworkRoot, applicationRoot) {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const records = [...manifest.framework.files, ...manifest.applicationProjection.files];
  records.forEach(verifyRecord);

  const tracked = new Set(records.map((record) => record.destination));
  const present = filesBelow(contentRoot).map((path) =>
    relative(siteRoot, path).replaceAll('\\', '/'),
  );
  const unexpected = present.filter((path) => !tracked.has(path));
  if (unexpected.length > 0) {
    throw new Error(
      `Documentation files are not tracked by the sync manifest:\n${unexpected.join('\n')}`,
    );
  }

  if (frameworkRoot) {
    const resolvedRoot = resolve(frameworkRoot);
    const currentRevision = gitRevision(resolvedRoot);
    if (currentRevision !== manifest.framework.revision) {
      throw new Error(
        `Framework docs need synchronization: manifest=${manifest.framework.revision}, source=${currentRevision}`,
      );
    }
    for (const record of manifest.framework.files) {
      const source = join(resolvedRoot, record.sourcePath);
      if (!existsSync(source) || sha256(source) !== record.sha256) {
        throw new Error(`Framework documentation drifted: ${record.sourcePath}`);
      }
    }
  }

  if (applicationRoot) {
    const currentRevision = gitRevision(resolve(applicationRoot));
    if (currentRevision !== manifest.applicationProjection.reviewedRevision) {
      throw new Error(
        `EKO projections need review: manifest=${manifest.applicationProjection.reviewedRevision}, source=${currentRevision}`,
      );
    }
  }

  for (const path of filesBelow(join(contentRoot, 'eko'))) {
    const content = readFileSync(path, 'utf8');
    for (const staleClaim of ['EchoCoWork', '10-100', '67+']) {
      if (content.includes(staleClaim)) {
        throw new Error(`Stale product claim found in ${relative(siteRoot, path)}: ${staleClaim}`);
      }
    }
  }
}

const frameworkRootArgument = argumentValue('--framework-root');
const applicationRootArgument = argumentValue('--application-root');
const applicationRevision = argumentValue('--application-revision');
const applicationStatus = argumentValue('--application-status');
const applicationAuthority = argumentValue('--application-authority');
const frameworkRoot =
  frameworkRootArgument === 'auto' ? discoverFrameworkRoot() : frameworkRootArgument;
const applicationRoot =
  applicationRootArgument === 'auto' ? discoverApplicationRoot() : applicationRootArgument;
if (process.argv.includes('--check')) {
  checkManifest(frameworkRoot, applicationRoot);
} else {
  if (!frameworkRoot) throw new Error('Pass --framework-root <path> when synchronizing docs.');
  syncFramework(frameworkRoot, applicationRevision, applicationStatus, applicationAuthority);
  checkManifest(frameworkRoot, applicationRoot);
}
