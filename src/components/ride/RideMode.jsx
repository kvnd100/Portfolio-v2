import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { SECTIONS } from '../../data/portfolio.js';
import { Hero } from '../chrome/Hero.jsx';
import { LightCycle } from './LightCycle.jsx';
import { DissolvingTrail } from './DissolvingTrail.jsx';
import { SectionNode } from './SectionNode.jsx';
import { Reticle } from './Reticle.jsx';
import { useViewport } from '../../hooks/useViewport.js';

// Order matches SECTIONS.
const LAYOUTS = {
  mobile: [
    [0.25, 0.40],
    [0.75, 0.40],
    [0.25, 0.55],
    [0.75, 0.55],
    [0.25, 0.70],
    [0.75, 0.70],
    [0.50, 0.85],
  ],
  tablet: [
    [0.18, 0.70],
    [0.30, 0.46],
    [0.44, 0.26],
    [0.62, 0.26],
    [0.74, 0.46],
    [0.84, 0.70],
    [0.52, 0.56],
  ],
  desktop: [
    [0.16, 0.72],
    [0.30, 0.48],
    [0.44, 0.26],
    [0.62, 0.26],
    [0.76, 0.48],
    [0.86, 0.72],
    [0.53, 0.56],
  ],
};

export function RideMode({
  onEnter,
  sound,
  onCoordsChange,
  onSpeedChange,
  onNearNode,
  narrator,
  phase = 'ride',
}) {
  const containerRef = useRef(null);
  const viewport = useViewport();
  const [size, setSize] = useState({ w: 1200, h: 800 });
  const [bike, setBike] = useState({ x: 0, y: 0, heading: -Math.PI / 2, speed: 0 });
  const [target, setTarget] = useState(null);
  const [trail, setTrail] = useState([]);
  const [reticle, setReticle] = useState(null);
  const [hoverIdx, setHoverIdx] = useState(-1);
  const [activeKey, setActiveKey] = useState(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const lastRef = useRef(performance.now());
  const lastSpokenRef = useRef(0);
  const enteredRef = useRef(false);

  const tier = viewport.tier;
  const nodeSizeBase = tier === 'mobile' ? 58 : tier === 'tablet' ? 64 : 70;
  const padX = tier === 'mobile' ? 70 : 110;
  const padY = tier === 'mobile' ? 90 : 110;

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      const r = containerRef.current.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
      setBike((b) => (b.x === 0 ? { x: r.width * 0.5, y: r.height * (tier === 'mobile' ? 0.92 : 0.78), heading: -Math.PI / 2, speed: 0 } : b));
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [tier]);

  const nodes = useMemo(() => {
    const positions = LAYOUTS[tier] || LAYOUTS.desktop;
    return SECTIONS.map((s, i) => ({
      ...s,
      x: Math.max(padX, Math.min(size.w - padX, positions[i][0] * size.w)),
      y: Math.max(padY, Math.min(size.h - padY, positions[i][1] * size.h)),
    }));
  }, [size, tier, padX, padY]);

  const blockClicks = phase !== 'ride';

  const handleMove = useCallback((clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setTarget({ x, y, nodeKey: null });
    setReticle({ x, y, id: performance.now() });
    enteredRef.current = false;
  }, []);

  const handleClick = (e) => {
    if (blockClicks) return;
    if (e.target.closest('[data-noclick]')) return;
    handleMove(e.clientX, e.clientY);
  };

  const handleNodeClick = (node) => {
    setTarget({ x: node.x, y: node.y, nodeKey: node.key });
    setActiveKey(node.key);
    setReticle({ x: node.x, y: node.y, id: performance.now() });
    enteredRef.current = false;
    narrator && narrator.speak('routing', { section: node.label });
  };

  // 72px tap-radius around portals; preventDefault stops the synthetic click
  // from also firing handleClick.
  const handleTouch = useCallback((e) => {
    if (blockClicks) return;
    if (e.target.closest('[data-noclick]')) return;
    e.preventDefault();
    const touch = e.changedTouches[0];
    if (!touch || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const TOUCH_R = 72;
    const hit = nodes.find((n) => Math.hypot(n.x - x, n.y - y) < TOUCH_R);
    if (hit) handleNodeClick(hit);
    else     handleMove(touch.clientX, touch.clientY);
  }, [blockClicks, nodes, handleMove]);

  useEffect(() => {
    function step() {
      const now = performance.now();
      const dt = Math.min(64, now - lastRef.current) / 16.67;
      lastRef.current = now;

      setBike((b) => {
        if (!target) {
          const speed = Math.max(0, b.speed - 0.6 * dt);
          return { ...b, speed };
        }
        const dx = target.x - b.x;
        const dy = target.y - b.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 4) {
          if (target.nodeKey && !enteredRef.current) {
            enteredRef.current = true;
            sound.zoom();
            onEnter(target.nodeKey);
          }
          return { ...b, speed: Math.max(0, b.speed - 0.6 * dt) };
        }

        const desiredHeading = Math.atan2(dy, dx);
        let dh = desiredHeading - b.heading;
        while (dh > Math.PI) dh -= Math.PI * 2;
        while (dh < -Math.PI) dh += Math.PI * 2;
        const heading = b.heading + dh * Math.min(1, 0.18 * dt);

        const maxSpeed = 7.5;
        const approachSpeed = Math.min(maxSpeed, dist * 0.08 + 1.2);
        const targetSpeed = Math.min(approachSpeed, maxSpeed);
        const speed = b.speed + (targetSpeed - b.speed) * 0.12 * dt;

        const x = b.x + Math.cos(heading) * speed * dt;
        const y = b.y + Math.sin(heading) * speed * dt;

        return { x, y, heading, speed };
      });

      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  useEffect(() => {
    let raf;
    function tick() {
      if (bike.speed > 0.5) {
        setTrail((prev) => {
          const last = prev[prev.length - 1];
          if (!last || Math.hypot(last.x - bike.x, last.y - bike.y) > 3) {
            return [...prev.slice(-200), { x: bike.x, y: bike.y, t: performance.now() }];
          }
          return prev;
        });
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [bike.x, bike.y, bike.speed]);

  useEffect(() => {
    const id = setInterval(() => {
      setTrail((prev) => {
        const now = performance.now();
        return prev.filter((p) => now - p.t < 2000);
      });
    }, 120);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    onCoordsChange && onCoordsChange({ x: bike.x, y: bike.y });
    onSpeedChange && onSpeedChange(bike.speed);

    let best = -1, bd = Infinity;
    nodes.forEach((n, i) => {
      const d = Math.hypot(n.x - bike.x, n.y - bike.y);
      if (d < bd) { bd = d; best = i; }
    });
    onNearNode && onNearNode(bd < 110 ? nodes[best].key : null);

    if (target && !target.nodeKey) setActiveKey(null);
  }, [bike.x, bike.y, bike.speed]);

  useEffect(() => {
    const px = (bike.x - size.w / 2) * -0.025;
    const py = (bike.y - size.h / 2) * -0.025;
    setParallax({ x: px, y: py });
  }, [bike.x, bike.y, size.w, size.h]);

  useEffect(() => {
    const id = setInterval(() => {
      const idleMs = bike.speed < 0.3 ? performance.now() - lastSpokenRef.current : 0;
      if (idleMs > 18000 && narrator) {
        narrator.speak('idle');
        lastSpokenRef.current = performance.now();
      }
    }, 3000);
    return () => clearInterval(id);
  }, [bike.speed, narrator]);

  useEffect(() => { if (bike.speed > 0.3) lastSpokenRef.current = performance.now(); }, [bike.speed > 0.3]);

  const pathLine = target && Math.hypot(target.x - bike.x, target.y - bike.y) > 10 ? (
    <line x1={bike.x} y1={bike.y} x2={target.x} y2={target.y}
          stroke="rgba(0,229,255,0.5)" strokeWidth="1" strokeDasharray="3 6" />
  ) : null;

  const isScattering = phase === 'entering';
  const isReturning  = phase === 'returning';
  const isHidden     = phase === 'open' || phase === 'exiting';
  const cx = size.w / 2, cy = size.h / 2;

  function nodeScatterStyle(n, i) {
    if (phase === 'ride') return { transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.55s ease', transform: 'translate(0,0)', opacity: 1 };
    const dx = n.x - cx, dy = n.y - cy;
    const len = Math.hypot(dx, dy) || 1;
    const dist = 220 + i * 28;
    const tx = (dx / len) * dist;
    const ty = (dy / len) * dist;
    if (isScattering || isHidden) {
      return {
        transition: `transform ${0.42 + i * 0.04}s cubic-bezier(0.4,0,1,1), opacity ${0.38 + i * 0.03}s ease`,
        transform: `translate(${tx}px, ${ty}px) scale(0.7)`,
        opacity: 0,
        pointerEvents: 'none',
      };
    }
    if (isReturning) {
      return {
        transition: `transform ${0.5 + i * 0.05}s cubic-bezier(0,0,0.2,1), opacity ${0.45 + i * 0.04}s ease`,
        transform: 'translate(0,0) scale(1)',
        opacity: 1,
        pointerEvents: 'none',
      };
    }
    return {};
  }

  const heroExtraStyle = isScattering || isHidden
    ? { transform: 'translateX(-140px)', opacity: 0, transition: 'transform 0.45s cubic-bezier(0.4,0,1,1), opacity 0.4s ease', pointerEvents: 'none' }
    : isReturning
    ? { transform: 'translateX(0)', opacity: 1, transition: 'transform 0.55s cubic-bezier(0,0,0.2,1), opacity 0.5s ease' }
    : { transition: 'transform 0.55s ease, opacity 0.5s ease' };

  const bikeExtraStyle = isScattering || isHidden
    ? { opacity: 0, transition: 'opacity 0.35s ease', transform: `translate(-50%,-50%) rotate(${bike.heading}rad) translateX(120px) scale(1.2)` }
    : isReturning
    ? { opacity: 1, transition: 'opacity 0.5s ease 0.2s' }
    : {};

  const gridOpacity = isScattering || isHidden ? 0.25 : 1;

  return (
    <div
      ref={containerRef}
      className="ride-surface"
      style={{ position: 'absolute', inset: 0 }}
      onClick={blockClicks ? undefined : handleClick}
      onTouchEnd={blockClicks ? undefined : handleTouch}
    >
      <div className="flat-grid" style={{
        transform: `translate(${parallax.x}px, ${parallax.y}px)`,
        transition: 'transform 0.3s ease-out, opacity 0.5s ease',
        opacity: gridOpacity,
      }} />

      <div style={heroExtraStyle}>
        <Hero showHint={phase === 'ride'} touch={viewport.touch} />
      </div>

      {phase === 'ride' && <>
        <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
          {pathLine}
        </svg>
        {reticle && <Reticle key={reticle.id} x={reticle.x} y={reticle.y} />}
      </>}

      <DissolvingTrail points={trail} />

      <div style={{
        position: 'absolute', left: bike.x, top: bike.y,
        ...bikeExtraStyle,
      }}>
        <LightCycle heading={bike.heading} dim={bike.speed < 0.3 && phase === 'ride'} />
      </div>

      {nodes.map((n, i) => (
        <div key={n.key} data-noclick style={nodeScatterStyle(n, i)}>
          <SectionNode
            x={n.x} y={n.y}
            label={n.label} code={n.code}
            sizeBase={nodeSizeBase}
            active={activeKey === n.key && phase === 'ride'}
            hovered={hoverIdx === i && phase === 'ride'}
            onClick={(e) => { if (blockClicks) return; e.stopPropagation(); handleNodeClick(n); }}
            onHover={(v) => phase === 'ride' && setHoverIdx(v ? i : -1)}
          />
        </div>
      ))}
    </div>
  );
}
