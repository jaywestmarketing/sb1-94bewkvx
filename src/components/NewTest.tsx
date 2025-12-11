import { useState } from 'react';
import { Play, Loader2 } from 'lucide-react';
import { ExecutionConsole } from './ExecutionConsole';
import { ResultsCard } from './ResultsCard';
import { runTestSimulation } from '../utils/testSimulation';
import type { TestResult } from '../types';

export function NewTest() {
  const [url, setUrl] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<TestResult | null>(null);

  const handleRunTest = async () => {
    if (!url || !instructions) return;

    setIsRunning(true);
    setCurrentTest(null);

    const result = await runTestSimulation(url, instructions, (updatedTest) => {
      setCurrentTest(updatedTest);
    });

    setCurrentTest(result);
    setIsRunning(false);
  };

  const isFormValid = url.trim() !== '' && instructions.trim() !== '';

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Create New Test</h2>
        <p className="text-slate-400">
          Configure your AI-powered browser automation test
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Target Website URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  disabled={isRunning}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="instructions"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Test Instructions
                </label>
                <textarea
                  id="instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Go to homepage, click login, verify dashboard loads..."
                  disabled={isRunning}
                  rows={8}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none disabled:opacity-50"
                />
              </div>

              <button
                onClick={handleRunTest}
                disabled={!isFormValid || isRunning}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-semibold rounded-lg transition-colors"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Running Test...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Run AI Agent
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {currentTest && <ExecutionConsole testResult={currentTest} />}
          {currentTest && currentTest.status !== 'running' && (
            <ResultsCard testResult={currentTest} />
          )}
        </div>
      </div>
    </div>
  );
}
