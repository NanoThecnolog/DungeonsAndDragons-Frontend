import i18n from "@/i18n";

type Dictionary = Record<string, string>;

function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function t(name: string): string {
    if (!name) {
        return name;
    }

    const dict = i18n.getResourceBundle(i18n.language, "dictionary") as Dictionary | undefined;
    if (!dict) {
        return name;
    }

    let translated = name;

    for (const key of Object.keys(dict)) {
        if (key === "") {
            continue;
        }
        const regex = new RegExp(`\\b${escapeRegExp(key)}\\b`, "gi");
        translated = translated.replace(regex, dict[key]);
    }

    translated = translated.replace(/\b([\w.-]+)\b/g, (match) => {
        return dict[match.toLowerCase()] || match;
    });

    return translated;
}