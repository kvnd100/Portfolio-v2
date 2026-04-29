export function ProjectThumb({ seed }) {
  const rnd = (s) => { const x = Math.sin(s) * 10000; return x - Math.floor(x); };
  const pts = Array.from({ length: 4 }, (_, i) => ({
    x: Math.round(rnd(seed + i) * 280),
    y: Math.round(rnd(seed * 2.7 + i) * 80),
  }));
  const d = `M0,${40 + rnd(seed) * 20} ` + pts.map((p) => `L${p.x},${p.y}`).join(' ') + ` L280,${40 + rnd(seed * 3) * 20}`;
  return (
    <svg viewBox="0 0 280 80" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id={'tg' + seed} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#00e5ff" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#00e5ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#00e5ff" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={i} x1="0" x2="280" y1={13 * i + 6} y2={13 * i + 6} stroke="rgba(0,229,255,0.08)" strokeWidth="1" />
      ))}
      <path d={d} fill="none" stroke={`url(#tg${seed})`} strokeWidth="2" />
      <path d={d} fill="none" stroke="#00e5ff" strokeWidth="0.6" opacity="0.9" />
      {pts.map((p, i) => (
        <rect key={i} x={p.x - 2} y={p.y - 2} width="4" height="4" fill="#00e5ff" />
      ))}
    </svg>
  );
}
