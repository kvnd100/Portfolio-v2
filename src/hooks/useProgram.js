import { useState, useRef, useCallback } from 'react';

export const PROGRAM_LINES = {
  boot: [
    "Hey user — you're on the Grid.",
    "I'm PROGRAM. I keep this portfolio in one piece.",
    'Click the ground to move. Click a portal to enter it.',
  ],
  idle: [
    'Standing by, user.',
    'The Grid is quiet. Pick a portal.',
    'Energy reserves are nominal.',
    'Waiting on your next input, user.',
    'Seven sectors remain indexed.',
    'Disc signature still warm.',
  ],
  routing: [
    'Routing to {section}.',
    'Plotting vector to {section} sector.',
    'Acknowledged — heading for {section}.',
    'Lightcycle committed. Destination: {section}.',
  ],
  firstMove: [
    'Lightcycle online. Ride carefully.',
    'Good. The Grid rewards decisive programs.',
  ],
  enter: [
    'Sector {section} unpacked.',
    'You have reached {section}. Records are live.',
    'Welcome to {section}, user.',
  ],
  close: [
    'Sector released. Back on the Grid.',
    'Returning you to the mesh.',
  ],
};

export function useProgram() {
  const [messages, setMessages] = useState([]);
  const idRef = useRef(0);
  const queueRef = useRef([]);
  const typingRef = useRef(false);

  const pushLine = useCallback((text) => {
    const id = ++idRef.current;
    setMessages((prev) => {
      const next = [...prev, { id, text: '', typing: true, fading: false }];
      return next.slice(-4);
    });
    let i = 0;
    typingRef.current = true;
    const typeInterval = setInterval(() => {
      i++;
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text: text.slice(0, i) } : m)));
      if (i >= text.length) {
        clearInterval(typeInterval);
        setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, typing: false } : m)));
        typingRef.current = false;
        setTimeout(() => {
          setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, fading: true } : m)));
          setTimeout(() => {
            setMessages((prev) => prev.filter((m) => m.id !== id));
          }, 900);
        }, 6500);
        if (queueRef.current.length) {
          const next = queueRef.current.shift();
          setTimeout(() => pushLine(next), 250);
        }
      }
    }, 28);
  }, []);

  const speak = useCallback((tag, ctx = {}) => {
    const pool = PROGRAM_LINES[tag];
    if (!pool || !pool.length) return;
    let line = pool[Math.floor(Math.random() * pool.length)];
    Object.keys(ctx).forEach((k) => { line = line.replace(`{${k}}`, ctx[k]); });
    if (typingRef.current) queueRef.current.push(line);
    else pushLine(line);
  }, [pushLine]);

  const bootedRef = useRef(false);
  const boot = useCallback(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    PROGRAM_LINES.boot.forEach((line, i) => {
      setTimeout(() => {
        if (typingRef.current) queueRef.current.push(line);
        else pushLine(line);
      }, i * 2600);
    });
  }, [pushLine]);

  return { messages, speak, boot };
}
