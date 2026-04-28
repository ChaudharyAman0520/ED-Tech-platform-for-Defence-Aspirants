import { useEffect, useState } from "react";
import {
  getSSBStages, createSSBStage, updateSSBStage, deleteSSBStage,
  getSSBTests, createSSBTest, updateSSBTest, deleteSSBTest
} from "../../../services/ssbService";

export default function SSBManager() {
  const [stages, setStages] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Edit state
  const [editStage, setEditStage] = useState(null);
  const [editTest, setEditTest] = useState(null);
  
  // Form state
  const [stageForm, setStageForm] = useState({ stageName: "", dayNumber: "", description: "" });
  const [testForm, setTestForm] = useState({ testName: "", description: "", tips: "", stageId: "" });

  const loadData = async () => {
    setLoading(true);
    try {
      const [stagesRes, testsRes] = await Promise.all([
        getSSBStages(),
        getSSBTests()
      ]);
      setStages(stagesRes.data || []);
      setTests(testsRes.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // Stage CRUD
  const resetStageForm = () => {
    setStageForm({ stageName: "", dayNumber: "", description: "" });
    setEditStage(null);
  };

  const handleStageSubmit = async (e) => {
    e.preventDefault();
    if (!stageForm.stageName) return;
    
    try {
      const payload = {
        stageName: stageForm.stageName,
        dayNumber: parseInt(stageForm.dayNumber) || 0,
        description: stageForm.description
      };
      
      if (editStage) {
        await updateSSBStage(editStage.id, payload);
      } else {
        await createSSBStage(payload);
      }
      resetStageForm();
      loadData();
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Operation failed");
    }
  };

  const handleDeleteStage = async (id, name) => {
    if (!window.confirm(`Delete stage "${name}"? This will also delete all linked tests.`)) return;
    try {
      await deleteSSBStage(id);
      loadData();
    } catch (err) {
      alert(err.response?.data || "Cannot delete stage with linked tests");
    }
  };

  // Test CRUD
  const resetTestForm = () => {
    setTestForm({ testName: "", description: "", tips: "", stageId: "" });
    setEditTest(null);
  };

  const handleTestSubmit = async (e) => {
    e.preventDefault();
    if (!testForm.testName || !testForm.stageId) {
      alert("Test name and Stage are required");
      return;
    }
    
    try {
      const payload = {
        testName: testForm.testName,
        description: testForm.description,
        tips: testForm.tips,
        stage: { id: parseInt(testForm.stageId) }
      };
      
      if (editTest) {
        await updateSSBTest(editTest.id, payload);
      } else {
        await createSSBTest(payload);
      }
      resetTestForm();
      loadData();
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to add/update test");
    }
  };

  const handleDeleteTest = async (id, name) => {
    if (!window.confirm(`Delete test "${name}"?`)) return;
    try {
      await deleteSSBTest(id);
      loadData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // Helper
  const getStageName = (stageId) => {
    const stage = stages.find(s => s.id === stageId);
    return stage?.stageName || "Unknown";
  };

  if (loading && stages.length === 0) {
    return <div className="admin-page">Loading SSB Data...</div>;
  }

  return (
    <div className="admin-page">
      <h2>🎖️ SSB Command Center</h2>

      {/* STAGE FORM */}
      <div className="admin-section">
        <h3>{editStage ? "✏️ Edit Stage" : "➕ Add New Stage"}</h3>
        <form onSubmit={handleStageSubmit} className="admin-form-grid">
          <div className="admin-field">
            <label>Stage Name</label>
            <input
              type="text"
              placeholder="e.g., Screening Test"
              value={stageForm.stageName}
              onChange={(e) => setStageForm({...stageForm, stageName: e.target.value})}
              required
            />
          </div>
          <div className="admin-field">
            <label>Day Number (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Day"
              value={stageForm.dayNumber}
              onChange={(e) => setStageForm({...stageForm, dayNumber: e.target.value})}
            />
          </div>
          <div className="admin-field admin-field-span">
            <label>Description</label>
            <textarea
              rows="3"
              placeholder="Stage overview, key activities..."
              value={stageForm.description}
              onChange={(e) => setStageForm({...stageForm, description: e.target.value})}
            />
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-primary">
              {editStage ? "Update Stage" : "Create Stage"}
            </button>
            {editStage && (
              <button type="button" className="admin-btn admin-btn-secondary" onClick={resetStageForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* STAGES LIST */}
      <div className="admin-section">
        <h3>📋 SSB Stages</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Stage Name</th>
                <th>Day</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stages.map(stage => (
                <tr key={stage.id}>
                  <td>{stage.id}</td>
                  <td><strong>{stage.stageName}</strong></td>
                  <td>{stage.dayNumber || "—"}</td>
                  <td className="admin-cell-muted">{stage.description?.substring(0, 80)}...</td>
                  <td>
                    <div className="admin-table-actions">
                      <button 
                        className="admin-btn admin-btn-secondary" 
                        onClick={() => {
                          setEditStage(stage);
                          setStageForm({
                            stageName: stage.stageName,
                            dayNumber: stage.dayNumber || "",
                            description: stage.description || ""
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        className="admin-btn admin-btn-danger" 
                        onClick={() => handleDeleteStage(stage.id, stage.stageName)}
                      >
                        Delete
                      </button>
                    </div>
                   </td>
                </tr>
              ))}
              {stages.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: "center" }}>No stages added yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <hr />

      {/* TEST FORM */}
      <div className="admin-section">
        <h3>{editTest ? "✏️ Edit Test" : "📝 Add New Psychological Test"}</h3>
        <form onSubmit={handleTestSubmit} className="admin-form-grid">
          <div className="admin-field">
            <label>Test Name</label>
            <input
              type="text"
              placeholder="e.g., TAT, WAT, SRT, GTO Tasks"
              value={testForm.testName}
              onChange={(e) => setTestForm({...testForm, testName: e.target.value})}
              required
            />
          </div>
          <div className="admin-field">
            <label>Associated Stage</label>
            <select 
              value={testForm.stageId} 
              onChange={(e) => setTestForm({...testForm, stageId: e.target.value})}
              required
            >
              <option value="">Select Stage</option>
              {stages.map(s => (
                <option key={s.id} value={s.id}>{s.stageName}</option>
              ))}
            </select>
          </div>
          <div className="admin-field admin-field-span">
            <label>Description</label>
            <textarea
              rows="3"
              placeholder="What this test evaluates, procedure, duration..."
              value={testForm.description}
              onChange={(e) => setTestForm({...testForm, description: e.target.value})}
            />
          </div>
          <div className="admin-field admin-field-span">
            <label>💡 Tips for Aspirants</label>
            <textarea
              rows="2"
              placeholder="Key strategies, common mistakes, preparation advice..."
              value={testForm.tips}
              onChange={(e) => setTestForm({...testForm, tips: e.target.value})}
            />
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-primary">
              {editTest ? "Update Test" : "Add Test"}
            </button>
            {editTest && (
              <button type="button" className="admin-btn admin-btn-secondary" onClick={resetTestForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TESTS LIST */}
      <div className="admin-section">
        <h3>📚 Tests & Assessments</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Stage</th>
                <th>Description</th>
                <th>Tips</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map(test => (
                <tr key={test.id}>
                  <td><strong>{test.testName}</strong></td>
                  <td>{test.stageName || getStageName(test.stage?.id)}</td>
                  <td className="admin-cell-muted">{test.description?.substring(0, 60)}...</td>
                  <td className="admin-cell-muted">{test.tips?.substring(0, 50)}...</td>
                  <td>
                    <div className="admin-table-actions">
                      <button 
                        className="admin-btn admin-btn-secondary"
                        onClick={() => {
                          setEditTest(test);
                          setTestForm({
                            testName: test.testName,
                            description: test.description || "",
                            tips: test.tips || "",
                            stageId: test.stage?.id || ""
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        className="admin-btn admin-btn-danger"
                        onClick={() => handleDeleteTest(test.id, test.testName)}
                      >
                        Delete
                      </button>
                    </div>
                   </td>
                </tr>
              ))}
              {tests.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: "center" }}>No tests added yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}