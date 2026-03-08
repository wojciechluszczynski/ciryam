import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Download } from "lucide-react";

const AnnouncementBanner = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem("ebook-banner-dismissed");
    if (wasDismissed) {
      setDismissed(true);
      return;
    }
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("ebook-banner-dismissed", "1");
  };

  if (dismissed) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="bg-accent text-accent-foreground">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-2.5 flex items-center justify-center gap-3 relative">
          <Download size={14} className="shrink-0 hidden sm:block" />
          <p className="font-body text-xs sm:text-sm text-center">
            <span className="font-medium">Darmowy ebook:</span>{" "}
            Jak przygotować się do remontu – pobierz przewodnik
          </p>
          <Link
            to="/ebook"
            className="shrink-0 px-3 py-1 rounded-full bg-accent-foreground/15 hover:bg-accent-foreground/25 text-accent-foreground font-body text-xs transition-colors"
          >
            Pobierz →
          </Link>
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-foreground/60 hover:text-accent-foreground transition-colors"
            aria-label="Zamknij"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
