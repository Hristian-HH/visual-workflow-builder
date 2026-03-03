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

**Real data?**
No — mock simulation only. Validates the UX model before building the engine.

**How long to build?**
Full prototype built and deployed in a single session, intentionally.

**Invalid workflow + Run Preview?**
Button blocked by validation errors. If bypassed, simulation stops gracefully.

**Loops / parallel branches?**
Additive changes to the node system and engine — not a rewrite.

**Export format — standard?**
Plain JSON (name, nodes, edges). Maps cleanly to BPMN 2.0 as a next step.
