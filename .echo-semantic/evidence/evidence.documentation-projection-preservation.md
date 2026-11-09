---
schema_version: 1
id: evidence.documentation-projection-preservation
kind: evidence
observed_at: source:9aef4ebf8de3455d25535d5c494c6d0d30fed55e4d1fe2c87eeb0be07d63d804
source_refs:
  - README.md
  - docs/adr/0001-documentation-navigation-projection.md
  - src/docs/registry.ts
  - src/docs/loader.ts
  - src/static-site.tsx
  - scripts/sync-docs.mjs
  - scripts/generate-discovery.mjs
  - src/docs/registry.test.ts
  - docs-sync-manifest.json
  - public/sitemap.xml
  - public/llms.txt
  - public/llms-full.txt
  - src/docs/content/echo-agent/zh/13-chat.md
  - src/docs/content/echo-agent/zh/knowledge/agent-patterns.md
  - src/docs/content/echo-agent/zh/knowledge/skill-system.md
  - src/docs/content/echo-agent/en/13-chat.md
  - src/docs/content/echo-agent/en/knowledge/agent-patterns.md
  - src/docs/content/echo-agent/en/knowledge/skill-system.md
supports:
  - asset.documentation-projection
limitations:
  - 只证明本次文档导航/投影及列明的数据保全，不授全仓/上游clean/发布资格。
  - 导航分类和标题按批准改变；没有将改变的导航语义声明为matched。
  - 旧自然1与本地执行原件仍保留，正文SHA不替代实际执行日志。
---

# 文档导航与生成投影保全证据

## 支持的结论

本次复用既有文档生成权威。newStateAuthority 仅按本轮明确裁决登记为保守文本扫描信号；四个类型名是派生文档中的既有代码示例，不是本次新增产品权威。资产角色为 document，既有边界和决策见 docs/adr/0001-documentation-navigation-projection.md。

实际改变：HomePage 撤下当前 LSP 宣传；registry 将 LSP/A2A 归入历史且保留 slug/filePath。未改变的事实：326 URL 集合相同，318 URL→正文映射相同，四个定义与相应围栏上下文均保留。导航变化没有被标记为行为等价 matched。

## 来源与范围

基准提交：a11744e4157e064817798670cd81c5e6da02777a。当前源码摘要由原 verify_semantic.py 的 source_digest 函数取得，未自建摘要算法。

| 符号          | HEAD 行     | 当前行      | 定义文字                                    |
| ------------- | ----------- | ----------- | ------------------------------------------- |
| AgentState    | 4347,32903  | 4347,32903  | `type AgentState = Arc<Mutex<ReactAgent>>;` |
| SharedState   | 27301,56265 | 26728,55678 | `pub struct SharedState {`                  |
| SkillRegistry | 27966,56930 | 27393,56343 | `pub struct SkillRegistry {`                |
| HookRegistry  | 28022,56986 | 27449,56399 | `pub struct HookRegistry {`                 |

以下每个 URL 的基准/当前正文按相同 trim 后 UTF-8 字节计算 SHA-256，值相同；正文仍取自原 manifest 内的文档源。

| URL                                               | HEAD/当前正文同文 SHA-256                                          | 代码围栏 |
| ------------------------------------------------- | ------------------------------------------------------------------ | -------- |
| https://echo-agent.dev/docs/agent-patterns        | `6c5054eaf7c158691a5b1c3e7d2662d2fc7a1caf75c028d629f0f769a7c6f743` | rust     |
| https://echo-agent.dev/docs/chat                  | `3d0fbe0ead6e338e7b5885308b0f3e261c91ae91b3be064b5b00d693f3546dc3` | rust     |
| https://echo-agent.dev/docs/skill-system-guide    | `055114b04bb20e8f076880d2ba62eefcb7f7f3d4fef4ab270fd7865bfea25a6c` | rust     |
| https://echo-agent.dev/en/docs/agent-patterns     | `9d17c42e264348b557e160e1049549a90abfd2bd8f0971b1102e6b71b725ad0a` | rust     |
| https://echo-agent.dev/en/docs/chat               | `874d10bb4abaf9b98cf8da4735d3cd6804395194eab1f3306fc39de3424a53c2` | rust     |
| https://echo-agent.dev/en/docs/skill-system-guide | `ff08db12f30822e531e67fb8485d92ab6347b44d380ab7ae72a5415896e2753d` | rust     |

生成全文文件整体 SHA 不相同，因为文档块重排和导航文字按批准变化：

- HEAD public/llms-full.txt：`fcd7891b7085579b6c118419d87519d4664742c4d171c13be64f29ad48f9694e`。
- 当前 public/llms-full.txt：`a4966060a1d6279e59a682b1e6fd8f1784275ae003e23652916209c41ec00ce4`。

六个实际文档源在 HEAD 与当前逐文件 SHA 相同：

- `src/docs/content/echo-agent/zh/13-chat.md`：`0570c67adb16e0f766b89fd1aed74a9a69be9e895fc47c5c892319fd4fb212e9`。
- `src/docs/content/echo-agent/zh/knowledge/agent-patterns.md`：`bdd9d567e65d916dcab379f8e2d84f5dde3fc7a1b12384a5617bbb45d9719fbf`。
- `src/docs/content/echo-agent/zh/knowledge/skill-system.md`：`21b89c3452eeab0619979753f92c37e1d69e1c21cf5c5114cd21deb257493ae4`。
- `src/docs/content/echo-agent/en/13-chat.md`：`8c5de53bd5bfee9a99788507314a14bd1737e0e5b74ea465aa23c1c68aa9cc45`。
- `src/docs/content/echo-agent/en/knowledge/agent-patterns.md`：`fd6d52198bf5bf4d5421837fc487dfc3fe2faa381970c7810914222dffcad229`。
- `src/docs/content/echo-agent/en/knowledge/skill-system.md`：`a173c2ba94a29f32292a3aa968b653bad9dc74c5a70b349f32950af54fb3b752`。

原 registry 7 项、formatter、eslint、类型、docs 内部一致性、site 的 326 路由检查及 diff 检查已真实通过。初始 site 自然1由原 discovery:sync 同步派生数据后重跑0；初始 source 自然1和其错误不删除。本轮增加治理材料后仍须对最终快照重跑 normal record/check、原 source task 和显式完成验证，不能凭本 Evidence 先声明这些后继命令成功。

执行原件位于本工作区 `.echo-semantic/local/website-retirement-navigation-20261028/`，含 run 元数据与 stdout/stderr；四定义原文、URL/围栏、HEAD/当前完整文件及实际移动 diff 在其 `semantic-four-symbols-proof/`。这些路径只作为本地原件说明，不充当 source_refs 或长期资产。对应 Source0 仅按真实后继回执记录。

## 已知缺口

任务范围不包含上游镜像 fresh clean、EKO7未采用稿、新SDKpin、全站 Source/生产发布或 native 运行时验收。没有删除四定义所在派生文件，没有增加 exclude 或修改 checker/schema；也没有以普通文档替代运行时消费者证据。所有历史失败继续保留，本 Evidence 是普通观察与保全记录，不是全行为等价证明。
