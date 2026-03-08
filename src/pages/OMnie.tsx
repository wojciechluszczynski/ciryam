import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import annaPortrait from "@/assets/anna-portrait.jpg";
import vizBathroomMarble from "@/assets/viz-bathroom-marble.png";
import vizClosetMarble from "@/assets/viz-closet-marble.png";
import vizBedroomDark from "@/assets/viz-bedroom-dark.png";
import { ArrowRight, Instagram, Facebook } from "lucide-react";

const values = [
  { title: "Estetyka z funkcją", desc: "Projektuję tak, żeby było pięknie i praktycznie – w równym stopniu." },
  { title: "Bliskość i komunikacja", desc: "Pracuję bezpośrednio z klientem, bez pośredników. Słucham, pytam, proponuję." },
  { title: "Odpowiedzialność", desc: "Biorę odpowiedzialność za każdy etap – od pomysłu po nadzór na budowie." },
];

const processSteps = [
  "Rozmowa o projekcie",
  "Układ funkcjonalny i koncepcja",
  "Projekt i wizualizacje",
  "Dokumentacja i wsparcie przy realizacji",
];

const OMnie = () => {
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">O mnie</p>
            <h1 className="font-heading text-3xl md:text-5xl text-foreground max-w-2xl">Anna Nowak · AN Projekt</h1>
          </FadeIn>
        </div>
      </section>

      {/* Portrait + intro */}
      <section className="bg-background section-padding-sm">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <FadeIn>
            <div className="overflow-hidden rounded-lg">
              <img
                src={annaPortrait}
                alt="Anna Nowak – projektantka wnętrz AN Projekt"
                className="w-full aspect-[3/4] object-cover object-top"
                loading="lazy"
              />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                Nazywam się Anna Nowak i prowadzę pracownię AN Projekt.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                Projektuję wnętrza mieszkań i domów dla osób, które chcą stworzyć przestrzeń dopasowaną do swojego stylu życia – funkcjonalną, estetyczną i przemyślaną w&nbsp;każdym detalu.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                Moja droga do projektowania wnętrz zaczęła się od budowy własnego domu. To właśnie wtedy zobaczyłam, jak wiele decyzji trzeba podjąć w&nbsp;trakcie projektowania i&nbsp;realizacji wnętrza – i&nbsp;jak łatwo w&nbsp;tym procesie o&nbsp;chaos, stres czy kosztowne pomyłki.
              </p>
              <p className="text-foreground font-body text-base leading-relaxed font-medium">
                Dziś pomagam moim klientom przejść przez ten proces spokojniej i&nbsp;bardziej świadomie.
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
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-5">Jak pracuję</h2>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                W swojej pracy łączę estetykę z&nbsp;funkcjonalnością. Każdy projekt powstaje indywidualnie – dopasowany do stylu życia domowników, charakteru przestrzeni i&nbsp;budżetu inwestycji.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                Nie tworzę wnętrz „z&nbsp;katalogu". Zależy mi, aby były spójne, wygodne w&nbsp;codziennym użytkowaniu i&nbsp;po&nbsp;prostu dobrze się w&nbsp;nich mieszkało.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed">
                Pracuję głównie z klientami z&nbsp;Podkarpacia i&nbsp;Małopolski – między innymi w okolicach Krosna, Rzeszowa czy Nowego Sącza – ale wiele elementów projektów można realizować również zdalnie.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <img
              src={vizBathroomMarble}
              alt="Wizualizacja łazienki – projekt AN Projekt"
              className="w-full aspect-[4/3] object-cover rounded-lg"
              loading="lazy"
            />
          </FadeIn>
        </div>
      </section>

      {/* Process block */}
      <section className="bg-background section-padding-sm">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-10 text-center">Jak wygląda współpraca?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {processSteps.map((step, i) => (
                <div key={step} className="flex items-start gap-4 group">
                  <span className="font-heading text-2xl text-accent/60 shrink-0 group-hover:text-accent transition-colors">{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-body text-base text-foreground pt-1">{step}</p>
                </div>
              ))}
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
            <p className="text-muted-foreground font-body text-sm">Miejsce na krótkie wideo – Ania opowiada o swoim podejściu do projektów</p>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background section-padding">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-12 text-center">Co jest dla mnie ważne</h2>
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
              Masz pytania albo chcesz porozmawiać o swoim projekcie?
            </p>
            <div className="flex flex-col gap-2 items-center text-foreground font-body text-base mb-6">
              <a href="mailto:anprojekt.com@gmail.com" className="hover:text-accent transition-colors">
                📧 anprojekt.com@gmail.com
              </a>
              <a href="tel:+48730359642" className="hover:text-accent transition-colors">
                📞 +48 730 359 642
              </a>
            </div>
            <div className="flex gap-4 justify-center mb-8">
              <a href="https://www.instagram.com/an_projekt/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={22} />
              </a>
              <a href="https://www.facebook.com/anna.nowakpaprocka" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={22} />
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
              Planujesz remont lub wykończenie wnętrza?
            </h2>
            <p className="text-muted-foreground font-body text-base mb-8">
              Chętnie pomogę Ci przełożyć pomysły na konkretny, przemyślany projekt.
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
