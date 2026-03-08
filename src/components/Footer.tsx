import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* Col 1 - Brand */}
          <div>
            <h3 className="font-heading text-2xl mb-3">AN Projekt</h3>
            <p className="text-primary-foreground/60 font-body text-sm mb-5 leading-relaxed">
              Projektuję wnętrza, które są piękne, wygodne i przemyślane do ostatniego detalu.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/an_projekt/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/anna.nowakpaprocka" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-accent transition-colors" aria-label="Pinterest">
                <PinterestIcon />
              </a>
            </div>
          </div>

          {/* Col 2 & 3 - side by side on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-0 md:contents">
            {/* Navigation */}
            <div>
              <h4 className="font-body text-xs tracking-[0.15em] uppercase mb-5 text-primary-foreground/40">
                Nawigacja
              </h4>
              <nav className="flex flex-col gap-2.5">
                {[
                  { href: "/realizacje", label: "Realizacje" },
                  { href: "/oferta", label: "Oferta" },
                  { href: "/o-mnie", label: "O mnie" },
                  { href: "/blog", label: "Blog" },
                  { href: "/kontakt", label: "Kontakt" },
                ].map((link) => (
                  <Link key={link.href} to={link.href} className="text-primary-foreground/60 hover:text-accent transition-colors font-body text-sm">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="text-right md:text-left">
              <h4 className="font-body text-xs tracking-[0.15em] uppercase mb-5 text-primary-foreground/40">
                Kontakt
              </h4>
              <div className="flex flex-col gap-2 text-primary-foreground/60 font-body text-sm">
                <span>Anna Nowak</span>
                <span>Odrzykoń, Podkarpacie</span>
                <a href="tel:+48730359642" className="hover:text-accent transition-colors">+48 730 359 642</a>
                <a href="mailto:anprojekt.com@gmail.com" className="hover:text-accent transition-colors">anprojekt.com@gmail.com</a>
              </div>
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
