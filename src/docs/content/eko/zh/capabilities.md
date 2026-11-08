# Eclip 能力边界

Eclip 是基于 `echo-agent` 构建的本地个人 AI 助理。以下内容说明当前源码的能力与边界，不构成性能或验收承诺：结果与持续时长取决于模型配置、工具、来源可用性和本机环境。

## Coding

编码工作使用文件操作、交互式 Shell、Git、隔离 Worktree 和边界明确的 Subagent。工作空间支持已有本地目录、新建目录与 SSH 项目；项目文件和 Agent 命令使用绑定的同一真实目标。Eclip 的 LSP 消费入口及框架的 A2A/LSP 实现已从当前源码退役；MCP、IM、cron、GUI 内置终端、Agent shell 和独立 SDK Host stdio 继续保留。源码退出与各消费者、原生宿主和发布验收分别核对，历史说明见 [LSP 退役与恢复](/docs/lsp)和 [A2A 退役与恢复](/docs/a2a-protocol)。

## Data analysis

数据工作台与 Polars 工具可以保留可审阅的 Python/R 脚本、清单和产物，使输入、变换与输出可检查。需要的领域方法与工具应由实际配置提供，不表示默认捆绑某个专业 Profile。

标准图表工具通过 `data` 与 Vega-Lite MIME 声明完整公开图表数据，并与原调用及会话来源匹配时，可在对话中直接查看。渲染库随应用本地打包，并遵守原有 CSP；折叠执行过程后，图表仍独立可见。历史只恢复实际保存且来源匹配的图表；普通 JSON 文本、HTML、失败、截断或已转为 artifact/spill 产物的结果不会恢复为内联图表。

## Academic research

已配置的研究工具可检索 arXiv、Semantic Scholar，连接 Zotero，并在研究工作空间保留来源和证据。连接器进入同一应用核心工作流；工具存在不保证来源可用或研究结果成立。

## Biomedical literature research

已配置的生物医学文献工具可检索 PubMed 与 Europe PMC，并整理实体和来源记录。领域方法由启用的插件声明，不再由旧专业 Profile 名称隐式授权；这些工具用于文献研究，不用于诊断、治疗建议或临床决策。

启用的插件可通过 `domain.yaml` 声明方法、工具、产物和验收要求。未选择领域插件时保持 General；请求中的 `domainPlugin` 沿原输入和 TaskRun 身份绑定，不能用后来的配置替换运行中的规则。

## Long-horizon tasks

`TaskRuntime`、检查点、暂停与恢复、执行预算和调度支持设计为持续数小时到数十小时的工作。运行时保留可检查的状态和续跑点，但不承诺固定完成时间或成功率。

长任务在首次工具操作前及关键发现、计划变化、阻塞或验证结果变化时报告进展。超过 60 秒没有新的自然语言进展时，当前源码在下一模型安全点提醒主模型汇报；长时间工具或模型调用不会为凑固定频率而被打断，也不会另开模型循环。界面的操作、耗时和最后事件时间属于执行观察，不替代助手汇报或完成回执；新版原生窗口仍须单独验收。

启用续接的长任务还会在原 Goal 上下文中收到轮次收尾提示：简短说明本轮推进、实际证据及验证层级、剩余义务、障碍与下一步；没有新增验收证据时明确说明。总 Goal 对模型只读，每轮执行重点可变，用户明确指定的输出格式继续适用。该能力是模型行为提示策略，实际遵循情况须单独验收；总结文字不代替运行时完成回执，也不新增独立反思模型调用。

任务关系只有一个权威：revisioned `TaskRun -> PlanTask -> SubagentRun` graph。framework `TaskStatus` 管执行状态，Plan 是可编辑 artifact，Todo 是只读展示投影。同一 run 内的依赖使用 `PlanRevision.tasks[].depends_on`；Eclip 不维护第二套跨 run 依赖图。

默认仅主智能体可派发首层 Subagent，首层不能继续派发，即额外嵌套深度为 0。GUI 以“最大 Subagent 总层数”配置同一规则：默认 1、可选 1—3，主智能体为第 0 层，绝不准入第 4 层。修改只影响新 run/turn；已有 TaskRun、新增任务、重试与恢复继续原绑定。

针对精确 Task Subagent attempt 的中断请求先持久记录，再向原执行发出信号；请求本身不是完成或取消回执。续跑使用既有 TaskRun 身份、Goal、route 与执行配置，并按该身份检查调用方 workspace、conversation 和 root。

## Context 压缩

Eclip 默认通过 `compress_window: 0` 使用模型窗口 25%、至多 20K token 的近期原文预算。压缩保留 canonical 指令与最新用户请求，工具调用与结果成组处理。活跃任务的 goal 和恢复约束从 TaskRuntime 重建，完整历史仍保存在 ConversationStore。显式正数窗口选择旧消息条数上限；adaptive 策略继续使用自己的 L1-L5 配置。

普通 Steer 由主模型结合历史理解，并在执行中按需调整计划；不先调用独立模型解释意图，也不强制串联“有效要求更新 → 计划调整 → 验收调整”。新输入不会自动改写 Goal。同一 TaskRun 只有一个 Goal：没有 Goal 时智能体可初始化；已有 Goal 的更新、结束和删除由用户显式操作，沿原 revision/CAS 与安全点处理。普通取消执行保留历史 Goal，不等于删除目标原文。

“已收到”只是持久接收，和 drain、进入模型上下文、已执行、已完成分别记录。journal 保留完整原文，近期四条短文本或 400 字符预览只是紧凑展示。必要的早期输入、长 Goal 与消息末尾限制仍须能够通过既有原文引用和 `read_artifact` 读取、校验；必要来源不可恢复时，沿原可恢复暂停阻止相关新副作用。后继完整来源投影仍需独立验证，不能从上述产品规则推断压缩、冷重开与所有 reader 场景已通过。

## 原生消息与完成资格

当前源码分别保留 reasoning、助手正文、工具调用及结果和运行时执行状态；进度或一段文字结束不等于整个执行完成。最终候选仍须经过已配置校验、Stop Hook、持久化与真实结算，才可发布成功；Agent 执行结束与整个 TaskRun 目标完成分别判断。

框架当前源码不再注册内置 `think` / `final_answer` 控制工具，也不再要求工具调用前输出强制分析。Eclip 的 GUI、IM 与 cron 消费原生消息，删除旧 Token／Think 事件的专用分支；模型的原生 reasoning、普通助手正文和运行时最终通知继续保留。60 秒进度提醒只统计原 sink 已接受的公开正文与确认回答，Reasoning、候选和工具日志不重置计时。

IM 保持原消息顺序：已确认正文之后发生清理失败或执行未结算，正文仍可见，执行结果继续保留失败或未知。错误不能越过原队列中已经接受的有限正文前缀；这不等待未知 owner 的 EOF，也不制造完成。普通 turn 取消保留 IM service，真正停止 service 后停止发送并排空原投影；发送 Accepted 仍不等于手机收到。新版原生窗口、真实平台、SDK 正式依赖修订和发布继续分别验收。

## Agent 协作与恢复

六个 model-callable `agent_*` 工具对显式 Conversation 或 Task Subagent target 执行 list、inspect、message、follow-up、wait 与 interrupt。查询在 journal 层有界。cursor identity 可跨 router 或 TaskRuntime reopen 恢复，cold address 会按绑定 workspace 校验。未结算观察保持非终态，保留原执行 owner 和资源；停止等待、请求取消或重启应用，都不能证明执行已经结束，也不授权重放。

协作由 AI 使用原工具和运行时自动组织，GUI 不要求用户手工维护 Agent 组或投递收据。用户可通过 Sidechat/Forkchat 参与探索，结果沿已有对话、任务和 Subagent 视图呈现。

## Subagent prompt 编译

builtin、plugin、direct、planned、fork、teammate、team member 与 primary TaskRuntime invocation 共用唯一 prompt compiler。稳定 system prompt 只包含角色知识、实际注册工具面、typed access/isolation 边界、delegation、语言 policy 与 framework result contract。任务目标、workspace、文件范围、execution checks、acceptance criteria、artifacts、constraints、过滤后的 user/final-assistant 历史和 typed 附件只进入动态 invocation messages。工具可见性与 MCP topology 变化会重新发布稳定 capability profile；invocation allowlist 只输出缩窄 override。

## 确定性 CommandCell watch

`watch_cell` 使用 framework `CommandCellWatcher` retained 一个后台 command、drain byte cursor，并在不派发 model 或 Subagent 的前提下发布 typed terminal truth。Eclip 只增加 exact workspace/conversation/root identity、generation 幂等、durable Ready/delivery/ack fact、恢复与共享 surface projection。interrupt watch 不会停止底层 command。

## Local application core

GUI、IM 与 cron 使用共享应用核心，不各自装配另一份 task、recovery、pool 或 maintenance runtime。当前源码已退出独立 TUI、REPL、CLI/JSONL 产品入口，保留 GUI 内置终端、Agent shell、MCP 和独立 SDK Host stdio。会话与运行时状态使用本机文件或内存，Eclip 不需要 SQLite。

## GUI 渠道与定时任务

侧栏“IM 渠道”提供独立的渠道管理，QQ、飞书等现有渠道继续保留；定时任务继续使用原管理入口。个人微信按源码提供扫码、必要数字确认，当前限制为单个活动账号、扫码本人私聊文字，不承诺群聊或混合媒体自动执行。已配置、Ready、发送 Accepted 与手机收到分别验证；cron 通知保留原冻结目标，Unknown 不自动重发。源码或本地 focused 测试不能代替原生 GUI、真实平台与手机验收。

渠道停止或重连会等待原会话的发送和清理结束，旧会话后续片段不会转投新会话。停止前已在途的原发送可能取得 Accepted，仍归原会话记录。待恢复消息可由用户明确放弃，按原工作空间、消息身份及队列版本校验；普通停止当前 turn 继续保留 IM service，和停止渠道服务分别处理。

## Extension 控制

Skills、Plugins、MCP servers、Hooks 与 Browser 控制使用同一个应用核心权威。Eclip 只消费用户安装到 `~/.eko/skills/` 的独立 Skill、当前项目 `.eko/skills/` 的项目 Skill 与 Plugin generation 提供的 Skill，不再捆绑 catalog、默认启用集、baseline 或 Tauri Skill resource。`enabled-skills.json` version 3 只保存用户 Skill 的 `{enabled}` 选择；项目根到当前工作目录的 `AGENTS.md` 链进入同一 instruction projection。相同名称按项目 Skill、Plugin Skill、用户 Skill 优先。typed receipt 返回 settled 或 degraded，下一次操作、重启或 workspace load 会重新收敛。

portable Plugin component 只解析一次，形成不可变 framework `PreparedPluginSet`。Eclip 捕获精确 workspace target，增加 executable Subagent、scoped monitor、theme 与 output style 产品策略。rollback 使用 prepared generation，不重新读取可能已变化的文件。

插件变更已提交但部分组件未启用时，插件页会刷新实际列表与配置，并提示相关诊断。真正失败、回滚或仅验证不会显示为已提交；切换页面或工作空间后，迟到结果不会覆盖当前内容。

## Memory 与用户工具控制

每个 workspace memory generation 共享一个 `MemoryLayerManager`。成功 mutation 只读取一次 hot memory，并在下一个 model safe point 向 primary、已有 pool Agent 与 future Agent 发布同一个 immutable snapshot。`/reflect`、remember/forget、evidence review、TaskRuntime、Dreaming 和模型工具使用同一 settlement contract。

用户直接设置的工具可见性是独立应用 policy，通过 framework disabled-tools snapshot 发布；它不是 approval mode，也不受 agent 自动执行 permission mode 限制。

工具页按“任务与协作、文件与代码、命令与运行、搜索与浏览、数据与文档、记忆与技能”六组展示。功能分类与来源分别呈现；没有分类或来源信息时明确显示“未分类”或“来源未提供”，不按名称猜来源或权限。

类别开关只操作当前目录中的可选工具；系统必需工具显示锁定原因，直接调用关闭接口也会被后端拒绝。分类和必需标记不扩大只读或允许工具范围。选择只影响后续运行，当前运行保持已捕获的工具快照；批量操作逐项反馈，部分失败会保留，不承诺原子完成或跨重启保存。用户主动打开终端或连接 MCP 继续沿原交互入口处理。

以上内容是经过审阅的源码行为摘要；精确配置、命令与合同仍以 Eclip 仓库为准。
