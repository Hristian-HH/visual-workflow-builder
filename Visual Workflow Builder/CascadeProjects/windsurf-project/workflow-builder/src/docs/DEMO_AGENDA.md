# Demo Agenda — Visual Workflow Builder
### LeapXpert Compliance Workflow Prototype
**Duration:** 30 minutes | **Format:** Live walkthrough + Q&A

---

## 1. Opening `[2 min]`

**Value proposition (one sentence)**
> LeapXpert's Visual Workflow Builder lets compliance teams design, validate, and preview enterprise messaging compliance workflows — without writing code, waiting for engineering, or running real data through live systems.

**Who this is for**
Compliance officers, legal operations teams, and product managers at regulated enterprises who need to enforce policies across messaging channels like WhatsApp, WeChat, and Teams — and who currently rely on engineers to translate compliance logic into executable rules.

**The problem it solves**
Today, defining a compliance workflow means writing a ticket, waiting weeks, and validating the result against a live system. This prototype puts the workflow design directly in the hands of the compliance team — they can build, modify, and simulate a policy flow in minutes, then hand a structured JSON definition to engineering for implementation.

---

## 2. Product Walkthrough `[10 min]`

### Step 1 — Orient the audience `[1 min]`
Open the live app: **https://workflow-builder-six-pi.vercel.app**

Point to the three panels:
- **Left** — node palette (your building blocks)
- **Centre** — canvas (where you design the flow)
- **Right** — inspector (where you configure each node)

> "This is the blank canvas. Every workflow starts here. You build by dragging, connecting, and configuring."

---

### Step 2 — Load the WhatsApp DLP template `[1 min]`
Click **Load Example ▾ → WhatsApp DLP Compliance**

> "Here's a real compliance scenario — a WhatsApp message gets flagged by a DLP policy. The system checks for sensitive content, routes it to a manager for approval if positive, and archives the transcript either way. This is the kind of flow a compliance team would define today in a Word document. Here it's visual, structured, and executable."

Point out:
- The **Condition node** with its True (right) and False (bottom) handles
- The **two paths** — one through Manager Approval, one bypassing it

---

### Step 3 — Inspect a node `[1 min]`
Click the **DLP Check** node.

> "Every node is configurable. Here we reference policy DLP-001 at high severity. This maps directly to what a real rule engine would evaluate."

Click the **Manager Approval** node.

> "The approver role and SLA are explicit. 24 hours. If this were in production, the system would escalate automatically if the window lapses."

---

### Step 4 — Validate `[1 min]`
Click **✓ Validate**.

> "Validation checks the structure before anything runs. Is there a start and end? Are all nodes connected? Does every condition have both branches wired up? Are required fields filled in?"

Show the green banner.

> "Green means this workflow is structurally sound and ready to simulate."

---

### Step 5 — Run the simulation `[2 min]`
Click **▶ Run Preview**.

> "Watch the nodes animate in sequence. Each one pulses yellow while processing, then turns green when complete. The log at the bottom timestamps every step — what ran, what policy was evaluated, which branch was taken, who needs to approve."

Let it complete. Point to the log entry for the Condition node.

> "Notice it tells you which branch was taken — TRUE or FALSE. In the real system this is determined by the scan result. Here it's randomised so we can see both paths."

Click **▶ Run Preview** again to show a different branch outcome.

> "Every run is independent. Run it again and you may see the other path."

---

### Step 6 — Stop mid-run `[30 sec]`
Click **▶ Run Preview**, then **⏹ Stop** mid-animation.

> "You can interrupt at any point. The rings clear, the log records where it stopped. This matters in a real demo context — you stay in control."

---

### Step 7 — Load the second template `[1 min]`
Click **Load Example ▾ → Employee Offboarding Data Wipe**

> "Same builder, completely different use case. This is a GDPR Article 17 right-to-erasure flow. When someone leaves the company, we scan their data. If personal data is found, it can't be auto-deleted — it goes to legal counsel with a 72-hour SLA and is held for 7 years. If nothing personal is detected, it auto-archives after 12 months with no human in the loop."

Run the simulation briefly.

---

### Step 8 — Load the third template `[30 sec]`
Click **Load Example ▾ → Financial Transaction Fraud Review**

> "And here's AML — Anti-Money Laundering. High risk score triggers a 4-hour senior compliance approval window. Low risk auto-clears. Three industries, three completely different workflows, one builder."

---

### Step 9 — Export and Import `[1 min]`
Click **Export JSON**.

> "This downloads the workflow as a structured JSON definition. Name, nodes, edges, properties — everything engineering needs to implement it."

Click **↺ Reset**, then **Import JSON** and pick the downloaded file.

> "And I can reload it from any exported file. This is the portability story — a compliance team designs the workflow, exports it, and hands it to engineering as a spec, not a Word document."

---

## 3. Key Design Decisions `[5 min]`

### Decision 1 — Blank canvas as the default state
**What:** The app opens empty, not pre-loaded with a template.
**Why:** A blank canvas signals that this is a tool for creating, not just viewing. It puts the user in a builder mindset immediately. Templates are one click away but not imposed — which is the right framing for a product that needs to feel flexible across industries.

### Decision 2 — Simulation branches randomly (50/50)
**What:** Condition nodes pick true or false at random during Run Preview.
**Why:** The alternative was always taking the same branch, which would hide the other path entirely. Random branching lets the audience see both outcomes across two runs, which is a stronger demonstration of the conditional logic than a fixed path would be. It also honestly represents the prototype's scope — we are previewing, not executing.

### Decision 3 — Validation is a manual step, not real-time
**What:** The ✓ Validate button is explicit; it doesn't run on every keystroke.
**Why:** Real-time validation on a graph is expensive and creates visual noise while the user is mid-build. A deliberate validate action puts the user in control and matches the mental model of "I'm done building, now check it" — which mirrors how compliance teams actually work before submitting a workflow for review.

---

## 4. Core Value of the Prototype `[3 min]`

**What this validates**
That compliance teams can express policy logic visually without ambiguity. The node types (Rule Check, Condition, Approval, Archive) map directly to the vocabulary compliance officers already use — they are not abstract programming constructs.

**What risk it reduces**
The biggest risk in a compliance workflow product is the translation layer — the gap between what a compliance officer intends and what an engineer implements. This prototype tests whether that gap can be eliminated by giving compliance teams a direct authoring tool. If they can build the WhatsApp DLP flow themselves in under two minutes, the translation risk is gone.

**Why it matters to compliance teams specifically**
Compliance is time-sensitive and high-stakes. A workflow that routes sensitive messages to the wrong approver, or archives without a legal hold, creates regulatory exposure. Visual design with validation means policy intent is explicit, auditable, and reviewable before anything touches a live system. The Export JSON output is a machine-readable spec — not an ambiguous email thread.

---

## 5. What I Would Build Next `[5 min]`

Prioritised by value to compliance teams:

**1. Real-time policy evaluation engine**
Connect the workflow execution to LeapXpert's existing DLP and AML rule APIs so Run Preview reflects actual policy outcomes rather than random branching. This is the most direct path from prototype to production value.

**2. Workflow versioning and audit trail**
Compliance workflows change over time and every change needs to be auditable. Add named versions, change history, and the ability to diff two workflow versions — essential for regulatory audit responses.

**3. Role-based access and approval routing**
The Approval node currently stores a role name as a string. Wire it to a real directory (LDAP / SSO) so approver lookup, escalation on SLA breach, and out-of-office delegation are handled automatically.

**4. Multi-channel template library**
Extend the template system with 10–15 pre-built workflows covering WeChat, Teams, Telegram, and email — so compliance teams at onboarding can start from a channel-specific baseline rather than a blank canvas.

---

## 6. Q&A Buffer `[5 min]`

**Q: Is this connected to real data?**
No — this is a UX prototype. The simulation is a mock graph walk with no backend. The purpose is to validate the interaction model and the node vocabulary before investing in the real execution engine.

**Q: How long did this take to build?**
The full prototype — canvas, simulation, validation, three templates, export/import, deployment — was built and deployed in a single session. That speed is intentional: the goal was a working, testable artefact as fast as possible, not a production system.

**Q: What happens if someone builds an invalid workflow and runs it?**
The Run Preview button is disabled if there are validation blockers. If someone bypasses validation, the simulation walks as far as it can and stops gracefully when it reaches a dead end — no crash, no data loss.

**Q: Could this scale to more complex workflows — loops, parallel branches, subflows?**
The current architecture supports linear and branching flows. Loops are guarded against by a cycle-detection visited set. Parallel branches and subflows would require extending the node type system and the simulation engine — both are additive changes, not rewrites.

**Q: What does the exported JSON look like — is it a standard format?**
It is a plain JSON object with three keys: `name`, `nodes`, and `edges` — matching the React Flow schema. It is not yet mapped to a production workflow spec (e.g. BPMN), but the structure is clean enough to be the basis for one. Mapping to BPMN 2.0 would be a natural next step before engineering implementation.
