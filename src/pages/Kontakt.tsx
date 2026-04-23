import { useState } from "react";
import { Instagram, Facebook, Youtube } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/contexts/LangContext";
import { toast } from "sonner";

const Kontakt = () => {
  const { t } = useLang();
  const inquiryTypes = [
    t("contact.types.booking"),
    t("contact.types.collab"),
    t("contact.types.media"),
    t("contact.types.shop"),
    t("contact.types.other"),
  ];

  const [form, setForm] = useState({
    name: "", email: "", phone: "", inquiryType: "", message: "", consent: false, honeypot: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    if (!form.name || !form.email || !form.message || !form.consent) {
      toast.error(t("contact.form.required"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error(t("contact.form.invalidEmail"));
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    setSubmitted(true);
    toast.success(t("contact.form.success"));
  };

  const inputClass = "w-full bg-transparent border-b border-foreground/20 text-foreground font-body text-sm py-3 px-0 placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors";
  const set = (key: string, value: string | boolean) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <main className="bg-background pt-28 md:pt-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <FadeIn>
            <div className="order-2 md:order-1">
              <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">{t("contact.label")}</p>
              <h1 className="font-heading text-4xl md:text-6xl text-foreground mb-4">{t("contact.title")}</h1>
              <p className="text-muted-foreground font-body text-sm mb-10">{t("contact.desc")}</p>

              <div className="flex flex-col gap-6 mb-8">
                <div>
                  <p className="font-heading text-[10px] tracking-[0.2em] uppercase text-accent mb-2">Management</p>
                  <p className="text-foreground font-medium">Robert Węgrzyn</p>
                  <a href="mailto:okoartmanagement@gmail.com" className="block text-foreground/70 hover:text-accent transition-colors text-sm">okoartmanagement@gmail.com</a>
                  <a href="tel:+48605103072" className="block text-foreground/70 hover:text-accent transition-colors text-sm">+48 605 103 072</a>
                </div>
                <div>
                  <p className="font-heading text-[10px] tracking-[0.2em] uppercase text-accent mb-2">Booking Manager</p>
                  {/* TODO: uzupełnij dane Booking Manager */}
                  <p className="text-foreground font-medium">[Twoje imię]</p>
                  <p className="text-foreground/70 text-sm">[email do uzupełnienia]</p>
                  <p className="text-foreground/70 text-sm">[telefon do uzupełnienia]</p>
                </div>
              </div>

              <div className="flex gap-4 mb-10">
                <a href="https://www.facebook.com/ciryamband" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook"><Facebook size={22} /></a>
                <a href="https://www.instagram.com/ciryam_official/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram"><Instagram size={22} /></a>
                <a href="https://www.youtube.com/@ciryam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="YouTube"><Youtube size={22} /></a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="order-1 md:order-2">
              <div className="mb-6 pb-4 border-b border-border">
                <h2 className="font-heading text-xl text-foreground mb-1">{t("contact.form.title")}</h2>
                <p className="text-muted-foreground font-body text-xs">{t("contact.form.subtitle")}</p>
              </div>

              {submitted ? (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center">
                    <h2 className="font-heading text-2xl text-foreground mb-3">{t("contact.form.thanks")}</h2>
                    <p className="text-muted-foreground font-body text-base mb-2">{t("contact.form.thanksDesc")}</p>
                    <p className="text-muted-foreground/60 font-body text-sm">{t("contact.form.urgent")}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <input type="text" name="website" value={form.honeypot} onChange={(e) => set("honeypot", e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
                  <input type="text" placeholder={t("contact.form.name")} value={form.name} onChange={(e) => set("name", e.target.value)} className={inputClass} maxLength={100} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input type="email" placeholder={t("contact.form.email")} value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass} maxLength={255} />
                    <input type="tel" placeholder={t("contact.form.phone")} value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} maxLength={20} />
                  </div>
                  <select value={form.inquiryType} onChange={(e) => set("inquiryType", e.target.value)} className={`${inputClass} appearance-none ${!form.inquiryType ? "text-muted-foreground" : ""}`}>
                    <option value="" disabled>{t("contact.form.type")}</option>
                    {inquiryTypes.map((typ) => (<option key={typ} value={typ} className="text-foreground bg-background">{typ}</option>))}
                  </select>
                  <textarea placeholder={t("contact.form.message")} value={form.message} onChange={(e) => set("message", e.target.value)} className={`${inputClass} resize-none min-h-[100px]`} maxLength={2000} />
                  <label className="flex items-start gap-3 mt-1">
                    <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 accent-accent" />
                    <span className="text-muted-foreground font-body text-xs leading-relaxed">{t("contact.form.consent")}</span>
                  </label>
                  <button type="submit" disabled={sending} className="w-full mt-3 py-3.5 rounded-full bg-accent text-accent-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-accent/80 transition-all duration-300 disabled:opacity-60">
                    {sending ? t("contact.form.sending") : t("contact.form.send")}
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
