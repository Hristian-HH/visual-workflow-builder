# Project Context
Visual Workflow Builder prototype for LeapXpert compliance workflows.
Stack: Vite + React + React Flow + Tailwind CSS

## Key conventions
- All workflow state lives in App.jsx (single source of truth)
- Node types: start, rule_check, condition, approval, archive, end
- Simulation is mock only — no real execution

## UX Documentation Requirements
- Every node type must have a tooltip explaining what it does
- Every button in the top bar must have a tooltip
- Every inspector field must have a helper text below it explaining what to enter
- Add a collapsible "How to use" guide panel on the canvas (collapsed by default)

## Prompt Engineering Rules
- Always plan before applying changes
- One step at a time, never combine multiple build steps
- Keep components small and single-purpose
- If unsure, ask before implementing
- After each step, list what was changed and what to verify

## Do not
- Add backend or auth
- Over-engineer — this is a 3-4hr prototype