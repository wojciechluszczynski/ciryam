import { ShoppingBag, ExternalLink } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/contexts/LangContext";
import merchTshirt from "@/assets/merch-tshirt.jpg";
import merchHoodie from "@/assets/merch-hoodie.jpg";
import merchCd from "@/assets/merch-cd.jpg";
import merchVinyl from "@/assets/merch-vinyl.jpg";
import merchPoster from "@/assets/merch-poster.jpg";
import merchBeanie from "@/assets/merch-beanie.jpg";

const Sklep = () => {
  const { t } = useLang();

  const products = [
    { name: t("product.tshirt"), price: "89 zł", category: t("product.cat.clothing"), image: merchTshirt },
    { name: t("product.hoodie"), price: "149 zł", category: t("product.cat.clothing"), image: merchHoodie },
    { name: t("product.cd"), price: "49 zł", category: t("product.cat.music"), image: merchCd },
    { name: t("product.vinyl"), price: "119 zł", category: t("product.cat.music"), image: merchVinyl },
    { name: t("product.poster"), price: "39 zł", category: t("product.cat.accessories"), image: merchPoster },
    { name: t("product.beanie"), price: "59 zł", category: t("product.cat.clothing"), image: merchBeanie },
  ];

  return (
    <main className="bg-background pt-28 md:pt-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag size={20} className="text-accent" />
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent">{t("shop.officialMerch")}</p>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-4">{t("shop.title")}</h1>
          <p className="text-muted-foreground font-body text-sm mb-12">{t("shop.supportBand")}</p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {products.map((product, i) => (
            <FadeIn key={product.name} delay={i * 50}>
              <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-colors cursor-pointer">
                <div className="aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-3 md:p-4">
                  <p className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="font-heading text-sm text-foreground mb-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-accent font-heading text-lg">{product.price}</span>
                    <button className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground font-heading text-[10px] tracking-[0.1em] uppercase hover:bg-accent/80 transition-colors opacity-0 group-hover:opacity-100">
                      {t("shop.add")}
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <div className="text-center mt-12 p-8 border border-border rounded-xl bg-card">
            <p className="text-muted-foreground font-body text-sm mb-4">{t("shop.orderInfo")}</p>
            <a href="mailto:sklep@ciryam.pl"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-accent/80 transition-colors">
              <ExternalLink size={14} /> sklep@ciryam.pl
            </a>
          </div>
        </FadeIn>
      </div>
    </main>
  );
};

export default Sklep;
