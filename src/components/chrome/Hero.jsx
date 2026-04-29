import { PORTFOLIO } from '../../data/portfolio.js';

export function Hero({ showHint, touch }) {
  return (
    <div className="hero">
      <div className="hero-kicker">&gt; PORTFOLIO // ONLINE</div>
      <div className="hero-name">{PORTFOLIO.name}</div>
      <div className="hero-role">{PORTFOLIO.role}</div>
      <div className="hero-tag">{PORTFOLIO.tagline}</div>
      {showHint && (
        <div className="hero-hint">
          <span className="hero-hint-key">{touch ? 'TAP' : 'CLICK'}</span>
          <span>{touch ? 'A portal to enter · or the grid to ride' : 'Ground to move · node to enter'}</span>
        </div>
      )}
    </div>
  );
}
