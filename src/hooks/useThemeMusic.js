import { useEffect, useRef } from 'react';

const TRACK_URL = '/Circuit Noir.mp3';
const TARGET_VOLUME = 0.32;
const FADE_MS = 600;

export function useThemeMusic(enabled) {
  const audioRef = useRef(null);
  const fadeRafRef = useRef(0);

  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio(TRACK_URL);
      a.loop = true;
      a.preload = 'auto';
      a.volume = 0;
      audioRef.current = a;
    }
    const a = audioRef.current;
    cancelAnimationFrame(fadeRafRef.current);

    const fadeTo = (target, after) => {
      const start = performance.now();
      const from  = a.volume;
      function step(now) {
        const t = Math.min(1, (now - start) / FADE_MS);
        a.volume = from + (target - from) * t;
        if (t < 1) fadeRafRef.current = requestAnimationFrame(step);
        else after && after();
      }
      fadeRafRef.current = requestAnimationFrame(step);
    };

    if (enabled) {
      const p = a.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
      fadeTo(TARGET_VOLUME);
    } else {
      fadeTo(0, () => { try { a.pause(); } catch (e) {} });
    }

    return () => cancelAnimationFrame(fadeRafRef.current);
  }, [enabled]);

  useEffect(() => () => {
    cancelAnimationFrame(fadeRafRef.current);
    if (audioRef.current) {
      try { audioRef.current.pause(); } catch (e) {}
      audioRef.current.src = '';
      audioRef.current = null;
    }
  }, []);
}
