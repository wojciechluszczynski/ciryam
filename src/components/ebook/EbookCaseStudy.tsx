import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import vizDiningFireplace from "@/assets/viz-dining-fireplace.png";
import vizClosetMarble from "@/assets/viz-closet-marble.png";
import vizBedroomDark from "@/assets/viz-bedroom-dark.png";
import vizBedroomMural from "@/assets/viz-bedroom-mural.png";
import vizBathroomMarble from "@/assets/viz-bathroom-marble.png";

const materials = [
  "Podłoga: deska dębowa w kolorze orzech (200×20)",
  "Ściany: tynk glinowy w ciepłym beżu + jedna ściana dusty rose",
  "Kuchnia: fronty fornirowane tabacco + blat z szarego betonu",
  "Salon: sofa w szarym aksamicie + poduszki terakota i złoto",
  "Oświetlenie: lampa mosiężna nad stołem + punkty LED 2700K",
];

const EbookCaseStudy = () => (
  <section id="case" className="overflow-hidden scroll-mt-16">
    <div className="relative h-64 md:h-96">
      <img src={vizDiningFireplace} alt="Realizacja Złota Harmonia" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary" />
    </div>
    <div className="section-padding bg-secondary -mt-1">
      <div className="max-w-[1000px] mx-auto">
        <FadeIn>
          <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">Case study</span>
          <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-6">
            Realizacja: Złota Harmonia — Rzeszów
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { label: "Metraż", value: "85m²" },
              { label: "Lokalizacja", value: "Rzeszów" },
              { label: "Pakiet", value: "Komfortowa" },
              { label: "Czas", value: "7 tygodni" },
            ].map((d) => (
              <div key={d.label} className="bg-background rounded-xl p-4 text-center shadow-sm">
                <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">{d.label}</p>
                <p className="font-heading text-lg text-foreground mt-1">{d.value}</p>
              </div>
            ))}
          </div>

          {/* Inspiration */}
          <div className="bg-background rounded-2xl p-5 md:p-6 mb-8 border border-border/50">
            <h3 className="font-heading text-sm text-accent mb-3">Inspiracja projektu</h3>
            <p className="font-body text-sm text-muted-foreground leading-[1.8]">
              Klientka marzyła o wnętrzu, które będzie zarówno eleganckie, jak i ciepłe — daleko od chłodnego
              minimalizmu, ale też bez nadmiaru dekoracji. Punktem wyjścia były jej słowa:
              „Chcę wchodzić do domu i czuć, że oddycham."
            </p>
          </div>

          {/* Materials */}
          <div className="bg-background rounded-2xl p-5 md:p-6 mb-8 border border-border/50">
            <h3 className="font-heading text-sm text-accent mb-3">Główne materiały</h3>
            <ul className="space-y-2">
              {materials.map((m) => (
                <li key={m} className="font-body text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenge */}
          <div className="bg-background rounded-2xl p-5 md:p-6 mb-8 border border-border/50">
            <h3 className="font-heading text-sm text-accent mb-3">Największe wyzwanie</h3>
            <p className="font-body text-sm text-muted-foreground leading-[1.8]">
              Mały przedpokój (4m²) bez okna. Zastosowałam dużą szafę z lustrami na całą ścianę,
              jasne ściany i punkt świetlny skierowany w sufit — dzięki temu przestrzeń optycznie podwoiła się
              i nabrała charakteru.
            </p>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[vizClosetMarble, vizBedroomDark, vizBedroomMural, vizBathroomMarble].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Realizacja ${i + 1}`}
                className="w-full aspect-square object-cover rounded-xl shadow-sm hover:shadow-md transition-shadow"
              />
            ))}
          </div>

          <blockquote className="font-body text-sm text-foreground/70 italic leading-[1.8] mb-5 border-l-2 border-accent pl-5 py-1">
            „To jedyne miejsce, w którym naprawdę chcę być."
            <span className="block text-xs text-muted-foreground mt-2 not-italic">— Klientka, po wprowadzeniu</span>
          </blockquote>

          <Link
            to="/realizacje"
            className="inline-flex items-center gap-2 mt-4 font-body text-xs text-accent hover:underline"
          >
            <Eye size={12} /> Zobacz więcej realizacji
          </Link>
        </FadeIn>
      </div>
    </div>
  </section>
);

export default EbookCaseStudy;
