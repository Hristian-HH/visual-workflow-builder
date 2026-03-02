import { useState } from 'react';

const STEPS = [
  "Drag nodes from the left palette onto the canvas",
  "Connect nodes by dragging from one handle to another",
  "Click any node to edit its properties in the right panel",
  "Click an edge or node to select it, then press Delete or Backspace to remove it",
  "Click Validate to check your workflow for errors",
  "Click Run Preview to simulate the workflow step by step",
  "Click Export JSON to download the workflow definition",
];

export default function HelpPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-4 left-4 z-10 flex flex-col items-start gap-2">
      {open && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-72 p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">How to use</h3>
          <ol className="space-y-2">
            {STEPS.map((step, i) => (
              <li key={i} className="flex gap-2 text-xs text-gray-600">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center text-[10px]">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close help' : 'Open help'}
        className="w-8 h-8 rounded-full bg-white border border-gray-300 shadow-md text-gray-500 hover:text-blue-600 hover:border-blue-400 transition-colors flex items-center justify-center text-sm font-bold"
      >
        ?
      </button>
    </div>
  );
}
