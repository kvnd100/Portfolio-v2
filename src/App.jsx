import { useState, useEffect, useRef, useCallback } from 'react';
import { SECTIONS } from './data/portfolio.js';
import { TronCursor }      from './components/chrome/TronCursor.jsx';
import { CRTOverlay }      from './components/chrome/CRTOverlay.jsx';
import { HUD }             from './components/chrome/HUD.jsx';
import { BootSequence }    from './components/chrome/BootSequence.jsx';
import { Controls }        from './components/chrome/Controls.jsx';
import { SectionShell }    from './components/sections/SectionShell.jsx';
import { ProgramTerminal } from './components/program/ProgramTerminal.jsx';
import { RideMode }        from './components/ride/RideMode.jsx';
import { useSoundEngine }  from './hooks/useSoundEngine.js';
import { useThemeMusic }   from './hooks/useThemeMusic.js';
import { useProgram }      from './hooks/useProgram.js';
import { useViewport }     from './hooks/useViewport.js';

export default function App() {
  const [booted, setBooted]         = useState(false);
  const [soundOn, setSoundOn]       = useState(false);
  const [musicOn, setMusicOn]       = useState(false);
  const [activeSection, setSection] = useState(null);
  const [phase, setPhase]           = useState('ride');
  const [enterKey, setEnterKey]     = useState(null);
  const [coords, setCoords]         = useState({ x: 0, y: 0 });
  const [speed, setSpeed]           = useState(0);
  const speedRef = useRef(0);
  useEffect(() => { speedRef.current = speed; }, [speed]);

  const sound    = useSoundEngine(soundOn, speedRef);
  useThemeMusic(musicOn);
  const program  = useProgram();
  const viewport = useViewport();

  useEffect(() => {
    document.body.dataset.tier  = viewport.tier;
    document.body.dataset.touch = viewport.touch ? '1' : '0';
  }, [viewport.tier, viewport.touch]);

  useEffect(() => {
    if (booted) {
      const t = setTimeout(() => program.boot(), 400);
      return () => clearTimeout(t);
    }
  }, [booted]);

  const handleEnter = useCallback((key) => {
    if (phase !== 'ride') return;
    setEnterKey(key);
    setPhase('entering');
    const sec = SECTIONS.find((s) => s.key === key);
    if (sec) program.speak('routing', { section: sec.label });

    setTimeout(() => {
      setSection(key);
      setPhase('open');
      if (sec) program.speak('enter', { section: sec.label });
    }, 560);
  }, [phase, program]);

  const handleClose = useCallback(() => {
    if (phase !== 'open') return;
    setPhase('exiting');
    program.speak('close');

    setTimeout(() => {
      setSection(null);
      setEnterKey(null);
      setPhase('returning');
      setTimeout(() => setPhase('ride'), 560);
    }, 380);
  }, [phase, program]);

  return (
    <>
      {!booted && <BootSequence onDone={() => setBooted(true)} />}

      {!viewport.touch && <TronCursor />}
      <CRTOverlay />
      <HUD coords={coords} speed={speed} />

      <RideMode
        onEnter={handleEnter}
        sound={sound}
        onCoordsChange={setCoords}
        onSpeedChange={setSpeed}
        onNearNode={() => {}}
        narrator={program}
        phase={phase}
        enterKey={enterKey}
      />

      {(phase === 'open' || phase === 'exiting') && activeSection && (
        <SectionShell
          section={activeSection}
          onClose={handleClose}
          sound={sound}
          phase={phase}
        />
      )}

      <ProgramTerminal messages={program.messages} />

      <Controls
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        musicOn={musicOn}
        setMusicOn={setMusicOn}
        onReboot={() => {
          setBooted(false);
          setSection(null);
          setPhase('ride');
          setEnterKey(null);
        }}
      />
    </>
  );
}
