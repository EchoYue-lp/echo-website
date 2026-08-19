# EKO 本地数据

EKO 面向用户自己的机器，产品层使用普通文件或内存保存状态，不要求数据库服务。

## 数据职责

- 对话历史由文件型 `ConversationStore` 投影
- Agent 运行时状态由文件型 `RuntimeStateStore` 保存
- 记忆、技能、配置和工作区产物保留在本地目录
- TUI、GUI、CLI 与 channel 通过同一应用核心访问这些能力

框架仍可以向其他复用方提供不同的通用 Store 实现；EKO 的产品存储选择不限制 echo-agent 框架的能力菜单。
