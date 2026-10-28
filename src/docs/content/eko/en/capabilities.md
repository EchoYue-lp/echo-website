# Eclip capability scope

> **历史英文参考**
> 本页保留旧版产品说明；当前产品请阅读[中文说明](/eko/docs/capabilities)。下文不是当前中文主维护文档的同步译文。

Eclip is a local personal AI assistant built on `echo-agent`. The capabilities on this page reflect production bindings in the application core. They are not performance guarantees: results and duration depend on the configured model, tools, source availability, and local machine.

## Coding

Eclip integrates transactional file edits, workspace diff, analytics execution,
interactive local/system-OpenSSH terminal sessions (source prepared; native/remote
qualification pending), Browser/Chrome, workflow catalog, structured
extraction, MCP, Tool output projections, model-driven Agent collaboration controls,
Hooks/Webhooks, Plugins, and Skills.

## Data analysis

Data analysis stores scripts, data, charts, and reports as file-backed
artifacts.

## Academic research

Research supports paper libraries, scholarly search, Zotero, Europe PMC,
citation audit, and export.

## Biomedical literature research

Search PubMed (NCBI) for biomedical literature.

Medical review supports PICO/PECO, screening, RoB, GRADE, PRISMA, and
applicability risk.

It is designed for literature research, not diagnosis, treatment recommendations, or clinical decision-making.

An enabled plugin may add one package-root `domain.yaml`. It declares
`schema_version: 1`, nonempty `method`, optional `default_subagent_roles`, and
explicit `allowed_tools`, `required_artifacts`, `execution_checks`,
`acceptance_criteria`, `review_checklist` and `inputs` lists. Unknown fields or
invalid declarations reject the candidate through the original publication
error path. No declaration means an ordinary plugin, not an implicit domain.
Manifest name and optional version are not duplicated in this file.

The existing chat/task request accepts optional `domain_plugin` (GUI camelCase
`domainPlugin`). Omission keeps General. The original input queue stores that
selection with its payload identity; it cannot change an active run by steering.
New non-General `domain_profile` requests must select a plugin instead. Historical
profile names remain readable; they do not authorize new professional execution.

## Long-horizon tasks

`TaskRuntime`, checkpoints, pause and resume, execution budgets, and scheduling support work designed to continue for hours or tens of hours. The runtime preserves inspectable state and continuation points; it does not promise a fixed completion time or success rate.

Task relationships have one authority: a revisioned `TaskRun -> PlanTask -> SubagentRun` graph. Framework `TaskStatus` owns execution state, Plan is an editable artifact, and Todo is a read-only display projection. Same-run dependencies use `PlanRevision.tasks[].depends_on`; Eclip does not maintain a second cross-run dependency graph.

For an exact Task Subagent attempt, the interruption request is recorded before its original execution is signalled; the request itself is not a completion or cancellation receipt. Continuation uses the existing TaskRun identity, Goal, route, and execution profile, with the caller workspace, conversation, and root checked against that identity.

Eclip's GUI selects 1, 2 or 3 child layers, defaults to 1, and never admits layer 4.
Primary is layer 0; the first actual child is layer 1.

Only integers 1, 2 and 3 are accepted; the default is 1. Primary is layer 0. Changes apply to new runs/turns; existing runs, new tasks within them, retries and recovery keep their original binding. Invalid configuration files fail explicitly instead of silently loading defaults.

## Context compression

Eclip defaults to a recent-text token budget of 25% of the model window, capped at 20K tokens, with `compress_window: 0`. Compression preserves canonical instructions and the latest user request, and keeps tool calls and results together. Active task goals and recovery constraints are rebuilt from TaskRuntime; complete conversation history remains in the conversation store. CLI, TUI, GUI, and channels share the installed strategy and optional compression focus. An explicit positive `compress_window` selects the legacy message cap; the adaptive strategy uses its own L1-L5 policy.

Queued additions acknowledge receipt from the original durable `queue_chat_input` result, without waiting for the model, physical tool or mailbox drain. Frontier refresh and tracked-steer observation stay with the original input service and attempt owner. Receipt, drain, context inclusion and terminal outcome are separate facts; receipt does not mean an active tool stopped or the correction executed.

## Agent collaboration and recovery

Six model-callable `agent_*` tools list, inspect, message, follow up, wait, and interrupt explicit Conversation or Task Subagent targets. Runtime queries are bounded at the journal layer. Cursor identity survives router or TaskRuntime reopen, cold addresses are checked against the bound workspace, and the five interactive/automation surfaces replay the same genuine typed terminal facts. An unsettled observation remains nonterminal and keeps the original execution owner and resources. Stopping a wait, requesting cancellation, or restarting the application does not prove that execution has ended or authorize replay.

## Subagent prompt compilation

Built-in, plugin, direct, planned, fork, teammate, team-member, and primary TaskRuntime invocations use one prompt compiler. Stable system prompts contain role knowledge, the concrete registered tool surface, typed access and isolation boundaries, delegation, language policy, and the framework result contract. Task goals, workspace, file scope, checks, acceptance criteria, artifacts, constraints, filtered user/final-assistant history, and typed attachments stay in dynamic invocation messages. Tool visibility and MCP topology changes republish the stable capability profile; invocation allowlists emit only a narrowing override.

## Deterministic command-cell watch

`watch_cell` uses the framework `CommandCellWatcher` to retain one background command, drain its byte cursor, and publish typed terminal truth without dispatching a model or Subagent. Eclip adds exact workspace/conversation/root identity, generation idempotency, durable Ready/delivery/ack facts, recovery, and shared surface projection. Interrupting a watch does not stop the underlying command.

## Personal Weixin

The candidate distinguishes configured/authorized, authenticated-poll Ready,
and a send's Accepted. Saving or starting is not online evidence, and Accepted
does not establish phone receipt. `-14` requires reauthentication. Forget removes
local credentials/protocol state without claiming server revocation or deleting
history or unsettled notifications. One active account accepts only the scanning
user's direct text into the original Agent/TaskRun/HITL. Account replacement does
not reuse old context, session or human-request identity. Groups/media/mixed media
do not execute remaining text. No OpenClaw Gateway or desktop injection is used.

## Local application core

Eclip is a local personal assistant running on the user's machine. The approved
target has one GUI product entry, with IM messages and cron as retained background
triggers. GUI terminals, Agent shell tools, desktop launch arguments and the
independent SDK Host stdio protocol remain valid capabilities.

The historical baseline described here contained TUI, REPL, CLI/JSONL and channel adapters.
Their shared services remain authoritative during migration; the old requirement
to keep expanding all console surfaces has been superseded. Removing console
entry points must wait for GUI-owned IM lifecycle, cron and recovery acceptance.
This documentation change does not delete any runtime entry or protocol.

## Extension control

Skills, Plugins, MCP servers, Hooks, and Browser controls enter one application-core authority from the GUI, TUI, CLI/JSONL, and channels. Eclip consumes independent Skills installed under `~/.eko/skills/`, project Skills under the current project's `.eko/skills/`, and Skills supplied by plugin generations; it no longer bundles a catalog, default active set, baseline, or Tauri Skill resource. Version 3 `enabled-skills.json` stores only user `{enabled}` choices. The project's root-to-working-directory `AGENTS.md` chain enters the same instruction projection. Name collisions use project Skills, plugin Skills, then user Skills as the precedence order. Typed receipts return settled or degraded, and the next operation, restart, or workspace load converges again.

Portable Plugin components are parsed once into an immutable framework `PreparedPluginSet`. Eclip captures exact workspace targets and adds only product policy for executable Subagents, scoped monitors, themes, and output styles. Rollback uses the prepared generation rather than rereading changed files.

## Memory and direct-user tool control

Each workspace memory generation shares one `MemoryLayerManager`. A successful mutation reads hot memory once and publishes one immutable snapshot for primary, existing pooled, and future Agents at their next model safe point. `/reflect`, remember/forget, evidence review, TaskRuntime, Dreaming, and model tools use the same settlement contract.

Direct-user tool visibility is a separate application policy projected through the framework's disabled-tools snapshot. It is not an approval mode and is not gated by automated-agent permission settings.

These statements summarize reviewed source behavior. The Eclip repository remains the authority for exact configuration, commands, and contracts.
