import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Download, AlertTriangle, Lightbulb, ChevronUp, Eye } from "lucide-react";
import FadeIn from "@/components/FadeIn";

import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizBedroomDark from "@/assets/viz-bedroom-dark.png";
import vizDetailCeramics from "@/assets/viz-detail-ceramics.png";
import vizDiningFireplace from "@/assets/viz-dining-fireplace.png";
import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizClosetMarble from "@/assets/viz-closet-marble.png";
import vizBathroomMarble from "@/assets/viz-bathroom-marble.png";
import vizBedroomMural from "@/assets/viz-bedroom-mural.png";
import annaPortrait from "@/assets/anna-portrait.jpg";

const tocItems = [
  { id: "intro", label: "O mnie" },
  { id: "toc", label: "Spis treści" },
  { id: "need", label: "Projektant?" },
  { id: "steps", label: "5 kroków" },
  { id: "style", label: "Styl i budżet" },
  { id: "colors", label: "Kolory" },
  { id: "checklist", label: "Checklista" },
  { id: "mistakes", label: "10 błędów" },
  { id: "case", label: "Realizacja" },
  { id: "choose", label: "Jak wybrać?" },
  { id: "offer", label: "Oferta" },
  { id: "cta", label: "Kontakt" },
];

const EbookPreview = () => {
  const handlePrint = () => window.print();
  const [activeSection, setActiveSection] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const progressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Checklist logic
  const checklistData = [
    { title: "Planowanie", items: ["Zakres prac ustalony", "Projekt/rzut gotowy", "Ściany nośne sprawdzone", "Instalacje zweryfikowane", "Priorytety (muszę/chcę) ustalone"] },
    { title: "Budżet", items: ["Budżet całkowity określony", "Bufor 15-20% zabezpieczony", "Min. 3 wyceny zebrane", "Umowa z wykonawcą podpisana", "Co jest w cenie wyjaśnione"] },
    { title: "Materiały", items: ["Styl i kolorystyka wybrane", "Moodboard przygotowany", "Próbniki zamówione", "Dostawy zaplanowane", "Nadmiar +10% doliczony"] },
    { title: "Wykonawcy", items: ["Harmonogram ustalony", "Kolejność prac rozpisana", "Gdzie mieszkam w trakcie rozwiązane"] },
    { title: "Przed startem", items: ["Wszystkie decyzje podjęte", "Zdjęcia dokumentacyjne zrobione", "Kontakt do projektantki zapisany"] },
  ];

  const totalChecklistItems = checklistData.reduce((sum, b) => sum + b.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 600);

      // Active section detection
      for (const item of [...tocItems].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(item.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-background print:bg-white">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border/30 print:hidden">
        <div
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Floating side nav - desktop only */}
      <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-1.5 print:hidden">
        {tocItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            title={item.label}
            className={`group flex items-center gap-2 transition-all duration-300 ${
              activeSection === item.id ? "opacity-100" : "opacity-40 hover:opacity-70"
            }`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? "w-6 h-1.5 bg-accent"
                  : "w-2 h-1.5 bg-foreground/30 group-hover:w-4 group-hover:bg-foreground/50"
              }`}
            />
            <span
              className={`font-body text-[10px] tracking-wide transition-all duration-300 ${
                activeSection === item.id
                  ? "opacity-100 translate-x-0 text-accent"
                  : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-muted-foreground"
              }`}
            >
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg transition-all duration-300 print:hidden ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Wróć na górę"
      >
        <ChevronUp size={18} />
      </button>

      {/* ===== PAGE 1: COVER ===== */}
      <section className="relative min-h-[85vh] md:min-h-screen overflow-hidden flex items-center justify-center">
        <img src={vizLivingBeige} alt="AN Projekt wnętrze" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/55 to-foreground/70" />
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <span className="inline-block font-body text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/60 mb-6 animate-fade-in-up">
            Interior Design Guide 2026
          </span>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white mb-5 leading-[1.1] animate-fade-in-up-delay">
            Projekt wnętrza<br />od&nbsp;A&nbsp;do&nbsp;Z
          </h1>
          <p className="font-body text-sm md:text-base text-white/60 mb-10 animate-fade-in-up-delay-2">
            Przewodnik dla właścicieli mieszkań i domów
          </p>
          <div className="w-20 h-px bg-white/20 mx-auto mb-5 animate-fade-in-up-delay-2" />
          <p className="font-body text-[10px] md:text-xs text-white/40 tracking-wider animate-fade-in-up-delay-2">
            AN Projekt &nbsp;·&nbsp; Anna Nowak &nbsp;·&nbsp; anprojekt.com.pl
          </p>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up-delay-2">
          <span className="font-body text-[9px] text-white/30 tracking-widest uppercase">Czytaj</span>
          <div className="w-px h-8 bg-white/20" />
        </div>
      </section>

      {/* ===== PAGE 2: O MNIE ===== */}
      <section id="intro" className="section-padding scroll-mt-16">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 items-center">
              <div className="md:col-span-3 order-2 md:order-1">
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">O mnie</span>
                <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-6 leading-tight">
                  Cześć, nazywam się Anna.
                </h2>
                <div className="space-y-4 font-body text-sm text-muted-foreground leading-[1.8]">
                  <p>
                    Projektowanie wnętrz zaczęło się u mnie od budowy własnego domu. Wtedy po raz pierwszy zobaczyłam,
                    jak wiele decyzji trzeba podjąć, i jak łatwo popełnić błędy, które kosztują.
                  </p>
                  <p>
                    Od tamtej pory pomagam właścicielom mieszkań i domów zaprojektować wnętrza funkcjonalne
                    i dopasowane do ich stylu życia.
                  </p>
                  <p className="text-foreground">Ten przewodnik jest dla Ciebie.</p>
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="font-heading text-lg italic text-foreground">Anna Nowak</p>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">AN Projekt</p>
                </div>
              </div>
              <div className="md:col-span-2 order-1 md:order-2">
                <div className="relative">
                  <img src={annaPortrait} alt="Anna Nowak" className="w-full rounded-2xl object-cover object-top aspect-[3/4] shadow-xl" />
                  <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-2xl bg-accent/10 -z-10" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 3: SPIS TREŚCI ===== */}
      <section id="toc" className="section-padding bg-secondary scroll-mt-16">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
              <div>
                <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-10 leading-tight">
                  Co znajdziesz<br />w tym przewodniku
                </h2>
                <div className="space-y-0">
                  {[
                    "Czy potrzebujesz projektanta?",
                    "5 kroków projektu wnętrza",
                    "Styl i budżet",
                    "Kolory i materiały",
                    "Checklista 27 pytań przed remontem",
                    "10 najczęstszych błędów",
                    "Realizacja – case study",
                    "Jak wybrać projektanta?",
                    "Jak mogę Ci pomóc?",
                    "Następny krok",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-baseline gap-4 py-3 border-b border-border/50 last:border-0 group hover:bg-background/50 px-2 -mx-2 rounded transition-colors cursor-default"
                    >
                      <span className="font-heading text-accent text-xs w-6 shrink-0 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-body text-sm text-foreground/80 group-hover:text-foreground transition-colors flex-1">
                        {item}
                      </span>
                      <span className="font-body text-[10px] text-muted-foreground/40 group-hover:text-accent transition-colors">
                        →
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img src={vizDetailCeramics} alt="Detal wnętrza" className="w-full rounded-2xl object-cover aspect-[3/4] shadow-lg" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 4: CZY POTRZEBUJESZ PROJEKTANTA? ===== */}
      <section id="need" className="section-padding scroll-mt-16">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">01</span>
            <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-8">
              Czy potrzebujesz projektanta wnętrz?
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-6">Warto rozważyć projektanta gdy:</p>
            <ul className="space-y-3 mb-12">
              {[
                "Kupujesz mieszkanie lub dom z deweloperki",
                "Planujesz generalny remont",
                "Masz trudną przestrzeń (małą, ciemną)",
                "Chcesz spójnego efektu, bez setek decyzji",
                "Zależy Ci na unikaniu błędów zakupowych",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-foreground/80">
                  <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} className="text-accent" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary rounded-2xl p-6 md:p-7">
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-5 block">
                  Ile kosztuje projekt wnętrza?
                </span>
                <div className="space-y-4">
                  {[
                    { name: "Koncepcyjna", price: "120 zł/m²", desc: "Układ + wizualizacje" },
                    { name: "Komfortowa", price: "150 zł/m²", desc: "Pełny + 3D 360°" },
                    { name: "Kompleksowa", price: "170 zł/m²", desc: "Projekt + nadzór" },
                  ].map((p) => (
                    <div key={p.name} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-body text-sm text-foreground font-medium">{p.name}</p>
                        <p className="font-body text-xs text-muted-foreground">{p.desc}</p>
                      </div>
                      <span className="font-heading text-sm text-accent">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary rounded-2xl p-6 md:p-7">
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-5 block">
                  Przykładowe koszty wykończenia 70m²
                </span>
                <div className="space-y-4">
                  {[
                    { name: "Standard", range: "105 000 – 175 000 zł" },
                    { name: "Premium", range: "175 000 – 280 000 zł" },
                    { name: "Luxury", range: "280 000 zł+" },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0">
                      <span className="font-body text-sm text-foreground font-medium">{c.name}</span>
                      <span className="font-body text-sm text-muted-foreground">{c.range}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2.5 mt-5 bg-accent/8 rounded-xl p-3.5">
                  <Lightbulb size={14} className="text-accent mt-0.5 shrink-0" />
                  <p className="font-body text-xs text-foreground/70 leading-relaxed">
                    Projekt zwraca się w lepszych decyzjach zakupowych i unikniętych błędach.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 5: 5 KROKÓW ===== */}
      <section id="steps" className="section-padding bg-primary text-primary-foreground scroll-mt-16">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">02</span>
            <h2 className="font-heading text-2xl md:text-4xl mb-10">5 kroków dobrego projektu wnętrza</h2>
            <div className="space-y-0">
              {[
                { step: "01", title: "Pierwsza rozmowa", time: "30–60 min", desc: "Omawiamy potrzeby, styl, budżet. Bez zobowiązań, bez presji." },
                { step: "02", title: "Wizja lokalna i pomiar", time: "1–2 godz.", desc: "Przyjeżdżam do Ciebie. Mierzę, fotografuję, widzę przestrzeń." },
                { step: "03", title: "Projekt koncepcyjny", time: "1–2 tyg.", desc: "Układ funkcjonalny + moodboard. Widzisz kierunek zanim zaczniesz." },
                { step: "04", title: "Wizualizacje 3D", time: "2–4 tyg.", desc: "Renderuję wnętrze. Razem dopracowujemy każdy detal. 2–3 rundy poprawek." },
                { step: "05", title: "Dokumentacja + nadzór", time: "1–2 tyg.", desc: "Dokumentacja techniczna dla ekip. Opcjonalnie: 3 spotkania na budowie." },
              ].map((s, i) => (
                <div key={i} className="flex gap-5 md:gap-8 py-6 border-b border-primary-foreground/8 last:border-0 group">
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-accent/30 flex items-center justify-center">
                    <span className="font-heading text-accent text-sm md:text-base">{s.step}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-baseline justify-between mb-1.5">
                      <h3 className="font-heading text-base md:text-lg group-hover:text-accent transition-colors">{s.title}</h3>
                      <span className="font-body text-[10px] text-primary-foreground/40 tracking-wider">{s.time}</span>
                    </div>
                    <p className="font-body text-sm text-primary-foreground/50 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 6: STYL I BUDŻET ===== */}
      <section id="style" className="section-padding bg-secondary scroll-mt-16">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
              <div>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">03a</span>
                <h2 className="font-heading text-xl md:text-2xl text-foreground mb-6">Jak wybrać styl?</h2>
                <p className="font-body text-sm text-muted-foreground mb-5">4 pytania, które pomogą Ci określić kierunek:</p>
                <ol className="space-y-3 mb-8 font-body text-sm text-foreground/80">
                  {["Ciepłe czy zimne kolory?", "Dużo dekoracji czy minimalizm?", "Drewno i tkaniny czy beton i metal?", "Klasyka czy nowoczesność?"].map((q, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-[10px] font-heading text-accent">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{q}</span>
                    </li>
                  ))}
                </ol>
                <p className="font-body text-xs text-muted-foreground mb-3">Style, które mogą Ci odpowiadać:</p>
                <div className="flex flex-wrap gap-2">
                  {["Japandi", "Modern Classic", "Skandynawski", "Boho Premium", "Industrial"].map((s) => (
                    <span key={s} className="font-body text-xs px-3.5 py-1.5 rounded-full bg-accent/8 text-accent border border-accent/15 hover:bg-accent/15 transition-colors">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">03b</span>
                <h2 className="font-heading text-xl md:text-2xl text-foreground mb-6">Budżet – jak zaplanować?</h2>
                <p className="font-body text-sm text-muted-foreground mb-5">Koszt wykończenia (bez mebli):</p>
                <div className="space-y-4 mb-6">
                  {[
                    { name: "Standard", range: "1 500–2 500 zł/m²" },
                    { name: "Premium", range: "2 500–4 000 zł/m²" },
                    { name: "Luxury", range: "4 000+ zł/m²" },
                  ].map((c) => (
                    <div key={c.name} className="flex justify-between border-b border-border/50 pb-3">
                      <span className="font-body text-sm text-foreground font-medium">{c.name}</span>
                      <span className="font-body text-sm text-muted-foreground">{c.range}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-background rounded-xl p-4 mb-5">
                  <p className="font-body text-sm text-foreground/80 mb-1">Przykład: mieszkanie 70m²</p>
                  <p className="font-body text-xs text-muted-foreground">Standard: 105–175 tys. zł &nbsp;·&nbsp; Premium: 175–280 tys. zł</p>
                </div>
                <div className="flex items-start gap-2.5 bg-accent/8 rounded-xl p-3.5">
                  <AlertTriangle size={14} className="text-accent mt-0.5 shrink-0" />
                  <p className="font-body text-xs text-foreground/70 leading-relaxed">
                    Bufor awaryjny: minimum 15–20% ponad budżet główny
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 7: KOLORY I MATERIAŁY ===== */}
      <section id="colors" className="overflow-hidden scroll-mt-16">
        <div className="relative h-56 md:h-72">
          <img src={vizKitchenRattan} alt="Realizacja AN Projekt" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
        </div>
        <div className="section-padding">
          <div className="max-w-[1000px] mx-auto">
            <FadeIn>
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">04</span>
              <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-8">Jak dobrać kolory i materiały?</h2>

              <div className="bg-secondary rounded-2xl p-6 md:p-8 mb-8">
                <h3 className="font-heading text-lg text-foreground mb-4">Zasada 60-30-10</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { pct: "60%", label: "Kolor dominujący", desc: "ściany, podłogi, meble", color: "bg-foreground/10" },
                    { pct: "30%", label: "Kolor uzupełniający", desc: "sofa, zasłony", color: "bg-accent/15" },
                    { pct: "10%", label: "Akcent", desc: "poduszki, rośliny, lampy", color: "bg-accent/30" },
                  ].map((c) => (
                    <div key={c.pct} className={`${c.color} rounded-xl p-4 text-center`}>
                      <span className="font-heading text-2xl text-foreground block mb-1">{c.pct}</span>
                      <p className="font-body text-xs text-foreground font-medium">{c.label}</p>
                      <p className="font-body text-[10px] text-muted-foreground mt-0.5">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="font-body text-sm text-foreground/80 mb-4">Zasada 3 faktur: max 3 materiały w 1 pomieszczeniu</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {[
                  { combo: "Drewno + tkanina + metal", style: "Modern Classic" },
                  { combo: "Marmur + biel + rattan", style: "Boho Premium" },
                  { combo: "Len + biel + drewno jasne", style: "Skandynawski" },
                ].map((c) => (
                  <div key={c.style} className="bg-secondary rounded-xl p-4 border border-border/50">
                    <p className="font-body text-xs text-muted-foreground mb-1">{c.combo}</p>
                    <p className="font-heading text-sm text-accent">{c.style}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="font-body text-xs text-foreground font-medium mr-1">Trendy 2026:</span>
                {["Zieleń butelkowa", "Terakota", "Rattan", "Trawertyn", "Mosiądz szczotkowany"].map((t) => (
                  <span key={t} className="font-body text-[11px] px-3 py-1 rounded-full bg-accent/8 text-accent border border-accent/15">
                    {t}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== PAGE 8: INTERACTIVE CHECKLISTA ===== */}
      <section id="checklist" className="section-padding bg-secondary scroll-mt-16">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">05</span>
            <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-3">
              Checklista 27 pytań przed remontem
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Kliknij, aby odhaczać kolejne punkty. Twój postęp: {checkedCount}/{totalChecklistItems}
            </p>

            {/* Progress bar */}
            <div className="w-full h-2 bg-border/30 rounded-full mb-10 overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(checkedCount / totalChecklistItems) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {checklistData.map((block) => (
                <div key={block.title} className="bg-background rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-heading text-sm text-accent mb-4">{block.title}</h3>
                  <ul className="space-y-2.5">
                    {block.items.map((item) => (
                      <li key={item}>
                        <button
                          onClick={() => toggleCheck(item)}
                          className="flex items-start gap-2.5 w-full text-left group"
                        >
                          <span
                            className={`w-4 h-4 rounded border shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200 ${
                              checkedItems[item]
                                ? "bg-accent border-accent"
                                : "border-border group-hover:border-accent/50"
                            }`}
                          >
                            {checkedItems[item] && <Check size={10} className="text-accent-foreground" />}
                          </span>
                          <span
                            className={`font-body text-xs transition-all duration-200 ${
                              checkedItems[item]
                                ? "text-muted-foreground line-through"
                                : "text-foreground/70 group-hover:text-foreground"
                            }`}
                          >
                            {item}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Score card */}
            <div className="bg-background rounded-2xl p-6 shadow-sm border border-accent/10">
              <p className="font-heading text-base text-foreground mb-3">Twój wynik</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { range: "20–27", label: "Jesteś gotowy. Możesz zaczynać.", active: checkedCount >= 20 },
                  { range: "15–19", label: "Kilka luk, uzupełnij przed startem.", active: checkedCount >= 15 && checkedCount < 20 },
                  { range: "< 15", label: "Warto zaplanować z projektantką.", active: checkedCount < 15 },
                ].map((r) => (
                  <div
                    key={r.range}
                    className={`rounded-xl p-4 border transition-all duration-300 ${
                      r.active ? "border-accent bg-accent/8" : "border-border/50 bg-secondary"
                    }`}
                  >
                    <span className={`font-heading text-lg ${r.active ? "text-accent" : "text-muted-foreground"}`}>
                      {r.range}
                    </span>
                    <p className="font-body text-xs text-muted-foreground mt-1">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 9: 10 BŁĘDÓW ===== */}
      <section id="mistakes" className="section-padding scroll-mt-16">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">06</span>
            <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-10">10 najczęstszych błędów</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
              {[
                { err: "Brak planu przed zakupami", tip: "Zacznij od koncepcji, potem kupuj" },
                { err: "Złe proporcje mebli do przestrzeni", tip: "Zmierz pomieszczenie i meble przed zakupem" },
                { err: "Niedoświetlone wnętrze", tip: "Zaplanuj min. 3 źródła światła w każdym pokoju" },
                { err: "Kolorystyczny chaos", tip: "Stosuj zasadę 60-30-10" },
                { err: "Brak miejsca do przechowywania", tip: "Zabudowy, szafy wnękowe, antresole" },
                { err: "Ślepe kopiowanie trendów z Instagrama", tip: "Dopasuj styl do swojego życia" },
                { err: "Urządzanie pod Instagram zamiast pod życie", tip: "Piękne na zdjęciu nie znaczy funkcjonalne" },
                { err: "Oszczędzanie na podłodze i oświetleniu", tip: "To fundament, nie dekoracja" },
                { err: "Za mało gniazdek", tip: "Lepiej zaplanować więcej niż mniej" },
                { err: "Pośpiech przy wyborze wykonawcy", tip: "Sprawdź referencje i wcześniejsze realizacje" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 py-5 border-b border-border/50 last:border-0 group">
                  <span className="font-heading text-accent text-xs w-6 shrink-0 pt-0.5 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-body text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                      {item.err}
                    </p>
                    <p className="font-body text-xs text-muted-foreground mt-1">→ {item.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 10: REALIZACJA ===== */}
      <section id="case" className="overflow-hidden scroll-mt-16">
        <div className="relative h-64 md:h-96">
          <img src={vizDiningFireplace} alt="Realizacja Złota Harmonia" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary" />
        </div>
        <div className="section-padding bg-secondary -mt-1">
          <div className="max-w-[1000px] mx-auto">
            <FadeIn>
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">07</span>
              <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-6">
                Realizacja: Złota Harmonia – Rzeszów
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {[
                  { label: "Metraż", value: "85m²" },
                  { label: "Lokalizacja", value: "Rzeszów" },
                  { label: "Pakiet", value: "Komfortowa" },
                  { label: "Czas", value: "7 tygodni" },
                ].map((d) => (
                  <div key={d.label} className="bg-background rounded-xl p-4 text-center shadow-sm">
                    <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">{d.label}</p>
                    <p className="font-heading text-lg text-foreground mt-1">{d.value}</p>
                  </div>
                ))}
              </div>

              {/* Gallery */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {[vizClosetMarble, vizBedroomDark, vizBedroomMural, vizBathroomMarble].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Realizacja ${i + 1}`}
                    className="w-full aspect-square object-cover rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  />
                ))}
              </div>

              <blockquote className="font-body text-sm text-foreground/70 italic leading-[1.8] mb-5 border-l-2 border-accent pl-5 py-1">
                „Klientka marzyła o ciepłym, eleganckim wnętrzu z nutą luksusu. Połączyłam ciepłe drewno, złote akcenty
                i miękkie tkaniny, zachowując pełną funkcjonalność dla 4-osobowej rodziny."
              </blockquote>
              <p className="font-body text-xs text-muted-foreground">
                Zakres: salon + jadalnia + kuchnia + 2 sypialnie
              </p>
              <Link
                to="/realizacje"
                className="inline-flex items-center gap-2 mt-4 font-body text-xs text-accent hover:underline"
              >
                <Eye size={12} /> Zobacz więcej realizacji
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== PAGE 11: JAK WYBRAĆ PROJEKTANTA ===== */}
      <section id="choose" className="section-padding bg-primary text-primary-foreground scroll-mt-16">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">08</span>
            <h2 className="font-heading text-2xl md:text-4xl mb-10">Jak wybrać dobrego projektanta?</h2>

            <p className="font-body text-sm text-primary-foreground/60 mb-6">5 pytań, które musisz zadać:</p>
            <div className="space-y-4 mb-10">
              {[
                "Czy masz portfolio podobnych realizacji?",
                "Co dokładnie zawiera wybrany pakiet?",
                "Ile rund poprawek jest w cenie?",
                "Czy przygotowujesz dokumentację dla wykonawców?",
                "Jakie są realistyczne czasy realizacji?",
              ].map((q, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center shrink-0">
                    <span className="font-heading text-accent text-xs">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <span className="font-body text-sm text-primary-foreground/80 pt-1">{q}</span>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-primary-foreground/8 mb-8" />

            <p className="font-body text-[10px] tracking-[0.15em] uppercase text-destructive/80 mb-5">
              Czerwone flagi – uważaj gdy projektant:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Nie ma realnego portfolio (tylko stocki)",
                "Nie pyta o potrzeby i budżet",
                "Brak jasnej umowy i harmonogramu",
                'Obiecuje projekt "w tydzień" za każdą cenę',
                'Wszystkie ceny "do ustalenia" bez widełek',
              ].map((flag) => (
                <div key={flag} className="flex items-start gap-2.5 font-body text-sm text-primary-foreground/50 bg-primary-foreground/5 rounded-lg p-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 12: OFERTA ===== */}
      <section id="offer" className="section-padding scroll-mt-16">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">09</span>
            <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-10">
              Jak mogę Ci pomóc zaprojektować Twoje wnętrze?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {[
                {
                  name: "Koncepcyjna",
                  price: "120 zł/m²",
                  features: ["Układ funkcjonalny", "3 wizualizacje kluczowych pomieszczeń", "Podstawowe rysunki techniczne"],
                  forWho: "Dla właścicieli szukających dobrego startu",
                  highlight: false,
                },
                {
                  name: "Komfortowa",
                  price: "150 zł/m²",
                  features: ["Wszystko z Koncepcyjnej", "Pełny projekt + 4 wizualizacje", "Wizualizacja 3D 360°", "Dokumentacja techniczna dla wykonawców"],
                  forWho: "Dla osób chcących gotowy projekt do realizacji",
                  highlight: true,
                },
                {
                  name: "Kompleksowa",
                  price: "170 zł/m²",
                  features: ["Wszystko z Komfortowej", "Krótkie wideo wizualne wnętrza", "3 spotkania nadzorujące na budowie"],
                  forWho: "Dla inwestorów premium, projekt od A do Z",
                  highlight: false,
                },
              ].map((pkg, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-6 md:p-7 flex flex-col transition-all duration-300 hover:shadow-lg ${
                    pkg.highlight
                      ? "bg-primary text-primary-foreground ring-2 ring-accent shadow-md scale-[1.02]"
                      : "bg-secondary"
                  }`}
                >
                  {pkg.highlight && (
                    <span className="font-body text-[9px] tracking-[0.15em] uppercase text-accent mb-3 block">
                      Najpopularniejsza
                    </span>
                  )}
                  <div className="flex items-baseline justify-between mb-5">
                    <h3 className="font-heading text-lg">{pkg.name}</h3>
                    <span className="font-heading text-accent text-base">{pkg.price}</span>
                  </div>
                  <ul className="space-y-2.5 mb-5 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 font-body text-xs">
                        <Check size={12} className="text-accent mt-0.5 shrink-0" />
                        <span className={pkg.highlight ? "text-primary-foreground/70" : "text-foreground/70"}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className={`font-body text-xs italic ${pkg.highlight ? "text-primary-foreground/50" : "text-muted-foreground"}`}>
                    {pkg.forWho}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-body text-xs text-muted-foreground text-center">
              Obszar: Podkarpacie (Krosno, Rzeszów) + Małopolska (Nowy Sącz)
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 13: CTA ===== */}
      <section id="cta" className="relative min-h-[55vh] overflow-hidden flex items-center justify-center scroll-mt-16">
        <img src={vizBathroomMarble} alt="AN Projekt realizacja" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/60 to-foreground/75" />
        <div className="relative z-10 text-center px-6 max-w-xl py-16">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-5xl text-white mb-5 leading-tight">
              Gotowa na swoje<br />wymarzone wnętrze?
            </h2>
            <p className="font-body text-sm text-white/60 mb-8 leading-[1.8]">
              Jeśli planujesz remont lub wykończenie mieszkania na Podkarpaciu lub w Małopolsce, napisz do mnie.
              Pierwsza rozmowa jest bezpłatna i bez zobowiązań.
            </p>
            <div className="w-16 h-px bg-white/20 mx-auto mb-6" />
            <div className="font-body text-sm text-white/50 space-y-1.5 mb-8">
              <p>anna@anprojekt.com.pl</p>
              <p>Odrzykoń · Podkarpacie</p>
            </div>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-foreground text-sm tracking-[0.05em] font-body hover:bg-white/90 transition-all duration-300 shadow-lg"
            >
              Napisz do mnie <ArrowRight size={14} />
            </Link>
            <p className="font-body text-[10px] text-white/30 mt-10">© 2026 AN Projekt · Anna Nowak</p>
          </FadeIn>
        </div>
      </section>

      {/* Download/Print bar */}
      <div className="print:hidden bg-secondary section-padding-sm">
        <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="font-body text-sm text-muted-foreground">Chcesz zachować ten przewodnik?</p>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-body hover:bg-accent/90 transition-colors shadow-sm"
          >
            <Download size={14} />
            Zapisz jako PDF
          </button>
        </div>
      </div>
    </main>
  );
};

export default EbookPreview;
