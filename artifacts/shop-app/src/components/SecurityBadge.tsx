import { Shield, Lock, Wifi } from "lucide-react";

export default function SecurityBadge() {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border-b border-green-100">
      <div className="flex items-center gap-1 text-green-700">
        <Shield size={11} className="fill-green-600 text-green-600" />
        <span className="text-[10px] font-bold">SSL Protected</span>
      </div>
      <span className="text-green-300">|</span>
      <div className="flex items-center gap-1 text-green-700">
        <Lock size={11} />
        <span className="text-[10px] font-bold">256-bit Encrypted</span>
      </div>
      <span className="text-green-300">|</span>
      <div className="flex items-center gap-1 text-green-700">
        <Wifi size={11} />
        <span className="text-[10px] font-bold">Anti-Hack v3.0</span>
      </div>
    </div>
  );
}
