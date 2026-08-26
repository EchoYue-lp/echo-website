# EKO Getting Started

## Prerequisites

- Rust 1.95 or newer
- GUI development requires Node.js `^20.19.0 || ^22.13.0 || >=24.0.0` and the Tauri CLI; the TUI does not require Node.js

## Clone the repository

```bash
git clone https://github.com/EchoYue-lp/echo-agent-cli.git
cd echo-agent-cli
```

## Launch the TUI

```bash
cargo run --bin echo-agent-cli
```

## Launch the GUI

```bash
npm install -g @tauri-apps/cli
cargo gui-dev
```

`cargo gui-dev` is a project alias in `.cargo/config.toml`. It starts the frontend development server and runs `echo-agent-tauri` with the `gui` feature.

Use the [EKO README](https://github.com/EchoYue-lp/echo-agent-cli#readme) as the source of truth for complete build, configuration, and platform packaging commands.
