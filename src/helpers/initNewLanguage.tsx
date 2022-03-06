import i18next from "./i18n";
import { ReactTypes } from "../types/reactPages";

export function initNewLanguage(language: string): ReactTypes {
    document.documentElement.dir = i18next.dir(language);
    document.documentElement.lang = language;
};