import { useState, useEffect, useRef } from "react";
import { X, Send, MessageCircle, Music, Calendar, ShoppingBag, ArrowRight } from "lucide-react";
import ciryamLogo from "@/assets/ciryam-logo.png";
import { useLang } from "@/contexts/LangContext";

const bandKnowledgePl = {
  general: "CIRYAM to polski zespół rockowy, łączący energię hard rocka z nowoczesnym brzmieniem. Zespół znany jest z intensywnych koncertów na żywo i autorskich kompozycji.",
  music: 'Najnowszy materiał CIRYAM znajdziesz na Spotify, SoundCloud i YouTube. Zespół wydał płytę "Dices" dostępną w formacie CD i winylowym w naszym sklepie. Posłuchaj na: soundcloud.com/ciryam',
  concerts: "Najbliższe koncerty CIRYAM:\n\u2022 12 kwietnia \u2013 Krak\u00f3w, Za\u015bcianek\n\u2022 26 kwietnia \u2013 Warszawa, Hydrozagadka\n\u2022 10 maja \u2013 Wroc\u0142aw, Firlej\n\u2022 24 maja \u2013 Gda\u0144sk, Drizzly Grizzly\n\u2022 14 czerwca \u2013 Rzesz\u00f3w, Vinyl Music Club\n\u2022 28 czerwca \u2013 Pozna\u0144, Blue Note\n\nBilety dost\u0119pne online lub w dniu koncertu!",
  shop: "W sklepie CIRYAM znajdziesz: koszulki (89 z\u0142), bluzy hoodie (149 z\u0142), p\u0142yty CD (49 z\u0142), winyle LP (119 z\u0142), plakaty (39 z\u0142) i czapki beanie (59 z\u0142). Zam\u00f3wienia przez: sklep@ciryam.pl",
  booking: "Booking koncert\u00f3w i wsp\u00f3\u0142praca: booking@ciryam.pl. Gramy na festiwalach, w klubach i na eventach prywatnych. Napisz \u2013 wr\u00f3cimy z ofert\u0105!",
  contact: "Kontakt: booking@ciryam.pl (koncerty), kontakt@ciryam.pl (og\u00f3lny). Social media: Facebook /ciryamband, Instagram @ciryam_official, YouTube @ciryam",
  members: "CIRYAM to grupa muzyk\u00f3w, kt\u00f3rzy \u017cyj\u0105 rockiem. Wi\u0119cej o zespole dowiesz si\u0119 na stronie /o-zespole.",
};

const bandKnowledgeEn = {
  general: "CIRYAM is a Polish rock band combining hard rock energy with a modern sound. The band is known for intense live concerts and original compositions.",
  music: 'Find the latest CIRYAM material on Spotify, SoundCloud and YouTube. The band released the album "Dices" available on CD and vinyl in our shop. Listen at: soundcloud.com/ciryam',
  concerts: "Upcoming CIRYAM concerts:\n\u2022 April 12 \u2013 Krak\u00f3w, Za\u015bcianek\n\u2022 April 26 \u2013 Warsaw, Hydrozagadka\n\u2022 May 10 \u2013 Wroc\u0142aw, Firlej\n\u2022 May 24 \u2013 Gda\u0144sk, Drizzly Grizzly\n\u2022 June 14 \u2013 Rzesz\u00f3w, Vinyl Music Club\n\u2022 June 28 \u2013 Pozna\u0144, Blue Note\n\nTickets available online or at the door!",
  shop: "In the CIRYAM shop you'll find: t-shirts (89 PLN), hoodies (149 PLN), CDs (49 PLN), vinyl LPs (119 PLN), posters (39 PLN) and beanies (59 PLN). Orders via: sklep@ciryam.pl",
  booking: "Concert booking & collaboration: booking@ciryam.pl. We play at festivals, clubs and private events. Write to us \u2013 we'll get back with an offer!",
  contact: "Contact: booking@ciryam.pl (concerts), kontakt@ciryam.pl (general). Social media: Facebook /ciryamband, Instagram @ciryam_official, YouTube @ciryam",
  members: "CIRYAM is a group of musicians who live and breathe rock. Learn more about the band at /o-zespole.",
};

const quickTopicsPl = [
  { label: "\ud83c\udfb5 Pos\u0142uchaj muzyki", key: "music" },
  { label: "\ud83c\udfa4 Nadchodz\u0105ce koncerty", key: "concerts" },
  { label: "\ud83d\uded2 Sklep z merchem", key: "shop" },
  { label: "\ud83d\udce9 Booking / kontakt", key: "booking" },
];

const quickTopicsEn = [
  { label: "\ud83c\udfb5 Listen to music", key: "music" },
  { label: "\ud83c\udfa4 Upcoming concerts", key: "concerts" },
  { label: "\ud83d\uded2 Merch shop", key: "shop" },
  { label: "\ud83d\udce9 Booking / contact", key: "booking" },
];

const siteLinksPl = [
  { label: "Muzyka", href: "/muzyka" },
  { label: "Koncerty", href: "/koncerty" },
  { label: "Sklep", href: "/sklep" },
  { label: "Kontakt", href: "/kontakt" },
];

const siteLinksEn = [
  { label: "Music", href: "/muzyka" },
  { label: "Concerts", href: "/koncerty" },
  { label: "Shop", href: "/sklep" },
  { label: "Contact", href: "/kontakt" },
];

interface ChatMessage {
  role: "bot" | "user";
  content: string;
}

function getSmartResponse(input: string, lang: "pl" | "en"): string {
  const lower = input.toLowerCase();
  const knowledge = lang === "pl" ? bandKnowledgePl : bandKnowledgeEn;

  if (lower.match(/koncert|gra(cie|my|ją)|wyst(ę|e)p|bilet|live|na żywo|termin|data|kiedy|concert|ticket|show|when|tour/))
    return knowledge.concerts;
  if (lower.match(/sklep|koszulk|bluz|płyt|winyl|merch|kup|cena|ile kosztuje|plakat|czapk|shop|price|buy|tshirt|hoodie|vinyl/))
    return knowledge.shop;
  if (lower.match(/muzyk|piosen|utw(ó|o)r|album|słuchać|spotify|soundcloud|nagra|music|song|listen|track|record/))
    return knowledge.music;
  if (lower.match(/booking|koncert.*zam|zarezerwuj|grać.*u nas|event|festiwal|wyst(ą|a)p|hire|book|festival/))
    return knowledge.booking;
  if (lower.match(/kontakt|mail|email|telefon|napisz|skontakt|social media|contact|reach|phone/))
    return knowledge.contact;
  if (lower.match(/kto.*gra|skład|członk|muzyk|zespół|kim.*jesteście|o.*zespole|who|band|member|about/))
    return knowledge.members;
  if (lower.match(/cześć|hej|siema|yo|witam|dzień dobry|hello|hi|hey|what's up/))
    return lang === "pl"
      ? "Siema! \ud83e\udd18 Jestem asystentem CIRYAM. Mog\u0119 opowiedzie\u0107 o koncertach, muzyce, sklepie z merchem albo pom\u00f3c z bookingiem. O co pytasz?"
      : "Hey! \ud83e\udd18 I'm the CIRYAM assistant. I can tell you about concerts, music, merch shop or help with booking. What would you like to know?";

  return lang === "pl"
    ? "Nie jestem pewien, o co dok\u0142adnie pytasz, ale mog\u0119 pom\u00f3c z:\n\u2022 \ud83c\udfa4 Koncerty i bilety\n\u2022 \ud83c\udfb5 Muzyka i nagrania\n\u2022 \ud83d\uded2 Sklep z merchem\n\u2022 \ud83d\udce9 Booking i kontakt\n\nZapytaj o cokolwiek z powy\u017cszego!"
    : "I'm not sure what you're asking, but I can help with:\n\u2022 \ud83c\udfa4 Concerts & tickets\n\u2022 \ud83c\udfb5 Music & recordings\n\u2022 \ud83d\uded2 Merch shop\n\u2022 \ud83d\udce9 Booking & contact\n\nAsk about any of the above!";
}

const Chatbot = () => {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingDismissed, setGreetingDismissed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [showTopics, setShowTopics] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const greetingTimer = useRef<ReturnType<typeof setTimeout>>();

  const quickTopics = lang === "pl" ? quickTopicsPl : quickTopicsEn;
  const siteLinks = lang === "pl" ? siteLinksPl : siteLinksEn;
  const knowledge = lang === "pl" ? bandKnowledgePl : bandKnowledgeEn;

  // Reset messages when language changes
  useEffect(() => {
    setMessages([{
      role: "bot",
      content: lang === "pl"
        ? "Siema! \ud83e\udd18 Jestem asystentem CIRYAM. Pytaj o koncerty, muzyk\u0119, merch albo booking \u2013 pomog\u0119!"
        : "Hey! \ud83e\udd18 I'm the CIRYAM assistant. Ask about concerts, music, merch or booking \u2013 happy to help!"
    }]);
    setShowTopics(true);
  }, [lang]);

  useEffect(() => {
    greetingTimer.current = setTimeout(() => {
      if (!open && !greetingDismissed) setShowGreeting(true);
    }, 4000);
    return () => clearTimeout(greetingTimer.current);
  }, []);

  useEffect(() => {
    if (showGreeting && !open) {
      const t = setTimeout(() => setShowGreeting(false), 8000);
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
    const response = knowledge[key as keyof typeof knowledge];
    setMessages(prev => [...prev, { role: "user", content: topic.label }, { role: "bot", content: response }]);
    setShowTopics(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setShowTopics(false);
    const response = getSmartResponse(userMsg, lang);
    setMessages(prev => [...prev, { role: "user", content: userMsg }, { role: "bot", content: response }]);
  };

  const greetingText = lang === "pl"
    ? "\ud83e\udd18 Hej! Pytaj o koncerty, muzyk\u0119 i merch CIRYAM"
    : "\ud83e\udd18 Hey! Ask about CIRYAM concerts, music & merch";

  return (
    <>

      <button onClick={() => open ? handleClose() : handleOpen()}
        className="fixed bottom-[4.5rem] right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden group z-[9999]"
        aria-label="Open CIRYAM chat assistant"
        style={{ boxShadow: open ? undefined : "0 0 24px 4px hsl(38 92% 50% / 0.3), 0 4px 16px rgba(0,0,0,0.2)" }}>
        {open ? (
          <div className="w-full h-full rounded-full bg-accent flex items-center justify-center"><X size={22} className="text-accent-foreground" /></div>
        ) : (
          <div className="relative w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center border-2 border-accent/40">
            <img src={ciryamLogo} alt="CIRYAM" className="w-8 h-8 object-contain brightness-0 invert" />
          </div>
        )}
      </button>

      {open && (
        <div className="fixed bottom-[8rem] right-6 z-[9998] w-[360px] max-h-[520px] bg-background rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-fade-in-up">
          <div className="bg-card px-4 py-3 flex items-center gap-3 border-b border-border">
            <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center shrink-0 border border-accent/30">
              <img src={ciryamLogo} alt="CIRYAM" className="w-6 h-6 object-contain brightness-0 invert" />
            </div>
            <div className="flex-1">
              <p className="text-foreground font-heading text-base tracking-wide">CIRYAM BOT</p>
              <p className="text-muted-foreground font-body text-xs">
                {lang === "pl" ? "Koncerty \u2022 Muzyka \u2022 Merch" : "Concerts \u2022 Music \u2022 Merch"}
              </p>
            </div>
            <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Close chat"><X size={18} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px] scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl font-body text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === "user" ? "bg-accent text-accent-foreground rounded-br-md" : "bg-card text-foreground rounded-bl-md border border-border"
                }`}>{msg.content}</div>
              </div>
            ))}

            {showTopics && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                {quickTopics.map((topic) => (
                  <button key={topic.key} onClick={() => handleTopic(topic.key)}
                    className="text-left px-3 py-2.5 rounded-xl bg-card hover:bg-accent/10 text-foreground font-body text-xs transition-colors border border-border hover:border-accent/30">
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
                  {lang === "pl" ? "Wi\u0119cej pyta\u0144" : "More questions"}
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border p-3 flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={lang === "pl" ? "Zapytaj o CIRYAM..." : "Ask about CIRYAM..."}
              className="flex-1 bg-card rounded-full px-4 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent border border-border" maxLength={500} />
            <button onClick={handleSend} className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/80 transition-colors shrink-0" aria-label="Send">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
