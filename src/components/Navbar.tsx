import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import annaPortrait from "@/assets/anna-portrait.jpg";

const navLinks = [
  { href: "/", label: "Start" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/oferta", label: "Oferta" },
  { href: "/o-mnie", label: "O mnie" },
  { href: "/blog", label: "Blog" },
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
      {/* Blur backdrop - always present, opacity controlled by scroll */}
      <div
        className="fixed top-0 left-0 right-0 z-40 h-28 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: scrolled ? 1 : 0,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "linear-gradient(to bottom, hsl(var(--background) / 0.85) 0%, hsl(var(--background) / 0.6) 60%, transparent 100%)",
        }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-3 md:px-8 pt-4">
        <div className={`max-w-[1100px] mx-auto flex items-center justify-between px-4 md:px-8 py-3 rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-md"
            : "bg-background/80 backdrop-blur-sm"
        }`}>
          <Link to="/" className="z-50 shrink-0 flex items-center gap-2.5">
            <img
              src={annaPortrait}
              alt="Anna Nowak"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover object-top"
            />
            <span className="font-heading text-base md:text-lg text-foreground tracking-wide">AN Projekt</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm tracking-[0.05em] font-body transition-colors duration-300 text-foreground hover:text-accent ${
                  location.pathname === link.href ? "text-accent" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/kontakt"
              className="text-sm tracking-[0.05em] font-body px-5 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300"
            >
              Zapytaj o projekt
            </Link>
          </nav>

          {/* Mobile/Tablet hamburger */}
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
          {/* Profile header in mobile menu */}
          <div className="flex flex-col items-center mb-10">
            <img
              src={annaPortrait}
              alt="Anna Nowak"
              className="w-20 h-20 rounded-full object-cover object-top mb-3"
            />
            <span className="font-heading text-xl text-foreground mb-1">AN Projekt</span>
            <p className="font-body text-sm text-muted-foreground">Projektowanie wnętrz z pasją</p>
          </div>

          <div className="flex flex-col items-center gap-6 mb-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xl font-heading tracking-wider transition-colors hover:text-accent ${
                  location.pathname === link.href ? "text-accent" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="font-body text-sm text-muted-foreground mb-4 text-center max-w-[250px]">
            Chętnie porozmawiam o Twoim wnętrzu. Pierwsza rozmowa jest bezpłatna.
          </p>
          <Link
            to="/kontakt"
            className="px-7 py-2.5 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] hover:bg-accent/90 transition-colors"
          >
            Zapytaj o projekt
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
