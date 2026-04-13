import { useState } from "react";
import { Globe, ShoppingBag, Store, ChevronRight } from "lucide-react";
import { LANGUAGES, T } from "@/data/i18n";
import { useApp } from "@/context/AppContext";
import type { LangCode } from "@/data/i18n";

export default function Splash() {
  const { lang, setLang, setRole, setSplashDone } = useApp();
  const [step, setStep] = useState<"lang" | "role">("lang");
  const t = T[lang];

  const handleLangSelect = (code: LangCode) => {
    setLang(code);
  };

  const handleContinueToRole = () => {
    setStep("role");
  };

  const handleRoleSelect = (role: "customer" | "seller") => {
    setRole(role);
    setSplashDone(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-orange-400 to-amber-300 flex flex-col items-center justify-start max-w-lg mx-auto">
      {/* Header */}
      <div className="w-full px-6 pt-16 pb-8 text-center text-white">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm mb-5 shadow-xl">
          <Globe size={40} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">{t.appName}</h1>
        <p className="text-white/80 text-base font-medium">{t.tagline}</p>
      </div>

      <div className="flex-1 w-full bg-background rounded-t-[2.5rem] px-5 pt-8 pb-6">
        {step === "lang" ? (
          <>
            <h2 className="text-lg font-bold text-center mb-5">{t.chooseLanguage}</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {LANGUAGES.map((lng) => (
                <button
                  key={lng.code}
                  data-testid={`lang-${lng.code}`}
                  onClick={() => handleLangSelect(lng.code)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all active:scale-95 ${
                    lang === lng.code
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 bg-card"
                  }`}
                >
                  <span className="text-2xl">{lng.flag}</span>
                  <div className="text-left">
                    <p className={`text-sm font-bold ${lang === lng.code ? "text-primary" : "text-foreground"}`}>
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
            <h2 className="text-lg font-bold text-center mb-2">{t.chooseRole}</h2>
            <p className="text-center text-muted-foreground text-sm mb-7">{t.appName}</p>
            <div className="grid grid-cols-1 gap-4">
              <button
                data-testid="role-customer"
                onClick={() => handleRoleSelect("customer")}
                className="flex items-center gap-5 p-5 rounded-3xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all active:scale-95 group text-left shadow-sm"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag size={30} className="text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold mb-0.5 group-hover:text-primary transition-colors">{t.customer}</p>
                  <p className="text-sm text-muted-foreground">{t.customerDesc}</p>
                </div>
                <ChevronRight size={20} className="ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
              </button>

              <button
                data-testid="role-seller"
                onClick={() => handleRoleSelect("seller")}
                className="flex items-center gap-5 p-5 rounded-3xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all active:scale-95 group text-left shadow-sm"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Store size={30} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-xl font-bold mb-0.5 group-hover:text-primary transition-colors">{t.seller}</p>
                  <p className="text-sm text-muted-foreground">{t.sellerDesc}</p>
                </div>
                <ChevronRight size={20} className="ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            </div>

            <button
              onClick={() => setStep("lang")}
              className="w-full mt-5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← {t.chooseLanguage}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
