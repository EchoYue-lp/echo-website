# EKO capability scope

EKO is a local personal AI assistant built on `echo-agent`. The capabilities on this page reflect production bindings in the application core. They are not performance guarantees: results and duration depend on the configured model, tools, source availability, and local machine.

## Coding

The coding profile binds file operations, an interactive shell, Git, LSP navigation and diagnostics, isolated worktrees, and bounded Subagent runs. These are local developer tools and task-runtime capabilities, not a remote coding service.

## Data analysis

The data profile uses a dedicated data workspace and Polars-backed tools. Analysis runs produce reviewable Python or R scripts alongside manifests and artifacts so that inputs, transformations, and outputs remain inspectable.

## Academic research

Academic research bindings include arXiv and Semantic Scholar search, Zotero integration, and a research workspace that retains sources and evidence. Research connectors feed the same application-core workflow instead of a separate website implementation.

## Biomedical literature research

The biomedical research profile can search PubMed and Europe PMC and organize biomedical entities and source records for literature synthesis. It is designed for literature research, not diagnosis, treatment recommendations, or clinical decision-making.

## Long-horizon tasks

`TaskRuntime`, checkpoints, pause and resume, execution budgets, and scheduling support work designed to continue for hours or tens of hours. The runtime preserves inspectable state and continuation points; it does not promise a fixed completion time or success rate.

## Local application core

TUI, GUI, CLI, and channel adapters use the shared application core. Capability parity across those interfaces is the product contract. Conversation and runtime state use file or memory stores on the user's machine; EKO does not require SQLite.

## Extension control

Skills, Plugins, MCP servers, Hooks, LSP, and Browser controls enter one application-core authority from the GUI, TUI, CLI/JSONL, and channels. Skill enablement commits durable desired state before runtime publication. Typed receipts distinguish committed, settled, and degraded outcomes, and retained repair debt is replayed after restart or workspace load instead of being hidden as success.
