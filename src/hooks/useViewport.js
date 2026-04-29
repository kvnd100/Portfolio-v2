import { useState, useEffect } from 'react';

export function useViewport() {
  const [v, setV] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1200,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
    touch:
      typeof window !== 'undefined' &&
      (window.matchMedia?.('(pointer: coarse)').matches || 'ontouchstart' in window),
  }));

  useEffect(() => {
    const onResize = () => setV((cur) => ({ ...cur, w: window.innerWidth, h: window.innerHeight }));
    window.addEventListener('resize', onResize);

    const mq = window.matchMedia?.('(pointer: coarse)');
    const onPointer = (e) => setV((cur) => ({ ...cur, touch: e.matches || 'ontouchstart' in window }));
    mq?.addEventListener?.('change', onPointer);

    return () => {
      window.removeEventListener('resize', onResize);
      mq?.removeEventListener?.('change', onPointer);
    };
  }, []);

  const tier = v.w < 640 ? 'mobile' : v.w < 1024 ? 'tablet' : 'desktop';
  return { ...v, tier };
}
