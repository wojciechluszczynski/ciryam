import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
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
    title: "Zlota Harmonia",
    type: "Mieszkanie",
    area: "85 m\u00B2",
    location: "Rzeszow",
    desc: "Cieple, przytulne wnetrze z przemyslanym ukladem i eleganckimi detalami.",
    image: vizLivingBeige,
    href: "/zlota-harmonia",
  },
  {
    title: "Czarna Perla",
    type: "Dom jednorodzinny",
    area: "180 m\u00B2",
    location: "Podkarpacie",
    desc: "Nowoczesny dom z odwaznymi materialami i duza iloscia naturalnego swiatla.",
    image: vizKitchenRattan,
    href: "/czarna-perla",
  },
];

const allProjects = [
  { title: "Zlota Harmonia", type: "Mieszkanie", area: 85, location: "Rzeszow", image: vizLivingBeige, href: "/zlota-harmonia" },
  { title: "Czarna Perla", type: "Dom", area: 180, location: "Podkarpacie", image: vizKitchenRattan, href: "/czarna-perla" },
  { title: "Bambusowa Oaza", type: "Salon", area: 65, location: "Malopolska", image: vizDiningFireplace, href: "/bambusowa-oaza" },
  { title: "Marmurowa Lazienka", type: "Lazienka", area: 12, location: "Krosno", image: vizBathroomMarble, href: "/marmurowa-lazienka" },
  { title: "Ciemna Sypialnia", type: "Sypialnia", area: 20, location: "Rzeszow", image: vizBedroomDark, href: "/ciemna-sypialnia" },
  { title: "Mural Sypialnia", type: "Sypialnia", area: 18, location: "Nowy Sacz", image: vizBedroomMural, href: "/mural-sypialnia" },
  { title: "Marmurowa Garderoba", type: "Garderoba", area: 8, location: "Podkarpacie", image: vizClosetMarble, href: "/marmurowa-garderoba" },
  { title: "Detale Ceramiczne", type: "Kuchnia", area: 25, location: "Krosno", image: vizDetailCeramics, href: "/detale-ceramiczne" },
];

const sizeFilters = [
  { label: "Wszystkie", min: 0, max: 999 },
  { label: "do 30 m\u00B2", min: 0, max: 30 },
  { label: "30-80 m\u00B2", min: 30, max: 80 },
  { label: "80+ m\u00B2", min: 80, max: 999 },
];

const Realizacje = () => {
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState(0);

  const filtered = allProjects.filter((p) => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const filter = sizeFilters[activeFilter];
    const matchesSize = p.area >= filter.min && p.area < filter.max;
    return matchesSearch && matchesSize;
  });

  return (
    <main>
      {/* Featured hero slider */}
      <section className="relative h-[85vh] min-h-[500px] w-full overflow-hidden">
        {featured.map((p, i) => (
          <div
            key={p.href}
            className={`absolute inset-0 transition-all duration-1000 ${
              i === featuredIdx ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />
          </div>
        ))}
        
        <div className="absolute bottom-12 left-6 md:left-16 lg:left-24 z-10 max-w-lg">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-dark-foreground/70 mb-3">Wyrozniony projekt</p>
          <h1 className="font-heading text-3xl md:text-5xl text-dark-foreground mb-2">{featured[featuredIdx].title}</h1>
          <p className="font-body text-sm text-dark-foreground/80 mb-1">
            {featured[featuredIdx].type} {featured[featuredIdx].area} \u00B7 {featured[featuredIdx].location}
          </p>
          <p className="font-body text-base text-dark-foreground/70 mb-6">{featured[featuredIdx].desc}</p>
          <Link
            to={featured[featuredIdx].href}
            className="px-6 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-body hover:bg-accent/90 transition-colors"
          >
            Zobacz projekt
          </Link>
        </div>

        {/* Slider arrows */}
        <div className="absolute bottom-12 right-6 md:right-16 lg:right-24 flex gap-3">
          <button
            onClick={() => setFeaturedIdx((i) => (i - 1 + featured.length) % featured.length)}
            className="w-10 h-10 rounded-full bg-dark-foreground/20 backdrop-blur-sm flex items-center justify-center text-dark-foreground hover:bg-dark-foreground/30 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setFeaturedIdx((i) => (i + 1) % featured.length)}
            className="w-10 h-10 rounded-full bg-dark-foreground/20 backdrop-blur-sm flex items-center justify-center text-dark-foreground hover:bg-dark-foreground/30 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setFeaturedIdx(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === featuredIdx ? "bg-dark-foreground w-6" : "bg-dark-foreground/40"
              }`}
            />
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
                {/* Search */}
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Szukaj..."
                    className="pl-9 pr-4 py-2 rounded-full bg-secondary border border-border text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent w-full sm:w-48"
                  />
                </div>
                
                {/* Size filters */}
                <div className="flex gap-1.5 flex-wrap">
                  {sizeFilters.map((f, i) => (
                    <button
                      key={f.label}
                      onClick={() => setActiveFilter(i)}
                      className={`px-3 py-1.5 rounded-full font-body text-xs transition-all duration-300 ${
                        i === activeFilter
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-foreground hover:bg-accent/10"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p, i) => (
              <FadeIn key={p.href} delay={i * 60}>
                <Link to={p.href} className="group block">
                  <div className="overflow-hidden rounded-lg mb-3">
                    <img
                      src={p.image}
                      alt={`${p.title} projekt wnetrz`}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-heading text-base text-foreground mb-0.5">{p.title}</h3>
                  <p className="text-muted-foreground font-body text-xs">
                    {p.type} {p.area} m\u00B2 \u00B7 {p.location}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground font-body text-base py-12">
              Brak realizacji pasujacych do wyszukiwania.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-primary-foreground mb-4">
              Chcesz zobaczyc, jak moge pomoc z Twoim wnetrzem?
            </h2>
            <p className="text-primary-foreground/70 font-body text-base mb-8">
              Napisz do mnie. Chetnie porozmawiam o Twoim projekcie.
            </p>
            <Link
              to="/kontakt"
              className="px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300"
            >
              Umow spotkanie
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Realizacje;
