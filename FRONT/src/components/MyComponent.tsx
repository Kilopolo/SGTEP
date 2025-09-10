import { useTranslation } from "react-i18next";
import { useGlobal } from "../context/useGlobal";

const MyComponent = () => {
  const { t } = useTranslation();
  const { language } = useGlobal();

  return (
    <div>
      <p>{t("description", { lang: language })}</p>

      {/* <button onClick={() => setLanguage(language === "en" ? "es" : "en")}>
        {language === "en" ? t("changeToSpanish") : t("changeToEnglish")}
      </button> */}
    </div>
  );
};
export { MyComponent };
