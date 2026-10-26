# EKO Getting Started

This page is a reviewed quick-start projection. Use the maintained EKO repository docs as the authority for exact configuration, build, and packaging behavior.

## Prerequisites

- Rust 1.95 or newer
- At least one configured LLM provider and model
- GUI development requires Node.js `^20.19.0 || ^22.13.0 || >=24.0.0`, Tauri 2 system dependencies, and the Tauri CLI

## Clone the repository

```bash
git clone https://github.com/EchoYue-lp/echo-agent-cli.git
cd echo-agent-cli
cargo fetch
```

Create a provider and model in the GUI, or prepare `./eko.yaml` or
`~/.eko/config.yaml`.

## Launch the GUI

```bash
npm install -g @tauri-apps/cli
cargo gui-dev
```

`cargo gui-dev` is a project alias in `.cargo/config.toml`. It starts the frontend development server and runs `echo-agent-tauri` with the `gui` feature.

For a packaged desktop application, use `cargo gui-bundle`; a bare Rust binary does not include the complete Tauri frontend and platform bundle.

In the GUI, a Workspace is a project. New task opens a conversation draft in
the selected Workspace without creating a directory. Use the Workspace menu
to select an existing local folder, create a folder, or open an SSH device and
remote project directory.

You can add input while a conversation is running. “Received” means the input
has been saved; the unchanged submitted text and attachments clear without
waiting for the model or tools. It does not mean execution or task completion.
Preparation or admission failure preserves the draft, and late results do not
clear a newer draft after navigation or editing. Stop remains a separate action.

EKO is a local personal assistant running on the user's machine. The approved
target has one GUI product entry, with IM messages and cron as retained background
triggers. GUI terminals, Agent shell tools, desktop launch arguments and the
independent SDK Host stdio protocol remain valid capabilities.

The current baseline still contains TUI, REPL, CLI/JSONL and channel adapters.
Their shared services remain authoritative during migration; the old requirement
to keep expanding all console surfaces has been superseded. Removing console
entry points must wait for GUI-owned IM lifecycle, cron and recovery acceptance.
This documentation change does not delete any runtime entry or protocol.

## Local data

EKO uses `~/.eko/` by default and accepts `EKO_DATA_DIR` as an override. User rules, memory, conversations and journals remain local. EKO does not enable SQLite.

Use the [EKO README](https://github.com/EchoYue-lp/echo-agent-cli#readme) as the source of truth for complete build, configuration, and platform packaging commands.
