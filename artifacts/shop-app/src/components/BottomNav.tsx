import { useLocation } from "wouter";
import { Home, Scissors, Leaf, ShoppingBag, CalendarCheck, Wrench, Globe, Store } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { T } from "@/data/i18n";

export default function BottomNav() {
  const [location, setLocation] = useLocation();
  const { lang, role } = useApp();
  const t = T[lang];

  const customerNavItems = [
    { path: "/", label: t.home, icon: Home },
    { path: "/barber", label: t.barber, icon: Scissors },
    { path: "/sabji", label: t.vegetables, icon: Leaf },
    { path: "/grocery", label: t.grocery, icon: ShoppingBag },
    { path: "/booking", label: t.booking, icon: CalendarCheck },
    { path: "/other", label: t.other, icon: Wrench },
    { path: "/worldwide", label: t.worldwide, icon: Globe },
  ];

  const sellerNavItems = [
    { path: "/", label: t.home, icon: Home },
    { path: "/seller", label: t.sellerDashboard, icon: Store },
    { path: "/worldwide", label: t.worldwide, icon: Globe },
    { path: "/barber", label: t.barber, icon: Scissors },
    { path: "/sabji", label: t.vegetables, icon: Leaf },
    { path: "/grocery", label: t.grocery, icon: ShoppingBag },
    { path: "/booking", label: t.booking, icon: CalendarCheck },
  ];

  const navItems = role === "seller" ? sellerNavItems : customerNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-xl max-w-lg mx-auto">
      <div className="flex items-center justify-around py-1.5 overflow-x-auto scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location === item.path ||
            (item.path !== "/" && location.startsWith(item.path));
          return (
            <button
              key={item.path + item.label}
              data-testid={`nav-${item.path.replace("/", "") || "home"}`}
              onClick={() => setLocation(item.path)}
              className={`flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-xl transition-all duration-200 min-w-0 flex-1 flex-shrink-0 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all duration-200 ${isActive ? "bg-primary/10" : ""}`}
              >
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
              </div>
              <span
                className={`text-[9px] font-medium leading-tight truncate w-full text-center ${
                  isActive ? "font-semibold" : ""
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
