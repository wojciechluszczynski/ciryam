import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, X } from "lucide-react";

const SC_TRACK_URL = "https://soundcloud.com/ciryam/dices";
const SC_WIDGET_SRC = `https://w.soundcloud.com/player/?url=${encodeURIComponent(SC_TRACK_URL)}&color=%23ffffff&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`;

const StickyPlayer = () => {
  const [visible, setVisible] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null);

  // Defer loading SoundCloud until user interacts or after 5s
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 5000);
    const onInteract = () => { setLoaded(true); cleanup(); };
    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener("click", onInteract);
      window.removeEventListener("scroll", onInteract);
    };
    window.addEventListener("click", onInteract, { once: true, passive: true });
    window.addEventListener("scroll", onInteract, { once: true, passive: true });
    return cleanup;
  }, []);

  // Load SC Widget API only after loaded
  useEffect(() => {
    if (!loaded) return;
    if (document.getElementById("sc-widget-api")) {
      initWidget();
      return;
    }
    const script = document.createElement("script");
    script.id = "sc-widget-api";
    script.src = "https://w.soundcloud.com/player/api.js";
    script.onload = () => initWidget();
    document.head.appendChild(script);
  }, [loaded]);

  const initWidget = useCallback(() => {
    if (!iframeRef.current || !(window as any).SC) return;
    const widget = (window as any).SC.Widget(iframeRef.current);
    widgetRef.current = widget;

    widget.bind((window as any).SC.Widget.Events.READY, () => {
      setReady(true);
      widget.setVolume(80);
    });

    widget.bind((window as any).SC.Widget.Events.PLAY, () => setPlaying(true));
    widget.bind((window as any).SC.Widget.Events.PAUSE, () => setPlaying(false));
    widget.bind((window as any).SC.Widget.Events.FINISH, () => setPlaying(false));
  }, []);

  // Retry init if script loaded before iframe
  useEffect(() => {
    if (!ready && (window as any).SC && iframeRef.current) {
      initWidget();
    }
  }, [ready, initWidget]);

  const togglePlay = () => {
    if (!widgetRef.current) return;
    widgetRef.current.toggle();
  };

  const toggleMute = () => {
    if (!widgetRef.current) return;
    const newMuted = !muted;
    setMuted(newMuted);
    widgetRef.current.setVolume(newMuted ? 0 : 80);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-t border-border print:hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-2 flex items-center gap-3">
        <button
          onClick={togglePlay}
          disabled={!ready}
          className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 hover:bg-accent/80 transition-colors disabled:opacity-40"
          aria-label={playing ? "Pauza" : "Odtwórz"}
        >
          {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </button>

        <div className="flex-1 min-w-0">
          <p className="font-heading text-xs tracking-[0.1em] uppercase text-foreground truncate">CIRYAM – Dices</p>
          <p className="font-body text-[10px] text-muted-foreground truncate">
            {ready ? (playing ? "Odtwarzanie..." : "Poczuj nasz klimat — naciśnij i słuchaj") : "Ładowanie..."}
          </p>
        </div>

        {loaded && (
          <iframe
            ref={iframeRef}
            width="0"
            height="0"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={SC_WIDGET_SRC}
            title="SoundCloud Player"
            className="absolute opacity-0 pointer-events-none"
          />
        )}

        <button
          onClick={toggleMute}
          disabled={!ready}
          className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block disabled:opacity-40"
          aria-label={muted ? "Włącz dźwięk" : "Wycisz"}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        <a
          href="https://soundcloud.com/ciryam"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1.5 rounded-full border border-border text-foreground font-heading text-[10px] tracking-[0.1em] uppercase hover:border-accent hover:text-accent transition-colors hidden md:block"
        >
          SoundCloud
        </a>

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
