import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-0.5">
      <button
        onClick={() => changeLanguage("en")}
        className={`cursor-pointer px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
          i18n.language === "en"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("ka")}
        className={`cursor-pointer px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
          i18n.language === "ka"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        KA
      </button>
    </div>
  );
};

export default LanguageSwitcher;
