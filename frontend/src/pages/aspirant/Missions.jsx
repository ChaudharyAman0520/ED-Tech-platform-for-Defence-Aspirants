import { useEffect, useState } from "react";
import { getOperations } from "../../services/operationService";

export default function Missions() {
  const [missions, setMissions] = useState([]);
  const [filteredMissions, setFilteredMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const res = await getOperations();
        setMissions(res.data || []);
        setFilteredMissions(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMissions();
  }, []);

  useEffect(() => {
    let filtered = [...missions];
    
    if (selectedYear !== "all") {
      filtered = filtered.filter(m => m.year === selectedYear);
    }
    
    if (showFeaturedOnly) {
      filtered = filtered.filter(m => m.featured);
    }
    
    setFilteredMissions(filtered);
  }, [selectedYear, showFeaturedOnly, missions]);

  const years = [...new Set(missions.map(m => m.year))].sort();

  if (loading) return <div className="loading-state">Loading missions...</div>;

  return (
    <div className="aspirant-container">
      <div className="page-header">
        <h2>Indian Military Operations</h2>
        <p>Browse through India's historic military operations and missions</p>
      </div>

      {/* Filters */}
      <div className="filters-bar">
      <div className="filter-group">
        <div className="filter-item">
          <label>Year</label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="all">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-item checkbox-item">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={showFeaturedOnly} 
              onChange={(e) => setShowFeaturedOnly(e.target.checked)}
            />
            <span>Show Featured Only</span>
          </label>
        </div>
        
        <div className="filter-count">
          {filteredMissions.length} missions found
        </div>
      </div>
    </div>
      {/* Missions Grid */}
      <div className="grid-auto">
        {filteredMissions.map(mission => (
          <div 
            key={mission.id} 
            className={`mission-card ${mission.featured ? 'featured' : ''}`}
            onClick={() => setSelectedMission(mission)}
          >
            <div className="mission-year">{mission.year}</div>
            <h3 className="mission-name">{mission.operationName}</h3>
            <div className="mission-location">{mission.location}</div>
            <p className="mission-objective-preview">
              {mission.objective?.substring(0, 120)}...
            </p>
            <div className="card-link">Click to read more →</div>
          </div>
        ))}
      </div>

      {filteredMissions.length === 0 && (
        <div className="empty-state">
          <p>No missions found for the selected filters.</p>
        </div>
      )}

      {/* Modal for Mission Details */}
      {selectedMission && (
        <div className="mission-modal-overlay" onClick={() => setSelectedMission(null)}>
          <div className="mission-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-year">{selectedMission.year}</span>
              <button className="modal-close" onClick={() => setSelectedMission(null)}>×</button>
            </div>
            <h2>{selectedMission.operationName}</h2>
            <p className="text-muted">{selectedMission.location}</p>
            <div className="modal-section">
              <h4>Objective</h4>
              <p>{selectedMission.objective}</p>
            </div>
            <div className="modal-section">
              <h4>Outcome</h4>
              <p>{selectedMission.outcome}</p>
            </div>
            {selectedMission.featured && (
              <div className="modal-badge">Featured Operation</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}