import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ciryamLogo from "@/assets/ciryam-logo.png";

const navLinks = [
  { href: "/", label: "Start" },
  { href: "/muzyka", label: "Muzyka" },
  { href: "/koncerty", label: "Koncerty" },
  { href: "/o-zespole", label: "O zespole" },
  { href: "/sklep", label: "Sklep" },
  { href: "/kontakt", label: "Kontakt" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

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

      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-3 md:px-8 pt-4" style={{ top: "var(--banner-height, 0px)" }}>
        <div className={`max-w-[1100px] mx-auto flex items-center justify-between px-4 md:px-8 py-3 rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-background/20"
            : "bg-transparent"
        }`}>
          <Link to="/" className="z-50 shrink-0">
            <img
              src={ciryamLogo}
              alt="CIRYAM"
              className="h-8 md:h-10 w-auto invert brightness-0 invert"
              style={{ filter: "invert(1)" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs tracking-[0.15em] uppercase font-heading transition-colors duration-300 hover:text-accent ${
                  location.pathname === link.href ? "text-accent" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://ciryam.pl/sklep"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.15em] uppercase font-heading px-5 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/80 transition-all duration-300"
            >
              Kup bilety
            </a>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden z-50 text-foreground transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center transition-all duration-500 ${
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={ciryamLogo}
            alt="CIRYAM"
            className="h-12 w-auto mb-10"
            style={{ filter: "invert(1)" }}
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
                {link.label}
              </Link>
            ))}
          </div>

          <a
            href="https://ciryam.pl/sklep"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-accent text-accent-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-accent/80 transition-colors"
          >
            Kup bilety
          </a>
        </div>
      </header>
    </>
  );
};

export default Navbar;
