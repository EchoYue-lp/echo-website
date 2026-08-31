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

Task relationships have one authority: a revisioned `TaskRun -> PlanTask -> SubagentRun` graph. Framework `TaskStatus` owns execution state, Plan is an editable artifact, and Todo is a read-only display projection. Same-run dependencies use `PlanRevision.tasks[].depends_on`; EKO does not maintain a second cross-run dependency graph.

## Agent collaboration and recovery

Six model-callable `agent_*` tools list, inspect, message, follow up, wait, and interrupt explicit Conversation or Task Subagent targets. Runtime queries are bounded at the journal layer. Cursor identity survives router or TaskRuntime reopen, cold addresses are checked against the bound workspace, and the five interactive/automation surfaces replay the same typed terminal facts.

## Subagent prompt compilation

Built-in, plugin, direct, planned, fork, teammate, team-member, and primary TaskRuntime invocations use one prompt compiler. Stable system prompts contain role knowledge, the concrete registered tool surface, typed access and isolation boundaries, delegation, language policy, and the framework result contract. Task goals, workspace, file scope, checks, acceptance criteria, artifacts, constraints, filtered user/final-assistant history, and typed attachments stay in dynamic invocation messages. Tool visibility and MCP topology changes republish the stable capability profile; invocation allowlists emit only a narrowing override.

## Deterministic command-cell watch

`watch_cell` uses the framework `CommandCellWatcher` to retain one background command, drain its byte cursor, and publish typed terminal truth without dispatching a model or Subagent. EKO adds exact workspace/conversation/root identity, generation idempotency, durable Ready/delivery/ack facts, recovery, and shared surface projection. Interrupting a watch does not stop the underlying command.

## Local application core

TUI, GUI, CLI/JSONL, and channel adapters use one `ApplicationServices` composition owner. Surfaces retain input, rendering, and host bridges rather than assembling separate task, recovery, pool, or maintenance runtimes. Conversation and runtime state use file or memory stores on the user's machine; EKO does not require SQLite.

## Extension control

Skills, Plugins, MCP servers, Hooks, LSP, and Browser controls enter one application-core authority from the GUI, TUI, CLI/JSONL, and channels. Skill enablement commits durable desired state before runtime publication. Typed receipts distinguish committed, settled, and degraded outcomes, and retained repair debt is replayed after restart or workspace load instead of being hidden as success.

Portable Plugin components are parsed once into an immutable framework `PreparedPluginSet`. EKO captures exact workspace targets and adds only product policy for executable Subagents, LSP processes, scoped monitors, themes, and output styles. Rollback uses the prepared generation rather than rereading changed files.

## Memory and direct-user tool control

Each workspace memory generation shares one `MemoryLayerManager`. A successful mutation reads hot memory once and publishes one immutable snapshot for primary, existing pooled, and future Agents at their next model safe point. `/reflect`, remember/forget, evidence review, TaskRuntime, Dreaming, and model tools use the same settlement contract.

Direct-user tool visibility is a separate application policy projected through the framework's disabled-tools snapshot. It is not an approval mode and is not gated by automated-agent permission settings.

These statements summarize reviewed source behavior. The EKO repository remains the authority for exact configuration, commands, and contracts.
