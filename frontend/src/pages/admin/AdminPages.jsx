import NDAManager from "./nda/NDAManager";
import SSBManager from "./ssb/SSBManager";
import MissionManager from "./missions/MissionManager";
import { useState, useEffect } from "react";
import { getSubjects, getStudyResources } from "../../services/ndaService";
import { getOperations } from "../../services/operationService";
import UsersManager from "./users/UsersManager";
import { getUserStats } from "../../services/userService";
import TestManager from "./exam/TestManager";
import QuestionBank from "./exam/QuestionBank";
import PYQManager from "./exam/PYQManager";
import TestResults from "./exam/TestResults";


export const AdminHome = () => {
  const [stats, setStats] = useState({
    subjects: 0,
    resources: 0,
    missions: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [subjectsRes, resourcesRes, missionsRes, usersRes] = await Promise.all([
          getSubjects(),
          getStudyResources(),
          getOperations(),
          getUserStats().catch(() => ({ data: { totalUsers: 0 } })) // Handle error if endpoint missing
        ]);
        
        setStats({
          subjects: subjectsRes.data?.length || 0,
          resources: resourcesRes.data?.length || 0,
          missions: missionsRes.data?.length || 0,
          users: usersRes.data?.totalUsers || 0
        });
      } catch (err) {
        console.error("Stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="admin-page"><p>Loading dashboard...</p></div>;
  }

  return (
    <div className="admin-page">
      <h2>📊 Command Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-value">{stats.subjects}</div>
          <div className="stat-label">NDA Subjects</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📖</div>
          <div className="stat-value">{stats.resources}</div>
          <div className="stat-label">Study Resources</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚔️</div>
          <div className="stat-value">{stats.missions}</div>
          <div className="stat-label">Military Operations</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{stats.users}</div>
          <div className="stat-label">Registered Users</div>
        </div>
      </div>
      <p style={{ marginTop: "24px", color: "var(--text-muted)" }}>
        Select a module from the sidebar to manage your Ed-Tech resources.
      </p>
    </div>
  );
};


export const PYQPage = () => <PYQManager />;
export const TestResultsPage = () => <TestResults />;
export const QuestionBankPage = () => <QuestionBank />;
export const ExamManagementPage = () => <TestManager />;
export const UsersManagementPage = () => <UsersManager />;
export { NDAManager, SSBManager, MissionManager };