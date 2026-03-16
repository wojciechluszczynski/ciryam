import { ExternalLink } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/contexts/LangContext";

const Muzyka = () => {
  const { t } = useLang();

  return (
    <main className="bg-background pt-28 md:pt-32">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
        <FadeIn>
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">{t("music.label")}</p>
          <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-4">{t("music.page.title")}</h1>
          <p className="text-muted-foreground font-body text-sm mb-4 max-w-2xl leading-relaxed">{t("music.page.desc1")}</p>
          <p className="text-muted-foreground font-body text-sm mb-12 max-w-2xl leading-relaxed">{t("music.page.desc2")}</p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-12">
            <iframe width="100%" height="450" scrolling="no" frameBorder="no" allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ciryam/sets/ciryam&color=%23d4a017&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
              title="SoundCloud CIRYAM" />
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <h2 className="font-heading text-2xl text-foreground mb-6">{t("music.platforms")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { name: "Spotify", url: "https://open.spotify.com/artist/ciryam" },
              { name: "SoundCloud", url: "https://soundcloud.com/ciryam" },
              { name: "YouTube Music", url: "https://www.youtube.com/@ciryam" },
            ].map((platform) => (
              <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 rounded-xl border border-border text-foreground font-heading text-base tracking-[0.1em] uppercase hover:border-accent hover:text-accent transition-colors">
                <ExternalLink size={14} /> {platform.name}
              </a>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="border-t border-border pt-10">
            <h2 className="font-heading text-2xl text-foreground mb-4">{t("music.seo.title")}</h2>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{t("music.seo.p1")}</p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{t("music.seo.p2")}</p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">{t("music.seo.p3")}</p>
          </div>
        </FadeIn>
      </div>
    </main>
  );
};

export default Muzyka;
