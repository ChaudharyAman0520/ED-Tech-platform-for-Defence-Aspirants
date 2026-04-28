import { useEffect, useState } from "react";
import { getMyAttempts } from "../../services/examService";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function MyResults() {
  const [attempts, setAttempts] = useState([]);
  const [filteredAttempts, setFilteredAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await getMyAttempts();
        setAttempts(res.data || []);
        setFilteredAttempts(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  useEffect(() => {
    let filtered = [...attempts];

    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.test?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter === "pass") {
      filtered = filtered.filter(a => (a.percentage || 0) >= 40);
    } else if (statusFilter === "fail") {
      filtered = filtered.filter(a => (a.percentage || 0) < 40);
    }

    if (dateFrom) {
      filtered = filtered.filter(a => 
        a.completedAt && new Date(a.completedAt) >= new Date(dateFrom)
      );
    }
    if (dateTo) {
      filtered = filtered.filter(a => 
        a.completedAt && new Date(a.completedAt) <= new Date(dateTo)
      );
    }

    setFilteredAttempts(filtered);
  }, [searchTerm, statusFilter, dateFrom, dateTo, attempts]);

  const exportToPDF = (attempt) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Test Result", 14, 20);
    doc.setFontSize(12);
    doc.text(`Test: ${attempt.test?.title || "Unknown Test"}`, 14, 40);
    doc.text(`Date: ${attempt.completedAt ? new Date(attempt.completedAt).toLocaleString() : "--"}`, 14, 50);
    doc.text(`Score: ${attempt.score} / ${attempt.test?.totalMarks || 0}`, 14, 60);
    doc.text(`Percentage: ${attempt.percentage}%`, 14, 70);
    doc.text(`Status: ${(attempt.percentage || 0) >= 40 ? "PASSED" : "FAILED"}`, 14, 80);
    doc.save(`test_result_${attempt.test?.title || "attempt"}_${attempt.id}.pdf`);
  };

  const exportAllToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("All Test Results", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    
    const tableData = filteredAttempts.map((a, idx) => [
      idx + 1,
      a.test?.title || "Unknown",
      a.completedAt ? new Date(a.completedAt).toLocaleDateString() : "--",
      `${a.score}/${a.test?.totalMarks || 0}`,
      `${a.percentage}%`,
      (a.percentage || 0) >= 40 ? "Pass" : "Fail"
    ]);
    
    doc.autoTable({
      startY: 40,
      head: [["#", "Test Name", "Date", "Score", "Percentage", "Status"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [208, 169, 63] },
    });
    
    doc.save("all_my_results.pdf");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFrom("");
    setDateTo("");
  };

  if (loading) return <div className="loading-state">Loading results...</div>;

  return (
    <div className="aspirant-container">
      <div className="page-header">
        <h2>My Test Results</h2>
        <p>Track your performance across all tests</p>
      </div>

      {filteredAttempts.length > 0 && (
        <div className="flex-right">
          <button onClick={exportAllToPDF} className="btn-primary">Export All to PDF</button>
        </div>
      )}

      {/* Filters */}
      <div className="filters-bar">
      <div className="filter-grid">
        <div className="filter-item">
          <label>Search Test Name</label>
          <input
            type="text"
            placeholder="Enter test name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label>Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pass">Passed Only</option>
            <option value="fail">Failed Only</option>
          </select>
        </div>
        <div className="filter-item">
          <label>From Date</label>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        </div>
        <div className="filter-item">
          <label>To Date</label>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
        </div>
      </div>
      <div className="filter-actions">
        <button onClick={clearFilters} className="btn-secondary btn-sm">Clear Filters</button>
        <span className="filter-count">{filteredAttempts.length} of {attempts.length} results shown</span>
      </div>
    </div>

      {/* Results Table */}
      {filteredAttempts.length === 0 ? (
        <div className="empty-state">
          <p>No test results found matching your filters.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="results-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttempts.map(attempt => (
                <tr key={attempt.id}>
                  <td>{attempt.test?.title || "Unknown Test"}</td>
                  <td>{attempt.score} / {attempt.test?.totalMarks || 0}</td>
                  <td>{attempt.percentage}%</td>
                  <td className={attempt.percentage >= 40 ? "status-pass" : "status-fail"}>
                    {attempt.percentage >= 40 ? "PASSED" : "FAILED"}
                  </td>
                  <td>{attempt.completedAt ? new Date(attempt.completedAt).toLocaleDateString() : "--"}</td>
                  <td>
                    <button onClick={() => exportToPDF(attempt)} className="btn-small">Export PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}