import { useEffect } from 'react';
import { ProjectsPane }   from './panes/ProjectsPane.jsx';
import { ExperiencePane } from './panes/ExperiencePane.jsx';
import { SkillsPane }     from './panes/SkillsPane.jsx';
import { AboutPane }      from './panes/AboutPane.jsx';
import { WritingPane }    from './panes/WritingPane.jsx';
import { ContactPane }    from './panes/ContactPane.jsx';
import { ResumePane }     from './panes/ResumePane.jsx';

const TITLES = {
  projects:   { t: 'PROJECTS',   s: 'SEC.001 / records · sorted desc by year' },
  experience: { t: 'EXPERIENCE', s: 'SEC.002 / tours of duty' },
  skills:     { t: 'SKILLS',     s: 'SEC.003 / capability matrix' },
  about:      { t: 'ABOUT',      s: 'SEC.004 / bio · signal' },
  writing:    { t: 'WRITING',    s: 'SEC.005 archive_cold parity_rebuild queued' },
  contact:    { t: 'CONTACT',    s: 'SEC.006 / secure channel' },
  resume:     { t: 'RESUME',     s: 'SEC.007 / credentials export' },
};

export function SectionShell({ section, onClose, sound, phase }) {
  const isExiting = phase === 'exiting';

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const meta = TITLES[section] || { t: '', s: '' };

  const bgStyle = { transition: 'opacity 0.35s ease', opacity: isExiting ? 0 : 1 };
  const contentStyle = {
    transition: isExiting
      ? 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.4,0,1,1)'
      : 'opacity 0.45s ease 0.08s, transform 0.45s cubic-bezier(0,0,0.2,1) 0.08s',
    opacity: isExiting ? 0 : 1,
    transform: isExiting ? 'translateY(32px) scale(0.98)' : 'translateY(0) scale(1)',
  };

  return (
    <div className="section-overlay open">
      <div className="section-overlay-bg" style={bgStyle} onClick={() => { sound.click(330); onClose(); }} />
      <div className="section-content panel" style={contentStyle}>
        <span className="panel-corners"><span /><span /></span>
        <button className="close-x" onClick={() => { sound.click(330); onClose(); }}>
          [ CLOSE · ESC ]
        </button>
        <div className="section-header">
          <div className="section-title">{meta.t}</div>
          <div className="section-subtitle">{meta.s}</div>
        </div>
        <div className="section-body">
          {section === 'projects'   && <ProjectsPane sound={sound} />}
          {section === 'experience' && <ExperiencePane />}
          {section === 'skills'     && <SkillsPane />}
          {section === 'about'      && <AboutPane />}
          {section === 'writing'    && <WritingPane sound={sound} />}
          {section === 'contact'    && <ContactPane sound={sound} />}
          {section === 'resume'     && <ResumePane sound={sound} />}
        </div>
      </div>
    </div>
  );
}
