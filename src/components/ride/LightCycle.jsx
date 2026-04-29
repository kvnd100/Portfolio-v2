export function LightCycle({ heading = 0, scale = 1, dim = false }) {
  return (
    <div
      className="lightcycle"
      style={{
        position: 'absolute',
        width: 96 * scale,
        height: 48 * scale,
        transform: `translate(-50%,-50%) rotate(${heading}rad)`,
        pointerEvents: 'none',
        opacity: dim ? 0.85 : 1,
        transition: 'opacity 0.4s',
      }}
    >
      <svg viewBox="0 0 96 48" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="bikeBody" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#0a1a24" />
            <stop offset="1" stopColor="#02060d" />
          </linearGradient>
        </defs>
        <g filter="url(#glow)">
          <ellipse cx="20" cy="24" rx="14" ry="14" fill="none" stroke="#00e5ff" strokeWidth="2" />
          <ellipse cx="76" cy="24" rx="14" ry="14" fill="none" stroke="#00e5ff" strokeWidth="2" />
        </g>
        <ellipse cx="20" cy="24" rx="10" ry="10" fill="none" stroke="#7df9ff" strokeWidth="0.8" opacity="0.7" />
        <ellipse cx="76" cy="24" rx="10" ry="10" fill="none" stroke="#7df9ff" strokeWidth="0.8" opacity="0.7" />
        <path d="M18,18 L30,10 L66,10 L78,18 L78,30 L66,38 L30,38 L18,30 Z"
              fill="url(#bikeBody)" stroke="#00e5ff" strokeWidth="1.2" filter="url(#glow)" />
        <path d="M34,13 L62,13" stroke="#00e5ff" strokeWidth="1.4" filter="url(#glow)" />
        <path d="M38,18 L58,18" stroke="#7df9ff" strokeWidth="0.6" />
        <path d="M46,10 L50,4 L54,10 Z" fill="#00e5ff" opacity="0.85" filter="url(#glow)" />
        <circle cx="82" cy="24" r="2" fill="#e9fbff" filter="url(#glow)" />
      </svg>
    </div>
  );
}
