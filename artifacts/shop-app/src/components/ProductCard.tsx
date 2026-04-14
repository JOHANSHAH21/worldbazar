import { Plus, Check, AlertCircle } from "lucide-react";
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
  const isOutOfStock = !product.inStock;

  const handleAdd = () => {
    if (isOutOfStock) return;
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      data-testid={`product-card-${product.id}`}
      className={`bg-card rounded-2xl border shadow-xs p-3 flex flex-col gap-2 hover:shadow-md transition-shadow ${
        isOutOfStock ? "border-red-100 opacity-75" : "border-card-border"
      }`}
    >
      <div className="text-center mb-1 relative">
        {isOutOfStock && (
          <span className="absolute -top-1 right-0 text-[9px] font-black bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">
            OUT
          </span>
        )}
        {!isOutOfStock && product.stock !== undefined && product.stock <= 15 && (
          <span className="absolute -top-1 right-0 text-[9px] font-black bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
            {product.stock} left
          </span>
        )}
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
          disabled={isOutOfStock}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
            isOutOfStock
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : justAdded
              ? "bg-green-500 text-white"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {isOutOfStock ? (
            <><AlertCircle size={13} /> Out</>
          ) : justAdded ? (
            <><Check size={14} /> {t.added}</>
          ) : (
            <><Plus size={14} /> {t.addToCart}</>
          )}
        </button>
      </div>
      {cartItem && !isOutOfStock && (
        <div className="text-[10px] text-center text-primary font-medium">
          {cartItem.quantity} {t.inCart}
        </div>
      )}
    </div>
  );
}
