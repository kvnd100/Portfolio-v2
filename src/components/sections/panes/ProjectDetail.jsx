export function ProjectDetail({ project, sound, onClose }) {
  const hasRepo = Boolean(project.repo);
  const hasDemo = Boolean(project.demo);
  const hasUplink = hasRepo || hasDemo;

  return (
    <div className="proj-detail" role="dialog" aria-modal="true" aria-labelledby="proj-detail-title">
      <button
        type="button"
        className="proj-detail-scrim"
        aria-label="Close project archive"
        onClick={() => {
          sound.click(320, 0.04, 'square');
          onClose();
        }}
      />
      <div className="proj-detail-panel">
        <div className="proj-detail-scan" aria-hidden />
        <div className="proj-detail-chrome proj-detail-chrome-top" aria-hidden />
        <div className="proj-detail-chrome proj-detail-chrome-bottom" aria-hidden />

        <div className="proj-detail-inner">
          <button
            type="button"
            className="proj-detail-back"
            onClick={() => {
              sound.click(380, 0.04, 'square');
              onClose();
            }}
          >
            [ DISENGAGE · RETURN TO INDEX ]
          </button>

          <div className="proj-detail-banner">
            <span className="proj-detail-banner-pill">ARCHIVE BUFFER</span>
            <span className="proj-detail-banner-sep">//</span>
            <span className="proj-detail-banner-pill proj-detail-banner-pill--hot">FULL DECODE</span>
          </div>

          <div className="proj-detail-meta">
            <span className="proj-detail-id">{project.id}</span>
            <span className="proj-detail-divider-soft">|</span>
            <span className="proj-detail-year">{project.year}</span>
          </div>
          <h3 className="proj-detail-title" id="proj-detail-title">
            {project.title}
          </h3>
          <p className="proj-detail-lead">{project.desc}</p>

          <div className="proj-detail-divider" aria-hidden />

          <p className="proj-detail-body">{project.detail}</p>

          {project.highlights?.length > 0 && (
            <ul className="proj-detail-log">
              {project.highlights.map((line, i) => (
                <li
                  key={i}
                  className="proj-detail-log-line"
                  style={{ animationDelay: `${0.08 + i * 0.05}s` }}
                >
                  <span className="proj-detail-log-gt" aria-hidden>
                    &gt;{' '}
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          )}

          <div className="proj-detail-tags">
            {project.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div className="proj-detail-divider proj-detail-divider--lo" aria-hidden />

          <div className="proj-detail-uplinks">
            <div className="proj-detail-uplinks-label">EXTERNAL UPLINKS</div>
            {!hasUplink && (
              <p className="proj-detail-void">NO PUBLIC ENDPOINT ON RECORD. credentials on request.</p>
            )}
            {hasRepo && (
              <a
                className="proj-detail-link"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.click(900, 0.02, 'triangle')}
              >
                <span className="proj-detail-link-k">REPOSITORY</span>
                <span className="proj-detail-link-v">OPEN UPLINK</span>
              </a>
            )}
            {hasDemo && (
              <a
                className="proj-detail-link"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.click(900, 0.02, 'triangle')}
              >
                <span className="proj-detail-link-k">LIVE INSTANCE</span>
                <span className="proj-detail-link-v">OPEN UPLINK</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
