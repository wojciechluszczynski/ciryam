import { Instagram, Facebook, Youtube, Video } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/contexts/LangContext";
import ciryamBand from "@/assets/ciryam-band.jpg";
import ciryamBand2 from "@/assets/ciryam-band-2.jpg";
import ciryamLive from "@/assets/ciryam-live.jpg";

const OZespole = () => {
  const { t } = useLang();

  const milestones = [
    { value: "2020", label: t("about.founded") },
    { value: "3", label: t("about.studioAlbums") },
    { value: "50+", label: t("about.concertsYear") },
    { value: "10K+", label: t("about.fansOnline") },
  ];

  return (
    <main className="bg-background pt-28 md:pt-32">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
        <FadeIn>
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">{t("about.label")}</p>
          <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-12">{t("about.page.title")}</h1>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16">
          <FadeIn>
            <img src={ciryamBand} alt="CIRYAM band" className="w-full aspect-[4/5] object-cover rounded-xl grayscale" />
          </FadeIn>
          <FadeIn delay={150}>
            <div className="flex flex-col justify-center">
              <h2 className="font-heading text-3xl text-foreground mb-6">{t("about.who")}</h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{t("about.page.p1")}</p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{t("about.page.p2")}</p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{t("about.page.p3")}</p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{t("about.page.p4")}</p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={200}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {milestones.map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-xl p-5 text-center">
                <span className="font-heading text-3xl md:text-4xl text-accent block mb-1">{stat.value}</span>
                <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={250}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            <img src={ciryamLive} alt="CIRYAM live" className="w-full aspect-video object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500" />
            <img src={ciryamBand2} alt="CIRYAM backstage" className="w-full aspect-video object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="text-center">
            <h2 className="font-heading text-2xl text-foreground mb-6">{t("about.followUs")}</h2>
            <div className="flex justify-center gap-6">
              <a href="https://www.facebook.com/CIRYAM/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook"><Facebook size={28} /></a>
              <a href="https://www.instagram.com/ciryam__official/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram"><Instagram size={28} /></a>
              <a href="https://www.youtube.com/user/Ciryam/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="YouTube"><Youtube size={28} /></a>
              <a href="https://vimeo.com/ciryam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Vimeo"><Video size={28} /></a>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
};

export default OZespole;
