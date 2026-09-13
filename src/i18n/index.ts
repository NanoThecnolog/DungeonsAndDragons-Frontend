import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ptDict from "./dictionaries/pt.json";
import ptCommon from "./locales/pt/common.json";
import enCommon from "./locales/en/common.json";

export const LANGUAGE_STORAGE_KEY = "lang";

function getInitialLanguage(): string {
    if (typeof window === "undefined") return "pt";
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored === "en" ? "en" : "pt";
}

void i18n.use(initReactI18next).init({
    resources: {
        pt: { translation: ptCommon, dictionary: ptDict },
        en: { translation: enCommon, dictionary: {} },
    },
    lng: getInitialLanguage(),
    fallbackLng: "pt",
    supportedLngs: ["pt", "en"],
    ns: ["translation", "dictionary"],
    defaultNS: "translation",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
});

export default i18n;