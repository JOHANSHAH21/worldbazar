import { useState } from "react";
import { Truck, MapPin, Phone, Package, CheckCircle, Clock, Star, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatCallModal from "@/components/ChatCallModal";

const ORDERS = [
  { id: "o1", customer: "Priya Sharma", address: "Patel Nagar, Delhi", items: "Tomato, Potato (2kg)", amount: 175, status: "pickup", time: "9:15 AM", distance: "1.2 km" },
  { id: "o2", customer: "Arun Kumar", address: "Rajouri Garden, Delhi", items: "Arhar Dal, Sugar, Salt", amount: 310, status: "on-way", time: "9:45 AM", distance: "3.5 km" },
  { id: "o3", customer: "Meena Joshi", address: "Vikas Puri, Delhi", items: "Basmati Rice (5kg)", amount: 450, status: "delivered", time: "8:30 AM", distance: "4.8 km" },
];

const STATUS_CONFIG = {
  pickup: { label: "Pickup Pending", color: "bg-amber-100 text-amber-700" },
  "on-way": { label: "On the Way", color: "bg-blue-100 text-blue-700" },
  delivered: { label: "Delivered ✅", color: "bg-green-100 text-green-700" },
};

export default function DeliveryDashboard() {
  const { toast } = useToast();
  const [orders, setOrders] = useState(ORDERS);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatCustomer, setChatCustomer] = useState("");
  const [isOnDuty, setIsOnDuty] = useState(true);

  const earnings = orders.filter((o) => o.status === "delivered").reduce((s, o) => s + Math.round(o.amount * 0.15), 0);
  const active = orders.filter((o) => o.status !== "delivered").length;

  const markDelivered = (id: string) => {
    setOrders((o) => o.map((ord) => ord.id === id ? { ...ord, status: "delivered" } : ord));
    toast({ title: "Delivered! 🎉", description: "Order marked as delivered. ₹15+ earned!" });
  };

  const nextStatus = (id: string) => {
    setOrders((o) => o.map((ord) => {
      if (ord.id === id) {
        if (ord.status === "pickup") return { ...ord, status: "on-way" };
        if (ord.status === "on-way") { markDelivered(id); return ord; }
      }
      return ord;
    }));
  };

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-5 pt-12 pb-8 rounded-b-[2.5rem] text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/20 rounded-xl"><Truck size={22} /></div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Ravi Kumar</h1>
            <p className="text-sm opacity-80">Delivery Partner • WorldBazaar</p>
          </div>
          <button
            onClick={() => { setIsOnDuty(!isOnDuty); toast({ title: isOnDuty ? "🔴 Off Duty" : "🟢 On Duty", description: isOnDuty ? "No new orders assigned." : "Ready for orders!" }); }}
            className={`px-3 py-1.5 rounded-full text-xs font-black ${isOnDuty ? "bg-green-400/30" : "bg-red-400/30"}`}
          >
            {isOnDuty ? "🟢 On Duty" : "🔴 Off Duty"}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Active Orders", value: active, icon: Package },
            { label: "Today Earned", value: `₹${earnings}`, icon: Star },
            { label: "Rating", value: "4.8 ⭐", icon: Navigation },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center">
              <Icon size={15} className="mx-auto mb-1 opacity-80" />
              <p className="text-base font-bold">{value}</p>
              <p className="text-[10px] opacity-75 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-5">
        <h2 className="font-bold text-sm text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
          <Package size={14} />
          My Orders
        </h2>
        <div className="space-y-3">
          {orders.map((order) => {
            const st = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
            return (
              <div key={order.id} className="bg-card rounded-2xl border border-border shadow-sm p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{order.customer}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin size={11} />
                      <span className="truncate">{order.address}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0 ml-2 ${st.color}`}>{st.label}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{order.items}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Clock size={11} />{order.time}</span>
                  <span className="flex items-center gap-1"><Navigation size={11} />{order.distance}</span>
                  <span className="font-bold text-primary">₹{order.amount}</span>
                </div>
                {order.status !== "delivered" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => nextStatus(order.id)}
                      className="flex-1 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-1 hover:bg-primary/90 transition-all"
                    >
                      {order.status === "pickup" ? <><Package size={13} /> Picked Up</> : <><CheckCircle size={13} /> Delivered</>}
                    </button>
                    <button
                      onClick={() => { setChatCustomer(order.customer); setChatOpen(true); }}
                      className="px-3 py-2 rounded-xl bg-green-100 text-green-700 text-xs font-bold flex items-center gap-1 hover:bg-green-200 transition-all"
                    >
                      <Phone size={13} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <ChatCallModal open={chatOpen} personName={chatCustomer} personRole="Customer" onClose={() => setChatOpen(false)} />
    </div>
  );
}
