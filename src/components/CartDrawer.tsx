import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useLang } from "@/contexts/LangContext";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const { lang } = useLang();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  const currency = items[0]?.price.currencyCode || 'PLN';

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative text-foreground hover:text-accent transition-colors" aria-label="Cart">
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-heading">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-border">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-heading text-xl tracking-wide text-foreground">
            {lang === "pl" ? "Koszyk" : "Cart"}
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-body text-sm">
                  {lang === "pl" ? "Twój koszyk jest pusty" : "Your cart is empty"}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0 space-y-4">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-3 p-3 bg-card rounded-xl border border-border">
                    <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-sm text-foreground truncate">{item.product.node.title}</h4>
                      {item.variantTitle !== "Default Title" && (
                        <p className="text-xs text-muted-foreground font-body">{item.selectedOptions.map(o => o.value).join(' / ')}</p>
                      )}
                      <p className="text-accent font-heading text-base">{currency} {parseFloat(item.price.amount).toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button onClick={() => removeItem(item.variantId)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 size={14} />
                      </button>
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-6 h-6 rounded border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-body text-foreground">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-6 h-6 rounded border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-shrink-0 space-y-4 pt-4 border-t border-border mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-heading text-base text-foreground">{lang === "pl" ? "Razem" : "Total"}</span>
                  <span className="font-heading text-xl text-accent">{currency} {totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isLoading || isSyncing}
                  className="w-full py-3.5 rounded-full bg-accent text-accent-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-accent/80 transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isLoading || isSyncing ? <Loader2 size={16} className="animate-spin" /> : (
                    <>{lang === "pl" ? "Przejdź do płatności" : "Proceed to checkout"} <ExternalLink size={14} /></>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
