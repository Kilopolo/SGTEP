import { useState, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import i18n from "../locales/i18n";
import type { ReactNode } from "react";

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState(i18n.language || "en");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Aplicar la clase dark en el <html>
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <GlobalContext.Provider
      value={{ language, setLanguage, theme, toggleTheme }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
