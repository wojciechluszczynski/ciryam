import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizBathroomMarble from "@/assets/viz-bathroom-marble.png";
import vizClosetMarble from "@/assets/viz-closet-marble.png";
import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizBedroomMural from "@/assets/viz-bedroom-mural.png";
import vizDiningFireplace from "@/assets/viz-dining-fireplace.png";
import vizBedroomDark from "@/assets/viz-bedroom-dark.png";
import vizDetailCeramics from "@/assets/viz-detail-ceramics.png";

const projectsData: Record<string, {
  title: string;
  type: string;
  area: string;
  location: string;
  pkg: string;
  time: string;
  challenge: string;
  story: string;
  scope: string[];
  result: string;
  images: string[];
}> = {
  "zlota-harmonia": {
    title: "Złota Harmonia",
    type: "Mieszkanie",
    area: "85 m²",
    location: "Rzeszów",
    pkg: "Komfortowa",
    time: "6 tygodni",
    challenge: "Małe pomieszczenia wymagały sprytnych rozwiązań, żeby zmieścić wszystko, czego potrzebuje czteroosobowa rodzina.",
    story: "Klientom zależało na wnętrzu, które będzie ciepłe i przytulne, ale jednocześnie uporządkowane i łatwe do utrzymania. Zaproponowałam spokojną paletę barw, miękkie tkaniny i przemyślany układ, który daje dużo miejsca do przechowywania.",
    scope: ["Układ funkcjonalny", "Projekt koncepcyjny", "4 wizualizacje 3D", "Wizualizacja 360°", "Dokumentacja techniczna"],
    result: "Funkcjonalne, ciepłe wnętrze, w którym każdy ma swoją przestrzeń – a jednocześnie wspólna strefa dzienna zachęca do wspólnego spędzania czasu.",
    images: [vizLivingBeige, vizBathroomMarble, vizClosetMarble, vizDetailCeramics],
  },
  "czarna-perla": {
    title: "Czarna Perła",
    type: "Dom jednorodzinny",
    area: "180 m²",
    location: "Podkarpacie",
    pkg: "Kompleks",
    time: "8 tygodni",
    challenge: "Duża otwarta przestrzeń i odważna wizja inwestora – trzeba było zbalansować nowoczesne materiały z ciepłem domowego wnętrza.",
    story: "Projekt obejmował cały dom od salonu po łazienkę na piętrze. Klient chciał ciemne, odważne materiały, ale bez efektu chłodu. Połączyłam czarny kamień z drewnem, ciepłym oświetleniem i dużą ilością zieleni.",
    scope: ["Pełny projekt koncepcyjny", "Wizualizacje 3D i 360°", "Wideo wizualne", "Dokumentacja techniczna", "3 spotkania nadzorujące", "Wspólne zakupy materiałów"],
    result: "Nowoczesny dom, który robi wrażenie, ale w którym dobrze się mieszka na co dzień.",
    images: [vizKitchenRattan, vizBedroomDark, vizBedroomMural, vizBathroomMarble],
  },
  "bambusowa-oaza": {
    title: "Bambusowa Oaza",
    type: "Salon z jadalnią",
    area: "65 m²",
    location: "Małopolska",
    pkg: "Koncepcyjna",
    time: "3 tygodnie",
    challenge: "Klienci chcieli wnętrze inspirowane naturą, ale nie wiedzieli, jak to przełożyć na konkretne rozwiązania.",
    story: "Zaproponowałam naturalny rattan, jasne drewno i spokojną paletę beżów i zieleni. Kominek stał się centralnym punktem, a duże okna z widokiem na ogród – integralną częścią projektu.",
    scope: ["Układ funkcjonalny", "Moodboard i propozycja stylistyczna", "3 wizualizacje 3D", "Podstawowe rysunki techniczne"],
    result: "Spójna koncepcja, która dała klientom jasny punkt wyjścia do dalszej realizacji.",
    images: [vizDiningFireplace, vizLivingBeige, vizDetailCeramics, vizClosetMarble],
  },
  "marmurowa-lazienka": {
    title: "Marmurowa Łazienka",
    type: "Łazienka",
    area: "12 m²",
    location: "Krosno",
    pkg: "Komfortowa",
    time: "3 tygodnie",
    challenge: "Niewielka przestrzeń, w której trzeba było pomieścić wannę, prysznic i dużo miejsca do przechowywania.",
    story: "Klientka marzyła o łazience w stylu hotelowym – jasny marmur, złote detale i dużo światła. Zaproponowałam duże płyty imitujące marmur, podświetlane lustro i sprytne schowki za lustrzanymi frontami.",
    scope: ["Projekt koncepcyjny", "2 wizualizacje 3D", "Dokumentacja techniczna", "Dobór materiałów"],
    result: "Elegancka łazienka, która wygląda na znacznie większą niż jest w rzeczywistości.",
    images: [vizBathroomMarble, vizDetailCeramics, vizClosetMarble, vizLivingBeige],
  },
  "ciemna-sypialnia": {
    title: "Ciemna Sypialnia",
    type: "Sypialnia",
    area: "20 m²",
    location: "Rzeszów",
    pkg: "Koncepcyjna",
    time: "2 tygodnie",
    challenge: "Klient chciał ciemną, przytulną sypialnię, ale bez efektu przygnębiającego wnętrza.",
    story: "Postawiłam na głębokie, ciepłe odcienie grafitu i brązu, miękkie tkaniny i punktowe oświetlenie. Drewniane panele za łóżkiem dodały ciepła, a duże okno z lnianą zasłoną zapewnia naturalny dostęp światła w ciągu dnia.",
    scope: ["Moodboard", "2 wizualizacje 3D", "Propozycja kolorystyczna", "Lista materiałów"],
    result: "Klimatyczna sypialnia, w której dobrze się odpoczywa – ciemna, ale ciepła i przytulna.",
    images: [vizBedroomDark, vizBedroomMural, vizLivingBeige, vizKitchenRattan],
  },
  "mural-sypialnia": {
    title: "Mural Sypialnia",
    type: "Sypialnia",
    area: "18 m²",
    location: "Nowy Sącz",
    pkg: "Koncepcyjna",
    time: "2 tygodnie",
    challenge: "Para chciała sypialnię z charakterem – coś więcej niż standardowe, białe ściany.",
    story: "Zaproponowałam delikatny mural z motywem roślinnym na ścianie za łóżkiem. Reszta wnętrza utrzymana w spokojnych beżach i bieli, żeby mural mógł być głównym akcentem. Drewniana podłoga i lniane tkaniny dopełniają całość.",
    scope: ["Moodboard", "2 wizualizacje 3D", "Propozycja muralu", "Dobór tkanin"],
    result: "Sypialnia z duszą – spokojna, ale z wyrazistym elementem, który nadaje charakter.",
    images: [vizBedroomMural, vizBedroomDark, vizDiningFireplace, vizDetailCeramics],
  },
  "marmurowa-garderoba": {
    title: "Marmurowa Garderoba",
    type: "Garderoba",
    area: "8 m²",
    location: "Podkarpacie",
    pkg: "Komfortowa",
    time: "2 tygodnie",
    challenge: "Mała garderoba musiała pomieścić ubrania dwóch osób i wyglądać elegancko.",
    story: "Zaprojektowałam system szaf od podłogi do sufitu z lustrzanymi frontami, które optycznie powiększają przestrzeń. Marmurowa podłoga i złote uchwyty nadają wnętrzu luksusowy charakter.",
    scope: ["Projekt zabudowy", "2 wizualizacje 3D", "Dokumentacja techniczna", "Dobór materiałów"],
    result: "Kompaktowa garderoba, która mieści wszystko i wygląda jak z katalogu.",
    images: [vizClosetMarble, vizBathroomMarble, vizDetailCeramics, vizLivingBeige],
  },
  "detale-ceramiczne": {
    title: "Detale Ceramiczne",
    type: "Kuchnia",
    area: "25 m²",
    location: "Krosno",
    pkg: "Komfortowa",
    time: "4 tygodnie",
    challenge: "Kuchnia otwarta na salon wymagała spójnego połączenia strefy gotowania z wypoczynkową.",
    story: "Ręcznie robiona ceramika na ścianie nad blatem stała się centralnym elementem projektu. Drewniane fronty, kamienny blat i rattanowe dodatki tworzą ciepłą, naturalną atmosferę.",
    scope: ["Układ funkcjonalny", "3 wizualizacje 3D", "Dokumentacja techniczna", "Nadzór nad wykonaniem płytek"],
    result: "Kuchnia, która jest sercem domu – piękna, funkcjonalna i z unikatowym charakterem dzięki ceramice.",
    images: [vizDetailCeramics, vizKitchenRattan, vizDiningFireplace, vizBathroomMarble],
  },
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectsData[slug] : null;
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [selectedImg, setSelectedImg] = useState(0);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(prev => prev !== null ? (prev + 1) % project.images.length : null);
      if (e.key === "ArrowLeft") setLightbox(prev => prev !== null ? (prev - 1 + project.images.length) % project.images.length : null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightbox, project]);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-foreground mb-4">Projekt nie znaleziony</h1>
          <Link to="/realizacje" className="text-accent font-body hover:underline">
            Wróć do realizacji
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src={project.images[0]} alt={`${project.title} – projekt wnętrz ${project.location}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-3xl md:text-5xl text-dark-foreground mb-3">{project.title}</h1>
          <p className="font-body text-sm text-dark-foreground/80 tracking-wide uppercase">
            {project.type} · {project.area} · {project.location}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="bg-background pt-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-[900px] mx-auto">
          <nav className="flex items-center gap-2 text-xs font-body text-muted-foreground">
            <Link to="/" className="hover:text-accent transition-colors">Strona główna</Link>
            <span>/</span>
            <Link to="/realizacje" className="hover:text-accent transition-colors">Realizacje</Link>
            <span>/</span>
            <span className="text-foreground">{project.title}</span>
          </nav>
        </div>
      </section>

      {/* Story & details */}
      <section className="bg-background section-padding">
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 mb-12">
              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">O projekcie</h2>
                <p className="text-muted-foreground font-body text-base leading-relaxed mb-4">{project.story}</p>
                <h3 className="font-heading text-lg text-foreground mb-2 mt-6">Wyzwanie</h3>
                <p className="text-muted-foreground font-body text-base leading-relaxed">{project.challenge}</p>
                <h3 className="font-heading text-lg text-foreground mb-2 mt-6">Efekt</h3>
                <p className="text-muted-foreground font-body text-base leading-relaxed">{project.result}</p>
              </div>
              <div className="md:border-l md:border-border md:pl-8 space-y-5 md:min-w-[200px]">
                {[
                  { label: "Lokalizacja", value: project.location },
                  { label: "Metraż", value: project.area },
                  { label: "Opcja", value: project.pkg },
                  { label: "Czas realizacji", value: project.time },
                ].map((d) => (
                  <div key={d.label}>
                    <p className="text-muted-foreground font-body text-xs tracking-[0.15em] uppercase mb-1">{d.label}</p>
                    <p className="font-heading text-base text-foreground">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Scope */}
          <FadeIn delay={100}>
            <h3 className="font-heading text-lg text-foreground mb-3">Zakres prac</h3>
            <ul className="flex flex-wrap gap-2 mb-12">
              {project.scope.map((s) => (
                <li key={s} className="font-body text-sm text-muted-foreground bg-secondary px-4 py-1.5 rounded-full">{s}</li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Gallery - large single image with thumbnails */}
      <section className="bg-background px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            {/* Main large image */}
            <button onClick={() => setLightbox(selectedImg)} className="w-full group cursor-pointer mb-4">
              <img
                src={project.images[selectedImg]}
                alt={`${project.title} wizualizacja ${selectedImg + 1}`}
                className="w-full aspect-[16/9] object-cover rounded-lg transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </button>
            {/* Thumbnail strip */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${i === selectedImg ? "ring-2 ring-accent opacity-100" : "opacity-60 hover:opacity-90"}`}
                >
                  <img src={img} alt={`Miniatura ${i + 1}`} className="h-20 md:h-24 w-32 md:w-40 object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary section-padding-sm">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">Planujesz podobny projekt?</h2>
            <p className="text-muted-foreground font-body text-base mb-8">
              Napisz do mnie – chętnie porozmawiam o Twoim wnętrzu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt" className="px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300">
                Umów spotkanie
              </Link>
              <Link to="/realizacje" className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-foreground text-foreground text-sm tracking-[0.05em] font-body hover:bg-foreground hover:text-background transition-all duration-300">
                Inne realizacje <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-foreground/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-dark-foreground/80 hover:text-dark-foreground transition-colors z-10" onClick={() => setLightbox(null)}>
            <X size={32} />
          </button>
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-foreground/20 backdrop-blur-sm flex items-center justify-center text-dark-foreground hover:bg-dark-foreground/30 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev !== null ? (prev - 1 + project.images.length) % project.images.length : null); }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-foreground/20 backdrop-blur-sm flex items-center justify-center text-dark-foreground hover:bg-dark-foreground/30 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev !== null ? (prev + 1) % project.images.length : null); }}
          >
            <ChevronRight size={24} />
          </button>
          <img
            src={project.images[lightbox]}
            alt={`${project.title} wizualizacja`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === lightbox ? "bg-dark-foreground w-6" : "bg-dark-foreground/40"}`}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectPage;
