import { Link } from "react-router-dom";
import { ArrowRight, Check, X, Download, AlertTriangle, Lightbulb } from "lucide-react";
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

const EbookPreview = () => {
  const handlePrint = () => window.print();

  return (
    <main className="bg-background print:bg-white">
      {/* ===== PAGE 1: COVER ===== */}
      <section className="relative min-h-[80vh] md:min-h-screen overflow-hidden flex items-center justify-center">
        <img src={vizLivingBeige} alt="AN Projekt wnętrze" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <span className="inline-block font-body text-xs tracking-[0.2em] uppercase text-white/70 mb-4">Interior Design Guide 2026</span>
          <h1 className="font-heading text-4xl md:text-6xl text-white mb-4 leading-tight">Projekt wnętrza od&nbsp;A&nbsp;do&nbsp;Z</h1>
          <p className="font-body text-sm md:text-base text-white/70 mb-8">Przewodnik dla właścicieli mieszkań i domów</p>
          <div className="w-16 h-px bg-white/30 mx-auto mb-4" />
          <p className="font-body text-xs text-white/50">AN Projekt &nbsp;|&nbsp; Anna Nowak &nbsp;|&nbsp; anprojekt.com.pl</p>
        </div>
      </section>

      {/* ===== PAGE 2: O MNIE ===== */}
      <section className="section-padding">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
              <div className="md:col-span-3 order-2 md:order-1">
                <span className="font-body text-xs tracking-[0.15em] uppercase text-accent mb-3 block">O mnie</span>
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-5">Cześć, nazywam się Anna.</h2>
                <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
                  <p>Projektowanie wnętrz zaczęło się u mnie od budowy własnego domu. Wtedy po raz pierwszy zobaczyłam, jak wiele decyzji trzeba podjąć – i jak łatwo popełnić błędy, które kosztują.</p>
                  <p>Od tamtej pory pomagam właścicielom mieszkań i domów zaprojektować wnętrza funkcjonalne i dopasowane do ich stylu życia.</p>
                  <p>Ten przewodnik jest dla Ciebie.</p>
                </div>
                <p className="font-heading text-base italic text-foreground mt-6">Anna Nowak</p>
                <p className="font-body text-xs text-muted-foreground">AN Projekt</p>
              </div>
              <div className="md:col-span-2 order-1 md:order-2">
                <img src={annaPortrait} alt="Anna Nowak" className="w-full rounded-xl object-cover object-top aspect-[3/4]" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 3: SPIS TREŚCI ===== */}
      <section className="section-padding bg-secondary">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8">Co znajdziesz w tym przewodniku</h2>
                <div className="space-y-3">
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
                    <div key={i} className="flex items-baseline gap-3 font-body text-sm text-foreground/80">
                      <span className="font-heading text-accent text-xs w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img src={vizDetailCeramics} alt="Detal wnętrza" className="w-full rounded-xl object-cover aspect-[3/4]" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 4: CZY POTRZEBUJESZ PROJEKTANTA? ===== */}
      <section className="section-padding">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <span className="font-body text-xs tracking-[0.15em] uppercase text-accent mb-3 block">01</span>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Czy potrzebujesz projektanta wnętrz?</h2>
            <p className="font-body text-sm text-muted-foreground mb-6">Warto rozważyć projektanta gdy:</p>
            <ul className="space-y-3 mb-10">
              {[
                "Kupujesz mieszkanie lub dom z deweloperki",
                "Planujesz generalny remont",
                "Masz trudną przestrzeń (małą, ciemną)",
                "Chcesz spójnego efektu – bez setek decyzji",
                "Zależy Ci na unikaniu błędów zakupowych",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-foreground/80">
                  <Check size={14} className="text-accent mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary rounded-xl p-6">
                <span className="font-body text-xs tracking-[0.15em] uppercase text-accent mb-4 block">Ile kosztuje projekt wnętrza?</span>
                <div className="space-y-3">
                  {[
                    { name: "Koncepcyjna", price: "120 zł/m²", desc: "Układ + wizualizacje" },
                    { name: "Komfortowa", price: "150 zł/m²", desc: "Pełny + 3D 360°" },
                    { name: "Kompleksowa", price: "170 zł/m²", desc: "Projekt + nadzór" },
                  ].map((p) => (
                    <div key={p.name} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                      <div>
                        <p className="font-body text-sm text-foreground font-medium">{p.name}</p>
                        <p className="font-body text-xs text-muted-foreground">{p.desc}</p>
                      </div>
                      <span className="font-heading text-sm text-accent">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary rounded-xl p-6">
                <span className="font-body text-xs tracking-[0.15em] uppercase text-accent mb-4 block">Przykładowe koszty wykończenia 70m²</span>
                <div className="space-y-3">
                  {[
                    { name: "Standard", range: "105 000 – 175 000 zł" },
                    { name: "Premium", range: "175 000 – 280 000 zł" },
                    { name: "Luxury", range: "280 000 zł+" },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                      <span className="font-body text-sm text-foreground font-medium">{c.name}</span>
                      <span className="font-body text-sm text-muted-foreground">{c.range}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 mt-4 bg-accent/10 rounded-lg p-3">
                  <Lightbulb size={14} className="text-accent mt-0.5 shrink-0" />
                  <p className="font-body text-xs text-foreground/70">Projekt zwraca się w lepszych decyzjach zakupowych i unikniętych błędach.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 5: 5 KROKÓW ===== */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <span className="font-body text-xs tracking-[0.15em] uppercase text-accent mb-3 block">02</span>
            <h2 className="font-heading text-2xl md:text-3xl mb-8">5 kroków dobrego projektu wnętrza</h2>
            <div className="space-y-0">
              {[
                { step: "01", title: "Pierwsza rozmowa", time: "30–60 min", desc: "Omawiamy potrzeby, styl, budżet. Bez zobowiązań, bez presji." },
                { step: "02", title: "Wizja lokalna i pomiar", time: "1–2 godz.", desc: "Przyjeżdżam do Ciebie. Mierzę, fotografuję, widzę przestrzeń." },
                { step: "03", title: "Projekt koncepcyjny", time: "1–2 tyg.", desc: "Układ funkcjonalny + moodboard. Widzisz kierunek zanim zaczniesz." },
                { step: "04", title: "Wizualizacje 3D", time: "2–4 tyg.", desc: "Renderuję wnętrze. Razem dopracowujemy każdy detal. 2–3 rundy poprawek." },
                { step: "05", title: "Dokumentacja + nadzór", time: "1–2 tyg.", desc: "Dokumentacja techniczna dla ekip. Opcjonalnie: 3 spotkania na budowie." },
              ].map((s, i) => (
                <div key={i} className="flex gap-4 md:gap-6 py-5 border-b border-primary-foreground/10 last:border-0">
                  <span className="font-heading text-accent text-lg md:text-xl w-8 shrink-0">{s.step}</span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className="font-heading text-base md:text-lg">{s.title}</h3>
                      <span className="font-body text-xs text-primary-foreground/50">{s.time}</span>
                    </div>
                    <p className="font-body text-sm text-primary-foreground/60">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 6: STYL I BUDŻET ===== */}
      <section className="section-padding bg-secondary">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <span className="font-body text-xs tracking-[0.15em] uppercase text-accent mb-3 block">03a</span>
                <h2 className="font-heading text-xl md:text-2xl text-foreground mb-5">Jak wybrać styl?</h2>
                <p className="font-body text-sm text-muted-foreground mb-4">4 pytania, które pomogą Ci określić kierunek:</p>
                <ol className="space-y-2 mb-6 list-decimal list-inside font-body text-sm text-foreground/80">
                  <li>Ciepłe czy zimne kolory?</li>
                  <li>Dużo dekoracji czy minimalizm?</li>
                  <li>Drewno i tkaniny czy beton i metal?</li>
                  <li>Klasyka czy nowoczesność?</li>
                </ol>
                <p className="font-body text-xs text-muted-foreground mb-2">Style, które mogą Ci odpowiadać:</p>
                <div className="flex flex-wrap gap-2">
                  {["Japandi", "Modern Classic", "Skandynawski", "Boho Premium", "Industrial"].map((s) => (
                    <span key={s} className="font-body text-xs px-3 py-1 rounded-full bg-accent/10 text-accent">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-body text-xs tracking-[0.15em] uppercase text-accent mb-3 block">03b</span>
                <h2 className="font-heading text-xl md:text-2xl text-foreground mb-5">Budżet – jak zaplanować?</h2>
                <p className="font-body text-sm text-muted-foreground mb-4">Koszt wykończenia (bez mebli):</p>
                <div className="space-y-3 mb-6">
                  {[
                    { name: "Standard", range: "1 500–2 500 zł/m²" },
                    { name: "Premium", range: "2 500–4 000 zł/m²" },
                    { name: "Luxury", range: "4 000+ zł/m²" },
                  ].map((c) => (
                    <div key={c.name} className="flex justify-between border-b border-border pb-2">
                      <span className="font-body text-sm text-foreground font-medium">{c.name}</span>
                      <span className="font-body text-sm text-muted-foreground">{c.range}</span>
                    </div>
                  ))}
                </div>
                <p className="font-body text-sm text-foreground/80 mb-2">Przykład: mieszkanie 70m²</p>
                <p className="font-body text-xs text-muted-foreground mb-4">Standard: 105–175 tys. zł &nbsp;|&nbsp; Premium: 175–280 tys. zł</p>
                <div className="flex items-start gap-2 bg-accent/10 rounded-lg p-3">
                  <AlertTriangle size={14} className="text-accent mt-0.5 shrink-0" />
                  <p className="font-body text-xs text-foreground/70">Bufor awaryjny: minimum 15–20% ponad budżet główny</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 7: KOLORY I MATERIAŁY ===== */}
      <section className="overflow-hidden">
        <img src={vizKitchenRattan} alt="Realizacja AN Projekt" className="w-full h-48 md:h-64 object-cover" />
        <div className="section-padding">
          <div className="max-w-[1000px] mx-auto">
            <FadeIn>
              <span className="font-body text-xs tracking-[0.15em] uppercase text-accent mb-3 block">04</span>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Jak dobrać kolory i materiały?</h2>

              <div className="bg-secondary rounded-xl p-5 md:p-6 mb-6">
                <h3 className="font-heading text-base text-foreground mb-3">Zasada 60-30-10</h3>
                <div className="space-y-2 font-body text-sm text-muted-foreground">
                  <p><span className="text-foreground font-medium">60%</span> Kolor dominujący (ściany, podłogi, meble)</p>
                  <p><span className="text-foreground font-medium">30%</span> Kolor uzupełniający (sofa, zasłony)</p>
                  <p><span className="text-foreground font-medium">10%</span> Akcent (poduszki, rośliny, lampy)</p>
                </div>
              </div>

              <p className="font-body text-sm text-foreground/80 mb-3">Zasada 3 faktur: max 3 materiały w 1 pomieszczeniu</p>
              <div className="space-y-2 mb-6 font-body text-sm text-muted-foreground">
                <p>Drewno + tkanina + metal → Modern Classic</p>
                <p>Marmur + biel + rattan → Boho Premium</p>
                <p>Len + biel + drewno jasne → Skandynawski</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="font-body text-xs text-accent">Trendy 2026:</span>
                {["Zieleń butelkowa", "Terakota", "Rattan", "Trawertyn", "Mosiądz szczotkowany"].map((t) => (
                  <span key={t} className="font-body text-xs px-3 py-1 rounded-full bg-accent/10 text-accent">{t}</span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== PAGE 8: CHECKLISTA 27 PYTAŃ ===== */}
      <section className="section-padding bg-secondary">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <span className="font-body text-xs tracking-[0.15em] uppercase text-accent mb-3 block">05</span>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8">Checklista 27 pytań przed remontem</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { title: "Planowanie", items: ["Zakres prac", "Projekt/rzut", "Ściany nośne", "Instalacje", "Priorytety (muszę/chcę)"] },
                { title: "Budżet", items: ["Budżet total", "Bufor 15–20%", "Min. 3 wyceny", "Umowa z wykonawcą", "Co w cenie"] },
                { title: "Materiały", items: ["Styl i kolorystyka", "Moodboard", "Próbniki", "Dostawy", "Nadmiar +10%"] },
                { title: "Wykonawcy", items: ["Harmonogram", "Kolejność prac", "Gdzie mieszkam w trakcie"] },
                { title: "Przed startem", items: ["Wszystkie decyzje podjęte", "Zdjęcia dokumentacyjne", "Kontakt do projektantki"] },
              ].map((block) => (
                <div key={block.title} className="bg-background rounded-xl p-5">
                  <h3 className="font-heading text-sm text-accent mb-3">{block.title}</h3>
                  <ul className="space-y-2">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 font-body text-xs text-foreground/70">
                        <span className="w-3.5 h-3.5 rounded border border-border shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-accent/10 rounded-xl p-5 font-body text-sm">
              <p className="font-heading text-base text-foreground mb-2">Twój wynik:</p>
              <div className="space-y-1 text-foreground/70 text-xs">
                <p><span className="text-accent font-medium">20–27 ✓</span> Jesteś gotowy. Możesz zaczynać.</p>
                <p><span className="text-accent font-medium">15–19 ✓</span> Kilka luk – uzupełnij przed startem.</p>
                <p><span className="text-accent font-medium">&lt; 15</span> → Warto zaplanować z projektantką.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 9: 10 BŁĘDÓW ===== */}
      <section className="section-padding">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <span className="font-body text-xs tracking-[0.15em] uppercase text-accent mb-3 block">06</span>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8">10 najczęstszych błędów</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {[
                "Brak planu przed zakupami",
                "Złe proporcje mebli do przestrzeni",
                "Niedoświetlone wnętrze",
                "Kolorystyczny chaos",
                "Brak miejsca do przechowywania",
                "Ślepe kopiowanie trendów z Instagrama",
                "Urządzanie pod Instagram zamiast pod życie",
                "Oszczędzanie na podłodze i oświetleniu",
                "Za mało gniazdek",
                "Pośpiech przy wyborze wykonawcy",
              ].map((err, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-border last:border-0">
                  <span className="font-heading text-accent text-xs w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-body text-sm text-foreground/80">{err}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 10: REALIZACJA ===== */}
      <section className="overflow-hidden">
        <img src={vizDiningFireplace} alt="Realizacja Złota Harmonia" className="w-full h-56 md:h-80 object-cover" />
        <div className="section-padding bg-secondary">
          <div className="max-w-[1000px] mx-auto">
            <FadeIn>
              <span className="font-body text-xs tracking-[0.15em] uppercase text-accent mb-3 block">07</span>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">Realizacja: Złota Harmonia – Rzeszów</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Metraż", value: "85m²" },
                  { label: "Lokalizacja", value: "Rzeszów" },
                  { label: "Pakiet", value: "Komfortowa" },
                  { label: "Czas", value: "7 tygodni" },
                ].map((d) => (
                  <div key={d.label} className="bg-background rounded-lg p-3 text-center">
                    <p className="font-body text-xs text-muted-foreground">{d.label}</p>
                    <p className="font-heading text-base text-foreground">{d.value}</p>
                  </div>
                ))}
              </div>

              <blockquote className="font-body text-sm text-foreground/70 italic leading-relaxed mb-4 border-l-2 border-accent pl-4">
                „Klientka marzyła o ciepłym, eleganckim wnętrzu z nutą luksusu. Połączyłam ciepłe drewno, złote akcenty i miękkie tkaniny – zachowując pełną funkcjonalność dla 4-osobowej rodziny."
              </blockquote>
              <p className="font-body text-xs text-muted-foreground">Zakres: salon + jadalnia + kuchnia + 2 sypialnie</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== PAGE 11: JAK WYBRAĆ PROJEKTANTA ===== */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <span className="font-body text-xs tracking-[0.15em] uppercase text-accent mb-3 block">08</span>
            <h2 className="font-heading text-2xl md:text-3xl mb-8">Jak wybrać dobrego projektanta?</h2>

            <p className="font-body text-sm text-primary-foreground/70 mb-5">5 pytań, które musisz zadać:</p>
            <div className="space-y-3 mb-8">
              {[
                "Czy masz portfolio podobnych realizacji?",
                "Co dokładnie zawiera wybrany pakiet?",
                "Ile rund poprawek jest w cenie?",
                "Czy przygotowujesz dokumentację dla wykonawców?",
                "Jakie są realistyczne czasy realizacji?",
              ].map((q, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="font-heading text-accent text-xs w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-body text-sm text-primary-foreground/80">{q}</span>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-primary-foreground/10 mb-6" />

            <p className="font-body text-xs tracking-[0.1em] uppercase text-accent mb-4">⚠️ Czerwone flagi – uważaj gdy projektant:</p>
            <div className="space-y-2">
              {[
                "Nie ma realnego portfolio (tylko stocki)",
                "Nie pyta o potrzeby i budżet",
                "Brak jasnej umowy i harmonogramu",
                'Obiecuje projekt „w tydzień" za każdą cenę',
                'Wszystkie ceny „do ustalenia" bez widełek',
              ].map((flag) => (
                <div key={flag} className="flex items-start gap-2 font-body text-sm text-primary-foreground/60">
                  <X size={12} className="text-destructive mt-1 shrink-0" />
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 12: OFERTA ===== */}
      <section className="section-padding">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <span className="font-body text-xs tracking-[0.15em] uppercase text-accent mb-3 block">09</span>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8">Jak mogę Ci pomóc zaprojektować Twoje wnętrze?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              {[
                {
                  name: "Koncepcyjna", price: "120 zł/m²",
                  features: ["Układ funkcjonalny", "3 wizualizacje kluczowych pomieszczeń", "Podstawowe rysunki techniczne"],
                  forWho: "Dla właścicieli szukających dobrego startu",
                },
                {
                  name: "Komfortowa", price: "150 zł/m²",
                  features: ["Wszystko z Koncepcyjnej", "Pełny projekt + 4 wizualizacje", "Wizualizacja 3D 360°", "Dokumentacja techniczna dla wykonawców"],
                  forWho: "Dla osób chcących gotowy projekt do realizacji",
                },
                {
                  name: "Kompleksowa", price: "170 zł/m²",
                  features: ["Wszystko z Komfortowej", "Krótkie wideo wizualne wnętrza", "3 spotkania nadzorujące na budowie"],
                  forWho: "Dla inwestorów premium – projekt od A do Z",
                },
              ].map((pkg, i) => (
                <div key={i} className="bg-secondary rounded-xl p-5 md:p-6 flex flex-col">
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="font-heading text-lg text-foreground">{pkg.name}</h3>
                    <span className="font-heading text-accent text-base">{pkg.price}</span>
                  </div>
                  <ul className="space-y-2 mb-4 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 font-body text-xs text-foreground/70">
                        <Check size={12} className="text-accent mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="font-body text-xs text-muted-foreground italic">{pkg.forWho}</p>
                </div>
              ))}
            </div>

            <p className="font-body text-xs text-muted-foreground text-center">Obszar: Podkarpacie (Krosno, Rzeszów) + Małopolska (Nowy Sącz)</p>
          </FadeIn>
        </div>
      </section>

      {/* ===== PAGE 13: CTA ===== */}
      <section className="relative min-h-[50vh] overflow-hidden flex items-center justify-center">
        <img src={vizBathroomMarble} alt="AN Projekt realizacja" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 text-center px-6 max-w-xl">
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">Gotowa na swoje wymarzone wnętrze?</h2>
          <p className="font-body text-sm text-white/70 mb-6 leading-relaxed">
            Jeśli planujesz remont lub wykończenie mieszkania na Podkarpaciu lub w Małopolsce, napisz do mnie. Pierwsza rozmowa jest bezpłatna i bez zobowiązań.
          </p>
          <div className="w-16 h-px bg-white/30 mx-auto mb-5" />
          <div className="font-body text-xs text-white/50 space-y-1 mb-6">
            <p>📧 anna@anprojekt.com.pl</p>
            <p>📍 Odrzykoń | Podkarpacie</p>
          </div>
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-foreground text-sm tracking-[0.05em] font-body hover:bg-white/90 transition-all duration-300"
          >
            Napisz do Anny <ArrowRight size={14} />
          </Link>
          <p className="font-body text-xs text-white/40 mt-8">© 2026 AN Projekt | Anna Nowak</p>
        </div>
      </section>

      {/* Download/Print bar */}
      <div className="print:hidden bg-secondary section-padding-sm">
        <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="font-body text-sm text-muted-foreground">Chcesz zachować ten przewodnik?</p>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-body hover:bg-accent/90 transition-colors"
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
