import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Loader2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/contexts/LangContext";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

const Sklep = () => {
  const { t, lang } = useLang();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 20 });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(lang === "pl" ? "Dodano do koszyka!" : "Added to cart!", { position: "top-center" });
  };

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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-accent" />
          </div>
        ) : products.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20 border border-border rounded-xl bg-card">
              <ShoppingBag size={48} className="text-muted-foreground mx-auto mb-4" />
              <h2 className="font-heading text-2xl text-foreground mb-2">
                {lang === "pl" ? "Brak produktów" : "No products found"}
              </h2>
              <p className="text-muted-foreground font-body text-sm max-w-md mx-auto">
                {lang === "pl"
                  ? "Sklep jest w trakcie uzupełniania. Wkrótce pojawią się koszulki, płyty i więcej!"
                  : "The shop is being stocked. T-shirts, records and more coming soon!"}
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {products.map((product, i) => {
              const img = product.node.images.edges[0]?.node;
              const price = product.node.priceRange.minVariantPrice;
              return (
                <FadeIn key={product.node.id} delay={i * 50}>
                  <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-colors">
                    <Link to={`/product/${product.node.handle}`}>
                      <div className="aspect-square overflow-hidden bg-secondary">
                        {img ? (
                          <img src={img.url} alt={img.altText || product.node.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <ShoppingBag size={32} />
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-3 md:p-4">
                      <Link to={`/product/${product.node.handle}`}>
                        <h3 className="font-heading text-sm text-foreground mb-1 hover:text-accent transition-colors">{product.node.title}</h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <span className="text-accent font-heading text-lg">
                          {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={isCartLoading}
                          className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground font-heading text-[10px] tracking-[0.1em] uppercase hover:bg-accent/80 transition-colors disabled:opacity-60"
                        >
                          {isCartLoading ? <Loader2 size={12} className="animate-spin" /> : (lang === "pl" ? "Dodaj" : "Add")}
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Sklep;
