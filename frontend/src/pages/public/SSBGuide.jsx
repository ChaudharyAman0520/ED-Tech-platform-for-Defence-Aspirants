import "../../style/pages/public-pages.css";
export default function SSBGuide() {
  return (
    <div className="public-page">
      <div className="page-header">
        <h1>SSB Battleground</h1>
        <p>Services Selection Board - Your gateway to becoming an officer</p>
      </div>

      <div className="content-section">
        <h2>Overview of SSB Interview</h2>
        <p className="lead-text">SSB is a 5-day selection process that tests your Officer Like Qualities (OLQs). It evaluates your personality, intelligence, and leadership potential.</p>
      </div>

      <div className="content-section">
        <h2>Stage 1: Screening Test (Day 1)</h2>
        <div className="stage-card">
          <div className="stage-header">
            <span className="stage-day">Day 1</span>
          </div>
          <div className="stage-content">
            <h3>Officer Intelligence Rating (OIR) Test</h3>
            <p>Verbal and non-verbal reasoning questions. Tests your mental ability and logical thinking.</p>
            <h3>Picture Perception & Description Test (PPDT)</h3>
            <p>You are shown a hazy picture for 30 seconds, then write a story, and finally discuss with the group.</p>
            <div className="tip-box">
              <strong>Tip:</strong> Be positive, write realistic stories, and participate actively in the discussion without being aggressive.
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Stage 2: Psychological Tests (Day 2)</h2>
        <div className="stage-card">
          <div className="stage-header">
            <span className="stage-day">Day 2</span>
          </div>
          <div className="stage-content">
            <h3>Thematic Apperception Test (TAT)</h3>
            <p>12 vague pictures (including one blank slide). Write a story for each within 4 minutes. Tests your imagination and thought process.</p>
            
            <h3>Word Association Test (WAT)</h3>
            <p>60 words flashed for 15 seconds each. Write the first thought that comes to your mind. Tests your subconscious response.</p>
            
            <h3>Situation Reaction Test (SRT)</h3>
            <p>60 practical situations. Write your reaction in limited time. Tests your common sense and decision-making ability.</p>
            
            <h3>Self Description Test (SD)</h3>
            <p>Write about yourself as your parents, teachers, friends, and yourself see you. Write your future goals.</p>
            
            <div className="tip-box">
              <strong>Tip:</strong> Be truthful and consistent across all tests. Your personality should reflect officer-like qualities.
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Stage 3: Group Tasks (Day 3 & 4)</h2>
        <div className="stage-card">
          <div className="stage-header">
            <span className="stage-day">Day 3 & 4</span>
          </div>
          <div className="stage-content">
            <h3>Group Discussion (GD)</h3>
            <p>Topic given, 3 minutes preparation, 15-20 minutes discussion. Tests your communication and leadership skills.</p>
            
            <h3>Group Planning Exercise (GPE)</h3>
            <p>Map-reading and planning exercise in a group. Tests your practical intelligence and coordination.</p>
            
            <h3>Progressive Group Task (PGT)</h3>
            <p>Physical tasks using limited materials. Tests teamwork, leadership, and problem-solving under pressure.</p>
            
            <h3>Half Group Task (HGT)</h3>
            <p>Similar to PGT but in smaller groups.</p>
            
            <h3>Individual Obstacles (IO)</h3>
            <p>10 obstacles, choose to attempt as many as you want in 3 minutes. Tests your courage and determination.</p>
            
            <h3>Command Task (CT)</h3>
            <p>You become the leader. GTO gives you followers. Tests your command and control ability.</p>
            
            <h3>Final Group Task (FGT)</h3>
            <p>Similar to PGT but with less structure.</p>
            
            <div className="tip-box">
              <strong>Tip:</strong> Be a team player. Don't dominate or remain silent. Show initiative and support others.
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Stage 4: Personal Interview (Day 4)</h2>
        <div className="stage-card">
          <div className="stage-header">
            <span className="stage-day">Day 4</span>
          </div>
          <div className="stage-content">
            <p>30-45 minute interview with a Deputy President or President of the board. Assesses your overall personality, background, and motivation for defence services.</p>
            <ul>
              <li>Tell me about yourself</li>
              <li>Why do you want to join the forces?</li>
              <li>Current affairs and defence knowledge</li>
              <li>Situation-based questions</li>
              <li>Hobbies and extracurricular activities</li>
            </ul>
            <div className="tip-box">
              <strong>Tip:</strong> Be honest, confident, and maintain eye contact. Know current events and have clarity about your goals.
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Stage 5: Conference (Day 5)</h2>
        <div className="stage-card">
          <div className="stage-header">
            <span className="stage-day">Day 5</span>
          </div>
          <div className="stage-content">
            <p>Final appearance before the full board of assessors. Short interview to confirm your candidature.</p>
            <div className="tip-box">
              <strong>Tip:</strong> Be relaxed and confident. Your results are already decided based on previous 4 days.
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Officer Like Qualities (OLQs) Assessed</h2>
        <div className="olq-grid">
          <div className="olq-item">Effective Intelligence</div>
          <div className="olq-item">Reasoning Ability</div>
          <div className="olq-item">Power of Expression</div>
          <div className="olq-item">Social Adaptability</div>
          <div className="olq-item">Cooperation</div>
          <div className="olq-item">Sense of Responsibility</div>
          <div className="olq-item">Initiative</div>
          <div className="olq-item">Courage</div>
          <div className="olq-item">Determination</div>
          <div className="olq-item">Self-Confidence</div>
          <div className="olq-item">Liveliness</div>
          <div className="olq-item">Sense of Humour</div>
        </div>
      </div>
    </div>
  );
}