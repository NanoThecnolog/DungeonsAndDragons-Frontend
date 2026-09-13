"use client";
import { useTranslation } from "react-i18next";
import { FiGlobe } from "react-icons/fi";
import i18n, { LANGUAGE_STORAGE_KEY } from "@/i18n";
import styles from "./styles.module.scss";

export default function LanguageSwitch() {
    const { t } = useTranslation();
    const current = i18n.language === "en" ? "en" : "pt";
    const next = current === "pt" ? "en" : "pt";

    function switchLanguage() {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
        void i18n.changeLanguage(next, () => window.location.reload());
    }

    return (
        <button type="button" title={t("lang.title")} onClick={switchLanguage} className={styles.button}>
            <FiGlobe size={20} />
            <span>{current.toUpperCase()}</span>
        </button>
    );
}