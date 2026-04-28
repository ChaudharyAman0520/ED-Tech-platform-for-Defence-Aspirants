import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedOperations } from "../../services/operationService";
import { getStudyResources } from "../../services/ndaService";
import { getAllTests } from "../../services/examService";
import { getMyAttempts } from "../../services/examService";

export default function Dashboard() {
  const [featuredMissions, setFeaturedMissions] = useState([]);
  const [resourcesCount, setResourcesCount] = useState(0);
  const [availableTests, setAvailableTests] = useState([]);
  const [recentResults, setRecentResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [missionsRes, resourcesRes, testsRes, attemptsRes] = await Promise.all([
          getFeaturedOperations(),
          getStudyResources(),
          getAllTests(),
          getMyAttempts().catch(() => ({ data: [] }))
        ]);
        
        setFeaturedMissions(missionsRes.data || []);
        setResourcesCount(resourcesRes.data?.length || 0);
        setAvailableTests(testsRes.data || []);
        setRecentResults(attemptsRes.data || []);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const totalTestsTaken = recentResults.length;
  const averageScore = recentResults.length > 0 
    ? Math.round(recentResults.reduce((sum, a) => sum + (a.percentage || 0), 0) / recentResults.length)
    : 0;

  if (loading) {
    return <div className="loading-state">Loading dashboard...</div>;
  }

  return (
    <>
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-value">{resourcesCount}+</div>
          <div className="stat-label">Study Resources</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-value">{totalTestsTaken}</div>
          <div className="stat-label">Tests Taken</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{averageScore}%</div>
          <div className="stat-label">Average Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{availableTests.length}</div>
          <div className="stat-label">Available Tests</div>
        </div>
      </div>

      {/* Featured Missions */}
      <div className="section-header">
        <h2>Featured Military Operations</h2>
        <Link to="/missions" className="view-all">View All →</Link>
      </div>
      <div className="grid-auto">
        {featuredMissions.slice(0, 3).map(mission => (
          <div key={mission.id} className="mission-card featured">
            <div className="mission-year">{mission.year}</div>
            <div className="mission-name">{mission.operationName}</div>
            <div className="mission-location">{mission.location}</div>
          </div>
        ))}
        {featuredMissions.length === 0 && (
          <div className="mission-card">
            <p className="text-muted">No featured missions yet.</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="section-header">
        <h2>Quick Actions</h2>
      </div>
      <div className="action-grid">
        <Link to="/study-materials" className="action-card">
          <div className="action-icon">📚</div>
          <div className="action-title">Study Materials</div>
          <div className="action-sub">Browse resources by subject</div>
        </Link>
        <Link to="/available-tests" className="action-card">
          <div className="action-icon">📝</div>
          <div className="action-title">Take a Test</div>
          <div className="action-sub">{availableTests.length} tests available</div>
        </Link>
        <Link to="/ssb-prep" className="action-card">
          <div className="action-icon">🎯</div>
          <div className="action-title">SSB Preparation</div>
          <div className="action-sub">Stages, tests and tips</div>
        </Link>
      </div>

      {/* Recent Results */}
      {recentResults.length > 0 && (
        <>
          <div className="section-header">
            <h2>Recent Test Results</h2>
            <Link to="/my-results" className="view-all">View All →</Link>
          </div>
          <table className="results-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentResults.slice(0, 5).map(attempt => (
                <tr key={attempt.id}>
                  <td>{attempt.test?.title || "Unknown Test"}</td>
                  <td>{attempt.score}/{attempt.test?.totalMarks || 0}</td>
                  <td>{attempt.percentage}%</td>
                  <td className={attempt.percentage >= 40 ? "status-pass" : "status-fail"}>
                    {attempt.percentage >= 40 ? "Passed" : "Failed"}
                  </td>
                  <td>{attempt.completedAt ? new Date(attempt.completedAt).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}