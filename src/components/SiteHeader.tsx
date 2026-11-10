"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useThemeLang } from "@/lib/ThemeLangContext";
import { Language } from "@/lib/ensb-data";
import { Sun, Moon, Upload, BookOpen, Folder, Info } from "lucide-react";

export function SiteHeader() {
  const { lang, setLang, theme, toggleTheme, t } = useThemeLang();
  const pathname = usePathname();

  return (
    <header className="border-b-2 border-[var(--manila-border)] bg-[var(--manila-card)] shadow-xs sticky top-0 z-40 transition-colors">
      {/* Top Republic & Ministry Strip */}
      <div className="bg-[#074723] dark:bg-[#07170E] text-[#FCFAF6] dark:text-[#E2EBE5] text-[11px] font-typewriter py-1.5 px-4 sm:px-8 border-b-2 border-[#0D7A3E] dark:border-[#1E3A2B] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D7262D] animate-pulse" />
          <span className="tracking-wider uppercase">
            {t.schoolMinistry} • ENS BOUZARÉAH
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]" dir="ltr">
          <a href="mailto:adam.ameyoud@ensb.dz" className="hover:underline text-[#DCFCE7] dark:text-[#86EFAC]">
            adam.ameyoud@ensb.dz
          </a>
          <span>•</span>
          <a href="https://wa.me/213795523399" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#DCFCE7] dark:text-[#86EFAC]">
            +213 795 52 33 99
          </a>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-14 h-12 bg-white dark:bg-[#122B1C] border-2 border-[#0D7A3E] dark:border-[#22C55E] rounded p-1 shadow-2xs relative flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Image
              src="/ensb-logo.webp"
              alt="ENSB Crest"
              fill
              sizes="56px"
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[var(--heading-green)]">
                {t.platformName}
              </span>
              <span className="stamp-seal stamp-red hidden sm:inline-flex text-[10px]">
                ENSB 1984
              </span>
            </div>
            <p className="text-[11px] text-[var(--ink-secondary)] font-typewriter truncate max-w-xs sm:max-w-md">
              {t.schoolSubName}
            </p>
          </div>
        </Link>

        {/* Navigation Tabs (Home / Archive / Share) */}
        <nav className="flex items-center gap-2 font-typewriter text-xs">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded border-2 transition-all flex items-center gap-1.5 font-bold ${
              pathname === "/"
                ? "bg-[#0D7A3E] text-white border-[#074723] shadow-xs"
                : "bg-[var(--manila-folder-tab)] text-[var(--ink-primary)] border-[var(--manila-border)] hover:bg-[var(--manila-card)]"
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>{t.navHome}</span>
          </Link>

          <Link
            href="/archive"
            className={`px-3 py-1.5 rounded border-2 transition-all flex items-center gap-1.5 font-bold ${
              pathname === "/archive"
                ? "bg-[#0D7A3E] text-white border-[#074723] shadow-xs"
                : "bg-[var(--manila-folder-tab)] text-[var(--ink-primary)] border-[var(--manila-border)] hover:bg-[var(--manila-card)]"
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>{t.navArchive}</span>
          </Link>

          <Link
            href="/share"
            className={`px-3 py-1.5 rounded border-2 transition-all flex items-center gap-1.5 font-bold ${
              pathname === "/share"
                ? "bg-[#D7262D] text-white border-[#A9141A] shadow-xs"
                : "bg-[var(--manila-folder-tab)] text-[var(--ink-primary)] border-[var(--manila-border)] hover:bg-[var(--manila-card)]"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{t.navShare}</span>
          </Link>
        </nav>

        {/* Right Controls: Language Switcher + Dark Mode Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Switcher */}
          <div className="inline-flex border-2 border-[var(--manila-border)] rounded bg-[var(--manila-folder-tab)] p-0.5 text-xs font-typewriter font-bold shadow-2xs">
            {(["ar", "fr", "en"] as Language[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  lang === l
                    ? "bg-[#0D7A3E] text-white shadow-xs"
                    : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                }`}
              >
                {l === "ar" ? "العربية" : l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={theme === "light" ? t.themeDark : t.themeLight}
            className="h-8 px-2.5 rounded border-2 border-[var(--manila-border)] bg-[var(--manila-folder-tab)] text-[var(--ink-primary)] flex items-center gap-1.5 cursor-pointer hover:bg-[var(--manila-card)] transition-colors shadow-2xs font-typewriter text-xs font-bold"
          >
            {theme === "light" ? (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                <span className="hidden sm:inline">{t.themeDark}</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{t.themeLight}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
