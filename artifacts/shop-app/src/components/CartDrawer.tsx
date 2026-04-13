import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { toast } = useToast();

  const handleOrder = () => {
    if (cart.length === 0) return;
    clearCart();
    setOpen(false);
    toast({
      title: "Order Placed!",
      description: `आपका order ₹${totalPrice} का confirm हो गया है!`,
    });
  };

  return (
    <>
      {/* Cart button */}
      <button
        data-testid="cart-button"
        onClick={() => setOpen(true)}
        className="relative p-2 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 transition-all active:scale-95"
      >
        <ShoppingCart size={22} />
        {totalItems > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[60] bg-background rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out max-w-lg mx-auto ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-primary" />
            <h2 className="text-lg font-bold">Cart ({totalItems} items)</h2>
          </div>
          <button
            data-testid="cart-close"
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[55vh] px-5 py-3 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <ShoppingCart size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">Cart खाली है</p>
              <p className="text-sm mt-1">कुछ items add करें</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                data-testid={`cart-item-${item.product.id}`}
                className="flex items-center gap-3 bg-card rounded-2xl p-3 border border-card-border shadow-xs"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{item.product.nameHindi}</p>
                  <p className="text-xs text-muted-foreground">{item.product.name}</p>
                  <p className="text-sm font-bold text-primary mt-0.5">₹{item.product.price}/{item.product.unit}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    data-testid={`cart-decrease-${item.product.id}`}
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-7 text-center font-bold text-sm">{item.quantity}</span>
                  <button
                    data-testid={`cart-increase-${item.product.id}`}
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                  >
                    <Plus size={13} />
                  </button>
                </div>
                <button
                  data-testid={`cart-remove-${item.product.id}`}
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-1.5 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-5 py-4 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-muted-foreground">Total</span>
              <span className="text-xl font-bold text-primary">₹{totalPrice}</span>
            </div>
            <Button
              data-testid="order-now-button"
              onClick={handleOrder}
              className="w-full h-12 text-base font-bold rounded-2xl"
            >
              Order Now
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
