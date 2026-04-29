export function DissolvingTrail({ points, color = '#00e5ff', width = 3, life = 1600 }) {
  if (points.length < 2) return null;
  const now = performance.now();
  const segs = [];
  for (let i = 1; i < points.length; i++) {
    const age = now - points[i].t;
    const alpha = Math.max(0, 1 - age / life);
    if (alpha <= 0.01) continue;
    segs.push({
      d: `M${points[i - 1].x},${points[i - 1].y} L${points[i].x},${points[i].y}`,
      a: alpha,
    });
  }
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <defs>
        <filter id="trailGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {segs.map((s, i) => (
        <g key={i} opacity={s.a} filter="url(#trailGlow)">
          <path d={s.d} fill="none" stroke={color} strokeWidth={width + 4} opacity="0.22" />
          <path d={s.d} fill="none" stroke={color} strokeWidth={width} />
          <path d={s.d} fill="none" stroke="#e9fbff" strokeWidth={Math.max(1, width - 1.6)} opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}
