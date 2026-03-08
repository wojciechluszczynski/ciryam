import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, CheckCircle, BookOpen, Eye, Palette, ListChecks, AlertTriangle } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizBedroomDark from "@/assets/viz-bedroom-dark.png";
import { toast } from "sonner";

const ebookHighlights = [
  { icon: ListChecks, title: "Checklista 27 pytań", desc: "Interaktywna lista do odhaczenia, zanim ruszysz z remontem" },
  { icon: Palette, title: "Kolory i materiały", desc: "Zasada 60-30-10 i trendy 2026, które naprawdę działają" },
  { icon: AlertTriangle, title: "10 najdroższych błędów", desc: "Unikaj pułapek, które kosztują tysiące złotych" },
  { icon: Eye, title: "Case study", desc: "Realizacja krok po kroku: od koncepcji do gotowego wnętrza" },
];

const ebookFeatures = [
  "Czy potrzebujesz projektanta? Tabela kosztów i pakietów",
  "5 kroków dobrego projektu wnętrza z harmonogramem",
  "Jak wybrać styl i zaplanować budżet z buforem awaryjnym",
  "Zasady doboru kolorów i materiałów, które się nie znudzą",
  "27 pytań przed remontem, interaktywna checklista",
  "10 najczęstszych błędów z konkretnymi rozwiązaniami",
  "Realizacja: Złota Harmonia, Rzeszów 85m²",
  "Jak wybrać projektanta? 5 pytań i czerwone flagi",
  "Porównanie 3 pakietów projektowych z cenami",
  "Gotowy plan działania: od pierwszej rozmowy do nadzoru",
];

const Ebook = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast.error("Podaj imię i adres e-mail.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Podaj prawidłowy adres e-mail.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    setSubmitted(true);
    toast.success("Ebook jest w drodze na Twój e-mail!");
  };

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <img src={vizLivingBeige} alt="Ebook AN Projekt" className="w-full h-full absolute inset-0 object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/50 to-foreground/70" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 font-body text-[10px] tracking-[0.15em] uppercase mb-6 backdrop-blur-sm border border-white/10">
            <Download size={11} /> Darmowy przewodnik
          </span>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-white mb-5 max-w-2xl leading-tight">
            Interior Design Guide 2026
          </h1>
          <p className="font-body text-sm md:text-base text-white/60 max-w-lg leading-relaxed">
            Projekt wnętrza od A do Z. Pobierz darmowy przewodnik z checklistą, budżetem i praktycznymi wskazówkami.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-secondary section-padding-sm">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ebookHighlights.map((item) => (
              <FadeIn key={item.title} delay={100}>
                <div className="bg-background rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon size={18} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-sm text-foreground mb-1">{item.title}</h3>
                  <p className="font-body text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Content + Form */}
      <section className="bg-background section-padding">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Left - what's inside */}
            <FadeIn>
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen size={18} className="text-accent" />
                  <h2 className="font-heading text-xl md:text-2xl text-foreground">Co znajdziesz w przewodniku?</h2>
                </div>
                <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
                  13 stron praktycznej wiedzy, stworzonej na podstawie dziesiątek projektów wnętrz na Podkarpaciu i w Małopolsce.
                </p>
                <ul className="space-y-3 mb-8">
                  {ebookFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle size={11} className="text-accent" />
                      </span>
                      <span className="font-body text-sm text-foreground/80 leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/ebook/przewodnik"
                  className="inline-flex items-center gap-2 text-accent font-body text-sm hover:underline"
                >
                  <Eye size={14} /> Podejrzyj przewodnik online
                </Link>
              </div>
            </FadeIn>

            {/* Right - download form */}
            <FadeIn delay={150}>
              <div className="bg-secondary rounded-2xl p-6 md:p-8 shadow-sm sticky top-24">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={28} className="text-accent" />
                    </div>
                    <h3 className="font-heading text-xl text-foreground mb-2">Gotowe!</h3>
                    <p className="text-muted-foreground font-body text-sm mb-6">
                      Ebook został wysłany na Twój adres e-mail. Sprawdź skrzynkę (i folder spam).
                    </p>
                    <div className="flex flex-col gap-3">
                      <Link
                        to="/ebook/przewodnik"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-body hover:bg-accent/90 transition-colors"
                      >
                        <Eye size={14} /> Czytaj online
                      </Link>
                      <Link to="/blog" className="inline-flex items-center justify-center gap-2 text-accent font-body text-sm hover:underline">
                        Przeczytaj blog <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-heading text-lg text-foreground mb-2">Pobierz darmowy przewodnik</h3>
                    <p className="text-muted-foreground font-body text-sm mb-6">
                      Podaj swoje imię i e-mail, a wyślę Ci ebooka od razu.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <input
                        type="text"
                        placeholder="Twoje imię"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-shadow"
                        maxLength={100}
                      />
                      <input
                        type="email"
                        placeholder="Twój adres e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-shadow"
                        maxLength={255}
                      />
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-3.5 rounded-full bg-accent text-accent-foreground font-body text-sm tracking-[0.05em] hover:bg-accent/90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 shadow-sm"
                      >
                        <Download size={16} />
                        {sending ? "Wysyłam..." : "Pobierz ebooka za darmo"}
                      </button>
                      <p className="text-muted-foreground font-body text-[11px] text-center leading-relaxed">
                        Żadnego spamu. Tylko ebook i ewentualnie kilka przydatnych wskazówek.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Preview image */}
      <section className="bg-secondary section-padding-sm">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img src={vizBedroomDark} alt="Podgląd ebooka" className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent flex items-end justify-center pb-8">
                <Link
                  to="/ebook/przewodnik"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-foreground text-sm font-body hover:bg-white/90 transition-all shadow-lg"
                >
                  <Eye size={14} /> Podejrzyj cały przewodnik
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA to contact */}
      <section className="bg-accent/8 section-padding-sm">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
              Wolisz porozmawiać o swoim projekcie?
            </h2>
            <p className="text-muted-foreground font-body text-sm mb-6">
              Napisz do mnie. Pierwsza rozmowa jest bezpłatna i bez zobowiązań.
            </p>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300 shadow-sm"
            >
              Zapytaj o projekt <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Ebook;
