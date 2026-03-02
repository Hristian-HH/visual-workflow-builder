import { nodeDescriptions } from '../docs/nodeDescriptions';

const NODE_BADGE = {
  start:      'bg-green-500',
  rule_check: 'bg-blue-500',
  condition:  'bg-amber-500',
  approval:   'bg-purple-500',
  archive:    'bg-orange-500',
  end:        'bg-red-500',
};

const NODE_LABEL = {
  start:      'Start',
  rule_check: 'Rule Check',
  condition:  'Condition',
  approval:   'Approval',
  archive:    'Archive',
  end:        'End',
};

const INPUT_CLS =
  'w-full bg-slate-700 border border-slate-600 rounded p-1.5 text-white text-sm focus:outline-none focus:border-slate-400';

function Field({ label, helper, children }) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1">{label}</label>
      {children}
      <p className="text-xs text-slate-500 mt-1 mb-3">{helper}</p>
    </div>
  );
}

export default function Inspector({ selectedNode, onChange, onDelete }) {
  if (!selectedNode) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <p className="text-sm text-slate-400 text-center">Select a node to edit</p>
      </div>
    );
  }

  const { id, type, data } = selectedNode;
  const props = data.properties ?? {};

  const handleLabel = (e) => onChange(id, { label: e.target.value });
  const handleProp  = (key) => (e) => onChange(id, { properties: { [key]: e.target.value } });

  return (
    <div className="p-4 text-slate-200">

      {/* Panel header */}
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
        Inspector
      </p>

      {/* Type badge */}
      <span
        className={`inline-block text-xs text-white font-semibold px-2 py-0.5 rounded-full mb-4 ${NODE_BADGE[type] ?? 'bg-slate-600'}`}
      >
        {NODE_LABEL[type] ?? type}
      </span>

      {/* ── Label (always shown) ── */}
      <Field label="Label" helper="The display name of this node on the canvas">
        <input
          type="text"
          value={data.label ?? ''}
          onChange={handleLabel}
          className={INPUT_CLS}
        />
      </Field>

      {/* ── rule_check fields ── */}
      {type === 'rule_check' && (
        <>
          <Field
            label="Policy Name"
            helper="Reference ID of the compliance policy e.g. DLP-001"
          >
            <input
              type="text"
              value={props.policy_name ?? ''}
              onChange={handleProp('policy_name')}
              className={INPUT_CLS}
            />
          </Field>
          <Field
            label="Severity"
            helper="Impact level if this policy is triggered"
          >
            <select
              value={props.severity ?? ''}
              onChange={handleProp('severity')}
              className={INPUT_CLS}
            >
              <option value="">Select…</option>
              <option value="low">Low</option>
              <option value="med">Medium</option>
              <option value="high">High</option>
            </select>
          </Field>
        </>
      )}

      {/* ── condition fields ── */}
      {type === 'condition' && (
        <>
          <Field
            label="Expression"
            helper="Boolean expression evaluated at runtime e.g. message_contains_sensitive == true"
          >
            <input
              type="text"
              value={props.expression ?? ''}
              onChange={handleProp('expression')}
              className={INPUT_CLS}
            />
          </Field>
          <Field
            label="Default Branch"
            helper="Which branch to take if expression cannot be evaluated"
          >
            <select
              value={props.default_branch ?? ''}
              onChange={handleProp('default_branch')}
              className={INPUT_CLS}
            >
              <option value="">Select…</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </Field>
        </>
      )}

      {/* ── approval fields ── */}
      {type === 'approval' && (
        <>
          <Field
            label="Approver Role"
            helper="Role required to approve e.g. compliance_manager"
          >
            <input
              type="text"
              value={props.approver_role ?? ''}
              onChange={handleProp('approver_role')}
              className={INPUT_CLS}
            />
          </Field>
          <Field
            label="SLA Hours"
            helper="Maximum hours allowed for approval before escalation"
          >
            <input
              type="number"
              min="1"
              value={props.sla_hours ?? ''}
              onChange={handleProp('sla_hours')}
              className={INPUT_CLS}
            />
          </Field>
        </>
      )}

      {/* ── archive fields ── */}
      {type === 'archive' && (
        <>
          <Field
            label="Retention Days"
            helper="Number of days to retain the transcript (2555 = 7 years)"
          >
            <input
              type="number"
              min="1"
              value={props.retention_days ?? ''}
              onChange={handleProp('retention_days')}
              className={INPUT_CLS}
            />
          </Field>
          <Field
            label="Tag"
            helper="Compliance tag applied to archived record e.g. compliance-flagged"
          >
            <input
              type="text"
              value={props.tag ?? ''}
              onChange={handleProp('tag')}
              className={INPUT_CLS}
            />
          </Field>
        </>
      )}

      {/* ── start / end: description only ── */}
      {(type === 'start' || type === 'end') && (
        <p className="text-xs text-slate-400 leading-relaxed">
          {nodeDescriptions[type]}
        </p>
      )}

      {/* ── Delete ── */}
      <div className="mt-4 pt-4 border-t border-slate-700">
        <button
          onClick={() => onDelete(id, type)}
          title="Remove this node and all its connections from the canvas"
          className="w-full px-3 py-1.5 text-xs text-red-400 border border-red-800 hover:bg-red-950 rounded transition-colors"
        >
          Delete node
        </button>
      </div>

    </div>
  );
}
