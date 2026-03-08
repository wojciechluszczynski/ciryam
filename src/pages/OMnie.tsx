import { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import annaPortrait from "@/assets/anna-portrait.jpg";
import vizBathroomMarble from "@/assets/viz-bathroom-marble.png";
import vizBedroomDark from "@/assets/viz-bedroom-dark.png";
import { ArrowRight, Instagram, Facebook, MessageCircle, MapPin, Ruler, Monitor, Hammer } from "lucide-react";

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const values = [
  { title: "Estetyka z funkcja", desc: "Projektuje tak, zeby bylo pieknie i praktycznie, w rownym stopniu." },
  { title: "Bliskosc i komunikacja", desc: "Pracuje bezposrednio z klientem, bez posrednikow. Slucham, pytam, proponuje." },
  { title: "Odpowiedzialnosc", desc: "Biore odpowiedzialnosc za kazdy etap, od pomyslu po nadzor na budowie." },
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
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">O mnie</p>
            <h1 className="font-heading text-3xl md:text-5xl text-foreground max-w-2xl">Anna Nowak</h1>
          </FadeIn>
        </div>
      </section>

      {/* Portrait + intro */}
      <section className="bg-background section-padding-sm">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <FadeIn>
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src={annaPortrait}
                alt="Anna Nowak, projektantka wnetrz AN Projekt"
                className="w-full aspect-[3/4] object-cover object-top"
                loading="lazy"
              />
              {/* Pulsing accent ring */}
              <div className="absolute inset-0 rounded-lg pointer-events-none">
                <div className="absolute inset-0 rounded-lg ring-2 ring-accent/20 animate-pulse" />
                <div className="absolute inset-2 rounded-lg ring-1 ring-accent/10 animate-pulse" style={{ animationDelay: "0.5s" }} />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                Nazywam sie Anna Nowak i prowadze pracownie AN Projekt.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                Projektuje wnetrza mieszkan i domow dla osob, ktore chca stworzyc przestrzen dopasowana do swojego stylu zycia. Funkcjonalna, estetyczna i przemyslana w kazdym detalu.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                Moja droga do projektowania wnetrz zaczela sie od budowy wlasnego domu. To wlasnie wtedy zobaczylam, jak wiele decyzji trzeba podjac w trakcie projektowania i realizacji wnetrza, i jak latwo w tym procesie o chaos, stres czy kosztowne pomylki.
              </p>
              <p className="text-foreground font-body text-base leading-relaxed font-medium">
                Dzis pomagam moim klientom przejsc przez ten proces spokojniej i bardziej swiadomie.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Extended story + realization photo */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <FadeIn>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-5">Jak pracuje</h2>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                W swojej pracy lacze estyke z funkcjonalnoscia. Kazdy projekt powstaje indywidualnie, dopasowany do stylu zycia domownikow, charakteru przestrzeni i budzetu inwestycji.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                Nie tworze wnetrz "z katalogu". Zalezy mi, aby byly spojne, wygodne w codziennym uzytkowaniu i po prostu dobrze sie w nich mieszkalo.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed">
                Pracuje glownie z klientami z Podkarpacia i Malopolski, miedzy innymi w okolicach Krosna, Rzeszowa czy Nowego Sacza, ale wiele elementow projektow mozna realizowac rowniez zdalnie.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <img
              src={vizBathroomMarble}
              alt="Wizualizacja lazienki, projekt AN Projekt"
              className="w-full aspect-[4/3] object-cover rounded-lg"
              loading="lazy"
            />
          </FadeIn>
        </div>
      </section>

      {/* Horizontal Process */}
      <section className="bg-background section-padding-sm">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-10 text-center">Jak wyglada wspolpraca?</h2>
            <div className="relative">
              <div className="hidden sm:block absolute top-5 left-0 right-0 h-px bg-border" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {processSteps.map((step, i) => {
                  const StepIcon = step.icon;
                  return (
                    <div
                      key={step.title}
                      className="relative cursor-pointer text-center"
                      onMouseEnter={() => setActiveStep(i)}
                      onMouseLeave={() => setActiveStep(null)}
                    >
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${
                        activeStep === i ? "border-accent bg-accent/10 scale-110" : "border-border bg-background"
                      }`}>
                        <StepIcon size={16} className={`transition-colors ${activeStep === i ? "text-accent" : "text-muted-foreground"}`} />
                      </div>
                      <span className={`font-heading text-lg mr-1 transition-colors ${activeStep === i ? "text-accent" : "text-accent/50"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
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
      <section className="bg-secondary section-padding-sm">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <div className="aspect-video flex items-center justify-center mb-6 overflow-hidden rounded-lg">
              <img src={vizBedroomDark} alt="Wizualizacja sypialni AN Projekt" className="w-full h-full object-cover" />
            </div>
            <p className="text-muted-foreground font-body text-sm">Miejsce na krotkie wideo. Ania opowiada o swoim podejsciu do projektow</p>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background section-padding">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-12 text-center">Co jest dla mnie wazne</h2>
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
      <section className="bg-secondary section-padding-sm">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">Kontakt</h2>
            <p className="text-muted-foreground font-body text-base mb-8">
              Masz pytania albo chcesz porozmawiac o swoim projekcie?
            </p>
            <div className="flex flex-col gap-2 items-center text-foreground font-body text-base mb-6">
              <a href="mailto:anprojekt.com@gmail.com" className="hover:text-accent transition-colors">
                anprojekt.com@gmail.com
              </a>
              <a href="tel:+48730359642" className="hover:text-accent transition-colors">
                +48 730 359 642
              </a>
            </div>
            <div className="flex gap-4 justify-center mb-8">
              <a href="https://www.instagram.com/an_projekt/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={22} />
              </a>
              <a href="https://www.facebook.com/anna.nowakpaprocka" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={22} />
              </a>
              <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Pinterest">
                <PinterestIcon />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background section-padding">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
              Planujesz remont lub wykonczenie wnetrza?
            </h2>
            <p className="text-muted-foreground font-body text-base mb-8">
              Chetnie pomoge Ci przelozyc pomysly na konkretny, przemyslany projekt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/realizacje"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-foreground text-foreground text-sm tracking-[0.05em] font-body hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Zobacz realizacje <ArrowRight size={14} />
              </Link>
              <Link
                to="/kontakt"
                className="px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300"
              >
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
