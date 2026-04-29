import { useEffect, useRef, useCallback } from 'react';

export function useSoundEngine(enabled, speedRef) {
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  useEffect(() => {
    if (!enabled) {
      if (nodesRef.current) {
        const { osc1, osc2, sub, gain } = nodesRef.current;
        const ctx = ctxRef.current;
        try {
          gain.gain.cancelScheduledValues(ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
          setTimeout(() => { try { osc1.stop(); osc2.stop(); sub.stop(); } catch (e) {} }, 300);
        } catch (e) {}
        nodesRef.current = null;
      }
      return;
    }
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const sub  = ctx.createOscillator();
    const gain = ctx.createGain();
    const filt = ctx.createBiquadFilter();

    filt.type = 'lowpass';
    filt.frequency.value = 200;
    filt.Q.value = 6;

    osc1.type = 'sawtooth'; osc1.frequency.value = 55;
    osc2.type = 'sawtooth'; osc2.frequency.value = 57;
    sub.type  = 'sine';     sub.frequency.value  = 27.5;

    gain.gain.value = 0;

    osc1.connect(filt); osc2.connect(filt); sub.connect(filt);
    filt.connect(gain); gain.connect(ctx.destination);

    osc1.start(); osc2.start(); sub.start();
    nodesRef.current = { osc1, osc2, sub, gain, filt };

    let raf;
    function tick() {
      if (!nodesRef.current) return;
      const s = (speedRef && speedRef.current) || 0;
      const norm = Math.min(1, s / 6);
      const targetGain = norm * 0.05;
      gain.gain.linearRampToValueAtTime(targetGain, ctx.currentTime + 0.08);
      const f = 55 + norm * 55;
      osc1.frequency.linearRampToValueAtTime(f, ctx.currentTime + 0.08);
      osc2.frequency.linearRampToValueAtTime(f + 2, ctx.currentTime + 0.08);
      sub.frequency.linearRampToValueAtTime(f / 2, ctx.currentTime + 0.08);
      filt.frequency.linearRampToValueAtTime(200 + norm * 900, ctx.currentTime + 0.08);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (nodesRef.current) {
        try {
          gain.gain.cancelScheduledValues(ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
          setTimeout(() => { try { osc1.stop(); osc2.stop(); sub.stop(); } catch (e) {} }, 300);
        } catch (e) {}
        nodesRef.current = null;
      }
    };
  }, [enabled, getCtx, speedRef]);

  const click = useCallback((freq = 880, dur = 0.06, type = 'square') => {
    if (!enabled) return;
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = 0;
    g.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.002);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + dur);
  }, [enabled, getCtx]);

  const zoom = useCallback(() => {
    if (!enabled) return;
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(120, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.4);
    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.55);
  }, [enabled, getCtx]);

  return { click, zoom };
}
