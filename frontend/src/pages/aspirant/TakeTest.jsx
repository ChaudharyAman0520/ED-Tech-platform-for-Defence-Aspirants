import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTestById, startAttempt, submitAttempt } from "../../services/examService";

export default function TakeTest() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [attemptId, setAttemptId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadTest = async () => {
      try {
        const res = await getTestById(testId);
        setTest(res.data);
        setTimeLeft(res.data.durationMinutes * 60);
        
        const attemptRes = await startAttempt(testId);
        setAttemptId(attemptRes.data.id);
      } catch (err) {
        console.error(err);
        navigate("/available-tests");
      }
    };
    loadTest();
  }, [testId, navigate]);

  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  useEffect(() => {
    if (timeLeft === 0 && !submitted && attemptId) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (!window.confirm("Submit test?")) return;
    try {
      await submitAttempt(attemptId, answers);
      setSubmitted(true);
      alert("Test submitted! View results in My Results.");
      navigate("/my-results");
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    }
  };

  if (!test) return <div className="loading-state">Loading test...</div>;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="test-container">
      <div className="test-timer">
        <h2>{test.title}</h2>
        <div className="timer">
          {minutes}:{seconds < 10 ? "0" + seconds : seconds}
        </div>
      </div>

      {test.questions?.map((q, idx) => (
        <div key={q.id} className="question-card">
          <div className="question-text">
            Q{idx + 1}. {q.text}
          </div>
          <div className="options">
            <label className="option">
              <input type="radio" name={q.id} value="A" onChange={() => handleAnswer(q.id, "A")} />
              <span>A. {q.optionA}</span>
            </label>
            <label className="option">
              <input type="radio" name={q.id} value="B" onChange={() => handleAnswer(q.id, "B")} />
              <span>B. {q.optionB}</span>
            </label>
            <label className="option">
              <input type="radio" name={q.id} value="C" onChange={() => handleAnswer(q.id, "C")} />
              <span>C. {q.optionC}</span>
            </label>
            <label className="option">
              <input type="radio" name={q.id} value="D" onChange={() => handleAnswer(q.id, "D")} />
              <span>D. {q.optionD}</span>
            </label>
          </div>
        </div>
      ))}

      <button onClick={handleSubmit} className="btn-primary btn-full btn-large">
        Submit Test
      </button>
    </div>
  );
}