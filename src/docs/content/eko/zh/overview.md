# EKO

EKO 是基于 echo-agent 构建的本地个人 AI 助理。TUI、Tauri 桌面界面、CLI/JSONL 和消息 channel 使用同一套 `echo-agent-app-core` 服务；这些 surface 的能力对等是产品契约。

## 能力边界

- 读取项目指令、文件和代码上下文
- 调用工具、技能、hooks、插件和用户配置的 MCP server
- 在一个 revisioned TaskRun graph 中组织有依赖的 `PlanTask` 与 Subagent 执行；framework `TaskStatus` 是执行权威，Todo 只是只读投影
- 通过六个有界 `agent_*` 工具发现、检查、发送消息、follow up、等待与中断 Conversation Agent 或精确的 Task Subagent attempt
- 跨重启恢复基于 cursor 的 Agent wait 与 TaskRun；保持 cold workspace identity，并让 GUI、TUI、CLI、JSONL、channel 只消费一个 typed terminal
- 通过 scoped 应用权威控制 Skills、prepared Plugin generation、MCP、Hooks、LSP、Browser 与用户直接设置的工具可见性
- 在下一个 model safe point 向 primary、已有 pool Agent 和 future Agent 发布同一个 generation-bound hot memory
- 用本地文件或内存保存对话、memory、task journal、checkpoint 与产品投影，不要求 SQLite

官网是经过审阅的产品事实投影，不定义 EKO 行为或公共 API。实现与配置以 [EKO 源码仓库](https://github.com/EchoYue-lp/echo-agent-cli)、其中长期维护的文档和 ADR 为准。
