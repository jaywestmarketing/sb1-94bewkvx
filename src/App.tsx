import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { NewTest } from './components/NewTest';
import { TestHistory } from './components/TestHistory';
import { Schedule } from './components/Schedule';
import { Settings } from './components/Settings';
import type { NavigationView } from './types';

function App() {
  const [currentView, setCurrentView] = useState<NavigationView>('new-test');

  const renderView = () => {
    switch (currentView) {
      case 'new-test':
        return <NewTest />;
      case 'history':
        return <TestHistory />;
      case 'schedule':
        return <Schedule />;
      case 'settings':
        return <Settings />;
      default:
        return <NewTest />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;
