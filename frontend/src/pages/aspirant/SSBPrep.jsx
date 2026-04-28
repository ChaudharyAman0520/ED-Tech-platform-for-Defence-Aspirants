import { useEffect, useState } from "react";
import { getSSBStages, getSSBTestsByStage } from "../../services/ssbService";

export default function SSBPrep() {
  const [stages, setStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const res = await getSSBStages();
        setStages(res.data || []);
        if (res.data?.length) {
          setSelectedStage(res.data[0].id);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStages();
  }, []);

  useEffect(() => {
    if (!selectedStage) return;
    const fetchTests = async () => {
      try {
        const res = await getSSBTestsByStage(selectedStage);
        setTests(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTests();
  }, [selectedStage]);

  return (
    <div className="aspirant-container">
      <div className="page-header">
        <h2>SSB Preparation</h2>
        <p>Complete guide to crack the Services Selection Board interview</p>
      </div>

      <div className="filter-section">
        <select 
          value={selectedStage || ""} 
          onChange={(e) => setSelectedStage(parseInt(e.target.value))}
          className="filter-select"
        >
          {stages.map(s => (
            <option key={s.id} value={s.id}>{s.stageName}</option>
          ))}
        </select>
      </div>

      <div className="grid-auto">
        {tests.map(t => (
          <div key={t.id} className="info-card">
            <h3>{t.testName}</h3>
            <p>{t.description}</p>
            {t.tips && (
              <div className="tip-box">
                <strong>Tip:</strong> {t.tips}
              </div>
            )}
          </div>
        ))}
      </div>

      {tests.length === 0 && (
        <div className="empty-state">
          <p>No tests available for this stage.</p>
        </div>
      )}
    </div>
  );
}