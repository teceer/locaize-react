import React from "react";
type Language = "pl-PL" | "en-US" | "es-ES" | "fr-FR" | "de-DE" | "it-IT";
export declare const LanguageProvider: React.FC<{
    language: Language;
    children: React.ReactNode;
}>;
export declare const useLanguage: () => Language;
export declare const SelectLanguage: () => React.JSX.Element;
export {};
