export const TEMPLATES = [
  {
    name: 'WhatsApp DLP Compliance',
    nodes: [
      {
        id: 'n1', type: 'start',
        position: { x: 100, y: 200 },
        data: { label: 'Start', properties: {}, simulationStatus: null },
      },
      {
        id: 'n2', type: 'rule_check',
        position: { x: 300, y: 200 },
        data: { label: 'DLP Check', properties: { policy_name: 'DLP-001', severity: 'high' }, simulationStatus: null },
      },
      {
        id: 'n3', type: 'condition',
        position: { x: 520, y: 200 },
        data: { label: 'Sensitive Content?', properties: { expression: 'message_contains_sensitive == true', default_branch: 'false' }, simulationStatus: null },
      },
      {
        id: 'n4', type: 'approval',
        position: { x: 740, y: 80 },
        data: { label: 'Manager Approval', properties: { approver_role: 'compliance_manager', sla_hours: 24 }, simulationStatus: null },
      },
      {
        id: 'n5', type: 'archive',
        position: { x: 960, y: 200 },
        data: { label: 'Archive Transcript', properties: { retention_days: 2555, tag: 'compliance-flagged' }, simulationStatus: null },
      },
      {
        id: 'n6', type: 'end',
        position: { x: 1180, y: 200 },
        data: { label: 'End', properties: {}, simulationStatus: null },
      },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2' },
      { id: 'e2', source: 'n2', target: 'n3' },
      { id: 'e3', source: 'n3', target: 'n4', label: 'true',  sourceHandle: 'true'  },
      { id: 'e4', source: 'n3', target: 'n5', label: 'false', sourceHandle: 'false' },
      { id: 'e5', source: 'n4', target: 'n5' },
      { id: 'e6', source: 'n5', target: 'n6' },
    ],
  },

  {
    name: 'Employee Offboarding Data Wipe',
    nodes: [
      {
        id: 'n1', type: 'start',
        position: { x: 80, y: 220 },
        data: { label: 'Start', properties: {}, simulationStatus: null },
      },
      {
        id: 'n2', type: 'rule_check',
        position: { x: 280, y: 220 },
        data: { label: 'Retention Check', properties: { policy_name: 'GDPR-Art17', severity: 'high' }, simulationStatus: null },
      },
      {
        id: 'n3', type: 'condition',
        position: { x: 500, y: 220 },
        data: { label: 'Personal Data Found?', properties: { expression: 'personal_data_detected == true', default_branch: 'false' }, simulationStatus: null },
      },
      {
        id: 'n4', type: 'approval',
        position: { x: 720, y: 80 },
        data: { label: 'Legal Hold Approval', properties: { approver_role: 'legal_counsel', sla_hours: 72 }, simulationStatus: null },
      },
      {
        id: 'n5', type: 'archive',
        position: { x: 960, y: 80 },
        data: { label: 'Legal Hold Archive', properties: { retention_days: 2555, tag: 'offboarding-legal-hold' }, simulationStatus: null },
      },
      {
        id: 'n6', type: 'archive',
        position: { x: 680, y: 370 },
        data: { label: 'Auto-Archive', properties: { retention_days: 365, tag: 'offboarding-clean' }, simulationStatus: null },
      },
      {
        id: 'n7', type: 'end',
        position: { x: 1180, y: 220 },
        data: { label: 'End', properties: {}, simulationStatus: null },
      },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2' },
      { id: 'e2', source: 'n2', target: 'n3' },
      { id: 'e3', source: 'n3', target: 'n4', label: 'true',  sourceHandle: 'true'  },
      { id: 'e4', source: 'n3', target: 'n6', label: 'false', sourceHandle: 'false' },
      { id: 'e5', source: 'n4', target: 'n5' },
      { id: 'e6', source: 'n5', target: 'n7' },
      { id: 'e7', source: 'n6', target: 'n7' },
    ],
  },

  {
    name: 'Financial Transaction Fraud Review',
    nodes: [
      {
        id: 'n1', type: 'start',
        position: { x: 80, y: 220 },
        data: { label: 'Start', properties: {}, simulationStatus: null },
      },
      {
        id: 'n2', type: 'rule_check',
        position: { x: 280, y: 220 },
        data: { label: 'AML Check', properties: { policy_name: 'AML-CFT-002', severity: 'high' }, simulationStatus: null },
      },
      {
        id: 'n3', type: 'condition',
        position: { x: 500, y: 220 },
        data: { label: 'High Risk?', properties: { expression: 'risk_score > 80', default_branch: 'false' }, simulationStatus: null },
      },
      {
        id: 'n4', type: 'approval',
        position: { x: 720, y: 80 },
        data: { label: 'Senior Compliance Approval', properties: { approver_role: 'senior_compliance_officer', sla_hours: 4 }, simulationStatus: null },
      },
      {
        id: 'n5', type: 'archive',
        position: { x: 960, y: 80 },
        data: { label: 'Flagged Transaction Archive', properties: { retention_days: 2555, tag: 'aml-flagged' }, simulationStatus: null },
      },
      {
        id: 'n6', type: 'archive',
        position: { x: 680, y: 370 },
        data: { label: 'Auto-Clear Archive', properties: { retention_days: 365, tag: 'aml-cleared' }, simulationStatus: null },
      },
      {
        id: 'n7', type: 'end',
        position: { x: 1180, y: 220 },
        data: { label: 'End', properties: {}, simulationStatus: null },
      },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2' },
      { id: 'e2', source: 'n2', target: 'n3' },
      { id: 'e3', source: 'n3', target: 'n4', label: 'true',  sourceHandle: 'true'  },
      { id: 'e4', source: 'n3', target: 'n6', label: 'false', sourceHandle: 'false' },
      { id: 'e5', source: 'n4', target: 'n5' },
      { id: 'e6', source: 'n5', target: 'n7' },
      { id: 'e7', source: 'n6', target: 'n7' },
    ],
  },
];
