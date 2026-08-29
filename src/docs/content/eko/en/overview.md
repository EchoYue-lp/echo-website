# EKO

EKO is a local personal AI assistant built on echo-agent. Its TUI, Tauri desktop interface, CLI/JSONL, and messaging channels use the same `echo-agent-app-core` services; capability parity across those surfaces is the product contract.

## Capability boundary

- Read project instructions, files, and code context
- Use tools, skills, hooks, plugins, and user-configured MCP servers
- Organize dependent `PlanTask` work and Subagent execution in one revisioned TaskRun graph, with framework `TaskStatus` as execution authority and Todo as a read-only projection
- Discover, inspect, message, follow up, wait for, and interrupt Conversation Agents and exact Task Subagent attempts through six bounded `agent_*` tools
- Resume cursor-based Agent waits and TaskRuns across restart, while preserving cold workspace identity and exactly one typed terminal across GUI, TUI, CLI, JSONL, and channels
- Control Skills, prepared Plugin generations, MCP, Hooks, LSP, Browser, and direct-user tool visibility through scoped application authorities
- Publish generation-bound hot memory once for the primary, existing pooled Agents, and future Agents at the next model safe point
- Store conversations, memory, task journals, checkpoints, and product projections in local files or memory without requiring SQLite

This website is a reviewed projection of product facts; it does not define EKO behavior or public APIs. The [EKO source repository](https://github.com/EchoYue-lp/echo-agent-cli), its maintained docs, and its ADRs remain authoritative for implementation and configuration.
