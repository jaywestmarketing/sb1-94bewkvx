import { CheckCircle2, XCircle, Image as ImageIcon } from 'lucide-react';
import type { TestResult } from '../types';

interface ResultsCardProps {
  testResult: TestResult;
}

export function ResultsCard({ testResult }: ResultsCardProps) {
  const isPassed = testResult.status === 'passed';

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {isPassed ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          ) : (
            <XCircle className="w-8 h-8 text-red-400" />
          )}
          <div>
            <h3 className="text-xl font-bold text-white">Test Results</h3>
            <p className="text-sm text-slate-400">
              {new Date(testResult.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isPassed
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}
          >
            {isPassed ? 'PASSED' : 'FAILED'}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
              Target URL
            </p>
            <p className="text-sm text-slate-300 break-all">{testResult.url}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
              Test Instructions
            </p>
            <p className="text-sm text-slate-300">{testResult.instructions}</p>
          </div>
        </div>
      </div>

      {testResult.screenshot_url && (
        <div className="border-t border-slate-700">
          <div className="p-4 bg-slate-900">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-400">
                Test Screenshot
              </span>
            </div>
            <div className="rounded-lg overflow-hidden border border-slate-700">
              <img
                src={testResult.screenshot_url}
                alt="Test screenshot"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
