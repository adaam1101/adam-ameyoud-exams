"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useThemeLang } from "@/lib/ThemeLangContext";

export function SiteFooter() {
  const { t } = useThemeLang();

  return (
    <footer className="bg-[#074723] dark:bg-[#07170E] text-[#FCFAF6] dark:text-[#E2EBE5] border-t-2 border-[#0D7A3E] dark:border-[#1E3A2B] py-6 px-4 sm:px-8 font-typewriter text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative shrink-0 bg-white dark:bg-[#122B1C] rounded p-0.5 border border-[#0D7A3E] dark:border-[#22C55E]">
            <Image src="/ensb-logo.webp" alt="ENSB" fill sizes="32px" className="object-contain" />
          </div>
          <span>{t.footerNote}</span>
        </div>
        <div className="flex items-center gap-4 text-center sm:text-end text-[#DCFCE7]">
          <Link href="/" className="hover:underline">
            {t.navHome}
          </Link>
          <span>•</span>
          <Link href="/archive" className="hover:underline">
            {t.navArchive}
          </Link>
          <span>•</span>
          <Link href="/share" className="hover:underline">
            {t.navShare}
          </Link>
        </div>
        <div className="text-center sm:text-end text-[#DCFCE7] font-mono">
          {t.footerCredits}
        </div>
      </div>
    </footer>
  );
}
