import { ShoppingBag } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/contexts/LangContext";

const Sklep = () => {
  const { lang } = useLang();

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <FadeIn>
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
              <ShoppingBag size={32} className="text-accent" />
            </div>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl text-foreground mb-6">
            {lang === "pl" ? "Sklep" : "Shop"}
          </h1>

          <div className="w-16 h-px bg-accent/30 mx-auto mb-8" />

          <p className="font-body text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
            {lang === "pl"
              ? "Oficjalny sklep CIRYAM jest w przygotowaniu."
              : "The official CIRYAM shop is coming soon."}
          </p>

          <p className="font-body text-sm text-muted-foreground/60 mb-10">
            {lang === "pl"
              ? "Już wkrótce znajdziesz tu koszulki, płyty, akcesoria i więcej. Bądź na bieżąco!"
              : "T-shirts, CDs, accessories and more — stay tuned!"}
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-accent/20 text-accent font-heading text-sm tracking-[0.15em] uppercase">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {lang === "pl" ? "Wkrótce" : "Coming soon"}
          </div>
        </FadeIn>
      </div>
    </main>
  );
};

export default Sklep;
