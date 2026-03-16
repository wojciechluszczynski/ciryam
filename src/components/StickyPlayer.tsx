import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, X } from "lucide-react";

const StickyPlayer = () => {
  const [visible, setVisible] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-t border-border print:hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-2 flex items-center gap-3">
        {/* Play/Pause visual indicator */}
        <button
          onClick={() => setPlaying(!playing)}
          className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 hover:bg-accent/80 transition-colors"
          aria-label={playing ? "Pauza" : "Odtwórz"}
        >
          {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </button>

        {/* Track info */}
        <div className="flex-1 min-w-0">
          <p className="font-heading text-xs tracking-[0.1em] uppercase text-foreground truncate">CIRYAM – Dices</p>
          <p className="font-body text-[10px] text-muted-foreground truncate">Posłuchaj na SoundCloud</p>
        </div>

        {/* SoundCloud iframe - hidden visually but plays audio */}
        <iframe
          width="0"
          height="0"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={`https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ciryam/sets/ciryam&color=%23d4a017&auto_play=${playing}&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
          title="SoundCloud Player"
          className="absolute opacity-0 pointer-events-none"
        />

        {/* Mute */}
        <button
          onClick={() => setMuted(!muted)}
          className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          aria-label={muted ? "Włącz dźwięk" : "Wycisz"}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        {/* SoundCloud link */}
        <a
          href="https://soundcloud.com/ciryam"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1.5 rounded-full border border-border text-foreground font-heading text-[10px] tracking-[0.1em] uppercase hover:border-accent hover:text-accent transition-colors hidden md:block"
        >
          SoundCloud
        </a>

        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          aria-label="Zamknij odtwarzacz"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default StickyPlayer;
