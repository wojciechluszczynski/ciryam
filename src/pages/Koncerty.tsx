import { Calendar, MapPin, ExternalLink } from "lucide-react";
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
    full: d.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }),
  };
};

const upcoming = concerts.filter((c) => c.status === "upcoming");
const past = concerts.filter((c) => c.status === "past");

const Koncerty = () => (
  <main className="bg-background pt-28 md:pt-32">
    <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
      <FadeIn>
        <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">Na żywo</p>
        <h1 className="font-heading text-4xl md:text-6xl text-foreground mb-4">Koncerty</h1>
        <p className="text-muted-foreground font-body text-sm mb-12">Sprawdź najbliższe daty i kup bilety online.</p>
      </FadeIn>

      {/* Upcoming */}
      <div className="mb-16">
        <h2 className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6 flex items-center gap-2">
          <Calendar size={14} className="text-accent" /> Nadchodzące
        </h2>
        <div className="space-y-0">
          {upcoming.map((concert, i) => {
            const { day, month } = formatDate(concert.date);
            return (
              <FadeIn key={i} delay={i * 50}>
                <div className="group border-t border-border py-5 flex items-center gap-4 md:gap-8 hover:bg-secondary/50 px-4 transition-colors">
                  <div className="text-center shrink-0 w-16">
                    <span className="font-heading text-3xl text-foreground block leading-none">{day}</span>
                    <span className="font-heading text-xs tracking-[0.15em] text-accent">{month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-xl text-foreground">{concert.city}</h3>
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
        <h2 className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">Archiwum</h2>
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
                  <h3 className="font-heading text-base text-foreground">{concert.city}</h3>
                  <p className="text-muted-foreground font-body text-xs">{concert.venue}</p>
                </div>
              </div>
            );
          })}
          <div className="border-t border-border" />
        </div>
      </div>
    </div>
  </main>
);

export default Koncerty;
