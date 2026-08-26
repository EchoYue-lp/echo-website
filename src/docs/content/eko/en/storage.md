# EKO Local Data

EKO runs on the user's own machine. Its product layer stores state in ordinary files or memory and does not require a database service.

## Data responsibilities

- A file-backed `ConversationStore` projects conversation history
- A file-backed `RuntimeStateStore` persists Agent runtime state
- Memory, configuration, and workspace artifacts remain in local directories
- `enabled-skills.json` is the durable Skill desired-state and repair-debt authority
- The TUI, GUI, CLI, and channels access these capabilities through the same application core

The framework can still offer other general Store implementations to independent consumers. EKO's product storage choice does not limit the capability menu of echo-agent.
