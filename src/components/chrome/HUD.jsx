import { useState, useEffect } from 'react';

export function HUD({ coords, speed }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n) => String(n).padStart(2, '0');
  const grid = coords
    ? `${Math.round(coords.x).toString().padStart(4, '0')} · ${Math.round(coords.y).toString().padStart(4, '0')}`
    : '0000 · 0000';
  const status = (speed ?? 0) < 0.3 ? 'STANDBY' : 'IN TRANSIT';
  return (
    <>
      <div className="hud">
        <div className="hud-left">
          <span className="hud-dot" />
          <span>GRID.KN / UID 7F·2A·01</span>
          <span className="hud-sep">◇</span>
          <span>{status}</span>
        </div>
        <div className="hud-right">
          <span>SYS {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}</span>
          <span className="hud-sep">◇</span>
          <span>v4.17.2</span>
        </div>
      </div>
      <div className="hud-bottom">
        <div>COORD [{grid}]</div>
        <div className="hud-bottom-mid">VEL {String(Math.round((speed ?? 0) * 10) / 10).padStart(4, '0')} U/S · PWR 100%</div>
        <div>© 2026 / RESPONSE NOMINAL</div>
      </div>
    </>
  );
}
