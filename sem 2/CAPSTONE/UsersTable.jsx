import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import UserProfile from './UserProfile';

const initialUsers = [
  { id: 1, name: "Priya Sharma", role: "Admin", email: "priya@email.com", status: "Active", joinDate: "2024-01-15" },
  { id: 2, name: "Ayush Jha", role: "User", email: "ayush@email.com", status: "Active", joinDate: "2024-03-22" },
  { id: 3, name: "Priya Sharma", role: "User", email: "priya@email.com", status: "Active", joinDate: "2024-03-22" },
  { id: 4, name: "Rahul Verma", role: "Moderator", email: "rahul@adminx.com", status: "Inactive", joinDate: "2023-11-10" },
  { id: 5, name: "Neha Gupta", role: "User", email: "neha@email.com", status: "Active", joinDate: "2024-02-05" },
];

export default function UsersTable() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', role: 'User', status: 'Active' });

  const { isAdmin } = useAuth();

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-6 right-6 px-6 py-4 rounded-2xl shadow-2xl text-sm font-medium z-50 ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'} text-white`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    if (search) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (roleFilter !== 'All') result = result.filter(user => user.role === roleFilter);
    if (statusFilter !== 'All') result = result.filter(user => user.status === statusFilter);

    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, search, roleFilter, statusFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const openAddModal = () => {
    setModalMode('add');
    setCurrentUser({ name: '', email: '', role: 'User', status: 'Active' });
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setModalMode('edit');
    setCurrentUser({ ...user });
    setShowModal(true);
  };

  const handleSaveUser = () => {
    if (!currentUser.name || !currentUser.email) return;

    if (modalMode === 'add') {
      setUsers([...users, { id: Date.now(), ...currentUser, joinDate: new Date().toISOString().slice(0, 10) }]);
      showToast(`User "${currentUser.name}" added successfully!`);
    } else {
      setUsers(users.map(u => u.id === currentUser.id ? { ...currentUser } : u));
      showToast(`User "${currentUser.name}" updated!`);
    }
    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
    ));
  };

  const deleteUser = (id, name) => {
    if (confirm(`Delete "${name}"?`)) {
      setUsers(users.filter(u => u.id !== id));
      showToast(`User "${name}" deleted`, "error");
    }
  };


  const openUserProfile = (user) => {
    setSelectedUser(user);
  };

  const closeUserProfile = () => {
    setSelectedUser(null);
  };

  return (
    <>
      {!selectedUser ? (

        <div className="bg-slate-900 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex flex-wrap gap-4 items-center justify-between">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3 w-80 focus:outline-none focus:border-cyan-400"
            />

            <div className="flex gap-3">
              <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3">
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="User">User</option>
              </select>

              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3">
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              {isAdmin && (
                <>
                  <button onClick={openAddModal} className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-2xl flex items-center gap-2">
                    <i className="fa-solid fa-plus"></i> Add User
                  </button>
                </>
              )}
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-8 py-5 text-left cursor-pointer" onClick={() => handleSort('name')}>User Name</th>
                <th className="px-8 py-5 text-left cursor-pointer" onClick={() => handleSort('role')}>Role</th>
                <th className="px-8 py-5 text-left cursor-pointer" onClick={() => handleSort('email')}>Email</th>
                <th className="px-8 py-5 text-left">Status</th>
                {isAdmin && <th className="px-8 py-5 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredAndSortedUsers.map(user => (
                <tr key={user.id} className="hover:bg-slate-800/70 transition-colors">
                  <td
                    className="px-8 py-5 font-medium text-cyan-400 hover:text-cyan-300 cursor-pointer"
                    onClick={() => openUserProfile(user)}
                  >
                    {user.name}
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1 text-xs rounded-full ${user.role === 'Admin' ? 'bg-purple-500' : user.role === 'Moderator' ? 'bg-orange-500' : 'bg-slate-600'} text-white`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-400">{user.email}</td>
                  <td className="px-8 py-5">
                    <button onClick={() => toggleStatus(user.id)} className={`px-4 py-1 text-xs rounded-full ${user.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {user.status}
                    </button>
                  </td>
                  {isAdmin && (
                    <td className="px-8 py-5 flex gap-4">
                      <button onClick={() => openEditModal(user)} className="text-cyan-400 hover:text-cyan-300"><i className="fa-solid fa-edit"></i></button>
                      <button onClick={() => deleteUser(user.id, user.name)} className="text-red-400 hover:text-red-300"><i className="fa-solid fa-trash"></i></button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        
        <UserProfile user={selectedUser} onClose={closeUserProfile} />
      )}

      
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-3xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold mb-6">{modalMode === 'add' ? 'Add New User' : 'Edit User'}</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm text-slate-400 block mb-2">Full Name</label>
                <input type="text" value={currentUser.name} onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4" />
              </div>
              <div>
                <label className="text-sm text-slate-400 block mb-2">Email</label>
                <input type="email" value={currentUser.email} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4" />
              </div>
              <div>
                <label className="text-sm text-slate-400 block mb-2">Role</label>
                <select value={currentUser.role} onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4">
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                  {isAdmin && <option value="Admin">Admin</option>}
                </select>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setShowModal(false)} className="flex-1 py-4 rounded-2xl border border-slate-700">Cancel</button>
              <button onClick={handleSaveUser} className="flex-1 py-4 bg-cyan-500 rounded-2xl">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}