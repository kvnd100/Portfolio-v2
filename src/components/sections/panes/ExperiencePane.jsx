import { PORTFOLIO } from '../../../data/portfolio.js';

export function ExperiencePane() {
  return (
    <div className="timeline">
      {PORTFOLIO.experience.map((e, i) => (
        <div key={i} className="tl-item">
          <div className="tl-role">{e.role}</div>
          <div className="tl-company">{e.company}</div>
          <div className="tl-desc">{e.desc}</div>
        </div>
      ))}
    </div>
  );
}
