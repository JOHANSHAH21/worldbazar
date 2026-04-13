import { Leaf } from "lucide-react";
import { sabjiProducts } from "@/data/mock";
import ProductCard from "@/components/ProductCard";

const vegetables = sabjiProducts.slice(0, 6);
const fruits = sabjiProducts.slice(6);

export default function SabjiiFal() {
  return (
    <div className="pb-2">
      <div className="bg-gradient-to-br from-green-500 to-emerald-400 text-white px-5 pt-12 pb-8 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-white/20 rounded-xl">
            <Leaf size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">सब्जी-फल</h1>
            <p className="text-sm opacity-80">Fresh Vegetables & Fruits</p>
          </div>
        </div>
        <p className="text-sm opacity-80 mt-2">रोज़ ताज़ी सब्जियां और फल</p>
      </div>

      <div className="px-4 mt-6 space-y-5">
        <div>
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3">सब्जियां / Vegetables</h2>
          <div className="grid grid-cols-2 gap-3">
            {vegetables.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {fruits.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3">फल / Fruits</h2>
            <div className="grid grid-cols-2 gap-3">
              {fruits.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
