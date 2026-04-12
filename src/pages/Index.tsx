import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Calendar, MapPin, ExternalLink, ShoppingBag, Music, Mic2, Sparkles, Loader2, Instagram } from "lucide-react";
import LazyIframe from "@/components/LazyIframe";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/contexts/LangContext";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { supabase } from "@/integrations/supabase/client";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

import ciryamBand from "@/assets/ciryam-band.jpg";
import ciryamBand2 from "@/assets/ciryam-band-2.jpg";
import ciryamBand3 from "@/assets/ciryam-band-3.jpg";
import ciryamBand4 from "@/assets/ciryam-band-4.jpg";
import ciryamBand5 from "@/assets/ciryam-band-5.jpg";
import ciryamBand8 from "@/assets/ciryam-band-8.jpg";
import ciryamLive from "@/assets/ciryam-live.jpg";
import ciryamLogotype from "@/assets/ciryam-logotype-white.png";

const heroSlides = [ciryamBand2, ciryamBand3, ciryamBand4, ciryamBand5];

const upcomingConcerts = [
  { date: "2025-05-23", city: "Kraków", venue: "Garage Pub", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-05-24", city: "Sanok", venue: "Piknik charytatywny", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-05-30", city: "Krosno", venue: "Stadion przy Legionów 1", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-06-07", city: "Toruń", venue: "Festiwal Rocka Progresywnego", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-06-21", city: "Przegaliny Duże", venue: "Zlot motocyklowy", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-07-05", city: "Polańczyk", venue: "Tawerna u Michała", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-07-26", city: "Wólka Podleśna", venue: "Impreza", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-07-27", city: "Polańczyk", venue: "Tawerna u Michała", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-08-14", city: "Chorkówka", venue: "Biesiada Karpacka", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-08-22", city: "Kolbuszowa", venue: "Festiwal Muzyczny Spinacz", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-08-23", city: "Tyniec", venue: "Przystań Pod Lutym Turem", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-08-29", city: "Leżajsk", venue: "Podkarpacki Festiwal Tatuażu", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-08-30", city: "Brzesko", venue: "Rynek – Beczka Rym", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-09-05", city: "Warszawa", venue: "VooDoo Club – SCREAMFEST", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-09-13", city: "Jarosław", venue: "Decybel Music Club", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-09-19", city: "Bytom", venue: "Klub Gotyk", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-10-10", city: "Wrocław", venue: "Klub Liverpool + Totentanz", event: "Ciryam – trasa 25-lecia" },
  { date: "2025-12-27", city: "Krosno", venue: "RCKP – Finał 25-lecia", event: "Ciryam – trasa 25-lecia" },
];

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return {
    day: d.getDate().toString().padStart(2, "0"),
    month: d.toLocaleDateString("pl-PL", { month: "short" }).toUpperCase(),
  };
};

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, lang } = useLang();
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  const [shopProducts, setShopProducts] = useState<ShopifyProduct[]>([]);
  const [aiRecs, setAiRecs] = useState<string[]>([]);
  const [recsLoading, setRecsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 50 });
        if (data?.data?.products?.edges) setShopProducts(data.data.products.edges);
      } catch (e) { console.error(e); }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (shopProducts.length > 0 && aiRecs.length === 0) {
      setRecsLoading(true);
      const randomProduct = shopProducts[Math.floor(Math.random() * shopProducts.length)];
      supabase.functions.invoke('recommend-products', {
        body: {
          products: shopProducts.map(p => ({ title: p.node.title, type: p.node.productType, price: parseFloat(p.node.priceRange.minVariantPrice.amount).toFixed(0) })),
          currentProductTitle: randomProduct.node.title,
          lang,
        },
      }).then(({ data }) => {
        if (data?.suggestions) setAiRecs(data.suggestions);
      }).catch(console.error).finally(() => setRecsLoading(false));
    }
  }, [shopProducts]);

  const featuredProducts = useMemo(() => {
    if (aiRecs.length > 0) {
      const matched = shopProducts.filter(p =>
        aiRecs.some(rec => p.node.title.toLowerCase().includes(rec.toLowerCase()) || rec.toLowerCase().includes(p.node.title.toLowerCase()))
      );
      if (matched.length >= 3) return matched.slice(0, 3);
    }
    return shopProducts.slice(0, 3);
  }, [shopProducts, aiRecs]);

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({ product, variantId: variant.id, variantTitle: variant.title, price: variant.price, quantity: 1, selectedOptions: variant.selectedOptions || [] });
    toast.success(lang === "pl" ? "Dodano do koszyka!" : "Added to cart!", { position: "top-center" });
  };

  const stats = [
    { value: "25", label: t("stats.years") },
    { value: "5", label: t("stats.albums") },
    { value: "400", label: t("stats.concerts") },
    { value: "65", label: t("stats.songs") },
    { value: "88 000", label: t("stats.km") },
    { value: "101%", label: t("stats.onstage") },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div key={i} className={`absolute inset-0 transition-all duration-1000 ease-in-out ${i === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}>
            <img src={slide} alt={`CIRYAM rock band live ${i + 1}`} className="w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} width={1400} height={940} fetchPriority={i === 0 ? "high" : "auto"} decoding={i === 0 ? "sync" : "async"} />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/40" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center md:justify-end text-center px-6 pb-0 md:pb-28">
          <p className="font-body text-xs md:text-sm text-accent mb-3 tracking-[0.3em] uppercase animate-fade-in-up">
            {t("hero.subtitle")}
          </p>
          <h1 className="mb-4 animate-fade-in-up leading-none">
            <img src={ciryamLogotype} alt="CIRYAM" className="h-10 sm:h-14 md:h-20 lg:h-26 w-auto mx-auto invert" />
          </h1>
          <p className="font-body text-sm md:text-base text-muted-foreground mb-8 max-w-lg animate-fade-in-up-delay leading-relaxed whitespace-pre-line text-center">
            {t("hero.desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up-delay-2">
            <a href="https://soundcloud.com/ciryam" target="_blank" rel="noopener noreferrer"
              className="px-8 py-3 rounded-full bg-accent text-accent-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-accent/80 transition-all duration-300 flex items-center gap-2">
              <Play size={16} /> {t("hero.listen")}
            </a>
            <Link to="/koncerty"
              className="px-8 py-3 rounded-full border border-foreground/30 text-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-foreground/10 transition-all duration-300 flex items-center gap-2">
              <Calendar size={16} /> {t("hero.concerts")}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-accent w-8" : "bg-foreground/30 w-2"}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-accent py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...stats, ...stats, ...stats].map((stat, i) => (
            <div key={i} className="flex items-center gap-3 mx-8">
              <span className="font-heading text-2xl md:text-3xl text-accent-foreground">{stat.value}</span>
              <span className="font-body text-xs text-accent-foreground/70 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MUSIC */}
      <section className="bg-secondary section-padding" id="muzyka">
        <div className="max-w-[900px] mx-auto text-center">
          <FadeIn>
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">{t("music.label")}</p>
            <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-6">{t("music.title")}</h2>
            <p className="text-muted-foreground font-body text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed whitespace-pre-line">{t("music.desc")}</p>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="bg-card border border-border rounded-xl p-4 md:p-6 overflow-hidden">
              <LazyIframe width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ciryam/sets/ciryam&color=%23ffffff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
                title="SoundCloud CIRYAM" className="rounded-lg" fallbackHeight="300px" />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                { name: "SoundCloud", url: "https://soundcloud.com/ciryam" },
                { name: "YouTube", url: "https://www.youtube.com/user/Ciryam/" },
              ].map((p) => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-border text-foreground font-body text-sm hover:border-accent hover:text-accent transition-colors">
                  <ExternalLink size={14} /> {p.name}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* VIDEO */}
      <section className="bg-background section-padding" id="wideo">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">{t("video.label")}</p>
              <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-4">{t("video.title")}</h2>
              <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto leading-relaxed whitespace-pre-line">{t("video.desc")}</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              { src: "https://www.youtube.com/embed/eEBIo2nJUsM", title: "CIRYAM – Wataha (Wilki Krosno)", youtubeId: "eEBIo2nJUsM" },
              { src: "https://www.youtube.com/embed/iyTQo9v-xNs", title: 'CIRYAM – "Noc" (official video)', youtubeId: "iyTQo9v-xNs" },
            ].map((video, i) => (
              <FadeIn key={i} delay={100 + i * 100}>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="aspect-video">
                    <LazyIframe
                      width="100%" height="100%"
                      src={video.src}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      fallbackHeight="100%"
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="font-heading text-sm text-foreground truncate">{video.title}</span>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-1.5 text-accent font-body text-xs hover:underline"
                    >
                      <ExternalLink size={12} /> YouTube
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONCERTS */}
      <section className="bg-secondary section-padding" id="koncerty">
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">{t("concerts.label")}</p>
              <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-4">{t("concerts.title")}</h2>
              <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto leading-relaxed whitespace-pre-line">{t("concerts.desc")}</p>
            </div>
          </FadeIn>
          <div className="space-y-0">
            {upcomingConcerts.slice(0, 6).map((concert, i) => {
              const { day, month } = formatDate(concert.date);
              return (
                <FadeIn key={i} delay={i * 60}>
                  <div className="group border-t border-border py-4 flex items-center gap-4 md:gap-6 hover:bg-secondary/50 px-4 rounded-lg transition-colors">
                    <div className="text-center shrink-0 w-14">
                      <span className="font-heading text-2xl md:text-3xl text-foreground block leading-none">{day}</span>
                      <span className="font-heading text-[10px] tracking-[0.15em] text-accent">{month}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg md:text-xl text-foreground">{concert.city}</h3>
                      <p className="flex items-center gap-1.5 text-muted-foreground font-body text-sm"><MapPin size={12} /> {concert.venue}</p>
                      {concert.event && <p className="text-accent font-body text-xs mt-0.5">{concert.event}</p>}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
            <div className="border-t border-border" />
          </div>
          <FadeIn delay={300}>
            <div className="text-center mt-10">
              <Link to="/koncerty" className="inline-flex items-center gap-2 font-heading text-sm tracking-[0.1em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-accent hover:text-accent transition-colors">
                {t("concerts.all")} <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* INSTAGRAM FEED */}
      <section className="bg-background section-padding" id="instagram">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4 flex items-center justify-center gap-2">
                <Instagram size={14} /> Instagram
              </p>
              <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-4">Śledź nas na Instagramie</h2>
              <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto">
                Backstage, studio, trasa — codzienność CIRYAM bez filtrów.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[ciryamBand2, ciryamBand3, ciryamBand4, ciryamBand5, ciryamBand8, ciryamLive, ciryamBand, ciryamBand2].map((img, i) => (
                <a
                  key={i}
                  href="https://www.instagram.com/ciryam__official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl aspect-square"
                >
                  <img src={img} alt={`CIRYAM Instagram ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <Instagram size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <a
                href="https://www.instagram.com/ciryam__official/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-accent text-accent font-heading text-sm tracking-[0.1em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Instagram size={16} /> @ciryam__official
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-padding bg-secondary" id="galeria">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">{t("gallery.label")}</p>
              <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-4">{t("gallery.title")}</h2>
              <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto">{t("gallery.desc")}</p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
              {[
                { src: ciryamBand2, alt: "CIRYAM band promo", aspect: "aspect-[3/4]" },
                { src: ciryamBand3, alt: "CIRYAM band session", aspect: "aspect-square" },
                { src: ciryamLive, alt: "CIRYAM live concert", aspect: "aspect-[4/5]" },
                { src: ciryamBand4, alt: "CIRYAM backstage", aspect: "aspect-[3/4]" },
                { src: ciryamBand5, alt: "CIRYAM studio", aspect: "aspect-square" },
                { src: ciryamBand8, alt: "CIRYAM on stage", aspect: "aspect-[4/5]" },
              ].map((img, i) => (
                <div key={i} className={`relative group overflow-hidden rounded-xl break-inside-avoid ${img.aspect}`}>
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-background section-padding" id="o-zespole">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <FadeIn>
            <div className="relative overflow-hidden rounded-xl">
              <img src={ciryamBand2} alt="CIRYAM band" className="w-full aspect-[3/4] object-cover object-[center_20%] bg-background" loading="lazy" width={550} height={733} decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div>
              <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">{t("about.label")}</p>
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">{t("about.title")}</h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4 whitespace-pre-line">{t("about.p1")}</p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4 whitespace-pre-line">{t("about.p2")}</p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8 whitespace-pre-line">{t("about.p3")}</p>
              <Link to="/o-zespole" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-accent text-accent font-heading text-sm tracking-[0.1em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors">
                {t("about.cta")} <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHY CIRYAM */}
      <section className="relative bg-background section-padding overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.06)_0%,transparent_70%)]" />
        <div className="max-w-[1100px] mx-auto relative">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-4">{t("why.title")}</h2>
              <p className="text-muted-foreground font-body text-sm max-w-xl mx-auto">{t("why.desc")}</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/50 rounded-2xl overflow-hidden">
            {[
              { icon: Music, title: t("why.originals"), desc: t("why.originals.desc"), accent: "from-accent/20 to-transparent" },
              { icon: Mic2, title: t("why.energy"), desc: t("why.energy.desc"), accent: "from-accent/10 to-transparent" },
              { icon: ShoppingBag, title: t("why.merch"), desc: t("why.merch.desc"), accent: "from-accent/15 to-transparent" },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 150}>
                <div className="relative bg-card p-8 md:p-10 h-full group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-500">
                      <item.icon size={22} className="text-accent" />
                    </div>
                    <h3 className="font-heading text-lg text-foreground mb-3 tracking-wide">{item.title}</h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn>
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">{t("cta.label")}</p>
            <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-6">{t("cta.title")}</h2>
            <p className="text-muted-foreground font-body text-sm mb-8 max-w-md mx-auto leading-relaxed">{t("cta.desc")}</p>
            <Link to="/kontakt" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent text-accent-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-accent/80 transition-all duration-300">
              {t("cta.button")} <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Index;
