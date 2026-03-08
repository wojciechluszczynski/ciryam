import { AlertTriangle } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import styleJapandi from "@/assets/style-japandi.jpg";
import styleModernClassic from "@/assets/style-modern-classic.jpg";
import styleScandinavian from "@/assets/style-scandinavian.jpg";
import styleBoho from "@/assets/style-boho.jpg";
import styleIndustrial from "@/assets/style-industrial.jpg";

const styles = [
  {
    name: "Japandi",
    desc: "Japońskiego minimalizmu + skandynawska funkcjonalność. Jasne drewno, surowe tkaniny, dużo powietrza.",
    colors: ["kremowa biel", "piaski", "szałwia", "ciemne akcenty"],
    forWho: "osoby ceniące spokój i naturalne materiały",
    image: styleJapandi,
  },
  {
    name: "Modern Classic",
    desc: "Marmur, złote detale, sztukateria, symetria. Luksusowy efekt bez ostentacji.",
    colors: ["biel", "szampan", "złoto", "głęboka zieleń"],
    forWho: "osoby szukające ponadczasowej elegancji",
    image: styleModernClassic,
  },
  {
    name: "Skandynawski",
    desc: "Jasno, funkcjonalnie, bez zbędnych elementów. Drewno, biel, szarość. Ciepłe tekstylia.",
    colors: ["biel", "szarości", "drewno", "pastele"],
    forWho: "rodziny z dziećmi, miłośnicy prostoty",
    image: styleScandinavian,
  },
  {
    name: "Boho Premium",
    desc: "Rattan, len, rośliny, wzory etniczne — w jakościowym, przemyślanym wydaniu.",
    colors: ["beże", "terrakota", "zieleń", "len"],
    forWho: "osoby z duszą podróżniczą",
    image: styleBoho,
  },
  {
    name: "Industrial",
    desc: "Beton, cegła, ciemny metal, surowe drewno. Kontrast chropowatości i miękkości.",
    colors: ["szarości", "czerń", "ciemne drewno", "metal"],
    forWho: "osoby lubiące odwagę i charakter",
    image: styleIndustrial,
  },
];

const EbookStyles = () => (
  <section id="style" className="section-padding bg-secondary scroll-mt-16">
    <div className="max-w-[1000px] mx-auto">
      <FadeIn>
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">03a</span>
        <h2 className="font-heading text-xl md:text-2xl text-foreground mb-6">Jak wybrać styl swojego wnętrza?</h2>
        <p className="font-body text-sm text-muted-foreground mb-5 leading-[1.8]">
          Zanim sięgniesz po Pinterest, odpowiedz sobie na 4 pytania:
        </p>
        <ol className="space-y-3 mb-10 font-body text-sm text-foreground/80">
          {[
            "Ciepłe czy zimne kolory? (beże i brązy vs. szarości i błękity)",
            "Dużo dekoracji czy minimalizm? (przytulny eklektyzm vs. czyste linie)",
            "Drewno i tkaniny czy beton i metal? (naturalne vs. industrialne)",
            "Klasyczna elegancja czy nowoczesna prostota?",
          ].map((q, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-[10px] font-heading text-accent">
                {i + 1}
              </span>
              <span className="pt-0.5">{q}</span>
            </li>
          ))}
        </ol>

        {/* Horizontal style cards with images */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-12">
          {styles.map((s) => (
            <div key={s.name} className="group cursor-default">
              <div className="relative rounded-xl overflow-hidden aspect-square mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  src={s.image}
                  alt={`Styl ${s.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h4 className="font-heading text-sm text-white">{s.name}</h4>
                </div>
              </div>
              <p className="font-body text-[11px] text-muted-foreground leading-relaxed mb-2">{s.desc}</p>
              <div className="flex flex-wrap gap-1">
                {s.colors.map((c) => (
                  <span key={c} className="font-body text-[9px] px-2 py-0.5 rounded-full bg-accent/8 text-accent border border-accent/10">
                    {c}
                  </span>
                ))}
              </div>
              <p className="font-body text-[10px] text-muted-foreground/70 mt-1.5">
                Dla: {s.forWho}
              </p>
            </div>
          ))}
        </div>

        {/* Budget section */}
        <div className="border-t border-border/50 pt-10">
          <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">03b</span>
          <h2 className="font-heading text-xl md:text-2xl text-foreground mb-6">Budżet — jak zaplanować?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="font-body text-sm text-muted-foreground mb-5">Koszt wykończenia (bez mebli):</p>
              <div className="space-y-4 mb-6">
                {[
                  { name: "Standard", range: "1 500–2 500 zł/m²" },
                  { name: "Premium", range: "2 500–4 000 zł/m²" },
                  { name: "Luxury", range: "4 000+ zł/m²" },
                ].map((c) => (
                  <div key={c.name} className="flex justify-between border-b border-border/50 pb-3">
                    <span className="font-body text-sm text-foreground font-medium">{c.name}</span>
                    <span className="font-body text-sm text-muted-foreground">{c.range}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-background rounded-xl p-4 mb-5">
                <p className="font-body text-sm text-foreground/80 mb-1">Przykład: mieszkanie 70m²</p>
                <p className="font-body text-xs text-muted-foreground">Standard: 105–175 tys. zł &nbsp;·&nbsp; Premium: 175–280 tys. zł</p>
              </div>
              <div className="flex items-start gap-2.5 bg-accent/8 rounded-xl p-3.5">
                <AlertTriangle size={14} className="text-accent mt-0.5 shrink-0" />
                <p className="font-body text-xs text-foreground/70 leading-relaxed">
                  Bufor awaryjny: minimum 15–20% ponad budżet główny
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default EbookStyles;
