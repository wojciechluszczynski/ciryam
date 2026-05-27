import { useLang } from "@/contexts/LangContext";
import { Download, Mail, Music, Users, Calendar, MapPin } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import bandPhoto1 from "@/assets/ciryam-band-press-2025.jpg";

const PressKit = () => {
  const { t } = useLang();

  const technicalRider = [
    { label: t("press.rider.stage"), value: t("press.rider.stageVal") },
    { label: t("press.rider.pa"), value: t("press.rider.paVal") },
    { label: t("press.rider.monitors"), value: t("press.rider.monitorsVal") },
    { label: t("press.rider.lights"), value: t("press.rider.lightsVal") },
    { label: t("press.rider.backline"), value: t("press.rider.backlineVal") },
    { label: t("press.rider.channels"), value: t("press.rider.channelsVal") },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-accent text-xs tracking-[0.3em] uppercase font-heading block mb-4">
              Press Kit
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4">
              {t("press.title")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t("press.subtitle")}
            </p>
          </div>
        </FadeIn>

        {/* Short Bio */}
        <FadeIn delay={0.1}>
          <section className="mb-16">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="p-3 rounded-full bg-accent/10 mb-3">
                <Users size={32} className="text-accent" />
              </div>
              <h2 className="text-2xl font-heading font-bold">{t("press.bio.title")}</h2>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("press.bio.p1")}</p>
              <p>{t("press.bio.p2")}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {[
                  { value: "1999", label: t("press.bio.founded") },
                  { value: "5", label: t("press.bio.albums") },
                  { value: "65", label: "Nagranych utworów" },
                  { value: "400+", label: t("press.bio.totalConcerts") },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-heading font-bold text-accent">{stat.value}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Photos */}
        <FadeIn delay={0.2}>
          <section className="mb-16">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="p-3 rounded-full bg-accent/10 mb-3">
                <Download size={32} className="text-accent" />
              </div>
              <h2 className="text-2xl font-heading font-bold">{t("press.photos.title")}</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl">{t("press.photos.desc")}</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="group relative overflow-hidden rounded-2xl border border-border">
                <img
                  src={bandPhoto1}
                  alt="CIRYAM - zdjęcie promocyjne 2025"
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <a
                  href={bandPhoto1}
                  download
                  className="absolute bottom-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-xs font-heading uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2"
                >
                  <Download size={14} />
                  {t("press.photos.download")}
                </a>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Technical Rider */}
        <FadeIn delay={0.3}>
          <section className="mb-16">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="p-3 rounded-full bg-accent/10 mb-3">
                <Music size={32} className="text-accent" />
              </div>
              <h2 className="text-2xl font-heading font-bold">{t("press.rider.title")}</h2>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <p className="text-muted-foreground mb-6">{t("press.rider.intro")}</p>
              <div className="space-y-4">
                {technicalRider.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-border last:border-0"
                  >
                    <span className="text-sm font-heading font-semibold text-foreground uppercase tracking-wider min-w-[180px] shrink-0">
                      {item.label}
                    </span>
                    <span className="text-muted-foreground text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-6 italic">
                {t("press.rider.note")}
              </p>
              <div className="mt-6">
                <a
                  href="/CIRYAM-RIDER-2026.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-accent-foreground font-heading text-xs tracking-[0.15em] uppercase hover:bg-accent/80 transition-colors"
                >
                  <Download size={14} />
                  {t("press.rider.download")}
                </a>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Contact */}
        <FadeIn delay={0.4}>
          <section className="text-center">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
              <div className="inline-flex p-3 rounded-full bg-accent/10 mb-4">
                <Mail size={36} className="text-accent" />
              </div>
              <h2 className="text-2xl font-heading font-bold mb-3">{t("press.contact.title")}</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{t("press.contact.desc")}</p>
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
                <div className="border border-border rounded-xl p-5">
                  <p className="font-heading text-[10px] tracking-[0.2em] uppercase text-accent mb-2">Management</p>
                  <p className="text-foreground font-heading text-base">Robert Węgrzyn</p>
                  <a href="mailto:okoartmanagement@gmail.com" className="block text-muted-foreground text-sm hover:text-accent transition-colors mt-1">okoartmanagement@gmail.com</a>
                  <a href="tel:+48605103072" className="block text-muted-foreground text-sm hover:text-accent transition-colors">+48 605 103 072</a>
                </div>
                <div className="border border-border rounded-xl p-5">
                  <p className="font-heading text-[10px] tracking-[0.2em] uppercase text-accent mb-2">Booking Manager</p>
                  <p className="text-foreground font-heading text-base">Wojciech Łuszczyński</p>
                  <a href="mailto:booking@ciryam.pl" className="block text-muted-foreground text-sm hover:text-accent transition-colors mt-1">booking@ciryam.pl</a>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
      </div>
    </main>
  );
};

export default PressKit;
