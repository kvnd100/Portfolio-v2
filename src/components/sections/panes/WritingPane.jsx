import { PORTFOLIO } from '../../../data/portfolio.js';

export function WritingPane({ sound }) {
  const items = PORTFOLIO.writing;
  if (!items?.length) {
    return (
      <div className="writing-empty" aria-live="polite">
        <span className="writing-empty-tag">DATA_INTEGRITY SECTOR_005</span>
        <h3 className="writing-empty-head">
          ARCHIVE_DAMAGED / RECOVERY_RUNNING
        </h3>
        <p className="writing-empty-body">
          essay_buffer: checksum FAILED after conduit I/O spike. field_notes offline. PROGRAM running
          restripe + parity replay from salvage.
        </p>
        <p className="writing-empty-body writing-empty-body--dim">
          stdout: gated. roam Grid loop until archive_verify=PASS lamp_cyan steady.
        </p>
        <span className="writing-empty-meta" aria-hidden>
          recovery_state=PARITY_REBUILD blocks_pending=PENDING user=stand_by
        </span>
      </div>
    );
  }
  return (
    <div className="writing-list">
      {items.map((w, i) => (
        <div key={i} className="writing-item" onMouseEnter={() => sound.click(900, 0.02, 'triangle')}>
          <span className="writing-date">{w.date}</span>
          <span className="writing-title">{w.title}</span>
          <span className="writing-read">{w.read} →</span>
        </div>
      ))}
    </div>
  );
}
