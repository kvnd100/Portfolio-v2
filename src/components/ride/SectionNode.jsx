export function SectionNode({ x, y, label, code, active, hovered, onClick, onHover, sizeBase = 70 }) {
  const size = active ? sizeBase + 22 : (hovered ? sizeBase + 10 : sizeBase);
  return (
    <div
      className="section-node"
      style={{
        position: 'absolute',
        left: x, top: y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'auto',
        zIndex: 20,
      }}
      onMouseEnter={() => onHover && onHover(true)}
      onMouseLeave={() => onHover && onHover(false)}
    >
      <button
        onClick={onClick}
        aria-label={`Open ${label} sector`}
        style={{
          width: size, height: size,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.25s ease',
          filter: active
            ? 'drop-shadow(0 0 16px #00e5ff)'
            : (hovered ? 'drop-shadow(0 0 10px #00e5ff)' : 'drop-shadow(0 0 4px rgba(0,229,255,0.35))'),
        }}
      >
        <svg viewBox="-50 -50 100 100" width={size} height={size} style={{ overflow: 'visible' }}>
          <polygon
            points="0,-40 34,-20 34,20 0,40 -34,20 -34,-20"
            fill={active ? 'rgba(0,229,255,0.28)' : (hovered ? 'rgba(0,229,255,0.12)' : 'rgba(0,229,255,0.04)')}
            stroke="#00e5ff" strokeWidth={active ? 2 : 1.2}
            style={{ transition: 'all 0.25s' }}
          />
          <polygon
            points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11"
            fill="none" stroke="#7df9ff" strokeWidth="0.8" opacity="0.6"
          />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i * 60 - 90) * Math.PI / 180;
            return (
              <line key={i}
                x1={Math.cos(a) * 40} y1={Math.sin(a) * 40}
                x2={Math.cos(a) * 46} y2={Math.sin(a) * 46}
                stroke="#00e5ff" strokeWidth="1.5" />
            );
          })}
          <circle r={active ? 6 : 3} fill="#00e5ff" style={{ transition: 'all 0.25s' }} />
          {active && (
            <circle r="14" fill="none" stroke="#00e5ff" strokeWidth="1">
              <animate attributeName="r"       from="14"  to="42" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.9" to="0"  dur="1.2s" repeatCount="indefinite" />
            </circle>
          )}
        </svg>
      </button>
      <div className="section-node-tag" style={{ top: size + 6 }}>
        <div className="node-label" style={{
          color: active || hovered ? 'var(--cyan)' : 'var(--cyan-soft)',
          borderColor: active || hovered ? 'var(--cyan)' : 'var(--cyan-line)',
        }}>
          {label}
        </div>
        <div className="node-code">{code}</div>
      </div>
    </div>
  );
}
