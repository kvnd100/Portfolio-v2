export function Controls({ soundOn, setSoundOn, musicOn, setMusicOn, onReboot }) {
  return (
    <div className="controls">
      <button className={'ctrl-btn ' + (musicOn ? 'on' : '')} onClick={() => setMusicOn(!musicOn)}>
        <span>MUSIC</span>
        <span className="spacer" />
        <span>{musicOn ? '◆ ON' : '◇ OFF'}</span>
      </button>
      <button className={'ctrl-btn ' + (soundOn ? 'on' : '')} onClick={() => setSoundOn(!soundOn)}>
        <span>SFX</span>
        <span className="spacer" />
        <span>{soundOn ? '◆ ON' : '◇ OFF'}</span>
      </button>
      <button className="ctrl-btn" onClick={onReboot}>
        <span>REBOOT</span>
        <span className="spacer" />
        <span>↻</span>
      </button>
    </div>
  );
}
