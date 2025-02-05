"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

type Language = "pl-PL" | "en-US" | "es-ES" | "fr-FR" | "de-DE" | "it-IT";

export const LanguageProvider: React.FC<{ language: Language; children: React.ReactNode }> = ({
  language,
  children,
}) => {
  const [lang, setLang] = useState<Language>(language);

  return (
    <LanguageContext.Provider value={{ language: lang, setLanguage: setLang }}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const { language } = useContext(LanguageContext);
  if (language === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return language;
};

export const SelectLanguage = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <select
      value={language}
      onChange={(e) => {
        setLanguage(e.target.value as Language);
      }}
    >
      <option value="pl-PL">Polski</option>
      <option value="en-US">English</option>
      <option value="es-ES">Español</option>
      <option value="fr-FR">Français</option>
      <option value="de-DE">Deutsch</option>
      <option value="it-IT">Italiano</option>
    </select>
  );
};

