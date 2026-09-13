"use client";
import { useEffect, useState, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

export default function I18nProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState(i18n.language);

    useEffect(() => {
        const onLanguageChanged = (lng: string) => setLanguage(lng);
        i18n.on("languageChanged", onLanguageChanged);
        return () => {
            i18n.off("languageChanged", onLanguageChanged);
        };
    }, []);

    useEffect(() => {
        document.documentElement.lang = language === "en" ? "en" : "pt-br";
    }, [language]);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}