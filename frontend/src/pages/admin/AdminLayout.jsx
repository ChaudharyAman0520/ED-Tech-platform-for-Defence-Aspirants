import { useState } from "react";
import "../../style/layouts/admin-layout.css";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", sub: "Overview" },
  { id: "content", label: "Content", sub: "Subjects & Resources" },
  { id: "question-bank", label: "Question Bank", sub: "Create Questions" },
  { id: "exams", label: "Tests", sub: "Manage Tests" },
  { id: "pyq", label: "PYQ Papers", sub: "Past Year Questions" },
  { id: "test-results", label: "Test Results", sub: "Analytics" },
  { id: "missions", label: "Missions", sub: "Military Operations" },  
  { id: "ssb", label: "SSB", sub: "Stages & Tests" },
  { id: "users", label: "Users", sub: "Aspirants" },
];

export default function AdminLayout({ activePage, onNavigate, children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-root">

      <nav className="admin-navbar">
        <div className="nav-left">
          <button className="collapse-btn" onClick={() => setCollapsed(c => !c)}>
            {collapsed ? "▶" : "◀"}
          </button>

          <div className="logo-text">
            <span className="logo-main">NDAPREP</span>
            <span className="logo-sub">Admin Panel</span>
          </div>
        </div>

        <div className="nav-center">
          <span className="admin-badge">Admin Access</span>
        </div>

        <div className="nav-right">
          <span className="admin-user">Admin</span>
          <button className="logout-btn" onClick={() => onNavigate("logout")}>
            Logout
          </button>
        </div>
      </nav>

      <div className="admin-body">

        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
          <div className="sidebar-header">
            {!collapsed && <span className="sidebar-title">Menu</span>}
          </div>

          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              {!collapsed && (
                <div className="nav-labels">
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-sub">{item.sub}</span>
                </div>
              )}
            </button>
          ))}

          <div className="sidebar-footer">
            <button className="nav-item" onClick={() => onNavigate("logout")}>
              {!collapsed && <span className="nav-label logout-text">Logout</span>}
            </button>
          </div>
        </aside>

        <main className="admin-main">
          {children}
        </main>

      </div>
    </div>
  );
}