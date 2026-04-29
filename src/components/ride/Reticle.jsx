export function Reticle({ x, y, keyId }) {
  return (
    <svg
      key={keyId}
      style={{
        position: 'absolute', left: x, top: y,
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
      width="60" height="60" viewBox="-30 -30 60 60"
    >
      <circle r="4" fill="#00e5ff" opacity="0.9">
        <animate attributeName="opacity" from="0.9" to="0" dur="1.2s" repeatCount="1" fill="freeze" />
      </circle>
      <circle r="10" fill="none" stroke="#00e5ff" strokeWidth="1.2">
        <animate attributeName="r"       from="6"   to="26" dur="1.2s" repeatCount="1" fill="freeze" />
        <animate attributeName="opacity" from="0.9" to="0"  dur="1.2s" repeatCount="1" fill="freeze" />
      </circle>
      <circle r="16" fill="none" stroke="#00e5ff" strokeWidth="0.6" opacity="0.5">
        <animate attributeName="r"       from="10"  to="32" dur="1.2s" repeatCount="1" fill="freeze" />
        <animate attributeName="opacity" from="0.5" to="0"  dur="1.2s" repeatCount="1" fill="freeze" />
      </circle>
      {[0, 1, 2, 3].map((i) => {
        const a = i * 90 + 45;
        const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180);
        return (
          <line key={i}
            x1={c * 16} y1={s * 16} x2={c * 22} y2={s * 22}
            stroke="#00e5ff" strokeWidth="1.4" />
        );
      })}
    </svg>
  );
}
