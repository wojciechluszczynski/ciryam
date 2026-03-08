import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import ProjectCarousel from "@/components/ProjectCarousel";
import { ArrowRight, Palette, ClipboardList, UserCheck, Home, Building, Building2, Trees, MessageCircle, Ruler, Monitor, Hammer } from "lucide-react";

import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizBedroomMural from "@/assets/viz-bedroom-mural.png";
import annaPortrait from "@/assets/anna-portrait.jpg";

const heroSlides = [vizKitchenRattan, vizLivingBeige, vizBedroomMural];

const pillars = [
  {
    icon: Palette,
    title: "Estetyka z funkcja",
    desc: "Projektuje tak, zeby bylo pieknie i wygodnie na co dzien, bez kompromisow.",
  },
  {
    icon: ClipboardList,
    title: "Porzadek w procesie",
    desc: "Prowadze Cie krok po kroku, zebys nie musial/a martwic sie o szczegoly.",
  },
  {
    icon: UserCheck,
    title: "Indywidualne podejscie",
    desc: "Kazdy projekt dopasowuje do Twojego stylu zycia, gustu i budzetu.",
  },
];

const packages = [
  {
    icon: Home,
    name: "Konsultacja",
    desc: "Krotka rozmowa o Twoim wnetrzu. Omowimy pomysl, uklad, styl lub konkretny problem.",
  },
  {
    icon: Building,
    name: "Opcja Koncepcyjna",
    desc: "Uklad funkcjonalny, wizualizacje i podstawowe rysunki techniczne. Solidna baza pod Twoj projekt.",
  },
  {
    icon: Building2,
    name: "Opcja Komfortowa",
    desc: "Pelny projekt z wizualizacjami 3D 360\u00B0, dokumentacja techniczna. Gotowy do realizacji.",
  },
  {
    icon: Trees,
    name: "Opcja Kompleks",
    desc: "Najbardziej rozbudowana forma wspolpracy. Od koncepcji po nadzor na budowie.",
  },
];

const processSteps = [
  { num: "01", title: "Rozmowa o projekcie", desc: "Spotykamy sie lub rozmawiamy online. Poznajem Twoje oczekiwania, styl zycia i budzet.", icon: MessageCircle },
  { num: "02", title: "Uklad funkcjonalny i koncepcja", desc: "Przygotowuje wstepny uklad, moodboard i propozycje kierunku stylistycznego.", icon: Ruler },
  { num: "03", title: "Projekt i wizualizacje", desc: "Tworze wizualizacje 3D i pelna dokumentacje techniczna dla wykonawcy.", icon: Monitor },
  { num: "04", title: "Dokumentacja i wsparcie przy realizacji", desc: "Pomagam w wyborze materialow, kontakcie z wykonawca i kontroli na budowie.", icon: Hammer },
];

const testimonials = [
  {
    text: "Ania przeprowadzila nas przez caly proces. Od pierwszego spotkania po odbior kluczy. Efekt przeszedl nasze oczekiwania.",
    author: "Klient z Rzeszowa",
  },
  {
    text: "Profesjonalne podejscie i swietne wyczucie stylu. Nasze mieszkanie wyglada dokladnie tak, jak sobie wymarzylismy.",
    author: "Klientka z Krosna",
  },
  {
    text: "Spokojnie i konkretnie. Ania pomogla nam uniknac wielu kosztownych bledow przy wykonczeniu domu.",
    author: "Klient z Nowego Sacza",
  },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img
              src={slide}
              alt={`Wizualizacja wnetrza AN Projekt ${i + 1}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/30 to-foreground/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-dark-foreground mb-4 animate-fade-in-up">
            Wnetrza dopasowane<br className="hidden md:block" /> do&nbsp;Twojego zycia
          </h1>
          <p className="font-body text-base md:text-lg text-dark-foreground/90 mb-8 max-w-lg animate-fade-in-up-delay">
            Funkcjonalne, estetyczne i przemyslane w kazdym detalu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up-delay-2">
            <Link
              to="/kontakt"
              className="px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300"
            >
              Zapytaj o projekt
            </Link>
            <Link
              to="/realizacje"
              className="px-7 py-3 rounded-full bg-dark-foreground/20 backdrop-blur-sm text-dark-foreground text-sm tracking-[0.05em] font-body hover:bg-dark-foreground/30 transition-all duration-300"
            >
              Zobacz realizacje
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
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">AN Projekt</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-foreground leading-snug mb-6">
              Pomagam zaplanowac wnetrze, ktore bedzie piekne, wygodne i&nbsp;przemyslane do&nbsp;ostatniego detalu.
            </h2>
            <p className="text-muted-foreground font-body text-base md:text-lg max-w-2xl mx-auto">
              Kazdy projekt traktuje indywidualnie. Wsluchuje sie w potrzeby i szukam najlepszych rozwiazan dla konkretnej przestrzeni i stylu zycia.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-secondary section-padding-sm">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-12 text-center">
              Na czym opiera sie moja praca
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {pillars.map((p, i) => (
              <FadeIn key={p.title} delay={i * 100}>
                <div className="group text-center md:text-left">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto md:mx-0 mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <p.icon size={18} className="text-accent" />
                  </div>
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
              Warianty wspolpracy
            </h2>
            <p className="text-muted-foreground font-body text-base text-center mb-12 max-w-xl mx-auto">
              Wybierz forme, ktora najlepiej odpowiada Twoim potrzebom.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 100}>
                <div className="bg-secondary p-8 h-full flex flex-col group hover:shadow-lg transition-all duration-300 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <pkg.icon size={18} className="text-accent" />
                  </div>
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
                Poznaj szczegoly <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* HORIZONTAL PROCESS TIMELINE */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4 text-center">
              Jak przebiega wspolpraca
            </h2>
            <p className="text-muted-foreground font-body text-base text-center mb-14 max-w-lg mx-auto">
              Przejrzysty proces, bez niespodzianek.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="relative">
              {/* Horizontal line */}
              <div className="hidden md:block absolute top-5 left-0 right-0 h-px bg-border" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
                {processSteps.map((step, i) => {
                  const StepIcon = step.icon;
                  return (
                    <div
                      key={step.num}
                      className="relative group cursor-pointer"
                      onMouseEnter={() => setActiveStep(i)}
                      onMouseLeave={() => setActiveStep(null)}
                    >
                      {/* Node */}
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                        activeStep === i
                          ? "border-accent bg-accent/10 scale-110"
                          : "border-border bg-background"
                      }`}>
                        <StepIcon size={16} className={`transition-colors duration-300 ${activeStep === i ? "text-accent" : "text-muted-foreground"}`} />
                      </div>
                      
                      <div className="text-center">
                        <p className={`font-body text-xs tracking-[0.15em] uppercase mb-1 transition-colors duration-300 ${activeStep === i ? "text-accent" : "text-muted-foreground"}`}>
                          Krok {step.num}
                        </p>
                        <h3 className="font-heading text-sm text-foreground mb-2">{step.title}</h3>
                        
                        {/* Expandable description */}
                        <div className={`overflow-hidden transition-all duration-500 ${
                          activeStep === i ? "max-h-24 opacity-100" : "max-h-0 opacity-0 md:max-h-0 md:opacity-0"
                        }`}>
                          <p className="text-muted-foreground font-body text-xs leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
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
              Kazdy projekt to inna historia. Zobacz efekty wspolpracy.
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
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={annaPortrait}
                alt="Anna Nowak, projektantka wnetrz AN Projekt"
                className="w-full aspect-[3/4] object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-lg ring-2 ring-accent/20 animate-pulse pointer-events-none" />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">O mnie</p>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-5">
                Anna Nowak
              </h2>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-4">
                Projektuje wnetrza mieszkan i domow dla osob, ktore chca stworzyc przestrzen dopasowana do swojego stylu zycia. Funkcjonalna, estetyczna i przemyslana w kazdym detalu.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
                Moja droga do projektowania wnetrz zaczela sie od budowy wlasnego domu. Dzis pomagam moim klientom przejsc przez ten proces spokojniej i bardziej swiadomie.
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

      {/* TESTIMONIALS */}
      <section className="bg-background section-padding-sm">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">Opinie klientow</p>
            <div className="relative h-[160px] md:h-[120px]">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                    i === activeTestimonial
                      ? "opacity-100 blur-0 scale-100"
                      : "opacity-0 blur-sm scale-95 pointer-events-none"
                  }`}
                >
                  <blockquote className="font-heading text-xl md:text-2xl text-foreground italic leading-relaxed mb-4">
                    &bdquo;{t.text}&rdquo;
                  </blockquote>
                  <p className="text-muted-foreground font-body text-sm">{t.author}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeTestimonial ? "bg-accent w-6" : "bg-foreground/20"
                  }`}
                  aria-label={`Opinia ${i + 1}`}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-primary-foreground mb-4">
              Planujesz remont lub urzadzanie wnetrza?
            </h2>
            <p className="text-primary-foreground/70 font-body text-base md:text-lg mb-8">
              Napisz do mnie. Chetnie porozmawiam o Twoim projekcie. Pierwsza rozmowa jest bezplatna.
            </p>
            <Link
              to="/kontakt"
              className="inline-block px-8 py-3.5 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300"
            >
              Porozmawiaj o swoim wnetrzu
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Index;
