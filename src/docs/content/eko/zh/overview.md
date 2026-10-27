# Eclip

**/ˈɛk.lɪp/** · **EK-lip**

Eclip 是基于 echo-agent 构建的本地个人 AI 助理，以 GUI 为主入口，保留 IM 消息和 cron 定时任务作为后台触发方式。它们复用同一套会话、TaskRuntime、Subagent、工具、HITL 和记忆服务。

独立 TUI、REPL、CLI/JSONL 入口仍处于待退役的迁移阶段，不能把产品方向当作物理删除已经完成。GUI 内置终端、Agent shell 和独立 SDK Host stdio 不属于该退役范围。

## 能力边界

- 读取项目指令、文件和代码上下文
- 调用工具、技能、hooks、插件和用户配置的 MCP server
- 在一个 revisioned TaskRun graph 中组织有依赖的 `PlanTask` 与 Subagent 执行；framework `TaskStatus` 是执行权威，Todo 只是只读投影
- 通过六个有界 `agent_*` 工具发现、检查、发送消息、follow up、等待与中断 Conversation Agent 或精确的 Task Subagent attempt
- 在已有本地文件夹、新建文件夹或 SSH 远程项目中工作；工作空间就是项目，任务与会话归属该工作空间
- 从 GUI 管理已有 IM 渠道和定时任务；个人微信按源码提供扫码、必要数字确认与受限的本人私聊文字入口，实际登录和手机收件须分别验证
- 跨重启恢复基于 cursor 的 Agent wait 与 TaskRun，保持 workspace 与原 TaskRun 身份；已结算执行以真实且已持久确认的结算回执为准
- 执行结果尚不确定时保持非终态并保留原 owner；未知结果不授权重放或重复执行
- 通过 scoped 应用权威控制 Skills、prepared Plugin generation、MCP、Hooks、Browser 与用户直接设置的工具可见性；Eclip 的 LSP 消费入口已退出
- 在下一个 model safe point 向 primary、已有 pool Agent 和 future Agent 发布同一个 generation-bound hot memory
- 用本地文件或内存保存对话、memory、task journal、checkpoint 与产品投影，不要求 SQLite

默认仅主智能体可以派发首层 Subagent，子智能体不能再次派发。GUI 的“最大 Subagent 总层数”默认 1、可选 1—3，对应默认额外嵌套深度 0；新配置不回写已有 TaskRun 的绑定。

普通 Steer 由主模型结合历史理解，并按需调整计划，不自动改写 Goal。已有 Goal 只由用户显式更新或结束；没有 Goal 时智能体可初始化。输入的持久接收、进入模型上下文与执行完成分别记录，必要原文通过既有 journal 与读取入口恢复。

首页使用“把想法变成成果”，从“新建任务、最近任务、工作空间”进入工作；顶部“新建支线对话”入口已移除，已有支线历史和恢复继续保留。助手正文直接对齐，工具与执行详情可展开。每轮完整回复末尾的两种分叉仍待后继交付：新 Worktree 已确定从 HEAD 创建，不带未提交或未跟踪改动；不能把方向确认当作功能已经实现。

原生消息、统一执行终态与长任务进度正在跨仓实现和验收；源码、前端构建与真实桌面窗口各有独立证据，不能互相替代。

官网是经过审阅的产品事实投影，不定义 Eclip 行为或公共 API。实现与配置以 [Eclip 源码仓库](https://github.com/EchoYue-lp/echo-agent-cli)、其中长期维护的文档和 ADR 为准。
