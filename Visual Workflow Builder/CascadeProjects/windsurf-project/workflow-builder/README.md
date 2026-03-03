# Visual Workflow Builder

A prototype drag-and-drop workflow builder for LeapXpert compliance workflows.

**Live:** https://workflow-builder-six-pi.vercel.app

**Stack:** Vite · React · React Flow · Tailwind CSS

---

## Features

- **Blank canvas** — start from scratch or load any example template
- **6 node types** — Start, Rule Check, Condition, Approval, Archive, End
- **Inspector panel** — click any node to edit its label and properties
- **Node deletion** — delete button in the inspector removes the node and all its connections; Start/End nodes prompt a confirmation first
- **Validation** — checks for structural errors (disconnected nodes, missing branches) and field warnings; clears automatically when the canvas changes
- **Run Preview simulation** — animated graph walk with per-node status rings and a timestamped log
- **Export JSON** — downloads the current workflow as a named `.json` file
- **3 example templates** — load via the **Load Example ▾** dropdown
- **Collapsible help panel** — on-canvas usage guide

## Getting Started

```bash
cd workflow-builder
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (Vite may use a higher port if 5173 is taken).

## Node Types

| Node | Purpose |
|------|---------|
| ▶ Start | Entry point — every workflow needs exactly one |
| 🔍 Rule Check | Evaluates a named policy at a given severity level |
| 🔀 Condition | Branches on true/false; both branches must be connected |
| 👤 Approval | Requests sign-off from a role within an SLA window |
| 📦 Archive | Stores the record with a tag and retention period |
| ⏹ End | Terminates the workflow |

## Example Templates

Load any of these from the **Load Example ▾** dropdown in the top bar:

| Template | Use case | Key policy |
|----------|----------|------------|
| WhatsApp DLP Compliance | Flags sensitive messages, routes to manager approval | DLP-001, high severity |
| Employee Offboarding Data Wipe | GDPR right-to-erasure flow with legal hold path | GDPR-Art17, 72h legal counsel SLA |
| Financial Transaction Fraud Review | AML risk scoring with senior compliance sign-off | AML-CFT-002, 4h SLA |

## Run Preview

Click **▶ Run Preview** in the top bar to step through the workflow automatically (~800 ms per node):

- Each node pulses **yellow** while processing, then turns **green** when done
- Condition branches are resolved randomly (50/50)
- The **Simulation Log** panel at the bottom shows a timestamped entry per node
- Click **⏹ Stop** at any time to halt the run and clear the status rings

Validation errors block the button — run **✓ Validate** first if the button is disabled.

## Project Structure

```
workflow-builder/
└── src/
    ├── App.jsx                 # Root component — all workflow state lives here
    ├── components/
    │   ├── CustomNode.jsx      # Shared node renderer (handles all 6 types)
    │   ├── Inspector.jsx       # Right-panel property editor + delete button
    │   └── HelpPanel.jsx       # Collapsible canvas help guide
    ├── data/
    │   └── templates.js        # All 3 example workflow templates
    ├── docs/
    │   └── nodeDescriptions.js # Tooltip strings for each node type
    └── utils/
        ├── validate.js         # Workflow validation logic
        └── simulate.js         # Graph-walk simulator for Run Preview
```

## Constraints

- No backend — all state is in-memory
- Simulation is mock only; no real policy execution
- Prototype scope: drag, connect, validate, preview
