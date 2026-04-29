import { PORTFOLIO } from '../../../data/portfolio.js';

export function ResumePane({ sound }) {
  const r = PORTFOLIO.resume;
  return (
    <div className="col resume-col">
      <div className="resume-card">
        <div className="resume-title">CREDENTIALS.TRANSFER</div>
        <div className="resume-meta">PDF · {r.sizeKb} KB · last modified {r.updated} · {r.pages} pages</div>
        <a
          className="btn"
          href={r.file}
          download={r.label}
          onClick={() => sound.zoom()}
        >
          ↓ DOWNLOAD RESUME
        </a>
      </div>
      <div className="row resume-formats">
        <div className="stat-cell">
          <div className="stat-num">PDF</div><div className="stat-label">Standard format</div>
        </div>
        <a
          className="stat-cell stat-cell--link"
          href={'https://' + PORTFOLIO.contact.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="stat-num">GH</div><div className="stat-label">github.com/kvnd100</div>
        </a>
        <a
          className="stat-cell stat-cell--link"
          href={'https://' + PORTFOLIO.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="stat-num">IN</div><div className="stat-label">LinkedIn</div>
        </a>
      </div>
      <div className="resume-footer">
        &gt; MSc Computer Science — University of Colombo (2025 — 2027).<br />
        &gt; BSc (Hons) Computer Science &amp; Software Engineering — University of Bedfordshire, Second Class Upper.<br />
        &gt; Currently shipping at Mathemly. Remote-friendly globally.
      </div>
    </div>
  );
}
