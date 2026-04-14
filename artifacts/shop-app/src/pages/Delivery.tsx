import { useState, useEffect } from "react";
import { MapPin, Phone, MessageCircle, Package, Bike, Car, Truck, Plane, CheckCircle, Clock } from "lucide-react";
import { DELIVERY_STEPS } from "@/data/mock";
import { useApp } from "@/context/AppContext";
import { T } from "@/data/i18n";
import ChatCallModal from "@/components/ChatCallModal";
import { useToast } from "@/hooks/use-toast";

const TRANSPORT = [
  { id: "bike", icon: Bike, label: "Bike", eta: "15-25 min", cost: "Free", color: "text-primary" },
  { id: "car", icon: Car, label: "Car", eta: "20-35 min", cost: "₹29", color: "text-blue-600" },
  { id: "truck", icon: Truck, label: "Truck (Large)", eta: "45-60 min", cost: "₹149", color: "text-amber-600" },
  { id: "air", icon: Plane, label: "Air Express", eta: "Same day", cost: "₹499", color: "text-purple-600" },
];

const GPS_POSITIONS = [
  { lat: 28.6139, lng: 77.2090, area: "Connaught Place" },
  { lat: 28.6200, lng: 77.2150, area: "Patel Nagar" },
  { lat: 28.6250, lng: 77.2200, area: "Rajouri Garden" },
  { lat: 28.6300, lng: 77.2250, area: "Tilak Nagar" },
  { lat: 28.6350, lng: 77.2300, area: "Vikas Puri" },
];

export default function Delivery() {
  const { lang } = useApp();
  const t = T[lang];
  const { toast } = useToast();
  const [step, setStep] = useState(3);
  const [transport, setTransport] = useState("bike");
  const [gpsIdx, setGpsIdx] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const t2 = setInterval(() => {
      setGpsIdx((i) => (i + 1) % GPS_POSITIONS.length);
    }, 3000);
    return () => clearInterval(t2);
  }, []);

  const gps = GPS_POSITIONS[gpsIdx];

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-400 px-4 pt-5 pb-6 text-white">
        <h1 className="text-xl font-bold mb-1">🛵 Delivery & Transport</h1>
        <p className="text-white/80 text-sm">Live tracking • GPS • Multiple transport options</p>
      </div>

      {/* Live GPS Card */}
      <div className="px-4 py-4">
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 h-36 flex items-center justify-center relative">
            <div className="text-center text-white">
              <div className="relative inline-block">
                <div className="w-5 h-5 rounded-full bg-primary animate-ping absolute top-0 left-0 opacity-70" />
                <MapPin size={24} className="text-primary relative z-10" />
              </div>
              <p className="text-xs mt-2 font-mono opacity-80">{gps.lat.toFixed(4)}°N, {gps.lng.toFixed(4)}°E</p>
              <p className="text-sm font-bold mt-0.5">{gps.area}, Delhi</p>
            </div>
            <div className="absolute top-2 right-3 flex items-center gap-1 bg-green-500/20 border border-green-400/30 px-2 py-0.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-green-300 font-bold">LIVE GPS</span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">R</div>
              <div className="flex-1">
                <p className="font-bold text-sm">Ravi Kumar — Delivery Partner</p>
                <p className="text-xs text-muted-foreground">⭐ 4.8 • 230+ deliveries</p>
              </div>
              <button
                data-testid="call-delivery-boy"
                onClick={() => setChatOpen(true)}
                className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all"
              >
                <Phone size={18} />
              </button>
              <button
                data-testid="chat-delivery-boy"
                onClick={() => setChatOpen(true)}
                className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all"
              >
                <MessageCircle size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Tracking Steps */}
      <div className="px-4 pb-4">
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3">Order Progress</h2>
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="relative">
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border" />
            <div className="space-y-4">
              {DELIVERY_STEPS.map((s, i) => {
                const done = i < step;
                const active = i === step - 1;
                return (
                  <div key={s.id} className="flex items-center gap-4 relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all ${
                      done ? "bg-primary text-primary-foreground" : active ? "bg-primary/20 border-2 border-primary" : "bg-muted"
                    }`}>
                      {done ? <CheckCircle size={16} /> : active ? <Clock size={14} className="text-primary" /> : <span className="text-xs text-muted-foreground">{s.id}</span>}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-bold ${done || active ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</p>
                      <p className="text-[11px] text-muted-foreground">{s.labelHindi}</p>
                    </div>
                    {active && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold animate-pulse">Now</span>}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-2 mt-4 pt-3 border-t border-border">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              className="flex-1 py-2 rounded-xl bg-muted text-sm font-bold hover:bg-muted/80 transition-all"
            >← Prev</button>
            <button
              onClick={() => {
                const next = Math.min(5, step + 1);
                setStep(next);
                if (next === 5) toast({ title: "Delivered! 🎉", description: "Your order has been delivered. Rate your experience." });
              }}
              className="flex-1 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all"
            >
              Next Step →
            </button>
          </div>
        </div>
      </div>

      {/* Transport Options */}
      <div className="px-4 pb-4">
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3">Transport Options</h2>
        <div className="space-y-2">
          {TRANSPORT.map(({ id, icon: Icon, label, eta, cost, color }) => (
            <button key={id} onClick={() => {
              setTransport(id);
              toast({ title: `${label} selected`, description: `ETA: ${eta} • Cost: ${cost}` });
            }}
              data-testid={`transport-${id}`}
              className={`w-full flex items-center gap-4 p-3.5 rounded-2xl border-2 transition-all text-left ${
                transport === id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30 bg-card"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${color}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground">ETA: {eta}</p>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${cost === "Free" ? "text-green-600" : "text-foreground"}`}>{cost}</p>
              </div>
              {transport === id && <span className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Order Detail */}
      <div className="px-4 pb-4">
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3">
            <Package size={20} className="text-primary" />
            <div className="flex-1">
              <p className="font-bold text-sm">Order #WB-2024-8821</p>
              <p className="text-xs text-muted-foreground">Tomato, Potato, Arhar Dal • ₹175</p>
            </div>
            <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-bold">On the Way</span>
          </div>
        </div>
      </div>

      <ChatCallModal open={chatOpen} personName="Ravi Kumar" personRole="Delivery Partner" onClose={() => setChatOpen(false)} />
    </div>
  );
}
