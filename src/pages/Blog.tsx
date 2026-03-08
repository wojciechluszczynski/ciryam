import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizDiningFireplace from "@/assets/viz-dining-fireplace.png";
import vizBathroomMarble from "@/assets/viz-bathroom-marble.png";
import vizBedroomDark from "@/assets/viz-bedroom-dark.png";
import vizBedroomMural from "@/assets/viz-bedroom-mural.png";
import vizClosetMarble from "@/assets/viz-closet-marble.png";
import vizDetailCeramics from "@/assets/viz-detail-ceramics.png";
import heroKitchen from "@/assets/hero-kitchen.png";

const categories = ["Wszystkie", "Trendy", "Porady", "Realizacje", "Materiały", "Proces"];

const blogPosts = [
  {
    title: "5 błędów przy planowaniu kuchni, których łatwo uniknąć",
    excerpt: "Kuchnia to serce domu. Sprawdź, jakich pułapek unikać, żeby Twoja kuchnia była funkcjonalna i piękna na lata.",
    image: vizKitchenRattan,
    category: "Porady",
    date: "28 lutego 2026",
    readTime: "5 min",
    slug: "bledy-planowanie-kuchni",
    featured: true,
  },
  {
    title: "Trendy wnętrzarskie 2026: co zostaje, a co odchodzi?",
    excerpt: "Przegląd najważniejszych trendów w projektowaniu wnętrz na 2026 rok. Minimalizm, ciepłe materiały i odwaga w kolorze.",
    image: vizLivingBeige,
    category: "Trendy",
    date: "20 lutego 2026",
    readTime: "7 min",
    slug: "trendy-wnetrzarskie-2026",
  },
  {
    title: "Jak wybrać idealne płytki do łazienki?",
    excerpt: "Rodzaje płytek, formaty, kolory i układy. Praktyczny przewodnik po wyborze płytek do łazienki, który ułatwi decyzję.",
    image: vizBathroomMarble,
    category: "Materiały",
    date: "15 lutego 2026",
    readTime: "6 min",
    slug: "jak-wybrac-plytki-lazienka",
  },
  {
    title: "Mały metraż, duże możliwości: jak urządzić kawalerkę?",
    excerpt: "Sprytne rozwiązania, wielofunkcyjne meble i optyczne triki, które sprawią, że małe mieszkanie będzie wyglądać na większe.",
    image: vizBedroomMural,
    category: "Porady",
    date: "8 lutego 2026",
    readTime: "5 min",
    slug: "maly-metraz-kawalerka",
  },
  {
    title: "Realizacja: Złota Harmonia w Rzeszowie",
    excerpt: "Zaglądamy za kulisy projektu mieszkania w Rzeszowie. 85 m² ciepłych, przytulnych wnętrz z przemyślanym układem.",
    image: vizDiningFireplace,
    category: "Realizacje",
    date: "1 lutego 2026",
    readTime: "4 min",
    slug: "realizacja-zlota-harmonia",
  },
  {
    title: "Jak przebiega współpraca z projektantem wnętrz?",
    excerpt: "Krok po kroku: od pierwszej rozmowy po odbiór kluczy. Dowiedz się, czego możesz się spodziewać podczas współpracy.",
    image: heroKitchen,
    category: "Proces",
    date: "25 stycznia 2026",
    readTime: "6 min",
    slug: "wspolpraca-z-projektantem",
  },
  {
    title: "Ciemne wnętrza: odwaga czy ryzyko?",
    excerpt: "Ciemne kolory we wnętrzach mogą być eleganckie i przytulne. Podpowiadam, jak je stosować, żeby nie przytłoczyć przestrzeni.",
    image: vizBedroomDark,
    category: "Trendy",
    date: "18 stycznia 2026",
    readTime: "5 min",
    slug: "ciemne-wnetrza",
  },
  {
    title: "Garderoba marzeń: od projektu do realizacji",
    excerpt: "Jak zaprojektować garderobę, która pomieści wszystko i będzie wyglądać jak z magazynu? Praktyczne porady i inspiracje.",
    image: vizClosetMarble,
    category: "Porady",
    date: "10 stycznia 2026",
    readTime: "4 min",
    slug: "garderoba-marzen",
  },
  {
    title: "Ceramika we wnętrzach: nie tylko płytki",
    excerpt: "Ceramika to materiał o ogromnym potencjale dekoracyjnym. Odkryj, jak wykorzystać ją w nowoczesnych wnętrzach.",
    image: vizDetailCeramics,
    category: "Materiały",
    date: "3 stycznia 2026",
    readTime: "5 min",
    slug: "ceramika-we-wnetrzach",
  },
];

const Blog = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Wszystkie");

  const filtered = blogPosts.filter((post) => {
    const matchesSearch = !search || post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "Wszystkie" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = filtered.filter((p) => !p.featured || activeCategory !== "Wszystkie" || search);

  return (
    <main>
      {/* Hero */}
      <section className="bg-background pt-28 md:pt-36 pb-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h1 className="font-heading text-3xl md:text-5xl text-foreground mb-4">Blog</h1>
            <p className="text-muted-foreground font-body text-base md:text-lg max-w-lg">
              Porady, inspiracje i kulisy projektowania wnętrz. Dowiedz się więcej o procesie, materiałach i trendach.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured post */}
      {featuredPost && activeCategory === "Wszystkie" && !search && (
        <section className="bg-background px-6 md:px-12 lg:px-20 pb-12">
          <div className="max-w-[1200px] mx-auto">
            <FadeIn>
              <Link to={`/blog/${featuredPost.slug}`} className="group block">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-secondary rounded-xl overflow-hidden">
                  <div className="overflow-hidden">
                    <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full min-h-[250px] object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-6 md:p-10 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent font-body text-xs mb-4 w-fit">{featuredPost.category}</span>
                    <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3 group-hover:text-accent transition-colors">{featuredPost.title}</h2>
                    <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-muted-foreground font-body text-xs">
                      <span>{featuredPost.date}</span>
                      <span>·</span>
                      <span>{featuredPost.readTime} czytania</span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="bg-background px-6 md:px-12 lg:px-20 pb-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full font-body text-xs transition-all duration-300 ${
                      activeCategory === cat ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground hover:bg-accent/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Szukaj artykułów..."
                  className="pl-9 pr-4 py-2 rounded-full bg-secondary border border-border text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent w-full sm:w-56"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-background section-padding-sm">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeCategory === "Wszystkie" && !search ? regularPosts.length > 0 ? regularPosts : filtered : filtered).map((post, i) => (
              <FadeIn key={post.slug} delay={i * 60}>
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="overflow-hidden rounded-xl mb-4">
                    <img src={post.image} alt={post.title} className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-body text-xs">{post.category}</span>
                    <span className="text-muted-foreground font-body text-xs">{post.readTime} czytania</span>
                  </div>
                  <h3 className="font-heading text-lg text-foreground mb-2 group-hover:text-accent transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-3">{post.excerpt}</p>
                  <span className="font-body text-xs text-muted-foreground">{post.date}</span>
                </Link>
              </FadeIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground font-body text-base py-12">Brak artykułów pasujących do wyszukiwania.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-primary-foreground mb-4">Chcesz być na bieżąco?</h2>
            <p className="text-primary-foreground/70 font-body text-base mb-8">Obserwuj mnie na Instagramie, gdzie dzielę się inspiracjami i zakulisowymi ujęciami z projektów.</p>
            <a href="https://www.instagram.com/an_projekt/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300">
              Obserwuj na Instagramie <ArrowRight size={14} />
            </a>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Blog;
