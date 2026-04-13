import { Globe, Star, Package, MapPin, Clock } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { T } from "@/data/i18n";

interface WorldSeller {
  id: string;
  name: string;
  country: string;
  flag: string;
  product: string;
  price: string;
  rating: number;
  orders: number;
  available247: boolean;
  category: string;
}

const WORLD_SELLERS: WorldSeller[] = [
  { id: "w1", name: "Rahul Spices Co.", country: "India", flag: "🇮🇳", product: "Premium Turmeric Powder", price: "₹180/kg", rating: 4.9, orders: 2847, available247: true, category: "Grocery" },
  { id: "w2", name: "Casa Verde", country: "Mexico", flag: "🇲🇽", product: "Organic Avocado 6-pack", price: "₹320/pack", rating: 4.7, orders: 1203, available247: true, category: "Fruits" },
  { id: "w3", name: "Tokyo Craft Hair", country: "Japan", flag: "🇯🇵", product: "Premium Haircut", price: "₹450/session", rating: 5.0, orders: 891, available247: false, category: "Barber" },
  { id: "w4", name: "Al Madina Foods", country: "Saudi Arabia", flag: "🇸🇦", product: "Medjool Dates 1kg", price: "₹650/kg", rating: 4.8, orders: 3421, available247: true, category: "Grocery" },
  { id: "w5", name: "Café do Brasil", country: "Brazil", flag: "🇧🇷", product: "Arabica Coffee Beans", price: "₹540/250g", rating: 4.9, orders: 5672, available247: true, category: "Grocery" },
  { id: "w6", name: "Lyon Patisserie", country: "France", flag: "🇫🇷", product: "Artisan Croissants (6)", price: "₹890/box", rating: 4.8, orders: 723, available247: false, category: "Bakery" },
  { id: "w7", name: "Dragon Garden", country: "China", flag: "🇨🇳", product: "Oolong Tea Premium", price: "₹380/100g", rating: 4.6, orders: 2134, available247: true, category: "Grocery" },
  { id: "w8", name: "Berlin FixIt Pro", country: "Germany", flag: "🇩🇪", product: "Electrician Service", price: "₹1200/hr", rating: 4.7, orders: 344, available247: false, category: "Services" },
  { id: "w9", name: "Saffron House", country: "Iran", flag: "🇮🇷", product: "Pure Saffron 1g", price: "₹450/g", rating: 5.0, orders: 1876, available247: true, category: "Spices" },
  { id: "w10", name: "Mama's Kitchen", country: "Nigeria", flag: "🇳🇬", product: "Jollof Rice Tiffin", price: "₹190/day", rating: 4.8, orders: 987, available247: true, category: "Tiffin" },
  { id: "w11", name: "Seoul Beauty", country: "South Korea", flag: "🇰🇷", product: "Facial Treatment", price: "₹850/session", rating: 4.9, orders: 612, available247: false, category: "Barber" },
  { id: "w12", name: "Himalayan Farms", country: "Nepal", flag: "🇳🇵", product: "Organic Honey 500g", price: "₹280/bottle", rating: 4.8, orders: 2310, available247: true, category: "Grocery" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Grocery: "bg-amber-100 text-amber-700",
  Fruits: "bg-green-100 text-green-700",
  Barber: "bg-orange-100 text-orange-700",
  Bakery: "bg-rose-100 text-rose-700",
  Services: "bg-blue-100 text-blue-700",
  Spices: "bg-red-100 text-red-700",
  Tiffin: "bg-purple-100 text-purple-700",
};

export default function WorldwideSellers() {
  const { lang } = useApp();
  const t = T[lang];

  return (
    <div className="pb-2">
      <div className="bg-gradient-to-br from-violet-600 to-indigo-500 text-white px-5 pt-12 pb-8 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-white/20 rounded-xl">
            <Globe size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t.worldwideSellers}</h1>
            <p className="text-sm opacity-80">From across the globe</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
          </span>
          <span className="text-xs opacity-80">{WORLD_SELLERS.length} sellers live worldwide</span>
        </div>
      </div>

      <div className="px-4 mt-5 space-y-3">
        {WORLD_SELLERS.map((seller) => (
          <div
            key={seller.id}
            data-testid={`world-seller-${seller.id}`}
            className="bg-card rounded-2xl border border-card-border shadow-xs p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl flex-shrink-0">{seller.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-sm leading-tight">{seller.name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin size={10} />
                      <span>{seller.country}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${CATEGORY_COLORS[seller.category] ?? "bg-muted text-muted-foreground"}`}>
                      {seller.category}
                    </span>
                    {seller.available247 && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-lg bg-green-100 text-green-700 flex items-center gap-1">
                        <Clock size={8} />
                        {t.available247}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm font-semibold mt-2 text-foreground">{seller.product}</p>
                <p className="text-base font-bold text-primary mt-0.5">{seller.price}</p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star size={11} className="text-yellow-500 fill-yellow-500" />
                      {seller.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package size={11} />
                      {seller.orders.toLocaleString()} orders
                    </span>
                  </div>
                  <button
                    data-testid={`contact-seller-${seller.id}`}
                    className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-all active:scale-95"
                  >
                    {t.bookNow}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
