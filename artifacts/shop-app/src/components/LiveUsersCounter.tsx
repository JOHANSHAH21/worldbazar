import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { T } from "@/data/i18n";

export default function LiveUsersCounter() {
  const { lang } = useApp();
  const t = T[lang];
  const [count, setCount] = useState(12347);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => {
        const delta = Math.floor(Math.random() * 21) - 10;
        return Math.max(12000, c + delta);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-xs text-primary-foreground/80">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
      </span>
      <Users size={11} />
      <span className="font-bold font-mono">{count.toLocaleString()}</span>
      <span>{t.liveUsers}</span>
    </div>
  );
}
