import { PORTFOLIO } from '../../../data/portfolio.js';

export function AboutPane() {
  return (
    <div className="about-grid">
      <div className="about-text">
        {PORTFOLIO.bio.map((p, i) => <p key={i}>{p}</p>)}
        {PORTFOLIO.education?.length > 0 && (
          <div className="about-education">
            <div className="about-education-title">EDUCATION</div>
            {PORTFOLIO.education.map((ed, i) => (
              <div key={i} className="about-education-row">
                <div className="about-education-school">{ed.school}</div>
                <div className="about-education-degree">{ed.degree}</div>
                <div className="about-education-period">{ed.period}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="about-stats">
        {PORTFOLIO.stats.map((s, i) => (
          <div key={i} className="stat-cell">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
