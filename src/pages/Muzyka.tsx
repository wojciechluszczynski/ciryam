import { ExternalLink } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const Muzyka = () => (
  <main className="bg-background pt-28 md:pt-32">
    <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
      <FadeIn>
        <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">Dyskografia</p>
        <h1 className="font-heading text-4xl md:text-6xl text-foreground mb-4">Muzyka</h1>
        <p className="text-muted-foreground font-body text-sm mb-12">Posłuchaj naszych nagrań na platformach streamingowych.</p>
      </FadeIn>

      {/* SoundCloud Embed */}
      <FadeIn delay={100}>
        <div className="bg-card border border-border p-6 md:p-8 mb-12">
          <iframe
            width="100%"
            height="450"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/ciryam&color=%23dc2626&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
            title="SoundCloud CIRYAM"
          />
        </div>
      </FadeIn>

      {/* Streaming Links */}
      <FadeIn delay={200}>
        <h2 className="font-heading text-xl text-foreground mb-6">Słuchaj na platformach</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: "Spotify", url: "https://open.spotify.com/artist/ciryam" },
            { name: "SoundCloud", url: "https://soundcloud.com/ciryam" },
            { name: "YouTube Music", url: "https://www.youtube.com/@ciryam" },
          ].map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 border border-border text-foreground font-heading text-sm tracking-[0.1em] uppercase hover:border-accent hover:text-accent transition-colors"
            >
              <ExternalLink size={14} /> {platform.name}
            </a>
          ))}
        </div>
      </FadeIn>
    </div>
  </main>
);

export default Muzyka;
