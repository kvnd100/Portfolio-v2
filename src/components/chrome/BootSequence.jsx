import { useState, useEffect, useRef } from 'react';

const LINES = [
  '> FLYNN/SYS CHECK ....................... OK',
  '> ENCOM MCP HANDSHAKE ................... OK',
  '> GRID INTEGRITY (7/7) .................. OK',
  '> PORTFOLIO MANIFEST LOADED [KN]',
  '> LIGHTCYCLE READY ON GATE 02',
  '> IDENTITY DISC VERIFIED',
  '> BOOTING INTERFACE ....................',
];

export function BootSequence({ onDone }) {
  const [shown, setShown]       = useState(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady]       = useState(false);
  const readyRef     = useRef(false);
  const cancelledRef = useRef(false);

  const skipOrEnter = () => {
    if (readyRef.current) {
      onDone();
      return;
    }
    cancelledRef.current = true;
    setShown(LINES.length);
    setProgress(1);
    readyRef.current = true;
    setReady(true);
  };

  useEffect(() => {
    cancelledRef.current = false;
    (async () => {
      for (let i = 0; i < LINES.length; i++) {
        if (cancelledRef.current) return;
        await new Promise((r) => setTimeout(r, 180 + Math.random() * 120));
        if (cancelledRef.current) return;
        setShown(i + 1);
      }
      const start = performance.now();
      const dur = 900;
      function step() {
        if (cancelledRef.current) return;
        const t = Math.min(1, (performance.now() - start) / dur);
        setProgress(t);
        if (t < 1) requestAnimationFrame(step);
        else { readyRef.current = true; setReady(true); }
      }
      requestAnimationFrame(step);
    })();

    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
        e.preventDefault();
        skipOrEnter();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelledRef.current = true;
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div
      className={'boot ' + (ready ? 'is-ready' : 'is-loading')}
      onClick={skipOrEnter}
      onTouchEnd={(e) => { e.preventDefault(); skipOrEnter(); }}
      role="button"
      aria-label={ready ? 'Tap to enter the Grid' : 'Skip boot sequence'}
    >
      <div className="boot-center">
        <div className="boot-title">GRID.KN</div>
        <div className="boot-lines">
          {LINES.map((l, i) => (
            <div key={i} className={'boot-line ' + (i < shown ? 'on' : '')}>{l}</div>
          ))}
        </div>
        <div className="boot-bar"><div className="boot-bar-fill" style={{ width: progress * 100 + '%' }} /></div>
        <div className={'boot-skip ' + (ready ? 'boot-login' : '')}>
          {ready
            ? '[ TAP · CLICK · ENTER TO LOG IN ]'
            : '[ ENTER · ESC · SPACE TO SKIP ]'}
        </div>
      </div>
    </div>
  );
}
