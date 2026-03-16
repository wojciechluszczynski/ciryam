import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, ShoppingBag } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/contexts/LangContext";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { lang } = useLang();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.product) setProduct(data.data.product);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetch();
  }, [handle]);

  if (loading) return (
    <main className="bg-background pt-28 md:pt-32 min-h-screen flex items-center justify-center">
      <Loader2 size={32} className="animate-spin text-accent" />
    </main>
  );

  if (!product) return (
    <main className="bg-background pt-28 md:pt-32 min-h-screen">
      <div className="max-w-[900px] mx-auto px-6 text-center py-20">
        <h1 className="font-heading text-3xl text-foreground mb-4">{lang === "pl" ? "Produkt nie znaleziony" : "Product not found"}</h1>
        <Link to="/sklep" className="text-accent font-heading text-sm uppercase hover:underline">{lang === "pl" ? "Wróć do sklepu" : "Back to shop"}</Link>
      </div>
    </main>
  );

  const variant = product.variants.edges[selectedVariantIdx]?.node;
  const images = product.images.edges;

  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product } as ShopifyProduct,
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
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
        <FadeIn>
          <Link to="/sklep" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent font-body text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> {lang === "pl" ? "Wróć do sklepu" : "Back to shop"}
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Images */}
          <FadeIn>
            <div>
              <div className="aspect-square bg-card border border-border rounded-xl overflow-hidden mb-3">
                {images[selectedImage] ? (
                  <img src={images[selectedImage].node.url} alt={images[selectedImage].node.altText || product.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground"><ShoppingBag size={48} /></div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${i === selectedImage ? "border-accent" : "border-border"}`}>
                      <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Info */}
          <FadeIn delay={150}>
            <div>
              <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-4">{product.title}</h1>
              <p className="text-accent font-heading text-2xl mb-6">
                {variant?.price.currencyCode} {parseFloat(variant?.price.amount || "0").toFixed(2)}
              </p>

              {product.description && (
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8">{product.description}</p>
              )}

              {/* Variants */}
              {product.options.filter(o => o.name !== "Title").map((option) => (
                <div key={option.name} className="mb-6">
                  <label className="font-heading text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3 block">{option.name}</label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const varIdx = product.variants.edges.findIndex(v =>
                        v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                      );
                      const isSelected = varIdx === selectedVariantIdx;
                      return (
                        <button key={value} onClick={() => setSelectedVariantIdx(varIdx >= 0 ? varIdx : 0)}
                          className={`px-4 py-2 rounded-full font-body text-sm border transition-colors ${
                            isSelected ? "border-accent text-accent bg-accent/10" : "border-border text-foreground hover:border-accent/50"
                          }`}>
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <button
                onClick={handleAddToCart}
                disabled={isCartLoading || !variant?.availableForSale}
                className="w-full py-3.5 rounded-full bg-accent text-accent-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-accent/80 transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isCartLoading ? <Loader2 size={16} className="animate-spin" /> : (
                  <>{lang === "pl" ? "Dodaj do koszyka" : "Add to cart"} <ShoppingBag size={16} /></>
                )}
              </button>

              {variant && !variant.availableForSale && (
                <p className="text-destructive font-body text-sm mt-3 text-center">
                  {lang === "pl" ? "Produkt niedostępny" : "Out of stock"}
                </p>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
