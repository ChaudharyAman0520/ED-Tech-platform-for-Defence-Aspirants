import "../../style/pages/public-pages.css";

export default function HallOfHeroes() {
  const pvcWinners = [
    { name: "Major Somnath Sharma", rank: "Major", year: "1947", detail: "First PVC recipient. Led his company against Pakistani raiders in Kashmir. Killed in action." },
    { name: "Lance Naik Albert Ekka", rank: "Lance Naik", year: "1971", detail: "Single-handedly destroyed enemy bunkers. Posthumously awarded for bravery." },
    { name: "Captain Vikram Batra", rank: "Captain", year: "1999", detail: "Martyred during Kargil War. Famous for 'Yeh Dil Maange More!'" },
    { name: "Lieutenant Manoj Pandey", rank: "Lieutenant", year: "1999", detail: "Led from front and captured Jubar Top. Martyred during Kargil War." },
    { name: "Rifleman Sanjay Kumar", rank: "Rifleman", year: "1999", detail: "Captured key Pakistani position despite being severely injured." },
    { name: "Grenadier Yogendra Singh Yadav", rank: "Grenadier", year: "1999", detail: "Youngest PVC recipient at 19. Survived 16 bullets during Tiger Hill assault." }
  ];

  const mvcWinners = [
    { name: "Major General Ian Cardozo", rank: "Major General", year: "1971", detail: "Fought in Bangladesh war, amputated his own leg to prevent gangrene." },
    { name: "Brigadier Mohammad Usman", rank: "Brigadier", year: "1948", detail: "Highest-ranking officer martyred in 1948 war." },
    { name: "Lieutenant General Sagat Singh", rank: "Lieutenant General", year: "1971", detail: "Led operations in Bangladesh, known for airborne assault tactics." }
  ];

  return (
    <div className="public-page">
      <div className="page-header">
        <h1>Hall of Heroes</h1>
        <p>Remembering the brave hearts who made the ultimate sacrifice</p>
      </div>

      {/* PVC Section */}
      <div className="content-section">
        <h2>Param Vir Chakra Awardees</h2>
        <p className="lead-text">Param Vir Chakra is India's highest military decoration, awarded for supreme courage in the face of the enemy.</p>
        <div className="heroes-grid">
          {pvcWinners.map((hero, idx) => (
            <div key={idx} className="hero-card">
              <div className="hero-rank">{hero.rank}</div>
              <h3 className="hero-name">{hero.name}</h3>
              <div className="hero-award">⭐ Param Vir Chakra • {hero.year}</div>
              <div className="hero-detail">{hero.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MVC Section */}
      <div className="content-section">
        <h2>Maha Vir Chakra Recipients</h2>
        <p className="lead-text">Maha Vir Chakra is India's second-highest military decoration.</p>
        <div className="heroes-grid">
          {mvcWinners.map((hero, idx) => (
            <div key={idx} className="hero-card">
              <div className="hero-rank">{hero.rank}</div>
              <h3 className="hero-name">{hero.name}</h3>
              <div className="hero-award">🏅 Maha Vir Chakra • {hero.year}</div>
              <div className="hero-detail">{hero.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Awards Overview */}
      <div className="content-section">
        <h2>Gallantry Awards Overview</h2>
        <div className="info-grid">
          <div className="info-card"><h3>Param Vir Chakra</h3><p>Highest gallantry award. Awarded 21 times (14 posthumous).</p></div>
          <div className="info-card"><h3>Maha Vir Chakra</h3><p>Second-highest gallantry award. Over 200 recipients.</p></div>
          <div className="info-card"><h3>Vir Chakra</h3><p>Third-highest gallantry award. Over 1,300 recipients.</p></div>
          <div className="info-card"><h3>Ashoka Chakra</h3><p>Highest peacetime gallantry award.</p></div>
        </div>
      </div>
    </div>
  );
}