import { Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
        <p className="text-slate-400">Configure your AutoQA preferences</p>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700 p-12 text-center">
        <SettingsIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Coming Soon
        </h3>
        <p className="text-slate-400">
          Customize your testing environment and platform preferences
        </p>
      </div>
    </div>
  );
}
