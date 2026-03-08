import { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import { ArrowRight, Home, Building, Building2, Trees, MessageCircle, MapPin, Ruler, Monitor, Hammer } from "lucide-react";

const packages = [
  {
    icon: Home,
    name: "Konsultacja",
    target: "Dla osob, ktore chca omowic pomysl, uklad, styl lub konkretny problem we wnetrzu.",
    features: [
      "Spotkanie online lub na miejscu (ok. 60 min)",
      "Analiza przestrzeni i potrzeb",
      "Wstepne rekomendacje stylistyczne i funkcjonalne",
      "Kierunek dalszych dzialan",
    ],
  },
  {
    icon: Building,
    name: "Opcja Koncepcyjna",
    target: "Dla osob szukajacych solidnej bazy projektowej. Pomyslu na uklad i styl wnetrza.",
    features: [
      "Uklad funkcjonalny pomieszczen",
      "Propozycja stylistyczna i moodboard",
      "Wizualizacje 3D (3 ujecia)",
      "Podstawowe rysunki techniczne",
    ],
  },
  {
    icon: Building2,
    name: "Opcja Komfortowa",
    target: "Dla osob, ktore chca gotowy projekt do przekazania wykonawcy.",
    features: [
      "Pelny projekt koncepcyjny wnetrz",
      "Propozycja materialow i kolorystyki",
      "4 wizualizacje 3D",
      "Wizualizacja 3D 360\u00B0",
      "Dokladna dokumentacja techniczna",
    ],
  },
  {
    icon: Trees,
    name: "Opcja Kompleks",
    target: "Dla osob szukajacych pelnego wsparcia. Od koncepcji, przez projekt, po nadzor na budowie.",
    features: [
      "Wszystko z Opcji Komfortowej",
      "Krotkie wideo wizualne glownych pomieszczen",
      "3 spotkania nadzorujace:",
      "  wspolne zakupy materialow",
      "  spotkanie na budowie z wykonawca",
      "  kontrola realizacji na budowie",
    ],
  },
];

const timeline = [
  { step: "01", title: "Rozmowa i poznanie potrzeb", desc: "Bezplatna pierwsza rozmowa. Poznajem Twoje oczekiwania, styl i budzet.", icon: MessageCircle },
  { step: "02", title: "Wizja lokalna i pomiar", desc: "Odwiedzam Twoja przestrzen, robie pomiary i notuje szczegoly.", icon: MapPin },
  { step: "03", title: "Uklad, kierunek i koncepcja", desc: "Przygotowuje wstepna koncepcje, moodboard i propozycje ukladu.", icon: Ruler },
  { step: "04", title: "Wizualizacje i korekty", desc: "Tworze realistyczne wizualizacje 3D. Mozesz wniesc poprawki.", icon: Monitor },
  { step: "05", title: "Dokumentacja i realizacja", desc: "Przekazuje pelna dokumentacje techniczna gotowa dla wykonawcy.", icon: Hammer },
];

const faqs = [
  {
    q: "Ile trwa caly proces?",
    a: "Zalezy od zakresu projektu. Prostsza koncepcja (np. jedno pomieszczenie) to ok. 2-3 tygodnie. Pelny projekt z wizualizacjami i dokumentacja techniczna zajmuje zwykle 4-6 tygodni. Opcja Kompleks z nadzorem na budowie to 6-8 tygodni lub dluzej, w zaleznosci od harmonogramu prac remontowych. Na czas realizacji wplywa tez szybkosc podejmowania decyzji i ewentualne korekty.",
  },
  {
    q: "Czy moge zamowic tylko konsultacje?",
    a: "Oczywiscie. Konsultacja to dobry start, jesli masz konkretne pytanie, chcesz omowic uklad pomieszczen, dobrac materialy lub po prostu porozmawiac o swoim pomysle na wnetrze. Spotkanie trwa ok. 60 minut i moze odbyc sie online lub na miejscu. Po konsultacji mozesz zdecydowac, czy chcesz kontynuowac wspolprace w szerszym zakresie.",
  },
  {
    q: "Czy dojezdzasz do Rzeszowa i Nowego Sacza?",
    a: "Tak, dzialam na terenie Podkarpacia i Malopolski. Wizje lokalne w okolicach Krosna, Rzeszowa i Nowego Sacza sa wliczone w cene projektu. Przy wiekszych odleglosciach ustalamy to indywidualnie. Wiele elementow projektow, takich jak koncepcja, wizualizacje czy dobor materialow, moge realizowac rowniez zdalnie.",
  },
  {
    q: "Co jesli nie wiem, czego potrzebuje?",
    a: "Nie musisz wiedziec od razu, to zupelnie normalne. Pierwsza rozmowa jest po to, zeby wspolnie ustalic, jaka forma wspolpracy bedzie najlepsza. Opowiesz mi o swoich potrzebach, pokazesz zdjecia przestrzeni, a ja zaproponuje kierunek i zakres, ktory bedzie mial sens. Wiele osob zaczyna od konsultacji i dopiero potem decyduje sie na pelny projekt.",
  },
  {
    q: "Jak wyglada kwestia cen?",
    a: "Wycena zalezy od metrazu, liczby pomieszczen i zakresu prac. Po pierwszej rozmowie i poznaniu Twoich potrzeb przygotuje indywidualna oferte dopasowana do projektu. Pierwsza rozmowa jest bezplatna. Ceny sa transparentne i nie ma zadnych ukrytych kosztow.",
  },
];

const Oferta = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={vizKitchenRattan} alt="Projekt wnetrza, oferta AN Projekt" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-3xl md:text-5xl text-dark-foreground mb-3">Oferta</h1>
          <p className="font-body text-base text-dark-foreground/80 max-w-lg">
            Wybierz forme wspolpracy dopasowana do Twoich potrzeb. Od konsultacji po pelne wsparcie.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-background section-padding">
        <div className="max-w-[1200px] mx-auto">
          <div className="space-y-10">
            {packages.map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 100}>
                <div className="bg-secondary p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 md:gap-10 rounded-lg">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <pkg.icon size={18} className="text-accent" />
                    </div>
                    <h2 className="font-heading text-2xl text-foreground mb-3">{pkg.name}</h2>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">{pkg.target}</p>
                  </div>
                  <div>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((f) => (
                        <li key={f} className="text-foreground/80 font-body text-sm flex items-start gap-2">
                          {f.startsWith("  ") ? (
                            <span className="ml-4">{f.trim()}</span>
                          ) : (
                            <><span className="text-accent mt-0.5 shrink-0">&middot;</span> {f}</>
                          )}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/kontakt"
                      className="inline-flex items-center gap-2 text-sm font-body tracking-[0.05em] uppercase text-foreground border-b border-foreground/30 pb-0.5 hover:border-accent hover:text-accent transition-colors"
                    >
                      Zapytaj o te opcje <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Timeline */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4 text-center">
              Jak przebiega wspolpraca
            </h2>
            <p className="text-muted-foreground font-body text-base text-center mb-14 max-w-lg mx-auto">
              Przejrzysty proces, bez niespodzianek.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="relative">
              <div className="hidden md:block absolute top-5 left-0 right-0 h-px bg-border" />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-3">
                {timeline.map((item, i) => {
                  const StepIcon = item.icon;
                  return (
                    <div
                      key={item.step}
                      className="relative group cursor-pointer"
                      onMouseEnter={() => setActiveStep(i)}
                      onMouseLeave={() => setActiveStep(null)}
                    >
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                        activeStep === i
                          ? "border-accent bg-accent/10 scale-110"
                          : "border-border bg-background"
                      }`}>
                        <StepIcon size={16} className={`transition-colors duration-300 ${activeStep === i ? "text-accent" : "text-muted-foreground"}`} />
                      </div>
                      <div className="text-center">
                        <p className={`font-body text-xs tracking-[0.15em] uppercase mb-1 transition-colors ${activeStep === i ? "text-accent" : "text-muted-foreground"}`}>
                          Krok {item.step}
                        </p>
                        <h3 className="font-heading text-sm text-foreground mb-2">{item.title}</h3>
                        <div className={`overflow-hidden transition-all duration-500 ${
                          activeStep === i ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                        }`}>
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

      {/* FAQ */}
      <section className="bg-background section-padding">
        <div className="max-w-[700px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-12 text-center">
              Najczesciej zadawane pytania
            </h2>
          </FadeIn>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="border-b border-border pb-7">
                  <h3 className="font-heading text-lg text-foreground mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground font-body text-base leading-relaxed">{faq.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-primary-foreground mb-4">Masz pytania?</h2>
            <p className="text-primary-foreground/70 font-body text-base mb-8">
              Napisz do mnie. Chetnie opowiem o mozliwosciach wspolpracy. Pierwsza rozmowa jest bezplatna.
            </p>
            <Link
              to="/kontakt"
              className="inline-block px-8 py-3.5 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300"
            >
              Umow konsultacje
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Oferta;
