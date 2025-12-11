import { Terminal, Check, Loader2 } from 'lucide-react';
import type { TestResult } from '../types';

interface ExecutionConsoleProps {
  testResult: TestResult;
}

export function ExecutionConsole({ testResult }: ExecutionConsoleProps) {
  return (
    <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
        <Terminal className="w-4 h-4 text-emerald-400" />
        <span className="text-sm font-medium text-slate-300">
          Live Execution Console
        </span>
      </div>

      <div className="p-4 font-mono text-sm space-y-2 max-h-96 overflow-y-auto">
        {testResult.steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="text-slate-500 select-none">$</span>
            <div className="flex-1 flex items-center gap-2">
              {step.status === 'running' && (
                <Loader2 className="w-4 h-4 text-emerald-400 animate-spin flex-shrink-0" />
              )}
              {step.status === 'complete' && (
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              )}
              <span
                className={
                  step.status === 'running' ? 'text-emerald-400' : 'text-slate-400'
                }
              >
                {step.message}
              </span>
            </div>
            <span className="text-slate-600 text-xs">
              {new Date(step.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}

        {testResult.status === 'running' && (
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="animate-pulse">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}
