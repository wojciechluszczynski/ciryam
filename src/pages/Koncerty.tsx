import { Calendar, MapPin } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const concerts = [
  { date: "2026-04-12", city: "Kraków", venue: "Zaścianek", ticketUrl: "#", status: "upcoming" as const },
  { date: "2026-04-26", city: "Warszawa", venue: "Hydrozagadka", ticketUrl: "#", status: "upcoming" as const },
  { date: "2026-05-10", city: "Wrocław", venue: "Firlej", ticketUrl: "#", status: "upcoming" as const },
  { date: "2026-05-24", city: "Gdańsk", venue: "Drizzly Grizzly", ticketUrl: "#", status: "upcoming" as const },
  { date: "2026-06-14", city: "Rzeszów", venue: "Vinyl Music Club", ticketUrl: "#", status: "upcoming" as const },
  { date: "2026-06-28", city: "Poznań", venue: "Blue Note", ticketUrl: "#", status: "upcoming" as const },
  { date: "2026-03-08", city: "Kraków", venue: "Zaścianek", ticketUrl: "#", status: "past" as const },
  { date: "2026-02-15", city: "Rzeszów", venue: "Vinyl Music Club", ticketUrl: "#", status: "past" as const },
  { date: "2025-12-21", city: "Warszawa", venue: "Progresja", ticketUrl: "#", status: "past" as const },
];

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return {
    day: d.getDate().toString().padStart(2, "0"),
    month: d.toLocaleDateString("pl-PL", { month: "short" }).toUpperCase(),
    year: d.getFullYear(),
  };
};

const upcoming = concerts.filter((c) => c.status === "upcoming");
const past = concerts.filter((c) => c.status === "past");

const Koncerty = () => (
  <main className="bg-background pt-28 md:pt-32">
    <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
      <FadeIn>
        <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">Na żywo</p>
        <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-4">Koncerty CIRYAM</h1>
        <p className="text-muted-foreground font-body text-sm mb-4 max-w-2xl leading-relaxed">
          Każdy koncert CIRYAM to niepowtarzalne przeżycie – od małych, kameralnych klubów po wielkie festiwalowe sceny. 
          Sprawdź najbliższe daty i kup bilet online, zanim się wyprzedadzą.
        </p>
        <p className="text-muted-foreground font-body text-sm mb-12 max-w-2xl leading-relaxed">
          Gramy rock na żywo w całej Polsce – Kraków, Warszawa, Wrocław, Gdańsk, Rzeszów, Poznań i więcej. 
          Zabierz znajomych i poczuj energię CIRYAM na własnej skórze.
        </p>
      </FadeIn>

      {/* Upcoming */}
      <div className="mb-16">
        <h2 className="font-heading text-sm tracking-[0.2em] uppercase text-muted-foreground mb-6 flex items-center gap-2">
          <Calendar size={14} className="text-accent" /> Nadchodzące koncerty
        </h2>
        <div className="space-y-0">
          {upcoming.map((concert, i) => {
            const { day, month } = formatDate(concert.date);
            return (
              <FadeIn key={i} delay={i * 50}>
                <div className="group border-t border-border py-5 flex items-center gap-4 md:gap-8 hover:bg-secondary/50 px-4 transition-colors">
                  <div className="text-center shrink-0 w-16">
                    <span className="font-heading text-4xl text-foreground block leading-none">{day}</span>
                    <span className="font-heading text-xs tracking-[0.15em] text-accent">{month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-2xl text-foreground">{concert.city}</h3>
                    <p className="flex items-center gap-1.5 text-muted-foreground font-body text-sm">
                      <MapPin size={12} /> {concert.venue}
                    </p>
                  </div>
                  <a
                    href={concert.ticketUrl}
                    className="shrink-0 px-6 py-2.5 rounded-full bg-accent text-accent-foreground font-heading text-xs tracking-[0.1em] uppercase hover:bg-accent/80 transition-colors"
                  >
                    Kup bilet
                  </a>
                </div>
              </FadeIn>
            );
          })}
          <div className="border-t border-border" />
        </div>
      </div>

      {/* Past */}
      <div>
        <h2 className="font-heading text-sm tracking-[0.2em] uppercase text-muted-foreground mb-6">Archiwum koncertów</h2>
        <div className="space-y-0 opacity-60">
          {past.map((concert, i) => {
            const { day, month, year } = formatDate(concert.date);
            return (
              <div key={i} className="border-t border-border py-4 flex items-center gap-4 md:gap-8 px-4">
                <div className="text-center shrink-0 w-16">
                  <span className="font-heading text-xl text-foreground block leading-none">{day}</span>
                  <span className="font-body text-[10px] text-muted-foreground">{month} {year}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg text-foreground">{concert.city}</h3>
                  <p className="text-muted-foreground font-body text-xs">{concert.venue}</p>
                </div>
              </div>
            );
          })}
          <div className="border-t border-border" />
        </div>
      </div>

      {/* SEO text */}
      <FadeIn delay={200}>
        <div className="mt-16 border-t border-border pt-10">
          <h2 className="font-heading text-2xl text-foreground mb-4">Koncerty rockowe w Polsce – CIRYAM na żywo</h2>
          <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
            CIRYAM to jeden z najaktywniejszych koncertowo polskich zespołów rockowych. Gramy ponad 50 koncertów rocznie 
            w największych miastach Polski – od Krakowa i Warszawy po Gdańsk i Poznań. Nasze koncerty to połączenie 
            surowej energii hard rocka, autorskich utworów i nieszablonowej scenicznej ekspresji.
          </p>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            Bilety na koncerty CIRYAM dostępne są online oraz w dniu wydarzenia. Jeśli szukasz polskiego zespołu rockowego 
            na festiwal, event firmowy lub imprezę prywatną – skontaktuj się z nami przez zakładkę Kontakt.
          </p>
        </div>
      </FadeIn>
    </div>
  </main>
);

export default Koncerty;
