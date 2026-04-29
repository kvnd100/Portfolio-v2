import { useState, useEffect } from 'react';
import { PORTFOLIO } from '../../../data/portfolio.js';

export function SkillsPane() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setTimeout(() => setTick(1), 80); return () => clearTimeout(id); }, []);
  return (
    <div className="skills-cols">
      {PORTFOLIO.skills.map((g) => (
        <div key={g.group}>
          <div className="skill-group-title">{g.group}</div>
          {g.items.map((s) => (
            <div key={s.name} className="skill-row">
              <span className="skill-name">{s.name}</span>
              <div className="skill-bar">
                <div className="skill-bar-fill" style={{ width: (tick ? s.level : 0) + '%' }} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
