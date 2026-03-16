import { Instagram, Facebook, Youtube } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import ciryamBand from "@/assets/ciryam-band.jpg";
import ciryamBand2 from "@/assets/ciryam-band-2.jpg";
import ciryamLive from "@/assets/ciryam-live.jpg";

const OZespole = () => (
  <main className="bg-background pt-28 md:pt-32">
    <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
      <FadeIn>
        <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">O zespole</p>
        <h1 className="font-heading text-4xl md:text-6xl text-foreground mb-12">CIRYAM</h1>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16">
        <FadeIn>
          <img src={ciryamBand} alt="CIRYAM - zespół" className="w-full aspect-[4/5] object-cover grayscale" />
        </FadeIn>
        <FadeIn delay={150}>
          <div className="flex flex-col justify-center">
            <h2 className="font-heading text-2xl text-foreground mb-6">Kim jesteśmy</h2>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
              CIRYAM to polski zespół rockowy, który łączy energię klasycznego rocka z nowoczesnym, ciężkim brzmieniem.
              Powstaliśmy z pasji do muzyki, która porusza – od mocnych riffów gitarowych po emocjonalne ballady.
            </p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
              Na scenie dajemy z siebie wszystko. Każdy koncert traktujemy jako niepowtarzalne wydarzenie,
              gdzie energia przepływa między nami a publicznością. Gramy w całej Polsce – od małych klubów po duże festiwale.
            </p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              Nasze teksty opowiadają o życiu, emocjach i codziennych zmaganiach.
              Muzyka CIRYAM to soundtrack do prawdziwego życia – bez filtrów i udawania.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Photos */}
      <FadeIn delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          <img src={ciryamLive} alt="CIRYAM na żywo" className="w-full aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          <img src={ciryamBand2} alt="CIRYAM" className="w-full aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-500" />
        </div>
      </FadeIn>

      {/* Social */}
      <FadeIn delay={300}>
        <div className="text-center">
          <h2 className="font-heading text-xl text-foreground mb-6">Śledź nas</h2>
          <div className="flex justify-center gap-6">
            <a href="https://www.facebook.com/ciryamband" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook">
              <Facebook size={28} />
            </a>
            <a href="https://www.instagram.com/ciryam_official/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram">
              <Instagram size={28} />
            </a>
            <a href="https://www.youtube.com/@ciryam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="YouTube">
              <Youtube size={28} />
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  </main>
);

export default OZespole;
