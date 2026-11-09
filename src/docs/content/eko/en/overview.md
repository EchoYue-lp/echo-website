# Eclip

> **历史英文参考**
> 本页保留旧版产品说明；当前产品请阅读[中文说明](/eko/docs/overview)。下文不是当前中文主维护文档的同步译文。

**/ˈɛk.lɪp/** · **EK-lip**

Eclip is a local personal assistant running on the user's machine. The approved
target has one GUI product entry, with IM messages and cron as retained background
triggers. GUI terminals, Agent shell tools, desktop launch arguments and the
independent SDK Host stdio protocol remain valid capabilities.

The historical baseline described here contained TUI, REPL, CLI/JSONL and channel adapters.
Their shared services remain authoritative during migration; the old requirement
to keep expanding all console surfaces has been superseded. Removing console
entry points must wait for GUI-owned IM lifecycle, cron and recovery acceptance.
This documentation change does not delete any runtime entry or protocol.

Eclip no longer requests the framework LSP feature, registers language-server tools,
or exposes LSP commands/settings/IPC. Old configuration and plugin declarations
receive explicit retirement diagnostics without deleting user files. Mixed plugins
retain legal components and their existing publication/cleanup receipts. Framework
A2A/LSP APIs still exist pending both consumers' acceptance; console surfaces,
IM, cron, MCP and Subagent are retained in this consumer-only change.

## Capability boundary

- Read project instructions, files, and code context
- Use tools, skills, hooks, plugins, and user-configured MCP servers
- Organize dependent `PlanTask` work and Subagent execution in one revisioned TaskRun graph, with framework `TaskStatus` as execution authority and Todo as a read-only projection
- Discover, inspect, message, follow up, wait for, and interrupt Conversation Agents and exact Task Subagent attempts through six bounded `agent_*` tools
- Resume cursor-based Agent waits and TaskRuns across restart, preserving workspace and original TaskRun identity; GUI, TUI, CLI, JSONL, and channels publish a single typed terminal for a settled execution, based on a genuine, durably acknowledged settlement receipt
- Keep an unsettled execution nonterminal and retain its original owner; an unknown outcome does not authorize replay or duplicate execution
- Control Skills, prepared Plugin generations, MCP, Hooks, Browser, and direct-user tool visibility through scoped application authorities
- Publish generation-bound hot memory once for the primary, existing pooled Agents, and future Agents at the next model safe point
- Store conversations, memory, task journals, checkpoints, and product projections in local files or memory without requiring SQLite

This website is a reviewed projection of product facts; it does not define Eclip behavior or public APIs. The [Eclip source repository](https://github.com/EchoYue-lp/echo-agent-cli), its maintained docs, and its ADRs remain authoritative for implementation and configuration.
