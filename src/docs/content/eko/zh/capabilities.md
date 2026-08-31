# EKO 能力边界

EKO 是基于 `echo-agent` 构建的本地个人 AI 助理。本页能力均对应应用核心中的生产绑定，但不构成性能承诺：结果与持续时长取决于模型配置、工具、来源可用性和本机环境。

## Coding

编码 Profile 绑定文件操作、交互式 Shell、Git、LSP 导航与诊断、隔离 Worktree，以及边界明确的 Subagent 运行。这些是本地开发工具和任务运行时能力，不是远程编码服务。

## Data analysis

数据 Profile 使用独立的数据工作空间和 Polars 工具。分析运行会保留可审阅的 Python 或 R 脚本、清单与产物，使输入、变换和输出都可以检查。

## Academic research

学术研究绑定包括 arXiv 与 Semantic Scholar 检索、Zotero 集成，以及保留来源和证据的研究工作空间。研究连接器进入同一应用核心工作流，官网不复制一套研究运行时。

## Biomedical literature research

生物医学研究 Profile 可以检索 PubMed 与 Europe PMC，并整理生物医学实体和来源记录以支持文献综合。它只面向医学文献研究，不用于诊断、治疗建议或临床决策。

## Long-horizon tasks

`TaskRuntime`、检查点、暂停与恢复、执行预算和调度支持设计为持续数小时到数十小时的工作。运行时保留可检查的状态和续跑点，但不承诺固定完成时间或成功率。

任务关系只有一个权威：revisioned `TaskRun -> PlanTask -> SubagentRun` graph。framework `TaskStatus` 管执行状态，Plan 是可编辑 artifact，Todo 是只读展示投影。同一 run 内的依赖使用 `PlanRevision.tasks[].depends_on`；EKO 不维护第二套跨 run 依赖图。

## Agent 协作与恢复

六个 model-callable `agent_*` 工具对显式 Conversation 或 Task Subagent target 执行 list、inspect、message、follow-up、wait 与 interrupt。查询在 journal 层有界。cursor identity 可跨 router 或 TaskRuntime reopen 恢复，cold address 会按绑定 workspace 校验，五种 surface 重放同一 typed terminal 事实。

## Subagent prompt 编译

builtin、plugin、direct、planned、fork、teammate、team member 与 primary TaskRuntime invocation 共用唯一 prompt compiler。稳定 system prompt 只包含角色知识、实际注册工具面、typed access/isolation 边界、delegation、语言 policy 与 framework result contract。任务目标、workspace、文件范围、execution checks、acceptance criteria、artifacts、constraints、过滤后的 user/final-assistant 历史和 typed 附件只进入动态 invocation messages。工具可见性与 MCP topology 变化会重新发布稳定 capability profile；invocation allowlist 只输出缩窄 override。

## 确定性 CommandCell watch

`watch_cell` 使用 framework `CommandCellWatcher` retained 一个后台 command、drain byte cursor，并在不派发 model 或 Subagent 的前提下发布 typed terminal truth。EKO 只增加 exact workspace/conversation/root identity、generation 幂等、durable Ready/delivery/ack fact、恢复与共享 surface projection。interrupt watch 不会停止底层 command。

## Local application core

TUI、GUI、CLI/JSONL 与 channel adapter 使用同一个 `ApplicationServices` composition owner。surface 只保留输入、渲染和 host bridge，不各自装配 task、recovery、pool 或 maintenance runtime。会话与运行时状态使用本机文件或内存；EKO 不需要 SQLite。

## Extension 控制

Skills、Plugins、MCP servers、Hooks、LSP 与 Browser 控制从 GUI、TUI、CLI/JSONL 和 channel 进入同一个应用核心权威。Skill 启用状态先提交 durable desired state，再发布到运行时。typed receipt 明确区分 committed、settled 与 degraded；保留的 repair debt 会在重启或 workspace load 后重放，不会被包装成成功。

portable Plugin component 只解析一次，形成不可变 framework `PreparedPluginSet`。EKO 捕获精确 workspace target，只增加 executable Subagent、LSP process、scoped monitor、theme 与 output style 产品策略。rollback 使用 prepared generation，不重新读取可能已变化的文件。

## Memory 与用户工具控制

每个 workspace memory generation 共享一个 `MemoryLayerManager`。成功 mutation 只读取一次 hot memory，并在下一个 model safe point 向 primary、已有 pool Agent 与 future Agent 发布同一个 immutable snapshot。`/reflect`、remember/forget、evidence review、TaskRuntime、Dreaming 和模型工具使用同一 settlement contract。

用户直接设置的工具可见性是独立应用 policy，通过 framework disabled-tools snapshot 发布；它不是 approval mode，也不受 agent 自动执行 permission mode 限制。

以上内容是经过审阅的源码行为摘要；精确配置、命令与合同仍以 EKO 仓库为准。
