import { useEffect, useState } from "react";
import { getSubjects } from "../../../services/ndaService";
import { getPYQs, createPYQ, deletePYQ } from "../../../services/ndaService";

export default function PYQManager() {
  const [pyqs, setPyqs] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    year: new Date().getFullYear(),
    session: "NDA I",
    pdfUrl: "",
    subject: { id: "" }
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [pyqsRes, subjectsRes] = await Promise.all([
        getPYQs(),
        getSubjects()
      ]);
      setPyqs(pyqsRes.data || []);
      setSubjects(subjectsRes.data || []);
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const resetForm = () => {
    setForm({
      year: new Date().getFullYear(),
      session: "NDA I",
      pdfUrl: "",
      subject: { id: "" }
    });
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.year || !form.pdfUrl || !form.subject.id) {
      alert("Year, PDF URL, and Subject are required");
      return;
    }

    try {
      const subjectObj = subjects.find(s => s.id === parseInt(form.subject.id));
      const payload = {
        year: parseInt(form.year),
        session: form.session,
        pdfUrl: form.pdfUrl,
        subject: subjectObj
      };
      await createPYQ(payload);
      alert("PYQ paper added!");
      resetForm();
      loadData();
    } catch (err) {
      alert("Failed to add PYQ");
    }
  };

const handleDelete = async (id, year, session) => {
  if (!window.confirm(`Delete ${year} ${session} paper?`)) return;
  try {
    console.log("Deleting PYQ with ID:", id);
    await deletePYQ(id);
    alert("PYQ paper deleted successfully!");
    loadData();
  } catch (err) {
    console.error("Delete error:", err);
    console.error("Error response:", err.response);
    alert(err.response?.data || "Delete failed. Check console for details.");
  }
};
  return (
    <div className="admin-page">
      <h2>📄 PYQ Manager (Past Year Questions)</h2>
      <p className="admin-sub">Upload and manage NDA previous year question papers</p>

      <div className="admin-section">
        <button className="admin-btn admin-btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "− Hide Form" : "+ Add PYQ Paper"}
        </button>
      </div>

      {showForm && (
        <div className="admin-section">
          <h3>Add New PYQ Paper</h3>
          <form onSubmit={handleSubmit} className="admin-form-grid">
            <div className="admin-field">
              <label>Year *</label>
              <input type="number" min="2010" max="2030" value={form.year} onChange={(e) => setForm({...form, year: e.target.value})} required />
            </div>
            <div className="admin-field">
              <label>Session *</label>
              <select value={form.session} onChange={(e) => setForm({...form, session: e.target.value})}>
                <option value="NDA I">NDA I</option>
                <option value="NDA II">NDA II</option>
              </select>
            </div>
            <div className="admin-field">
              <label>Subject *</label>
              <select value={form.subject.id} onChange={(e) => setForm({...form, subject: { id: e.target.value }})}>
                <option value="">Select Subject</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="admin-field admin-field-span">
              <label>PDF URL *</label>
              <input type="url" placeholder="https://example.com/nda-2023-paper.pdf" value={form.pdfUrl} onChange={(e) => setForm({...form, pdfUrl: e.target.value})} required />
            </div>
            <div className="admin-form-actions">
              <button type="submit" className="admin-btn admin-btn-primary">Save PYQ</button>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-section">
        <h3>📋 PYQ Papers ({pyqs.length})</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Year</th>
                <th>Session</th>
                <th>Subject</th>
                <th>PDF Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pyqs.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.year}</td>
                  <td>{p.session}</td>
                  <td>{p.subjectName || p.subject?.name || "—"}</td>
                  <td>
                    <a href={p.pdfUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)" }}>
                      📄 View Paper
                    </a>
                   </td>
                  <td>
                    <button className="btn btn-delete" onClick={() => handleDelete(p.id, p.year, p.session)}>Delete</button>
                   </td>
                </tr>
              ))}
              {pyqs.length === 0 && !loading && (
                <tr><td colSpan="6" style={{ textAlign: "center" }}>No PYQ papers added yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}