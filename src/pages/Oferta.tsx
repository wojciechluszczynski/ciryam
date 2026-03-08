import { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizBedroomMural from "@/assets/viz-bedroom-mural.png";
import vizBathroomMarble from "@/assets/viz-bathroom-marble.png";
import vizDiningFireplace from "@/assets/viz-dining-fireplace.png";
import { ArrowRight, Home, Building, Building2, Trees, MessageCircle, MapPin, Ruler, Monitor, Hammer, Plus, X, Check, ChevronDown, Star } from "lucide-react";

const packages = [
  {
    icon: Home,
    name: "Konsultacja",
    target: "Dla osób, które chcą omówić pomysł, układ, styl lub konkretny problem we wnętrzu.",
    price: "od 250 zł",
    features: ["Spotkanie online lub na miejscu (ok. 60 min)", "Analiza przestrzeni i potrzeb", "Wstępne rekomendacje stylistyczne i funkcjonalne", "Kierunek dalszych działań"],
    image: vizLivingBeige,
    tags: ["Jednorazowe spotkanie", "Analiza", "Rekomendacje"],
    popular: false,
  },
  {
    icon: Building,
    name: "Opcja Koncepcyjna",
    target: "Dla osób szukających solidnej bazy projektowej. Pomysłu na układ i styl wnętrza.",
    price: "120 zł/m²",
    features: ["Układ funkcjonalny pomieszczeń", "Propozycja stylistyczna i moodboard", "Wizualizacje 3D (3 ujęcia)", "Podstawowe rysunki techniczne"],
    image: vizKitchenRattan,
    tags: ["Układ funkcjonalny", "Moodboard", "Wizualizacje 3D"],
    popular: false,
  },
  {
    icon: Building2,
    name: "Opcja Komfortowa",
    target: "Dla osób, które chcą gotowy projekt do przekazania wykonawcy.",
    price: "150 zł/m²",
    features: ["Pełny projekt koncepcyjny wnętrz", "Propozycja materiałów i kolorystyki", "4 wizualizacje 3D", "Wizualizacja 3D 360°", "Dokładna dokumentacja techniczna"],
    image: vizBedroomMural,
    tags: ["Pełny projekt", "Wizualizacja 360°", "Dokumentacja techniczna"],
    popular: true,
  },
  {
    icon: Trees,
    name: "Opcja Kompleks",
    target: "Dla osób szukających pełnego wsparcia. Od koncepcji, przez projekt, po nadzór na budowie.",
    price: "170 zł/m²",
    features: [
      "Wszystko z Opcji Komfortowej",
      "Krótkie wideo wizualne głównych pomieszczeń",
      "3 spotkania nadzorujące:",
      "  wspólne zakupy materiałów",
      "  spotkanie na budowie z wykonawcą",
      "  kontrola realizacji na budowie",
    ],
    image: vizBathroomMarble,
    tags: ["Pełne wsparcie", "Wideo", "Nadzór budowy", "Zakupy materiałów"],
    popular: false,
  },
];

const timeline = [
  { step: "01", title: "Rozmowa i poznanie potrzeb", desc: "Bezpłatna pierwsza rozmowa. Poznaję Twoje oczekiwania, styl i budżet.", icon: MessageCircle },
  { step: "02", title: "Wizja lokalna i pomiar", desc: "Odwiedzam Twoją przestrzeń, robię pomiary i notuję szczegóły.", icon: MapPin },
  { step: "03", title: "Układ, kierunek i koncepcja", desc: "Przygotowuję wstępną koncepcję, moodboard i propozycję układu.", icon: Ruler },
  { step: "04", title: "Wizualizacje i korekty", desc: "Tworzę realistyczne wizualizacje 3D. Możesz wnieść poprawki.", icon: Monitor },
  { step: "05", title: "Dokumentacja i realizacja", desc: "Przekazuję pełną dokumentację techniczną gotową dla wykonawcy.", icon: Hammer },
];

const comparisonFeatures = [
  { name: "Konsultacja / spotkanie", values: [true, false, false, false] },
  { name: "Układ funkcjonalny", values: [false, true, true, true] },
  { name: "Moodboard stylistyczny", values: [false, true, true, true] },
  { name: "Wizualizacje 3D", values: [false, "3", "4", "4+"] },
  { name: "Wizualizacja 360°", values: [false, false, true, true] },
  { name: "Dokumentacja techniczna", values: [false, "Podstawowa", "Pełna", "Pełna"] },
  { name: "Dobór materiałów i mebli", values: [false, false, true, true] },
  { name: "Wideo wizualne", values: [false, false, false, true] },
  { name: "Nadzór na budowie", values: [false, false, false, "3 spotkania"] },
  { name: "Zakupy z projektantką", values: [false, false, false, true] },
];

const faqs = [
  { q: "Ile trwa cały proces?", a: "Zależy od zakresu projektu. Prostsza koncepcja (np. jedno pomieszczenie) to ok. 2\u20133 tygodnie. Pełny projekt z wizualizacjami i dokumentacją techniczną zajmuje zwykle 4\u20136 tygodni. Opcja Kompleks z nadzorem na budowie to 6\u20138 tygodni lub dłużej, w zależności od harmonogramu prac remontowych." },
  { q: "Czy mogę zamówić tylko konsultację?", a: "Oczywiście. Konsultacja to dobry start, jeśli masz konkretne pytanie, chcesz omówić układ pomieszczeń, dobrać materiały lub po prostu porozmawiać o swoim pomyśle na wnętrze. Spotkanie trwa ok. 60 minut i może odbyć się online lub na miejscu." },
  { q: "Czy dojeżdżasz do Rzeszowa i Nowego Sącza?", a: "Tak, działam na terenie Podkarpacia i Małopolski. Wizje lokalne w okolicach Krosna, Rzeszowa i Nowego Sącza są wliczone w cenę projektu. Przy większych odległościach ustalamy to indywidualnie." },
  { q: "Co jeśli nie wiem, czego potrzebuję?", a: "Nie musisz wiedzieć od razu, to zupełnie normalne. Pierwsza rozmowa jest po to, żeby wspólnie ustalić, jaka forma współpracy będzie najlepsza. Opowiesz mi o swoich potrzebach, a ja zaproponuję kierunek i zakres." },
  { q: "Jak wygląda kwestia cen?", a: "Wycena zależy od metrażu, liczby pomieszczeń i zakresu prac. Po pierwszej rozmowie przygotuję indywidualną ofertę. Ceny są transparentne i nie ma żadnych ukrytych kosztów." },
  { q: "Czy projektujesz wnętrza komercyjne?", a: "Skupiam się głównie na wnętrzach mieszkalnych, ale chętnie porozmawiam o projektach lokali usługowych, gabinetów czy małych biur. Napisz do mnie z opisem projektu." },
  { q: "Czy mogę wprowadzać poprawki do wizualizacji?", a: "Tak, w każdej opcji współpracy przewiduję rundę korekt. Zależy mi, żebyś była/był w pełni zadowolona/zadowolony z projektu przed przejściem do dokumentacji technicznej." },
  { q: "Czy pomagasz w wyborze materiałów i mebli?", a: "Tak, w ramach Opcji Komfortowej i Kompleks przygotowuję zestawienie materiałów, mebli i dodatków z konkretnymi propozycjami i linkami do sklepów. W Opcji Kompleks pomagam też przy zakupach na miejscu." },
];

const Oferta = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [expandedPkg, setExpandedPkg] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={vizKitchenRattan} alt="Projekt wnętrza, oferta AN Projekt" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-3xl md:text-5xl text-dark-foreground mb-3">Oferta</h1>
          <p className="font-body text-base text-dark-foreground/80 max-w-lg">
            Wybierz formę współpracy dopasowaną do Twoich potrzeb. Od konsultacji po pełne wsparcie.
          </p>
        </div>
      </section>

      {/* Packages - Accordion with prices */}
      <section className="bg-background section-padding">
        <div className="max-w-[1200px] mx-auto">
          <div className="space-y-0">
            {packages.map((pkg, i) => {
              const isOpen = expandedPkg === i;
              return (
                <FadeIn key={pkg.name} delay={i * 60}>
                  <div className={`border-t border-border transition-all duration-500 ${isOpen ? "bg-secondary rounded-xl my-2 border-transparent" : "hover:bg-secondary/50"}`}>
                    <button onClick={() => setExpandedPkg(isOpen ? null : i)} className="w-full flex items-center gap-4 md:gap-6 py-6 px-4 md:px-6 text-left">
                      <span className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0 font-body text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                      <div className="flex-1 min-w-0 flex items-center gap-3 flex-wrap sm:flex-nowrap">
                        <h2 className="font-heading text-xl md:text-2xl text-foreground shrink-0">{pkg.name}</h2>
                        {pkg.popular && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/10 text-accent font-body text-[10px] tracking-[0.05em] uppercase shrink-0">
                            <Star size={10} className="fill-accent" /> Najczęściej wybierana
                          </span>
                        )}
                      </div>
                      <span className="font-body text-sm text-accent hidden sm:block shrink-0">{pkg.price}</span>
                      <div className="shrink-0">{isOpen ? <X size={20} className="text-muted-foreground" /> : <Plus size={20} className="text-muted-foreground" />}</div>
                    </button>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="px-4 md:px-6 pb-6 flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{pkg.target}</p>
                          <p className="font-heading text-lg text-accent mb-4 sm:hidden">{pkg.price}</p>
                          <ul className="space-y-2.5 mb-5">
                            {pkg.features.map((f) => (
                              <li key={f} className="text-foreground/80 font-body text-sm flex items-start gap-2.5">
                                {f.startsWith("  ") ? (
                                  <span className="ml-7 flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mt-1.5 shrink-0" />
                                    {f.trim()}
                                  </span>
                                ) : (
                                  <>
                                    <Check size={15} className="text-accent mt-0.5 shrink-0" />
                                    {f}
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {pkg.tags.map((tag) => (
                              <span key={tag} className="px-3 py-1.5 rounded-full border border-border text-foreground font-body text-xs">{tag}</span>
                            ))}
                          </div>
                          <Link to="/kontakt" className="inline-flex items-center gap-2 text-sm font-body tracking-[0.05em] uppercase text-foreground border-b border-foreground/30 pb-0.5 hover:border-accent hover:text-accent transition-colors">
                            Zapytaj o tę opcję <ArrowRight size={14} />
                          </Link>
                        </div>
                        <div className="md:w-72 shrink-0">
                          <img src={pkg.image} alt={pkg.name} className="w-full aspect-[4/3] object-cover rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3 text-center">Porównaj opcje</h2>
            <p className="text-muted-foreground font-body text-base text-center mb-10 max-w-lg mx-auto">Sprawdź, co zawiera każdy pakiet i wybierz najlepszą opcję dla siebie.</p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="overflow-x-auto">
              <table className="w-full font-body text-sm table-fixed">
                <thead>
                  <tr>
                    <th className="w-[28%] text-left py-4 px-3 text-muted-foreground font-normal text-xs uppercase tracking-wider border-b border-border">Co zawiera</th>
                    {packages.map((pkg) => (
                      <th
                        key={pkg.name}
                        className={`w-[18%] text-center py-5 px-2 font-heading text-sm border-b ${
                          pkg.popular
                            ? "bg-primary text-primary-foreground rounded-t-xl border-primary"
                            : "text-foreground border-border"
                        }`}
                      >
                        {pkg.popular && (
                          <span className="block mb-2 mx-auto w-fit px-3 py-0.5 rounded-full bg-accent text-accent-foreground font-body text-[10px] tracking-[0.1em] uppercase">
                            Najczęściej wybierana
                          </span>
                        )}
                        <span className="block text-sm">{pkg.name}</span>
                        <span className={`block text-xs font-body font-normal mt-1 ${pkg.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{pkg.price}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feat) => (
                    <tr key={feat.name}>
                      <td className="py-3 px-3 text-foreground/80 text-sm border-b border-border/50">{feat.name}</td>
                      {feat.values.map((val, j) => (
                        <td
                          key={j}
                          className={`py-3 px-3 text-center border-b ${
                            packages[j].popular
                              ? "bg-primary/5 border-primary/10"
                              : "border-border/50"
                          }`}
                        >
                          {val === true ? (
                            <Check size={16} className="text-accent mx-auto" />
                          ) : val === false ? (
                            <span className="text-muted-foreground/30">—</span>
                          ) : (
                            <span className={`text-xs font-medium ${packages[j].popular ? "text-accent" : "text-foreground/70"}`}>{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="py-5 px-3 text-foreground font-medium">Cena</td>
                    {packages.map((pkg) => (
                      <td
                        key={pkg.name}
                        className={`py-5 px-3 text-center ${
                          pkg.popular ? "bg-primary/5 rounded-b-xl" : ""
                        }`}
                      >
                        <span className={`font-heading text-base ${pkg.popular ? "text-accent" : "text-foreground"}`}>{pkg.price}</span>
                        {pkg.popular && (
                          <Link to="/kontakt" className="block mt-2 mx-auto w-fit px-5 py-1.5 rounded-full bg-accent text-accent-foreground font-body text-xs hover:bg-accent/90 transition-colors">
                            Wybierz
                          </Link>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Showcase image strip */}
      <section className="bg-background py-0">
        <div className="grid grid-cols-3 gap-0">
          <img src={vizDiningFireplace} alt="Realizacja AN Projekt" className="w-full aspect-[4/3] object-cover" />
          <img src={vizBedroomMural} alt="Realizacja AN Projekt" className="w-full aspect-[4/3] object-cover" />
          <img src={vizBathroomMarble} alt="Realizacja AN Projekt" className="w-full aspect-[4/3] object-cover" />
        </div>
      </section>

      {/* Horizontal Timeline */}
      <section className="bg-background section-padding">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4 text-center">Jak przebiega współpraca?</h2>
            <p className="text-muted-foreground font-body text-base text-center mb-14 max-w-lg mx-auto">Przejrzysty proces, bez niespodzianek.</p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="relative">
              <div className="hidden md:block absolute top-5 left-0 right-0 h-px bg-border" />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-3">
                {timeline.map((item, i) => {
                  const StepIcon = item.icon;
                  return (
                    <div key={item.step} className="relative group cursor-pointer" onMouseEnter={() => setActiveStep(i)} onMouseLeave={() => setActiveStep(null)}>
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${activeStep === i ? "border-accent bg-accent/10 scale-110" : "border-border bg-background"}`}>
                        <StepIcon size={16} className={`transition-colors duration-300 ${activeStep === i ? "text-accent" : "text-muted-foreground"}`} />
                      </div>
                      <div className="text-center">
                        <p className={`font-body text-xs tracking-[0.15em] uppercase mb-1 transition-colors ${activeStep === i ? "text-accent" : "text-muted-foreground"}`}>Krok {item.step}</p>
                        <h3 className="font-heading text-sm text-foreground mb-2">{item.title}</h3>
                        <div className={`overflow-hidden transition-all duration-500 ${activeStep === i ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>
                          <p className="text-muted-foreground font-body text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ - Accordion */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[700px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-12 text-center">Najczęściej zadawane pytania</h2>
          </FadeIn>
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="border-t border-border">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 px-1 text-left group"
                  >
                    <h3 className="font-heading text-base md:text-lg text-foreground pr-4 group-hover:text-accent transition-colors">{faq.q}</h3>
                    <ChevronDown size={18} className={`text-muted-foreground shrink-0 transition-transform duration-300 ${expandedFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedFaq === i ? "max-h-[300px] opacity-100 pb-5" : "max-h-0 opacity-0"}`}>
                    <p className="text-muted-foreground font-body text-base leading-relaxed px-1">{faq.a}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent/10 section-padding">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">Masz pytania?</h2>
            <p className="text-muted-foreground font-body text-base mb-8">Napisz do mnie. Chętnie opowiem o możliwościach współpracy. Pierwsza rozmowa jest bezpłatna.</p>
            <Link to="/kontakt" className="inline-block px-8 py-3.5 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300">
              Umów konsultację
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Oferta;
