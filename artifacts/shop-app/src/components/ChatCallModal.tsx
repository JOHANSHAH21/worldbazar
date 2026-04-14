import { useState, useRef, useEffect } from "react";
import { X, Send, Video, Phone, DollarSign, Mic, MicOff, VideoOff } from "lucide-react";

interface ChatCallModalProps {
  open: boolean;
  personName: string;
  personRole: string;
  onClose: () => void;
}

const AUTO_REPLIES = [
  "नमस्ते! मैं आपकी कैसे मदद कर सकता हूं? 🙏",
  "जी हां, यह product available है।",
  "हम 30 minutes में deliver कर देंगे।",
  "Price पर बात हो सकती है। क्या offer है आपका?",
  "Okay, मैं आपकी request process कर रहा हूं।",
  "धन्यवाद! कोई और सहायता?",
];

interface Message {
  id: number;
  text: string;
  from: "me" | "them";
  time: string;
}

export default function ChatCallModal({ open, personName, personRole, onClose }: ChatCallModalProps) {
  const [tab, setTab] = useState<"chat" | "video" | "audio">("chat");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: `नमस्ते! मैं ${personName} हूं। कैसे मदद करूं? 😊`, from: "them", time: "Now" },
  ]);
  const [input, setInput] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [showOffer, setShowOffer] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [callTimer, setCallTimer] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (callActive) {
      timerRef.current = setInterval(() => setCallTimer((t) => t + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallTimer(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [callActive]);

  if (!open) return null;

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const sendMessage = (text: string) => {
    const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setMessages((m) => [...m, { id: Date.now(), text, from: "me", time: now }]);
    setTimeout(() => {
      const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      setMessages((m) => [...m, { id: Date.now() + 1, text: reply, from: "them", time: now }]);
    }, 1200);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleOffer = () => {
    if (!offerPrice) return;
    sendMessage(`💰 Price Offer: ₹${offerPrice}`);
    setOfferPrice("");
    setShowOffer(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-[80] bg-background rounded-t-3xl shadow-2xl max-w-lg mx-auto h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-3 border-b border-border flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
            {personName[0]}
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm">{personName}</p>
            <p className="text-xs text-muted-foreground">{personRole}</p>
          </div>
          <div className="flex gap-1">
            {["chat", "video", "audio"].map((t) => (
              <button key={t} onClick={() => { setTab(t as "chat"|"video"|"audio"); setCallActive(false); }}
                className={`p-2 rounded-xl text-xs transition-all ${tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"}`}
              >
                {t === "chat" ? <Send size={14} /> : t === "video" ? <Video size={14} /> : <Phone size={14} />}
              </button>
            ))}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted"><X size={18} /></button>
        </div>

        {/* Chat Tab */}
        {tab === "chat" && (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                    m.from === "me" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"
                  }`}>
                    <p>{m.text}</p>
                    <p className={`text-[10px] mt-0.5 ${m.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {showOffer && (
              <div className="px-4 pb-2 flex gap-2">
                <input
                  data-testid="offer-price-input"
                  type="number"
                  placeholder="Offer price (₹)"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button onClick={handleOffer} className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-bold">Send</button>
              </div>
            )}

            <div className="px-4 pb-4 pt-2 flex gap-2 flex-shrink-0">
              <button
                data-testid="bargain-button"
                onClick={() => setShowOffer((s) => !s)}
                className="p-2.5 rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all"
                title="Bargain"
              >
                <DollarSign size={18} />
              </button>
              <input
                data-testid="chat-input"
                type="text"
                placeholder="Message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-4 py-2.5 rounded-2xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                data-testid="send-message-button"
                onClick={handleSend}
                className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </>
        )}

        {/* Video/Audio Call Tab */}
        {(tab === "video" || tab === "audio") && (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-5">
            {!callActive ? (
              <>
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-5xl font-bold text-primary">
                  {personName[0]}
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">{personName}</p>
                  <p className="text-muted-foreground text-sm mt-1">{personRole}</p>
                </div>
                <button
                  data-testid="start-call-button"
                  onClick={() => setCallActive(true)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95 ${
                    tab === "video" ? "bg-primary text-primary-foreground" : "bg-green-500 text-white"
                  }`}
                >
                  {tab === "video" ? <Video size={26} /> : <Phone size={26} />}
                </button>
                <p className="text-sm text-muted-foreground">
                  Start {tab === "video" ? "Video" : "Audio"} Call
                </p>
              </>
            ) : (
              <>
                <div className={`w-full aspect-video rounded-2xl flex items-center justify-center ${
                  tab === "video" && !videoOff ? "bg-gray-900" : "bg-muted"
                }`}>
                  {tab === "video" && !videoOff ? (
                    <p className="text-white/60 text-sm">Camera connecting...</p>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                        {personName[0]}
                      </div>
                      <p className="text-sm">{muted ? "Call Muted" : "On Call"}</p>
                    </div>
                  )}
                </div>
                <p className="text-2xl font-mono font-bold text-primary">{formatTime(callTimer)}</p>
                <div className="flex gap-4">
                  <button onClick={() => setMuted((m) => !m)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${muted ? "bg-red-500 text-white" : "bg-muted"}`}
                  >
                    {muted ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                  {tab === "video" && (
                    <button onClick={() => setVideoOff((v) => !v)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${videoOff ? "bg-red-500 text-white" : "bg-muted"}`}
                    >
                      {videoOff ? <VideoOff size={20} /> : <Video size={20} />}
                    </button>
                  )}
                  <button
                    data-testid="end-call-button"
                    onClick={() => setCallActive(false)}
                    className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center"
                  >
                    <Phone size={20} className="rotate-[135deg]" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
