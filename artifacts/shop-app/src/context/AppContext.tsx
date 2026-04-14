import { createContext, useContext, useState, ReactNode } from "react";
import { LangCode } from "@/data/i18n";

export type Role = "customer" | "seller" | "doctor" | "delivery";

interface AppContextType {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  role: Role;
  setRole: (role: Role) => void;
  splashDone: boolean;
  setSplashDone: (done: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangCode>("hi");
  const [role, setRole] = useState<Role>("customer");
  const [splashDone, setSplashDone] = useState(false);

  return (
    <AppContext.Provider value={{ lang, setLang, role, setRole, splashDone, setSplashDone }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
