import { Instagram, Facebook, Youtube } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import ciryamBand from "@/assets/ciryam-band.jpg";
import ciryamBand8 from "@/assets/ciryam-band-8.jpg";
import ciryamBand6 from "@/assets/ciryam-band-6.jpg";

const VimeoIcon = ({ size = 28 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 7.5c-.1 2.1-1.6 5-4.4 8.7-2.9 3.8-5.4 5.8-7.4 5.8-1.2 0-2.3-1.2-3.2-3.5l-1.7-6.5c-.6-2.3-1.3-3.5-2-3.5-.2 0-.7.3-1.5.9L.5 8.3c1-.8 1.9-1.7 2.8-2.5 1.3-1.1 2.2-1.7 2.9-1.8 1.5-.1 2.4 0.9 2.8 3.1.4 2.4.7 3.8.9 4.4.5 2.2 1 3.3 1.7 3.3.5 0 1.2-.7 2.1-2.2.9-1.5 1.4-2.6 1.5-3.3.1-1.2-.3-1.8-1.4-1.8-.5 0-1 .1-1.5.3 1-3.3 2.9-4.9 5.7-4.8 2.1 0 3.1 1.4 3 4.3z"/></svg>
);

const milestones = [
  { value: "1999", label: "Rok założenia" },
  { value: "5", label: "Albumów" },
  { value: "25+", label: "Lat na scenie" },
  { value: "100+", label: "Koncertów" },
];

const members = [
  {
    name: "Monika Węgrzyn",
    role: "wokal, autorka tekstów",
    bio: "Wokalistka o niepowtarzalnej barwie głosu i charyzmie scenicznej. W tekstach łączy emocję, doświadczenie i subtelną obserwację świata. Na co dzień psycholog, neurologopeda, psychoprofilaktyk, wykładowca akademicki oraz orzecznik.",
  },
  {
    name: "Robert Węgrzyn",
    role: "gitary, lider, autor tekstów",
    bio: "Założyciel CIRYAM. Z wykształcenia chemik i specjalista sterowania procesami chemicznymi, z pasji twórca muzyki, gitarzysta i menedżer zespołu. Aktywny recenzent sceny muzycznej oraz wiceprezes klubu żużlowego Wilki Krosno.",
  },
  {
    name: "Kuba Czubik",
    role: "gitara solowa, elektronika",
    bio: "Gitarzysta solowy łączący technikę, ekspresję i nowoczesne brzmienie. Pasjonat montażu teledysków oraz budowy elektroniki muzycznej. Na co dzień starszy redaktor wykonawczy ds. publikacji elektronicznej i druku.",
  },
  {
    name: "Jacek Rola",
    role: "bas",
    bio: "Basista odpowiadający za fundament i puls zespołu. Z wykształcenia polonista, nauczyciel wychowania fizycznego i informatyki. Pasjonat fotografii i długich wypraw rowerowych, który wnosi do zespołu rytm, spokój i precyzję.",
  },
];

const OZespole = () => {
  return (
    <main className="bg-background pt-28 md:pt-32">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
        <FadeIn>
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">O zespole</p>
          <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-12">CIRYAM</h1>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16">
          <FadeIn>
            <img src={ciryamBand} alt="CIRYAM zespół" className="w-full aspect-[3/4] object-cover object-[center_20%] rounded-xl" />
          </FadeIn>
          <FadeIn delay={150}>
            <div className="flex flex-col justify-center">
              <h2 className="font-heading text-3xl text-foreground mb-6">Gdzie wszystko się zaczęło</h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                Rok 1999. Sala przy Kolejowej 1 w Regionalnym Centrum Kultur Pogranicza w Krośnie. Robert Węgrzyn — gitarzysta, autor tekstów i lider z wizją —
                powołuje do życia CIRYAM. Z pasji, determinacji i potrzeby tworzenia muzyki, która porusza, inspiruje i zostawia ślad.
              </p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                Debiutanckie „Szepty dusz” (2004), „W sercu kamienia” (2006), „Człowiek motyl” (2008), międzynarodowe „Desires” (2015/2017)
                i najnowszy „Zamyślony zapach” (2023) wyznaczyły kolejne etapy drogi zespołu.
              </p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Przez lata każdy riff, każda melodia i każdy koncert budowały charakter CIRYAM — zespołu, który łączy rock, pop, alternatywę
                i subtelną elektronikę.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={200}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {milestones.map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-xl p-5 text-center">
                <span className="font-heading text-3xl md:text-4xl text-accent block mb-1">{stat.value}</span>
                <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={250}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
             <img src={ciryamBand6} alt="CIRYAM na scenie" className="w-full aspect-[16/10] object-cover object-[center_25%] rounded-xl grayscale hover:grayscale-0 transition-all duration-500" />
            <img src={ciryamBand8} alt="CIRYAM sesja zespołu" className="w-full aspect-[16/10] object-cover object-[center_25%] rounded-xl grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </FadeIn>

        <FadeIn delay={280}>
          <section className="mb-16">
            <h2 className="font-heading text-3xl text-foreground mb-6">Dlaczego właśnie CIRYAM?</h2>
            <ul className="space-y-3 text-muted-foreground font-body text-sm leading-relaxed list-disc pl-5">
              <li>Mocny, zadziorny wokal Moniki Węgrzyn i teksty, które zostają na długo.</li>
              <li>Proste, wpadające w ucho melodie połączone z nieoczywistą warstwą liryczną.</li>
              <li>Autorska mieszanka rocka, popu, alternatywy i subtelnej elektroniki.</li>
              <li>Brzmienie z potencjałem radiowym i telewizyjnym, ale bez utraty charakteru.</li>
            </ul>
          </section>
        </FadeIn>

        <FadeIn delay={300}>
          <section className="mb-16">
            <h2 className="font-heading text-3xl text-foreground mb-6">Najważniejsze momenty</h2>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
              Setki koncertów, dziesiątki tras i występy na festiwalach takich jak Metalmania, Hunter Fest, Art Rock Fest czy Cieszanów Rock Festival.
              Zespół dzielił scenę m.in. z Type O Negative, Epica i Amorphis.
            </p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
              Teledysk „W ciszy” był prezentowany na Yach Film, singiel „Venus” trafił na europejskie listy przebojów,
              a utwór „Wataha” (2019) stał się hymnem klubu Wilki Krosno.
            </p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              Dziś CIRYAM to dojrzały skład i 25 lat wspólnej drogi — budowanej z fanami, którzy przeżywają każdą nutę razem z zespołem.
            </p>
          </section>
        </FadeIn>

        <FadeIn delay={320}>
          <section className="mb-16">
            <h2 className="font-heading text-3xl text-foreground mb-6">Aktualny skład</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {members.map((member) => (
                <article key={member.name} className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-heading text-xl text-foreground mb-1">{member.name}</h3>
                  <p className="text-accent font-body text-xs uppercase tracking-[0.12em] mb-3">{member.role}</p>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{member.bio}</p>
                </article>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={350}>
          <div className="text-center">
            <h2 className="font-heading text-2xl text-foreground mb-6">Obserwuj nas</h2>
            <div className="flex justify-center gap-6">
              <a href="https://www.facebook.com/CIRYAM/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook"><Facebook size={28} /></a>
              <a href="https://www.instagram.com/ciryam__official/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram"><Instagram size={28} /></a>
              <a href="https://www.youtube.com/user/Ciryam/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="YouTube"><Youtube size={28} /></a>
              <a href="https://vimeo.com/ciryam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Vimeo"><VimeoIcon size={28} /></a>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
};

export default OZespole;
