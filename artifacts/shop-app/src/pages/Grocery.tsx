import { ShoppingBag } from "lucide-react";
import { groceryProducts } from "@/data/mock";
import ProductCard from "@/components/ProductCard";

export default function Grocery() {
  return (
    <div className="pb-2">
      <div className="bg-gradient-to-br from-amber-500 to-yellow-400 text-white px-5 pt-12 pb-8 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-white/20 rounded-xl">
            <ShoppingBag size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">किराना राशन</h1>
            <p className="text-sm opacity-80">Grocery Store</p>
          </div>
        </div>
        <p className="text-sm opacity-80 mt-2">घर का पूरा सामान एक जगह</p>
      </div>

      <div className="px-4 mt-6">
        <div className="grid grid-cols-2 gap-3">
          {groceryProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
