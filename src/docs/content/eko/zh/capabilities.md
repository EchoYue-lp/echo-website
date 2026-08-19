# EKO 能力边界

EKO 是基于 `echo-agent` 构建的本地个人 AI 助理。本页能力均对应应用核心中的生产绑定，但不构成性能承诺：结果与持续时长取决于模型配置、工具、来源可用性和本机环境。

## Coding

编码 Profile 绑定文件操作、交互式 Shell、Git、LSP 导航与诊断、隔离 Worktree，以及边界明确的 Subagent 运行。这些是本地开发工具和任务运行时能力，不是远程编码服务。

## Data analysis

数据 Profile 使用独立的数据工作空间和 Polars 工具。分析运行会保留可审阅的 Python 或 R 脚本、清单与产物，使输入、变换和输出都可以检查。

## Academic research

学术研究绑定包括 arXiv 与 Semantic Scholar 检索、Zotero 集成，以及保留来源和证据的研究工作空间。研究连接器进入同一应用核心工作流，官网不复制一套研究运行时。

## Biomedical literature research

生物医学研究 Profile 可以检索 PubMed 与 Europe PMC，并整理生物医学实体和来源记录以支持文献综合。它只面向医学文献研究，不用于诊断、治疗建议或临床决策。

## Long-horizon tasks

`TaskRuntime`、检查点、暂停与恢复、执行预算和调度支持设计为持续数小时到数十小时的工作。运行时保留可检查的状态和续跑点，但不承诺固定完成时间或成功率。

## Local application core

TUI、GUI、CLI 与渠道适配器使用共享应用核心，各界面能力对等是产品契约。会话与运行时状态使用用户机器上的文件或内存存储；EKO 不需要 SQLite。
