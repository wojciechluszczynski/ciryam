import { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import annaPortrait from "@/assets/anna-portrait.jpg";

const quickTopics = [
  { label: "Jak wyglada wspolpraca?", answer: "Wspolpraca zaczyna sie od bezplatnej rozmowy, podczas ktorej poznaję Twoje potrzeby. Nastepnie przygotowuje uklad funkcjonalny i koncepcje, potem wizualizacje 3D, a na koncu dokumentacje techniczna. W opcji Kompleks wspieram tez realizacje na budowie." },
  { label: "Jakie sa opcje wspolpracy?", answer: "Oferuje 4 formy: Konsultacje (jednorazowe spotkanie), Opcje Koncepcyjna (uklad + wizualizacje), Opcje Komfortowa (pelny projekt z dokumentacja) i Opcje Kompleks (projekt + nadzor na budowie). Szczegoly znajdziesz na stronie Oferta." },
  { label: "Ile kosztuje projekt?", answer: "Wycena zalezy od metrazu i zakresu prac. Po pierwszej rozmowie przygotuje indywidualna oferte dopasowana do Twoich potrzeb. Pierwsza rozmowa jest bezplatna, napisz lub zadzwon." },
  { label: "Gdzie dzialasz?", answer: "Pracuje glownie na Podkarpaciu (okolice Krosna, Rzeszowa) i w Malopolsce (okolice Nowego Sacza). Wiele elementow projektow realizuje rowniez zdalnie." },
  { label: "Jak sie skontaktowac?", answer: "Napisz na anprojekt.com@gmail.com lub zadzwon: +48 730 359 642. Mozesz tez wypelnic formularz na stronie Kontakt. Odezwe sie w ciagu 1-2 dni roboczych." },
];

const siteLinks = [
  { label: "Zobacz realizacje", href: "/realizacje" },
  { label: "Sprawdz oferte", href: "/oferta" },
  { label: "Poznaj mnie", href: "/o-mnie" },
  { label: "Formularz kontaktowy", href: "/kontakt" },
];

interface ChatMessage {
  role: "bot" | "user";
  content: string;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", content: "Czesc! Moge pomoc Ci znalezc informacje o ofercie, procesie wspolpracy lub skontaktowac sie z Ania. O co chcesz zapytac?" },
  ]);
  const [input, setInput] = useState("");
  const [showTopics, setShowTopics] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!open) setShowGreeting(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleTopic = (topic: typeof quickTopics[0]) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: topic.label },
      { role: "bot", content: topic.answer },
    ]);
    setShowTopics(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setShowTopics(false);

    const lower = userMsg.toLowerCase();
    let botResponse = "Dziekuje za pytanie! Aby uzyskac szczegolowa odpowiedz, najlepiej skontaktuj sie bezposrednio z Ania: anprojekt.com@gmail.com lub +48 730 359 642.";

    if (lower.includes("cen") || lower.includes("koszt") || lower.includes("ile")) {
      botResponse = quickTopics[2].answer;
    } else if (lower.includes("wspolprac") || lower.includes("proces") || lower.includes("etap")) {
      botResponse = quickTopics[0].answer;
    } else if (lower.includes("ofert") || lower.includes("pakiet") || lower.includes("opcj")) {
      botResponse = quickTopics[1].answer;
    } else if (lower.includes("kontakt") || lower.includes("mail") || lower.includes("telefon") || lower.includes("zadzwon")) {
      botResponse = quickTopics[4].answer;
    } else if (lower.includes("gdzie") || lower.includes("region") || lower.includes("dojazd") || lower.includes("rzesz") || lower.includes("krosno")) {
      botResponse = quickTopics[3].answer;
    }

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMsg },
      { role: "bot", content: botResponse },
    ]);
  };

  return (
    <>
      {/* Greeting bubble */}
      {showGreeting && !open && (
        <div
          className="fixed bottom-24 right-6 z-50 bg-background rounded-2xl shadow-lg border border-border px-4 py-3 max-w-[220px] animate-fade-in-up cursor-pointer"
          onClick={() => { setOpen(true); setShowGreeting(false); }}
        >
          <p className="font-body text-sm text-foreground">Czesc, porozmawiajmy o Twoim projekcie?</p>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-background border-r border-b border-border rotate-45" />
        </div>
      )}

      {/* Chat bubble with warm brown glow */}
      <button
        onClick={() => { setOpen(!open); setShowGreeting(false); }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden group"
        aria-label="Otworz czat"
        style={{
          boxShadow: open ? undefined : "0 0 20px 4px hsl(25 22% 55% / 0.35), 0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {open ? (
          <div className="w-full h-full bg-accent flex items-center justify-center">
            <X size={22} className="text-accent-foreground" />
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={annaPortrait}
              alt="Anna Nowak"
              className="w-full h-full object-cover object-top"
            />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-h-[480px] bg-background rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center gap-3">
            <img src={annaPortrait} alt="Anna Nowak" className="w-9 h-9 rounded-full object-cover object-top" />
            <div>
              <p className="text-primary-foreground font-body text-sm font-medium">AN Projekt</p>
              <p className="text-primary-foreground/60 font-body text-xs">Zwykle odpowiadam w ciagu 1-2 dni</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[280px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl font-body text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground rounded-br-md"
                      : "bg-secondary text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Quick topics */}
            {showTopics && (
              <div className="space-y-1.5 pt-2">
                {quickTopics.map((topic) => (
                  <button
                    key={topic.label}
                    onClick={() => handleTopic(topic)}
                    className="block w-full text-left px-3 py-2 rounded-xl bg-secondary/80 hover:bg-accent/10 text-foreground font-body text-xs transition-colors border border-border/50"
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            )}

            {/* Site links */}
            {!showTopics && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {siteLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-3 py-1.5 rounded-full bg-secondary text-foreground font-body text-xs hover:bg-accent/10 transition-colors border border-border/50"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={() => setShowTopics(true)}
                  className="px-3 py-1.5 rounded-full bg-secondary text-muted-foreground font-body text-xs hover:bg-accent/10 transition-colors border border-border/50"
                >
                  Wiecej pytan
                </button>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Napisz pytanie..."
              className="flex-1 bg-secondary rounded-full px-4 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              maxLength={500}
            />
            <button
              onClick={handleSend}
              className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-colors shrink-0"
              aria-label="Wyslij"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
