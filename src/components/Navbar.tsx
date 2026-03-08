import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.svg";

const navLinks = [
  { href: "/", label: "Start" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/oferta", label: "Oferta" },
  { href: "/o-mnie", label: "O mnie" },
  { href: "/kontakt", label: "Kontakt" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 pt-4">
      <div
        className="max-w-[1100px] mx-auto flex items-center justify-between px-6 md:px-8 py-3 rounded-full transition-all duration-500 bg-background/95 backdrop-blur-md shadow-md"
      >
        <Link to="/" className="z-50 shrink-0">
          <img
            src={logo}
            alt="AN Projekt – projektant wnętrz Krosno"
            className="h-8 md:h-9 transition-all duration-300 invert"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden z-50 text-foreground transition-colors"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-7 transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
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
        <Link
          to="/kontakt"
          className="mt-3 px-7 py-2.5 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] hover:bg-accent/90 transition-colors"
        >
          Zapytaj o projekt
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
