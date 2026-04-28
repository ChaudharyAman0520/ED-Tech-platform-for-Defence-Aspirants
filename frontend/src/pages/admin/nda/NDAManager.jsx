import { useEffect, useState } from "react";
import {
  getSubjects, 
  createSubject, 
  deleteSubject,
  getStudyResources, 
  createStudyResource, 
  updateStudyResource,
  deleteStudyResource
} from "../../../services/ndaService";

export default function NDAManager() {
  const [subjects, setSubjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [editingResource, setEditingResource] = useState(null);
  
  // Resource form state
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceUrl, setResourceUrl] = useState("");
  const [resourceDescription, setResourceDescription] = useState("");
  const [resourceType, setResourceType] = useState("PDF");
  const [selectedSubject, setSelectedSubject] = useState("");

  const loadData = async () => {
    try {
      const [sub, res] = await Promise.all([
        getSubjects(),
        getStudyResources()
      ]);
      setSubjects(sub.data || []);
      setResources(res.data || []);
    } catch (err) {
      console.error("Load error:", err);
      if (err.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => { loadData(); }, []);

  // Subject CRUD
  const addSubject = async () => {
    if (!subjectName.trim()) return;
    try {
      await createSubject({ name: subjectName });
      setSubjectName("");
      loadData();
    } catch (err) {
      alert("Failed to add subject");
    }
  };

  const removeSubject = async (id) => {
    if (!window.confirm("Delete subject? All linked resources will be orphaned.")) return;
    try {
      await deleteSubject(id);
      loadData();
    } catch (err) {
      alert("Subject has resources linked. Delete resources first.");
    }
  };

  // Resource CRUD
  const resetResourceForm = () => {
    setResourceTitle("");
    setResourceUrl("");
    setResourceDescription("");
    setResourceType("PDF");
    setSelectedSubject("");
    setEditingResource(null);
  };

  const addOrUpdateResource = async () => {
    if (!resourceTitle.trim()) {
      alert("Title is required");
      return;
    }
    if (!resourceUrl.trim()) {
      alert("URL is required");
      return;
    }
    if (!selectedSubject) {
      alert("Please select a subject");
      return;
    }
    
    try {
      const subjectObj = subjects.find(s => s.id === parseInt(selectedSubject));
      if (!subjectObj) {
        alert("Selected subject not found");
        return;
      }
      
      const payload = {
        title: resourceTitle,
        url: resourceUrl,
        description: resourceDescription,
        resourceType: resourceType,
        subject: { id: subjectObj.id }
      };
      
      if (editingResource) {
        // Update existing resource
        console.log("Updating resource:", editingResource.id, payload);
        await updateStudyResource(editingResource.id, payload);
      } else {
        // Create new resource
        console.log("Creating resource:", payload);
        await createStudyResource(payload);
      }
      
      resetResourceForm();
      loadData();
      
    } catch (err) {
      console.error("Save error:", err);
      alert(err.response?.data || "Failed to save resource");
    }
  };

  const removeResource = async (id, title) => {
    if (!window.confirm(`Delete resource "${title}"?`)) return;
    try {
      await deleteStudyResource(id);
      loadData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const editResource = (resource) => {
    setEditingResource(resource);
    setResourceTitle(resource.title);
    setResourceUrl(resource.url || "");
    setResourceDescription(resource.description || "");
    setResourceType(resource.resourceType || "PDF");
    setSelectedSubject(resource.subject?.id?.toString() || "");
  };

  // Resource type options
  const resourceTypes = ["PDF", "Video", "Website", "Document", "E-Book", "Lecture Notes"];

  return (
    <div className="admin-page">
      <h2>📚 NDA Content Manager</h2>

      {/* ==================== SUBJECTS SECTION ==================== */}
      <div className="admin-section">
        <h3>📖 Manage Subjects</h3>
        <div className="flex-row">
          <input 
            className="admin-input" 
            placeholder="Subject Name (e.g., Mathematics, GAT)" 
            value={subjectName} 
            onChange={(e) => setSubjectName(e.target.value)} 
            style={{ flex: 1 }}
          />
          <button className="btn btn-add" onClick={addSubject}>Add Subject</button>
        </div>
        
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Subject Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(s => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td><strong>{s.name}</strong></td>
                  <td>
                    <button className="btn btn-delete" onClick={() => removeSubject(s.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {subjects.length === 0 && (
                <tr><td colSpan="3" style={{ textAlign: "center" }}>No subjects added yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================== RESOURCES SECTION ==================== */}
      <div className="admin-section">
        <h3>{editingResource ? "✏️ Edit Resource" : "➕ Add New Resource"}</h3>
        
        <div className="admin-form-grid">
          {/* Title */}
          <div className="admin-field admin-field-span">
            <label>📌 Title *</label>
            <input 
              type="text"
              placeholder="e.g., Complete Mathematics Notes for NDA"
              value={resourceTitle} 
              onChange={(e) => setResourceTitle(e.target.value)} 
            />
          </div>
          
          {/* URL */}
          <div className="admin-field admin-field-span">
            <label>🔗 URL / Link *</label>
            <input 
              type="url"
              placeholder="https://example.com/resource.pdf"
              value={resourceUrl} 
              onChange={(e) => setResourceUrl(e.target.value)} 
            />
          </div>
          
          {/* Subject & Type - Row */}
          <div className="admin-field">
            <label>📚 Subject *</label>
            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
              <option value="">-- Select Subject --</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          
          <div className="admin-field">
            <label>📄 Resource Type</label>
            <select value={resourceType} onChange={(e) => setResourceType(e.target.value)}>
              {resourceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {/* Description */}
          <div className="admin-field admin-field-span">
            <label>💬 Description</label>
            <textarea 
              rows="3"
              placeholder="Brief description of the resource content..."
              value={resourceDescription} 
              onChange={(e) => setResourceDescription(e.target.value)} 
            />
          </div>
          
          {/* Form Actions */}
          <div className="admin-form-actions">
            <button className="admin-btn admin-btn-primary" onClick={addOrUpdateResource}>
              {editingResource ? "Update Resource" : "Add Resource"}
            </button>
            {editingResource && (
              <button className="admin-btn admin-btn-secondary" onClick={resetResourceForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ==================== RESOURCES LIST ==================== */}
      <div className="admin-section">
        <h3>📋 All Study Resources ({resources.length})</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Type</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map(r => (
                <tr key={r.id}>
                  <td>
                    <strong>{r.title}</strong>
                    <br />
                    <small>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: "#d0a93f", fontSize: "11px" }}>
                        🔗 {r.url?.substring(0, 50)}...
                      </a>
                    </small>
                  </td>
                  <td>{r.subjectName || r.subject?.name || "—"}</td>
                  <td><span className="resource-badge">{r.resourceType || "—"}</span></td>
                  <td className="admin-cell-muted">{r.description?.substring(0, 80)}...</td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="btn btn-edit" onClick={() => editResource(r)}>Edit</button>
                      <button className="btn btn-delete" onClick={() => removeResource(r.id, r.title)}>Delete</button>
                    </div>
                   </td>
                 </tr>
              ))}
              {resources.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>No resources added yet. Create your first resource above!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}