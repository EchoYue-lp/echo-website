# Echo Website

本仓库展示独立的 echo-agent 框架与 **Eclip /ˈɛk.lɪp/** 本地个人助理。Eclip 读作 **EK-lip**，两个音节；标语为「听见你的声音，让想法飞跃。」

品牌展示沿用 `/eko` 路由，官网、发现索引与文档首页展示新名称和音标。框架镜像与产品投影分别记录其真实来源身份。

## 当前来源与发行边界（2026-11-09）

本次从官网 `7468bc0357e77940d3bda7b5e138cc507fce8564` 继续，使用原 canonical 同步器，
框架镜像绑定干净 main 提交 `3413d64dae23353c6d02c546ac374deded855827`，Eclip 产品投影绑定
干净 main 提交 `233516378c2b3e8e552ee0842cc8001bdfc6c407`。两仓来源已经合入各自 main；
本次重新核对完整实际来源，应用中文 ADR 0055／0062 的后继正文进入原来源清单，
中文产品投影补充 SSH 未知结果与依赖风险说明，其余页面依原范围保持。

框架带入 Exa 搜索及中文 ADR 0110；中文 ADR 依既有规则逐字出现在两种路由，不新增英文翻译。
Exa 沿原 SearchProvider 和 `web_search` 的 limit/cursor 合同工作，标准工具包在构造时按非空
`EXA_API_KEY`、Tavily、Brave、DuckDuckGo 选择，请求失败不换引擎；真实 Exa 服务调用与发布资格另验。
应用仍使用八页产品投影与完整来源摘要，中文页保留右栏内部滚动、消息列表跟随及个人微信脱敏诊断，
并链接原应用 ADR 0055／0056／0062。SSH 停止等待不证明后代结束；本次精确接受的五项既有风险仍未修复。
历史英文页面保持，不另建应用 ADR 全文镜像。精确镜像清单、实际数量及摘要由 `docs-sync-manifest.json` 记录。

此次同步仅声明源码投影与随后实际执行的站点检查；当前真实手机无回复尚未确认根因或修复，
脱敏日志、Ready 与发送 Accepted 都不证明手机收件。两仓依赖门禁与精确风险绑定、精确 main CI、
原生综合包及真实平台验收继续分别记录，不由官网来源推进代替。
网站完整门禁绑定本次最终 main 来源，结果以对应执行回执为准。SDK 的独立 pin 与合同保持其自身权威。
已提交 `6db9cc1` 的 scoped dev-only 依赖修复保持原字节；网站未部署。

下方旧切点与当时验证仅保历史，不作为这些新来源的资格。

## 历史来源与发行边界（2026-11-02）

本次文档同步从官网本地提交 `4badb0c` 继续。原同步器已在 Root 给出的共同 clean 窗口自然退出0，
Framework 镜像绑定 `a8a8511d9ec2cd3da382bd5f7b151ac537374aa8`，Eclip 产品来源绑定
`20070d3f7171a95926bdd5c8153f5f382767fea2`。322份镜像中7份正文更新，148份产品来源的实际摘要变化以本批manifest为准；
8份产品页仅中文快速开始变化，其余7页保持。中文ADR按原镜像规则同时进入两种路由，不新增英文译文。
最初合法WIP导致的 clean-source guard 退出1与其原件保留，不由后继成功覆盖。
本批上述具名本地切点的派生检查、原完整 `npm run verify`、独审和正常task Source／Final已通过；
原格式失败和e2e过期链接断言失败保留，后继通过不覆盖原件。`globalClosure`仍为`not_checked`，
远端main、SDK正式原生主线、App／自动Cron和发布部署资格继续分列，后续上游修改不自动进入本站。

| 对象      | 当前源码／版本                                                 | 已有资格与未完成边界                                                                                                                                                                                                                                                                                                      |
| --------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework | 本批a8a8511／crate声明0.2.0                                    | 真实双父1376＋f568，本地静态／Runtime3／格式及task Source／Final按原范围成立；文件名修复原67项focused保原切点。[PR201精确七项CI](https://github.com/EchoYue-lp/echo-agent/actions/runs/41294793482)只覆盖mainf568的Stage0，不覆盖a8a后继或完整矩阵。正常registry包不继承消费根patch，现Zstd补丁不能据此宣称可直接发布。   |
| Eclip     | 本批20070d3／Eclip1.0.0／`com.eko.desktop`                     | 承接指南、工具页、侧栏与b04 Hook恢复；R03新增真实进度测试及原精风险绑定，normal1P／owner3按预期与task Source／Final限其原范围。原前端945P／4既有opt-in未跑与类型／构建资格仍按对应输入；它们不等Tauri实际操作。旧微信／手动cron人工结果不续给本批源码；新自动cron、最终GUI／SSH／恢复组合及Intel／Windows安装运行仍待验。 |
| SDK       | 正式本地83ae／pin340／accepted5344／routes430；源码包声明0.1.0 | 36测试根修复本身只有PY7／Node16及静态、task Source／Final资格，之后完整语言结果仍须绑定其准确切点。SDK [main747／PR15九项CI](https://github.com/EchoYue-lp/echo-agent-sdk/actions/runs/41327296993)是独立消费者退役阶段，pin008／5352／431；当前原生合流候选八项focused不等最终接收／完整门禁通过。                       |
| 官网      | package声明0.0.0／private                                      | 本次只是源码投影；旧站点测试／build仅保原输入资格。当前快照的检查、完整构建及部署分别验收，尚未部署。                                                                                                                                                                                                                     |

Framework八个crate的正常package与独立registry消费仍是发行前置；SDK保持source-only、
Rust `publish=false`／TypeScript `private=true`，本地tgz／wheel／sdist／JAR准备不等上传。
Eclip的macOS `.app`／`.dmg`、Linux `.deb`／`.AppImage`、Windows MSI／NSIS只是上游声明的打包格式，
不是已发布平台清单；最终版本、CPU、分发签名／公证、包SHA与安装启动恢复须逐项验收。
本次不执行包上传、Release或网站部署，也不把未验平台写成已支持的发行产物。

Issue／Finding沿2026-11-01已核增量：101 Issue（94 closed／7 open），203 Finding
（195 resolved／6 open／2 risk_accepted），不是本次fresh读取或195项行为重测。
当次仍open的 #10、#32–35、#188、#189保原状态；局部source／focused／main CI不自动关闭它们。
旧ZIP当前未撤回的观察不代表风险接受或撤换现有修复；本次不修改风险策略或正式状态。

独立SDK的[源码入口](https://github.com/EchoYue-lp/echo-agent-sdk/tree/main/sdks)、
[TypeScript示例](https://github.com/EchoYue-lp/echo-agent-sdk/tree/main/sdks/typescript/examples)、
[Python示例](https://github.com/EchoYue-lp/echo-agent-sdk/tree/main/sdks/python/examples)和
[Java Example](https://github.com/EchoYue-lp/echo-agent-sdk/blob/main/sdks/java/src/main/java/com/echoagent/sdk/Example.java)
继续由SDK维护并纳入其原编译／完整语言入口；官网不复制合同或生成另一套SDK示例。
这些链接跟随上游main，不能把其中例子当作本地原生后继的执行回执。
源码包自包含合同 `docs/sdk/source-packages.md` 当前只在本地83ae保存，尚未进入main747；
待正式主线接纳后再提供相应公开链接，不以本地文件存在冒充远端已发布。

SDK接收根的215个历史引用仍依赖本地formal83 Git对象，已有远端heads／tags未包含该来源，公开可取前置仍未闭合。
当前两项外部工具合同缺口继续单列：canonical删除预检接口缺口，以及installed repository Source传task摘要、
要求`after=task:…`而与真实source摘要冲突。独立strict0不替正常repository Source／Final；
这些缺口不由官网修工具、schema、ignore或重写历史epoch，也不把SDK源码／八项focused冒原生主线交付。

Hook后继只补事件目录读取错误、显式重新加载与迟到隔离，仍属既有Hooks能力，不新增产品API；
官网能力页没有相反的错误恢复承诺，因此本批不为该内部接缝另写产品例子。R03只新增测试及原policy／风险决定绑定，
不改变公开产品行为，中文页的60秒安全点与实际结算边界继续保持；具体指南和验证仍由应用仓库拥有。

## 既有产品来源记录

2026-11-01 产品来源：在 clean `61d3ee31` 的文档复审上，已核对到
`5132d6b63537892185a3ac48de2e66a9b9366731` 的 Scheduler 原 Run 历史导航与本次会话载入结果修复。
现有8页正文保持，包括插件变更已提交但伴组件诊断时的刷新与提示。
再由原同步器正常生成 `reviewedRevision`、148 项 `sourceFiles`（79中文、69历史英文）及页面摘要。
状态为 `source-reviewed-with-execution-limitations`。现存四个英文产品页明确标为历史参考并链接当前中文；
不新增英文副本，也不把历史英文声明为当前中文的同步译文。旧 `1a3551a0…`／138项审阅身份和原失败保留在Git与原日志。

原6c0本地提交承接的8项Rust、3项前端、后继Source和具名功能链组合保留原资格；风险原controls8及两次fresh
scanner自然1／精确gate0分别保留。它们均只按原task／globalClosure未检查范围成立，官网不重跑或合并为全链路票，
也不代替新版App、手机、SSH、quiet／性能、SDK正式pin、main CI、包发布或网站部署。

2026-10-27 的中文产品页纠正普通 Steer／Goal 文案，并同步已提交首页与聊天呈现。依据是应用提交 `0ebd8984be26affc32a130df7a26b128494d6c65` 中 `docs/zh/adr/0037-unified-turn-run-binding.md`、`docs/zh/adr/0048-context-compression-product-policy.md`、`docs/zh/architecture/runtime.md`、`docs/zh/features.md` 与 `docs/zh/getting-started.md`。普通 Steer 交主模型结合历史理解，已有 Goal 仅用户显式修改或结束；原生消息和后继完整原文恢复保留各自未完成验收。

当时 `docs-sync-manifest.json` 保留旧完整应用审阅的 `reviewedRevision` 与 `sourceFiles`，只刷新中文投影摘要，状态为 `policy-correction-pending-source-review`。后继退役纠正使用 `source-correction-pending-source-review`；这两次页面纠正均不代表dirty来源通过。它们与原失败作为历史保留；clean A71／6c0／667／6fc／4c2／23f3／61d3／5132及068的复审是前置历史，当时产品来源以具名20070切点和正常生成结果为准；当前来源以本页2026-11-09记录和manifest为准。

官网只负责展示。框架行为以 [`echo-agent`](https://github.com/EchoYue-lp/echo-agent) 为准；
Eclip 产品行为以 [`echo-agent-cli`](https://github.com/EchoYue-lp/echo-agent-cli) 为准。

框架的跨语言SDK产品、协议合同与Host适配由独立的
[`echo-agent-sdk`](https://github.com/EchoYue-lp/echo-agent-sdk)仓库维护；
官网链接其权威文档与示例，不复制合同或实现。

## Requirements

- Node.js 22.22.0 (`.nvmrc`)
- npm 10.9.x (`packageManager` and `engines` in `package.json`)
- ShellCheck (deployment script verification)

## Development

```bash
npm ci
npm run dev
```

## Verification

```bash
npm run format:check
npm run lint
npm run shell:check
npm run site:check
npm run docs:check
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`npm run verify` runs the same gate in sequence. CI additionally installs Chromium with its Linux
system dependencies.
CI runs on pushes to `main`; task branches and pull requests must pass the local gate before merge.

## 本轮原生消息文档的同步范围

2026-10-29 切片使用 Framework 已保存的 `684ad1d9d0de9bff57e27e4c04f04232c6af9f1f`
clean Git 来源，沿原同步器生成框架正文、ADR 索引和摘要。Eclip 中文页依据应用
`df405760208fbf88fffd2304d72dd5e00a88902c` 的入口配置、README 和 features 完成最初纠正；
随后以clean A71／6c0完成产品源码复审，本次沿clean 667复核后继差异，并说明独立终端入口已退出；
原生控制工具退役与强制分析退出以 Framework 同源文档和实现为准。
普通 Steer 不自动改写 Goal、不调用独立意图模型的现有说明保持；SDK 正式 pin、完整消费者切换、
真实 App／手机／SSH、完整矩阵、main CI 与发布仍未由本切片验证。该历史切点的Exa尚未纳入官网；2026-11-09后继已从干净整合提交镜像其源码说明，仍不代表真实服务或发行验收。

原生消息、实际工具调用与运行时最终结算的统一路线正在跨仓实现和本地验证。
ThinkTool／FinalAnswerTool 及工具前强制 CoT 的具名退役，只按真实调用链和上游示例编译／审查验收；
官网不解析 Rust 或中文语义，也不因注释、字符串、`rust,ignore` 旧版展示或同名自定义工具中出现这些名字而拒绝同步。

当前 API 使用说明及可执行示例由所属上游验证；官网沿原 clean Git 树／revision／逐文件 SHA
同步正文和 manifest，不直接手补生成镜像或把未提交源标为新发布快照。历史 ADR、迁移说明与合法自定义工具保留原文。

2026-10-30 当前 Framework 镜像已沿原同步器更新至本地 clean 提交
`340993201cc937fc8e4783b66be399ef9f14e3d5`：322 份镜像中更新34份既有文稿，新增ADR0103–0105的6份路由镜像。
本次带入原生消息／完整源EOF与结算、当前存储格式／恢复、Store安装的Result与来源约束、工具代次及配置说明；
ADR和旧验证段落按上游原文保留，具名历史快照不改绑为新执行票。原24工程、task source／final的本地资格
只取Framework原回执，不代替SDK正式pin、下游消费者、真实native、精确main CI或发布。

此前F-only命令完整保留A71产品投影对象、148项来源及8份页面摘要，没有采用当时EKO脏树。
此前EKO由Root正常保存为clean `6c0bc7879bc2b3b0dd3b7dd086913405cbafe035`，沿原
`--application-revision` 入口推进来源与页面摘要，维持现有8页及Framework 340镜像。完整
`npm run docs:check:source` 同时核对两仓来源。此次复审带入原生消息／确认正文与物理结算分离、
IM错误前有限排空、共享Store装配和当前只读查询边界；测试接缝不增加产品性能承诺。

2026-10-31 后继沿同一原同步器将应用来源推进到 clean `66760c3`。148项来源中只有
`docs/zh/adr/0062-current-five-risk-binding.md` 与 `docs/zh/architecture/performance-baseline.md`
两份摘要变化，现有8页正文、路由与Framework镜像保持。39c的同cut健康投影复用仍以原journal、完整派生值和耐久性为约束；
667的性能runner／report来源修复及局部Run1000结果保留各自真实执行时点，不在官网发布局部数值、速度比或性能保证。
原风险合同及fresh门禁仍按具名来源成立，来源同步不授予未来输入、native paint、安装或发行资格。

2026-11-01 后继沿原同步器将应用来源推进到 clean `6fc282f9`。148项来源仅
`docs/zh/architecture/runtime.md` 摘要变化。中文本地数据页将原“无 plan conversation run 不进入任务 UI”收窄为普通 GUI 轻量回合，
明确 IM／cron 的原 Run 即使没有 plan 也进入最近任务与历史；其余7页正文与历史英文资格保持。
本次核对 IM／cron 的原 Run 纳入最近任务与历史、续接根身份和真实 surface 结果，以及内部诊断保留在 journal、手机不逐条接收的边界；
状态仍由原 TaskRun 与 typed Terminal 决定，没有新增 Framework／SDK API 或第二历史 store。
应用原相关 Rust 组329通过、6项原性能ignore；完整前端891通过、4项原skip并保留真实runner参数；
应用 task Source／final 为0、globalClosure未检查，官方风险scanner自然1与独立精确gate0分别保留。
这些结果均按各自来源与范围成立，未重跑或合并为全链路票；该切片验收时6fc的新App仍待构建，原667 App不取得其原生验收资格。

此前4c2后继只补充插件页的实际可见行为：已提交的变更伴随组件诊断时，刷新实际列表与配置并保留诊断；
真正失败、回滚或仅验证不被显示为已提交，迟到结果不覆盖新页面或工作空间。148项来源仅中文runtime摘要变化，
原同步器将精确来源与该中文能力页摘要一起生成，其他7页与历史英文保持。所属应用的新源31项focused、
901项完整前端通过／4项原skip、默认build和正常task Source／final各按原回执成立，不由官网重跑或扩大。
本次没有改变Framework／SDK API、权限或发行平台；新App、真实插件操作、native、main CI与发布资格仍独立，网站未部署。

此前23f3后继仅更新中文 `docs/zh/architecture/performance-baseline.md` 的来源摘要，
148项来源的其他147项及8页正文不变。新增说明限定逐程序来源、080材料识别与纯捕获合同；
性能工具的本地采用不改旧capsule、样本或原执行时点，不增加对外测量、速度比或native完成声明。
站点代码、路由、测试与构建输入保持；其类型、测试和构建结果沿用具名4c2站点切点，本次只重验必要来源与文档。

此前61d3后继仅更新中文 `docs/zh/architecture/runtime.md` 的来源摘要，其他147项来源与8页正文不变。
本次核对 Scheduler 创建的桌面顶层参数命名，以及 REST、嵌套编辑字段和 opaque 历史游标的独立边界；
官网没有这些请求字段的调用示例，不新增产品操作或参数宣传。原9项合同测试、27项相关测试、
910项完整前端通过／4项原skip与默认build、正常task Source／final各按所属应用原回执成立。
原生调用边界使用受控mock，不能据此宣称新App真实IPC、人工创建或运行cron已经通过；这些仍待新构建和具名验收。

本次5132后继仍只更新中文 runtime 来源摘要，其他147项来源与8页正文保持。
本次核对无会话记录的 Failed Run 直接读取原任务历史，以及会话本次载入失败、身份变化或迟到结果时停止后续导航的边界；
不补造会话、计划或成功状态，不重新执行任务。官网原有 IM／cron 历史与状态说明已相符，无新增页面或公开API说明。
原相关158项与完整前端928项通过／4项原skip、类型／默认build及正常task Source／final仅按应用原源码与mock范围成立。
5132来源同步当时用户App仍为61d3，该切片不宣称新App真人历史入口、原生或自动cron验收通过，Framework独立修复也未由该切片提前采用。

仅有中文的原生合同沿原 Markdown 来源回链访问，不为形式新建英文副本；本地源码审阅不授已发布资格。
assistant phase、reasoning、工具事实、最终发布与 TaskRun／Goal 完成分别验收；本地测试或站点构建不代表真实原生窗口已通过。
SDK 的正式 pin 仍按其独立来源核准，官网不宣称已更新；网站没有部署。

此前中文能力说明沿 A71／F684 来源补充六个工具功能组、可选开关／系统必需限制和长任务安全点进度提醒，
并纠正 A2A／LSP 尚待源码退役的旧措辞。分类不授予执行权限，提醒不承诺固定频率或成功回执。
本次不改变运行时、公共 API、ADR 决策、框架镜像或英文历史页；所属仓库已有正式 ADR 和示例链路继续作为权威，
无需为官网文字补充再新增一份架构或可执行示例。跨仓发行／Issue 与尚未采用来源的差异在本线工程材料中分别对账。

## Documentation synchronization

Framework documentation with matching English and Chinese source paths is vendored from
`echo-agent` and loaded on demand. Language-specific contributor material stays on the authoritative
framework repository instead of producing a false bilingual route. Every copied file, source path,
source revision, and SHA-256 digest is recorded in `docs-sync-manifest.json`.

CI deliberately checks out both `echo-agent/main` and `echo-agent-cli/main` in separate paths and
runs the source-aware drift check. A framework documentation change or Eclip application change
therefore fails the website gate until the snapshot or reviewed projection is synchronized.

From the normal sibling-repository layout:

```bash
npm run docs:sync
npm run docs:check
npm run docs:check:source
```

The source-aware commands discover both the normal sibling checkout and the repository's external
worktree layout. Set `ECHO_AGENT_ROOT` and `ECHO_AGENT_CLI_ROOT` to use other source checkouts
explicitly.
Framework synchronization preserves the existing application projection metadata. Pass
`--application-revision <sha>` only when advancing the independently reviewed Eclip projection.

框架文档的同步和带来源检查共用同一份固定 HEAD 文档集合：从 Git 树枚举受控 Markdown，保留原双语
配对规则，并逐份核对选定 blob 与工作区字节。被忽略或未提交的候选不属于该修订的发布来源；
清单漏掉受控文档、混入树外文件或来源 HEAD 漂移都会失败。站点自身的全部 Markdown 仍须纳入
manifest 检查，不能通过同时删掉清单项和镜像文件掩盖遗漏。

未传 `--application-revision` 时，仅同步框架，完整保留既有 Eclip 投影对象（包含原审查修订、
状态、权威、`sourceFiles` 和投影文件摘要），不读取当前 Eclip 工作区来更新旧资格。可单独执行
`node scripts/sync-docs.mjs --check --framework-root ../echo-agent` 检查框架来源；包含
`--application-root` 的检查仍要求 Eclip 真实来源与既有审查修订一致，不代表重新审查过产品页。

当中文页面需纠正已批准且可核实的产品事实，而完整 Eclip 来源尚未复审时，显式执行：

```bash
node scripts/sync-docs.mjs --framework-root ../echo-agent --refresh-application-projection
```

该模式复用原生成器，仅刷新现有产品页面摘要并固定标记
`source-correction-pending-source-review`；完整保留原 `reviewedRevision`、`sourceFiles`
和来源权威，不读取活跃 Eclip 源树，也不能与产品修订、审阅状态或权威变更参数混用。
默认同步行为不变。完整来源复审仍须沿原 `--application-revision`、clean-source 与 parity 门禁；
内部 `docs:check` 通过不表示当前 Eclip source-aware 检查通过。

Eclip 精简页的当前审阅状态以 manifest 的 `applicationProjection.status` 为准。完整来源审阅、
后继政策纠正与尚待实现的能力分别记录；应用仓库继续拥有产品事实，源变化后须重新审阅。

## Routes

- `/` - echo-agent
- `/eko` - Eclip
- `/docs/:slug?` - echo-agent documentation
- `/eko/docs/:slug?` - Eclip documentation
- `/en/...` - English counterpart of every route; Chinese keeps the unprefixed path
- `?lang=en` - legacy links redirect to the corresponding `/en/...` path

`npm run build` prerenders each registered bilingual route to `dist/<route>/index.html`. Every
document contains crawlable body text, route-specific metadata, canonical and hreflang links, and
schema.org data before JavaScript runs. Sitemap, robots, and the auxiliary `llms.txt` files are
generated from the same route and content authority; `npm run site:check` rejects drift.

## Deployment

`deploy.sh` installs locked dependencies, runs the complete verification gate, copies `dist/` to an
immutable release directory, validates required assets, and atomically switches the `current`
symlink. The former target remains available through `previous` for rollback. After a successful
switch, only `RELEASES_TO_KEEP` validated release directories are retained (five by default,
including `current` and `previous`).

By default releases are stored under `/var/www/echo-website`:

```text
/var/www/echo-website/
  current -> releases/<release-id>
  previous -> releases/<previous-release-id>
  releases/
```

Nginx must serve `/var/www/echo-website/current` and enable directory indexes. Every registered
route has a physical HTML file; unknown routes must return the generated `404.html` with status 404
instead of falling back to the homepage:

```nginx
root /var/www/echo-website/current;
index index.html;
error_page 404 /404.html;
location = /404.html {
    internal;
}
location / {
    try_files $uri $uri/ =404;
}
```

The source checkout defaults to the directory containing `deploy.sh`. Override `PROJECT_DIR` or
`DEPLOY_ROOT` when the server layout differs.
