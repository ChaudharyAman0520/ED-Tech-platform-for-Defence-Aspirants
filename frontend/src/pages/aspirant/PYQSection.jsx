import { useEffect, useState } from "react";
import { getPYQs, getSubjects } from "../../services/ndaService";

export default function PYQSection() {
  const [pyqs, setPyqs] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pyqRes, subRes] = await Promise.all([
          getPYQs(),
          getSubjects()
        ]);
        setPyqs(pyqRes.data || []);
        setSubjects(subRes.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const filtered = selectedSubject === "all" 
    ? pyqs 
    : pyqs.filter(p => p.subject?.id === parseInt(selectedSubject));

  return (
    <div className="aspirant-container">
      <div className="page-header">
        <h2>PYQ Papers</h2>
        <p>Previous Year Question Papers for NDA examination</p>
      </div>

      <div className="filter-section">
        <select 
          value={selectedSubject} 
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Subjects</option>
          {subjects.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="grid-auto">
        {filtered.map(p => (
          <div key={p.id} className="resource-card">
            <h3>{p.year} - {p.session}</h3>
            <p className="resource-subject">Subject: {p.subjectName || p.subject?.name}</p>
            <a href={p.pdfUrl} target="_blank" rel="noopener noreferrer" className="resource-link">
              Download PDF →
            </a>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <p>No PYQ papers available.</p>
        </div>
      )}
    </div>
  );
}