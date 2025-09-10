import { createContext } from "react";

export type GlobalContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);
