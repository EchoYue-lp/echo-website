# EKO 能力边界

EKO 是基于 `echo-agent` 构建的本地个人 AI 助理。以下内容说明当前源码的能力与边界，不构成性能或验收承诺：结果与持续时长取决于模型配置、工具、来源可用性和本机环境。

## Coding

编码工作使用文件操作、交互式 Shell、Git、隔离 Worktree 和边界明确的 Subagent。工作空间支持已有本地目录、新建目录与 SSH 项目；项目文件和 Agent 命令使用绑定的同一真实目标。EKO 已退出 LSP 工具、manager、设置和 IPC 消费路径，框架自身的公开能力退役另行处理。

## Data analysis

数据工作台与 Polars 工具可以保留可审阅的 Python/R 脚本、清单和产物，使输入、变换与输出可检查。需要的领域方法与工具应由实际配置提供，不表示默认捆绑某个专业 Profile。

## Academic research

已配置的研究工具可检索 arXiv、Semantic Scholar，连接 Zotero，并在研究工作空间保留来源和证据。连接器进入同一应用核心工作流；工具存在不保证来源可用或研究结果成立。

## Biomedical literature research

已配置的生物医学文献工具可检索 PubMed 与 Europe PMC，并整理实体和来源记录。领域方法由启用的插件声明，不再由旧专业 Profile 名称隐式授权；这些工具用于文献研究，不用于诊断、治疗建议或临床决策。

启用的插件可通过 `domain.yaml` 声明方法、工具、产物和验收要求。未选择领域插件时保持 General；请求中的 `domainPlugin` 沿原输入和 TaskRun 身份绑定，不能用后来的配置替换运行中的规则。

## Long-horizon tasks

`TaskRuntime`、检查点、暂停与恢复、执行预算和调度支持设计为持续数小时到数十小时的工作。运行时保留可检查的状态和续跑点，但不承诺固定完成时间或成功率。

任务关系只有一个权威：revisioned `TaskRun -> PlanTask -> SubagentRun` graph。framework `TaskStatus` 管执行状态，Plan 是可编辑 artifact，Todo 是只读展示投影。同一 run 内的依赖使用 `PlanRevision.tasks[].depends_on`；EKO 不维护第二套跨 run 依赖图。

默认仅主智能体可派发首层 Subagent，首层不能继续派发，即额外嵌套深度为 0。GUI 以“最大 Subagent 总层数”配置同一规则：默认 1、可选 1—3，主智能体为第 0 层，绝不准入第 4 层。修改只影响新 run/turn；已有 TaskRun、新增任务、重试与恢复继续原绑定。

针对精确 Task Subagent attempt 的中断请求先持久记录，再向原执行发出信号；请求本身不是完成或取消回执。续跑使用既有 TaskRun 身份、Goal、route 与执行配置，并按该身份检查调用方 workspace、conversation 和 root。

## Context 压缩

EKO 默认通过 `compress_window: 0` 使用模型窗口 25%、至多 20K token 的近期原文预算。压缩保留 canonical 指令与最新用户请求，工具调用与结果成组处理。活跃任务的 goal 和恢复约束从 TaskRuntime 重建，完整历史仍保存在 ConversationStore。显式正数窗口选择旧消息条数上限；adaptive 策略继续使用自己的 L1-L5 配置。

“已收到”只是持久接收，和 drain、进入模型上下文、已执行、已完成分别记录。journal 保留完整原文，当前活动投影只覆盖最近四条短文本或 400 字符预览及 SHA 引用；必要原文或 reader 不可用时走原可恢复暂停，不能只凭预览继续。完整来源、显式替换、范围、版本及持续有效要求覆盖仍需后继验收。

## Agent 协作与恢复

六个 model-callable `agent_*` 工具对显式 Conversation 或 Task Subagent target 执行 list、inspect、message、follow-up、wait 与 interrupt。查询在 journal 层有界。cursor identity 可跨 router 或 TaskRuntime reopen 恢复，cold address 会按绑定 workspace 校验。未结算观察保持非终态，保留原执行 owner 和资源；停止等待、请求取消或重启应用，都不能证明执行已经结束，也不授权重放。

协作由 AI 使用原工具和运行时自动组织，GUI 不要求用户手工维护 Agent 组或投递收据。用户可通过 Sidechat/Forkchat 参与探索，结果沿已有对话、任务和 Subagent 视图呈现。

## Subagent prompt 编译

builtin、plugin、direct、planned、fork、teammate、team member 与 primary TaskRuntime invocation 共用唯一 prompt compiler。稳定 system prompt 只包含角色知识、实际注册工具面、typed access/isolation 边界、delegation、语言 policy 与 framework result contract。任务目标、workspace、文件范围、execution checks、acceptance criteria、artifacts、constraints、过滤后的 user/final-assistant 历史和 typed 附件只进入动态 invocation messages。工具可见性与 MCP topology 变化会重新发布稳定 capability profile；invocation allowlist 只输出缩窄 override。

## 确定性 CommandCell watch

`watch_cell` 使用 framework `CommandCellWatcher` retained 一个后台 command、drain byte cursor，并在不派发 model 或 Subagent 的前提下发布 typed terminal truth。EKO 只增加 exact workspace/conversation/root identity、generation 幂等、durable Ready/delivery/ack fact、恢复与共享 surface projection。interrupt watch 不会停止底层 command。

## Local application core

GUI、IM 与 cron 使用共享应用核心，不各自装配另一份 task、recovery、pool 或 maintenance runtime。旧 TUI、REPL、CLI/JSONL 入口仍在迁移期源码中，不能据此继续承诺永久多入口对等，也不能声称已经删除。会话与运行时状态使用本机文件或内存，EKO 不需要 SQLite。

## GUI 渠道与定时任务

设置页提供渠道和定时任务管理，QQ、飞书等现有渠道继续保留。个人微信按源码提供扫码、必要数字确认，当前限制为单个活动账号、扫码本人私聊文字，不承诺群聊或混合媒体自动执行。已配置、Ready、发送 Accepted 与手机收到分别验证；cron 通知保留原冻结目标，Unknown 不自动重发。源码或本地 focused 测试不能代替原生 GUI、真实平台与手机验收。

## Extension 控制

Skills、Plugins、MCP servers、Hooks 与 Browser 控制使用同一个应用核心权威。EKO 只消费用户安装到 `~/.eko/skills/` 的独立 Skill、当前项目 `.eko/skills/` 的项目 Skill 与 Plugin generation 提供的 Skill，不再捆绑 catalog、默认启用集、baseline 或 Tauri Skill resource。`enabled-skills.json` version 3 只保存用户 Skill 的 `{enabled}` 选择；项目根到当前工作目录的 `AGENTS.md` 链进入同一 instruction projection。相同名称按项目 Skill、Plugin Skill、用户 Skill 优先。typed receipt 返回 settled 或 degraded，下一次操作、重启或 workspace load 会重新收敛。

portable Plugin component 只解析一次，形成不可变 framework `PreparedPluginSet`。EKO 捕获精确 workspace target，增加 executable Subagent、scoped monitor、theme 与 output style 产品策略。rollback 使用 prepared generation，不重新读取可能已变化的文件。

## Memory 与用户工具控制

每个 workspace memory generation 共享一个 `MemoryLayerManager`。成功 mutation 只读取一次 hot memory，并在下一个 model safe point 向 primary、已有 pool Agent 与 future Agent 发布同一个 immutable snapshot。`/reflect`、remember/forget、evidence review、TaskRuntime、Dreaming 和模型工具使用同一 settlement contract。

用户直接设置的工具可见性是独立应用 policy，通过 framework disabled-tools snapshot 发布；它不是 approval mode，也不受 agent 自动执行 permission mode 限制。

以上内容是经过审阅的源码行为摘要；精确配置、命令与合同仍以 EKO 仓库为准。
