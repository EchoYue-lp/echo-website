# EKO

EKO 是基于 echo-agent 构建的本地个人 AI 助理。TUI、Tauri 桌面界面、CLI 和消息 channel 通过 `echo-agent-app-core` 接入；这些交互表面的能力对等是产品契约。应用 review 进行期间，具体实现仍以应用仓库为准。

## 能力边界

- 读取项目指令、文件和代码上下文
- 调用工具、技能、hooks、插件和用户配置的 MCP server
- 通过统一任务图组织 Todo、依赖任务与 Subagent 执行
- 要求 TUI、GUI、CLI 和 channel 满足同一套核心 Agent 能力契约
- 用本地文件或内存保存对话、记忆和产品投影

官网只投影产品事实，不定义 EKO 的运行时模型。实现与配置始终以 [EKO 源码仓库](https://github.com/EchoYue-lp/echo-agent-cli) 为准。
