import { useAuth } from '../context/AuthContext';

const menuItems = [
  { icon: 'fa-house', label: 'Dashboard', path: 'dashboard' },
  { icon: 'fa-users', label: 'Users', path: 'users' },
  { icon: 'fa-chart-line', label: 'Sales', path: 'sales' },
  { icon: 'fa-box', label: 'Products', path: 'products' },
  { icon: 'fa-file-lines', label: 'Reports', path: 'reports' },
];

export default function Sidebar({ activePage, setActivePage }) {
  const { currentUser, switchRole, isAdmin } = useAuth();

  return (
    <div className="w-72 bg-slate-600 border-r border-slate-800 flex flex-col h-screen">
    
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl">
          P
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">Admin</h1>
          <p className="text-xs text-cyan-400">Enterprise Dashboard</p>
        </div>
      </div>

     
      <div className="px-6 py-4 border-b border-slate-800">
        <div className="flex bg-slate-800 rounded-3xl p-1 text-sm font-medium">
          <button
            onClick={() => switchRole('admin')}
            className={`flex-1 py-2.5 rounded-3xl transition-all ${currentUser.role === 'admin' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-700'}`}>
            ADMIN
          </button>
          <button
            onClick={() => switchRole('user')}
            className={`flex-1 py-2.5 rounded-3xl transition-all ${currentUser.role === 'user' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-700'}`}>
            USER
          </button>
        </div>
      </div>

    
      <nav className="flex-1 px-3 py-8">
        {menuItems.map((item) => {

          if (!isAdmin && ['users', 'reports'].includes(item.path)) return null;

          return (
            <button
              key={item.path}
              onClick={() => setActivePage(item.path)}
              className={`sidebar-link w-full flex items-center gap-3 px-6 py-3.5 rounded-2xl text-sm font-medium mb-1 
                ${activePage === item.path
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <i className={`fa-solid ${item.icon} w-5`}></i>
              {item.label}
            </button>
          );
        })}
      </nav>


      <div className="p-6 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            className="w-11 h-11 rounded-2xl ring-2 ring-cyan-400 object-cover"
            alt={currentUser.name}
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{currentUser.name}</p>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              ● {currentUser.role.toUpperCase()}
            </p>
          </div>
          <button
            onClick={() => alert('Logged out successfully!')}
            className="text-slate-400 hover:text-red-400 p-2 rounded-xl hover:bg-slate-800"
          >
            <i className="fa-solid fa-right-from-bracket text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
}