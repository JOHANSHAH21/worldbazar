import { useLocation } from "wouter";
import { Home, Scissors, Leaf, ShoppingBag, CalendarCheck, Wrench } from "lucide-react";

const navItems = [
  { path: "/", label: "होम", icon: Home },
  { path: "/barber", label: "नाई", icon: Scissors },
  { path: "/sabji", label: "सब्जी-फल", icon: Leaf },
  { path: "/grocery", label: "राशन", icon: ShoppingBag },
  { path: "/booking", label: "बुकिंग", icon: CalendarCheck },
  { path: "/other", label: "अन्य", icon: Wrench },
];

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-xl max-w-lg mx-auto">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path || (item.path !== "/" && location.startsWith(item.path));
          return (
            <button
              key={item.path}
              data-testid={`nav-${item.path.replace("/", "") || "home"}`}
              onClick={() => setLocation(item.path)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-200 ${isActive ? "bg-primary/10" : ""}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              </div>
              <span className={`text-[10px] font-medium leading-tight truncate ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
