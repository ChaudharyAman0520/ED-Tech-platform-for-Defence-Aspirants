import { useEffect, useState } from "react";
import { getOperations, createOperation, updateOperation, deleteOperation } from "../../../services/operationService";

export default function MissionManager() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingMission, setEditingMission] = useState(null);
  
  // Mission form state
  const [missionName, setMissionName] = useState("");
  const [missionYear, setMissionYear] = useState("");
  const [missionLocation, setMissionLocation] = useState("");
  const [missionObjective, setMissionObjective] = useState("");
  const [missionOutcome, setMissionOutcome] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const loadMissions = async () => {
    setLoading(true);
    try {
      const res = await getOperations();
      setMissions(res.data || []);
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

  useEffect(() => { loadMissions(); }, []);

  // Reset form
  const resetForm = () => {
    setMissionName("");
    setMissionYear("");
    setMissionLocation("");
    setMissionObjective("");
    setMissionOutcome("");
    setIsFeatured(false);
    setEditingMission(null);
  };

  // Add or Update Mission - FIXED function name
  const handleSaveMission = async () => {
    if (!missionName.trim()) {
      alert("Mission name is required");
      return;
    }
    if (!missionYear.trim()) {
      alert("Year is required");
      return;
    }
    if (!missionLocation.trim()) {
      alert("Location is required");
      return;
    }
    if (!missionObjective.trim()) {
      alert("Objective is required");
      return;
    }
    if (!missionOutcome.trim()) {
      alert("Outcome is required");
      return;
    }
    
    try {
      const payload = {
        operationName: missionName,
        year: missionYear,
        location: missionLocation,
        objective: missionObjective,
        outcome: missionOutcome,
        featured: isFeatured
      };
      
      if (editingMission) {
      await updateOperation(editingMission.id, payload);
      alert("Mission updated successfully!");
      }
      
      resetForm();
      loadMissions();
      
    } catch (err) {
      console.error("Save error:", err);
      alert(err.response?.data || "Failed to save mission");
    }
  };

  // Delete Mission
  const handleDeleteMission = async (id, name) => {
    if (!window.confirm(`Delete mission "${name}"? This action cannot be undone.`)) return;
    try {
      await deleteOperation(id);
      loadMissions();
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.response?.data || "Failed to delete mission");
    }
  };

  // Edit Mission - populate form
  const handleEditMission = (mission) => {
    setEditingMission(mission);
    setMissionName(mission.operationName);
    setMissionYear(mission.year);
    setMissionLocation(mission.location);
    setMissionObjective(mission.objective);
    setMissionOutcome(mission.outcome);
    setIsFeatured(mission.featured);
    
    // Scroll to form
    document.querySelector('.mission-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="admin-page">
      <h2>⚔️ Military Operations Manager</h2>

      {/* ADD/EDIT MISSION FORM */}
      <div className="admin-section mission-form-section">
        <h3>{editingMission ? "✏️ Edit Mission" : "➕ Add New Military Operation"}</h3>
        
        <div className="admin-form-grid">
          <div className="admin-field">
            <label>🎯 Operation Name *</label>
            <input 
              type="text"
              placeholder="e.g., Operation Vijay"
              value={missionName} 
              onChange={(e) => setMissionName(e.target.value)} 
            />
          </div>
          
          <div className="admin-field">
            <label>📅 Year *</label>
            <input 
              type="text"
              placeholder="e.g., 1999"
              value={missionYear} 
              onChange={(e) => setMissionYear(e.target.value)} 
            />
          </div>
          
          <div className="admin-field admin-field-span">
            <label>📍 Location *</label>
            <input 
              type="text"
              placeholder="e.g., Kargil, Jammu & Kashmir"
              value={missionLocation} 
              onChange={(e) => setMissionLocation(e.target.value)} 
            />
          </div>
          
          <div className="admin-field admin-field-span">
            <label>🎯 Objective *</label>
            <textarea 
              rows="3"
              placeholder="What was the primary goal of this operation?"
              value={missionObjective} 
              onChange={(e) => setMissionObjective(e.target.value)} 
            />
          </div>
          
          <div className="admin-field admin-field-span">
            <label>🏆 Outcome *</label>
            <textarea 
              rows="3"
              placeholder="What was achieved? Casualties, territory gained, strategic impact..."
              value={missionOutcome} 
              onChange={(e) => setMissionOutcome(e.target.value)} 
            />
          </div>
          
          <div className="admin-check">
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <input 
                type="checkbox" 
                checked={isFeatured} 
                onChange={(e) => setIsFeatured(e.target.checked)} 
                style={{ width: "18px", height: "18px", cursor: "pointer" }}
              />
              <span>⭐ Feature this mission on homepage</span>
            </label>
          </div>
          
          <div className="admin-form-actions">
            <button className="admin-btn admin-btn-primary" onClick={handleSaveMission}>
              {editingMission ? "Update Mission" : "Add Mission"}
            </button>
            {editingMission && (
              <button className="admin-btn admin-btn-secondary" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MISSIONS LIST */}
      <div className="admin-section">
        <h3>📋 All Military Operations ({missions.length})</h3>
        
        {loading && <p>Loading missions...</p>}
        
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Operation Name</th>
                <th>Year</th>
                <th>Location</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {missions.map(mission => (
                <tr key={mission.id}>
                  <td>{mission.id}</td>
                  <td>
                    <strong>{mission.operationName}</strong>
                    <br />
                    <small className="admin-cell-muted">Objective: {mission.objective?.substring(0, 60)}...</small>
                  </td>
                  <td>{mission.year}</td>
                  <td>{mission.location}</td>
                  <td>
                    {mission.featured ? (
                      <span className="resource-badge" style={{ background: "rgba(208,169,63,0.2)" }}>⭐ Featured</span>
                    ) : (
                      <span className="resource-badge" style={{ background: "rgba(139,154,70,0.1)" }}>—</span>
                    )}
                   </td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="btn btn-edit" onClick={() => handleEditMission(mission)}>
                        Edit
                      </button>
                      <button className="btn btn-delete" onClick={() => handleDeleteMission(mission.id, mission.operationName)}>
                        Delete
                      </button>
                    </div>
                   </td>
                </tr>
              ))}
              {missions.length === 0 && !loading && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No military operations added yet. Add your first mission above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}