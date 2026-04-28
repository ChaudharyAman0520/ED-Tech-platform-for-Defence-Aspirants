import { useEffect, useState } from "react";
import { getAllQuestions, createQuestion, updateQuestion, deleteQuestion } from "../../../services/examService";
import { getSubjects } from "../../../services/ndaService";

export default function QuestionManager() {
  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form state
  const [form, setForm] = useState({
    text: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "A",
    difficulty: "MEDIUM",
    marks: 1,
    subject: { id: "" }
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [questionsRes, subjectsRes] = await Promise.all([
        getAllQuestions(),
        getSubjects()
      ]);
      setQuestions(questionsRes.data || []);
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
      text: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "A",
      difficulty: "MEDIUM",
      marks: 1,
      subject: { id: "" }
    });
    setEditingQuestion(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.text || !form.optionA || !form.optionB || !form.optionC || !form.optionD) {
      alert("Please fill all fields");
      return;
    }
    if (!form.subject.id) {
      alert("Please select a subject");
      return;
    }

    try {
      if (editingQuestion) {
        await updateQuestion(editingQuestion.id, form);
      } else {
        await createQuestion(form);
      }
      resetForm();
      loadData();
    } catch (err) {
      console.error("Save error:", err);
      alert(err.response?.data || "Failed to save question");
    }
  };

  const handleDelete = async (id, text) => {
    if (!window.confirm(`Delete question "${text.substring(0, 50)}..."?`)) return;
    try {
      await deleteQuestion(id);
      loadData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleEdit = (q) => {
    setEditingQuestion(q);
    setForm({
      text: q.text,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctAnswer: q.correctAnswer,
      difficulty: q.difficulty,
      marks: q.marks,
      subject: { id: q.subject?.id || "" }
    });
  };

  const difficulties = ["EASY", "MEDIUM", "HARD"];

  return (
    <div className="admin-page">
      <h2>📝 Question Bank Manager</h2>

      {/* Question Form */}
      <div className="admin-section">
        <h3>{editingQuestion ? "✏️ Edit Question" : "➕ Add New Question"}</h3>
        <form onSubmit={handleSubmit} className="admin-form-grid">
          <div className="admin-field admin-field-span">
            <label>Question Text *</label>
            <textarea rows="3" placeholder="Enter question here..."
              value={form.text} onChange={(e) => setForm({...form, text: e.target.value})} required />
          </div>

          <div className="admin-field">
            <label>Option A *</label>
            <input placeholder="Option A" value={form.optionA} onChange={(e) => setForm({...form, optionA: e.target.value})} required />
          </div>
          <div className="admin-field">
            <label>Option B *</label>
            <input placeholder="Option B" value={form.optionB} onChange={(e) => setForm({...form, optionB: e.target.value})} required />
          </div>
          <div className="admin-field">
            <label>Option C *</label>
            <input placeholder="Option C" value={form.optionC} onChange={(e) => setForm({...form, optionC: e.target.value})} required />
          </div>
          <div className="admin-field">
            <label>Option D *</label>
            <input placeholder="Option D" value={form.optionD} onChange={(e) => setForm({...form, optionD: e.target.value})} required />
          </div>

          <div className="admin-field">
            <label>Correct Answer *</label>
            <select value={form.correctAnswer} onChange={(e) => setForm({...form, correctAnswer: e.target.value})}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <div className="admin-field">
            <label>Subject</label>
            <select value={form.subject.id} onChange={(e) => setForm({...form, subject: { id: e.target.value }})}>
              <option value="">Select Subject</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div className="admin-field">
            <label>Difficulty</label>
            <select value={form.difficulty} onChange={(e) => setForm({...form, difficulty: e.target.value})}>
              {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="admin-field">
            <label>Marks</label>
            <input type="number" min="1" value={form.marks} onChange={(e) => setForm({...form, marks: parseInt(e.target.value)})} />
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-primary">
              {editingQuestion ? "Update Question" : "Add Question"}
            </button>
            {editingQuestion && (
              <button type="button" className="admin-btn admin-btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Questions List */}
      <div className="admin-section">
        <h3>📋 All Questions ({questions.length})</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>ID</th><th>Question</th><th>Subject</th><th>Difficulty</th><th>Marks</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {questions.map(q => (
                <tr key={q.id}>
                  <td>{q.id}</td>
                  <td className="admin-cell-muted">{q.text?.substring(0, 80)}...</td>
                  <td>{q.subject?.name || "—"}</td>
                  <td><span className="resource-badge">{q.difficulty}</span></td>
                  <td>{q.marks}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleEdit(q)}>Edit</button>
                    <button className="btn btn-delete" onClick={() => handleDelete(q.id, q.text)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}