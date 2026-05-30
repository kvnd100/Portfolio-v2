import { useCallback, useEffect, useRef, useState } from 'react';
import { PORTFOLIO } from '../../../data/portfolio.js';
import { ProjectThumb } from './ProjectThumb.jsx';
import { ProjectDetail } from './ProjectDetail.jsx';

/** Outward drift vectors (--fx,--fy clamped-ish in vmin) + rotation + cascade delay */
const FLEE_STYLE = PORTFOLIO.projects.map((_, i) => {
  const spiral = (i / Math.max(1, PORTFOLIO.projects.length - 1)) * Math.PI * 1.25;
  return {
    '--fx': (Math.cos(spiral + i * 0.4) * 1.05).toFixed(3),
    '--fy': (Math.sin(spiral + i * 0.35) * 0.95 - i * 0.06).toFixed(3),
    '--fr': `${(-4 + ((i * 13) % 18))}deg`,
    '--stagger': String(i % 12),
  };
});

const FLEE_MS = 540;

export function ProjectsPane({ sound }) {
  const [phase, setPhase] = useState(null); // null | 'fleeing' | 'detail'
  const [openId, setOpenId] = useState(null);
  const [pendingId, setPendingId] = useState(null);

  const fleeTimerRef = useRef(null);

  const selected =
    phase === 'detail' && openId ? PORTFOLIO.projects.find((p) => p.id === openId) : null;

  const clearFleeTimer = () => {
    if (fleeTimerRef.current) {
      window.clearTimeout(fleeTimerRef.current);
      fleeTimerRef.current = null;
    }
  };

  const onRequestCloseDetail = useCallback(() => {
    clearFleeTimer();
    setOpenId(null);
    setPendingId(null);
    setPhase(null);
  }, []);

  useEffect(() => () => clearFleeTimer(), []);

  useEffect(() => {
    if (phase !== 'detail' && phase !== 'fleeing') return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (phase === 'fleeing') {
        clearFleeTimer();
        setPendingId(null);
        setPhase(null);
      } else {
        onRequestCloseDetail();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [phase, onRequestCloseDetail]);

  const startPick = (id) => {
    clearFleeTimer();
    sound.zoom();
    setPendingId(id);
    setPhase('fleeing');

    fleeTimerRef.current = window.setTimeout(() => {
      fleeTimerRef.current = null;
      setOpenId(id);
      setPhase('detail');
    }, FLEE_MS);
  };

  const showGrid = phase !== 'detail';
  const fleeing = phase === 'fleeing';

  return (
    <div
      className={[
        'proj-scope',
        fleeing ? 'proj-scope--fleeing' : '',
        phase === 'detail' ? 'proj-scope--detail' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {showGrid && (
        <div className={`proj-grid ${fleeing ? 'proj-grid--fleeing' : ''}`}>
          {PORTFOLIO.projects.map((p, i) => {
            const isPicked = fleeing && pendingId === p.id;
            const isFlee = fleeing && pendingId !== p.id;
            return (
              <button
                key={p.id}
                type="button"
                className={[
                  'proj-card',
                  isPicked ? 'proj-card--picked' : '',
                  isFlee ? 'proj-card--flee' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={isFlee ? FLEE_STYLE[i] : undefined}
                onClick={() => {
                  if (fleeing) return;
                  startPick(p.id);
                }}
                onMouseEnter={() => sound.click(1100, 0.03, 'triangle')}
                disabled={fleeing}
              >
                <div className="proj-card-thumb">
                  <ProjectThumb seed={i + 1} />
                </div>
                <div className="proj-card-id">
                  {p.id} · {p.year}
                </div>
                <div className="proj-card-title">{p.title}</div>
                <div className="proj-card-desc">{p.desc}</div>
                <div className="proj-card-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="proj-card-hint">&gt; OPEN_ARCHIVE</div>
              </button>
            );
          })}
        </div>
      )}

      {selected && (
        <ProjectDetail
          project={selected}
          sound={sound}
          onClose={onRequestCloseDetail}
        />
      )}
    </div>
  );
}
