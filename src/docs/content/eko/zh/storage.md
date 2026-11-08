# Eclip 本地数据

Eclip 面向用户自己的机器，产品层使用普通文件或内存保存状态，不启用 SQLite。framework 为其它消费者提供的 Store 实现是独立问题。

## 数据职责

- `FileConversationStore` 保存用户可见 conversation history；`FileRuntimeStateStore` 保存 framework Agent checkpoint。两者都不拥有 Task graph。
- TaskRuntime `events.jsonl` 是 turn-run Goal、用户中途约束与正式任务执行状态的事实权威；`checkpoint.json`、`plan.json`、`run-state.json` 以及有界 artifact/review history segment 都是可重建投影或索引。
- Task journal 保留 canonical 执行事实，包括中断请求以及结果缺省与显式 null 的区别。原 owner 的未结算 intent 跨重启保留，阻止该 run 重复执行，同时允许恢复其它无关 run。
- 已确认物理执行完成但结算保存失败时，由同一 owner 仅重试结算持久化与确认，不重新运行 Agent 或工具；资源保留到匹配的完成事实获得持久确认。
- 每个 store-backed turn 都急切绑定 TaskRun。typed execution provenance 区分内部 conversation turn 与 orchestrated run；普通 GUI 的无 plan 轻量回合保留 journal，但不进入任务 UI。IM／cron 的原 Run 即使没有 plan，也进入最近任务与历史，状态仍以原 Run 为准。
- 普通 chat 同时使用独立 `ChatEventLog` 保存输入输出交付与 surface 重放。它和 TaskRuntime journal 可以关联同一 turn，但互不替代。
- 当前格式的消息呈现、已保存公开图表和累计用量按原日志及来源坐标读取，不新增执行状态权威。保存确认后和冷恢复继续读取原事实；来源缺失或冲突时保留正文并提示详情未恢复，不从普通文本推测工具成功或图表。
- 累计用量按实际调用和尝试去重，重复回放不重计，重试或失败中已经报告的消耗仍保留，主链与 Subagent 分列。导入或分叉的历史保留来源，源会话已有用量不作为目标会话的新消耗；缺失报告、价格或速度证据保留未知，统计不冒充金额账单。
- 输入的持久接收、目标 TaskRun 绑定、进入上下文和执行/完成是不同事实。两份原 journal 不被描述为一个事务；durability 未确认时不冒已准入或重新投向另一个目标。
- journal 保存完整 user steer 及来源与投递事实；近期四条短文或 400 字符预览不是完整历史。主模型结合历史理解输入，不另建要求解释器、GoalStore 或强制要求/计划/验收流水线。必要早期原文沿原引用与 `read_artifact` 恢复，canonical Goal 保持自己的 revision/hash；后继完整来源投影与冷重开读取资格仍须独立验证。
- 每个 workspace 拥有本地 memory Store、一个 generation-bound `MemoryLayerManager` 和一个在 model safe point 消费的 immutable hot-memory projection。
- AgentPool 在构建父 Agent、默认继承实例和 Fork 工厂前绑定同一 generation 的 Store；共享 Store 不等于共享可变对话上下文或执行实例，工作区与 Fork 隔离继续保留。
- `enabled-skills.json` 是用户 Skill 启用状态的唯一持久事实，version 3 只保存 `{enabled}` flat map 并原子写入；当前项目 `.eko/skills/` 的项目 Skill 不写入该文件。Eclip 不再捆绑 Skill、生成默认启用集或注入 baseline，运行时 reconcile 只返回即时 target receipt，不保留 generation 或 repair debt。
- artifact 与 trace 保持 workspace scope；trace 只用于诊断，不能判定 TaskRun 或 PlanTask 是否已提交。
- GUI、IM 与 cron 通过同一应用核心访问这些权威。独立 TUI、REPL、CLI/JSONL 产品入口已退出；GUI 内置终端、Agent shell、MCP 与共享恢复继续保留，未新增另一套状态权威。

默认产品数据根目录是 `~/.eko/`，可以用 `EKO_DATA_DIR` 覆盖。每个工作空间的 conversation、task、memory、artifact 与 trace 留在本机产品数据目录。

工作空间的项目代码位置可以是已有本地目录、新建目录或 SSH 远程目录。原 Workspace manifest 记录项目位置和验证后的执行身份；本机 `Workspace.root` 产品数据不是远端命令的工作目录。文件、Git/worktree 与 Agent 执行使用同一已捕获项目目标，不能因界面切换自动改投；未知写入也不能当作从未发生后重放。

本页是官网投影，不是 storage schema。Eclip persistence 文档与源码仓库仍是权威。

当前格式的只读 completion 查询使用同一已校验 journal projection 及其项目绑定；可选派生修复失败保留 degraded 诊断。损坏 journal、异项目绑定和真实耐久性欠账仍沿原边界拒绝，不能把缺失 checkpoint 或缓存当作执行事实。

性能基线继续覆盖会话列表/搜索、任务列表/筛选、journal 冷恢复、完整记忆写入、GUI 列表及工具 schema/结果开销。测量必须绑定同源数据、源码/锁、规模和冷暖条件；准备就绪或被依赖阻塞的分类不算实测。当前没有据此发布性能保证或存储优化收益。
