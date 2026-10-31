# Echo Website

本仓库展示独立的 echo-agent 框架与 **Eclip /ˈɛk.lɪp/** 本地个人助理。Eclip 读作 **EK-lip**，两个音节；标语为「听见你的声音，让想法飞跃。」

品牌展示沿用 `/eko` 路由，官网、发现索引与文档首页展示新名称和音标。框架镜像与产品投影分别记录其真实来源身份。

2026-10-31 当前产品来源：在 clean 应用提交
`6c0bc7879bc2b3b0dd3b7dd086913405cbafe035` 的既有产品复审上，已核对经 `39c28e7` 到
`66760c3f5b950843a7038bc7fd95e48a4850624a` 的实际差异、两份中文来源文档及相关实现，现有8页产品承诺保持。
再由原同步器正常生成 `reviewedRevision`、148 项 `sourceFiles`（79中文、69历史英文）及页面摘要。
状态为 `source-reviewed-with-execution-limitations`。现存四个英文产品页明确标为历史参考并链接当前中文；
不新增英文副本，也不把历史英文声明为当前中文的同步译文。旧 `1a3551a0…`／138项审阅身份和原失败保留在Git与原日志。

原6c0本地提交承接的8项Rust、3项前端、后继Source和具名功能链组合保留原资格；风险原controls8及两次fresh
scanner自然1／精确gate0分别保留。它们均只按原task／globalClosure未检查范围成立，官网不重跑或合并为全链路票，
也不代替新版App、手机、SSH、quiet／性能、SDK正式pin、main CI、包发布或网站部署。

2026-10-27 的中文产品页纠正普通 Steer／Goal 文案，并同步已提交首页与聊天呈现。依据是应用提交 `0ebd8984be26affc32a130df7a26b128494d6c65` 中 `docs/zh/adr/0037-unified-turn-run-binding.md`、`docs/zh/adr/0048-context-compression-product-policy.md`、`docs/zh/architecture/runtime.md`、`docs/zh/features.md` 与 `docs/zh/getting-started.md`。普通 Steer 交主模型结合历史理解，已有 Goal 仅用户显式修改或结束；原生消息和后继完整原文恢复保留各自未完成验收。

当时 `docs-sync-manifest.json` 保留旧完整应用审阅的 `reviewedRevision` 与 `sourceFiles`，只刷新中文投影摘要，状态为 `policy-correction-pending-source-review`。后继退役纠正使用 `source-correction-pending-source-review`；这两次页面纠正均不代表dirty来源通过。它们与原失败作为历史保留；clean A71／6c0 的复审是前置历史，当前产品来源以上述 clean 667 的复审和正常生成结果为准。

官网只负责展示。框架行为以 [`echo-agent`](https://github.com/EchoYue-lp/echo-agent) 为准；
Eclip 产品行为以 [`echo-agent-cli`](https://github.com/EchoYue-lp/echo-agent-cli) 为准。

The framework's cross-language SDK product, protocol contracts, and Host adapters are maintained in
the independent [`echo-agent-sdk`](https://github.com/EchoYue-lp/echo-agent-sdk) repository. This
site links to that repository rather than copying its contract or implementation.

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
真实 App／手机／SSH、完整矩阵、main CI 与发布仍未由本切片验证。Exa 仍是本地未发布工作，不新增官网承诺。

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
