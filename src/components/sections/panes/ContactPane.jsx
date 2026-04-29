import { useState } from 'react';
import { PORTFOLIO } from '../../../data/portfolio.js';

export function ContactPane({ sound }) {
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);
  const c = PORTFOLIO.contact;

  const submit = (e) => {
    e.preventDefault();
    sound.zoom();
    // No backend wired — fall back to a mailto compose so the message actually
    // leaves the Grid. Users see immediate feedback either way.
    const subject = encodeURIComponent(`Transmission from ${form.name || 'Anonymous Program'}`);
    const body    = encodeURIComponent(`${form.msg}\n\n— ${form.name} <${form.email}>`);
    window.location.href = `mailto:${c.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: '', email: '', msg: '' });
  };

  return (
    <div className="contact-grid">
      <form onSubmit={submit} className="col contact-form">
        <div className="contact-field">
          <label className="contact-label">Handle</label>
          <input
            className="contact-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="YOUR NAME / USER-ID"
            required
          />
        </div>
        <div className="contact-field">
          <label className="contact-label">Return vector</label>
          <input
            className="contact-input"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@node.grid"
            required
          />
        </div>
        <div className="contact-field">
          <label className="contact-label">Transmission</label>
          <textarea
            className="contact-area"
            value={form.msg}
            onChange={(e) => setForm({ ...form, msg: e.target.value })}
            placeholder="> compose message..."
            required
          />
        </div>
        <button className="btn" type="submit">{sent ? '✓ TRANSMITTED' : 'SEND ↗'}</button>
      </form>

      <div className="col contact-side">
        <div className="contact-label">Direct channels</div>
        <div className="contact-links">
          <a className="contact-link" href={'mailto:' + c.email} onMouseEnter={() => sound.click(700, 0.03)}>
            <span>EMAIL</span><span className="contact-link-val">{c.email}</span>
          </a>
          <a className="contact-link" href={'https://' + c.github} target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.click(700, 0.03)}>
            <span>GITHUB</span><span className="contact-link-val">{c.github}</span>
          </a>
          <a className="contact-link" href={'https://' + c.linkedin} target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.click(700, 0.03)}>
            <span>LINKEDIN</span><span className="contact-link-val">{c.linkedin}</span>
          </a>
          {c.site && (
            <a className="contact-link" href={'https://' + c.site} target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.click(700, 0.03)}>
              <span>SITE</span><span className="contact-link-val">{c.site}</span>
            </a>
          )}
        </div>
        <div className="contact-label" style={{ marginTop: '14px' }}>Response time</div>
        <div className="contact-blurb">
          Avg. <span className="glow-cyan">≤ 24h</span>. Open to remote and hybrid Software Engineer roles — frontend-heavy, full-stack TypeScript, or React/Next.js product teams.
        </div>
      </div>
    </div>
  );
}
