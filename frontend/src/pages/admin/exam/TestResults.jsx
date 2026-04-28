import { useEffect, useState } from "react";
import { getAllAttempts, getAttemptsByTest } from "../../../services/examService";
import { getAllTests } from "../../../services/examService";
import { getAllUsers } from "../../../services/userService";

export default function TestResults() {
  const [attempts, setAttempts] = useState([]);
  const [tests, setTests] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("attempts"); // "attempts" or "aspirants"
  
  const [stats, setStats] = useState({
    totalAttempts: 0,
    totalAspirants: 0,
    averageScore: 0,
    highestScore: 0,
    lowestScore: 100,
    passRate: 0
  });

  const [aspirantStats, setAspirantStats] = useState([]);

  const loadTests = async () => {
    try {
      const res = await getAllTests();
      setTests(res.data || []);
    } catch (err) {
      console.error("Load tests error:", err);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.error("Load users error:", err);
    }
  };

  const calculateAspirantStats = (attemptsData) => {
    // Group attempts by user
    const userMap = new Map();
    
    attemptsData.forEach(attempt => {
      const userId = attempt.user?.id;
      if (!userId) return;
      
      if (!userMap.has(userId)) {
        userMap.set(userId, {
          userId: userId,
          userName: attempt.user?.name || "Unknown",
          userEmail: attempt.user?.email || "",
          totalAttempts: 0,
          totalScore: 0,
          totalPossibleScore: 0,
          bestScore: 0,
          attemptsList: []
        });
      }
      
      const userStats = userMap.get(userId);
      userStats.totalAttempts++;
      userStats.totalScore += attempt.score || 0;
      userStats.totalPossibleScore += attempt.test?.totalMarks || 0;
      userStats.bestScore = Math.max(userStats.bestScore, attempt.percentage || 0);
      userStats.attemptsList.push(attempt);
    });
    
    // Calculate averages and convert to array
    const aspirantArray = Array.from(userMap.values()).map(user => ({
      ...user,
      averagePercentage: user.totalPossibleScore > 0 
        ? Math.round((user.totalScore / user.totalPossibleScore) * 100) 
        : 0
    })).sort((a, b) => b.averagePercentage - a.averagePercentage);
    
    setAspirantStats(aspirantArray);
  };

  const calculateStats = (data) => {
    if (data.length === 0) {
      setStats({ totalAttempts: 0, totalAspirants: 0, averageScore: 0, highestScore: 0, lowestScore: 100, passRate: 0 });
      setAspirantStats([]);
      return;
    }
    
    const scores = data.map(a => a.percentage || 0);
    const uniqueAspirants = new Set(data.map(a => a.user?.id)).size;
    const totalAttempts = data.length;
    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / totalAttempts);
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);
    const passCount = scores.filter(s => s >= 40).length;
    const passRate = Math.round((passCount / totalAttempts) * 100);
    
    setStats({ 
      totalAttempts, 
      totalAspirants: uniqueAspirants, 
      averageScore, 
      highestScore, 
      lowestScore, 
      passRate 
    });
    
    calculateAspirantStats(data);
  };

  const loadAllAttempts = async () => {
    setLoading(true);
    try {
      const res = await getAllAttempts();
      setAttempts(res.data || []);
      calculateStats(res.data || []);
    } catch (err) {
      console.error("Load attempts error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadAttemptsByTest = async (testId) => {
    if (!testId) {
      loadAllAttempts();
      return;
    }
    setLoading(true);
    try {
      const res = await getAttemptsByTest(testId);
      setAttempts(res.data || []);
      calculateStats(res.data || []);
    } catch (err) {
      console.error("Load attempts error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTests();
    loadUsers();
    loadAllAttempts();
  }, []);

  const handleTestFilter = (testId) => {
    setSelectedTestId(testId);
    loadAttemptsByTest(testId);
  };

  const getTestName = (testId) => {
    const test = tests.find(t => t.id === testId);
    return test?.title || "Unknown Test";
  };

  return (
    <div className="admin-page">
      <h2>📊 Test Results & Analytics</h2>

      {/* Filter Section */}
      <div className="admin-section">
        <h3>🔍 Filter by Test</h3>
        <div className="flex-row">
          <select 
            className="admin-input" 
            value={selectedTestId} 
            onChange={(e) => handleTestFilter(e.target.value)}
            style={{ minWidth: "250px" }}
          >
            <option value="">All Tests</option>
            {tests.map(t => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
          <span className="admin-badge">{stats.totalAttempts} attempts</span>
        </div>
      </div>

      {/* Statistics Cards - Updated */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-value">{stats.totalAttempts}</div>
          <div className="stat-label">Total Test Attempts</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{stats.totalAspirants}</div>
          <div className="stat-label">Aspirants Attempted</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{stats.averageScore}%</div>
          <div className="stat-label">Avg Score (Per Attempt)</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-value">{stats.highestScore}%</div>
          <div className="stat-label">Highest Score</div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="admin-section">
        <div className="flex-row">
          <button 
            className={`view-mode-btn ${viewMode === "attempts" ? "active" : ""}`}
            onClick={() => setViewMode("attempts")}
          >
            📋 By Attempts
          </button>
          <button 
            className={`view-mode-btn ${viewMode === "aspirants" ? "active" : ""}`}
            onClick={() => setViewMode("aspirants")}
          >
            👥 By Aspirant
          </button>
        </div>
      </div>

      {/* ASPIRANT WISE STATS TABLE */}
      {viewMode === "aspirants" && (
        <div className="admin-section">
          <h3>👨‍🎓 Aspirant Wise Performance</h3>
          <p className="admin-sub">Each aspirant's total attempts, average score, and best performance</p>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Aspirant Name</th>
                  <th>Email</th>
                  <th>Total Tests Taken</th>
                  <th>Average Score</th>
                  <th>Best Score</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {aspirantStats.map((asp, index) => (
                  <tr key={asp.userId}>
                    <td>{index + 1}</td>
                    <td><strong>{asp.userName}</strong></td>
                    <td>{asp.userEmail}</td>
                    <td>{asp.totalAttempts}</td>
                    <td>
                      <span className={`percentage-badge ${asp.averagePercentage >= 40 ? 'pass' : 'fail'}`}>
                        {asp.averagePercentage}%
                      </span>
                    </td>
                    <td>{asp.bestScore}%</td>
                    <td>
                      <div className="performance-bar">
                        <div className="performance-fill" style={{ width: `${asp.averagePercentage}%` }}></div>
                      </div>
                    </td>
                  </tr>
                ))}
                {aspirantStats.length === 0 && !loading && (
                  <tr><td colSpan="7" style={{ textAlign: "center" }}>No aspirants have taken any test yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ATTEMPTS TABLE (Detailed) */}
      {viewMode === "attempts" && (
        <div className="admin-section">
          <h3>📋 Detailed Attempt History</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Aspirant</th>
                  <th>Test Name</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Status</th>
                  <th>Completed On</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map(attempt => (
                  <tr key={attempt.id}>
                    <td>{attempt.id}</td>
                    <td><strong>{attempt.user?.name || "Unknown"}</strong></td>
                    <td>{getTestName(attempt.test?.id)}</td>
                    <td>{attempt.score}/{attempt.test?.totalMarks || "—"}</td>
                    <td>
                      <span className={`percentage-badge ${(attempt.percentage || 0) >= 40 ? 'pass' : 'fail'}`}>
                        {attempt.percentage || 0}%
                      </span>
                    </td>
                    <td>{(attempt.percentage || 0) >= 40 ? "✅ Passed" : "❌ Failed"}</td>
                    <td>{attempt.completedAt ? new Date(attempt.completedAt).toLocaleString() : "—"}</td>
                  </tr>
                ))}
                {attempts.length === 0 && !loading && (
                  <tr><td colSpan="7" style={{ textAlign: "center" }}>No test attempts yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}