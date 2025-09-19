import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importa los JSON
import enTranslation from "./en/common.json";
import esTranslation from "./es/common.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
    },
    lng: "en", // idioma por defecto
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
