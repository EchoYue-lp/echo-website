# Echo Website

本仓库展示独立的 echo-agent 框架与 **Eclip /ˈɛk.lɪp/** 本地个人助理。Eclip 读作 **EK-lip**，两个音节；标语为「听见你的声音，让想法飞跃。」

品牌展示沿用 `/eko` 路由，官网、发现索引与文档首页展示新名称和音标。框架文档镜像保持原审阅身份。

2026-10-27 的中文产品页纠正普通 Steer／Goal 文案，并同步已提交首页与聊天呈现。依据是应用提交 `0ebd8984be26affc32a130df7a26b128494d6c65` 中 `docs/zh/adr/0037-unified-turn-run-binding.md`、`docs/zh/adr/0048-context-compression-product-policy.md`、`docs/zh/architecture/runtime.md`、`docs/zh/features.md` 与 `docs/zh/getting-started.md`。普通 Steer 交主模型结合历史理解，已有 Goal 仅用户显式修改或结束；原生消息和后继完整原文恢复保留各自未完成验收。

`docs-sync-manifest.json` 保留上次完整应用审阅的 `reviewedRevision` 与 `sourceFiles`，本次只刷新中文投影摘要，并把状态明确标为 `policy-correction-pending-source-review`。这表示政策纠正已落入页面，完整来源复审仍待源码稳定；不表示 dirty Framework/EKO 来源检查通过。英文页保留原历史投影，本轮不新增英文副本。实现、正式源、原生窗口、SDK pin、main/CI、包发布与网站部署资格分别核验。

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

原生消息、实际工具调用与运行时最终结算的统一路线正在跨仓实现和本地验证。
ThinkTool／FinalAnswerTool 及工具前强制 CoT 的具名退役，只按真实调用链和上游示例编译／审查验收；
官网不解析 Rust 或中文语义，也不因注释、字符串、`rust,ignore` 旧版展示或同名自定义工具中出现这些名字而拒绝同步。

当前 API 使用说明及可执行示例由所属上游验证；官网沿原 clean Git 树／revision／逐文件 SHA
同步正文和 manifest，不直接手补生成镜像或把未提交源标为新发布快照。历史 ADR、迁移说明与合法自定义工具保留原文。

当前镜像仍绑定 manifest 中的原 Framework 修订；上游新文档尚未形成最终可同步来源，完整 source-aware 检查继续待闭合。
后继仅有中文的原生合同沿原 Markdown 来源回链访问，不为形式新建英文副本；正式来源落定前不授新链接的发布资格。
assistant phase、reasoning、工具事实、最终发布与 TaskRun／Goal 完成分别验收；本地测试或站点构建不代表真实原生窗口已通过。
SDK 的正式 pin 仍按其独立来源核准，官网不宣称已更新；网站没有部署。

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
