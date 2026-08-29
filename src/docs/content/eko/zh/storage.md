# EKO 本地数据

EKO 面向用户自己的机器，产品层使用普通文件或内存保存状态，不启用 SQLite。framework 为其它消费者提供的 Store 实现是独立问题。

## 数据职责

- `FileConversationStore` 保存用户可见 conversation history；`FileRuntimeStateStore` 保存 framework Agent checkpoint。两者都不拥有 Task graph。
- TaskRuntime `events.jsonl` 是正式任务事实权威；`checkpoint.json`、`plan.json`、`run-state.json` 以及有界 artifact/review history segment 都是可重建投影或索引。
- 普通 chat 使用独立 `ChatEventLog`，不替代 TaskRuntime journal。
- 每个 workspace 拥有本地 memory Store、一个 generation-bound `MemoryLayerManager` 和一个在 model safe point 消费的 immutable hot-memory projection。
- `enabled-skills.json` 是 durable Skill desired state 与 repair debt 的权威。prepared Plugin generation 与 target receipt 是 runtime publication 事实，不是第二个 desired-state 文件。
- artifact 与 trace 保持 workspace scope；trace 只用于诊断，不能判定 TaskRun 或 PlanTask 是否已提交。
- TUI、GUI、CLI/JSONL 与 channel 通过同一应用核心访问这些权威。

默认产品数据根目录是 `~/.eko/`，可以用 `EKO_DATA_DIR` 覆盖。workspace 自有的 conversation、task、memory、artifact 与 trace 位于 workspace `.eko/` 下。

本页是官网投影，不是 storage schema。EKO persistence 文档与源码仓库仍是权威。
