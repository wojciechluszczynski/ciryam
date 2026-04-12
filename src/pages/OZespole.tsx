import { useState } from "react";
import { Instagram, Facebook, Youtube, Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimatedCounter from "@/components/AnimatedCounter";
import ciryamBand from "@/assets/ciryam-band.jpg";

// Gallery imports — Promo 2024
import promo2024_1 from "@/assets/gallery-promo2024-1.jpg";
import promo2024_2 from "@/assets/gallery-promo2024-2.jpg";

// Gallery imports — Promo 2022
import promo2022_1 from "@/assets/gallery-promo2022-1.jpg";
import promo2022_2 from "@/assets/gallery-promo2022-2.jpg";
import promo2022_3 from "@/assets/gallery-promo2022-3.jpg";
import promo2022_4 from "@/assets/gallery-promo2022-4.jpg";

// Gallery imports — Promo 2017
import promo2017_1 from "@/assets/gallery-promo2017-1.jpg";
import promo2017_2 from "@/assets/gallery-promo2017-2.jpg";
import promo2017_3 from "@/assets/gallery-promo2017-3.jpg";
import promo2017_4 from "@/assets/gallery-promo2017-4.jpg";

// Gallery imports — Live
import livePelczyce1 from "@/assets/gallery-live-pelczyce-1.jpg";
import livePelczyce2 from "@/assets/gallery-live-pelczyce-2.jpg";
import livePelczyce3 from "@/assets/gallery-live-pelczyce-3.jpg";
import liveZascianek1 from "@/assets/gallery-live-zascianek-1.jpg";
import livePrzeworsk1 from "@/assets/gallery-live-przeworsk-1.jpg";
import liveSanok1 from "@/assets/gallery-live-sanok-1.jpg";

const VimeoIcon = ({ size = 28 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 7.5c-.1 2.1-1.6 5-4.4 8.7-2.9 3.8-5.4 5.8-7.4 5.8-1.2 0-2.3-1.2-3.2-3.5l-1.7-6.5c-.6-2.3-1.3-3.5-2-3.5-.2 0-.7.3-1.5.9L.5 8.3c1-.8 1.9-1.7 2.8-2.5 1.3-1.1 2.2-1.7 2.9-1.8 1.5-.1 2.4 0.9 2.8 3.1.4 2.4.7 3.8.9 4.4.5 2.2 1 3.3 1.7 3.3.5 0 1.2-.7 2.1-2.2.9-1.5 1.4-2.6 1.5-3.3.1-1.2-.3-1.8-1.4-1.8-.5 0-1 .1-1.5.3 1-3.3 2.9-4.9 5.7-4.8 2.1 0 3.1 1.4 3 4.3z"/></svg>
);

type Album = {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  photos: { src: string; alt: string; credit?: string }[];
};

const albums: Album[] = [
  {
    id: "promo2024",
    title: "Sesja 2024",
    subtitle: "Najnowsze zdjęcia promocyjne",
    cover: promo2024_1,
    photos: [
      { src: promo2024_1, alt: "CIRYAM sesja 2024" },
      { src: promo2024_2, alt: "CIRYAM sesja 2024" },
    ],
  },
  {
    id: "promo2022",
    title: "Sesja 2022",
    subtitle: "fot. Janusz Rechziegel",
    cover: promo2022_1,
    photos: [
      { src: promo2022_1, alt: "CIRYAM sesja 2022", credit: "fot. Janusz Rechziegel" },
      { src: promo2022_2, alt: "CIRYAM sesja 2022", credit: "fot. Janusz Rechziegel" },
      { src: promo2022_3, alt: "CIRYAM sesja 2022", credit: "fot. Janusz Rechziegel" },
      { src: promo2022_4, alt: "CIRYAM sesja 2022", credit: "fot. Janusz Rechziegel" },
    ],
  },
  {
    id: "promo2017",
    title: "Sesja 2017",
    subtitle: "fot. Zawada Film",
    cover: promo2017_1,
    photos: [
      { src: promo2017_1, alt: "CIRYAM sesja 2017", credit: "fot. Zawada Film" },
      { src: promo2017_2, alt: "CIRYAM sesja 2017", credit: "fot. Zawada Film" },
      { src: promo2017_3, alt: "CIRYAM sesja 2017", credit: "fot. Zawada Film" },
      { src: promo2017_4, alt: "CIRYAM sesja 2017", credit: "fot. Zawada Film" },
    ],
  },
  {
    id: "live",
    title: "Na żywo",
    subtitle: "Koncerty i festiwale",
    cover: livePelczyce1,
    photos: [
      { src: livePelczyce1, alt: "Pełczyce 2023", credit: "fot. Anna Gołąwska" },
      { src: livePelczyce2, alt: "Pełczyce 2023", credit: "fot. Anna Gołąwska" },
      { src: livePelczyce3, alt: "Pełczyce 2023", credit: "fot. Anna Gołąwska" },
      { src: liveZascianek1, alt: "Zaścianek Kraków 2024", credit: "fot. MusicAlert" },
      { src: livePrzeworsk1, alt: "Dni Przeworska 2018" },
      { src: liveSanok1, alt: "Sanok – Radio Biwak 2018", credit: "fot. Tomasz Sowa" },
    ],
  },
];

const milestones = [
  { value: "25", label: "Lat na scenie" },
  { value: "5", label: "Albumów" },
  { value: "400+", label: "Koncertów" },
  { value: "65", label: "Nagranych utworów" },
];

const members = [
  { name: "Monika Węgrzyn", role: "wokal, autorka tekstów", bio: "Wokalistka o niepowtarzalnej barwie głosu i charyzmie scenicznej. W tekstach łączy emocję, doświadczenie i subtelną obserwację świata." },
  { name: "Robert Węgrzyn", role: "gitary, lider, autor tekstów", bio: "Założyciel CIRYAM. Z pasji twórca muzyki, gitarzysta i menedżer zespołu. Aktywny recenzent sceny muzycznej." },
  { name: "Kuba Czubik", role: "gitara solowa, elektronika", bio: "Gitarzysta solowy łączący technikę, ekspresję i nowoczesne brzmienie. Pasjonat montażu teledysków oraz budowy elektroniki muzycznej." },
  { name: "Jacek Rola", role: "bas", bio: "Basista odpowiadający za puls zespołu. Pasjonat fotografii i długich wypraw rowerowych." },
];

const OZespole = () => {
  const [openAlbum, setOpenAlbum] = useState<Album | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIdx(null);

  const currentPhotos = openAlbum?.photos ?? [];

  return (
    <main className="bg-background pt-28 md:pt-32">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
        <FadeIn>
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">O zespole</p>
          <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-12">CIRYAM</h1>
        </FadeIn>

        {/* Hero + story — compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16">
          <FadeIn>
            <img src={ciryamBand} alt="CIRYAM zespół" className="w-full aspect-[4/5] md:aspect-[3/4] object-cover object-[center_15%] md:object-[center_20%] rounded-xl" />
          </FadeIn>
          <FadeIn delay={150}>
            <div className="flex flex-col justify-center">
              <h2 className="font-heading text-3xl text-foreground mb-6">Gdzie wszystko się zaczęło</h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                Rok 1999. Robert Węgrzyn powołuje do życia CIRYAM w Krośnie. Z pasji, determinacji i potrzeby tworzenia muzyki, która porusza i zostawia ślad.
              </p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                5 albumów, setki koncertów i 25 lat na scenie — zespół łączy rock, pop, alternatywę i subtelną elektronikę.
              </p>
              {/* Inline stats */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {milestones.map((s, i) => (
                  <AnimatedCounter key={s.label} value={s.value} label={s.label} delay={i * 200} />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ====== PHOTO ALBUMS GRID ====== */}
        <FadeIn delay={200}>
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Camera size={24} className="text-accent" />
              <h2 className="font-heading text-3xl text-foreground">Galeria</h2>
            </div>

            {!openAlbum ? (
              /* Album covers grid */
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {albums.map((album) => (
                  <button
                    key={album.id}
                    onClick={() => setOpenAlbum(album)}
                    className="group relative overflow-hidden rounded-xl border border-border aspect-square text-left"
                  >
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-heading text-sm text-white mb-0.5">{album.title}</h3>
                      <p className="text-white/50 text-[10px] font-body">{album.subtitle}</p>
                      <p className="text-accent text-[10px] font-heading mt-1">{album.photos.length} zdjęć</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              /* Open album — thumbnail grid */
              <div>
                <button
                  onClick={() => setOpenAlbum(null)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-heading text-xs uppercase tracking-[0.15em] mb-6"
                >
                  <ChevronLeft size={14} />
                  Wróć do albumów
                </button>
                <h3 className="font-heading text-xl text-foreground mb-1">{openAlbum.title}</h3>
                <p className="text-muted-foreground text-xs font-body mb-6">{openAlbum.subtitle}</p>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {openAlbum.photos.map((photo, idx) => (
                    <button
                      key={photo.src}
                      onClick={() => setLightboxIdx(idx)}
                      className="group relative overflow-hidden rounded-lg border border-border aspect-square"
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        </FadeIn>

        {/* Lightbox */}
        {lightboxIdx !== null && openAlbum && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-5 right-5 text-white/60 hover:text-white z-50" aria-label="Zamknij">
              <X size={28} />
            </button>
            <img
              src={currentPhotos[lightboxIdx].src}
              alt={currentPhotos[lightboxIdx].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white/80 text-sm font-body">{currentPhotos[lightboxIdx].alt}</p>
              {currentPhotos[lightboxIdx].credit && (
                <p className="text-white/40 text-xs font-body mt-1">{currentPhotos[lightboxIdx].credit}</p>
              )}
              <p className="text-white/30 text-[10px] mt-2">{lightboxIdx + 1} / {currentPhotos.length}</p>
            </div>
            {lightboxIdx > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx - 1); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                aria-label="Poprzednie"
              >
                <ChevronLeft size={36} />
              </button>
            )}
            {lightboxIdx < currentPhotos.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx + 1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                aria-label="Następne"
              >
                <ChevronRight size={36} />
              </button>
            )}
          </div>
        )}

        {/* Members — compact */}
        <FadeIn delay={280}>
          <section className="mb-16">
            <h2 className="font-heading text-3xl text-foreground mb-6">Skład</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {members.map((m) => (
                <article key={m.name} className="bg-card border border-border rounded-xl p-4">
                  <h3 className="font-heading text-base text-foreground mb-0.5">{m.name}</h3>
                  <p className="text-accent font-body text-[10px] uppercase tracking-[0.12em] mb-2">{m.role}</p>
                  <p className="text-muted-foreground font-body text-xs leading-relaxed">{m.bio}</p>
                </article>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Social */}
        <FadeIn delay={320}>
          <div className="text-center">
            <h2 className="font-heading text-2xl text-foreground mb-6">Obserwuj nas</h2>
            <div className="flex justify-center gap-6">
              <a href="https://www.facebook.com/CIRYAM/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook"><Facebook size={28} /></a>
              <a href="https://www.instagram.com/ciryam__official/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram"><Instagram size={28} /></a>
              <a href="https://www.youtube.com/user/Ciryam/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="YouTube"><Youtube size={28} /></a>
              <a href="https://vimeo.com/ciryam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Vimeo"><VimeoIcon size={28} /></a>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
};

export default OZespole;
