import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import ProjectCarousel from "@/components/ProjectCarousel";
import { ArrowRight } from "lucide-react";

import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizBedroomMural from "@/assets/viz-bedroom-mural.png";
import vizDetailCeramics from "@/assets/viz-detail-ceramics.png";
import annaPortrait from "@/assets/anna-portrait.jpg";

const heroSlides = [vizKitchenRattan, vizLivingBeige, vizBedroomMural];

const pillars = [
  {
    title: "Estetyka z funkcją",
    desc: "Projektuję tak, żeby było pięknie i wygodnie na co dzień – bez kompromisów.",
  },
  {
    title: "Porządek w procesie",
    desc: "Prowadzę Cię krok po kroku, żebyś nie musiał/a martwić się o szczegóły.",
  },
  {
    title: "Indywidualne podejście",
    desc: "Każdy projekt dopasowuję do Twojego stylu życia, gustu i budżetu.",
  },
];

const packages = [
  {
    name: "Konsultacja",
    desc: "Krótka rozmowa o Twoim wnętrzu – omówimy pomysł, układ, styl lub konkretny problem.",
  },
  {
    name: "Opcja Koncepcyjna",
    desc: "Układ funkcjonalny, wizualizacje i podstawowe rysunki techniczne – solidna baza pod Twój projekt.",
  },
  {
    name: "Opcja Komfortowa",
    desc: "Pełny projekt z wizualizacjami 3D 360°, dokumentacją techniczną – gotowy do realizacji.",
  },
  {
    name: "Opcja Kompleks",
    desc: "Najbardziej rozbudowana forma współpracy – od koncepcji po nadzór na budowie.",
  },
];

const processSteps = [
  { num: "01", title: "Rozmowa o projekcie", desc: "Spotykamy się lub rozmawiamy online. Poznaję Twoje oczekiwania, styl życia i budżet." },
  { num: "02", title: "Układ funkcjonalny i koncepcja", desc: "Przygotowuję wstępny układ, moodboard i propozycję kierunku stylistycznego." },
  { num: "03", title: "Projekt i wizualizacje", desc: "Tworzę wizualizacje 3D i pełną dokumentację techniczną dla wykonawcy." },
  { num: "04", title: "Dokumentacja i wsparcie przy realizacji", desc: "Pomagam w wyborze materiałów, kontakcie z wykonawcą i kontroli na budowie." },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="relative h-[85vh] md:h-screen w-full overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide}
              alt={`Wizualizacja wnętrza – projekt AN Projekt ${i + 1}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-dark-foreground mb-4 animate-fade-in-up">
            Projektuję przemyślane<br className="hidden md:block" /> i&nbsp;ponadczasowe wnętrza
          </h1>
          <p className="font-body text-base md:text-lg text-dark-foreground/90 mb-8 max-w-lg animate-fade-in-up-delay">
            Od koncepcji po realizację. Dla klientów indywidualnych.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up-delay-2">
            <Link
              to="/kontakt"
              className="px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300"
            >
              Zapytaj o projekt
            </Link>
            <Link
              to="/kontakt"
              className="px-7 py-3 rounded-full bg-dark-foreground/20 backdrop-blur-sm text-dark-foreground text-sm tracking-[0.05em] font-body hover:bg-dark-foreground/30 transition-all duration-300"
            >
              Umów konsultację
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? "bg-dark-foreground w-6" : "bg-dark-foreground/40"
              }`}
              aria-label={`Slajd ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-background section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">AN Projekt · Anna Nowak</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-foreground leading-snug mb-6">
              Pomagam zaplanować wnętrze, które będzie piękne, wygodne i&nbsp;przemyślane do&nbsp;ostatniego detalu.
            </h2>
            <p className="text-muted-foreground font-body text-base md:text-lg max-w-2xl mx-auto">
              Każdy projekt traktuję indywidualnie – wsłuchuję się w potrzeby i szukam najlepszych rozwiązań dla konkretnej przestrzeni i stylu życia.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-secondary section-padding-sm">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-12 text-center">
              Na czym opiera się moja praca
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {pillars.map((p, i) => (
              <FadeIn key={p.title} delay={i * 100}>
                <div className="group">
                  <div className="w-10 h-0.5 bg-accent mb-5 transition-all duration-500 group-hover:w-16" />
                  <h3 className="font-heading text-xl text-foreground mb-3">{p.title}</h3>
                  <p className="text-muted-foreground font-body text-base leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES SUMMARY */}
      <section className="bg-background section-padding">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4 text-center">
              Cztery opcje współpracy
            </h2>
            <p className="text-muted-foreground font-body text-base text-center mb-12 max-w-xl mx-auto">
              Wybierz formę, która najlepiej odpowiada Twoim potrzebom.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 100}>
                <div className="bg-secondary p-8 h-full flex flex-col group hover:shadow-lg transition-shadow duration-300">
                  <div className="w-8 h-0.5 bg-accent/50 mb-4 transition-all duration-500 group-hover:w-12 group-hover:bg-accent" />
                  <h3 className="font-heading text-lg text-foreground mb-3">{pkg.name}</h3>
                  <p className="text-muted-foreground font-body text-sm flex-1 leading-relaxed">{pkg.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={300}>
            <div className="text-center mt-10">
              <Link
                to="/oferta"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-foreground text-foreground text-sm tracking-[0.05em] font-body hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Poznaj szczegóły <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4 text-center">
              Jak wygląda współpraca
            </h2>
            <p className="text-muted-foreground font-body text-base text-center mb-14 max-w-lg mx-auto">
              Przejrzysty proces, bez niespodzianek. Wiesz, czego się spodziewać na&nbsp;każdym etapie.
            </p>
          </FadeIn>
          <div className="space-y-10">
            {processSteps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 80}>
                <div className="flex gap-6 items-start group">
                  <span className="font-heading text-3xl text-accent/50 shrink-0 w-10 transition-colors duration-300 group-hover:text-accent">{step.num}</span>
                  <div>
                    <h3 className="font-heading text-lg text-foreground mb-1">{step.title}</h3>
                    <p className="text-muted-foreground font-body text-base">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* REALIZACJE CAROUSEL */}
      <section className="bg-background section-padding">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4 text-center">
              Wybrane realizacje
            </h2>
            <p className="text-muted-foreground font-body text-base text-center mb-14 max-w-lg mx-auto">
              Każdy projekt to inna historia – zobacz efekty współpracy.
            </p>
          </FadeIn>
          <ProjectCarousel />
          <FadeIn delay={200}>
            <div className="text-center mt-10">
              <Link
                to="/realizacje"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-foreground text-foreground text-sm tracking-[0.05em] font-body hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Wszystkie realizacje <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* O MNIE */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
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
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">O mnie</p>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-5">
                Anna Nowak · AN Projekt
              </h2>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-4">
                Projektuję wnętrza mieszkań i&nbsp;domów dla osób, które chcą stworzyć przestrzeń dopasowaną do swojego stylu życia – funkcjonalną, estetyczną i&nbsp;przemyślaną w&nbsp;każdym detalu.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
                Moja droga do projektowania wnętrz zaczęła się od budowy własnego domu. Dziś pomagam moim klientom przejść przez ten proces spokojniej i&nbsp;bardziej świadomie.
              </p>
              <Link
                to="/o-mnie"
                className="inline-flex items-center gap-2 text-sm font-body tracking-[0.05em] uppercase text-foreground border-b border-foreground/30 pb-0.5 hover:border-accent hover:text-accent transition-colors"
              >
                Poznaj mnie lepiej <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TRUST / SOCIAL PROOF */}
      <section className="bg-background section-padding-sm">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">Opinie klientów</p>
            <blockquote className="font-heading text-xl md:text-2xl text-foreground italic leading-relaxed mb-4">
              „Ania przeprowadziła nas przez cały proces – od pierwszego spotkania po&nbsp;odbiór kluczy. Efekt przeszedł nasze oczekiwania."
            </blockquote>
            <p className="text-muted-foreground font-body text-sm">— Klient z Rzeszowa</p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-primary-foreground mb-4">
              Planujesz remont lub urządzanie wnętrza?
            </h2>
            <p className="text-primary-foreground/70 font-body text-base md:text-lg mb-8">
              Napisz do mnie – chętnie porozmawiam o&nbsp;Twoim projekcie. Pierwsza rozmowa jest bezpłatna.
            </p>
            <Link
              to="/kontakt"
              className="inline-block px-8 py-3.5 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300"
            >
              Porozmawiaj o swoim wnętrzu
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Index;
