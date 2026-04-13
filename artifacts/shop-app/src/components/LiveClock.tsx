import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function LiveClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const utcStr = time.toUTCString().split(" ").slice(4, 5)[0];
  const dateStr = time.toLocaleDateString("en-GB", { timeZone: "UTC", day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="flex items-center gap-1.5 text-xs font-mono text-primary-foreground/80">
      <Clock size={11} />
      <span>UTC {utcStr}</span>
      <span className="opacity-60">·</span>
      <span>{dateStr}</span>
    </div>
  );
}
