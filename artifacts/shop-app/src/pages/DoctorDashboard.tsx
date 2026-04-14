import { useState } from "react";
import { Stethoscope, Calendar, Clock, Video, Phone, Star, User, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatCallModal from "@/components/ChatCallModal";

const APPOINTMENTS = [
  { id: "a1", patient: "Ramesh Gupta", age: 45, issue: "Chest pain & breathlessness", time: "9:00 AM", status: "waiting", fee: 300 },
  { id: "a2", patient: "Sunita Devi", age: 32, issue: "Skin rash for 3 days", time: "9:30 AM", status: "in-progress", fee: 600 },
  { id: "a3", patient: "Arun Sharma", age: 28, issue: "Fever & cold", time: "10:00 AM", status: "waiting", fee: 300 },
  { id: "a4", patient: "Meera Jain", age: 55, issue: "Diabetes follow-up", time: "11:00 AM", status: "completed", fee: 300 },
];

export default function DoctorDashboard() {
  const { toast } = useToast();
  const [appts, setAppts] = useState(APPOINTMENTS);
  const [callOpen, setCallOpen] = useState(false);
  const [callPatient, setCallPatient] = useState("");
  const [shopOpen, setShopOpen] = useState(true);

  const totalEarnings = appts.filter((a) => a.status === "completed").reduce((s, a) => s + a.fee, 0);
  const pending = appts.filter((a) => a.status === "waiting").length;

  const complete = (id: string) => {
    setAppts((a) => a.map((ap) => ap.id === id ? { ...ap, status: "completed" } : ap));
    toast({ title: "Appointment Completed ✅", description: "Patient marked as done." });
  };

  const cancel = (id: string) => {
    setAppts((a) => a.map((ap) => ap.id === id ? { ...ap, status: "cancelled" } : ap));
    toast({ title: "Cancelled", description: "Appointment cancelled.", variant: "destructive" });
  };

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-r from-rose-500 to-pink-400 px-5 pt-12 pb-8 rounded-b-[2.5rem] text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/20 rounded-xl"><Stethoscope size={22} /></div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Dr. Priya Sharma</h1>
            <p className="text-sm opacity-80">General Physician • सामान्य चिकित्सक</p>
          </div>
          <button
            onClick={() => { setShopOpen(!shopOpen); toast({ title: shopOpen ? "🔴 Offline" : "🟢 Online", description: shopOpen ? "Patients cannot book now." : "You are now available." }); }}
            className={`px-3 py-1.5 rounded-full text-xs font-black ${shopOpen ? "bg-green-400/30" : "bg-red-400/30"}`}
          >
            {shopOpen ? "🟢 Online" : "🔴 Offline"}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Today's Patients", value: appts.length, icon: User },
            { label: "Pending", value: pending, icon: Clock },
            { label: "Earned Today", value: `₹${totalEarnings}`, icon: Star },
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
          <Calendar size={14} />
          Today's Appointments
        </h2>
        <div className="space-y-3">
          {appts.map((ap) => (
            <div key={ap.id} className="bg-card rounded-2xl border border-border shadow-sm p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-sm flex-shrink-0">
                  {ap.patient[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">{ap.patient}</p>
                  <p className="text-xs text-muted-foreground">{ap.issue}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">Age {ap.age}</span>
                    <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">⏰ {ap.time}</span>
                    <span className="text-[10px] font-bold text-primary">₹{ap.fee}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0 ${
                  ap.status === "completed" ? "bg-green-100 text-green-700" :
                  ap.status === "in-progress" ? "bg-blue-100 text-blue-700" :
                  ap.status === "cancelled" ? "bg-red-100 text-red-600" :
                  "bg-amber-100 text-amber-700"
                }`}>
                  {ap.status === "waiting" ? "Waiting" : ap.status === "in-progress" ? "In Progress" : ap.status === "completed" ? "Done" : "Cancelled"}
                </span>
              </div>
              {(ap.status === "waiting" || ap.status === "in-progress") && (
                <div className="flex gap-2">
                  <button
                    onClick={() => { setCallPatient(ap.patient); setCallOpen(true); }}
                    className="flex-1 py-2 rounded-xl bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1 hover:bg-blue-600 transition-all"
                  >
                    <Video size={13} /> Video Call
                  </button>
                  <button
                    onClick={() => { setCallPatient(ap.patient); setCallOpen(true); }}
                    className="px-3 py-2 rounded-xl bg-green-500 text-white text-xs font-bold flex items-center gap-1 hover:bg-green-600 transition-all"
                  >
                    <Phone size={13} />
                  </button>
                  <button
                    onClick={() => complete(ap.id)}
                    className="px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1 hover:bg-primary/90 transition-all"
                  >
                    <CheckCircle size={13} />
                  </button>
                  <button
                    onClick={() => cancel(ap.id)}
                    className="px-3 py-2 rounded-xl bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1 hover:bg-red-200 transition-all"
                  >
                    <XCircle size={13} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <ChatCallModal open={callOpen} personName={callPatient} personRole="Patient" onClose={() => setCallOpen(false)} />
    </div>
  );
}
