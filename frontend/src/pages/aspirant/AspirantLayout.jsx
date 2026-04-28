import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../style/pages/aspirant.css";
import "../../style/layouts/aspirant-layout.css";


export default function AspirantLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/study-materials", label: "Study Materials", icon: "📚" },
    { path: "/pyq", label: "PYQ Papers", icon: "📄" },
    { path: "/missions", label: "Military Operations", icon: "⚔️" },
    { path: "/ssb-prep", label: "SSB Preparation", icon: "🎯" },
    { path: "/available-tests", label: "Take Tests", icon: "📝" },
    { path: "/my-results", label: "My Results", icon: "📊" },
  ];

  const getUserName = () => {
    const token = localStorage.getItem("token");
    if (!token) return "Aspirant";
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.name || "Aspirant";
    } catch {
      return "Aspirant";
    }
  };

  const getTitle = (path) => {
    const titles = {
      "/dashboard": "Dashboard",
      "/study-materials": "Study Materials",
      "/pyq": "PYQ Papers",
      "/missions": "Military Operations",
      "/ssb-prep": "SSB Preparation",
      "/available-tests": "Available Tests",
      "/my-results": "My Results",
    };
    return titles[path] || "Aspirant Portal";
  };

  return (
    <div className="aspirant-root">
      <aside className={`aspirant-sidebar ${sidebarOpen ? "" : "collapsed"}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-main">NDAPREP</span>
            {sidebarOpen && <span className="logo-sub">Aspirant Portal</span>}
          </div>
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            {sidebarOpen && <span className="nav-label">Logout</span>}
          </button>
        </div>
      </aside>

      <main className="aspirant-main">
        <header className="aspirant-header">
          <div className="header-title">
            <h1>{getTitle(location.pathname)}</h1>
          </div>
          <div className="header-user">
            <span className="user-name">Hello, {getUserName()}</span>
          </div>
        </header>
        <div className="aspirant-content">
          {children}
        </div>
      </main>
    </div>
  );
}