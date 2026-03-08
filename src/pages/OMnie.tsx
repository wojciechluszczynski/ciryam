import { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import annaPortrait from "@/assets/anna-portrait.jpg";
import vizBathroomMarble from "@/assets/viz-bathroom-marble.png";
import vizBedroomDark from "@/assets/viz-bedroom-dark.png";
import vizLivingBeige from "@/assets/viz-living-beige.png";
import { ArrowRight, Instagram, Facebook, MessageCircle, MapPin, Ruler, Hammer, Play } from "lucide-react";

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const stats = [
  { number: "50+", label: "Zrealizowanych projektów" },
  { number: "4", label: "Lata doświadczenia" },
  { number: "100%", label: "Zadowolonych klientów" },
  { number: "2", label: "Regiony działania" },
];

const values = [
  { title: "Estetyka z funkcją", desc: "Projektuję tak, żeby było pięknie i praktycznie, w równym stopniu." },
  { title: "Bliskość i komunikacja", desc: "Pracuję bezpośrednio z klientem, bez pośredników. Słucham, pytam, proponuję." },
  { title: "Odpowiedzialność", desc: "Biorę odpowiedzialność za każdy etap, od pomysłu po nadzór na budowie." },
];

const processSteps = [
  { title: "Rozmowa o projekcie", icon: MessageCircle },
  { title: "Wizja lokalna i pomiar", icon: MapPin },
  { title: "Koncepcja i wizualizacje", icon: Ruler },
  { title: "Dokumentacja i wsparcie", icon: Hammer },
];

const OMnie = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <main>
      {/* Hero - side by side */}
      <section className="bg-background pt-28 md:pt-36 pb-16 md:pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Mobile: name first */}
          <div className="order-2 md:order-1">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">O mnie</p>
            <h1 className="font-heading text-3xl md:text-5xl text-foreground mb-3">Anna Nowak</h1>
            <p className="font-body text-base md:text-lg text-muted-foreground mb-6">Projektantka wnętrz, założycielka pracowni AN Projekt</p>
            <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
              Projektuję wnętrza mieszkań i domów dla osób, które chcą stworzyć przestrzeń dopasowaną do swojego stylu życia. Funkcjonalną, estetyczną i przemyślaną w każdym detalu.
            </p>
            <Link to="/kontakt" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300">
              Porozmawiajmy <ArrowRight size={14} />
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <div className="overflow-hidden rounded-2xl">
              <img src={annaPortrait} alt="Anna Nowak, projektantka wnętrz AN Projekt" className="w-full aspect-[3/4] object-cover object-top" />
            </div>
          </div>
        </div>
      </section>

      {/* Intro text + realization image */}
      <section className="bg-background section-padding-sm">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <FadeIn>
            <div>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                Nazywam się Anna Nowak i prowadzę pracownię AN Projekt.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                Projektuję wnętrza mieszkań i domów dla osób, które chcą stworzyć przestrzeń dopasowaną do swojego stylu życia. Funkcjonalną, estetyczną i przemyślaną w każdym detalu.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                Moja droga do projektowania wnętrz zaczęła się od budowy własnego domu. To właśnie wtedy zobaczyłam, jak wiele decyzji trzeba podjąć w trakcie projektowania i realizacji wnętrza, i jak łatwo w tym procesie o chaos, stres czy kosztowne pomyłki.
              </p>
              <p className="text-foreground font-body text-base leading-relaxed font-medium mb-6">
                Dziś pomagam moim klientom przejść przez ten proces spokojniej i bardziej świadomie.
              </p>
              {/* Handwritten signature */}
              <p className="font-heading italic text-2xl md:text-3xl text-accent/80 tracking-wide">Anna Nowak</p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <img src={vizLivingBeige} alt="Wizualizacja salonu AN Projekt" className="w-full aspect-[4/3] object-cover rounded-lg" loading="lazy" />
          </FadeIn>
        </div>
      </section>

      {/* Stats / Achievements */}
      <section className="bg-secondary section-padding-sm">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="font-heading text-4xl md:text-5xl text-accent mb-2">{stat.number}</p>
                  <p className="font-body text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Extended story + realization photo */}
      <section className="bg-background section-padding">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <FadeIn delay={100}>
            <img src={vizBathroomMarble} alt="Wizualizacja łazienki, projekt AN Projekt" className="w-full aspect-[4/3] object-cover rounded-lg" loading="lazy" />
          </FadeIn>
          <FadeIn>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-5">Jak pracuję?</h2>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                W swojej pracy łączę estetykę z funkcjonalnością. Każdy projekt powstaje indywidualnie, dopasowany do stylu życia domowników, charakteru przestrzeni i budżetu inwestycji.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                Nie tworzę wnętrz „z katalogu". Zależy mi, aby były spójne, wygodne w codziennym użytkowaniu i po prostu dobrze się w nich mieszkało.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed">
                Pracuję głównie z klientami z Podkarpacia i Małopolski, między innymi w okolicach Krosna, Rzeszowa czy Nowego Sącza, ale wiele elementów projektów można realizować również zdalnie.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Horizontal Process */}
      <section className="bg-secondary section-padding-sm">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-10 text-center">Jak wygląda współpraca?</h2>
            <div className="relative">
              <div className="hidden sm:block absolute top-5 left-0 right-0 h-px bg-border" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {processSteps.map((step, i) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={step.title} className="relative cursor-pointer text-center" onMouseEnter={() => setActiveStep(i)} onMouseLeave={() => setActiveStep(null)}>
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${activeStep === i ? "border-accent bg-accent/10 scale-110" : "border-border bg-background"}`}>
                        <StepIcon size={16} className={`transition-colors ${activeStep === i ? "text-accent" : "text-muted-foreground"}`} />
                      </div>
                      <span className={`font-heading text-lg mr-1 transition-colors ${activeStep === i ? "text-accent" : "text-accent/50"}`}>{String(i + 1).padStart(2, "0")}</span>
                      <p className="font-body text-sm text-foreground">{step.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Video placeholder */}
      <section className="bg-background section-padding-sm">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <div className="relative aspect-video overflow-hidden rounded-lg group cursor-pointer">
              <img src={vizBedroomDark} alt="Wizualizacja sypialni AN Projekt" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-dark-foreground/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play size={28} className="text-foreground ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <p className="text-dark-foreground font-body text-sm font-medium">Poznaj moje podejście do projektów</p>
                <p className="text-dark-foreground/60 font-body text-xs">Wideo w przygotowaniu</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-12 text-center">Co jest dla mnie ważne?</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 100}>
                <div className="group">
                  <div className="w-8 h-0.5 bg-accent/50 mb-4 transition-all duration-500 group-hover:w-12 group-hover:bg-accent" />
                  <h3 className="font-heading text-lg text-foreground mb-3">{v.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="bg-background section-padding-sm">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">Kontakt</h2>
            <p className="text-muted-foreground font-body text-base mb-8">Masz pytania albo chcesz porozmawiać o swoim projekcie?</p>
            <div className="flex flex-col gap-2 items-center text-foreground font-body text-base mb-6">
              <a href="mailto:anprojekt.com@gmail.com" className="hover:text-accent transition-colors">anprojekt.com@gmail.com</a>
              <a href="tel:+48730359642" className="hover:text-accent transition-colors">+48 730 359 642</a>
            </div>
            <div className="flex gap-4 justify-center mb-8">
              <a href="https://www.instagram.com/an_projekt/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram"><Instagram size={22} /></a>
              <a href="https://www.facebook.com/anna.nowakpaprocka" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook"><Facebook size={22} /></a>
              <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Pinterest"><PinterestIcon /></a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-primary-foreground mb-4">Planujesz remont lub wykończenie wnętrza?</h2>
            <p className="text-primary-foreground/70 font-body text-base mb-8">Chętnie pomogę Ci przełożyć pomysły na konkretny, przemyślany projekt.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/realizacje" className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-primary-foreground/30 text-primary-foreground text-sm tracking-[0.05em] font-body hover:bg-primary-foreground/10 transition-all duration-300">
                Zobacz realizacje <ArrowRight size={14} />
              </Link>
              <Link to="/kontakt" className="px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300">
                Zapytaj o projekt
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default OMnie;
