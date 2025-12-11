import { Calendar } from 'lucide-react';

export function Schedule() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Schedule Tests</h2>
        <p className="text-slate-400">Automate your testing workflow</p>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700 p-12 text-center">
        <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Coming Soon
        </h3>
        <p className="text-slate-400">
          Schedule recurring tests and set up automated testing workflows
        </p>
      </div>
    </div>
  );
}
