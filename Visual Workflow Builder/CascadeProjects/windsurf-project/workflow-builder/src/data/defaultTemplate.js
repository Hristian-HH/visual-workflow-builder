export const templateNodes = [
  {
    id: 'n1',
    type: 'start',
    position: { x: 100, y: 200 },
    data: { label: 'Start', properties: {}, simulationStatus: null },
  },
  {
    id: 'n2',
    type: 'rule_check',
    position: { x: 300, y: 200 },
    data: {
      label: 'DLP Check',
      properties: { policy_name: 'DLP-001', severity: 'high' },
      simulationStatus: null,
    },
  },
  {
    id: 'n3',
    type: 'condition',
    position: { x: 520, y: 200 },
    data: {
      label: 'Sensitive Content?',
      properties: {
        expression: 'message_contains_sensitive == true',
        default_branch: 'false',
      },
      simulationStatus: null,
    },
  },
  {
    id: 'n4',
    type: 'approval',
    position: { x: 740, y: 80 },
    data: {
      label: 'Manager Approval',
      properties: { approver_role: 'compliance_manager', sla_hours: 24 },
      simulationStatus: null,
    },
  },
  {
    id: 'n5',
    type: 'archive',
    position: { x: 960, y: 200 },
    data: {
      label: 'Archive Transcript',
      properties: { retention_days: 2555, tag: 'compliance-flagged' },
      simulationStatus: null,
    },
  },
  {
    id: 'n6',
    type: 'end',
    position: { x: 1180, y: 200 },
    data: { label: 'End', properties: {}, simulationStatus: null },
  },
];

export const templateEdges = [
  { id: 'e1', source: 'n1', target: 'n2' },
  { id: 'e2', source: 'n2', target: 'n3' },
  { id: 'e3', source: 'n3', target: 'n4', label: 'true',  sourceHandle: 'true' },
  { id: 'e4', source: 'n3', target: 'n5', label: 'false', sourceHandle: 'false' },
  { id: 'e5', source: 'n4', target: 'n5' },
  { id: 'e6', source: 'n5', target: 'n6' },
];
