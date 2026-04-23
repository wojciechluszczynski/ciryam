import { useState } from "react";
import { Instagram, Facebook, Youtube, Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimatedCounter from "@/components/AnimatedCounter";
import ciryamBand2 from "@/assets/ciryam-band-2.jpg";

// Gallery photos hotlinked from ciryam.pl/photos/ — keeps bundle small
const CDN = "https://ciryam.pl/wp-content/uploads";

type Album = {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  photos: { src: string; alt: string; credit?: string }[];
};

const albums: Album[] = [
  {
    id: "pelczyce-2023",
    title: "Pełczyce LIVE",
    subtitle: "08.07.2023 · fot. Anna Gołąwska",
    cover: `${CDN}/2023/07/CIRYAM-PELCZYCE-live-2023-fot.-Anna-Golawska-1-1024x681.jpg`,
    photos: [
      { src: `${CDN}/2023/07/CIRYAM-PELCZYCE-live-2023-fot.-Anna-Golawska-1-1024x681.jpg`, alt: "Pełczyce 2023", credit: "fot. Anna Gołąwska" },
      { src: `${CDN}/2023/07/CIRYAM-PELCZYCE-live-2023-fot.-Anna-Golawska-10-1024x681.jpg`, alt: "Pełczyce 2023", credit: "fot. Anna Gołąwska" },
      { src: `${CDN}/2023/07/CIRYAM-PELCZYCE-live-2023-fot.-Anna-Golawska-12-1024x681.jpg`, alt: "Pełczyce 2023", credit: "fot. Anna Gołąwska" },
      { src: `${CDN}/2023/07/CIRYAM-PELCZYCE-live-2023-fot.-Anna-Golawska-14-1024x681.jpg`, alt: "Pełczyce 2023", credit: "fot. Anna Gołąwska" },
      { src: `${CDN}/2023/07/CIRYAM-PELCZYCE-live-2023-fot.-Anna-Golawska-16-1024x681.jpg`, alt: "Pełczyce 2023", credit: "fot. Anna Gołąwska" },
      { src: `${CDN}/2023/07/CIRYAM-PELCZYCE-live-2023-fot.-Anna-Golawska-28-1024x681.jpg`, alt: "Pełczyce 2023", credit: "fot. Anna Gołąwska" },
    ],
  },
  {
    id: "krosno-2023",
    title: "Krosno Rynek LIVE",
    subtitle: "29.04.2023",
    cover: `${CDN}/2023/05/344350890_201867759278138_578596957207410017_n-1024x683.jpg`,
    photos: [
      { src: `${CDN}/2023/05/342360773_6095073090568926_2438339978019560464_n.jpg`, alt: "Krosno Rynek 2023" },
      { src: `${CDN}/2023/05/344350890_201867759278138_578596957207410017_n-1024x683.jpg`, alt: "Krosno Rynek 2023" },
      { src: `${CDN}/2023/05/344425171_565243625642811_5489452231673568715_n.jpg`, alt: "Krosno Rynek 2023" },
      { src: `${CDN}/2023/05/344534727_6294098423981304_7486265852815097774_n.jpg`, alt: "Krosno Rynek 2023" },
      { src: `${CDN}/2023/05/344535840_753221593212278_7501286721120741963_n.jpg`, alt: "Krosno Rynek 2023" },
      { src: `${CDN}/2023/05/344561430_255338100394617_4280723588358049895_n.jpg`, alt: "Krosno Rynek 2023" },
    ],
  },
  {
    id: "brzozow-2022",
    title: "Brzozów LIVE",
    subtitle: "27.08.2022",
    cover: `${CDN}/2022/09/DSC8225-1024x683.jpeg`,
    photos: [
      { src: `${CDN}/2022/09/DSC8199.jpeg`, alt: "Brzozów 2022" },
      { src: `${CDN}/2022/09/DSC8225.jpeg`, alt: "Brzozów 2022" },
      { src: `${CDN}/2022/09/DSC8235.jpeg`, alt: "Brzozów 2022" },
      { src: `${CDN}/2022/09/DSC8248.jpeg`, alt: "Brzozów 2022" },
      { src: `${CDN}/2022/09/DSC8287.jpeg`, alt: "Brzozów 2022" },
      { src: `${CDN}/2022/09/DSC8307.jpeg`, alt: "Brzozów 2022" },
    ],
  },
  {
    id: "zespol-2022",
    title: "Sesja zespołu 2022",
    subtitle: "fot. Janusz Rechziegel",
    cover: `${CDN}/2022/03/C09_ppa-720x1024.jpg`,
    photos: [
      { src: `${CDN}/2022/03/C03_ppa-683x1024.jpg`, alt: "CIRYAM sesja 2022", credit: "fot. Janusz Rechziegel" },
      { src: `${CDN}/2022/03/C04_ppa-683x1024.jpg`, alt: "CIRYAM sesja 2022", credit: "fot. Janusz Rechziegel" },
      { src: `${CDN}/2022/03/C06_ppa-683x1024.jpg`, alt: "CIRYAM sesja 2022", credit: "fot. Janusz Rechziegel" },
      { src: `${CDN}/2022/03/C07_ppa-653x1024.jpg`, alt: "CIRYAM sesja 2022", credit: "fot. Janusz Rechziegel" },
      { src: `${CDN}/2022/03/C08_ppa-2-720x1024.jpg`, alt: "CIRYAM sesja 2022", credit: "fot. Janusz Rechziegel" },
      { src: `${CDN}/2022/03/C09_ppa-720x1024.jpg`, alt: "CIRYAM sesja 2022", credit: "fot. Janusz Rechziegel" },
    ],
  },
  {
    id: "sanok-2018",
    title: "Radio Biwak Sanok",
    subtitle: "01.09.2018 · fot. Tomasz Sowa",
    cover: `${CDN}/2022/03/fot-tomasz-sowa-16.jpg`,
    photos: [
      { src: `${CDN}/2022/03/fot-tomasz-sowa-1.jpg`, alt: "Sanok Radio Biwak 2018", credit: "fot. Tomasz Sowa" },
      { src: `${CDN}/2022/03/fot-tomasz-sowa-10.jpg`, alt: "Sanok Radio Biwak 2018", credit: "fot. Tomasz Sowa" },
      { src: `${CDN}/2022/03/fot-tomasz-sowa-15.jpg`, alt: "Sanok Radio Biwak 2018", credit: "fot. Tomasz Sowa" },
      { src: `${CDN}/2022/03/fot-tomasz-sowa-16.jpg`, alt: "Sanok Radio Biwak 2018", credit: "fot. Tomasz Sowa" },
      { src: `${CDN}/2022/03/fot-tomasz-sowa-18.jpg`, alt: "Sanok Radio Biwak 2018", credit: "fot. Tomasz Sowa" },
      { src: `${CDN}/2022/03/fot-tomasz-sowa-22.jpg`, alt: "Sanok Radio Biwak 2018", credit: "fot. Tomasz Sowa" },
    ],
  },
  {
    id: "przeworsk-2018",
    title: "Dni Przeworska",
    subtitle: "07.07.2018 · 625-lecie nadania praw miejskich",
    cover: `${CDN}/2022/03/ciryam-live-dni-przeworska-2018-001.jpg`,
    photos: [
      { src: `${CDN}/2022/03/ciryam-live-dni-przeworska-2018-001.jpg`, alt: "Dni Przeworska 2018" },
      { src: `${CDN}/2022/03/ciryam-live-dni-przeworska-2018-003.jpg`, alt: "Dni Przeworska 2018" },
      { src: `${CDN}/2022/03/ciryam-live-dni-przeworska-2018-005.jpg`, alt: "Dni Przeworska 2018" },
      { src: `${CDN}/2022/03/ciryam-live-dni-przeworska-2018-008.jpg`, alt: "Dni Przeworska 2018" },
      { src: `${CDN}/2022/03/ciryam-live-dni-przeworska-2018-011.jpg`, alt: "Dni Przeworska 2018" },
      { src: `${CDN}/2022/03/ciryam-live-dni-przeworska-2018-014.jpg`, alt: "Dni Przeworska 2018" },
    ],
  },
  {
    id: "sesja-2017",
    title: "Sesja zespołu 2017",
    subtitle: "12.2017 · fot. Zawada Film",
    cover: `${CDN}/2022/03/ciryam-2017-fot-zawada_film-1.jpg`,
    photos: [
      { src: `${CDN}/2022/03/ciryam-2017-fot-zawada_film-1.jpg`, alt: "CIRYAM sesja 2017", credit: "fot. Zawada Film" },
      { src: `${CDN}/2022/03/ciryam-2017-fot-zawada_film-3.jpg`, alt: "CIRYAM sesja 2017", credit: "fot. Zawada Film" },
      { src: `${CDN}/2022/03/ciryam-2017-fot-zawada_film-5.jpg`, alt: "CIRYAM sesja 2017", credit: "fot. Zawada Film" },
      { src: `${CDN}/2022/03/ciryam-2017-fot-zawada_film-8.jpg`, alt: "CIRYAM sesja 2017", credit: "fot. Zawada Film" },
      { src: `${CDN}/2022/03/ciryam-2017-fot-zawada_film-13.jpg`, alt: "CIRYAM sesja 2017", credit: "fot. Zawada Film" },
      { src: `${CDN}/2022/03/ciryam-2017-fot-zawada_film-19.jpg`, alt: "CIRYAM sesja 2017", credit: "fot. Zawada Film" },
    ],
  },
  {
    id: "chorzow-2017",
    title: "Chorzów LIVE — klub Leśniczówka",
    subtitle: "03.11.2017 · fot. Marwa & Grzegorz Galuba",
    cover: `${CDN}/2022/03/ciryam-lesniczowka_2017_fot_25.jpg`,
    photos: [
      { src: `${CDN}/2022/03/ciryam-lesniczowka_2017_fot_05.jpg`, alt: "Chorzów Leśniczówka 2017", credit: "fot. Marwa & Grzegorz Galuba" },
      { src: `${CDN}/2022/03/ciryam-lesniczowka_2017_fot_10.jpg`, alt: "Chorzów Leśniczówka 2017", credit: "fot. Marwa & Grzegorz Galuba" },
      { src: `${CDN}/2022/03/ciryam-lesniczowka_2017_fot_15.jpg`, alt: "Chorzów Leśniczówka 2017", credit: "fot. Marwa & Grzegorz Galuba" },
      { src: `${CDN}/2022/03/ciryam-lesniczowka_2017_fot_20.jpg`, alt: "Chorzów Leśniczówka 2017", credit: "fot. Marwa & Grzegorz Galuba" },
      { src: `${CDN}/2022/03/ciryam-lesniczowka_2017_fot_25.jpg`, alt: "Chorzów Leśniczówka 2017", credit: "fot. Marwa & Grzegorz Galuba" },
      { src: `${CDN}/2022/03/ciryam-lesniczowka_2017_fot_30.jpg`, alt: "Chorzów Leśniczówka 2017", credit: "fot. Marwa & Grzegorz Galuba" },
    ],
  },
  {
    id: "krakow-ira-2017",
    title: "Kraków klub Studio — XXX-lecie IRA",
    subtitle: "22.10.2017 · fot. Katarzyna Koncewicz",
    cover: `${CDN}/2022/03/ciryam-klub-studio-22-10-2017fot-k-koncewicz-xxx-lecie-ira-29.jpg`,
    photos: [
      { src: `${CDN}/2022/03/ciryam-klub-studio-22-10-2017fot-k-koncewicz-xxx-lecie-ira-1.jpg`, alt: "Kraków IRA 2017", credit: "fot. Katarzyna Koncewicz" },
      { src: `${CDN}/2022/03/ciryam-klub-studio-22-10-2017fot-k-koncewicz-xxx-lecie-ira-17.jpg`, alt: "Kraków IRA 2017", credit: "fot. Katarzyna Koncewicz" },
      { src: `${CDN}/2022/03/ciryam-klub-studio-22-10-2017fot-k-koncewicz-xxx-lecie-ira-19.jpg`, alt: "Kraków IRA 2017", credit: "fot. Katarzyna Koncewicz" },
      { src: `${CDN}/2022/03/ciryam-klub-studio-22-10-2017fot-k-koncewicz-xxx-lecie-ira-22.jpg`, alt: "Kraków IRA 2017", credit: "fot. Katarzyna Koncewicz" },
      { src: `${CDN}/2022/03/ciryam-klub-studio-22-10-2017fot-k-koncewicz-xxx-lecie-ira-25.jpg`, alt: "Kraków IRA 2017", credit: "fot. Katarzyna Koncewicz" },
      { src: `${CDN}/2022/03/ciryam-klub-studio-22-10-2017fot-k-koncewicz-xxx-lecie-ira-29.jpg`, alt: "Kraków IRA 2017", credit: "fot. Katarzyna Koncewicz" },
    ],
  },
  {
    id: "krosno-matelowski-2017",
    title: "Dni Krosna — Rynek",
    subtitle: "03.06.2017 · fot. Paweł Matelowski",
    cover: `${CDN}/2022/03/ciryam_dni_krosna_pawel_matelowski_31.jpg`,
    photos: [
      { src: `${CDN}/2022/03/ciryam_dni_krosna_pawel_matelowski_05.jpg`, alt: "Dni Krosna 2017", credit: "fot. Paweł Matelowski" },
      { src: `${CDN}/2022/03/ciryam_dni_krosna_pawel_matelowski_10.jpg`, alt: "Dni Krosna 2017", credit: "fot. Paweł Matelowski" },
      { src: `${CDN}/2022/03/ciryam_dni_krosna_pawel_matelowski_15.jpg`, alt: "Dni Krosna 2017", credit: "fot. Paweł Matelowski" },
      { src: `${CDN}/2022/03/ciryam_dni_krosna_pawel_matelowski_20.jpg`, alt: "Dni Krosna 2017", credit: "fot. Paweł Matelowski" },
      { src: `${CDN}/2022/03/ciryam_dni_krosna_pawel_matelowski_25.jpg`, alt: "Dni Krosna 2017", credit: "fot. Paweł Matelowski" },
      { src: `${CDN}/2022/03/ciryam_dni_krosna_pawel_matelowski_31.jpg`, alt: "Dni Krosna 2017", credit: "fot. Paweł Matelowski" },
    ],
  },
  {
    id: "krosno-sokolowska-2017",
    title: "Dni Krosna — publiczność",
    subtitle: "03.06.2017 · fot. Martyna Sokołowska",
    cover: `${CDN}/2022/03/ciryam_dni_krosna_martyna_sokolowska_99.jpg`,
    photos: [
      { src: `${CDN}/2022/03/ciryam_dni_krosna_martyna_sokolowska_10.jpg`, alt: "Dni Krosna 2017", credit: "fot. Martyna Sokołowska" },
      { src: `${CDN}/2022/03/ciryam_dni_krosna_martyna_sokolowska_25.jpg`, alt: "Dni Krosna 2017", credit: "fot. Martyna Sokołowska" },
      { src: `${CDN}/2022/03/ciryam_dni_krosna_martyna_sokolowska_40.jpg`, alt: "Dni Krosna 2017", credit: "fot. Martyna Sokołowska" },
      { src: `${CDN}/2022/03/ciryam_dni_krosna_martyna_sokolowska_55.jpg`, alt: "Dni Krosna 2017", credit: "fot. Martyna Sokołowska" },
      { src: `${CDN}/2022/03/ciryam_dni_krosna_martyna_sokolowska_75.jpg`, alt: "Dni Krosna 2017", credit: "fot. Martyna Sokołowska" },
      { src: `${CDN}/2022/03/ciryam_dni_krosna_martyna_sokolowska_99.jpg`, alt: "Dni Krosna 2017", credit: "fot. Martyna Sokołowska" },
    ],
  },
  {
    id: "sanok-2017",
    title: "Sanocki Weekend Muzyczny — Rynek",
    subtitle: "30.04.2017 · fot. Tomasz Sowa",
    cover: `${CDN}/2022/03/ciryam_sanok_tomasz_sowa_17.jpg`,
    photos: [
      { src: `${CDN}/2022/03/ciryam_sanok_tomasz_sowa_03.jpg`, alt: "Sanok 2017", credit: "fot. Tomasz Sowa" },
      { src: `${CDN}/2022/03/ciryam_sanok_tomasz_sowa_07.jpg`, alt: "Sanok 2017", credit: "fot. Tomasz Sowa" },
      { src: `${CDN}/2022/03/ciryam_sanok_tomasz_sowa_11.jpg`, alt: "Sanok 2017", credit: "fot. Tomasz Sowa" },
      { src: `${CDN}/2022/03/ciryam_sanok_tomasz_sowa_14.jpg`, alt: "Sanok 2017", credit: "fot. Tomasz Sowa" },
      { src: `${CDN}/2022/03/ciryam_sanok_tomasz_sowa_17.jpg`, alt: "Sanok 2017", credit: "fot. Tomasz Sowa" },
      { src: `${CDN}/2022/03/ciryam_sanok_tomasz_sowa_21.jpg`, alt: "Sanok 2017", credit: "fot. Tomasz Sowa" },
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
  { name: "Monika Węgrzyn", role: "wokal, teksty", bio: "Wokalistka i autorka tekstów. Głos zespołu od pierwszego albumu." },
  { name: "Robert Węgrzyn", role: "gitary, lider", bio: "Założyciel zespołu. Gitarzysta, kompozytor, menedżer." },
  { name: "Kuba Czubik", role: "gitara solowa, elektronika", bio: "Gitarzysta i realizator elektroniki." },
  { name: "Jacek Rola", role: "bas", bio: "Basista zespołu." },
  { name: "Damian Jurek", role: "perkusja", bio: "Perkusista. Gra w składzie od albumu Człowiek motyl (2008)." },
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
            <img src={ciryamBand2} alt="CIRYAM zespół" className="w-full aspect-[4/5] md:aspect-[3/4] object-cover object-[center_15%] md:object-[center_20%] rounded-xl" />
          </FadeIn>
          <FadeIn delay={150}>
            <div className="flex flex-col justify-center">
              <h2 className="font-heading text-3xl text-foreground mb-6">Gdzie wszystko się zaczęło</h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                Rok 1999. Robert Węgrzyn zakłada CIRYAM. Od początku grają autorski rock - taki, którego chce się słuchać głośno.
              </p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Pięć albumów, ponad 250 koncertów i 25 lat na scenie. Mocne riffy, melodyjne refreny, polski tekst.
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
                      referrerPolicy="no-referrer"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
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
                        referrerPolicy="no-referrer"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
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
              <a href="https://www.tiktok.com/@ciryam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.18V12a4.83 4.83 0 01-3.77-1.55V6.69h3.77z" /></svg>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
};

export default OZespole;
