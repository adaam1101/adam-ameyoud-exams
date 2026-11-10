"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "@/lib/ensb-data";
import { TRANSLATIONS, TranslationsSchema } from "@/lib/translations";

interface ThemeLangContextType {
  lang: Language;
  setLang: (l: Language) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  t: TranslationsSchema;
}

const ThemeLangContext = createContext<ThemeLangContextType | null>(null);

export function ThemeLangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("fr");
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedLang = localStorage.getItem("ensb_lang") as Language | null;
    if (savedLang === "ar" || savedLang === "fr" || savedLang === "en") {
      setLangState(savedLang);
    }

    const savedTheme = localStorage.getItem("ensb_theme") as "light" | "dark" | null;
    let effectiveTheme: "light" | "dark" = "light";

    if (savedTheme === "dark" || savedTheme === "light") {
      effectiveTheme = savedTheme;
    } else if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      effectiveTheme = "dark";
    }

    setThemeState(effectiveTheme);
    applyThemeToDOM(effectiveTheme);
  }, []);

  function applyThemeToDOM(nextTheme: "light" | "dark") {
    const root = document.documentElement;
    root.setAttribute("data-theme", nextTheme);
    if (nextTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  function setLang(l: Language) {
    setLangState(l);
    localStorage.setItem("ensb_lang", l);
  }

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setThemeState(next);
    localStorage.setItem("ensb_theme", next);
    applyThemeToDOM(next);
  }

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  return (
    <ThemeLangContext.Provider value={{ lang, setLang, theme, toggleTheme, t }}>
      {children}
    </ThemeLangContext.Provider>
  );
}

export function useThemeLang() {
  const ctx = useContext(ThemeLangContext);
  if (!ctx) {
    throw new Error("useThemeLang must be used within ThemeLangProvider");
  }
  return ctx;
}
