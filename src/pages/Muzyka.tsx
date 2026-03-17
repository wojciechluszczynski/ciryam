import { useState } from "react";
import { ExternalLink, Play, Disc3, Music, Tv } from "lucide-react";
import LazyIframe from "@/components/LazyIframe";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/contexts/LangContext";

const musicVideos = [
  { title: "Na niby", album: "", youtubeId: "mTPAc0ICZRw", featured: true },
  { title: "Ślad", album: "", youtubeId: "CtL2mcYmLBM", featured: true },
  { title: "Zabierz mnie", album: "", youtubeId: "ZlyVuxGuC4g", featured: true },
  { title: "Noc", album: "Zamyślony zapach (2023)", youtubeId: "iyTQo9v-xNs" },
  { title: "Wataha", album: "Hymn Wilków Krosno (2019)", youtubeId: "eEBIo2nJUsM" },
  { title: "Alone – band version", album: "Desires (2017)", youtubeId: "41ImTmg7HYE" },
  { title: "Venus (english version)", album: "Desires (2017)", youtubeId: "14QXTwQZ3ts" },
  { title: "W Ciszy", album: "Szepty dusz (2004)", youtubeId: "A0sR8SfO_Xc" },
];

const albums = [
  { title: "Zamyślony zapach", year: "2023", tracks: ["Noc", "Zamyślony zapach", "Obcy", "Cień", "W drodze"] },
  { title: "Desires", year: "2017", tracks: ["Venus", "Alone", "Desires", "Fire Inside", "Lost"] },
  { title: "Szepty dusz", year: "2004", tracks: ["W Ciszy", "Szepty dusz", "Sen", "Ucieczka", "Droga"] },
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
                <LazyIframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=0`}
                  title={`CIRYAM – ${currentVideo.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  fallbackHeight="100%"
                />
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <h2 className="font-heading text-2xl text-foreground">{currentVideo.title}</h2>
                {currentVideo.album && (
                  <span className="font-body text-xs text-muted-foreground">{currentVideo.album}</span>
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
                    <div className="relative w-20 shrink-0 aspect-video rounded overflow-hidden bg-background">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
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
            <p className="text-muted-foreground font-body text-sm mb-10">Trzy albumy, ponad 20 lat na scenie.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {albums.map((album, i) => (
              <FadeIn key={album.title} delay={100 + i * 100}>
                <div className="group bg-card border border-border rounded-xl p-6 hover:border-accent/40 transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl text-accent/60">{album.year}</span>
                  </div>
                  <h3 className="font-heading text-xl text-foreground mb-4 group-hover:text-accent transition-colors">
                    {album.title}
                  </h3>
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
