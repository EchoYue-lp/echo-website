// Dynamic markdown loader using Vite's import.meta.glob
// Loads all docs from echo-agent and echo-agent-cli as raw strings.

// Glob import all zh docs from echo-agent
const agentDocs = import.meta.glob(
  '../../../echo-agent/docs/zh/**/*.md',
  { query: '?raw', import: 'default', eager: true }
) as Record<string, string>;

// Glob import CLI docs
const cliDocs = import.meta.glob(
  '../../../echo-agent-cli/docs/*.md',
  { query: '?raw', import: 'default', eager: true }
) as Record<string, string>;

// CLI README
const cliReadme = import.meta.glob(
  '../../../echo-agent-cli/README.md',
  { query: '?raw', import: 'default', eager: true }
) as Record<string, string>;

/**
 * Resolve a doc slug to its markdown content.
 * Maps registry file paths to the glob-imported modules.
 */
export function loadDocContent(filePath: string): string | null {
  // Normalize the registry path to match Vite's glob keys
  // Registry uses: '../echo-agent/docs/zh/01-react-agent.md'
  // Glob keys use absolute or resolved paths

  // Try agent docs
  for (const [key, content] of Object.entries(agentDocs)) {
    if (key.includes(filePath.replace('../', ''))) {
      return content;
    }
  }

  // Try CLI docs
  if (filePath.includes('echo-agent-cli/README.md')) {
    for (const [, content] of Object.entries(cliReadme)) {
      return content;
    }
  }
  if (filePath.includes('echo-agent-cli/docs/')) {
    for (const [key, content] of Object.entries(cliDocs)) {
      if (key.includes(filePath.replace('../echo-agent-cli/', ''))) {
        return content;
      }
    }
  }

  return null;
}

/** Get list of all available doc paths (for debugging) */
export function getAvailableDocs(): string[] {
  return [
    ...Object.keys(agentDocs),
    ...Object.keys(cliDocs),
    ...Object.keys(cliReadme),
  ];
}
