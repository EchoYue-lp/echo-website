# EKO Local Data

EKO runs on the user's own machine. Its product layer stores state in ordinary files or memory and does not enable SQLite. Framework Store implementations available to other consumers are a separate concern.

## Data responsibilities

- `FileConversationStore` persists user-visible conversation history; `FileRuntimeStateStore` persists framework Agent checkpoints. Neither owns the Task graph.
- TaskRuntime `events.jsonl` is the formal task fact authority. `checkpoint.json`, `plan.json`, `run-state.json`, and bounded artifact/review history segments are rebuildable projections or indexes.
- Ordinary chat uses its own `ChatEventLog`; it does not replace the TaskRuntime journal.
- Each workspace owns its local memory Store, one generation-bound `MemoryLayerManager`, and an immutable hot-memory projection consumed at model safe points.
- `enabled-skills.json` is the sole persistent Skill enablement fact. It stores only the atomically written `{category, enabled, baseline}` flat map; runtime reconciliation returns immediate target receipts and retains no generation or repair debt.
- Artifacts and traces remain workspace-scoped. Trace data is diagnostic and does not determine whether a TaskRun or PlanTask committed.
- TUI, GUI, CLI/JSONL, and channels access these authorities through the same application core.

The default product data root is `~/.eko/`, overridable with `EKO_DATA_DIR`. Workspace-owned conversations, tasks, memory, artifacts, and traces live below the workspace `.eko/` directory.

This page is a website projection, not a storage schema. The EKO persistence documentation and source repository remain authoritative.
