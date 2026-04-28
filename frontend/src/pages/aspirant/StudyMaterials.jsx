import { useEffect, useState } from "react";
import { getSubjects, getStudyResources } from "../../services/ndaService";

export default function StudyMaterials() {
  const [subjects, setSubjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, resRes] = await Promise.all([
          getSubjects(),
          getStudyResources()
        ]);
        setSubjects(subRes.data || []);
        setResources(resRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredResources = selectedSubject === "all" 
    ? resources 
    : resources.filter(r => r.subject?.id === parseInt(selectedSubject));

  if (loading) return <div className="loading-state">Loading resources...</div>;

  return (
    <div className="aspirant-container">
      <div className="page-header">
        <h2>Study Materials</h2>
        <p>Comprehensive resources for NDA, CDS, and AFCAT preparation</p>
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
        {filteredResources.map(r => (
          <div key={r.id} className="resource-card">
            <h3>{r.title}</h3>
            {r.description && <p className="resource-description">{r.description}</p>}
            <div className="resource-meta">
              <span>Subject: {r.subjectName || r.subject?.name}</span>
              <span>Type: {r.resourceType}</span>
            </div>
            <a href={r.url} target="_blank" rel="noopener noreferrer" className="resource-link">
              Open Resource →
            </a>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="empty-state">
          <p>No resources found for the selected subject.</p>
        </div>
      )}
    </div>
  );
}