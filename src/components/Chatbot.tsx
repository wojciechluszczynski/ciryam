import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import annaPortrait from "@/assets/anna-portrait.jpg";

const quickTopics = [
  { label: "Jak wygląda współpraca?", answer: "Współpraca zaczyna się od bezpłatnej rozmowy, podczas której poznaję Twoje potrzeby. Następnie przygotowuję układ funkcjonalny i koncepcję, potem wizualizacje 3D, a na końcu dokumentację techniczną. W opcji Kompleks wspieram też realizację na budowie." },
  { label: "Jakie są opcje współpracy?", answer: "Oferuję 4 formy: Konsultację (jednorazowe spotkanie), Opcję Koncepcyjną (układ + wizualizacje), Opcję Komfortową (pełny projekt z dokumentacją) i Opcję Kompleks (projekt + nadzór na budowie). Szczegóły znajdziesz na stronie Oferta." },
  { label: "Ile kosztuje projekt?", answer: "Wycena zależy od metrażu i zakresu prac. Po pierwszej rozmowie przygotuję indywidualną ofertę dopasowaną do Twoich potrzeb. Pierwsza rozmowa jest bezpłatna – napisz lub zadzwoń." },
  { label: "Gdzie działasz?", answer: "Pracuję głównie na Podkarpaciu (okolice Krosna, Rzeszowa) i w Małopolsce (okolice Nowego Sącza). Wiele elementów projektów realizuję również zdalnie." },
  { label: "Jak się skontaktować?", answer: "Napisz na anprojekt.com@gmail.com lub zadzwoń: +48 730 359 642. Możesz też wypełnić formularz na stronie Kontakt. Odezwę się w ciągu 1–2 dni roboczych." },
];

const siteLinks = [
  { label: "Zobacz realizacje", href: "/realizacje" },
  { label: "Sprawdź ofertę", href: "/oferta" },
  { label: "Poznaj mnie", href: "/o-mnie" },
  { label: "Formularz kontaktowy", href: "/kontakt" },
];

interface ChatMessage {
  role: "bot" | "user";
  content: string;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", content: "Cześć! Jestem wirtualną asystentką AN Projekt. Mogę pomóc Ci znaleźć informacje o ofercie, procesie współpracy lub skontaktować się z Anią. O co chcesz zapytać?" },
  ]);
  const [input, setInput] = useState("");
  const [showTopics, setShowTopics] = useState(true);

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

    // Simple keyword matching for common questions
    const lower = userMsg.toLowerCase();
    let botResponse = "Dziękuję za pytanie! Aby uzyskać szczegółową odpowiedź, najlepiej skontaktuj się bezpośrednio z Anią: anprojekt.com@gmail.com lub +48 730 359 642. Możesz też wypełnić formularz na stronie Kontakt.";

    if (lower.includes("cen") || lower.includes("koszt") || lower.includes("ile")) {
      botResponse = quickTopics[2].answer;
    } else if (lower.includes("współprac") || lower.includes("proces") || lower.includes("etap")) {
      botResponse = quickTopics[0].answer;
    } else if (lower.includes("ofert") || lower.includes("pakiet") || lower.includes("opcj")) {
      botResponse = quickTopics[1].answer;
    } else if (lower.includes("kontakt") || lower.includes("mail") || lower.includes("telefon") || lower.includes("zadzwon")) {
      botResponse = quickTopics[4].answer;
    } else if (lower.includes("gdzie") || lower.includes("region") || lower.includes("dojazd") || lower.includes("rzeszów") || lower.includes("krosno")) {
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
      {/* Chat bubble */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 transition-all duration-300 flex items-center justify-center group"
        aria-label="Otwórz czat"
      >
        {open ? (
          <X size={22} />
        ) : (
          <div className="relative">
            <img
              src={annaPortrait}
              alt="Anna Nowak"
              className="w-12 h-12 rounded-full object-cover border-2 border-accent"
            />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-accent animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-h-[480px] bg-background rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center gap-3">
            <img src={annaPortrait} alt="Anna Nowak" className="w-9 h-9 rounded-full object-cover" />
            <div>
              <p className="text-primary-foreground font-body text-sm font-medium">AN Projekt</p>
              <p className="text-primary-foreground/60 font-body text-xs">Zwykle odpowiadam w ciągu 1–2 dni</p>
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
                  Więcej pytań
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
              aria-label="Wyślij"
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
