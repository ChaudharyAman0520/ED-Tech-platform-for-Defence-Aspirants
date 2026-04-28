import { useEffect, useState } from "react";
import { getAllTests, createTest, deleteTest, addQuestionsToTest } from "../../../services/examService";
import { getAllQuestions } from "../../../services/examService";
import { getSubjects } from "../../../services/ndaService";

export default function TestManager() {
  const [tests, setTests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddQuestions, setShowAddQuestions] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    durationMinutes: 60,
    subject: { id: "" }
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [testsRes, questionsRes, subjectsRes] = await Promise.all([
        getAllTests(),
        getAllQuestions(),
        getSubjects()
      ]);
      setTests(testsRes.data || []);
      setQuestions(questionsRes.data || []);
      setSubjects(subjectsRes.data || []);
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleCreateTest = async (e) => {
    e.preventDefault();
    if (!form.title || !form.subject.id) {
      alert("Title and Subject are required");
      return;
    }

    try {
      await createTest(form);
      setForm({ title: "", description: "", durationMinutes: 60, subject: { id: "" } });
      loadData();
    } catch (err) {
      alert(err.response?.data || "Failed to create test");
    }
  };

  const handleDeleteTest = async (id, title) => {
    if (!window.confirm(`Delete test "${title}"?`)) return;
    try {
      await deleteTest(id);
      loadData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleAddQuestions = async (testId) => {
    if (selectedQuestions.length === 0) {
      alert("Select at least one question");
      return;
    }
    try {
      await addQuestionsToTest(testId, selectedQuestions);
      setShowAddQuestions(null);
      setSelectedQuestions([]);
      loadData();
    } catch (err) {
      alert("Failed to add questions");
    }
  };

  const toggleQuestionSelection = (questionId) => {
    setSelectedQuestions(prev =>
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  };

  return (
    <div className="admin-page">
      <h2>📋 Test Manager</h2>

      {/* Create Test Form */}
      <div className="admin-section">
        <h3>➕ Create New Test</h3>
        <form onSubmit={handleCreateTest} className="admin-form-grid">
          <div className="admin-field admin-field-span">
            <label>Test Title *</label>
            <input placeholder="e.g., NDA Mathematics Mock Test 1" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
          </div>
          <div className="admin-field admin-field-span">
            <label>Description</label>
            <textarea rows="2" placeholder="Describe the test..." value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
          </div>
          <div className="admin-field">
            <label>Subject *</label>
            <select value={form.subject.id} onChange={(e) => setForm({...form, subject: { id: e.target.value }})}>
              <option value="">Select Subject</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="admin-field">
            <label>Duration (minutes)</label>
            <input type="number" min="1" value={form.durationMinutes} onChange={(e) => setForm({...form, durationMinutes: parseInt(e.target.value)})} />
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-primary">Create Test</button>
          </div>
        </form>
      </div>

      {/* Tests List */}
      <div className="admin-section">
        <h3>📋 Existing Tests ({tests.length})</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>ID</th><th>Title</th><th>Subject</th><th>Duration</th><th>Questions</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {tests.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td><strong>{t.title}</strong><br/><small>{t.description?.substring(0, 50)}</small></td>
                  <td>{t.subject?.name || "—"}</td>
                  <td>{t.durationMinutes} min</td>
                  <td>{t.questions?.length || 0}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => setShowAddQuestions(t)}>Add Qs</button>
                    <button className="btn btn-delete" onClick={() => handleDeleteTest(t.id, t.title)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Questions Modal */}
      {showAddQuestions && (
        <div className="modal-overlay" onClick={() => setShowAddQuestions(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Questions to: {showAddQuestions.title}</h3>
            <div className="modal-questions-list">
              {questions.filter(q => q.subject?.id === showAddQuestions.subject?.id).map(q => (
                <label key={q.id} className="modal-question-item">
                  <input type="checkbox" checked={selectedQuestions.includes(q.id)} onChange={() => toggleQuestionSelection(q.id)} />
                  <span>{q.text?.substring(0, 100)}...</span>
                </label>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn btn-add" onClick={() => handleAddQuestions(showAddQuestions.id)}>Add Selected</button>
              <button className="btn btn-edit" onClick={() => setShowAddQuestions(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}