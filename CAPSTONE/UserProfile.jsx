import { useAuth } from '../context/AuthContext';

export default function UserProfile({ user, onClose }) {
    const { isAdmin } = useAuth();


    const userStats = {
        totalOrders: Math.floor(Math.random() * 50) + 15,
        totalSpent: (Math.random() * 1200 + 450).toFixed(2),
        joinDate: user.joinDate,
        lastActive: "2 days ago"
    };

    const recentOrders = [
        { id: "#3921", date: "2025-04-15", amount: 239, status: "Delivered" },
        { id: "#3894", date: "2025-04-08", amount: 89, status: "Processing" },
        { id: "#3782", date: "2025-03-29", amount: 145, status: "Delivered" },
    ];

    return (
        <div className="bg-orange-900 rounded-3xl p-8 max-w-5xl mx-auto">
            <button
                onClick={onClose}
                className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer"
            >
                <i className="fa-solid fa-arrow-left"></i> Back Users
            </button>

            <div className="flex gap-8">
               
                <div className="w-96 bg-slate-800 rounded-3xl p-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-28 h-28 from-cyan-400 to-blue-600 rounded-3xl flex items-center justify-center text-5xl font-bold text-white mb-6">
                            {user.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <h2 className="text-3xl font-bold">{user.name}</h2>
                        <p className="text-cyan-400 mt-1">{user.email}</p>

                        <div className="mt-6 flex gap-2">
                            <span className={`px-5 py-1.5 text-sm rounded-full ${user.role === 'Admin' ? 'bg-purple-500' : user.role === 'Moderator' ? 'bg-orange-500' : 'bg-slate-600'} text-white`}>
                                {user.role}
                            </span>
                            <span className={`px-5 py-1.5 text-sm rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'} text-white`}>
                                {user.status}
                            </span>
                        </div>
                    </div>

                    <div className="mt-10 space-y-6 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Joined</span>
                            <span>{userStats.joinDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Last Active</span>
                            <span>{userStats.lastActive}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Total Orders</span>
                            <span className="font-semibold">{userStats.totalOrders}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Total Spent</span>
                            <span className="font-semibold">${userStats.totalSpent}</span>
                        </div>
                    </div>
                </div>


                <div className="flex-1 space-y-8">
                    <h3 className="text-2xl font-bold">User Activity Dashboard</h3>


                    <div className="bg-slate-800 rounded-3xl p-6">
                        <h4 className="font-semibold mb-4">Recent Orders</h4>
                        <div className="space-y-4">
                            {recentOrders.map(order => (
                                <div key={order.id} className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl">
                                    <div>
                                        <p className="font-medium">{order.id}</p>
                                        <p className="text-xs text-slate-400">{order.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">${order.amount}</p>
                                        <p className={`text-xs ${order.status === 'Delivered' ? 'text-emerald-400' : 'text-orange-400'}`}>
                                            {order.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="bg-slate-800 rounded-3xl p-6">
                        <h4 className="font-semibold mb-4">Recent Activity</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex gap-4">
                                <div className="text-emerald-400">•</div>
                                <div>Placed order #{recentOrders[0].id} - ${recentOrders[0].amount}</div>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-cyan-400">•</div>
                                <div>Updated profile information</div>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-orange-400">•</div>
                                <div>Logged in from new device</div>
                            </div>
                        </div>
                    </div>

                    {isAdmin && (
                        <div className="bg-slate-800 rounded-3xl p-6 text-center">
                            <p className="text-slate-400">Admin Actions</p>
                            <div className="flex gap-4 justify-center mt-4">
                                <button className="px-6 py-3 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500/20">Suspend User</button>
                                <button className="px-6 py-3 bg-orange-500/10 text-orange-400 rounded-2xl hover:bg-orange-500/20">Reset Password</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}