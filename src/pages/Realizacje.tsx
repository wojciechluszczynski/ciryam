import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizDiningFireplace from "@/assets/viz-dining-fireplace.png";
import vizBathroomMarble from "@/assets/viz-bathroom-marble.png";
import vizBedroomDark from "@/assets/viz-bedroom-dark.png";
import vizBedroomMural from "@/assets/viz-bedroom-mural.png";
import vizClosetMarble from "@/assets/viz-closet-marble.png";
import vizDetailCeramics from "@/assets/viz-detail-ceramics.png";

const featured = [
  {
    title: "Złota Harmonia",
    type: "Mieszkanie",
    area: "85 m²",
    location: "Rzeszów",
    desc: "Ciepłe, przytulne wnętrze z przemyślanym układem i eleganckimi detalami.",
    image: vizLivingBeige,
  },
  {
    title: "Czarna Perła",
    type: "Dom jednorodzinny",
    area: "180 m²",
    location: "Podkarpacie",
    desc: "Nowoczesny dom z odważnymi materiałami i dużą ilością naturalnego światła.",
    image: vizKitchenRattan,
  },
  {
    title: "Bambusowa Oaza",
    type: "Salon z jadalnią",
    area: "65 m²",
    location: "Małopolska",
    desc: "Przestrzeń inspirowana naturą, rattan, drewno i spokojne kolory.",
    image: vizDiningFireplace,
  },
];

const allProjects = [
  { title: "Złota Harmonia", type: "Mieszkanie", area: 85, location: "Rzeszów", image: vizLivingBeige, images: [vizLivingBeige, vizKitchenRattan, vizDiningFireplace] },
  { title: "Czarna Perła", type: "Dom", area: 180, location: "Podkarpacie", image: vizKitchenRattan, images: [vizKitchenRattan, vizBathroomMarble, vizBedroomDark] },
  { title: "Bambusowa Oaza", type: "Salon", area: 65, location: "Małopolska", image: vizDiningFireplace, images: [vizDiningFireplace, vizBedroomMural, vizClosetMarble] },
  { title: "Marmurowa Łazienka", type: "Łazienka", area: 12, location: "Krosno", image: vizBathroomMarble, images: [vizBathroomMarble, vizDetailCeramics, vizClosetMarble] },
  { title: "Ciemna Sypialnia", type: "Sypialnia", area: 20, location: "Rzeszów", image: vizBedroomDark, images: [vizBedroomDark, vizBedroomMural, vizLivingBeige] },
  { title: "Mural Sypialnia", type: "Sypialnia", area: 18, location: "Nowy Sącz", image: vizBedroomMural, images: [vizBedroomMural, vizBedroomDark, vizDiningFireplace] },
  { title: "Marmurowa Garderoba", type: "Garderoba", area: 8, location: "Podkarpacie", image: vizClosetMarble, images: [vizClosetMarble, vizBathroomMarble, vizDetailCeramics] },
  { title: "Detale Ceramiczne", type: "Kuchnia", area: 25, location: "Krosno", image: vizDetailCeramics, images: [vizDetailCeramics, vizKitchenRattan, vizDiningFireplace] },
];

const sizeFilters = [
  { label: "Wszystkie", min: 0, max: 999 },
  { label: "do 30 m²", min: 0, max: 30 },
  { label: "30\u201380 m²", min: 30, max: 80 },
  { label: "80+ m²", min: 80, max: 999 },
];

const Realizacje = () => {
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Lightbox state
  const [lightbox, setLightbox] = useState<{ images: string[]; idx: number } | null>(null);

  const navigate = useCallback((dir: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setFeaturedIdx((i) => (i + dir + featured.length) % featured.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(() => navigate(1), 7000);
    return () => clearInterval(timer);
  }, [navigate]);

  // Lightbox keyboard
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(prev => prev ? { ...prev, idx: (prev.idx + 1) % prev.images.length } : null);
      if (e.key === "ArrowLeft") setLightbox(prev => prev ? { ...prev, idx: (prev.idx - 1 + prev.images.length) % prev.images.length } : null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightbox]);

  const filtered = allProjects.filter((p) => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const filter = sizeFilters[activeFilter];
    const matchesSize = p.area >= filter.min && p.area < filter.max;
    return matchesSearch && matchesSize;
  });

  const openLightbox = (project: typeof allProjects[0]) => {
    setLightbox({ images: project.images, idx: 0 });
  };

  return (
    <main>
      {/* Full-screen featured slider */}
      <section className="relative h-screen w-full overflow-hidden">
        {featured.map((p, i) => (
          <div key={i} className={`absolute inset-0 transition-all duration-1000 ${i === featuredIdx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"}`}>
            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
          </div>
        ))}

        <div className="absolute bottom-16 md:bottom-24 left-6 md:left-16 lg:left-24 z-10 max-w-xl">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-dark-foreground/70 mb-3">Wyróżniony projekt</p>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-dark-foreground mb-3">{featured[featuredIdx].title}</h1>
          <p className="font-body text-sm text-dark-foreground/80 mb-1">
            {featured[featuredIdx].type} · {featured[featuredIdx].area} · {featured[featuredIdx].location}
          </p>
          <p className="font-body text-base text-dark-foreground/70 mb-6 max-w-sm">{featured[featuredIdx].desc}</p>
          <Link to="/kontakt" className="px-6 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-body hover:bg-accent/90 transition-colors">
            Zapytaj o projekt
          </Link>
        </div>

        {/* Arrows */}
        <div className="absolute bottom-16 md:bottom-24 right-6 md:right-16 lg:right-24 flex gap-3 z-10">
          <button onClick={() => navigate(-1)} className="w-11 h-11 rounded-full bg-dark-foreground/20 backdrop-blur-sm flex items-center justify-center text-dark-foreground hover:bg-dark-foreground/30 transition-colors">
            <ChevronLeft size={22} />
          </button>
          <button onClick={() => navigate(1)} className="w-11 h-11 rounded-full bg-dark-foreground/20 backdrop-blur-sm flex items-center justify-center text-dark-foreground hover:bg-dark-foreground/30 transition-colors">
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {featured.map((_, i) => (
            <button key={i} onClick={() => setFeaturedIdx(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === featuredIdx ? "bg-dark-foreground w-6" : "bg-dark-foreground/40"}`} />
          ))}
        </div>
      </section>

      {/* All projects grid with filters */}
      <section className="bg-background section-padding">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Wszystkie realizacje</h2>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Szukaj..." className="pl-9 pr-4 py-2 rounded-full bg-secondary border border-border text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent w-full sm:w-48" />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {sizeFilters.map((f, i) => (
                    <button key={f.label} onClick={() => setActiveFilter(i)} className={`px-3 py-1.5 rounded-full font-body text-xs transition-all duration-300 ${i === activeFilter ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground hover:bg-accent/10"}`}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p, i) => (
              <FadeIn key={p.title} delay={i * 60}>
                <button onClick={() => openLightbox(p)} className="group block text-left w-full">
                  <div className="overflow-hidden rounded-lg mb-3">
                    <img src={p.image} alt={`${p.title} projekt wnętrz`} className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                  </div>
                  <h3 className="font-heading text-base text-foreground mb-0.5">{p.title}</h3>
                  <p className="text-muted-foreground font-body text-xs">{p.type} {p.area} m² · {p.location}</p>
                </button>
              </FadeIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground font-body text-base py-12">Brak realizacji pasujących do wyszukiwania.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-primary-foreground mb-4">Chcesz zobaczyć, jak mogę pomóc z Twoim wnętrzem?</h2>
            <p className="text-primary-foreground/70 font-body text-base mb-8">Napisz do mnie. Chętnie porozmawiam o Twoim projekcie.</p>
            <Link to="/kontakt" className="px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300">
              Umów spotkanie
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-foreground/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-dark-foreground/80 hover:text-dark-foreground transition-colors z-10" onClick={() => setLightbox(null)}>
            <X size={32} />
          </button>
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-foreground/20 backdrop-blur-sm flex items-center justify-center text-dark-foreground hover:bg-dark-foreground/30 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev ? { ...prev, idx: (prev.idx - 1 + prev.images.length) % prev.images.length } : null); }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-foreground/20 backdrop-blur-sm flex items-center justify-center text-dark-foreground hover:bg-dark-foreground/30 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev ? { ...prev, idx: (prev.idx + 1) % prev.images.length } : null); }}
          >
            <ChevronRight size={24} />
          </button>
          <img
            src={lightbox.images[lightbox.idx]}
            alt="Wizualizacja projektu"
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {lightbox.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev ? { ...prev, idx: i } : null); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === lightbox.idx ? "bg-dark-foreground w-6" : "bg-dark-foreground/40"}`}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Realizacje;
