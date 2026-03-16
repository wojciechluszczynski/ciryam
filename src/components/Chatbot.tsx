import { useState, useEffect, useRef } from "react";
import { X, Send, MessageCircle, Music, Calendar, ShoppingBag, ArrowRight } from "lucide-react";
import ciryamLogo from "@/assets/ciryam-logo.png";

const bandKnowledge = {
  general: "CIRYAM to polski zespół rockowy z Podkarpacia, łączący energię hard rocka z nowoczesnym brzmieniem. Zespół znany jest z intensywnych koncertów na żywo i autorskich kompozycji.",
  music: "Najnowszy materiał CIRYAM znajdziesz na Spotify, SoundCloud i YouTube. Zespół wydał płytę \"Dices\" dostępną w formacie CD i winylowym w naszym sklepie. Posłuchaj na: soundcloud.com/ciryam",
  concerts: "Najbliższe koncerty CIRYAM:\n• 12 kwietnia – Kraków, Zaścianek\n• 26 kwietnia – Warszawa, Hydrozagadka\n• 10 maja – Wrocław, Firlej\n• 24 maja – Gdańsk, Drizzly Grizzly\n• 14 czerwca – Rzeszów, Vinyl Music Club\n• 28 czerwca – Poznań, Blue Note\n\nBilety dostępne online lub w dniu koncertu!",
  shop: "W sklepie CIRYAM znajdziesz: koszulki (89 zł), bluzy hoodie (149 zł), płyty CD (49 zł), winyle LP (119 zł), plakaty (39 zł) i czapki beanie (59 zł). Zamówienia przez: sklep@ciryam.pl",
  booking: "Booking koncertów i współpraca: booking@ciryam.pl. Gramy na festiwalach, w klubach i na eventach prywatnych. Napisz – wrócimy z ofertą!",
  contact: "Kontakt: booking@ciryam.pl (koncerty), kontakt@ciryam.pl (ogólny). Social media: Facebook /ciryamband, Instagram @ciryam_official, YouTube @ciryam",
  members: "CIRYAM to grupa muzyków z Podkarpacia, którzy żyją rockiem. Więcej o zespole dowiesz się na stronie /o-zespole.",
};

const quickTopics = [
  { label: "🎵 Posłuchaj muzyki", key: "music", icon: Music },
  { label: "🎤 Nadchodzące koncerty", key: "concerts", icon: Calendar },
  { label: "🛒 Sklep z merchem", key: "shop", icon: ShoppingBag },
  { label: "📩 Booking / kontakt", key: "booking", icon: MessageCircle },
];

const siteLinks = [
  { label: "Muzyka", href: "/muzyka" },
  { label: "Koncerty", href: "/koncerty" },
  { label: "Sklep", href: "/sklep" },
  { label: "Kontakt", href: "/kontakt" },
];

interface ChatMessage {
  role: "bot" | "user";
  content: string;
}

function getSmartResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.match(/koncert|gra(cie|my|ją)|wyst(ę|e)p|bilet|live|na żywo|termin|data|kiedy/))
    return bandKnowledge.concerts;
  if (lower.match(/sklep|koszulk|bluz|płyt|winyl|merch|kup|cena|ile kosztuje|plakat|czapk/))
    return bandKnowledge.shop;
  if (lower.match(/muzyk|piosen|utw(ó|o)r|album|słuchać|spotify|soundcloud|nagra/))
    return bandKnowledge.music;
  if (lower.match(/booking|koncert.*zam|zarezerwuj|grać.*u nas|event|festiwal|wyst(ą|a)p/))
    return bandKnowledge.booking;
  if (lower.match(/kontakt|mail|email|telefon|napisz|skontakt|social media/))
    return bandKnowledge.contact;
  if (lower.match(/kto.*gra|skład|członk|muzyk|zespół|kim.*jesteście|o.*zespole/))
    return bandKnowledge.members;
  if (lower.match(/cześć|hej|siema|yo|witam|dzień dobry/))
    return "Siema! 🤘 Jestem asystentem CIRYAM. Mogę opowiedzieć o koncertach, muzyce, sklepie z merchem albo pomóc z bookingiem. O co pytasz?";

  return `Nie jestem pewien, o co dokładnie pytasz, ale mogę pomóc z:\n• 🎤 Koncerty i bilety\n• 🎵 Muzyka i nagrania\n• 🛒 Sklep z merchem\n• 📩 Booking i kontakt\n\nZapytaj o cokolwiek z powyższego!`;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingDismissed, setGreetingDismissed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", content: "Siema! 🤘 Jestem asystentem CIRYAM. Pytaj o koncerty, muzykę, merch albo booking – pomogę!" },
  ]);
  const [input, setInput] = useState("");
  const [showTopics, setShowTopics] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const greetingTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    greetingTimer.current = setTimeout(() => {
      if (!open && !greetingDismissed) setShowGreeting(true);
    }, 4000);
    return () => clearTimeout(greetingTimer.current);
  }, []);

  useEffect(() => {
    if (showGreeting && !open) {
      const t = setTimeout(() => { setShowGreeting(false); }, 8000);
      return () => clearTimeout(t);
    }
  }, [showGreeting, open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOpen = () => { setOpen(true); setShowGreeting(false); setGreetingDismissed(true); };
  const handleClose = () => setOpen(false);

  const handleTopic = (key: string) => {
    const topic = quickTopics.find(t => t.key === key)!;
    const response = bandKnowledge[key as keyof typeof bandKnowledge];
    setMessages(prev => [...prev, { role: "user", content: topic.label }, { role: "bot", content: response }]);
    setShowTopics(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setShowTopics(false);
    const response = getSmartResponse(userMsg);
    setMessages(prev => [...prev, { role: "user", content: userMsg }, { role: "bot", content: response }]);
  };

  return (
    <>
      {/* Greeting bubble */}
      {showGreeting && !open && (
        <div
          className="fixed bottom-24 right-6 z-50 bg-card rounded-2xl shadow-lg border border-border px-4 py-3 max-w-[240px] animate-fade-in-up cursor-pointer hidden md:block"
          onClick={handleOpen}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setShowGreeting(false); setGreetingDismissed(true); }}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Zamknij"
          >
            <X size={10} />
          </button>
          <p className="font-body text-sm text-foreground">🤘 Hej! Pytaj o koncerty, muzykę i merch CIRYAM</p>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => open ? handleClose() : handleOpen()}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden group z-[9999]"
        aria-label="Otwórz czat z asystentem CIRYAM"
        style={{ boxShadow: open ? undefined : "0 0 24px 4px hsl(38 92% 50% / 0.3), 0 4px 16px rgba(0,0,0,0.2)" }}
      >
        {open ? (
          <div className="w-full h-full rounded-full bg-accent flex items-center justify-center">
            <X size={22} className="text-accent-foreground" />
          </div>
        ) : (
          <div className="relative w-full h-full rounded-full overflow-hidden bg-accent flex items-center justify-center">
            <img src={ciryamLogo} alt="CIRYAM" className="w-8 h-8 object-contain" style={{ filter: "invert(1)" }} />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[9998] w-[360px] max-h-[520px] bg-background rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-card px-4 py-3 flex items-center gap-3 border-b border-border">
            <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shrink-0">
              <img src={ciryamLogo} alt="CIRYAM" className="w-6 h-6 object-contain" style={{ filter: "invert(1)" }} />
            </div>
            <div className="flex-1">
              <p className="text-foreground font-heading text-base tracking-wide">CIRYAM BOT</p>
              <p className="text-muted-foreground font-body text-xs">Koncerty • Muzyka • Merch</p>
            </div>
            <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Zamknij czat">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px] scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl font-body text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-accent text-accent-foreground rounded-br-md"
                    : "bg-card text-foreground rounded-bl-md border border-border"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {showTopics && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                {quickTopics.map((topic) => (
                  <button
                    key={topic.key}
                    onClick={() => handleTopic(topic.key)}
                    className="text-left px-3 py-2.5 rounded-xl bg-card hover:bg-accent/10 text-foreground font-body text-xs transition-colors border border-border hover:border-accent/30"
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            )}

            {!showTopics && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {siteLinks.map((link) => (
                  <a key={link.href} href={link.href} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-card text-foreground font-body text-xs hover:bg-accent/10 transition-colors border border-border">
                    {link.label} <ArrowRight size={10} />
                  </a>
                ))}
                <button onClick={() => setShowTopics(true)} className="px-3 py-1.5 rounded-full bg-card text-muted-foreground font-body text-xs hover:bg-accent/10 transition-colors border border-border">
                  Więcej pytań
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Zapytaj o CIRYAM..."
              className="flex-1 bg-card rounded-full px-4 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent border border-border"
              maxLength={500}
            />
            <button onClick={handleSend} className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/80 transition-colors shrink-0" aria-label="Wyślij">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
