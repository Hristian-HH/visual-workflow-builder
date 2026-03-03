import { useState } from 'react';

const STEPS = [
  { heading: 'Start', text: 'Click Load Example ▾ to load a pre-built workflow, or drag nodes from the left palette onto the canvas to build from scratch.' },
  { heading: 'Connect', text: 'Draw edges by dragging from a node\'s right-side handle to another node\'s left handle. Condition nodes have a True (right) and False (bottom) handle.' },
  { heading: 'Edit', text: 'Click any node to open the Inspector on the right. Edit the label and fill in the node-specific fields.' },
  { heading: 'Delete', text: 'Click Delete node in the Inspector to remove a node and its connections. You can also select a node and press Delete or Backspace.' },
  { heading: 'Validate', text: 'Click ✓ Validate to check for structural errors (disconnected nodes, missing condition branches) and incomplete fields.' },
  { heading: 'Simulate', text: 'Click ▶ Run Preview to animate the workflow. Each node pulses yellow while processing, then turns green. Condition branches are random. Click ⏹ Stop to halt.' },
  { heading: 'Export / Import', text: 'Export JSON downloads the workflow as a file. Import JSON reloads any previously exported file — useful for sharing or resetting to a saved state.' },
];

export default function HelpPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-4 right-4 z-10 flex flex-col items-end gap-2">
      {open && (
        <div className="bg-slate-800 rounded-lg shadow-xl p-4 w-72">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-3">
            How to use
          </h3>
          <ol className="space-y-3">
            {STEPS.map((step, i) => (
              <li key={i} className="flex gap-2.5 text-xs text-slate-400">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-700 text-slate-300 font-semibold flex items-center justify-center text-[10px]">
                  {i + 1}
                </span>
                <span>
                  <span className="text-slate-200 font-medium">{step.heading} — </span>
                  {step.text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close help' : 'Open help guide'}
        title="Open the how-to-use guide"
        className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 shadow-md text-slate-300 hover:text-white hover:bg-slate-600 transition-colors flex items-center justify-center text-sm font-bold"
      >
        ?
      </button>
    </div>
  );
}
