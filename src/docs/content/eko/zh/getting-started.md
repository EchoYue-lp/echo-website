# Eclip 快速开始

本页是经过审阅的快速开始投影；精确配置、构建与打包行为以 Eclip 仓库长期维护的文档为准。

## 前置条件

- Rust 1.95 或更高版本
- 至少一个已配置的 LLM provider 与 model
- GUI 开发需要 Node.js `^20.19.0 || ^22.13.0 || >=24.0.0`、Tauri 2 系统依赖与 Tauri CLI

## 克隆仓库

```bash
git clone https://github.com/EchoYue-lp/echo-agent-cli.git
cd echo-agent-cli
cargo fetch
```

在 GUI 设置中配置 provider 与 model，也可以使用 `./eko.yaml` 或 `~/.eko/config.yaml`。API key 应放在配置引用的环境变量中，不要把 secret 写进配置文件。

## 启动 GUI

```bash
npm install -g @tauri-apps/cli
cargo gui-dev
```

`cargo gui-dev` 是仓库 `.cargo/config.toml` 中的项目 alias，会启动前端开发服务并以 `gui` feature 运行 `echo-agent-tauri`。

桌面生产包使用 `cargo gui-bundle`；裸 Rust binary 不包含完整 Tauri 前端与平台 bundle。

## 选择项目与开始任务

工作空间就是项目。通过工作空间菜单选择已有本地文件夹、新建本地文件夹，或填写 SSH 设备和远程项目目录。“新建任务”只在已选工作空间打开会话草稿，不创建项目目录。

SSH 登录、远端目录验证与真实文件/命令执行各有独立结果；终端连通不等于远程项目已经验收。项目代码可以在远端，本机产品数据不会因此迁走。

运行中可以继续输入。“已收到”表示输入已经持久保存，不等待当前模型或工具完成，也不表示纠正已经执行。准备或准入失败会保留原输入；迟到回执不能清掉切换任务或编辑后的新草稿。Stop 是独立操作。

## IM 与定时任务

从侧栏“IM 渠道”独立管理 QQ、飞书与个人微信，定时任务继续使用原管理入口。个人微信使用扫码和必要数字确认，当前范围是单个活动账号、扫码本人私聊文字；渠道 Ready、发送 Accepted 与手机实际收件是不同事实。原生 GUI、真实微信和 SSH 验收不由本页构建命令替代。

独立 TUI、REPL、CLI/JSONL 入口仍保留在迁移期源码中，等待具名退役收口；本页优先介绍 GUI。

## 本地数据

Eclip 默认使用 `~/.eko/`，可通过 `EKO_DATA_DIR` 覆盖。每个工作空间的 conversation、TaskRuntime journal、memory、artifact 和 trace 属于本机产品数据，与本地或远端的项目代码位置分开。Eclip 不启用 SQLite。

更完整的构建、配置与平台打包命令以 [Eclip README](https://github.com/EchoYue-lp/echo-agent-cli#readme) 为准。
