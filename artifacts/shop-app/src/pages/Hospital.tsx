import { useState } from "react";
import { Star, Clock, Globe, Video, Phone, Calendar, Pill, TestTube, Ambulance, Brain, ChevronRight } from "lucide-react";
import { doctors } from "@/data/mock";
import { useApp } from "@/context/AppContext";
import { T } from "@/data/i18n";
import ChatCallModal from "@/components/ChatCallModal";
import { useToast } from "@/hooks/use-toast";

const STATUS_STYLE = {
  available: "bg-green-100 text-green-700",
  busy: "bg-amber-100 text-amber-700",
  offline: "bg-red-100 text-red-600",
};

const STATUS_LABEL: Record<string, string> = { available: "Available", busy: "Busy", offline: "Offline" };

const SERVICES = [
  { icon: Pill, label: "Pharmacy", labelHindi: "फार्मेसी", color: "bg-blue-50 text-blue-600", desc: "Medicines delivered" },
  { icon: TestTube, label: "Lab Test", labelHindi: "Lab जांच", color: "bg-purple-50 text-purple-600", desc: "Home sample pickup" },
  { icon: Ambulance, label: "Ambulance", labelHindi: "एम्बुलेंस", color: "bg-red-50 text-red-600", desc: "24/7 Emergency" },
  { icon: Brain, label: "Mental Health", labelHindi: "मानसिक स्वास्थ्य", color: "bg-emerald-50 text-emerald-600", desc: "Counselling & therapy" },
];

export default function Hospital() {
  const { lang } = useApp();
  const t = T[lang];
  const { toast } = useToast();
  const [callOpen, setCallOpen] = useState(false);
  const [callDoctor, setCallDoctor] = useState<{ name: string; specialty: string } | null>(null);

  const startCall = (doc: typeof doctors[0]) => {
    setCallDoctor({ name: doc.name, specialty: doc.specialty });
    setCallOpen(true);
  };

  const bookAppointment = (doc: typeof doctors[0]) => {
    if (doc.status === "offline") {
      toast({ title: "Doctor Offline", description: `${doc.name} currently offline. Try tomorrow.`, variant: "destructive" });
      return;
    }
    toast({ title: "Appointment Booked! 🎉", description: `${doc.name} — Today 4:30 PM. ₹${doc.fee} fee.` });
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-400 px-4 pt-5 pb-6 text-white">
        <h1 className="text-xl font-bold mb-1">🏥 Hospital & Health</h1>
        <p className="text-white/80 text-sm">Doctors, pharmacy, lab, ambulance — सब कुछ यहां</p>
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className="bg-white/20 px-2.5 py-1 rounded-full font-medium">🟢 6 Doctors Online</span>
          <span className="bg-white/20 px-2.5 py-1 rounded-full font-medium">📞 24/7 Available</span>
        </div>
      </div>

      {/* Quick Services */}
      <div className="px-4 py-4">
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3">Quick Services</h2>
        <div className="grid grid-cols-2 gap-3">
          {SERVICES.map(({ icon: Icon, label, labelHindi, color, desc }) => (
            <button key={label}
              onClick={() => toast({ title: label, description: `${desc} — connecting...` })}
              className="flex items-start gap-3 p-3.5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all active:scale-95 text-left"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="font-bold text-sm">{label}</p>
                <p className="text-[11px] text-muted-foreground">{labelHindi}</p>
                <p className="text-[10px] text-primary mt-0.5">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Doctors */}
      <div className="px-4">
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3">Our Doctors</h2>
        <div className="space-y-3">
          {doctors.map((doc) => (
            <div key={doc.id} className="bg-card rounded-2xl border border-border p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-xl font-bold text-primary flex-shrink-0">
                  {doc.name[4]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-sm">{doc.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[doc.status]}`}>
                      {STATUS_LABEL[doc.status]}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{doc.specialty}</p>
                  <p className="text-[11px] text-primary font-medium">{doc.specialtyHindi}</p>
                </div>
                <p className="text-primary font-bold text-sm flex-shrink-0">₹{doc.fee}</p>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  {doc.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {doc.experience}
                </span>
                <span className="flex items-center gap-1">
                  <Globe size={11} />
                  {doc.languages.slice(0, 2).join(", ")}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  data-testid={`book-doctor-${doc.id}`}
                  onClick={() => bookAppointment(doc)}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-1 transition-all active:scale-95 ${
                    doc.status === "offline"
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  <Calendar size={14} />
                  Book
                </button>
                <button
                  data-testid={`video-consult-${doc.id}`}
                  onClick={() => doc.status !== "offline" && startCall(doc)}
                  className={`px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-1 transition-all active:scale-95 ${
                    doc.status === "offline"
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <Video size={14} />
                  Video
                </button>
                <button
                  onClick={() => doc.status !== "offline" && startCall(doc)}
                  className={`px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-1 transition-all active:scale-95 ${
                    doc.status === "offline"
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  <Phone size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {callDoctor && (
        <ChatCallModal
          open={callOpen}
          personName={callDoctor.name}
          personRole={callDoctor.specialty}
          onClose={() => setCallOpen(false)}
        />
      )}
    </div>
  );
}
