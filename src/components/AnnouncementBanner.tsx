import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, Ticket } from "lucide-react";

const AnnouncementBanner = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem("concert-banner-dismissed");
    if (wasDismissed) {
      setDismissed(true);
      return;
    }
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible && bannerRef.current) {
      const h = bannerRef.current.offsetHeight;
      document.documentElement.style.setProperty("--banner-height", `${h}px`);
    } else {
      document.documentElement.style.setProperty("--banner-height", "0px");
    }
  }, [visible]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("concert-banner-dismissed", "1");
    document.documentElement.style.setProperty("--banner-height", "0px");
  };

  if (dismissed) return null;

  return (
    <div
      ref={bannerRef}
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="bg-accent text-accent-foreground">
        <div className="max-w-[1200px] mx-auto px-10 md:px-8 py-2 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 relative">
          <div className="flex items-center gap-2">
            <Ticket size={14} className="shrink-0 hidden sm:block" />
            <p className="font-body text-xs sm:text-sm text-center leading-tight">
              <span className="font-medium">Nowy koncert!</span>{" "}
              <span className="hidden sm:inline">Sprawdź najbliższe daty i kup bilety</span>
              <span className="sm:hidden">Sprawdź daty</span>
            </p>
          </div>
          <Link
            to="/koncerty"
            className="shrink-0 px-3 py-1 rounded-full bg-accent-foreground/15 hover:bg-accent-foreground/25 text-accent-foreground font-body text-xs transition-colors"
          >
            Koncerty →
          </Link>
          <button
            onClick={handleDismiss}
            className="absolute right-2 top-2 sm:top-1/2 sm:-translate-y-1/2 text-accent-foreground/60 hover:text-accent-foreground transition-colors p-1"
            aria-label="Zamknij"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
