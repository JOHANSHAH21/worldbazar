import { useState, useEffect, useRef } from "react";
import { TrendingUp } from "lucide-react";

const ACTIVITIES = [
  "Rajesh from Mumbai ordered Basmati Rice",
  "Maria from Madrid booked Haircut",
  "Ahmed from Dubai ordered Mustard Oil",
  "Yuki from Tokyo booked Photography",
  "Priya from Delhi added Mango to cart",
  "Carlos from Mexico ordered Sugar 5kg",
  "Liu Wei from Beijing booked Electrician",
  "Fatima from Riyadh ordered Tomato 2kg",
  "Pierre from Paris booked Tiffin Service",
  "Anna from Moscow ordered Wheat Flour",
  "Amit from Jaipur booked Head Massage",
  "Sofia from São Paulo ordered Arhar Dal",
  "Takeshi from Osaka booked Plumber",
  "Layla from Cairo ordered Spinach",
  "Hans from Berlin booked Tutor",
];

export default function ActivityTicker() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ACTIVITIES.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [index]);

  return (
    <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/5 border-b border-primary/10 overflow-hidden">
      <div className="flex-shrink-0 flex items-center gap-1 text-primary">
        <TrendingUp size={12} />
        <span className="text-[10px] font-bold uppercase tracking-wide">Live</span>
      </div>
      <div
        className="text-[11px] text-muted-foreground flex-1 truncate transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {ACTIVITIES[index]}
      </div>
    </div>
  );
}
