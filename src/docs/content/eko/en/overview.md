# EKO

EKO is a local personal AI assistant built on echo-agent. Its TUI, Tauri desktop interface, CLI, and messaging channels connect through `echo-agent-app-core`; capability parity across those surfaces is the product contract. The application repository remains authoritative while its review is in progress.

## Capability boundary

- Read project instructions, files, and code context
- Use tools, skills, hooks, plugins, and user-configured MCP servers
- Control Skills, Plugins, MCP, Hooks, LSP, and Browser through one scoped Extension authority
- Organize todos, dependent tasks, and Subagent execution in one task graph
- Require the same core Agent capability contract from the TUI, GUI, CLI, and channels
- Store conversations, memory, and product projections in local files or memory

This website projects product facts; it does not define the EKO runtime model. The [EKO source repository](https://github.com/EchoYue-lp/echo-agent-cli) remains authoritative for implementation and configuration.
