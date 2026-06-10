// Dynamic markdown loader using Vite's import.meta.glob
// Loads all docs from local content/ directory (copied from source repos).

// Glob import all echo-agent docs (copied locally)
const agentDocs = import.meta.glob(
  './content/echo-agent/**/*.md',
  { query: '?raw', import: 'default', eager: true }
) as Record<string, string>;

// Glob import CLI docs (copied locally)
const cliDocs = import.meta.glob(
  './content/echo-agent-cli/**/*.md',
  { query: '?raw', import: 'default', eager: true }
) as Record<string, string>;

/**
 * Resolve a doc slug to its markdown content.
 * Maps registry file paths to the glob-imported modules.
 */
export function loadDocContent(filePath: string): string | null {
  // Registry paths: './content/echo-agent/01-react-agent.md'
  // Glob keys: full resolved paths ending with the same relative path

  // Extract the filename from registry path
  const fileName = filePath.replace(/^\.\/content\//, '');

  // Try agent docs
  for (const [key, content] of Object.entries(agentDocs)) {
    if (key.includes(fileName)) {
      return content;
    }
  }

  // Try CLI docs
  for (const [key, content] of Object.entries(cliDocs)) {
    if (key.includes(fileName)) {
      return content;
    }
  }

  return null;
}

/** Get list of all available doc paths (for debugging) */
export function getAvailableDocs(): string[] {
  return [
    ...Object.keys(agentDocs),
    ...Object.keys(cliDocs),
  ];
}
