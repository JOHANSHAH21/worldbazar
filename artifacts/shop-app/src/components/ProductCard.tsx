import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { Product } from "@/data/mock";
import { useCart } from "@/context/CartContext";
import { useApp } from "@/context/AppContext";
import { T } from "@/data/i18n";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, cart } = useCart();
  const { lang } = useApp();
  const t = T[lang];
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = cart.find((i) => i.product.id === product.id);

  const handleAdd = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      data-testid={`product-card-${product.id}`}
      className="bg-card rounded-2xl border border-card-border shadow-xs p-3 flex flex-col gap-2 hover:shadow-md transition-shadow"
    >
      <div className="text-center mb-1">
        <p className="text-lg font-bold">{product.nameHindi}</p>
        <p className="text-xs text-muted-foreground">{product.name}</p>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div>
          <span className="text-base font-bold text-primary">₹{product.price}</span>
          <span className="text-xs text-muted-foreground">/{product.unit}</span>
        </div>
        <button
          data-testid={`add-to-cart-${product.id}`}
          onClick={handleAdd}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
            justAdded
              ? "bg-green-500 text-white"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {justAdded ? <Check size={14} /> : <Plus size={14} />}
          {justAdded ? t.added : t.addToCart}
        </button>
      </div>
      {cartItem && (
        <div className="text-[10px] text-center text-primary font-medium">
          {cartItem.quantity} {t.inCart}
        </div>
      )}
    </div>
  );
}
