# Demo Cheat Sheet — Visual Workflow Builder

---

**Value prop**
> Compliance teams design, validate, and preview policy workflows — no code, no engineering ticket, no live data.

---

## Demo Steps

1. Open live site — blank canvas, three panels
2. Load Example ▾ → WhatsApp DLP Compliance
3. Click DLP Check — show policy name and severity
4. Click Manager Approval — show role and SLA
5. Click ✓ Validate — green banner, workflow is clean
6. Click ▶ Run Preview — watch nodes animate and log fill
7. Click ⏹ Stop — rings clear, log records the halt
8. Load Offboarding → simulate → load Fraud Review → simulate
9. Export JSON → Reset → Import JSON → simulate again

---

## Design Decisions

- **Blank canvas default** — builder mindset, templates one click away
- **Random condition branches** — shows both paths across two runs
- **Manual validation** — deliberate action, no real-time noise while building

---

## What's Next

1. **Rule engine** — connect to real DLP/AML APIs, replace random branching
2. **Versioning** — named versions, change history, diff view for audit trails
3. **Role routing** — wire Approval node to SSO/LDAP, handle SLA escalation
4. **Template library** — 10–15 channel-specific templates (WeChat, Teams, email)

---

## Q&A

**Real data / real system?**
No backend, no auth, no live evaluation. Purpose: validate the UX model and node vocabulary before building the engine.

**How long to build?**
Full prototype — canvas, simulation, validation, 3 templates, export/import, deployment — in a single session.

**Bugs found?**
Four: hook ordering crash (white screen), ghost inspector on keyboard delete, simulationStatus in export, no fitView on template load. All fixed.

**Why React Flow, not custom canvas?**
Handles, edges, drag-and-drop, zoom — all solved. Custom canvas adds weeks of boilerplate for zero extra learning.

**Production architecture?**
Three additions: real execution engine (connect to DLP/AML APIs), persistence layer (DB + auth + versioning), backend API mapping JSON to rule engine.

**How does the simulation engine work?**
Graph walk from Start — follow edges, resolve conditions randomly, cycle guard via visited Set, returns ordered steps array. ~50 lines.

**Multi-user collaboration?**
CRDT or operational transforms + WebSocket layer + node-level locking. Significant addition, not a rearchitecture.

**vs. Visio / Lucidchart / BPMN editors?**
Those produce diagrams. This produces executable, validated, machine-readable definitions. Domain-specific node types beat generic shapes for compliance teams.

**How to validate with real users?**
Structured sessions with 3–4 compliance officers: give a scenario, observe where they get stuck, iterate on node types before touching the backend.

**What would you do differently?**
User research before writing code. Tests for the simulation engine upfront. JSON schema designed for BPMN compatibility from day one.
