import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, updateUserRole, getUserStats } from "../../../services/userService";

export default function UsersManager() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersRes, statsRes] = await Promise.all([
        getAllUsers(),
        getUserStats()
      ]);
      setUsers(usersRes.data || []);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Load error:", err);
      if (err.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`Delete user "${name}"? This action cannot be undone.`)) return;
    try {
      await deleteUser(id);
      loadData();
    } catch (err) {
      alert(err.response?.data || "Failed to delete user");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    if (!window.confirm(`Change user role to ${newRole}?`)) return;
    try {
      await updateUserRole(id, newRole);
      loadData();
    } catch (err) {
      alert(err.response?.data || "Failed to update role");
    }
  };

  // Filter users by search
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && users.length === 0) {
    return <div className="admin-page">Loading users...</div>;
  }

  return (
    <div className="admin-page">
      <h2>👥 User Management</h2>
      <p className="admin-sub">View and manage aspirant accounts.</p>

      {/* Stats Cards */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-value">{stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👑</div>
            <div className="stat-value">{stats.adminCount}</div>
            <div className="stat-label">Admins</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎓</div>
            <div className="stat-value">{stats.aspirantCount}</div>
            <div className="stat-label">Aspirants</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🆕</div>
            <div className="stat-value">{stats.recentRegistrations}</div>
            <div className="stat-label">Last 30 Days</div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="admin-section">
        <div className="flex-row">
          <input 
            type="text"
            className="admin-input"
            placeholder="🔍 Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
          />
          <span className="admin-badge">{filteredUsers.length} users found</span>
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-section">
        <h3>📋 Registered Users</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Registered On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td><strong>{user.name}</strong></td>
                  <td>{user.email}</td>
                  <td>
                    <select 
                      value={user.role} 
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="role-select"
                    >
                      <option value="ADMIN">👑 ADMIN</option>
                      <option value="ASPIRANT">🎓 ASPIRANT</option>
                    </select>
                   </td>
                  <td>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                   </td>
                  <td>
                    <div className="admin-table-actions">
                      <button 
                        className="btn btn-delete" 
                        onClick={() => handleDeleteUser(user.id, user.name)}
                      >
                        Delete
                      </button>
                    </div>
                   </td>
                 </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}