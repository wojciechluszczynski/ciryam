import { useState } from "react";
import { Instagram, Facebook } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { toast } from "sonner";

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const projectTypes = ["Mieszkanie", "Dom jednorodzinny", "Pojedyncze pomieszczenie", "Lokal usługowy", "Inne"];
const stages = ["Dopiero planuję", "Mam projekt / pomysł", "Remont w trakcie", "Szukam konsultacji"];

const Kontakt = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", city: "", projectType: "", area: "", stage: "", message: "", consent: false, honeypot: "",
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
    toast.success("Dziękuję! Odezwę się najszybciej jak to możliwe.");
  };

  const inputClass = "w-full bg-transparent border-b border-primary-foreground/20 text-primary-foreground font-body text-sm py-3 px-0 placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent transition-colors";
  const set = (key: string, value: string | boolean) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <main className="bg-primary min-h-screen pt-28 md:pt-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 pb-12 md:pb-20">
        {/* Mobile: form first */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
          {/* Left - Contact info (desktop) / appears second on mobile */}
          <FadeIn>
            <div className="order-2 md:order-1">
              <h1 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-4">
                Porozmawiajmy o&nbsp;Twoim wnętrzu
              </h1>
              <p className="text-primary-foreground/60 font-body text-base mb-10">
                Opisz w kilku zdaniach swój projekt lub zadaj pytanie. Pierwsza rozmowa jest bezpłatna.
              </p>

              <div className="flex flex-col gap-2 text-primary-foreground/70 font-body text-sm mb-8">
                <span className="text-primary-foreground font-medium text-base">Anna Nowak, AN Projekt</span>
                <span>Odrzykoń, Podkarpacie</span>
                <a href="tel:+48730359642" className="hover:text-accent transition-colors">+48 730 359 642</a>
                <a href="mailto:anprojekt.com@gmail.com" className="hover:text-accent transition-colors">anprojekt.com@gmail.com</a>
              </div>

              <div className="flex gap-4 mb-10">
                <a href="https://www.instagram.com/an_projekt/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/40 hover:text-accent transition-colors" aria-label="Instagram"><Instagram size={22} /></a>
                <a href="https://www.facebook.com/anna.nowakpaprocka" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/40 hover:text-accent transition-colors" aria-label="Facebook"><Facebook size={22} /></a>
                <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/40 hover:text-accent transition-colors" aria-label="Pinterest"><PinterestIcon /></a>
              </div>

              <div className="text-primary-foreground/40 font-body text-xs leading-relaxed space-y-1">
                <p>Możesz też napisać bezpośrednio na adres e-mail.</p>
                <p>Po wysłaniu formularza odezwę się najszybciej jak to możliwe.</p>
              </div>
            </div>
          </FadeIn>

          {/* Right - Form (appears first on mobile) */}
          <FadeIn delay={150}>
            <div className="order-1 md:order-2">
              {/* Form header */}
              <div className="mb-6 pb-4 border-b border-primary-foreground/10">
                <h2 className="font-heading text-xl text-primary-foreground mb-1">Formularz kontaktowy</h2>
                <p className="text-primary-foreground/50 font-body text-xs">Wypełnij poniższe pola, odezwę się najszybciej jak mogę.</p>
              </div>

              {submitted ? (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center">
                    <h2 className="font-heading text-2xl text-primary-foreground mb-3">Dziękuję!</h2>
                    <p className="text-primary-foreground/60 font-body text-base mb-2">Twoja wiadomość dotarła. Odezwę się najszybciej jak to możliwe.</p>
                    <p className="text-primary-foreground/40 font-body text-sm">Jeśli to pilne, napisz na anprojekt.com@gmail.com</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <input type="text" name="website" value={form.honeypot} onChange={(e) => set("honeypot", e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
                  <input type="text" placeholder="Imię i nazwisko *" value={form.name} onChange={(e) => set("name", e.target.value)} className={inputClass} maxLength={100} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input type="email" placeholder="E-mail *" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass} maxLength={255} />
                    <input type="tel" placeholder="Telefon" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} maxLength={20} />
                  </div>
                  <input type="text" placeholder="Miejscowość" value={form.city} onChange={(e) => set("city", e.target.value)} className={inputClass} maxLength={100} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <select value={form.projectType} onChange={(e) => set("projectType", e.target.value)} className={`${inputClass} appearance-none ${!form.projectType ? "text-primary-foreground/30" : ""}`}>
                      <option value="" disabled>Typ projektu</option>
                      {projectTypes.map((t) => (<option key={t} value={t} className="text-foreground bg-background">{t}</option>))}
                    </select>
                    <input type="text" placeholder="Przybliżony metraż" value={form.area} onChange={(e) => set("area", e.target.value)} className={inputClass} maxLength={20} />
                  </div>
                  <select value={form.stage} onChange={(e) => set("stage", e.target.value)} className={`${inputClass} appearance-none ${!form.stage ? "text-primary-foreground/30" : ""}`}>
                    <option value="" disabled>Na jakim etapie jesteś?</option>
                    {stages.map((s) => (<option key={s} value={s} className="text-foreground bg-background">{s}</option>))}
                  </select>
                  <textarea placeholder="Opisz w kilku zdaniach swój projekt lub pytanie... *" value={form.message} onChange={(e) => set("message", e.target.value)} className={`${inputClass} resize-none min-h-[100px]`} maxLength={2000} />
                  <label className="flex items-start gap-3 mt-1">
                    <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 accent-accent" />
                    <span className="text-primary-foreground/50 font-body text-xs leading-relaxed">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie, zgodnie z&nbsp;
                      <a href="/polityka-prywatnosci" className="underline hover:text-accent">polityką prywatności</a>. *
                    </span>
                  </label>
                  <button type="submit" disabled={sending} className="w-full mt-3 py-3.5 rounded-full bg-accent text-accent-foreground font-body text-sm tracking-[0.05em] uppercase hover:bg-accent/90 transition-all duration-300 disabled:opacity-60">
                    {sending ? "Wysyłanie..." : "Wyślij wiadomość"}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Clear separator before footer */}
      <div className="border-t border-primary-foreground/10 mt-8" />
    </main>
  );
};

export default Kontakt;
