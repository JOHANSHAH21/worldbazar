import { useState } from "react";
import { Search, TrendingUp, Sparkles } from "lucide-react";
import { sabjiProducts, groceryProducts, barberServices, otherServices } from "@/data/mock";
import { useLocation } from "wouter";
import ProductCard from "@/components/ProductCard";
import ServiceCard from "@/components/ServiceCard";
import { useApp } from "@/context/AppContext";
import { T } from "@/data/i18n";

export default function Home() {
  const [search, setSearch] = useState("");
  const [, setLocation] = useLocation();
  const { lang } = useApp();
  const t = T[lang];

  const popularProducts = [...sabjiProducts.slice(0, 3), ...groceryProducts.slice(0, 3)];
  const topServices = [...barberServices.slice(0, 2), ...otherServices.slice(0, 2)];

  const searchLower = search.toLowerCase();
  const filteredProducts = search
    ? [...sabjiProducts, ...groceryProducts].filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.nameHindi.includes(search)
      )
    : [];
  const filteredServices = search
    ? [...barberServices, ...otherServices].filter(
        (s) =>
          s.name.toLowerCase().includes(searchLower) ||
          s.nameHindi.includes(search)
      )
    : [];

  return (
    <div className="pb-2">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-orange-400 text-primary-foreground px-5 pt-10 pb-8 rounded-b-[2.5rem]">
        <p className="text-sm font-medium opacity-80 mb-1">{t.greeting}</p>
        <h1 className="text-2xl font-bold mb-1">{t.appName}</h1>
        <p className="text-sm opacity-80">{t.tagline}</p>

        {/* Search */}
        <div className="relative mt-4">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            data-testid="home-search"
            type="search"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white text-foreground placeholder:text-muted-foreground text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="px-4 mt-5 space-y-6">
        {/* Search Results */}
        {search.length > 0 && (
          <div>
            <h2 className="text-base font-bold mb-3 flex items-center gap-2">
              <Search size={16} className="text-primary" />
              Search Results
            </h2>
            {filteredProducts.length === 0 && filteredServices.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">{t.noResults}</p>
            ) : (
              <>
                {filteredProducts.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                  </div>
                )}
                {filteredServices.length > 0 && (
                  <div className="space-y-3">
                    {filteredServices.map((s) => <ServiceCard key={s.id} service={s} />)}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Category Shortcuts */}
        {!search && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: t.barber, sub: "Barber", path: "/barber", bg: "bg-orange-50 border-orange-200", icon: "✂️" },
              { label: t.vegetables, sub: "Veggies", path: "/sabji", bg: "bg-green-50 border-green-200", icon: "🥦" },
              { label: t.grocery, sub: "Grocery", path: "/grocery", bg: "bg-amber-50 border-amber-200", icon: "🛒" },
              { label: t.other, sub: "Services", path: "/other", bg: "bg-blue-50 border-blue-200", icon: "🔧" },
              { label: t.booking, sub: "Booking", path: "/booking", bg: "bg-purple-50 border-purple-200", icon: "📅" },
              { label: t.worldwide, sub: "Global", path: "/worldwide", bg: "bg-violet-50 border-violet-200", icon: "🌍" },
            ].map((cat) => (
              <button
                key={cat.path + cat.label}
                data-testid={`category-${cat.path.replace("/","")}`}
                onClick={() => setLocation(cat.path)}
                className={`${cat.bg} border rounded-2xl p-3 flex flex-col items-center gap-1 hover:shadow-md transition-all active:scale-95`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-bold leading-tight text-center truncate w-full">{cat.label}</span>
                <span className="text-[10px] text-muted-foreground">{cat.sub}</span>
              </button>
            ))}
          </div>
        )}

        {/* Popular Products */}
        {!search && (
          <div>
            <h2 className="text-base font-bold mb-3 flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" />
              {t.popularProducts}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {popularProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Top Services */}
        {!search && (
          <div>
            <h2 className="text-base font-bold mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              {t.topServices}
            </h2>
            <div className="space-y-3">
              {topServices.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
