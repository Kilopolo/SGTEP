import { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobal } from "../context/useGlobal";
import { useTranslation } from "react-i18next";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, theme, toggleTheme } = useGlobal();
  const { t } = useTranslation();

  return (
    <header className="p-4 bg-white text-black dark:bg-gray-900 dark:text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">📝 SGTEP</h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:underline">{t("landing")}</Link>
          <Link to="/login" className="hover:underline">{t("login")}</Link>
          <Link to="/register" className="hover:underline">{t("register")}</Link>
          <Link to="/home" className="hover:underline">{t("home")}</Link>
          <Link to="/notes/create" className="hover:underline">{t("createNote")}</Link>
          <Link to="/notes" className="hover:underline">{t("viewNotes")}</Link>

          {/* Language switcher */}
          <button
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            className="ml-4"
            title="Cambiar idioma"
          >
            {language === "en" ? "🇺🇸" : "🇪🇸"}
          </button>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Cambiar tema"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav className="md:hidden mt-4 flex flex-col space-y-3">
          <Link to="/" className="hover:underline">{t("landing")}</Link>
          <Link to="/login" className="hover:underline">{t("login")}</Link>
          <Link to="/register" className="hover:underline">{t("register")}</Link>
          <Link to="/home" className="hover:underline">{t("home")}</Link>
          <Link to="/notes/create" className="hover:underline">{t("createNote")}</Link>
          <Link to="/notes" className="hover:underline">{t("viewNotes")}</Link>

          <div className="flex justify-between items-center mt-3">
            {/* Language switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              title="Cambiar idioma"
            >
              {language === "en" ? "🇺🇸" : "🇪🇸"}
            </button>

            {/* Theme switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              title="Cambiar tema"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
