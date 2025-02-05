import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

const LOCAIZE_API_URL = process.env.NEXT_PUBLIC_LOCAIZE_API_URL || "https://api.locaize.com";

type LocaizeClient = {
  clientSide: () => (strings: TemplateStringsArray, ...values: any[]) => string | undefined;
  serverSide: () => (strings: TemplateStringsArray, language: string, ...values: any[]) => Promise<string>;
};

export const createLocaizeClient = (options: { apiKey: string }): LocaizeClient => {
  const apiKey = options.apiKey;

  const fetchTranslation = async function fetchTranslation(template: string, language: string): Promise<string> {
    try {
      const res = await fetch(`${LOCAIZE_API_URL}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
        },
        body: JSON.stringify({
          language,
          value: template,
        }),
      });

      if (!res.ok) {
        throw new Error("Translation request failed");
      }

      const data = (await res.json()) as { translated: string };
      return data.translated;
    } catch (error) {
      console.error("Translation failed:", error);
      return template; // Return original text as fallback
    }
  };

  const clientSide = (strings: TemplateStringsArray, ...values: any[]): string | undefined => {
    const [translated, setTranslated] = useState<string>();
    const language = useLanguage(); // Get language from context

    useEffect(() => {
      let template = strings[0];
      for (let i = 0; i < values.length; i++) {
        template += `\${value${i + 1}}` + strings[i + 1];
      }

      const loadTranslation = async () => {
        if (!template) return;
        let result = await fetchTranslation(template, language);

        values.forEach((value, index) => {
          result = result.replace(`\${value${index + 1}}`, String(value));
        });

        setTranslated(result);
      };

      void loadTranslation();
    }, [strings, language, ...values]);

    return translated;
  };

  const serverSide = async (strings: TemplateStringsArray, language: string, ...values: any[]): Promise<string> => {
    let template = strings[0];
    for (let i = 0; i < values.length; i++) {
      template += `\${value${i + 1}}` + strings[i + 1];
    }

    if (!template) return "";

    let translated = await fetchTranslation(template, language);

    values.forEach((value, index) => {
      translated = translated.replace(`\${value${index + 1}}`, String(value));
    });

    return translated;
  };

  return {
    clientSide: () => clientSide,
    serverSide: () => serverSide,
  };
};

