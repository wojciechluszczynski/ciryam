import { useState } from "react";
import { Instagram, Facebook, Youtube } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { toast } from "sonner";

const inquiryTypes = ["Booking koncertu", "Współpraca", "Wywiad / Media", "Sklep / Zamówienie", "Inne"];

const Kontakt = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", inquiryType: "", message: "", consent: false, honeypot: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    if (!form.name || !form.email || !form.message || !form.consent) {
      toast.error("Proszę wypełnić wymagane pola i zaakceptować zgodę.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Proszę podać prawidłowy adres email.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    setSubmitted(true);
    toast.success("Wiadomość wysłana! Odezwiemy się wkrótce.");
  };

  const inputClass = "w-full bg-transparent border-b border-foreground/20 text-foreground font-body text-sm py-3 px-0 placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors";
  const set = (key: string, value: string | boolean) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <main className="bg-background pt-28 md:pt-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left - Contact info */}
          <FadeIn>
            <div className="order-2 md:order-1">
              <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">Booking & Kontakt</p>
              <h1 className="font-heading text-3xl md:text-5xl text-foreground mb-4">
                Napisz do nas
              </h1>
              <p className="text-muted-foreground font-body text-sm mb-10">
                Booking koncertów, współpraca, media – odezwiemy się najszybciej jak to możliwe.
              </p>

              <div className="flex flex-col gap-2 text-foreground/60 font-body text-sm mb-8">
                <span className="text-foreground font-medium text-base">CIRYAM Management</span>
                <a href="mailto:booking@ciryam.pl" className="hover:text-accent transition-colors">booking@ciryam.pl</a>
                <a href="mailto:kontakt@ciryam.pl" className="hover:text-accent transition-colors">kontakt@ciryam.pl</a>
              </div>

              <div className="flex gap-4 mb-10">
                <a href="https://www.facebook.com/ciryamband" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook"><Facebook size={22} /></a>
                <a href="https://www.instagram.com/ciryam_official/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram"><Instagram size={22} /></a>
                <a href="https://www.youtube.com/@ciryam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="YouTube"><Youtube size={22} /></a>
              </div>
            </div>
          </FadeIn>

          {/* Right - Form */}
          <FadeIn delay={150}>
            <div className="order-1 md:order-2">
              <div className="mb-6 pb-4 border-b border-border">
                <h2 className="font-heading text-xl text-foreground mb-1">Formularz kontaktowy</h2>
                <p className="text-muted-foreground font-body text-xs">Wypełnij poniższe pola.</p>
              </div>

              {submitted ? (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center">
                    <h2 className="font-heading text-2xl text-foreground mb-3">Dzięki!</h2>
                    <p className="text-muted-foreground font-body text-base mb-2">Twoja wiadomość dotarła. Odezwiemy się wkrótce.</p>
                    <p className="text-muted-foreground/60 font-body text-sm">Jeśli to pilne, napisz na booking@ciryam.pl</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <input type="text" name="website" value={form.honeypot} onChange={(e) => set("honeypot", e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
                  <input type="text" placeholder="Imię / Firma *" value={form.name} onChange={(e) => set("name", e.target.value)} className={inputClass} maxLength={100} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input type="email" placeholder="E-mail *" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass} maxLength={255} />
                    <input type="tel" placeholder="Telefon" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} maxLength={20} />
                  </div>
                  <select value={form.inquiryType} onChange={(e) => set("inquiryType", e.target.value)} className={`${inputClass} appearance-none ${!form.inquiryType ? "text-muted-foreground" : ""}`}>
                    <option value="" disabled>Typ zapytania</option>
                    {inquiryTypes.map((t) => (<option key={t} value={t} className="text-foreground bg-background">{t}</option>))}
                  </select>
                  <textarea placeholder="Twoja wiadomość... *" value={form.message} onChange={(e) => set("message", e.target.value)} className={`${inputClass} resize-none min-h-[100px]`} maxLength={2000} />
                  <label className="flex items-start gap-3 mt-1">
                    <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 accent-accent" />
                    <span className="text-muted-foreground font-body text-xs leading-relaxed">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie. *
                    </span>
                  </label>
                  <button type="submit" disabled={sending} className="w-full mt-3 py-3.5 rounded-full bg-accent text-accent-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-accent/80 transition-all duration-300 disabled:opacity-60">
                    {sending ? "Wysyłanie..." : "Wyślij wiadomość"}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
};

export default Kontakt;
