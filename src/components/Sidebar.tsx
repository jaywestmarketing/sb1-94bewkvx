import { TestTube2, History, Calendar, Settings } from 'lucide-react';
import type { NavigationView } from '../types';

interface SidebarProps {
  currentView: NavigationView;
  onViewChange: (view: NavigationView) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const navItems = [
    { id: 'new-test' as NavigationView, label: 'New Test', icon: TestTube2 },
    { id: 'history' as NavigationView, label: 'Test History', icon: History },
    { id: 'schedule' as NavigationView, label: 'Schedule', icon: Calendar },
    { id: 'settings' as NavigationView, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
            <TestTube2 className="w-6 h-6 text-slate-900" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AutoQA</h1>
            <p className="text-xs text-slate-400">AI Testing Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-slate-900 font-medium'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Test Credits</p>
          <p className="text-2xl font-bold text-white">247</p>
          <p className="text-xs text-emerald-400 mt-1">Unlimited plan active</p>
        </div>
      </div>
    </aside>
  );
}
