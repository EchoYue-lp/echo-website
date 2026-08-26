# EKO 快速开始

## 前置条件

- Rust 1.95 或更高版本
- GUI 开发需要 Node.js `^20.19.0 || ^22.13.0 || >=24.0.0` 与 Tauri CLI；只运行 TUI 时不需要 Node.js

## 克隆仓库

```bash
git clone https://github.com/EchoYue-lp/echo-agent-cli.git
cd echo-agent-cli
```

## 启动 TUI

```bash
cargo run --bin echo-agent-cli
```

## 启动 GUI

```bash
npm install -g @tauri-apps/cli
cargo gui-dev
```

`cargo gui-dev` 是仓库 `.cargo/config.toml` 中的项目 alias，会启动前端开发服务并以 `gui` feature 运行 `echo-agent-tauri`。

更完整的构建、配置与平台打包命令以 [EKO README](https://github.com/EchoYue-lp/echo-agent-cli#readme) 为准。
