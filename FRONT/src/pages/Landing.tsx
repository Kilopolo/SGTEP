import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import i18n from "../locales/i18n";
import { Link } from "react-router-dom";

export default function Landing() {
  const context = useContext(GlobalContext);

  if (!context) {
    // Esto evita errores si el contexto no está disponible
    return null;
  }

  const { language } = context;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Título */}
      <h1 className="text-5xl font-bold mb-4">{i18n.t("welcome")}</h1>

      {/* Descripción */}
      <p className="text-lg mb-6">{i18n.t("description")}</p>

      {/* Botones de registro e inicio de sesión con el estilo anterior */}
      <div className="space-x-4 mb-6">
        <Link
          to="/register"
          className="px-4 py-2 bg-white text-blue-600 font-bold rounded shadow hover:bg-gray-200"
        >
          {i18n.t("register") || "Registrarse"}
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 bg-gray-800 text-white font-bold rounded shadow hover:bg-gray-700"
        >
          {i18n.t("login") || "Iniciar Sesión"}
        </Link>
      </div>

      {/* Cambiar idioma */}
      {/* <div className="space-x-2">
        <button
          onClick={() => setLanguage("es")}
          className={`px-3 py-1 rounded ${
            language === "es" ? "bg-white text-blue-600" : "bg-gray-700 text-white"
          }`}
        >
          {i18n.t("changeToSpanish")}
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 rounded ${
            language === "en" ? "bg-white text-blue-600" : "bg-gray-700 text-white"
          }`}
        >
          {i18n.t("changeToEnglish")}
        </button>
      </div> */}

      {/* Mostrar idioma actual */}
      <p className="mt-4 text-sm">{i18n.t("language", { lang: language })}</p>
    </div>
  );
}
