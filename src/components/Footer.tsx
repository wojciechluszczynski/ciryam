import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[1200px] mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* Col 1 */}
          <div>
            <h3 className="font-heading text-2xl mb-3">AN Projekt</h3>
            <p className="text-primary-foreground/60 font-body text-sm mb-5 leading-relaxed">
              Projektuję wnętrza, które są piękne, wygodne i&nbsp;przemyślane do ostatniego detalu.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/an_projekt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/50 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/anna.nowakpaprocka"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/50 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-body text-xs tracking-[0.15em] uppercase mb-5 text-primary-foreground/40">
              Nawigacja
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: "/realizacje", label: "Realizacje" },
                { href: "/oferta", label: "Oferta" },
                { href: "/o-mnie", label: "O mnie" },
                { href: "/kontakt", label: "Kontakt" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-primary-foreground/60 hover:text-accent transition-colors font-body text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-body text-xs tracking-[0.15em] uppercase mb-5 text-primary-foreground/40">
              Kontakt
            </h4>
            <div className="flex flex-col gap-2 text-primary-foreground/60 font-body text-sm">
              <span>Anna Nowak</span>
              <span>Odrzykoń, Podkarpacie</span>
              <a href="tel:+48730359642" className="hover:text-accent transition-colors">
                +48 730 359 642
              </a>
              <a href="mailto:anprojekt.com@gmail.com" className="hover:text-accent transition-colors">
                anprojekt.com@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-primary-foreground/35 text-xs font-body">
            © 2026 AN Projekt. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-5 text-xs font-body">
            <Link to="/polityka-prywatnosci" className="text-primary-foreground/35 hover:text-accent transition-colors">
              Polityka prywatności
            </Link>
            <Link to="/regulamin" className="text-primary-foreground/35 hover:text-accent transition-colors">
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
