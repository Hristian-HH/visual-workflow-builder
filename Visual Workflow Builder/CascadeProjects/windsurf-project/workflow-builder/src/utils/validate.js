/**
 * Validates a workflow graph and returns structured results.
 * @param {Array} nodes - React Flow node objects
 * @param {Array} edges - React Flow edge objects
 * @returns {{ valid: boolean, blockers: string[], warnings: string[] }}
 */
export function validateWorkflow(nodes, edges) {
  const blockers = [];
  const warnings = [];

  // ── Blocker 1: exactly one Start node ──────────────────────────────────────
  const startCount = nodes.filter((n) => n.type === 'start').length;
  if (startCount !== 1) {
    blockers.push('Workflow must have exactly one Start node');
  }

  // ── Blocker 2: at least one End node ──────────────────────────────────────
  const endCount = nodes.filter((n) => n.type === 'end').length;
  if (endCount === 0) {
    blockers.push('Workflow must have at least one End node');
  }

  // ── Blocker 3: every node must appear in at least one edge ────────────────
  const connectedIds = new Set(edges.flatMap((e) => [e.source, e.target]));
  for (const node of nodes) {
    if (!connectedIds.has(node.id)) {
      blockers.push(`Node '${node.data.label}' is not connected to the workflow`);
    }
  }

  // ── Blocker 4: condition nodes need both true and false outgoing edges ─────
  const conditionNodes = nodes.filter((n) => n.type === 'condition');
  for (const node of conditionNodes) {
    const outgoing = edges.filter((e) => e.source === node.id);
    const hasTrue  = outgoing.some((e) => e.sourceHandle === 'true'  || e.label === 'true');
    const hasFalse = outgoing.some((e) => e.sourceHandle === 'false' || e.label === 'false');
    if (!hasTrue || !hasFalse) {
      blockers.push(
        `Condition '${node.data.label}' must have both true and false branches connected`,
      );
    }
  }

  // ── Warning 5: rule_check missing policy_name ──────────────────────────────
  for (const node of nodes.filter((n) => n.type === 'rule_check')) {
    if (!node.data.properties?.policy_name) {
      warnings.push(`Policy name not set on '${node.data.label}'`);
    }
  }

  // ── Warning 6: approval missing approver_role ──────────────────────────────
  for (const node of nodes.filter((n) => n.type === 'approval')) {
    if (!node.data.properties?.approver_role) {
      warnings.push(`Approver role not set on '${node.data.label}'`);
    }
  }

  // ── Warning 7: archive retention_days missing or 0 ────────────────────────
  for (const node of nodes.filter((n) => n.type === 'archive')) {
    const days = node.data.properties?.retention_days;
    if (!days || Number(days) <= 0) {
      warnings.push(`Retention days should be greater than 0 on '${node.data.label}'`);
    }
  }

  return { valid: blockers.length === 0, blockers, warnings };
}
