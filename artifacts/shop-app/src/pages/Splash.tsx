import { useState } from "react";
import { Globe, ShoppingBag, Store, ChevronRight, Stethoscope, Truck } from "lucide-react";
import { LANGUAGES, T } from "@/data/i18n";
import { useApp } from "@/context/AppContext";
import type { LangCode } from "@/data/i18n";
import type { Role } from "@/context/AppContext";

const ROLES: Array<{
  key: Role;
  icon: React.ElementType;
  color: string;
  descKey: "customerDesc" | "sellerDesc" | "doctorDesc" | "deliveryDesc";
  titleKey: "customer" | "seller" | "doctor" | "deliveryBoy";
}> = [
  { key: "customer", icon: ShoppingBag, color: "text-primary bg-primary/10", descKey: "customerDesc", titleKey: "customer" },
  { key: "seller", icon: Store, color: "text-amber-500 bg-amber-500/10", descKey: "sellerDesc", titleKey: "seller" },
  { key: "doctor", icon: Stethoscope, color: "text-rose-500 bg-rose-500/10", descKey: "doctorDesc", titleKey: "doctor" },
  { key: "delivery", icon: Truck, color: "text-blue-500 bg-blue-500/10", descKey: "deliveryDesc", titleKey: "deliveryBoy" },
];

export default function Splash() {
  const { lang, setLang, setRole, setSplashDone } = useApp();
  const [step, setStep] = useState<"lang" | "role">("lang");
  const t = T[lang] || T["en"];

  const handleLangSelect = (code: LangCode) => setLang(code);

  const handleContinueToRole = () => setStep("role");

  const handleRoleSelect = (role: Role) => {
    setRole(role);
    setSplashDone(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-orange-400 to-amber-300 flex flex-col items-center justify-start max-w-lg mx-auto">
      {/* Header */}
      <div className="w-full px-6 pt-14 pb-7 text-center text-white">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm mb-4 shadow-xl">
          <Globe size={40} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">{t.appName}</h1>
        <p className="text-white/80 text-sm font-medium">{t.tagline}</p>
        <div className="flex items-center justify-center gap-3 mt-3 text-xs">
          <span className="bg-white/20 px-2.5 py-1 rounded-full">🌍 12 Languages</span>
          <span className="bg-white/20 px-2.5 py-1 rounded-full">👥 4 Roles</span>
          <span className="bg-white/20 px-2.5 py-1 rounded-full">🔒 SSL Secured</span>
        </div>
      </div>

      <div className="flex-1 w-full bg-background rounded-t-[2.5rem] px-5 pt-7 pb-6 overflow-y-auto">
        {step === "lang" ? (
          <>
            <h2 className="text-lg font-bold text-center mb-4">{t.chooseLanguage}</h2>
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {LANGUAGES.map((lng) => (
                <button
                  key={lng.code}
                  data-testid={`lang-${lng.code}`}
                  onClick={() => handleLangSelect(lng.code)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all active:scale-95 ${
                    lang === lng.code
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 bg-card"
                  }`}
                >
                  <span className="text-2xl">{lng.flag}</span>
                  <div className="text-left min-w-0">
                    <p className={`text-sm font-bold truncate ${lang === lng.code ? "text-primary" : "text-foreground"}`}>
                      {lng.native}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{lng.label}</p>
                  </div>
                  {lang === lng.code && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
            <button
              data-testid="splash-continue"
              onClick={handleContinueToRole}
              className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:bg-primary/90 transition-all active:scale-95"
            >
              {t.continue}
              <ChevronRight size={20} />
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-center mb-1">{t.chooseRole}</h2>
            <p className="text-center text-muted-foreground text-sm mb-5">Select your role in WorldBazaar</p>
            <div className="grid grid-cols-1 gap-3">
              {ROLES.map(({ key, icon: Icon, color, descKey, titleKey }) => (
                <button
                  key={key}
                  data-testid={`role-${key}`}
                  onClick={() => handleRoleSelect(key)}
                  className="flex items-center gap-4 p-4 rounded-3xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all active:scale-95 group text-left shadow-sm"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon size={26} />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold mb-0.5 group-hover:text-primary transition-colors capitalize">
                      {t[titleKey] ?? key}
                    </p>
                    <p className="text-xs text-muted-foreground">{t[descKey] ?? ""}</p>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep("lang")}
              className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← {t.chooseLanguage}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
