import { ExternalLink } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const polishSites = [
  { name: "architecturaldigest.pl", desc: "najlepszy polski magazyn wnętrzarski", url: "https://architecturaldigest.pl" },
  { name: "bryla.pl", desc: "realizacje, nagrody, branża", url: "https://bryla.pl" },
  { name: "whitemad.pl", desc: "TOP 20 wnętrz w Polsce co roku", url: "https://whitemad.pl" },
  { name: "weranda.pl", desc: "dom, ogród, styl życia", url: "https://weranda.pl" },
  { name: "homebook.pl", desc: "katalog polskich projektantów + realizacje", url: "https://homebook.pl" },
];

const igAccounts = [
  { handle: "@deerdesign.pl", desc: "Warszawa/Kraków, 3500+ projektów", url: "https://instagram.com/deerdesign.pl" },
  { handle: "@pamastudio_wroclaw", desc: "Wnętrze Roku SAW 2025", url: "https://instagram.com/pamastudio_wroclaw" },
  { handle: "@all_design_agnieszka_lorenc", desc: "Kraków, Małopolska", url: "https://instagram.com/all_design_agnieszka_lorenc" },
];

const internationalIg = [
  { handle: "@architectural_digest", desc: "12M+, globalny standard", url: "https://instagram.com/architecturaldigest" },
  { handle: "@dezeen", desc: "architektura i design", url: "https://instagram.com/dezeen" },
  { handle: "@norm.architects", desc: "duński minimalizm, Japandi", url: "https://instagram.com/norm.architects" },
  { handle: "@axelvervoordt", desc: "ultra premium, ponadczasowość", url: "https://instagram.com/axelvervoordt" },
];

const pinterestBoards = [
  { label: "japandi interior 2026", url: "https://pinterest.com/search/pins/?q=japandi+interior+2026" },
  { label: "modern classic interior", url: "https://pinterest.com/search/pins/?q=modern+classic+interior" },
  { label: "interior design 2026 trends", url: "https://pinterest.com/search/pins/?q=interior+design+2026+trends" },
  { label: "polish interior design", url: "https://pinterest.com/search/pins/?q=polish+interior+design" },
];

const awards = [
  { name: "SAW Wnętrze Roku", url: "https://saw.org.pl", desc: "Najważniejszy polski konkurs wnętrzarski" },
  { name: "AD100 Polska 2025", url: "https://architecturaldigest.pl/ad100-2025", desc: "100 najlepszych polskich projektantów" },
];

const EbookInspirations = () => (
  <section id="inspirations" className="section-padding scroll-mt-16">
    <div className="max-w-[1000px] mx-auto">
      <FadeIn>
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">09</span>
        <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-10">
          Gdzie szukać inspiracji do projektu wnętrza?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Polish sites */}
          <div>
            <h3 className="font-heading text-sm text-foreground mb-5">Polskie serwisy</h3>
            <div className="space-y-0">
              {polishSites.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 border-b border-border/50 py-3 last:border-0 group hover:bg-accent/5 -mx-2 px-2 rounded transition-colors"
                >
                  <div>
                    <span className="font-body text-sm text-accent font-medium group-hover:underline">{s.name}</span>
                    <span className="font-body text-xs text-muted-foreground ml-2">{s.desc}</span>
                  </div>
                  <ExternalLink size={12} className="text-muted-foreground/40 group-hover:text-accent shrink-0 transition-colors" />
                </a>
              ))}
            </div>

            <h4 className="font-body text-xs text-foreground/70 font-medium mt-8 mb-4">Instagram — polscy projektanci:</h4>
            <div className="space-y-2">
              {igAccounts.map((a) => (
                <a
                  key={a.handle}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group hover:bg-accent/5 -mx-2 px-2 py-1.5 rounded transition-colors"
                >
                  <span className="font-body text-xs text-accent group-hover:underline">{a.handle}</span>
                  <span className="font-body text-[11px] text-muted-foreground">{a.desc}</span>
                  <ExternalLink size={10} className="text-muted-foreground/30 group-hover:text-accent shrink-0 ml-auto transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* International */}
          <div>
            <h3 className="font-heading text-sm text-foreground mb-5">Zagraniczne inspiracje</h3>
            <div className="space-y-2 mb-8">
              {internationalIg.map((a) => (
                <a
                  key={a.handle}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group hover:bg-accent/5 -mx-2 px-2 py-1.5 rounded transition-colors"
                >
                  <span className="font-body text-xs text-accent group-hover:underline">{a.handle}</span>
                  <span className="font-body text-[11px] text-muted-foreground">{a.desc}</span>
                  <ExternalLink size={10} className="text-muted-foreground/30 group-hover:text-accent shrink-0 ml-auto transition-colors" />
                </a>
              ))}
            </div>

            <h4 className="font-body text-xs text-foreground/70 font-medium mb-4">Nagrody — weryfikacja jakości:</h4>
            <div className="space-y-3">
              {awards.map((a) => (
                <a
                  key={a.name}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-accent/5 rounded-xl p-3.5 group hover:bg-accent/10 transition-colors"
                >
                  <div>
                    <span className="font-body text-sm text-accent font-medium group-hover:underline">{a.name}</span>
                    <p className="font-body text-[11px] text-muted-foreground mt-0.5">{a.desc}</p>
                  </div>
                  <ExternalLink size={12} className="text-muted-foreground/40 group-hover:text-accent shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8">
          <h4 className="font-body text-xs text-foreground/70 font-medium mb-4">Pinterest — gotowe tablice:</h4>
          <div className="flex flex-wrap gap-2">
            {pinterestBoards.map((b) => (
              <a
                key={b.label}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[11px] px-3 py-1.5 rounded-full bg-accent/8 text-accent border border-accent/15 hover:bg-accent/15 transition-colors"
              >
                {b.label} →
              </a>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default EbookInspirations;
