import { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import HelpPanel from './components/HelpPanel';
import CustomNode from './components/CustomNode';
import Inspector from './components/Inspector';
import { TEMPLATES } from './data/templates';
import { validateWorkflow } from './utils/validate';
import { buildSimulationSteps } from './utils/simulate';

// Defined outside the component so the reference is stable across renders.
// React Flow will infinitely re-render if nodeTypes is recreated each render.
const nodeTypes = {
  start:      CustomNode,
  rule_check: CustomNode,
  condition:  CustomNode,
  approval:   CustomNode,
  archive:    CustomNode,
  end:        CustomNode,
};

const PALETTE_ITEMS = [
  { type: 'start',      emoji: '▶',  label: 'Start' },
  { type: 'rule_check', emoji: '🔍', label: 'Rule Check' },
  { type: 'condition',  emoji: '🔀', label: 'Condition' },
  { type: 'approval',   emoji: '👤', label: 'Approval' },
  { type: 'archive',    emoji: '📦', label: 'Archive' },
  { type: 'end',        emoji: '⏹', label: 'End' },
];

const DEFAULT_LABEL = {
  start:      'Start',
  rule_check: 'Rule Check',
  condition:  'Condition',
  approval:   'Approval',
  archive:    'Archive',
  end:        'End',
};

function nowTs() {
  return `[${new Date().toTimeString().slice(0, 8)}]`;
}

function buildLogMessage({ nodeType, nodeLabel, properties: p, branchTaken }) {
  switch (nodeType) {
    case 'start':      return '▶ Start — workflow begun';
    case 'rule_check': return `🔍 Rule Check "${nodeLabel}" — evaluating policy '${p.policy_name ?? '(none)'}' [${p.severity ?? '?'}]`;
    case 'condition':  return `🔀 Condition "${nodeLabel}" — took ${branchTaken.toUpperCase()} branch`;
    case 'approval':   return `👤 Approval "${nodeLabel}" — requesting sign-off from '${p.approver_role ?? '(none)'}' (SLA ${p.sla_hours ?? '?'}h)`;
    case 'archive':    return `📦 Archive "${nodeLabel}" — tag: '${p.tag ?? '(none)'}', ${p.retention_days ?? '?'}d`;
    case 'end':        return '⏹ End — workflow complete ✓';
    default:           return nodeLabel;
  }
}

export default function App() {
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loadMenuOpen, setLoadMenuOpen] = useState(false);
  const [simulationState, setSimulationState] = useState({});
  const [selectedNode, setSelectedNode] = useState(null);
  const [validationResult, setValidationResult] = useState({ valid: null, blockers: [], warnings: [] });
  const canvasRef = useRef(null);
  const [simRunning, setSimRunning] = useState(false);
  const [simLog, setSimLog] = useState([]);
  const simTimerRef = useRef(null);

  const setNodeSimStatus = useCallback((nodeId, status) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, simulationStatus: status } } : n,
      ),
    );
  }, [setNodes]);

  const clearAllSimStatuses = useCallback(() => {
    setNodes((nds) =>
      nds.map((n) => ({ ...n, data: { ...n.data, simulationStatus: null } })),
    );
  }, [setNodes]);

  const clearValidation = useCallback(
    () => setValidationResult({ valid: null, blockers: [], warnings: [] }),
    [],
  );

  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
    clearValidation();
  }, [setEdges, clearValidation]);

  const handleNodesChange = useCallback((changes) => {
    if (changes.some((c) => c.type === 'remove')) clearValidation();
    onNodesChange(changes);
  }, [onNodesChange, clearValidation]);

  const handleEdgesChange = useCallback((changes) => {
    if (changes.some((c) => c.type === 'remove')) clearValidation();
    onEdgesChange(changes);
  }, [onEdgesChange, clearValidation]);

  const onDeleteNode = useCallback((nodeId, nodeType) => {
    if (
      (nodeType === 'start' || nodeType === 'end') &&
      !window.confirm(`Delete the ${nodeType} node? This will break the workflow structure.`)
    ) return;
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    setSelectedNode(null);
    clearValidation();
  }, [setNodes, setEdges, clearValidation]);

  const onNodeClick = useCallback((_event, node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onValidate = useCallback(() => {
    const result = validateWorkflow(nodes, edges);
    setValidationResult(result);
    console.log('[TRACK] validate_clicked', {
      result,
      blockers: result.blockers,
      warnings: result.warnings,
    });
  }, [nodes, edges]);

  const onRunPreview = useCallback(() => {
    if (simRunning) {
      clearTimeout(simTimerRef.current);
      clearAllSimStatuses();
      setSimRunning(false);
      setSimLog((prev) => [...prev, { ts: nowTs(), msg: 'Simulation stopped by user.' }]);
      return;
    }

    const steps = buildSimulationSteps(nodes, edges);
    if (steps.length === 0) {
      setSimLog([{ ts: nowTs(), msg: 'Error: no reachable start node.' }]);
      return;
    }

    setSimRunning(true);
    setSimLog([{ ts: nowTs(), msg: 'Starting simulation…' }]);

    function runStep(i) {
      if (i >= steps.length) {
        setSimRunning(false);
        setSimLog((prev) => [...prev, { ts: nowTs(), msg: 'Simulation complete ✓' }]);
        return;
      }
      setNodeSimStatus(steps[i].nodeId, 'processing');
      setSimLog((prev) => [...prev, { ts: nowTs(), msg: buildLogMessage(steps[i]) }]);
      simTimerRef.current = setTimeout(() => {
        setNodeSimStatus(steps[i].nodeId, 'done');
        setTimeout(() => runStep(i + 1), 200);
      }, 700);
    }

    runStep(0);
  }, [simRunning, nodes, edges, clearAllSimStatuses, setNodeSimStatus]);

  const loadTemplate = useCallback((template) => {
    clearTimeout(simTimerRef.current);
    clearAllSimStatuses();
    setSimRunning(false);
    setSimLog([]);
    setNodes(template.nodes);
    setEdges(template.edges);
    setSelectedNode(null);
    setWorkflowName(template.name);
    setValidationResult({ valid: null, blockers: [], warnings: [] });
  }, [setNodes, setEdges, clearAllSimStatuses]);

  const onReset = useCallback(() => {
    clearTimeout(simTimerRef.current);
    clearAllSimStatuses();
    setSimRunning(false);
    setSimLog([]);
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setWorkflowName('Untitled Workflow');
    setSimulationState({});
    setValidationResult({ valid: null, blockers: [], warnings: [] });
  }, [setNodes, setEdges, clearAllSimStatuses]);

  const onInspectorChange = useCallback((nodeId, updatedData) => {
    const merge = (prev) => ({
      ...prev,
      data: {
        ...prev.data,
        ...updatedData,
        properties: {
          ...prev.data.properties,
          ...(updatedData.properties ?? {}),
        },
      },
    });

    setNodes((nds) => nds.map((n) => n.id === nodeId ? merge(n) : n));
    setSelectedNode((prev) => prev?.id === nodeId ? merge(prev) : prev);
  }, [setNodes]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData('nodeType');
    if (!nodeType) return;

    const bounds = canvasRef.current.getBoundingClientRect();
    const position = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };

    const id = crypto.randomUUID();
    const newNode = {
      id,
      type:     nodeType,
      position,
      data: {
        label:            DEFAULT_LABEL[nodeType] ?? nodeType,
        properties:       {},
        simulationStatus: simulationState[id],
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">

      {/* ── TOP BAR ── */}
      <header className="h-12 bg-slate-900 flex items-center justify-between px-4 flex-shrink-0">
        <input
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          className="bg-transparent border-none outline-none text-white font-semibold text-sm w-72"
          title="Click to rename this workflow"
          aria-label="Workflow name"
        />
        <div className="flex gap-2">
          <button
            onClick={onValidate}
            title="Check the workflow for structural errors and missing required fields"
            className={`px-3 py-1 text-xs rounded transition-colors ${
              validationResult.valid === null
                ? 'text-slate-300 bg-slate-700 hover:bg-slate-600'
                : validationResult.valid
                  ? 'text-white bg-green-700 hover:bg-green-600'
                  : 'text-white bg-red-700 hover:bg-red-600'
            }`}
          >
            ✓ Validate
          </button>
          <button
            onClick={onRunPreview}
            disabled={!simRunning && validationResult.blockers.length > 0}
            title={simRunning ? 'Stop the running simulation' : 'Step through the workflow with sample data to preview execution'}
            className={`px-3 py-1 text-xs rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
              simRunning
                ? 'bg-red-700 hover:bg-red-600 text-white'
                : 'text-slate-300 bg-slate-700 hover:bg-slate-600'
            }`}
          >
            {simRunning ? '⏹ Stop' : '▶ Run Preview'}
          </button>
          <div className="relative">
            <button
              onClick={() => setLoadMenuOpen((o) => !o)}
              title="Load a pre-built example workflow onto the canvas"
              className="px-3 py-1 text-xs text-slate-300 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
            >
              Load Example ▾
            </button>
            {loadMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLoadMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-60 bg-slate-800 border border-slate-600 rounded shadow-xl z-50">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => { loadTemplate(t); setLoadMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-700 transition-colors first:rounded-t last:rounded-b"
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            onClick={onReset}
            title="Clear the canvas and start a new blank workflow"
            className="px-3 py-1 text-xs text-slate-300 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
          >
            ↺ Reset
          </button>
          <button
            onClick={() => {
              const payload = JSON.stringify({ name: workflowName, nodes, edges }, null, 2);
              const url = URL.createObjectURL(new Blob([payload], { type: 'application/json' }));
              Object.assign(document.createElement('a'), {
                href: url,
                download: `${workflowName.replace(/\s+/g, '_')}.json`,
              }).click();
              URL.revokeObjectURL(url);
            }}
            title="Download the workflow as a JSON definition file"
            className="px-3 py-1 text-xs text-slate-300 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
          >
            Export JSON
          </button>
        </div>
      </header>

      {/* ── VALIDATION BANNER ── */}
      {validationResult.valid !== null && (
        <div
          className={`flex-shrink-0 flex items-start justify-between px-4 py-2 text-xs border-b ${
            validationResult.blockers.length > 0
              ? 'bg-red-950 border-red-800 text-red-300'
              : validationResult.warnings.length > 0
                ? 'bg-amber-950 border-amber-800 text-amber-300'
                : 'bg-green-950 border-green-800 text-green-300'
          }`}
        >
          <div>
            {validationResult.blockers.length > 0 ? (
              <>
                <p className="font-semibold mb-1">✗ Workflow has errors</p>
                <ul className="space-y-0.5 list-disc list-inside">
                  {validationResult.blockers.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </>
            ) : validationResult.warnings.length > 0 ? (
              <>
                <p className="font-semibold mb-1">
                  ⚠ Valid with {validationResult.warnings.length} warning(s)
                </p>
                <ul className="space-y-0.5 list-disc list-inside">
                  {validationResult.warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </>
            ) : (
              <p className="font-semibold">✓ Workflow is valid and ready to run</p>
            )}
          </div>
          <button
            onClick={() => setValidationResult({ valid: null, blockers: [], warnings: [] })}
            aria-label="Dismiss"
            className="ml-4 flex-shrink-0 text-current font-bold text-base leading-none opacity-70 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── MAIN AREA ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left palette */}
        <aside className="w-48 flex-shrink-0 bg-slate-800 border-r border-slate-700 p-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            Nodes
          </p>
          {PALETTE_ITEMS.map(({ type, emoji, label }) => (
            <div
              key={type}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('nodeType', type)}
              className="flex items-center gap-2 p-2 mb-2 rounded bg-slate-700 hover:bg-slate-600 text-white text-sm cursor-grab select-none transition-colors"
            >
              <span>{emoji}</span>
              <span>{label}</span>
            </div>
          ))}
        </aside>

        {/* Center canvas */}
        <div
          ref={canvasRef}
          className="relative flex-1"
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            fitView
          >
            <Background variant="dots" />
            <Controls />
            <MiniMap />
          </ReactFlow>
          <HelpPanel />
        </div>

        {/* Right inspector */}
        <aside className="w-64 flex-shrink-0 bg-slate-800 border-l border-slate-700 overflow-y-auto">
          <Inspector selectedNode={selectedNode} onChange={onInspectorChange} onDelete={onDeleteNode} />
        </aside>

      </div>

      {/* ── BOTTOM LOG PANEL ── */}
      <footer className="h-40 flex-shrink-0 bg-slate-950 border-t border-slate-700 p-3 font-mono text-xs text-slate-400 overflow-y-auto">
        <p className="uppercase tracking-widest mb-2 text-slate-500 text-[10px]">
          Simulation Log
        </p>
        {simLog.length === 0
          ? <p>Run a simulation to see output…</p>
          : simLog.map((entry, i) => (
              <p key={i}>
                <span className="text-slate-600">{entry.ts} </span>
                <span className="text-slate-300">{entry.msg}</span>
              </p>
            ))
        }
      </footer>

    </div>
  );
}
