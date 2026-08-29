# EKO Getting Started

This page is a reviewed quick-start projection. Use the maintained EKO repository docs as the authority for exact configuration, build, and packaging behavior.

## Prerequisites

- Rust 1.95 or newer
- At least one configured LLM provider and model
- GUI development requires Node.js `^20.19.0 || ^22.13.0 || >=24.0.0`, Tauri 2 system dependencies, and the Tauri CLI; TUI and JSONL usage do not require Node.js

## Clone the repository

```bash
git clone https://github.com/EchoYue-lp/echo-agent-cli.git
cd echo-agent-cli
cargo fetch
```

TUI/CLI users can configure `./eko.yaml` or `~/.eko/config.yaml`; GUI users can configure providers and models in Settings. Keep API keys in environment variables referenced by the configuration rather than writing secrets into the file.

## Launch the TUI

```bash
cargo run --bin echo-agent-cli
```

Useful runtime selectors include `--project /path/to/project`, `--model <provider:model>`, `--continue`, and `--resume <conversation-id>`.

## Launch the GUI

```bash
npm install -g @tauri-apps/cli
cargo gui-dev
```

`cargo gui-dev` is a project alias in `.cargo/config.toml`. It starts the frontend development server and runs `echo-agent-tauri` with the `gui` feature.

For a packaged desktop application, use `cargo gui-bundle`; a bare Rust binary does not include the complete Tauri frontend and platform bundle.

## Run JSONL automation

```bash
cargo run --bin echo-agent-cli -- --jsonl "Inspect this project and summarize the result"
```

JSONL writes canonical chat envelopes to stdout and keeps logs on stderr or in log files.

## Local data

EKO uses `~/.eko/` by default and accepts `EKO_DATA_DIR` as an override. Workspace conversations, TaskRuntime journals, memory, artifacts, and traces live under that workspace's `.eko/` directory. EKO does not enable SQLite.

Use the [EKO README](https://github.com/EchoYue-lp/echo-agent-cli#readme) as the source of truth for complete build, configuration, and platform packaging commands.
