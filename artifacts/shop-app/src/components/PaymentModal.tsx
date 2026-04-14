import { useState } from "react";
import { X, Banknote, CreditCard, Smartphone, Gift, Calendar, Globe2 } from "lucide-react";
import { CURRENCIES, Currency } from "@/data/mock";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  open: boolean;
  totalINR: number;
  onClose: () => void;
  onPay: () => void;
}

type PaymentMethod = "cod" | "upi" | "card" | "gift" | "emi3" | "emi6" | "emi12";

const EMI_DISCOUNT: Record<string, number> = { emi3: 5, emi6: 3, emi12: 2 };

export default function PaymentModal({ open, totalINR, onClose, onPay }: PaymentModalProps) {
  const { toast } = useToast();
  const [method, setMethod] = useState<PaymentMethod>("cod");
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [upiId, setUpiId] = useState("");
  const [giftCode, setGiftCode] = useState("");
  const [cardNo, setCardNo] = useState("");

  if (!open) return null;

  const discount = method.startsWith("emi") ? EMI_DISCOUNT[method] : 0;
  const finalINR = totalINR * (1 - discount / 100);
  const finalConverted = (finalINR / currency.rateToINR).toFixed(2);
  const displayAmount = currency.code === "INR"
    ? `₹${finalINR.toFixed(0)}`
    : `${currency.symbol}${finalConverted}`;

  const handlePay = () => {
    if (method === "upi" && !upiId.includes("@")) {
      toast({ title: "Invalid UPI", description: "UPI ID में '@' होना चाहिए", variant: "destructive" });
      return;
    }
    if (method === "card" && cardNo.replace(/\s/g, "").length < 16) {
      toast({ title: "Invalid Card", description: "16-digit card number enter करें", variant: "destructive" });
      return;
    }
    if (method === "gift" && giftCode.length < 4) {
      toast({ title: "Invalid Code", description: "सही Gift Card code enter करें", variant: "destructive" });
      return;
    }
    onPay();
    toast({ title: "Payment Successful!", description: `${displayAmount} paid via ${method.toUpperCase()}. Order confirmed!` });
  };

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-[80] bg-background rounded-t-3xl shadow-2xl max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border">
          <h2 className="text-lg font-bold">Payment</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted"><X size={20} /></button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Currency Selector */}
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-2 flex items-center gap-1">
              <Globe2 size={12} /> Currency (14 supported)
            </label>
            <div className="grid grid-cols-4 gap-1.5 max-h-24 overflow-y-auto">
              {CURRENCIES.map((c) => (
                <button key={c.code} onClick={() => setCurrency(c)}
                  className={`py-1 px-1 rounded-lg text-[10px] font-bold border transition-all ${
                    currency.code === c.code ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {c.symbol} {c.code}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-2 block">Payment Method</label>
            <div className="space-y-2">
              {[
                { key: "cod", label: "Cash on Delivery", sub: "Pay when delivered", icon: Banknote, color: "text-green-600" },
                { key: "upi", label: "UPI", sub: "PhonePe • GPay • Paytm", icon: Smartphone, color: "text-blue-600" },
                { key: "card", label: "Credit / Debit Card", sub: "Visa • Mastercard • Rupay", icon: CreditCard, color: "text-purple-600" },
                { key: "gift", label: "Gift Card", sub: "Enter gift card code", icon: Gift, color: "text-rose-600" },
                { key: "emi3", label: "EMI — 3 months", sub: "5% instant discount", icon: Calendar, color: "text-amber-600" },
                { key: "emi6", label: "EMI — 6 months", sub: "3% instant discount", icon: Calendar, color: "text-amber-600" },
                { key: "emi12", label: "EMI — 12 months", sub: "2% instant discount", icon: Calendar, color: "text-amber-600" },
              ].map(({ key, label, sub, icon: Icon, color }) => (
                <button key={key} onClick={() => setMethod(key as PaymentMethod)}
                  data-testid={`payment-${key}`}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                    method === key ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  }`}
                >
                  <Icon size={20} className={color} />
                  <div className="flex-1">
                    <p className="text-sm font-bold">{label}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                  {method === key && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          </div>

          {/* Method-specific inputs */}
          {method === "upi" && (
            <input
              data-testid="upi-id-input"
              type="text"
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          )}
          {method === "card" && (
            <div className="space-y-2">
              <input
                data-testid="card-number-input"
                type="text"
                placeholder="Card Number (16 digits)"
                value={cardNo}
                onChange={(e) => setCardNo(e.target.value.replace(/\D/g, "").slice(0, 16))}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="MM/YY" className="px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none" />
                <input placeholder="CVV" className="px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none" />
              </div>
            </div>
          )}
          {method === "gift" && (
            <input
              data-testid="gift-code-input"
              type="text"
              placeholder="Gift Card Code (e.g. WB2024)"
              value={giftCode}
              onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          )}

          {/* Total */}
          <div className="bg-muted rounded-2xl p-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Subtotal (INR)</span>
              <span>₹{totalINR}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-600">EMI Discount</span>
                <span className="text-green-600">-{discount}%</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base border-t border-border pt-2 mt-2">
              <span>Total ({currency.code})</span>
              <span className="text-primary">{displayAmount}</span>
            </div>
          </div>

          <button
            data-testid="confirm-payment-button"
            onClick={handlePay}
            className="w-full h-13 bg-primary text-primary-foreground rounded-2xl font-bold text-base py-3.5 hover:bg-primary/90 transition-all active:scale-95"
          >
            Pay {displayAmount}
          </button>
        </div>
      </div>
    </>
  );
}
