import { useEffect, useState } from "react";
import { getAllTests } from "../../services/examService";
import { useNavigate } from "react-router-dom";

export default function AvailableTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await getAllTests();
        setTests(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const startTest = (testId) => {
    navigate(`/take-test/${testId}`);
  };

  if (loading) return <div className="loading-state">Loading tests...</div>;

  return (
    <div className="aspirant-container">
      <div className="page-header">
        <h2>Available Tests</h2>
        <p>Practice with our mock tests and track your progress</p>
      </div>

      <div className="grid-auto">
        {tests.map(t => (
          <div key={t.id} className="test-card">
            <h3>{t.title}</h3>
            {t.description && <p>{t.description}</p>}
            <div className="test-meta">
              <span>Duration: {t.durationMinutes} min</span>
              <span>Questions: {t.questions?.length || 0}</span>
              <span>Marks: {t.totalMarks}</span>
            </div>
            <button onClick={() => startTest(t.id)} className="btn-primary btn-full">
              Start Test
            </button>
          </div>
        ))}
      </div>

      {tests.length === 0 && (
        <div className="empty-state">
          <p>No tests available at the moment.</p>
        </div>
      )}
    </div>
  );
}