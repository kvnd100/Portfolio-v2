import { useState, useEffect } from 'react';

export function ProgramTerminal({ messages }) {
  const [open, setOpen] = useState(() => sessionStorage.getItem('kn_program_open') !== '0');

  useEffect(() => {
    sessionStorage.setItem('kn_program_open', open ? '1' : '0');
  }, [open]);

  const latest = open && messages.length ? messages[messages.length - 1] : null;

  return (
    <div
      className={'program-terminal ' + (open ? 'is-open' : 'is-collapsed')}
      aria-live="polite"
    >
      <div className="program-header">
        <span className="program-dot" />
        <span>PROGRAM</span>
        {open && (
          <>
            <span className="program-sep">//</span>
            <span className="program-uid">UID 0001.ENCOM</span>
          </>
        )}
        <button
          className="program-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Minimise PROGRAM terminal' : 'Open PROGRAM terminal'}
          aria-expanded={open}
          type="button"
        >
          {open ? '—' : '+'}
        </button>
      </div>
      {open && (
        <div className="program-lines">
          {latest && (
            <div key={latest.id} className={'program-line ' + (latest.fading ? 'fading' : '')}>
              <span className="program-arrow">{'>'}</span>
              <span className="program-text">{latest.text}</span>
              {latest.typing && <span className="program-caret">▊</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
