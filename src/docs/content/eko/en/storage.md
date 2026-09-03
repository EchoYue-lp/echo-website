# EKO Local Data

EKO runs on the user's own machine. Its product layer stores state in ordinary files or memory and does not enable SQLite. Framework Store implementations available to other consumers are a separate concern.

## Data responsibilities

- `FileConversationStore` persists user-visible conversation history; `FileRuntimeStateStore` persists framework Agent checkpoints. Neither owns the Task graph.
- TaskRuntime `events.jsonl` is the fact authority for turn-run Goals, mid-turn user constraints, and formal task execution state. `checkpoint.json`, `plan.json`, `run-state.json`, and bounded artifact/review history segments are rebuildable projections or indexes.
- Every store-backed turn eagerly owns a TaskRun. Typed execution provenance distinguishes an internal conversation turn from an orchestrated run; a planless conversation run keeps its journal but stays out of the task UI.
- Ordinary chat also uses its own `ChatEventLog` for input/output delivery and surface replay. It can correlate with the TaskRuntime journal for the same turn, but neither journal replaces the other.
- Each workspace owns its local memory Store, one generation-bound `MemoryLayerManager`, and an immutable hot-memory projection consumed at model safe points.
- `enabled-skills.json` is the sole persistent Skill enablement fact. It stores only the atomically written `{category, enabled, baseline}` flat map; runtime reconciliation returns immediate target receipts and retains no generation or repair debt.
- Artifacts and traces remain workspace-scoped. Trace data is diagnostic and does not determine whether a TaskRun or PlanTask committed.
- TUI, GUI, CLI/JSONL, and channels access these authorities through the same application core.

The default product data root is `~/.eko/`, overridable with `EKO_DATA_DIR`. Workspace-owned conversations, tasks, memory, artifacts, and traces live below the workspace `.eko/` directory.

This page is a website projection, not a storage schema. The EKO persistence documentation and source repository remain authoritative.
