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

---

**Q: Is this connected to real data or a real system?**
No — it's a prototype built to show how the tool would work, not to process real messages or enforce real policies. Think of it like a flight simulator: everything feels realistic, but nobody is actually flying. The goal was to validate whether the concept makes sense before investing in building the engine behind it.

**Q: How long did this take to build?**
The whole thing — canvas, three templates, simulation, validation, export/import, and deployment — was built and shipped in a single session. A prototype's job is to be testable as fast as possible, and a working demo in front of real people teaches you more than weeks of planning on a whiteboard.

**Q: What bugs did you find and how did you handle them?**
Four came up during testing: a crash on load, the inspector showing data for a node that had already been deleted, leftover simulation data leaking into exported files, and the canvas not recentring after loading a template. All four were caught and fixed. Finding your own bugs is part of the job — it means you're actually testing, not just building.

**Q: Why this tech stack?**
It was chosen entirely for speed — React, Vite, and Tailwind are tools that produce clean, maintainable output without slowing you down. None of them are exotic choices, which also matters if this becomes a real product: the next person who touches the codebase won't need to learn anything unfamiliar.

**Q: Why React Flow specifically for the canvas?**
It solves everything you need for an interactive canvas — drag-and-drop, connections, handles, zooming — out of the box. Building that from scratch would have taken weeks and taught us nothing new about the product. For a prototype, the right tool is the one that gets you to testable fastest.

**Q: How would you move this to production — what's missing?**
Three things: a real policy engine that evaluates nodes against live data instead of running randomly, a database so teams can save and version their workflows, and a connection to LeapXpert's existing systems. The front-end is already structured cleanly enough to support all of that without rebuilding from scratch.

**Q: How does the simulation work?**
It walks through the workflow from Start to End, following the connections between nodes. At a decision point it picks a path at random so you can see both possible outcomes across runs. It's intentionally simple — the goal was to make the flow feel real and animated, not to build an actual execution system.

**Q: How would you handle two people editing the same workflow at the same time?**
That's a genuinely hard problem that needs dedicated design time. The approach would be similar to how Google Docs handles it — syncing changes in real time and resolving conflicts when two people edit the same thing simultaneously. It's doable, but it's a separate workstream, not a quick addition.

**Q: How did you decide what to build and what to cut?**
Every feature had to answer a specific question about whether the concept works. Simulation answers "does it feel real enough to evaluate?" Validation answers "can teams catch their own mistakes?" Export answers "can this hand off to engineering cleanly?" Anything that didn't answer a question got cut.

**Q: How would you validate this with real compliance officers?**
Put it in front of three or four of them with a real scenario — "design the workflow for a GDPR data subject request" — and watch without guiding. Not a survey, a working session. You learn more from watching where someone hesitates than from anything they tell you directly.

**Q: How does this compare to tools like Visio or Lucidchart?**
Those tools make diagrams. This makes definitions — and the difference matters. A Visio flowchart has no validation and no machine-readable output; it's documentation that someone still has to interpret. This produces something structured that an engineering team can implement directly.

**Q: What metrics would define success in production?**
Three: how many compliance workflows get built here instead of written as tickets, how many errors get caught before go-live instead of after, and how long it takes to turn a new policy into an enforced rule. If those move in the right direction, the tool is doing its job.

**Q: What would you do differently if you had more time?**
Talk to compliance officers before writing any code. A few conversations upfront would have told me whether the node types matched their vocabulary — which is the most important design question in the whole product. I'd also have designed the export format with an industry standard in mind from the start, to make the handoff to engineering cleaner.

**Q: Walk me through the design decision you're most proud of.**
The blank canvas default — the app opens empty instead of loading a template automatically. It's a small thing, but it changes the entire mental model: you're here to build, not to view. Templates are one click away when you need a starting point, but the empty canvas signals that this is your tool. That kind of framing often gets decided by accident and never questioned — I made it a deliberate choice.
