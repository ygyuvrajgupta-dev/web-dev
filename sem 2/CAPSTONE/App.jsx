import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Sales from './pages/Sales';
import Products from './pages/Products';
import Reports from './pages/Reports';

function AppContent() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'users': return <Users />;
      case 'sales': return <Sales />;
      // case 'products': return <div className="text-center py-20"><h2 className="text-4xl font-bold text-slate-400">Products Management</h2><p className="mt-4 text-slate-500">Coming soon...</p></div>;
      // case 'reports': return <div className="text-center py-20"><h2 className="text-4xl font-bold text-slate-400">Reports</h2><p className="mt-4 text-slate-500">Advanced Reports coming soon...</p></div>;
      case 'products': return <Products />;
      case 'reports': return <Reports />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold capitalize tracking-tight">{activePage}</h1>
          <div className="flex items-center gap-6">
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-slate-800 border border-slate-700 rounded-3xl px-5 py-3 w-80 focus:outline-none focus:border-cyan-400 text-sm"
            />
            <div className="flex items-center gap-2 text-slate-400">
              <i className="fa-solid fa-bell text-xl"></i>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8 bg-slate-950">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}