# Visual Workflow Builder

A prototype drag-and-drop workflow builder for LeapXpert compliance workflows.

**Stack:** Vite · React · React Flow · Tailwind CSS

---

## Features

- **Visual canvas** — drag nodes from the palette, connect them by drawing edges
- **6 node types** — Start, Rule Check, Condition, Approval, Archive, End
- **Inspector panel** — click any node to edit its label and properties
- **Validation** — checks for structural errors (disconnected nodes, missing branches) and field warnings
- **Run Preview simulation** — animated graph walk with per-node status rings and a timestamped log
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
    │   ├── Inspector.jsx       # Right-panel property editor
    │   └── HelpPanel.jsx       # Collapsible canvas help guide
    ├── data/
    │   └── defaultTemplate.js  # Pre-built WhatsApp DLP compliance workflow
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
