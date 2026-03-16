import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Calendar, MapPin, ExternalLink, ShoppingBag, Music, Mic2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";

import ciryamBand from "@/assets/ciryam-band.jpg";
import ciryamBand2 from "@/assets/ciryam-band-2.jpg";
import ciryamLive from "@/assets/ciryam-live.jpg";
import merchTshirt from "@/assets/merch-tshirt.jpg";
import merchCd from "@/assets/merch-cd.jpg";
import merchPoster from "@/assets/merch-poster.jpg";

const heroSlides = [ciryamBand, ciryamBand2, ciryamLive];

const upcomingConcerts = [
  { date: "2026-04-12", city: "Kraków", venue: "Zaścianek", ticketUrl: "#" },
  { date: "2026-04-26", city: "Warszawa", venue: "Hydrozagadka", ticketUrl: "#" },
  { date: "2026-05-10", city: "Wrocław", venue: "Firlej", ticketUrl: "#" },
  { date: "2026-05-24", city: "Gdańsk", venue: "Drizzly Grizzly", ticketUrl: "#" },
  { date: "2026-06-14", city: "Rzeszów", venue: "Vinyl Music Club", ticketUrl: "#" },
];

const shopItems = [
  { name: "Koszulka CIRYAM Logo", price: "89 zł", image: merchTshirt },
  { name: "Płyta CD \"Dices\"", price: "49 zł", image: merchCd },
  { name: "Plakat koncertowy", price: "39 zł", image: merchPoster },
];

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return {
    day: d.getDate().toString().padStart(2, "0"),
    month: d.toLocaleDateString("pl-PL", { month: "short" }).toUpperCase(),
  };
};

const stats = [
  { value: "50+", label: "Koncertów rocznie" },
  { value: "10K+", label: "Fanów online" },
  { value: "6", label: "Lat na scenie" },
  { value: "3", label: "Wydane albumy" },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
            <img src={slide} alt={`CIRYAM zespół rockowy na żywo ${i + 1}`} className="w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-20 md:pb-28">
          <p className="font-body text-xs md:text-sm text-accent mb-3 tracking-[0.3em] uppercase animate-fade-in-up">
            Polski zespół rockowy
          </p>
          <h1 className="font-heading text-6xl sm:text-7xl md:text-[9rem] lg:text-[12rem] text-foreground mb-4 animate-fade-in-up leading-none">
            CIRYAM
          </h1>
          <p className="font-body text-sm md:text-base text-muted-foreground mb-8 max-w-lg animate-fade-in-up-delay leading-relaxed">
            Autorski rock z Podkarpacia. Ciężkie riffy, melodyjne refreny i scena, która nie zostawia obojętnym. Gramy w całej Polsce.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up-delay-2">
            <a
              href="https://soundcloud.com/ciryam"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full bg-accent text-accent-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-accent/80 transition-all duration-300 flex items-center gap-2"
            >
              <Play size={16} /> Posłuchaj
            </a>
            <Link
              to="/koncerty"
              className="px-8 py-3 rounded-full border border-foreground/30 text-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-foreground/10 transition-all duration-300 flex items-center gap-2"
            >
              <Calendar size={16} /> Koncerty
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-accent w-8" : "bg-foreground/30 w-2"}`} aria-label={`Slajd ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* STATS MARQUEE */}
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

      {/* MUZYKA */}
      <section className="bg-secondary section-padding" id="muzyka">
        <div className="max-w-[900px] mx-auto text-center">
          <FadeIn>
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">Dyskografia</p>
            <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-6">Posłuchaj naszej muzyki</h2>
            <p className="text-muted-foreground font-body text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              CIRYAM łączy energię klasycznego hard rocka z nowoczesną produkcją. Nasze utwory to mieszanka ciężkich riffów gitarowych, 
              dynamicznych rytmów i melodii, które zostają w głowie. Od debiutanckiego albumu po najnowszy materiał – 
              każda płyta to krok naprzód w naszej muzycznej podróży.
            </p>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="bg-card border border-border rounded-xl p-4 md:p-6 overflow-hidden">
              <iframe
                width="100%"
                height="300"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ciryam/sets/ciryam&color=%23d4a017&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
                title="SoundCloud CIRYAM - polski zespół rockowy"
                className="rounded-lg"
              />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                { name: "Spotify", url: "https://open.spotify.com/artist/ciryam" },
                { name: "SoundCloud", url: "https://soundcloud.com/ciryam" },
                { name: "YouTube", url: "https://www.youtube.com/@ciryam" },
              ].map((p) => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-border text-foreground font-body text-sm hover:border-accent hover:text-accent transition-colors">
                  <ExternalLink size={14} /> {p.name}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* KONCERTY */}
      <section className="bg-background section-padding" id="koncerty">
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">Na żywo</p>
              <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-4">Najbliższe koncerty</h2>
              <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto leading-relaxed">
                Każdy koncert CIRYAM to pełne emocji przeżycie. Sprawdź, kiedy gramy w Twoim mieście i zdobądź bilet, 
                zanim się wyprzedadzą. Gramy od Rzeszowa po Gdańsk – scena jest naszym domem.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-0">
            {upcomingConcerts.map((concert, i) => {
              const { day, month } = formatDate(concert.date);
              return (
                <FadeIn key={i} delay={i * 60}>
                  <div className="group border-t border-border py-5 flex items-center gap-4 md:gap-8 hover:bg-secondary/50 px-4 rounded-lg transition-colors">
                    <div className="text-center shrink-0 w-16">
                      <span className="font-heading text-3xl md:text-4xl text-foreground block leading-none">{day}</span>
                      <span className="font-heading text-xs tracking-[0.15em] text-accent">{month}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-xl md:text-2xl text-foreground">{concert.city}</h3>
                      <p className="flex items-center gap-1.5 text-muted-foreground font-body text-sm">
                        <MapPin size={12} /> {concert.venue}
                      </p>
                    </div>
                    <a
                      href={concert.ticketUrl}
                      className="shrink-0 px-5 py-2 rounded-full bg-accent text-accent-foreground font-heading text-xs tracking-[0.1em] uppercase hover:bg-accent/80 transition-colors opacity-70 group-hover:opacity-100"
                    >
                      Bilety
                    </a>
                  </div>
                </FadeIn>
              );
            })}
            <div className="border-t border-border" />
          </div>

          <FadeIn delay={300}>
            <div className="text-center mt-10">
              <Link
                to="/koncerty"
                className="inline-flex items-center gap-2 font-heading text-sm tracking-[0.1em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-accent hover:text-accent transition-colors"
              >
                Wszystkie koncerty <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* GALERIA */}
      <section className="section-padding bg-secondary" id="galeria">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">Galeria</p>
              <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-4">Na scenie i poza nią</h2>
              <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto">
                Zdjęcia z koncertów, sesji i backstage'u. Tak wygląda CIRYAM od kulis.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-xl">
                <img src={ciryamBand} alt="CIRYAM – sesja promocyjna zespołu rockowego" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span className="font-heading text-sm tracking-[0.15em] uppercase text-accent">Sesja promo 2024</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl aspect-square">
                <img src={ciryamLive} alt="CIRYAM – koncert na żywo w klubie Zaścianek" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span className="font-heading text-xs tracking-[0.15em] uppercase text-accent">Live @ Zaścianek</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl aspect-square">
                <img src={ciryamBand2} alt="CIRYAM – zdjęcie zespołu backstage" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span className="font-heading text-xs tracking-[0.15em] uppercase text-accent">Backstage</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* O ZESPOLE */}
      <section className="bg-background section-padding" id="o-zespole">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <FadeIn>
            <div className="relative overflow-hidden rounded-xl">
              <img src={ciryamBand} alt="CIRYAM – polski zespół rockowy z Podkarpacia" className="w-full aspect-[4/5] object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div>
              <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">O zespole</p>
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Poznaj CIRYAM</h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                CIRYAM to polski zespół rockowy z Podkarpacia, który od ponad 6 lat podbija scenę muzyczną w Polsce.
                Łączymy energię klasycznego hard rocka z nowoczesnym brzmieniem – od ciężkich riffów gitarowych 
                po emocjonalne, zapadające w pamięć refreny.
              </p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                Na naszym koncie ponad 50 koncertów rocznie, trzy wydane albumy i tysiące fanów w całej Polsce.
                Każdy występ traktujemy jak niezapomniane wydarzenie – na scenie zostawiamy wszystko.
              </p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8">
                Gramy na festiwalach, w klubach muzycznych i na imprezach prywatnych. 
                Nasze teksty opowiadają o życiu bez filtrów – o emocjach, marzeniach i codziennych zmaganiach.
              </p>
              <Link
                to="/o-zespole"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-accent text-accent font-heading text-sm tracking-[0.1em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Poznaj nas bliżej <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FEATURES / USP */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-4">Dlaczego CIRYAM?</h2>
              <p className="text-muted-foreground font-body text-sm max-w-xl mx-auto">
                Nie gramy podróbek – tworzymy własną muzykę, która porusza i elektryzuje.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Music, title: "Autorskie utwory", desc: "100% oryginalnej muzyki. Każdy riff, tekst i melodia to nasze dzieło – autentyczny rock bez kompromisów." },
              { icon: Mic2, title: "Energia na żywo", desc: "Ponad 50 koncertów rocznie w całej Polsce. Nasza scena to miejsce, gdzie rock żyje – głośno, intensywnie, prawdziwie." },
              { icon: ShoppingBag, title: "Oficjalny merch", desc: "Koszulki, bluzy, płyty winylowe i CD. Noś CIRYAM z dumą – każdy zakup wspiera niezależną muzykę." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 100}>
                <div className="bg-card border border-border rounded-xl p-6 md:p-8 hover:border-accent/30 transition-colors group">
                  <item.icon size={28} className="text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading text-xl text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SKLEP */}
      <section className="bg-background section-padding" id="sklep">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">Merch</p>
              <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-4">Sklep CIRYAM</h2>
              <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto">
                Oficjalny merchandising zespołu. Koszulki, płyty, plakaty i więcej – wesprzyj niezależną muzykę!
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {shopItems.map((item, i) => (
              <FadeIn key={item.name} delay={i * 100}>
                <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-colors">
                  <div className="aspect-square overflow-hidden">
                    <img src={item.image} alt={`${item.name} – oficjalny merch CIRYAM`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-base text-foreground mb-1">{item.name}</h3>
                    <p className="text-accent font-heading text-xl">{item.price}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={300}>
            <div className="text-center mt-10">
              <Link
                to="/sklep"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent text-accent-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-accent/80 transition-all duration-300"
              >
                <ShoppingBag size={16} /> Odwiedź sklep
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA / BOOKING */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn>
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">Booking</p>
            <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-6">
              Zaproś CIRYAM na swój event
            </h2>
            <p className="text-muted-foreground font-body text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Gramy na festiwalach rockowych, w klubach muzycznych, na imprezach firmowych i prywatnych. 
              Napisz do nas – przygotujemy ofertę dopasowaną do Twojego wydarzenia.
            </p>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent text-accent-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-accent/80 transition-all duration-300"
            >
              Kontakt / Booking <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Index;
