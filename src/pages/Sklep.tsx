import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Loader2, Search, Sparkles, X, ArrowUpDown } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/contexts/LangContext";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CATEGORY_MAP_PL: Record<string, string> = {
  "": "Wszystko",
  "Odzież": "Odzież",
  "Nakrycia głowy": "Nakrycia głowy",
  "Akcesoria": "Akcesoria",
  "Muzyka": "Muzyka",
};

const CATEGORY_MAP_EN: Record<string, string> = {
  "": "All",
  "Odzież": "Clothing",
  "Nakrycia głowy": "Headwear",
  "Akcesoria": "Accessories",
  "Muzyka": "Music",
};

const Sklep = () => {
  const { t, lang } = useLang();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 50 });
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

  // Get unique categories
  const categories = useMemo(() => {
    const types = new Set(products.map(p => p.node.productType).filter(Boolean));
    return ["", ...Array.from(types)];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCategory = !activeCategory || p.node.productType === activeCategory;
      const matchSearch = !searchQuery || 
        p.node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.node.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, activeCategory, searchQuery]);

  // Fetch AI recommendations
  const fetchRecommendations = async () => {
    if (products.length === 0) return;
    setAiLoading(true);
    try {
      const productList = products.map(p => ({
        title: p.node.title,
        type: p.node.productType,
        price: parseFloat(p.node.priceRange.minVariantPrice.amount).toFixed(0),
      }));

      const randomProduct = products[Math.floor(Math.random() * products.length)];

      const { data, error } = await supabase.functions.invoke('recommend-products', {
        body: {
          products: productList,
          currentProductTitle: randomProduct.node.title,
          lang,
        },
      });

      if (error) throw error;
      if (data?.suggestions) {
        setAiRecommendations(data.suggestions);
      }
    } catch (err) {
      console.error('AI recommendations error:', err);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (products.length > 0 && aiRecommendations.length === 0) {
      fetchRecommendations();
    }
  }, [products]);

  const recommendedProducts = useMemo(() => {
    return products.filter(p =>
      aiRecommendations.some(rec =>
        p.node.title.toLowerCase().includes(rec.toLowerCase()) ||
        rec.toLowerCase().includes(p.node.title.toLowerCase())
      )
    );
  }, [products, aiRecommendations]);

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

  const categoryLabels = lang === "pl" ? CATEGORY_MAP_PL : CATEGORY_MAP_EN;

  const renderProductCard = (product: ShopifyProduct, i: number) => {
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
            {product.node.productType && (
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-body">
                {categoryLabels[product.node.productType] || product.node.productType}
              </p>
            )}
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
          <p className="text-muted-foreground font-body text-sm mb-8">{t("shop.supportBand")}</p>
        </FadeIn>

        {/* Search & Filters */}
        <FadeIn delay={50}>
          <div className="mb-8 space-y-4">
            {/* Search bar */}
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "pl" ? "Szukaj produktów..." : "Search products..."}
                className="w-full pl-10 pr-10 py-2.5 rounded-full bg-card border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full font-heading text-[11px] tracking-[0.1em] uppercase transition-colors border ${
                    activeCategory === cat
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-card text-muted-foreground border-border hover:border-accent/30 hover:text-foreground"
                  }`}
                >
                  {categoryLabels[cat] || cat}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Hot Products */}
        {recommendedProducts.length > 0 && !activeCategory && !searchQuery && (
          <FadeIn delay={100}>
            <div className="mb-12 relative rounded-2xl border border-accent/20 bg-accent/[0.03] p-6 md:p-8">
              <div className="absolute -top-3 left-6 bg-accent text-accent-foreground px-4 py-1 rounded-full font-heading text-[11px] tracking-[0.15em] uppercase flex items-center gap-1.5">
                <Sparkles size={12} />
                {lang === "pl" ? "Popularne" : "Hot"}
              </div>
              <div className="flex items-center justify-between mb-5 mt-1">
                <h2 className="font-heading text-lg md:text-xl text-foreground">
                  {lang === "pl" ? "Nasze rekomendacje" : "Our Picks"}
                </h2>
                <button
                  onClick={fetchRecommendations}
                  disabled={aiLoading}
                  className="text-[10px] text-muted-foreground hover:text-foreground font-body underline underline-offset-2 transition-colors disabled:opacity-50"
                >
                  {aiLoading ? (
                    <Loader2 size={12} className="animate-spin inline" />
                  ) : (
                    lang === "pl" ? "pokaż inne" : "show more"
                  )}
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {recommendedProducts.slice(0, 3).map((product, i) => renderProductCard(product, i))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Products grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-accent" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20 border border-border rounded-xl bg-card">
              <ShoppingBag size={48} className="text-muted-foreground mx-auto mb-4" />
              <h2 className="font-heading text-2xl text-foreground mb-2">
                {searchQuery || activeCategory
                  ? (lang === "pl" ? "Brak wyników" : "No results")
                  : (lang === "pl" ? "Brak produktów" : "No products found")}
              </h2>
              <p className="text-muted-foreground font-body text-sm max-w-md mx-auto">
                {searchQuery || activeCategory
                  ? (lang === "pl" ? "Spróbuj zmienić filtr lub wyszukiwanie." : "Try adjusting your filter or search.")
                  : (lang === "pl"
                    ? "Sklep jest w trakcie uzupełniania. Wkrótce pojawią się koszulki, płyty i więcej!"
                    : "The shop is being stocked. T-shirts, records and more coming soon!")}
              </p>
            </div>
          </FadeIn>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground font-body text-xs">
                {filteredProducts.length} {lang === "pl" ? "produktów" : "products"}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product, i) => renderProductCard(product, i))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Sklep;
