import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ciryamSign from "@/assets/ciryam-sign-white.png";
import { useLang } from "@/contexts/LangContext";


const navLinks = [
  { href: "/", labelKey: "nav.start" },
  { href: "/aktualnosci", labelKey: "nav.news" },
  { href: "/muzyka", labelKey: "nav.music" },
  { href: "/koncerty", labelKey: "nav.concerts" },
  { href: "/o-zespole", labelKey: "nav.about" },
  { href: "/kontakt", labelKey: "nav.contact" },
  { href: "/press-kit", labelKey: "nav.press" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const toggleLang = () => setLang(lang === "pl" ? "en" : "pl");

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-40 h-20 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: scrolled ? 1 : 0,
          maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "linear-gradient(to bottom, hsl(var(--background) / 0.95) 0%, hsl(var(--background) / 0.4) 60%, transparent 100%)",
        }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 pt-4" style={{ top: "var(--banner-height, 0px)" }}>
        <div className={`max-w-[1100px] mx-auto flex items-center justify-between px-5 md:px-8 py-2.5 md:py-3 rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-background/20"
            : "bg-background/40 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none"
        }`}>
          <Link to="/" className="z-50 shrink-0 flex items-center" aria-label="CIRYAM - strona główna">
            <img
              src={ciryamSign}
              alt="CIRYAM"
              className="h-9 md:h-11 w-auto invert transition-transform duration-500"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative text-sm tracking-[0.15em] uppercase font-heading transition-all duration-300 hover:text-accent group ${
                  location.pathname === link.href ? "text-accent" : "text-foreground/70"
                }`}
              >
                {t(link.labelKey)}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-accent transition-all duration-300 ${
                  location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}

            {/* Language selector */}
            <div className="flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase font-heading" aria-label="Change language">
              <button
                onClick={() => setLang("pl")}
                className={`flex items-center gap-1 transition-colors duration-300 hover:text-accent ${lang === "pl" ? "text-accent" : "text-muted-foreground"}`}
                aria-label="Polski"
              >
                <span aria-hidden="true">🇵🇱</span>
                <span>PL</span>
              </button>
              <span className="text-border">/</span>
              <button
                onClick={() => setLang("en")}
                className={`flex items-center gap-1 transition-colors duration-300 hover:text-accent ${lang === "en" ? "text-accent" : "text-muted-foreground"}`}
                aria-label="English"
              >
                <span aria-hidden="true">🇬🇧</span>
                <span>EN</span>
              </button>
            </div>


            <a
              href="https://www.kupbilecik.pl/baza/17722/CIryam/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.15em] uppercase font-heading px-5 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/80 transition-all duration-300"
            >
              {t("nav.tickets")}
            </a>
          </nav>

          <div className="flex items-center gap-3 lg:hidden z-50">
            {/* Mobile lang toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-xs font-heading text-muted-foreground"
              aria-label="Change language"
            >
              <span aria-hidden="true">{lang === "pl" ? "🇵🇱" : "🇬🇧"}</span>
              <span className="text-accent">{lang.toUpperCase()}</span>
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-foreground transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center transition-all duration-500 ${
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={ciryamSign}
            alt="CIRYAM"
            className="h-14 w-auto mb-10 invert"
          />

          <div className="flex flex-col items-center gap-6 mb-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-2xl font-heading tracking-[0.2em] uppercase transition-colors hover:text-accent ${
                  location.pathname === link.href ? "text-accent" : "text-foreground"
                }`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          {/* Mobile language toggle */}
          <div className="flex items-center gap-2 mb-8 text-sm font-heading text-muted-foreground tracking-[0.15em]">
            <button
              onClick={() => setLang("pl")}
              className={`flex items-center gap-1.5 transition-colors ${lang === "pl" ? "text-accent" : ""}`}
            >
              <span aria-hidden="true">🇵🇱</span>
              <span>PL</span>
            </button>
            <span>/</span>
            <button
              onClick={() => setLang("en")}
              className={`flex items-center gap-1.5 transition-colors ${lang === "en" ? "text-accent" : ""}`}
            >
              <span aria-hidden="true">🇬🇧</span>
              <span>EN</span>
            </button>
          </div>

          

          <a
            href="https://www.kupbilecik.pl/baza/17722/CIryam/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-accent text-accent-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-accent/80 transition-colors"
          >
            {t("nav.tickets")}
          </a>
        </div>
      </header>
    </>
  );
};

export default Navbar;
