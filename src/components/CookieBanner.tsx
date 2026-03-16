import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies-accepted");
    if (!accepted) {
      setTimeout(() => setVisible(true), 2000);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookies-accepted", "true");
    setExpanded(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Expanded panel */}
      {expanded && (
        <div className="fixed bottom-[8rem] left-6 z-50 w-[300px] bg-background rounded-2xl shadow-2xl border border-border p-5 animate-fade-in-up">
          <button onClick={() => setExpanded(false)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
            <X size={16} />
          </button>
          <h3 className="font-heading text-base text-foreground mb-2">Informacja o cookies</h3>
          <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
            Ta strona korzysta z plików cookies w celu zapewnienia prawidłowego działania oraz analizy ruchu. Korzystając ze strony, wyrażasz zgodę na ich użycie zgodnie z naszą polityką prywatności.
          </p>
          <div className="flex gap-2">
            <button
              onClick={accept}
              className="flex-1 py-2 rounded-full bg-accent text-accent-foreground font-body text-xs hover:bg-accent/90 transition-colors"
            >
              Akceptuję
            </button>
            <a
              href="/polityka-prywatnosci"
              className="flex-1 py-2 rounded-full border border-border text-foreground font-body text-xs hover:bg-secondary transition-colors text-center"
            >
              Więcej
            </a>
          </div>
        </div>
      )}

      {/* Cookie badge */}
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="fixed bottom-[4.5rem] left-6 z-50 w-14 h-14 rounded-full bg-secondary border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all duration-300"
          aria-label="Informacja o cookies"
        >
          <Cookie size={20} />
        </button>
      )}
    </>
  );
};

export default CookieBanner;
