import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { TestResult } from '../types';

export function TestHistory() {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error && data) {
      setTests(data as TestResult[]);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-400">Loading test history...</div>
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Test History</h2>
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-12 text-center">
          <Clock className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No tests run yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Test History</h2>
        <p className="text-slate-400">View all your past test executions</p>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {tests.map((test) => {
                const isPassed = test.status === 'passed';
                const isRunning = test.status === 'running';
                const duration = test.completed_at
                  ? Math.round(
                      (new Date(test.completed_at).getTime() -
                        new Date(test.created_at).getTime()) /
                        1000
                    )
                  : null;

                return (
                  <tr
                    key={test.id}
                    className="hover:bg-slate-750 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {isRunning ? (
                          <Clock className="w-5 h-5 text-slate-400 animate-pulse" />
                        ) : isPassed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            isRunning
                              ? 'text-slate-400'
                              : isPassed
                              ? 'text-emerald-400'
                              : 'text-red-400'
                          }`}
                        >
                          {test.status.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-300 truncate max-w-md">
                          {test.url}
                        </span>
                        <a
                          href={test.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-emerald-400 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-400">
                        {new Date(test.created_at).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-400">
                        {duration ? `${duration}s` : '-'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
