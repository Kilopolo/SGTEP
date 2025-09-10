import { useGlobal } from "../context/useGlobal";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { language, setLanguage, theme, toggleTheme } = useGlobal();
  const { t } = useTranslation();

  return (
    <header className="p-4 flex justify-between items-center bg-white text-black dark:bg-gray-900 dark:text-white">
      <h1 className="text-xl font-bold">{t("welcome")}</h1>
      <div className="space-x-2">
        <button
          className="px-3 py-1 border rounded"
          onClick={() => setLanguage(language === "en" ? "es" : "en")}
        >
          {language === "en" ? "ES" : "EN"}
        </button>
        <button
          className="px-3 py-1 border rounded bg-gray-200 dark:bg-gray-700"
          onClick={toggleTheme}
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </header>
  );
}
