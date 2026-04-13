import { Scissors, Zap, Heart, Droplet, Star, Smile, Wrench, Camera, BookOpen, Wind, UtensilsCrossed, Clock } from "lucide-react";
import { Service } from "@/data/mock";
import { useLocation } from "wouter";
import { useApp } from "@/context/AppContext";
import { T } from "@/data/i18n";

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  scissors: Scissors,
  zap: Zap,
  heart: Heart,
  droplet: Droplet,
  star: Star,
  smile: Smile,
  wrench: Wrench,
  camera: Camera,
  "book-open": BookOpen,
  wind: Wind,
  utensils: UtensilsCrossed,
};

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [, setLocation] = useLocation();
  const { lang } = useApp();
  const t = T[lang];
  const Icon = iconMap[service.icon] || Wrench;

  const handleBookNow = () => {
    setLocation(`/booking?service=${encodeURIComponent(service.name)}`);
  };

  return (
    <div
      data-testid={`service-card-${service.id}`}
      className="bg-card rounded-2xl border border-card-border shadow-xs p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary flex-shrink-0">
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm leading-tight">{service.nameHindi}</p>
          <p className="text-xs text-muted-foreground">{service.name}</p>
          {service.duration && (
            <p className="text-xs text-muted-foreground mt-0.5">{service.duration}</p>
          )}
          {service.description && (
            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{service.description}</p>
          )}
        </div>
        <span className="flex-shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-lg bg-green-100 text-green-700 flex items-center gap-1">
          <Clock size={8} />
          {t.available247}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-primary">
          {typeof service.price === "number" ? `₹${service.price}` : `₹${service.price}`}
        </span>
        <button
          data-testid={`book-now-${service.id}`}
          onClick={handleBookNow}
          className="px-4 py-1.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95"
        >
          {t.bookNow}
        </button>
      </div>
    </div>
  );
}
