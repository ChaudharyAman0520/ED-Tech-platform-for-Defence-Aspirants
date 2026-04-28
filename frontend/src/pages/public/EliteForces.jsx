import "../../style/pages/public-pages.css";

export default function EliteForces() {
  const forces = [
    { name: "Para SF", motto: "Men Apart", about: "Special Forces branch of Indian Army. Trained in airborne warfare, counter-terrorism, and unconventional operations.", specialties: ["Airborne Ops", "Counter-Terrorism", "Hostage Rescue"] },
    { name: "MARCOS", motto: "The Few, The Fearless", about: "Marine Commandos of Indian Navy. Experts in maritime operations and amphibious warfare.", specialties: ["Maritime Ops", "Underwater Demolition", "Coastal Security"] },
    { name: "Garud", motto: "Swift and Strikers", about: "Special Forces unit of Indian Air Force. Protects airbases and conducts special missions.", specialties: ["Airbase Security", "Combat Search", "Reconnaissance"] },
    { name: "NSG", motto: "Sarvatra Sarvottam Suraksha", about: "Elite counter-terrorism unit. Also known as 'Black Cats'.", specialties: ["Counter-Terrorism", "Hostage Rescue", "VIP Security"] }
  ];

  return (
    <div className="public-page">
      <div className="page-header">
        <h1>Elite Forces</h1>
        <p>Discover India's most lethal special operations units</p>
      </div>

      <div className="content-section">
        <div className="elite-grid">
          {forces.map((force, idx) => (
            <div key={idx} className="elite-card">
              <div className="elite-header">
                <h3>{force.name}</h3>
                <div className="elite-motto">"{force.motto}"</div>
              </div>
              <div className="elite-content">
                <p>{force.about}</p>
                <h4>Specialties:</h4>
                <ul>
                  {force.specialties.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>Selection & Training</h2>
        <div className="info-grid">
          <div className="info-card"><h3>Para SF Selection</h3><p>90 days of hellish training. Less than 10% qualify.</p></div>
          <div className="info-card"><h3>MARCOS Selection</h3><p>10-month course with 70% failure rate. Includes 'Hell Week'.</p></div>
          <div className="info-card"><h3>Garud Training</h3><p>70 weeks of rigorous training including para jumps.</p></div>
          <div className="info-card"><h3>NSG Training</h3><p>14-month intensive course in urban close-quarter combat.</p></div>
        </div>
      </div>
    </div>
  );
}