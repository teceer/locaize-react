/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

const LOCAIZE_API_URL = "https://api.locaize.com";

const fetchTranslation = async function fetchTranslation(template: string, language: string): Promise<string> {
  try {
    const res = await fetch(`${LOCAIZE_API_URL}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "YOUR_API_KEY",
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

// Original function for server-side usage
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function slc(strings: TemplateStringsArray, language: string, ...values: any[]): Promise<string> {
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
}

// New hook for client-side usage
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function clc(strings: TemplateStringsArray, ...values: any[]): string | undefined {
  const [translated, setTranslated] = useState<string>();
  const language = useLanguage(); // Get language from context

  useEffect(() => {
    let template = strings[0];
    for (let i = 0; i < values.length; i++) {
      template += `\${value${i + 1}}` + strings[i + 1];
    }

    // Fetch and update translation
    const loadTranslation = async () => {
      if (!template) return;
      let result = await fetchTranslation(template, language);

      values.forEach((value, index) => {
        result = result.replace(`\${value${index + 1}}`, String(value));
      });

      setTranslated(result);
    };

    void loadTranslation();
    // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-unsafe-assignment
  }, [strings, language, ...values]); // Re-run when strings, language, or values change

  return translated;
}

// Usage examples:
// Server-side:
// await slc`Hello ${user?.name}`
// -> Returns: "Cześć John!" (if user?.name is "John")

// Client-side:
// function MyComponent() {
//   return <div>{clc`Hello ${user?.name}`}</div>;
// }

