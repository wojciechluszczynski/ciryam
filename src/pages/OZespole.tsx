import { Instagram, Facebook, Youtube, Music, Mic2, Guitar } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import ciryamBand from "@/assets/ciryam-band.jpg";
import ciryamBand2 from "@/assets/ciryam-band-2.jpg";
import ciryamLive from "@/assets/ciryam-live.jpg";

const OZespole = () => (
  <main className="bg-background pt-28 md:pt-32">
    <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
      <FadeIn>
        <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">O zespole</p>
        <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-12">CIRYAM – polski zespół rockowy</h1>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16">
        <FadeIn>
          <img src={ciryamBand} alt="CIRYAM – sesja promocyjna zespołu rockowego z Podkarpacia" className="w-full aspect-[4/5] object-cover rounded-xl grayscale" />
        </FadeIn>
        <FadeIn delay={150}>
          <div className="flex flex-col justify-center">
            <h2 className="font-heading text-3xl text-foreground mb-6">Kim jesteśmy</h2>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
              CIRYAM to polski zespół rockowy z Podkarpacia, założony przez grupę muzyków połączonych pasją 
              do gitarowego grania i scenicznej energii. Od początku stawiamy na autorski materiał – 
              każdy riff, tekst i melodia to nasze dzieło.
            </p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
              Łączymy energię klasycznego hard rocka z nowoczesnym brzmieniem. Nasze inspiracje to zarówno 
              legendy gatunku – Led Zeppelin, AC/DC, Deep Purple – jak i współcześni artyści rockowej sceny. 
              Efektem jest brzmienie, które jest jednocześnie klasyczne i świeże.
            </p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
              Na scenie dajemy z siebie absolutnie wszystko. Ponad 50 koncertów rocznie – od kameralnych klubów 
              po wielotysięczne festiwale – to nasza codzienna rzeczywistość. Każdy występ traktujemy jako 
              niepowtarzalne wydarzenie, gdzie energia przepływa między nami a publicznością.
            </p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              Mamy na koncie trzy albumy studyjne, dziesiątki singli i setki godzin spędzonych na scenie. 
              CIRYAM to nie tylko zespół – to styl życia oparty na rocku, autentyczności i pasji do muzyki.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Milestones */}
      <FadeIn delay={200}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: "2020", label: "Rok założenia" },
            { value: "3", label: "Albumy studyjne" },
            { value: "50+", label: "Koncertów rocznie" },
            { value: "10K+", label: "Fanów online" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-5 text-center">
              <span className="font-heading text-3xl md:text-4xl text-accent block mb-1">{stat.value}</span>
              <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Photos */}
      <FadeIn delay={250}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          <img src={ciryamLive} alt="CIRYAM – koncert rockowy na żywo" className="w-full aspect-video object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500" />
          <img src={ciryamBand2} alt="CIRYAM – backstage przed koncertem" className="w-full aspect-video object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500" />
        </div>
      </FadeIn>

      {/* Social */}
      <FadeIn delay={300}>
        <div className="text-center">
          <h2 className="font-heading text-2xl text-foreground mb-6">Śledź CIRYAM w social media</h2>
          <div className="flex justify-center gap-6">
            <a href="https://www.facebook.com/ciryamband" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook CIRYAM">
              <Facebook size={28} />
            </a>
            <a href="https://www.instagram.com/ciryam_official/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram CIRYAM">
              <Instagram size={28} />
            </a>
            <a href="https://www.youtube.com/@ciryam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="YouTube CIRYAM">
              <Youtube size={28} />
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  </main>
);

export default OZespole;
