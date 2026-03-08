import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import ProjectCarousel from "@/components/ProjectCarousel";
import { ArrowRight, Palette, ClipboardList, UserCheck, Home, Building, Building2, Trees, MessageCircle, Ruler, Monitor, Hammer, Plus, X, Check, Star } from "lucide-react";

import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizBedroomMural from "@/assets/viz-bedroom-mural.png";
import vizBathroomMarble from "@/assets/viz-bathroom-marble.png";
import vizDiningFireplace from "@/assets/viz-dining-fireplace.png";
import vizBedroomDark from "@/assets/viz-bedroom-dark.png";
import annaPortrait from "@/assets/anna-portrait.jpg";

const heroSlides = [vizKitchenRattan, vizLivingBeige, vizBedroomMural];

const pillars = [
  { icon: Palette, title: "Estetyka z funkcją", desc: "Projektuję tak, żeby było pięknie i wygodnie na co dzień, bez kompromisów." },
  { icon: ClipboardList, title: "Porządek w procesie", desc: "Prowadzę Cię krok po kroku, żebyś nie musiał/a martwić się o szczegóły." },
  { icon: UserCheck, title: "Indywidualne podejście", desc: "Każdy projekt dopasowuję do Twojego stylu życia, gustu i budżetu." },
];

const packages = [
  {
    icon: Home,
    name: "Konsultacja",
    desc: "Krótka rozmowa o Twoim wnętrzu. Omówimy pomysł, układ, styl lub konkretny problem.",
    image: vizLivingBeige,
    tags: ["Spotkanie 60 min", "Analiza przestrzeni", "Rekomendacje"],
  },
  {
    icon: Building,
    name: "Opcja Koncepcyjna",
    desc: "Układ funkcjonalny, wizualizacje i podstawowe rysunki techniczne. Solidna baza pod Twój projekt.",
    image: vizKitchenRattan,
    tags: ["Układ funkcjonalny", "Moodboard", "Wizualizacje 3D"],
  },
  {
    icon: Building2,
    name: "Opcja Komfortowa",
    desc: "Pełny projekt z wizualizacjami 3D 360°, dokumentacją techniczną. Gotowy do realizacji.",
    image: vizBedroomMural,
    tags: ["Pełny projekt", "Wizualizacja 360°", "Dokumentacja"],
  },
  {
    icon: Trees,
    name: "Opcja Kompleks",
    desc: "Najbardziej rozbudowana forma współpracy. Od koncepcji po nadzór na budowie.",
    image: vizBathroomMarble,
    tags: ["Pełne wsparcie", "Nadzór budowy", "Zakupy materiałów"],
  },
];

const processSteps = [
  { num: "01", title: "Rozmowa o projekcie", desc: "Spotykamy się lub rozmawiamy online. Poznaję Twoje oczekiwania, styl życia i budżet.", icon: MessageCircle },
  { num: "02", title: "Układ funkcjonalny i koncepcja", desc: "Przygotowuję wstępny układ, moodboard i propozycję kierunku stylistycznego.", icon: Ruler },
  { num: "03", title: "Projekt i wizualizacje", desc: "Tworzę wizualizacje 3D i pełną dokumentację techniczną dla wykonawcy.", icon: Monitor },
  { num: "04", title: "Dokumentacja i wsparcie", desc: "Pomagam w wyborze materiałów, kontakcie z wykonawcą i kontroli na budowie.", icon: Hammer },
];

const testimonials = [
  { text: "Ania przeprowadziła nas przez cały proces. Od pierwszego spotkania po odbiór kluczy. Efekt przeszedł nasze oczekiwania.", author: "Katarzyna M.", location: "Rzeszów", rating: 5 },
  { text: "Profesjonalne podejście i świetne wyczucie stylu. Nasze mieszkanie wygląda dokładnie tak, jak sobie wymarzyliśmy.", author: "Marta i Tomek K.", location: "Krosno", rating: 5 },
  { text: "Spokojnie i konkretnie. Ania pomogła nam uniknąć wielu kosztownych błędów przy wykończeniu domu.", author: "Paweł Z.", location: "Nowy Sącz", rating: 5 },
  { text: "Niesamowite podejście do klienta. Ania słucha, doradza i proponuje rozwiązania, o których sami byśmy nie pomyśleli.", author: "Joanna W.", location: "Sanok", rating: 5 },
  { text: "Projekt wnętrza od Ani to była najlepsza decyzja. Wszystko przemyślane, piękne i funkcjonalne na co dzień.", author: "Michał D.", location: "Jasło", rating: 5 },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [expandedPkg, setExpandedPkg] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length), 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div key={i} className={`absolute inset-0 transition-all duration-1000 ease-in-out ${i === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}>
            <img src={slide} alt={`Wizualizacja wnętrza AN Projekt ${i + 1}`} className="w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/30 to-foreground/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-dark-foreground mb-4 animate-fade-in-up max-w-[280px] sm:max-w-none">
            Wnętrza dopasowane<br className="hidden md:block" /> do&nbsp;Twojego życia
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-dark-foreground/90 mb-8 max-w-md animate-fade-in-up-delay">
            Funkcjonalne, estetyczne i przemyślane w każdym detalu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up-delay-2">
            <Link to="/kontakt" className="px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300">
              Zapytaj o projekt
            </Link>
            <Link to="/realizacje" className="px-7 py-3 rounded-full bg-dark-foreground/20 backdrop-blur-sm text-dark-foreground text-sm tracking-[0.05em] font-body hover:bg-dark-foreground/30 transition-all duration-300">
              Zobacz realizacje
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-dark-foreground w-6" : "bg-dark-foreground/40"}`} aria-label={`Slajd ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-secondary section-padding-sm">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">AN Projekt</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-foreground leading-snug mb-6">
              Pomagam zaplanować wnętrze, które będzie piękne, wygodne i&nbsp;przemyślane do&nbsp;ostatniego detalu.
            </h2>
            <p className="text-muted-foreground font-body text-base md:text-lg max-w-2xl mx-auto">
              Każdy projekt traktuję indywidualnie. Wsłuchuję się w potrzeby i szukam najlepszych rozwiązań dla konkretnej przestrzeni i stylu życia.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* REALIZACJE - vertical tiles */}
      <section className="bg-background section-padding-sm">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4 text-center">Wybrane realizacje</h2>
            <p className="text-muted-foreground font-body text-base text-center mb-12 max-w-lg mx-auto">
              Każdy projekt to inna historia. Zobacz efekty współpracy.
            </p>
          </FadeIn>
          <ProjectCarousel />
          <FadeIn delay={200}>
            <div className="text-center mt-10">
              <Link to="/realizacje" className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-foreground text-foreground text-sm tracking-[0.05em] font-body hover:bg-foreground hover:text-background transition-all duration-300">
                Wszystkie realizacje <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* GALLERY STRIP - infinite marquee */}
      <section className="bg-secondary py-6 overflow-hidden">
        <div className="flex w-max animate-marquee gap-4">
          {[...Array(2)].flatMap((_, setIdx) =>
            [vizDiningFireplace, vizBedroomDark, vizBathroomMarble, vizKitchenRattan, vizLivingBeige, vizBedroomMural].map((img, i) => (
              <Link key={`${setIdx}-${i}`} to="/realizacje" className="flex-shrink-0 group">
                <img src={img} alt={`Wizualizacja ${i + 1}`} className="h-36 md:h-52 w-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </Link>
            ))
          )}
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-background section-padding-sm">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-12 text-center">Na czym opiera się moja praca?</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {pillars.map((p, i) => (
              <FadeIn key={p.title} delay={i * 100}>
                <div className="group flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors duration-300 mt-0.5">
                    <p.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-foreground mb-2">{p.title}</h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES - Accordion */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 flex items-center gap-2">
                  <ClipboardList size={14} className="text-accent" /> Warianty współpracy
                </p>
                <h2 className="font-heading text-2xl md:text-3xl text-foreground max-w-md">
                  Wybierz formę, która odpowiada Twoim potrzebom
                </h2>
              </div>
              <Link to="/oferta" className="px-6 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-body hover:bg-accent/90 transition-colors self-start md:self-auto">
                Poznaj szczegóły
              </Link>
            </div>
          </FadeIn>

          <div className="space-y-0">
            {packages.map((pkg, i) => {
              const isOpen = expandedPkg === i;
              return (
                <FadeIn key={pkg.name} delay={i * 60}>
                  <div className={`border-t border-border transition-all duration-500 ${isOpen ? "bg-background rounded-xl my-2 border-transparent shadow-sm" : "hover:bg-background/50"}`}>
                    <button
                      onClick={() => setExpandedPkg(isOpen ? null : i)}
                      className="w-full flex items-center gap-4 md:gap-6 py-6 px-4 md:px-6 text-left"
                    >
                      <span className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 font-body text-sm text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-heading text-xl md:text-2xl text-foreground flex-1">{pkg.name}</h3>
                      {isOpen ? <X size={20} className="text-muted-foreground shrink-0" /> : <Plus size={20} className="text-muted-foreground shrink-0" />}
                    </button>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="px-4 md:px-6 pb-6 flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <p className="text-muted-foreground font-body text-base leading-relaxed mb-4">{pkg.desc}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {pkg.tags.map((tag) => (
                              <span key={tag} className="px-3 py-1.5 rounded-full border border-border text-foreground font-body text-xs">{tag}</span>
                            ))}
                          </div>
                          <Link to="/oferta" className="inline-flex items-center gap-2 text-sm font-body tracking-[0.05em] uppercase text-foreground border-b border-foreground/30 pb-0.5 hover:border-accent hover:text-accent transition-colors">
                            Zapytaj o tę opcję <ArrowRight size={14} />
                          </Link>
                        </div>
                        <div className="md:w-56 shrink-0">
                          <img src={pkg.image} alt={pkg.name} className="w-full aspect-[4/3] object-cover rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* HORIZONTAL PROCESS TIMELINE */}
      <section className="bg-background section-padding">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4 text-center">Jak przebiega współpraca?</h2>
            <p className="text-muted-foreground font-body text-base text-center mb-14 max-w-lg mx-auto">
              Przejrzysty proces, bez niespodzianek.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="relative">
              <div className="hidden md:block absolute top-5 left-0 right-0 h-px bg-border" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                {processSteps.map((step, i) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={step.num} className="relative group cursor-pointer" onMouseEnter={() => setActiveStep(i)} onMouseLeave={() => setActiveStep(null)}>
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${activeStep === i ? "border-accent bg-accent/10 scale-110" : "border-border bg-background"}`}>
                        <StepIcon size={16} className={`transition-colors duration-300 ${activeStep === i ? "text-accent" : "text-muted-foreground"}`} />
                      </div>
                      <div className="text-center">
                        <p className={`font-body text-xs tracking-[0.15em] uppercase mb-1 transition-colors duration-300 ${activeStep === i ? "text-accent" : "text-muted-foreground"}`}>Krok {step.num}</p>
                        <h3 className="font-heading text-sm text-foreground mb-2">{step.title}</h3>
                        <div className={`overflow-hidden transition-all duration-500 ${activeStep === i ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>
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

      {/* O MNIE */}
      <section className="bg-secondary section-padding-sm">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <FadeIn>
            <div className="relative overflow-hidden rounded-lg">
              <img src={annaPortrait} alt="Anna Nowak, projektantka wnętrz AN Projekt" className="w-full aspect-[3/4] object-cover object-top" loading="lazy" />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">O mnie</p>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-5">Anna Nowak</h2>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-4">
                Projektuję wnętrza mieszkań i domów dla osób, które chcą stworzyć przestrzeń dopasowaną do swojego stylu życia. Funkcjonalną, estetyczną i przemyślaną w każdym detalu.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
                Moja droga do projektowania wnętrz zaczęła się od budowy własnego domu. Dziś pomagam moim klientom przejść przez ten proces spokojniej i bardziej świadomie.
              </p>

              {/* Signature */}
              <p className="font-heading italic text-2xl text-accent mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Anna Nowak</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <p className="font-heading text-3xl md:text-4xl text-foreground">50+</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">Zrealizowanych projektów</p>
                </div>
                <div>
                  <p className="font-heading text-3xl md:text-4xl text-foreground">8</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">Lat doświadczenia</p>
                </div>
                <div>
                  <p className="font-heading text-3xl md:text-4xl text-foreground">100%</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">Zadowolonych klientów</p>
                </div>
              </div>

              <Link to="/o-mnie" className="inline-flex items-center gap-2 text-sm font-body tracking-[0.05em] uppercase text-foreground border-b border-foreground/30 pb-0.5 hover:border-accent hover:text-accent transition-colors">
                Poznaj mnie lepiej <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-card section-padding-sm">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8 text-center">Opinie klientów</p>
          </FadeIn>
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div
                  className={`bg-background rounded-xl p-6 flex flex-col min-w-[280px] max-w-[300px] h-full border transition-all duration-700 cursor-pointer ${
                    activeTestimonial === i
                      ? "border-accent shadow-md scale-[1.03]"
                      : "border-border/50 opacity-60"
                  }`}
                  onClick={() => setActiveTestimonial(i)}
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="text-accent fill-accent" />
                    ))}
                  </div>
                  <blockquote className="font-body text-sm text-foreground leading-relaxed mb-5 flex-1">
                    &bdquo;{t.text}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="font-heading text-sm text-accent">{t.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-foreground">{t.author}</p>
                      <p className="font-body text-xs text-muted-foreground">{t.location}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  activeTestimonial === i ? "bg-accent w-5" : "bg-border"
                }`}
                aria-label={`Opinia ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent/10 section-padding-sm">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">Planujesz remont lub urządzanie wnętrza?</h2>
            <p className="text-muted-foreground font-body text-base mb-6">
              Napisz do mnie. Chętnie porozmawiam o Twoim projekcie. Pierwsza rozmowa jest bezpłatna.
            </p>
            <Link to="/kontakt" className="inline-block px-8 py-3.5 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300">
              Porozmawiaj o swoim wnętrzu
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Index;
