import { Handle, Position } from '@xyflow/react';
import { nodeDescriptions } from '../docs/nodeDescriptions';

const NODE_CONFIG = {
  start:      { bg: 'bg-green-500',  border: 'border-green-600',  emoji: '▶' },
  rule_check: { bg: 'bg-blue-500',   border: 'border-blue-600',   emoji: '🔍' },
  condition:  { bg: 'bg-amber-500',  border: 'border-amber-600',  emoji: '🔀' },
  approval:   { bg: 'bg-purple-500', border: 'border-purple-600', emoji: '👤' },
  archive:    { bg: 'bg-orange-500', border: 'border-orange-600', emoji: '📦' },
  end:        { bg: 'bg-red-500',    border: 'border-red-600',    emoji: '⏹' },
};

const STATUS_RING = {
  processing: 'animate-pulse ring-2 ring-yellow-400',
  done:       'ring-2 ring-green-400',
};

export default function CustomNode({ data, type }) {
  const config = NODE_CONFIG[type] ?? NODE_CONFIG.start;
  const ring = STATUS_RING[data.simulationStatus] ?? '';
  const isCondition = type === 'condition';

  return (
    <div
      title={nodeDescriptions[type]}
      className={`relative rounded-lg border-2 p-3 min-w-[140px] shadow-md text-white ${config.bg} ${config.border} ${ring}`}
    >
      {/* Input handle — left */}
      <Handle type="target" position={Position.Left} />

      {/* Top row: emoji + label */}
      <div className="flex items-center gap-2 font-bold text-sm">
        <span>{config.emoji}</span>
        <span>{data.label}</span>
      </div>

      {/* Bottom row: type */}
      <div className="text-xs opacity-75 mt-1">{type.replace(/_/g, ' ')}</div>

      {isCondition ? (
        <>
          {/* True branch — right */}
          <Handle type="source" position={Position.Right} id="true" />
          <span className="pointer-events-none absolute right-[-18px] top-1/2 -translate-y-1/2 text-[10px] font-bold leading-none text-green-700">
            T
          </span>

          {/* False branch — bottom */}
          <Handle type="source" position={Position.Bottom} id="false" />
          <span className="pointer-events-none absolute bottom-[-16px] left-1/2 -translate-x-1/2 text-[10px] font-bold leading-none text-red-700">
            F
          </span>
        </>
      ) : (
        <Handle type="source" position={Position.Right} />
      )}
    </div>
  );
}
