export const nodeDescriptions = {
  start: "Entry point of the workflow. Every workflow must begin here.",
  rule_check:
    "Evaluates a compliance policy (e.g. DLP scan). Triggers based on message content.",
  condition:
    "Branches the workflow into two paths based on a true/false expression.",
  approval:
    "Pauses workflow and requests sign-off from a specified role within an SLA window.",
  archive:
    "Stores the message transcript with a retention tag for compliance records.",
  end: "Terminates the workflow. Every path must lead here.",
};

export const fieldDescriptions = {
  policy_name:
    "The identifier of the compliance policy to evaluate (e.g. 'dlp-pii', 'export-control').",
  severity:
    "Risk level assigned when this rule triggers: low, medium, or high.",
  expression:
    "A boolean expression evaluated at runtime (e.g. 'risk_score > 0.8'). Determines which branch is taken.",
  default_branch:
    "The branch followed when the expression result does not match true or false explicitly.",
  approver_role:
    "The role required to approve this step (e.g. 'compliance-officer', 'manager').",
  sla_hours:
    "Maximum hours allowed for the approver to respond before the request escalates or auto-rejects.",
  retention_days:
    "Number of days the archived transcript must be retained to satisfy compliance requirements.",
  tag: "A label applied to the archive record for filtering and audit queries (e.g. 'gdpr', 'sox').",
};
