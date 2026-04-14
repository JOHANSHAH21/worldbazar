import { useState } from "react";
import { Store, Package, TrendingUp, Eye, Star, Plus, Globe, X, ToggleLeft, ToggleRight, Users, Video, Phone } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { T } from "@/data/i18n";
import { useToast } from "@/hooks/use-toast";
import ChatCallModal from "@/components/ChatCallModal";

interface SellerProduct {
  id: string;
  name: string;
  price: number;
  unit: string;
  views: number;
  orders: number;
  rating: number;
  published: boolean;
  inStock: boolean;
  stock: number;
}

const INITIAL_PRODUCTS: SellerProduct[] = [
  { id: "sp1", name: "Homemade Pickle", price: 150, unit: "jar", views: 1247, orders: 89, rating: 4.8, published: true, inStock: true, stock: 24 },
  { id: "sp2", name: "Organic Honey", price: 320, unit: "bottle", views: 892, orders: 34, rating: 4.9, published: true, inStock: true, stock: 12 },
];

const WORKER_STATUS = ["🟢 Free", "🟡 Busy", "🔴 Offline"] as const;
type WorkerStatus = typeof WORKER_STATUS[number];

export default function SellerDashboard() {
  const { lang } = useApp();
  const t = T[lang];
  const { toast } = useToast();

  const [products, setProducts] = useState<SellerProduct[]>(INITIAL_PRODUCTS);
  const [showForm, setShowForm] = useState(false);
  const [shopOpen, setShopOpen] = useState(true);
  const [workerStatus, setWorkerStatus] = useState<WorkerStatus>("🟢 Free");
  const [form, setForm] = useState({ name: "", price: "", unit: "kg", stock: "10" });
  const [chatOpen, setChatOpen] = useState(false);

  const totalOrders = products.reduce((s, p) => s + p.orders, 0);
  const totalViews = products.reduce((s, p) => s + p.views, 0);
  const avgRating = products.length
    ? (products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1)
    : "—";

  const toggleShop = () => {
    const next = !shopOpen;
    setShopOpen(next);
    toast({
      title: next ? "🟢 Shop is Now OPEN" : "🔴 Shop is Now CLOSED",
      description: next ? "Customers can see your shop." : "Customers are notified — shop is closed.",
    });
  };

  const cycleWorkerStatus = () => {
    const idx = WORKER_STATUS.indexOf(workerStatus);
    const next = WORKER_STATUS[(idx + 1) % WORKER_STATUS.length];
    setWorkerStatus(next);
    toast({ title: `Status: ${next}`, description: "Customers will see your updated status." });
  };

  const handleAddProduct = () => {
    if (!form.name || !form.price) {
      toast({ title: "Error", description: "सभी fields भरें", variant: "destructive" });
      return;
    }
    const newProduct: SellerProduct = {
      id: `sp${Date.now()}`,
      name: form.name,
      price: parseFloat(form.price),
      unit: form.unit,
      views: 0,
      orders: 0,
      rating: 0,
      published: false,
      inStock: true,
      stock: parseInt(form.stock) || 10,
    };
    setProducts((prev) => [newProduct, ...prev]);
    setForm({ name: "", price: "", unit: "kg", stock: "10" });
    setShowForm(false);
    toast({ title: t.addProduct, description: `"${newProduct.name}" added!` });
  };

  const handlePublish = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
    const product = products.find((p) => p.id === id);
    if (product) {
      toast({
        title: product.published ? "Unpublished" : t.publishGlobally,
        description: product.published ? `"${product.name}" removed from global listing` : `"${product.name}" is now live worldwide!`,
      });
    }
  };

  const toggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => p.id === id ? { ...p, inStock: !p.inStock } : p)
    );
  };

  return (
    <div className="pb-2">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-400 text-white px-5 pt-12 pb-8 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <Store size={22} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{t.sellerDashboard}</h1>
            <p className="text-sm opacity-80">WorldBazaar Seller</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setChatOpen(true)}
              className="p-2 bg-white/20 rounded-xl"
              title="Video Call"
            >
              <Video size={18} />
            </button>
            <button
              onClick={() => setChatOpen(true)}
              className="p-2 bg-white/20 rounded-xl"
              title="Phone"
            >
              <Phone size={18} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-2">
          {[
            { label: t.totalOrders, value: totalOrders, icon: Package },
            { label: t.totalViews, value: totalViews.toLocaleString(), icon: Eye },
            { label: t.rating, value: avgRating, icon: Star },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center">
              <Icon size={16} className="mx-auto mb-1 opacity-80" />
              <p className="text-lg font-bold">{value}</p>
              <p className="text-[10px] opacity-75 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-5 space-y-4">
        {/* Shop Open/Close Toggle + Worker Status */}
        <div className="grid grid-cols-2 gap-3">
          <button
            data-testid="shop-toggle"
            onClick={toggleShop}
            className={`flex items-center gap-2 p-3.5 rounded-2xl border-2 transition-all active:scale-95 ${
              shopOpen ? "border-green-400 bg-green-50" : "border-red-300 bg-red-50"
            }`}
          >
            {shopOpen ? (
              <ToggleRight size={20} className="text-green-600 flex-shrink-0" />
            ) : (
              <ToggleLeft size={20} className="text-red-500 flex-shrink-0" />
            )}
            <div className="text-left">
              <p className={`text-xs font-black ${shopOpen ? "text-green-700" : "text-red-600"}`}>
                {shopOpen ? "🟢 OPEN" : "🔴 CLOSED"}
              </p>
              <p className="text-[10px] text-muted-foreground">Tap to toggle</p>
            </div>
          </button>

          <button
            data-testid="worker-status"
            onClick={cycleWorkerStatus}
            className="flex items-center gap-2 p-3.5 rounded-2xl border-2 border-border bg-card transition-all active:scale-95"
          >
            <Users size={20} className="text-primary flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs font-black">{workerStatus}</p>
              <p className="text-[10px] text-muted-foreground">Worker Status</p>
            </div>
          </button>
        </div>

        {/* Add Product Button */}
        <button
          data-testid="add-product-button"
          onClick={() => setShowForm((s) => !s)}
          className="w-full h-12 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all active:scale-95"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Cancel" : t.addProduct}
        </button>

        {/* Add Product Form */}
        {showForm && (
          <div className="bg-card rounded-3xl border border-card-border shadow-sm p-5 space-y-4">
            <h3 className="font-bold text-sm">{t.addProduct}</h3>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Product Name</label>
              <input
                data-testid="seller-product-name"
                type="text"
                placeholder="e.g. Organic Honey"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Price (₹)</label>
                <input
                  data-testid="seller-product-price"
                  type="number"
                  placeholder="0"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Unit</label>
                <select
                  data-testid="seller-product-unit"
                  value={form.unit}
                  onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none"
                >
                  {["kg", "g", "L", "ml", "piece", "dozen", "jar", "bottle", "pack", "month"].map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Stock Quantity</label>
              <input
                type="number"
                placeholder="Stock (units)"
                value={form.stock}
                onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              data-testid="seller-submit-product"
              onClick={handleAddProduct}
              className="w-full h-11 bg-green-500 text-white rounded-xl font-bold text-sm hover:bg-green-600 transition-all active:scale-95"
            >
              Save Product
            </button>
          </div>
        )}

        {/* Products List */}
        <div>
          <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Package size={15} className="text-primary" />
            {t.myProducts} ({products.length})
          </h2>
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                data-testid={`seller-product-${product.id}`}
                className="bg-card rounded-2xl border border-card-border shadow-xs p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-sm">{product.name}</p>
                    <p className="text-base font-bold text-primary">₹{product.price}/{product.unit}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                      product.published ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                    }`}>
                      {product.published ? "LIVE" : "Draft"}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg cursor-pointer ${
                      product.inStock ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-600"
                    }`} onClick={() => toggleStock(product.id)}>
                      {product.inStock ? `✅ Qty: ${product.stock}` : "❌ Out"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Eye size={11} />{product.views.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Package size={11} />{product.orders} orders</span>
                  {product.rating > 0 && (
                    <span className="flex items-center gap-1"><Star size={11} className="text-yellow-500" />{product.rating}</span>
                  )}
                </div>
                <button
                  data-testid={`publish-${product.id}`}
                  onClick={() => handlePublish(product.id)}
                  className={`w-full h-9 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                    product.published
                      ? "bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  {product.published ? (
                    <><X size={13} /> Unpublish</>
                  ) : (
                    <><Globe size={13} /> {t.publishGlobally}</>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ChatCallModal open={chatOpen} personName="Support Team" personRole="WorldBazaar Support" onClose={() => setChatOpen(false)} />
    </div>
  );
}
