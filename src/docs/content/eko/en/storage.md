# Eclip Local Data

Eclip runs on the user's own machine. Its product layer stores state in ordinary files or memory and does not enable SQLite. Framework Store implementations available to other consumers are a separate concern.

## Data responsibilities

- `FileConversationStore` persists user-visible conversation history; `FileRuntimeStateStore` persists framework Agent checkpoints. Neither owns the Task graph.
- TaskRuntime `events.jsonl` is the fact authority for turn-run Goals, mid-turn user constraints, and formal task execution state. `checkpoint.json`, `plan.json`, `run-state.json`, and bounded artifact/review history segments are rebuildable projections or indexes.
- The Task journal preserves canonical execution facts, including interruption requests and the distinction between an absent result and an explicit null. Unresolved original-owner intent survives restart and blocks duplicate execution for that run while unrelated runs can recover.
- If physical completion is known but saving its settlement fails, the same owner retries only settlement persistence and acknowledgement. It does not run the Agent or tool again; resources remain retained until the matching completion is durably acknowledged.
- Every store-backed turn eagerly owns a TaskRun. Typed execution provenance distinguishes an internal conversation turn from an orchestrated run; a planless conversation run keeps its journal but stays out of the task UI.
- Ordinary chat also uses its own `ChatEventLog` for input/output delivery and surface replay. It can correlate with the TaskRuntime journal for the same turn, but neither journal replaces the other.
- Each workspace owns its local memory Store, one generation-bound `MemoryLayerManager`, and an immutable hot-memory projection consumed at model safe points.
- `enabled-skills.json` is the sole persistent enablement fact for user Skills. Version 3 stores only the atomically written `{enabled}` flat map; project Skills under the current project's `.eko/skills/` are not written there. Eclip no longer bundles Skills, creates a default active set, or injects a baseline; runtime reconciliation returns immediate target receipts and retains no generation or repair debt.
- Artifacts and traces remain workspace-scoped. Trace data is diagnostic and does not determine whether a TaskRun or PlanTask committed.

The default product data root is `~/.eko/`, overridable with `EKO_DATA_DIR`.

A Workspace is a project or engineering workspace; tasks and conversations belong to it, and TaskRun/PlanTask lists contain execution records. Workspace creation selects an existing local folder, creates one new local folder, or opens an SSH project. Creating a task does not create a folder. Code location is separate from local `Workspace.root` product data. Legacy manifests still resolve `project_root`, then `root`, without moving directories. The original manifest and `project_root_revision` own configured location and verified execution identity.

User rules, memory, conversations and journals remain local.

Receipt, drain, context inclusion and terminal outcome are separate facts; receipt does not mean an active tool stopped or the correction executed.

This page is a website projection, not a storage schema. The Eclip persistence documentation and source repository remain authoritative.
