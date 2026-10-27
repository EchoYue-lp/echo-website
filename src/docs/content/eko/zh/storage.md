# Eclip 本地数据

Eclip 面向用户自己的机器，产品层使用普通文件或内存保存状态，不启用 SQLite。framework 为其它消费者提供的 Store 实现是独立问题。

## 数据职责

- `FileConversationStore` 保存用户可见 conversation history；`FileRuntimeStateStore` 保存 framework Agent checkpoint。两者都不拥有 Task graph。
- TaskRuntime `events.jsonl` 是 turn-run Goal、用户中途约束与正式任务执行状态的事实权威；`checkpoint.json`、`plan.json`、`run-state.json` 以及有界 artifact/review history segment 都是可重建投影或索引。
- Task journal 保留 canonical 执行事实，包括中断请求以及结果缺省与显式 null 的区别。原 owner 的未结算 intent 跨重启保留，阻止该 run 重复执行，同时允许恢复其它无关 run。
- 已确认物理执行完成但结算保存失败时，由同一 owner 仅重试结算持久化与确认，不重新运行 Agent 或工具；资源保留到匹配的完成事实获得持久确认。
- 每个 store-backed turn 都急切绑定 TaskRun。typed execution provenance 区分内部 conversation turn 与 orchestrated run；无 plan conversation run 保留 journal，但不进入任务 UI。
- 普通 chat 同时使用独立 `ChatEventLog` 保存输入输出交付与 surface 重放。它和 TaskRuntime journal 可以关联同一 turn，但互不替代。
- 输入的持久接收、目标 TaskRun 绑定、进入上下文和执行/完成是不同事实。两份原 journal 不被描述为一个事务；durability 未确认时不冒已准入或重新投向另一个目标。
- journal 保存完整 user steer，当前活动投影有界保留最近四条短文或 400 字符预览与完整 SHA 引用。长原文制品可从 journal 重建，但这不等于完整的持续有效要求模型已经闭合。
- 每个 workspace 拥有本地 memory Store、一个 generation-bound `MemoryLayerManager` 和一个在 model safe point 消费的 immutable hot-memory projection。
- `enabled-skills.json` 是用户 Skill 启用状态的唯一持久事实，version 3 只保存 `{enabled}` flat map 并原子写入；当前项目 `.eko/skills/` 的项目 Skill 不写入该文件。Eclip 不再捆绑 Skill、生成默认启用集或注入 baseline，运行时 reconcile 只返回即时 target receipt，不保留 generation 或 repair debt。
- artifact 与 trace 保持 workspace scope；trace 只用于诊断，不能判定 TaskRun 或 PlanTask 是否已提交。
- GUI、IM 与 cron 通过同一应用核心访问这些权威；待退役的旧独立入口不新增另一套状态权威。

默认产品数据根目录是 `~/.eko/`，可以用 `EKO_DATA_DIR` 覆盖。每个工作空间的 conversation、task、memory、artifact 与 trace 留在本机产品数据目录。

工作空间的项目代码位置可以是已有本地目录、新建目录或 SSH 远程目录。原 Workspace manifest 记录项目位置和验证后的执行身份；本机 `Workspace.root` 产品数据不是远端命令的工作目录。文件、Git/worktree 与 Agent 执行使用同一已捕获项目目标，不能因界面切换自动改投；未知写入也不能当作从未发生后重放。

本页是官网投影，不是 storage schema。Eclip persistence 文档与源码仓库仍是权威。
