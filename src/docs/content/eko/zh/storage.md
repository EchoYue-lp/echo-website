# EKO 本地数据

EKO 面向用户自己的机器，产品层使用普通文件或内存保存状态，不启用 SQLite。framework 为其它消费者提供的 Store 实现是独立问题。

## 数据职责

- `FileConversationStore` 保存用户可见 conversation history；`FileRuntimeStateStore` 保存 framework Agent checkpoint。两者都不拥有 Task graph。
- TaskRuntime `events.jsonl` 是 turn-run Goal、用户中途约束与正式任务执行状态的事实权威；`checkpoint.json`、`plan.json`、`run-state.json` 以及有界 artifact/review history segment 都是可重建投影或索引。
- 每个 store-backed turn 都急切绑定 TaskRun。typed execution provenance 区分内部 conversation turn 与 orchestrated run；无 plan conversation run 保留 journal，但不进入任务 UI。
- 普通 chat 同时使用独立 `ChatEventLog` 保存输入输出交付与 surface 重放。它和 TaskRuntime journal 可以关联同一 turn，但互不替代。
- 每个 workspace 拥有本地 memory Store、一个 generation-bound `MemoryLayerManager` 和一个在 model safe point 消费的 immutable hot-memory projection。
- `enabled-skills.json` 是 Skill 启用状态的唯一持久事实，只保存 `{category, enabled, baseline}` flat map 并原子写入；运行时 reconcile 只返回即时 target receipt，不保留 generation 或 repair debt。
- artifact 与 trace 保持 workspace scope；trace 只用于诊断，不能判定 TaskRun 或 PlanTask 是否已提交。
- TUI、GUI、CLI/JSONL 与 channel 通过同一应用核心访问这些权威。

默认产品数据根目录是 `~/.eko/`，可以用 `EKO_DATA_DIR` 覆盖。workspace 自有的 conversation、task、memory、artifact 与 trace 位于 workspace `.eko/` 下。

本页是官网投影，不是 storage schema。EKO persistence 文档与源码仓库仍是权威。
