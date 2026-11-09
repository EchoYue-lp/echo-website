# ADR 0001：文档导航与生成投影的治理边界

## 状态

已确认

## 背景

本记录落实 2026-10-28 本轮明确授权的官网文档治理。README 的 Documentation synchronization 和 Routes 已说明现有权威：`src/docs/registry.ts` 管理分类与 slug 映射，`scripts/sync-docs.mjs` 和 `docs-sync-manifest.json` 记录来源，`src/static-site.tsx` 的 `discoveryArtifacts` 生成发现文件。这里记录已有能力及本次导航调整，不引入新的运行时架构。

本次撤下当前 LSP 宣传，将具名退役的 LSP/A2A 入口归入历史分组，保留原 slug、文件映射和文档正文。原生成器因此重排 `public/sitemap.xml`、`public/llms.txt`、`public/llms-full.txt`。保守文本扫描将其中四个既有代码示例中的类型名识别为状态权威风险信号；这些文本在基准提交 `a11744e4157e064817798670cd81c5e6da02777a` 中已经存在。

## 候选方案

1. 手改派生文件、删除代码示例或缩小校验范围。这样会破坏生成关系或隐去真实变化，不采用。
2. 保持原生成链和全部文档范围，补充正式文档资产与保全证据，保守登记扫描风险信号。采用。
3. 修改外部校验器、schema 或排除规则。属于独立工具合同工作，不在本次项目记录中实施。

## 决策

- 导航、文档来源和派生生成继续分别由上述既有实现负责；正式语义对象只描述它们，不成为第二套生成器或产品状态。
- 资产类型使用 `document`，不登记运行时状态存储。预检升级为 high；`newStateAuthority` 表示本次保守文本扫描信号，不能据此声称新增产品状态权威。
- AgentState、SharedState、SkillRegistry、HookRegistry 的相关定义文本、URL、代码围栏和前后 SHA 在文档投影 Evidence 中逐项记录。这里不对框架仓库当前是否存在同名实现作跨仓断言。
- `public/llms-full.txt` 与全部派生文件仍在任务范围内；使用原 `discovery:sync` 更新，不修改正文避开正则，不补造行为等价的 matched 结果。
- 当前发布来源仍由原同步合同决定。本次任务通过只证明有限的导航与投影治理，不代表上游镜像 clean、EKO 后继稿已采用、新 SDK pin、全站 source 资格或生产发布。

## 影响

实际变化是首页宣传和历史分类，以及其正常派生文件。326 个 URL 的集合、318 个 URL 对应的文档正文和旧入站映射分别校验保留；导航顺序和标题按本次批准变化，不宣称这些导航语义前后相同。

不新增 API、协议、运行时状态、任务执行器、工具、权限或外部发送行为。框架示例和 EKO 运行时不属于本次改动；旧失败、真实日志与不覆盖项继续保留。

## 验证与恢复

验证复用现有 registry 回归测试、格式、lint、类型、docs/site 检查，以及正常 preflight record/check、task source 和显式完成验证。正式 Asset/Evidence 引用真实 registry、同步脚本、生成器、派生文件及文档源；本地产物仅在 Evidence 正文标明原件位置和限制。

需要撤回时，恢复导航源和对应生成结果，再同步调整本记录与语义对象；不改原上游来源身份，也不触碰 native App、用户数据或历史快照。

## 2026-10-29：页面纠正与完整来源复审分开

完整来源尚未复审时，中文页面仍需纠正已批准且能从当前源码核实的入口和控制工具退役事实。
继续手改 manifest 摘要会产生第二个生成入口；直接推进产品修订则会把有限的页面纠正冒作完整审阅。
因此扩展原 `applicationProjection`：仅在显式 `--refresh-application-projection` 时刷新页面摘要，
固定使用 `source-correction-pending-source-review`，保留历史审阅修订、sourceFiles 与权威。
没有历史审阅身份、混用完整审阅参数或 check 模式均拒绝，且在写入 manifest 前失败。

默认 Framework 同步仍完整保留原产品投影。Framework clean Git/blob/revision、产品完整审阅的
clean-source/parity 检查和 source-aware 拒绝逻辑均不变；不引入 schema、第二份 store 或运行时状态。
对应回归覆盖页面摘要、历史身份保留、脏产品来源不被采纳及非法组合不写 manifest。

2026-11-06 补充：单独执行 `--refresh-application-projection` 且不指定框架来源时，仅核验并
保留网站已有框架正文、摘要与来源，刷新产品页摘要并保持待来源复审状态。这样不必为产品
页面纠正重拷含有其它任务 WIP 的框架；显式传入框架来源的完整同步仍保留原 clean-source
门禁。该操作不推进产品 reviewedRevision/sourceFiles，也不代表发布或完整来源验收。

Framework 正文按 clean `684ad1d9…` 同步，中文产品页只更新可核的退役事实，不新增英文产品副本。
旧历史/迁移文档、原生 reasoning、最终运行时通知及自定义同名工具保持其来源语义。
本切片不证明 SDK 新 pin、完整消费者反向状态、App、手机、SSH、完整矩阵或 main CI／发布。
