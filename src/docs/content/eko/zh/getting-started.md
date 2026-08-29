# EKO 快速开始

本页是经过审阅的快速开始投影；精确配置、构建与打包行为以 EKO 仓库长期维护的文档为准。

## 前置条件

- Rust 1.95 或更高版本
- 至少一个已配置的 LLM provider 与 model
- GUI 开发需要 Node.js `^20.19.0 || ^22.13.0 || >=24.0.0`、Tauri 2 系统依赖与 Tauri CLI；TUI 和 JSONL 不需要 Node.js

## 克隆仓库

```bash
git clone https://github.com/EchoYue-lp/echo-agent-cli.git
cd echo-agent-cli
cargo fetch
```

TUI/CLI 用户可以配置 `./eko.yaml` 或 `~/.eko/config.yaml`；GUI 用户可以在设置中配置 provider 与 model。API key 应放在配置引用的环境变量中，不要把 secret 写进配置文件。

## 启动 TUI

```bash
cargo run --bin echo-agent-cli
```

常用 runtime selector 包括 `--project /path/to/project`、`--model <provider:model>`、`--continue` 与 `--resume <conversation-id>`。

## 启动 GUI

```bash
npm install -g @tauri-apps/cli
cargo gui-dev
```

`cargo gui-dev` 是仓库 `.cargo/config.toml` 中的项目 alias，会启动前端开发服务并以 `gui` feature 运行 `echo-agent-tauri`。

桌面生产包使用 `cargo gui-bundle`；裸 Rust binary 不包含完整 Tauri 前端与平台 bundle。

## 运行 JSONL 自动化

```bash
cargo run --bin echo-agent-cli -- --jsonl "检查当前项目并总结结果"
```

JSONL 把 canonical chat envelope 逐行写到 stdout，日志保留在 stderr 或日志文件。

## 本地数据

EKO 默认使用 `~/.eko/`，可通过 `EKO_DATA_DIR` 覆盖。workspace conversation、TaskRuntime journal、memory、artifact 和 trace 位于对应 workspace 的 `.eko/` 目录。EKO 不启用 SQLite。

更完整的构建、配置与平台打包命令以 [EKO README](https://github.com/EchoYue-lp/echo-agent-cli#readme) 为准。
