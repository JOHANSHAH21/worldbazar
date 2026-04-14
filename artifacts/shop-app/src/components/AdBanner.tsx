import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ADS = [
  { id: 1, bg: "from-rose-500 to-pink-400", title: "Mega Sale!", subtitle: "Up to 50% OFF on Grocery", emoji: "🛒", badge: "TODAY ONLY" },
  { id: 2, bg: "from-violet-500 to-purple-400", title: "Free Delivery", subtitle: "On orders above ₹299", emoji: "🛵", badge: "LIMITED TIME" },
  { id: 3, bg: "from-emerald-500 to-teal-400", title: "Hospital Online", subtitle: "Consult doctors — 24/7", emoji: "🏥", badge: "NEW" },
  { id: 4, bg: "from-amber-500 to-orange-400", title: "Seller? Join Us!", subtitle: "Sell globally on WorldBazaar", emoji: "🌍", badge: "FREE" },
  { id: 5, bg: "from-blue-500 to-cyan-400", title: "Pay with UPI", subtitle: "Get ₹20 cashback every order", emoji: "💳", badge: "CASHBACK" },
];

export default function AdBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % ADS.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const ad = ADS[current];

  return (
    <div className="px-4 py-3">
      <div className={`relative bg-gradient-to-r ${ad.bg} rounded-2xl px-4 py-3 text-white shadow-md overflow-hidden transition-all duration-500`}>
        <div className="absolute top-0 right-0 bottom-0 flex items-center pr-3 text-5xl opacity-20 pointer-events-none select-none">
          {ad.emoji}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{ad.emoji}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="font-bold text-sm">{ad.title}</p>
              <span className="text-[9px] font-black bg-white/30 px-1.5 py-0.5 rounded-full tracking-wide">{ad.badge}</span>
            </div>
            <p className="text-xs opacity-85">{ad.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 mt-2">
          {ADS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-5 bg-white" : "w-1.5 bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
