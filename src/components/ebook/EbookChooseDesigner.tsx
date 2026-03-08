import { Check, AlertTriangle } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const questions = [
  {
    q: "Czy masz portfolio podobnych realizacji?",
    detail: "Szukaj projektów zbliżonych do Twojego: podobny metraż, styl, typ mieszkania. Każdy projektant ma swój styl — upewnij się, że pasuje do Twojego.",
  },
  {
    q: "Co dokładnie zawiera wybrany pakiet?",
    detail: "Zapytaj o konkretną listę: ile wizualizacji, ile rund poprawek, czy wchodzi projekt elektryki i hydrauliki, co jest w cenie, a co nie.",
  },
  {
    q: "Ile rund poprawek jest w cenie?",
    detail: "Minimum 2–3 rundy to standard. Jeden projekt i brak poprawek to czerwona flaga.",
  },
  {
    q: "Czy przygotowujesz dokumentację techniczną?",
    detail: "Wykonawcy pracują z dokumentacją, nie z wizualizacjami. Bez rysunków technicznych projekt jest tylko inspiracją.",
  },
  {
    q: "Jakie są realistyczne czasy realizacji?",
    detail: "Dobre projekty nie powstają w tydzień. Zapytaj o harmonogram i upewnij się, że masz go na piśmie.",
  },
];

const goodCollab = [
  "Regularne konsultacje na każdym etapie — nie znikasz na 3 tygodnie",
  "Jasny harmonogram z datami — koncepcja, wizualizacje, dokumentacja",
  "Pełna dokumentacja techniczna na koniec — rysunki z wymiarami i zestawienie materiałów",
];

const redFlags = [
  "Portfolio złożone wyłącznie ze zdjęć stockowych",
  "Nie pyta o potrzeby i budżet na pierwszym spotkaniu",
  "Brak jasnej umowy z harmonogramem",
  'Obietnica projektu "w 5 dni za każdą cenę"',
  'Wszystkie ceny "do ustalenia" bez żadnych widełek',
];

const EbookChooseDesigner = () => (
  <section id="choose" className="section-padding bg-primary text-primary-foreground scroll-mt-16">
    <div className="max-w-[1000px] mx-auto">
      <FadeIn>
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">08</span>
        <h2 className="font-heading text-2xl md:text-4xl mb-10">Jak wybrać dobrego projektanta wnętrz?</h2>

        <p className="font-body text-sm text-primary-foreground/60 mb-6">5 pytań, które musisz zadać przed podpisaniem umowy:</p>
        <div className="space-y-5 mb-10">
          {questions.map((item, i) => (
            <div key={i} className="flex gap-4 items-start group">
              <div className="w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center shrink-0">
                <span className="font-heading text-accent text-xs">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex-1">
                <span className="font-body text-sm text-primary-foreground/80 font-medium">{item.q}</span>
                <p className="font-body text-xs text-primary-foreground/40 leading-[1.7] mt-1">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-primary-foreground/8 mb-8" />

        {/* Good collaboration */}
        <p className="font-body text-sm text-primary-foreground/70 mb-5 font-medium">Jak wygląda dobra współpraca z projektantem?</p>
        <ul className="space-y-3 mb-10">
          {goodCollab.map((item) => (
            <li key={item} className="flex items-start gap-2.5 font-body text-sm text-primary-foreground/50">
              <Check size={14} className="text-accent mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="w-full h-px bg-primary-foreground/8 mb-8" />

        <div className="flex items-center gap-2 mb-5">
          <AlertTriangle size={14} className="text-accent shrink-0" />
          <p className="font-body text-[10px] tracking-[0.15em] uppercase text-primary-foreground/60">
            Na co uważać przy wyborze projektanta
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {redFlags.map((flag) => (
            <div key={flag} className="flex items-start gap-2.5 font-body text-sm text-primary-foreground/50 bg-primary-foreground/5 rounded-xl p-3.5 border border-primary-foreground/5">
              <span className="w-4 h-4 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle size={9} className="text-accent" />
              </span>
              <span>{flag}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

export default EbookChooseDesigner;
