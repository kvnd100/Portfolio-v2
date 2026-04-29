import { PORTFOLIO } from '../../../data/portfolio.js';
import { ProjectThumb } from './ProjectThumb.jsx';

export function ProjectsPane({ sound }) {
  return (
    <div className="proj-grid">
      {PORTFOLIO.projects.map((p, i) => (
        <div className="proj-card" key={p.id} onMouseEnter={() => sound.click(1100, 0.03, 'triangle')}>
          <div className="proj-card-thumb"><ProjectThumb seed={i + 1} /></div>
          <div className="proj-card-id">{p.id} · {p.year}</div>
          <div className="proj-card-title">{p.title}</div>
          <div className="proj-card-desc">{p.desc}</div>
          <div className="proj-card-tags">
            {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}
