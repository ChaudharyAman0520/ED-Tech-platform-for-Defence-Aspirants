import "../../style/pages/public-pages.css";
export default function WarChronicles() {
const wars = [
  // Pre-Independence & Initial Wars
  {
    year: "1947-48",
    name: "Indo-Pak War",
    location: "Kashmir",
    result: "Indian Victory",
    description: "First war between India and Pakistan over Kashmir. India successfully defended the princely state's accession."
  },
  {
    year: "1961",
    name: "Liberation of Goa",
    location: "Goa, Daman, Diu",
    result: "Indian Victory",
    description: "Operation Vijay. Indian forces liberated Goa from 450 years of Portuguese rule in 36 hours."
  },
  {
    year: "1962",
    name: "Sino-Indian War",
    location: "North-East Frontier",
    result: "Ceasefire",
    description: "War with China over border disputes. India lost some territory but later regained through diplomatic efforts."
  },
  {
    year: "1965",
    name: "Indo-Pak War",
    location: "International Border",
    result: "Stalemate",
    description: "Air and tank warfare. Indian forces captured key positions like Haji Pir Pass. Tashkent Agreement signed."
  },
  {
    year: "1971",
    name: "Bangladesh Liberation War",
    location: "East Pakistan",
    result: "Indian Victory",
    description: "India supported Bangladesh independence. 93,000 Pakistani soldiers surrendered - largest since WWII."
  },
  
  // 1980s Operations
  {
    year: "1984",
    name: "Operation Meghdoot",
    location: "Siachen Glacier",
    result: "Indian Victory",
    description: "India captured Siachen Glacier, now the highest battlefield in the world at 22,000 feet."
  },
  {
    year: "1987",
    name: "Operation Brasstacks",
    location: "Rajasthan Border",
    result: "Successful",
    description: "Largest military exercise in South Asia. Demonstrated India's offensive capabilities against Pakistan."
  },
  {
    year: "1987-89",
    name: "IPKF in Sri Lanka",
    location: "Sri Lanka",
    result: "Withdrawal",
    description: "Indian Peace Keeping Force deployed to enforce peace accord with LTTE."
  },
  {
    year: "1988",
    name: "Operation Cactus",
    location: "Maldives",
    result: "Indian Victory",
    description: "Indian paratroopers foiled a coup attempt in Maldives, restoring the democratically elected government."
  },

  // 1990s Operations
  {
    year: "1999",
    name: "Kargil War (Operation Vijay)",
    location: "Kargil, J&K",
    result: "Indian Victory",
    description: "India recaptured posts from Pakistani infiltrators. Operation Vijay and Safed Sagar executed. Captain Vikram Batra, PVC."
  },

  // 2000s Operations
  {
    year: "2001-02",
    name: "Operation Parakram",
    location: "India-Pakistan Border",
    result: "Diplomatic Victory",
    description: "Largest peacetime mobilization after Parliament attack. Forced international intervention."
  },
  {
    year: "2008",
    name: "Operation Black Tornado",
    location: "Mumbai",
    result: "Indian Victory",
    description: "NSG commandos neutralized terrorists during 26/11 attacks. 9 commandos martyred. Major Sandeep Unnikrishnan, AC."
  },
  {
    year: "2009",
    name: "Operation Rakshak",
    location: "Jammu & Kashmir",
    result: "Ongoing",
    description: "Counter-insurgency operations in J&K. Continuous anti-terrorist operations."
  },

  // 2010s Operations
  {
    year: "2011",
    name: "Operation Homecoming",
    location: "Libya",
    result: "Successful",
    description: "Evacuation of 15,000 Indian citizens from war-torn Libya during civil war."
  },
  {
    year: "2015",
    name: "Operation Rahat",
    location: "Yemen",
    result: "Successful",
    description: "Evacuation of 4,600 Indian citizens from Yemen during Saudi-led airstrikes."
  },
  {
    year: "2015",
    name: "Operation Maitri",
    location: "Nepal",
    result: "Humanitarian",
    description: "Earthquake relief operation in Nepal. Indian Army rescued thousands and provided medical aid."
  },
  {
    year: "2016",
    name: "Operation Sankalp",
    location: "Persian Gulf",
    result: "Successful",
    description: "Indian Navy deployed to ensure safe passage of Indian vessels in Gulf region."
  },
  {
    year: "2016",
    name: "Surgical Strike 2016",
    location: "PoK",
    result: "Indian Victory",
    description: "Cross-border surgical strikes on terrorist launch pads after Uri attack. 38 terrorists neutralized."
  },
  {
    year: "2017",
    name: "Operation Insaniyat",
    location: "Bangladesh/Myanmar",
    result: "Humanitarian",
    description: "Relief operation for Rohingya refugees. India provided food, clothing, and medical aid."
  },
  {
    year: "2019",
    name: "Balakot Airstrike",
    location: "Balakot, Pakistan",
    result: "Successful",
    description: "Indian Air Force struck Jaish-e-Mohammed terror camp after Pulwama attack. 300+ terrorists neutralized."
  },
  {
    year: "2019",
    name: "Operation Sunrise",
    location: "Myanmar Border",
    result: "Indian Victory",
    description: "Special operation against militant camps along Indo-Myanmar border. Multiple camps destroyed."
  },

  // 2020s Operations
  {
    year: "2020",
    name: "Operation Samudra Setu",
    location: "Indian Ocean",
    result: "Successful",
    description: "Indian Navy repatriated Indian citizens from Maldives, Sri Lanka, and UAE during COVID-19."
  },
  {
    year: "2020",
    name: "Galwan Valley Clash",
    location: "Ladakh",
    result: "Indian Victory",
    description: "Indian Army repelled Chinese aggression at Galwan Valley. 20 Indian soldiers martyred, 45 Chinese casualties."
  },
  {
    year: "2021",
    name: "Operation Devi Shakti",
    location: "Afghanistan",
    result: "Successful",
    description: "Evacuation of 600+ people from Taliban-controlled Kabul, including Indians and Afghan allies."
  },
  {
    year: "2022",
    name: "Operation Ganga",
    location: "Ukraine",
    result: "Successful",
    description: "Evacuation of 22,500 Indian citizens from war-torn Ukraine via special flights."
  },
  {
    year: "2023",
    name: "Operation Dost",
    location: "Turkey/Syria",
    result: "Humanitarian",
    description: "Earthquake relief operation. Indian Army deployed field hospitals and rescue teams."
  },
  {
    year: "2023",
    name: "Operation Mahakal",
    location: "Bay of Bengal",
    result: "Successful",
    description: "Anti-piracy and anti-narcotics operation. Indian Navy rescued Myanmar vessel MV Cabrilla."
  },
  {
    year: "2023",
    name: "Mission Malabar",
    location: "Indian Ocean",
    result: "Successful",
    description: "Joint naval exercise with US, Japan, Australia. Enhanced maritime security cooperation."
  },
  {
    year: "2024-25",
    name: "Operation Snow Leopard",
    location: "Ladakh",
    result: "Ongoing",
    description: "Winter deployment and surveillance along LAC. High-altitude warfare readiness."
  },
  {
    year: "2024",
    name: "Operation Sea Vigil",
    location: "Western Coast",
    result: "Ongoing",
    description: "Enhanced coastal security drills and anti-smuggling operations across Indian coastline."
  },
    {
    year: "2025",
    name: "Operation Sindoor",
    location: "PoK",
    result: "Indian Victory",
    description: "Special operation targeting the terrorists camps in POK and Pakistan. Multiple terrorists neutralized."
  }
];

  const rankStructure = {
    army: [
      { rank: "Field Marshal", insignia: "National emblem over crossed baton", isHighest: true },
      { rank: "General", insignia: "National emblem over five-pointed star" },
      { rank: "Lieutenant General", insignia: "National emblem over crossed baton" },
      { rank: "Major General", insignia: "National emblem over five-pointed star" },
      { rank: "Brigadier", insignia: "National emblem over three five-pointed stars" },
      { rank: "Colonel", insignia: "National emblem over two five-pointed stars" },
      { rank: "Lieutenant Colonel", insignia: "National emblem over one five-pointed star" },
      { rank: "Major", insignia: "National emblem" },
      { rank: "Captain", insignia: "Three five-pointed stars" },
      { rank: "Lieutenant", insignia: "Two five-pointed stars" }
    ],
    navy: [
      { rank: "Admiral of the Fleet", insignia: "National emblem over five-pointed star" },
      { rank: "Admiral", insignia: "National emblem over four-pointed star" },
      { rank: "Vice Admiral", insignia: "National emblem over three-pointed star" },
      { rank: "Rear Admiral", insignia: "National emblem over two-pointed star" },
      { rank: "Commodore", insignia: "National emblem over one-pointed star" },
      { rank: "Captain", insignia: "Four stripes" },
      { rank: "Commander", insignia: "Three stripes" },
      { rank: "Lieutenant Commander", insignia: "Two stripes" },
      { rank: "Lieutenant", insignia: "One stripe" }
    ],
    airforce: [
      { rank: "Marshal of the IAF", insignia: "National emblem over baton" },
      { rank: "Air Chief Marshal", insignia: "National emblem over five-pointed star" },
      { rank: "Air Marshal", insignia: "National emblem over three-pointed star" },
      { rank: "Air Vice Marshal", insignia: "National emblem over two-pointed star" },
      { rank: "Air Commodore", insignia: "National emblem over one-pointed star" },
      { rank: "Group Captain", insignia: "Four stripes" },
      { rank: "Wing Commander", insignia: "Three stripes" },
      { rank: "Squadron Leader", insignia: "Two stripes" },
      { rank: "Flight Lieutenant", insignia: "One stripe" }
    ]
  };

  return (
    <div className="public-page">
      <div className="page-header">
        <h1>History of Indian Armed Forces</h1>
        <p>A complete journey through India's military legacy, wars, and rank structure</p>
      </div>

      {/* Brief History Section */}
      <div className="content-section">
        <h2>Brief History</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Ancient Era</h3>
            <p>India had powerful armies under Mauryan, Gupta, and Chola empires. Emperor Chandragupta Maurya had 600,000 infantry, 30,000 cavalry, and 9,000 war elephants.</p>
          </div>
          <div className="info-card">
            <h3>Medieval Era</h3>
            <p>Maratha Empire under Chhatrapati Shivaji Maharaj established a formidable navy and guerrilla warfare tactics. Mughal Empire had one of largest armies of its time.</p>
          </div>
          <div className="info-card">
            <h3>British Era</h3>
            <p>British Indian Army fought in World Wars. Indian soldiers served in Gallipoli, Mesopotamia, and Europe. Over 1.3 million Indians served in WWI alone.</p>
          </div>
          <div className="info-card">
            <h3>Post Independence</h3>
            <p>Indian Armed Forces have grown into a modern, technologically advanced force. India now has nuclear capability, aircraft carriers, and one of largest armies globally.</p>
          </div>
        </div>
      </div>

      {/* Major Wars Section */}
      <div className="content-section">
        <h2>Major Wars & Conflicts</h2>
        <div className="war-grid">
          {wars.map((war, index) => (
            <div key={index} className="war-card">
              <span className="war-year">{war.year}</span>
              <h3>{war.name}</h3>
              <div className="war-location">📍 {war.location}</div>
              <div className="war-result">🏆 Result: {war.result}</div>
              <div className="war-description">{war.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rank Structure Section */}
      <div className="content-section">
        <h2>Rank Structure</h2>
        
        <h3>Indian Army</h3>
        <div className="rank-grid">
          {rankStructure.army.map((rank, idx) => (
            <div key={idx} className={`rank-card ${rank.isHighest ? "highest" : ""}`}>
              <div className="rank-name">{rank.rank}</div>
              <div className="rank-insignia">{rank.insignia}</div>
            </div>
          ))}
        </div>

        <h3>Indian Navy</h3>
        <div className="rank-grid">
          {rankStructure.navy.map((rank, idx) => (
            <div key={idx} className="rank-card">
              <div className="rank-name">{rank.rank}</div>
              <div className="rank-insignia">{rank.insignia}</div>
            </div>
          ))}
        </div>

        <h3>Indian Air Force</h3>
        <div className="rank-grid">
          {rankStructure.airforce.map((rank, idx) => (
            <div key={idx} className="rank-card">
              <div className="rank-name">{rank.rank}</div>
              <div className="rank-insignia">{rank.insignia}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Facts Section */}
      <div className="content-section">
        <h2>Key Facts</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>World's 2nd Largest Army</h3>
            <p>Indian Army has over 1.2 million active personnel and 960,000 reserve personnel.</p>
          </div>
          <div className="info-card">
            <h3>Nuclear Power</h3>
            <p>India conducted nuclear tests in 1974 (Smiling Buddha) and 1998 (Shakti). No-first-use policy.</p>
          </div>
          <div className="info-card">
            <h3>UN Peacekeeping</h3>
            <p>India is one of largest contributors to UN peacekeeping missions with over 200,000 troops deployed.</p>
          </div>
          <div className="info-card">
            <h3>Highest Battlefield</h3>
            <p>Siachen Glacier at 22,000 feet is the world's highest battlefield, held by India since 1984.</p>
          </div>
        </div>
      </div>
    </div>
  );
}