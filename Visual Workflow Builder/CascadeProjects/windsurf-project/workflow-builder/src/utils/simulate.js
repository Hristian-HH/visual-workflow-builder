/**
 * Build an ordered list of simulation steps by walking the graph from the
 * start node.  Condition nodes pick a branch randomly (50/50).
 *
 * @param {import('@xyflow/react').Node[]} nodes
 * @param {import('@xyflow/react').Edge[]} edges
 * @returns {{ nodeId: string, nodeType: string, nodeLabel: string,
 *             properties: object, branchTaken: string|null }[]}
 */
export function buildSimulationSteps(nodes, edges) {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const startNode = nodes.find((n) => n.type === 'start');
  if (!startNode) return [];

  const steps = [];
  const visited = new Set();
  let currentId = startNode.id;

  while (currentId && !visited.has(currentId)) {
    visited.add(currentId);
    const node = nodeMap[currentId];
    if (!node) break;

    const outgoing = edges.filter((e) => e.source === currentId);

    let branchTaken = null;
    let nextId = null;

    if (node.type === 'condition') {
      branchTaken = Math.random() < 0.5 ? 'true' : 'false';
      const edge = outgoing.find(
        (e) => e.sourceHandle === branchTaken || e.label === branchTaken,
      );
      nextId = edge?.target ?? null;
    } else {
      nextId = outgoing[0]?.target ?? null;
    }

    steps.push({
      nodeId: node.id,
      nodeType: node.type,
      nodeLabel: node.data.label,
      properties: node.data.properties ?? {},
      branchTaken,
    });

    if (node.type === 'end') break;

    currentId = nextId;
  }

  return steps;
}
