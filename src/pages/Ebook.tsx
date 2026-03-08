import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, CheckCircle, BookOpen } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import vizLivingBeige from "@/assets/viz-living-beige.png";
import { toast } from "sonner";

const ebookFeatures = [
  "27 pytań, które musisz zadać sobie przed startem remontu",
  "Checklista planowania budżetu z buforem awaryjnym",
  "Kolejność prac remontowych krok po kroku",
  "Lista materiałów i zakupów do odhaczenia",
  "Wskazówki dotyczące wyboru wykonawcy",
  "Gotowy harmonogram do wypełnienia",
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
      <section className="relative min-h-[45vh] overflow-hidden">
        <img src={vizLivingBeige} alt="Ebook AN Projekt" className="w-full h-full absolute inset-0 object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 md:pt-40 md:pb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground font-body text-xs mb-5 backdrop-blur-sm">
            <Download size={12} /> Darmowy ebook
          </span>
          <h1 className="font-heading text-3xl md:text-5xl text-white mb-4 max-w-2xl">
            Jak przygotować się do remontu – kompletny przewodnik
          </h1>
          <p className="font-body text-base text-white/80 max-w-lg">
            Pobierz darmowy ebook z checklistą, harmonogramem i praktycznymi wskazówkami. Zaplanuj remont bez stresu.
          </p>
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
                  <BookOpen size={20} className="text-accent" />
                  <h2 className="font-heading text-xl md:text-2xl text-foreground">Co znajdziesz w ebooku?</h2>
                </div>
                <ul className="space-y-4 mb-8">
                  {ebookFeatures.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-accent mt-0.5 shrink-0" />
                      <span className="font-body text-sm text-foreground/80 leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  Ebook powstał na podstawie doświadczeń z dziesiątek projektów wnętrz na Podkarpaciu i w Małopolsce. 
                  Zebrałam w nim wszystko, co chciałabym powiedzieć każdemu klientowi zanim zacznie remont.
                </p>
              </div>
            </FadeIn>

            {/* Right - download form */}
            <FadeIn delay={150}>
              <div className="bg-secondary rounded-xl p-6 md:p-8">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={28} className="text-accent" />
                    </div>
                    <h3 className="font-heading text-xl text-foreground mb-2">Gotowe!</h3>
                    <p className="text-muted-foreground font-body text-sm mb-4">Ebook został wysłany na Twój adres e-mail. Sprawdź skrzynkę (i folder spam).</p>
                    <Link to="/blog" className="inline-flex items-center gap-2 text-accent font-body text-sm hover:underline">
                      Przeczytaj blog <ArrowRight size={14} />
                    </Link>
                  </div>
                ) : (
                  <>
                    <h3 className="font-heading text-lg text-foreground mb-2">Pobierz darmowy ebook</h3>
                    <p className="text-muted-foreground font-body text-sm mb-6">Podaj swoje imię i e-mail, a wyślę Ci ebooka od razu.</p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <input
                        type="text"
                        placeholder="Twoje imię"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                        maxLength={100}
                      />
                      <input
                        type="email"
                        placeholder="Twój adres e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                        maxLength={255}
                      />
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-3 rounded-full bg-accent text-accent-foreground font-body text-sm tracking-[0.05em] hover:bg-accent/90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        <Download size={16} />
                        {sending ? "Wysyłam..." : "Pobierz ebooka za darmo"}
                      </button>
                      <p className="text-muted-foreground font-body text-xs text-center leading-relaxed">
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

      {/* CTA to contact */}
      <section className="bg-accent/10 section-padding-sm">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">Wolisz porozmawiać o swoim projekcie?</h2>
            <p className="text-muted-foreground font-body text-base mb-6">Napisz do mnie. Pierwsza rozmowa jest bezpłatna i bez zobowiązań.</p>
            <Link to="/kontakt" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300">
              Zapytaj o projekt <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Ebook;
