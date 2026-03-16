import { ShoppingBag, ExternalLink } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import ciryamBand from "@/assets/ciryam-band.jpg";
import ciryamBand2 from "@/assets/ciryam-band-2.jpg";
import ciryamLive from "@/assets/ciryam-live.jpg";

const products = [
  { name: "Koszulka CIRYAM Logo", price: "89 zł", category: "Odzież", image: ciryamBand },
  { name: "Koszulka \"Tour 2026\"", price: "99 zł", category: "Odzież", image: ciryamBand2 },
  { name: "Bluza CIRYAM Hoodie", price: "149 zł", category: "Odzież", image: ciryamLive },
  { name: "Płyta CD \"Dices\"", price: "49 zł", category: "Muzyka", image: ciryamBand },
  { name: "Winyl \"Dices\" LP", price: "119 zł", category: "Muzyka", image: ciryamBand2 },
  { name: "Plakat koncertowy A2", price: "39 zł", category: "Akcesoria", image: ciryamLive },
  { name: "Naszywka CIRYAM", price: "19 zł", category: "Akcesoria", image: ciryamBand },
  { name: "Czapka CIRYAM Beanie", price: "59 zł", category: "Odzież", image: ciryamBand2 },
];

const Sklep = () => (
  <main className="bg-background pt-28 md:pt-32">
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
      <FadeIn>
        <div className="flex items-center gap-3 mb-4">
          <ShoppingBag size={20} className="text-accent" />
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent">Oficjalny merch</p>
        </div>
        <h1 className="font-heading text-4xl md:text-6xl text-foreground mb-4">Sklep CIRYAM</h1>
        <p className="text-muted-foreground font-body text-sm mb-12">Koszulki, płyty, plakaty i więcej. Wspieraj zespół!</p>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => (
          <FadeIn key={product.name} delay={i * 50}>
            <div className="group bg-card border border-border overflow-hidden hover:border-accent/30 transition-colors cursor-pointer">
              <div className="aspect-square overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" loading="lazy" />
              </div>
              <div className="p-3 md:p-4">
                <p className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">{product.category}</p>
                <h3 className="font-heading text-sm text-foreground mb-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-accent font-heading text-lg">{product.price}</span>
                  <button className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground font-heading text-[10px] tracking-[0.1em] uppercase hover:bg-accent/80 transition-colors opacity-0 group-hover:opacity-100">
                    Dodaj
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={400}>
        <div className="text-center mt-12 p-8 border border-border bg-card">
          <p className="text-muted-foreground font-body text-sm mb-4">
            Pełny sklep z płatnościami online wkrótce. Tymczasem zamówienia przez:
          </p>
          <a
            href="mailto:sklep@ciryam.pl"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-accent/80 transition-colors"
          >
            <ExternalLink size={14} /> sklep@ciryam.pl
          </a>
        </div>
      </FadeIn>
    </div>
  </main>
);

export default Sklep;
