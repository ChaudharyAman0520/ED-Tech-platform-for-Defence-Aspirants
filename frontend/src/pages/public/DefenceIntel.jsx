import "../../style/pages/public-pages.css";

export default function DefenceIntel() {
  const news = [
    { date: "March 2024", title: "INS Imphal Commissioned", summary: "Indian Navy's latest stealth guided-missile destroyer INS Imphal commissioned." },
    { date: "Feb 2024", title: "Tejas MK2 First Flight", summary: "India's advanced light combat aircraft Tejas MK2 completed its maiden flight." },
    { date: "Jan 2024", title: "Dhanush Missile Test", summary: "Indian Army successfully test-fired indigenously developed Dhanush ballistic missile." },
    { date: "Dec 2023", title: "INS Vikrant Fully Operational", summary: "India's first indigenous aircraft carrier achieves complete operational capability." }
  ];

  const acquisitions = ["Rafale Marine jets", "31 MQ-9B Predator drones", "6 P-8I Neptune aircraft", "70,000 SIG 716 assault rifles", "K-9 Vajra howitzers", "Arjun MK-1A battle tanks"];

  return (
    <div className="public-page">
      <div className="page-header">
        <h1>Defence Intel</h1>
        <p>Latest defence news, acquisitions, and strategic updates</p>
      </div>

      <div className="content-section">
        <h2>Latest News</h2>
        <div className="news-grid">
          {news.map((item, idx) => (
            <div key={idx} className="news-card">
              <div className="news-date">{item.date}</div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>Recent Acquisitions</h2>
        <div className="info-grid">
          <div className="info-card">
            <ul>
              {acquisitions.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Strategic Developments</h2>
        <div className="info-grid">
          <div className="info-card"><h3>Defence Budget 2024</h3><p>₹6.21 lakh crore allocated (9% increase). Focus on border infrastructure.</p></div>
          <div className="info-card"><h3>Make in India</h3><p>4,700 items banned for import. HAL, BEL, DRDO leading indigenous development.</p></div>
          <div className="info-card"><h3>Border Infrastructure</h3><p>77 new roads and 5 tunnels approved along China border.</p></div>
        </div>
      </div>
    </div>
  );
}