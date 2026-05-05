import { useState } from "react";
import { ExternalLink, Play, Disc3, Music, Tv, AlertCircle } from "lucide-react";
import LazyIframe from "@/components/LazyIframe";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/contexts/LangContext";

// Featured w kolejności wskazanej przez zespół: Wataha, Na niby, Ślad.
const musicVideos = [
  { title: "Wataha", album: "Singiel (2020) · hymn Wilków Krosno", youtubeId: "4Rr3xrg18sw", featured: true, embedDisabled: true, desc: "Hymn drużyny Wilki Krosno. Najczęściej oglądany teledysk zespołu." },
  { title: "Na niby", album: "Singiel (2025)", youtubeId: "mTPAc0ICZRw", featured: true, desc: "Najnowszy singiel CIRYAM. Oficjalny teledysk." },
  { title: "Ślad", album: "Zamyślony zapach (2023)", youtubeId: "CtL2mcYmLBM", featured: true, desc: "Singiel z albumu Zamyślony zapach." },
  { title: "W biegu", album: "Singiel (2025)", youtubeId: "gJNSR8-y74A", desc: "Oficjalny teledysk." },
  { title: "Migotanie", album: "Zamyślony zapach (2023)", youtubeId: "FM6Gaqo-wFY", desc: "Oficjalny teledysk." },
  { title: "Zabierz mnie", album: "Singiel (2022)", youtubeId: "ZlyVuxGuC4g", desc: "Oficjalny teledysk." },
  { title: "Noc", album: "Zamyślony zapach (2023)", youtubeId: "iyTQo9v-xNs", desc: "Oficjalny teledysk." },
  { title: "Alone (band version)", album: "Desires (2015)", youtubeId: "41ImTmg7HYE", desc: "Zespołowa wersja utworu z albumu Desires." },
  { title: "Venus (english version)", album: "Desires (2015)", youtubeId: "14QXTwQZ3ts", desc: "Anglojęzyczna wersja utworu Venus." },
  { title: "W Ciszy", album: "Szepty dusz (2004)", youtubeId: "A0sR8SfO_Xc", desc: "Utwór z debiutanckiego albumu." },
];

const albums = [
  { title: "Zamyślony zapach", year: "2023", label: "Lynx Music", tracks: ["Migotanie", "Ślad", "Noc", "Zamyślony zapach", "Obcy"] },
  { title: "Desires", year: "2015", label: "Lynx Music / Inverse", tracks: ["Venus", "Alone", "Desires", "Fire Inside", "Lost"] },
  { title: "Człowiek motyl", year: "2008", label: "Fonografika", tracks: ["Człowiek motyl", "Tylko Ty", "Bez Ciebie", "Cień", "Kropla"] },
  { title: "W sercu kamienia", year: "2006", label: "Metal Mind / TC Music", tracks: ["W sercu kamienia", "Próba", "Świt", "Bez słów", "Droga"] },
  { title: "Szepty dusz", year: "2004", label: "AMS", tracks: ["W Ciszy", "Szepty dusz", "Sen", "Ucieczka", "Droga"] },
];

const Muzyka = () => {
  const { t } = useLang();
  const [activeVideo, setActiveVideo] = useState(musicVideos[0].youtubeId);
  const [showAllVideos, setShowAllVideos] = useState(false);

  const featuredVideos = musicVideos.filter((v) => v.featured);
  const olderVideos = musicVideos.filter((v) => !v.featured);
  const currentVideo = musicVideos.find((v) => v.youtubeId === activeVideo)!;

  return (
    <main className="bg-background pt-28 md:pt-32">
      {/* Hero section with featured video */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
        <FadeIn>
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">{t("music.label")}</p>
          <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-4">{t("music.page.title")}</h1>
          <p className="text-muted-foreground font-body text-sm mb-12 max-w-2xl leading-relaxed">{t("music.page.desc1")}</p>
        </FadeIn>

        {/* Main video player + playlist sidebar */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 mb-6">
            {/* Main player */}
            <div>
              <div className="aspect-video rounded-xl overflow-hidden border border-border bg-card">
                {currentVideo.embedDisabled ? (
                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block w-full h-full group"
                    aria-label={`${t("video.unavailable.cta")} – ${currentVideo.title}`}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${activeVideo}/maxresdefault.jpg`}
                      alt={currentVideo.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${activeVideo}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-background/50 flex flex-col items-center justify-center gap-3 transition-colors group-hover:bg-background/40">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                        <Play size={28} className="text-accent-foreground fill-accent-foreground ml-1" />
                      </div>
                      <span className="font-heading text-xs md:text-sm tracking-[0.15em] uppercase text-foreground">
                        {t("video.unavailable.cta")}
                      </span>
                    </div>
                  </a>
                ) : (
                  <LazyIframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${activeVideo}?autoplay=0`}
                    title={`CIRYAM – ${currentVideo.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    fallbackHeight="100%"
                  />
                )}
              </div>
              <div className="mt-4">
                <h2 className="font-heading text-2xl text-foreground">{currentVideo.title}</h2>
                {currentVideo.album && (
                  <span className="font-body text-xs text-muted-foreground">{currentVideo.album}</span>
                )}
                <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">{currentVideo.desc}</p>
                {currentVideo.embedDisabled && (
                  <p className="flex items-center gap-1.5 mt-2 font-body text-xs text-accent/80">
                    <AlertCircle size={12} /> {t("video.unavailable.note")}
                  </p>
                )}
              </div>
            </div>

            {/* Playlist sidebar */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="font-heading text-xs tracking-[0.15em] uppercase text-accent flex items-center gap-2">
                  <Tv size={14} /> Teledyski
                </h3>
              </div>
              <div className="max-h-[400px] lg:max-h-[calc(100%-48px)] overflow-y-auto">
                {musicVideos.map((video, i) => (
                  <button
                    key={video.youtubeId}
                    onClick={() => setActiveVideo(video.youtubeId)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/10 ${
                      activeVideo === video.youtubeId ? "bg-accent/15 border-l-2 border-accent" : "border-l-2 border-transparent"
                    }`}
                  >
                    <div className="relative w-24 shrink-0 rounded overflow-hidden bg-background">
                      <div className="aspect-video">
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {activeVideo === video.youtubeId && (
                          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                            <Play size={16} className="text-accent fill-accent" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className={`font-heading text-sm truncate ${activeVideo === video.youtubeId ? "text-accent" : "text-foreground"}`}>
                        {video.title}
                      </p>
                      {video.album && (
                        <p className="font-body text-xs text-muted-foreground truncate">{video.album}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* SoundCloud full discography */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-2">
              <Music size={20} className="text-accent" />
              <h2 className="font-heading text-3xl md:text-4xl text-foreground">Słuchaj online</h2>
            </div>
            <p className="text-muted-foreground font-body text-sm mb-8 max-w-xl">{t("music.page.desc2")}</p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="bg-card border border-border rounded-xl p-4 md:p-6">
              <LazyIframe
                width="100%"
                height="450"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ciryam/sets/ciryam&color=%23d4a017&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
                title="SoundCloud CIRYAM"
                fallbackHeight="450px"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Discography timeline */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-2">
              <Disc3 size={20} className="text-accent" />
              <h2 className="font-heading text-3xl md:text-4xl text-foreground">Dyskografia</h2>
            </div>
            <p className="text-muted-foreground font-body text-sm mb-10">Pięć albumów, 25 lat na scenie.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album, i) => (
              <FadeIn key={album.title} delay={100 + i * 100}>
                <div className="group bg-card border border-border rounded-xl p-6 hover:border-accent/40 transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl text-accent/60">{album.year}</span>
                  </div>
                  <h3 className="font-heading text-xl text-foreground mb-4 group-hover:text-accent transition-colors">
                    {album.title}
                  </h3>
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">{album.label}</p>
                  <ol className="space-y-1.5">
                    {album.tracks.map((track, j) => (
                      <li key={track} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                        <span className="text-xs text-accent/50 w-4 text-right">{j + 1}</span>
                        {track}
                      </li>
                    ))}
                  </ol>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8 text-center">{t("music.platforms")}</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "SoundCloud", url: "https://soundcloud.com/ciryam" },
                { name: "YouTube", url: "https://www.youtube.com/user/Ciryam/" },
                { name: "Facebook", url: "https://www.facebook.com/CIRYAM/" },
                { name: "Instagram", url: "https://www.instagram.com/ciryam__official/" },
                { name: "Vimeo", url: "https://vimeo.com/ciryam" },
              ].map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-heading text-sm tracking-[0.1em] uppercase hover:border-accent hover:text-accent transition-colors"
                >
                  <ExternalLink size={14} /> {platform.name}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SEO */}
      <section className="py-16">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="border-t border-border pt-10">
              <h2 className="font-heading text-2xl text-foreground mb-4">{t("music.seo.title")}</h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{t("music.seo.p1")}</p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{t("music.seo.p2")}</p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{t("music.seo.p3")}</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Muzyka;
