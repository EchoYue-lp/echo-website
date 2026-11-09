---
schema_version: 1
id: asset.documentation-projection
kind: asset
title: 文档导航与派生发现文件
asset_type: document
status: active
risk: high
observed_at: source:9aef4ebf8de3455d25535d5c494c6d0d30fed55e4d1fe2c87eeb0be07d63d804
boundary_refs: []
code_refs:
  - README.md
  - docs/adr/0001-documentation-navigation-projection.md
  - src/docs/registry.ts#frameworkDocCategories
  - src/static-site.tsx#discoveryArtifacts
  - scripts/sync-docs.mjs
  - scripts/generate-discovery.mjs
  - docs-sync-manifest.json
consumer_refs:
  - src/docs/loader.ts#loadDocContent
  - src/docs/registry.test.ts
  - scripts/check-site.mjs
  - public/sitemap.xml
  - public/llms.txt
  - public/llms-full.txt
behavior_refs: []
rule_refs: []
evidence_refs:
  - evidence.documentation-projection-preservation
finding_refs: []
---

# 文档导航与派生发现文件

## 资产身份

本对象描述现有官网文档资产及生成关系，asset_type 为 document。high 是保守扫描和治理复核风险，不表示新增产品状态权威。这里没有 State/Store 运行时实现，也不引入第二套文档生成状态。

## 来源与消费者

README 的同步与路由说明、registry 的分类/slug、原 sync 脚本和 docs-sync-manifest.json 继续拥有来源；discoveryArtifacts 与 generate-discovery 继续拥有 public 派生输出。loader、registry 回归测试及 check-site 是实际消费者与验证入口。

## 生命周期

按真实 Git 来源同步或人工审阅产品投影后，由既有生成器输出发现文件并运行检查。本次只调整宣传/历史分类，未推进来源 manifest、上游 clean 资格或 EKO 后继手工投影。由原拥有者变更源文件、重新生成与验证；本对象只保存治理引用。

## 候选关系

已搜索网站正式 README 与当前 .echo-semantic：此前没有可复用的正式 Asset/Map。复用既有 registry、loader、sync 和 discovery 实现，建立本资产描述；不创建全仓 Baseline 或新的运行时边界。

## 未知与限制

仅覆盖本次导航与生成投影；不声称已审当前上游运行时、完整跨仓发布或 SDK pin。当前源码身份绑定 observed_at，执行结果与原件位置见保全 Evidence。
