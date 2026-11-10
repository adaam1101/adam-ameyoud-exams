"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useThemeLang } from "@/lib/ThemeLangContext";
import { ENSB_DEPARTMENTS, ENSB_PALIERS } from "@/lib/ensb-data";
import {
  Folder,
  Upload,
  BookOpen,
  GraduationCap,
  Mail,
  Phone,
  PenTool,
  CheckCircle2,
  ShieldCheck,
  Building2,
  ArrowRight,
  ArrowLeft,
  Users,
} from "lucide-react";

export default function LandingPage() {
  const { lang, t } = useThemeLang();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--manila-bg)] text-[var(--ink-primary)]">
      <SiteHeader />

      <main className="flex-1 space-y-12 py-10 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        {/* =========================================================================
            HERO DOSSIER: Introduction to the Platform Purpose
            ========================================================================= */}
        <section className="folder-container theme-green">
          <div className="folder-tab green-tab">
            <span>CLASSEUR CENTRAL • PRÉSENTATION DE LA PLATEFORME</span>
          </div>
          <div className="folder-body p-6 sm:p-10 space-y-6">
            <div className="paperclip" />

            {/* Stamps and tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="stamp-seal stamp-green">
                INITIATIVE ÉTUDIANTE INDÉPENDANTE
              </span>
              <span className="stamp-seal stamp-red">
                100% SUJETS RÉELS • ZÉRO CONTENU VIRTUEL
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--heading-green)] leading-tight font-typewriter">
                {t.landingTitle}
              </h1>
              <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
                {t.landingSubtitle}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-typewriter">
              <Link
                href="/archive"
                className="inline-flex items-center gap-2 bg-[#0D7A3E] hover:bg-[#074723] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded border-2 border-[#074723] shadow-xs transition-transform active:scale-97"
              >
                <Folder className="w-4 h-4" />
                <span>{t.ctaBrowseArchive}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>

              <Link
                href="/share"
                className="inline-flex items-center gap-2 bg-[#D7262D] hover:bg-[#A9141A] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded border-2 border-[#A9141A] shadow-xs transition-transform active:scale-97"
              >
                <Upload className="w-4 h-4" />
                <span>{t.ctaShareFile}</span>
              </Link>
            </div>

            {/* Handwritten marginal note */}
            <div className="pt-2 border-t-2 border-dashed border-[var(--manila-border)] flex items-center gap-3">
              <PenTool className="w-4 h-4 text-[#0D7A3E] dark:text-[#22C55E] shrink-0" />
              <span className="font-hand text-xl text-[var(--heading-green)] font-bold">
                ✎ « Pour que chaque promo de l&apos;ENS de Bouzaréah trouve ses annales en un clic. »
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 1: PURPOSE OF THE SITE (Why it was created & How it works)
            ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="stamp-seal stamp-green font-typewriter">
              {t.purposeTag}
            </span>
            <span className="font-hand text-xl text-[var(--heading-green)] font-bold">
              Objectifs &amp; Fonctionnement
            </span>
          </div>

          <div className="folder-container">
            <div className="folder-tab">
              DOSSIER PÉDAGOGIQUE • MISSION &amp; RÈGLES
            </div>
            <div className="folder-body p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--heading-green)] font-typewriter">
                  {t.purposeTitle}
                </h2>
                <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
                  {t.purposeLead}
                </p>
              </div>

              {/* 3 Physical Manifesto Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-typewriter">
                {/* Card 1 */}
                <div className="group flex flex-col">
                  <div className="retro-card-tab green-tab">
                    <span>📁 PILIER 01 • STRUCTURATION</span>
                  </div>
                  <div className="retro-filing-card p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="vintage-tape" />
                    <div className="mini-paperclip" />
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="stamp-seal stamp-green text-[10px]">ORGANISATION ENSB</span>
                        <div className="w-8 h-8 rounded-md bg-[var(--ensb-green-light)] text-[var(--heading-green)] border border-[var(--ensb-green)] flex items-center justify-center">
                          <Building2 className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="text-sm font-extrabold text-[var(--ink-primary)] font-typewriter">
                        {t.card1Title}
                      </h3>
                      <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                        {t.card1Body}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-dashed border-[var(--manila-border)] font-hand text-lg text-[var(--heading-green)] font-bold">
                      ✎ « 8 Départements &amp; 4 Cursus Officiels classés sans fouillis »
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group flex flex-col">
                  <div className="retro-card-tab red-tab">
                    <span>🛡️ PILIER 02 • 100% AUTHENTIQUE</span>
                  </div>
                  <div className="retro-filing-card p-5 space-y-3 flex-1 flex flex-col justify-between border-[#D7262D]/40">
                    <div className="vintage-tape" />
                    <div className="mini-paperclip" />
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="stamp-seal stamp-red text-[10px]">ZÉRO CONTENU VIRTUEL</span>
                        <div className="w-8 h-8 rounded-md bg-[var(--ensb-quill-light)] text-[#D7262D] border border-[#D7262D] flex items-center justify-center">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="text-sm font-extrabold text-[var(--ink-primary)] font-typewriter">
                        {t.card2Title}
                      </h3>
                      <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                        {t.card2Body}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-dashed border-[var(--manila-border)] font-hand text-lg text-[#D7262D] dark:text-[#F87171] font-bold">
                      ✎ « Vrais examens passés par nos étudiants, zéro fake ! »
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group flex flex-col">
                  <div className="retro-card-tab green-tab">
                    <span>🤝 PILIER 03 • ENTRAIDE</span>
                  </div>
                  <div className="retro-filing-card p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="vintage-tape" />
                    <div className="mini-paperclip" />
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="stamp-seal stamp-green text-[10px]">PATRIMOINE ÉTUDIANT</span>
                        <div className="w-8 h-8 rounded-md bg-[var(--ensb-green-light)] text-[var(--heading-green)] border border-[var(--ensb-green)] flex items-center justify-center">
                          <Users className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="text-sm font-extrabold text-[var(--ink-primary)] font-typewriter">
                        {t.card3Title}
                      </h3>
                      <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                        {t.card3Body}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-dashed border-[var(--manila-border)] font-hand text-lg text-[var(--heading-green)] font-bold">
                      ✎ « Pour nous et pour chaque promo future de Bouzaréah »
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Official Training Paliers Breakdown */}
              <div className="pt-6 border-t-2 border-[var(--manila-border)] space-y-4">
                <div className="flex items-center justify-between font-typewriter text-xs">
                  <div className="flex items-center gap-2">
                    <span className="stamp-seal stamp-green text-[10px]">CURSUS OFFICIELS</span>
                    <span className="font-bold text-[var(--heading-green)] uppercase tracking-wide">
                      {t.paliersTitle} (CURSUS DE L&apos;ÉCOLE)
                    </span>
                  </div>
                  <span className="text-[var(--ink-muted)] hidden sm:inline font-mono">ENS Bouzaréah</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-typewriter text-xs">
                  {ENSB_PALIERS.map((p, idx) => {
                    const isRed = p.id === "MASTER";
                    return (
                      <div key={p.id} className="group flex flex-col">
                        <div className={`retro-card-tab ${isRed ? "red-tab" : "green-tab"}`}>
                          <span>📁 DOSSIER 0{idx + 1} • {p.code}</span>
                        </div>
                        <div className="retro-filing-card p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                          <div className="vintage-tape" />
                          <div className="mini-paperclip" />
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className={`px-2 py-0.5 rounded text-white text-[11px] font-extrabold ${isRed ? "bg-[#D7262D]" : "bg-[#0D7A3E]"}`}>
                                {p.code}
                              </span>
                              <span className="text-[10px] text-[var(--ink-muted)] font-bold px-1.5 py-0.5 rounded bg-[var(--manila-bg)] border border-[var(--manila-border)]">
                                ⏱ {p.duration[lang]}
                              </span>
                            </div>
                            <div className="font-extrabold text-[var(--ink-primary)] text-xs leading-snug pt-0.5">
                              {p.name[lang]}
                            </div>
                            <p className="text-[11px] text-[var(--ink-secondary)] leading-relaxed">
                              {p.description[lang]}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-dashed border-[var(--manila-border)] flex items-center justify-between text-[10px] text-[var(--ink-muted)]">
                            <span className="font-hand text-base text-[var(--heading-green)] font-bold">
                              {p.id === "PAP" ? "✎ École Primaire" : p.id === "PEM" ? "✎ Collège (CEM)" : p.id === "PES" ? "✎ Enseignement Lycée" : "✎ Recherche & Doctorat"}
                            </span>
                            <span className="font-mono font-bold">ENSB</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* The 8 Official Departments List */}
              <div className="pt-6 border-t-2 border-[var(--manila-border)] space-y-4">
                <div className="flex items-center justify-between font-typewriter text-xs">
                  <div className="flex items-center gap-2">
                    <span className="stamp-seal stamp-green text-[10px]">INDEXATION</span>
                    <span className="font-bold text-[var(--heading-green)] uppercase tracking-wide">
                      {t.departmentsTitle}
                    </span>
                  </div>
                  <Link href="/archive" className="text-[var(--heading-green)] font-bold hover:underline flex items-center gap-1">
                    <span>{t.viewDepartmentFiles}</span>
                    <span>→</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 font-typewriter text-xs">
                  {ENSB_DEPARTMENTS.map((dept, idx) => {
                    const sampleNotes: Record<string, string> = {
                      ARA: "النحو، البلاغة، الأدب",
                      FRA: "Linguistique & Didactique",
                      ANG: "Phonetics & Literature",
                      HIS: "Histoire & Géographie",
                      PHI: "Philosophie & Logique",
                      AMZ: "Linguistique Tamazight",
                      EPS: "Pédagogie & Biomécanique",
                      EDU: "Psychologie & Pédagogie",
                    };
                    return (
                      <Link
                        key={dept.id}
                        href={`/archive?dept=${dept.id}`}
                        className="group flex flex-col block transition-all"
                      >
                        <div className="retro-card-tab green-tab group-hover:scale-102 transition-transform">
                          <span>🏷️ DEP 0{idx + 1} • {dept.code}</span>
                        </div>
                        <div className="retro-filing-card p-3.5 space-y-2 flex-1 flex flex-col justify-between group-hover:border-[#0D7A3E]">
                          <div className="mini-paperclip" />
                          <div className="flex items-start gap-2.5">
                            <div className="w-8 h-8 rounded bg-[var(--manila-folder-tab)] border border-[var(--manila-border)] group-hover:border-[#0D7A3E] group-hover:bg-[#0D7A3E] group-hover:text-white text-[var(--heading-green)] font-extrabold flex items-center justify-center shrink-0 transition-colors shadow-2xs font-mono text-xs">
                              0{idx + 1}
                            </div>
                            <div className="min-w-0">
                              <div className="font-extrabold text-[var(--ink-primary)] leading-tight text-xs group-hover:text-[var(--heading-green)] transition-colors">
                                {dept.name[lang]}
                              </div>
                              <div className="text-[10px] text-[var(--ink-muted)] truncate mt-0.5">
                                {dept.sampleModules.slice(0, 2).map((m) => m[lang]).join(", ")}...
                              </div>
                            </div>
                          </div>
                          <div className="pt-1.5 border-t border-dashed border-[var(--manila-border)] flex items-center justify-between text-[10px]">
                            <span className="font-hand text-sm text-[var(--heading-green)] font-bold">
                              ✎ {sampleNotes[dept.code] || "Annales & Cours"}
                            </span>
                            <span className="font-bold text-[var(--heading-green)] group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: ADAM AMEYOUD - CREATOR & OFFICIAL CONTACT
            ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="stamp-seal stamp-green font-typewriter">
              {t.founderTag}
            </span>
            <span className="font-hand text-xl text-[var(--heading-green)] font-bold">
              Initiateur du Projet
            </span>
          </div>

          <div className="folder-container theme-green">
            <div className="folder-tab green-tab">
              FICHE D&apos;IDENTITÉ DU CONCEPTEUR • ADAM AMEYOUD
            </div>
            <div className="folder-body p-6 sm:p-10 space-y-6">
              <div className="paperclip" />

              {/* Creator Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[var(--manila-border)] pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-[#074723] dark:bg-[#122B1C] text-white border-2 border-[#0D7A3E] dark:border-[#22C55E] flex items-center justify-center font-typewriter font-extrabold text-2xl shadow-sm shrink-0">
                    AA
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="stamp-seal stamp-green font-typewriter text-[10px]">
                        ÉTUDIANT ENSB
                      </span>
                      <span className="font-hand text-xl text-[var(--heading-green)] font-bold">
                        Promo 2026
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--heading-green)] font-typewriter mt-0.5">
                      {t.founderTitle}
                    </h3>
                    <p className="text-xs font-typewriter text-[var(--ink-secondary)]">
                      {t.founderRole}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-typewriter text-[var(--ink-muted)]">
                  {t.founderSchoolValue}
                </div>
              </div>

              {/* Personal Handwritten Statement by Adam */}
              <div className="p-4 sm:p-5 rounded-lg bg-[var(--manila-bg)] border-2 border-dashed border-[#0D7A3E] dark:border-[#22C55E] space-y-2">
                <div className="font-hand text-xl sm:text-2xl text-[var(--heading-green)] font-bold leading-relaxed">
                  « {t.founderBio} »
                </div>
                <div className="font-typewriter text-xs text-[var(--ink-muted)] text-end">
                  — Adam Ameyoud (adam.ameyoud@ensb.dz)
                </div>
              </div>

              {/* Contact Information & Direct Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-typewriter text-xs">
                {/* Official Email */}
                <div className="flex flex-col">
                  <div className="retro-card-tab green-tab">
                    <span>✉️ DOSSIER CONTACT • EMAIL OFFICIEL</span>
                  </div>
                  <a
                    href="mailto:adam.ameyoud@ensb.dz"
                    className="retro-filing-card p-4 hover:border-[#0D7A3E] transition-all flex flex-col justify-between shadow-2xs group flex-1"
                  >
                    <div className="vintage-tape" />
                    <div className="mini-paperclip" />
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-lg bg-[var(--ensb-green-light)] text-[var(--heading-green)] flex items-center justify-center shrink-0 border border-[var(--ensb-green)] group-hover:scale-105 transition-transform">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-extrabold text-[var(--ink-muted)] block uppercase text-[10px]">
                          {t.founderEmailLabel}
                        </span>
                        <span className="font-extrabold text-[var(--heading-green)] text-xs sm:text-sm truncate block mt-0.5 font-mono">
                          adam.ameyoud@ensb.dz
                        </span>
                      </div>
                    </div>
                    <div className="pt-2 mt-3 border-t border-dashed border-[var(--manila-border)] flex items-center justify-between text-[11px]">
                      <span className="font-hand text-base text-[var(--heading-green)] font-bold">
                        ✎ « Écrivez-moi pour toute question ou envoi groupé »
                      </span>
                      <span className="font-bold text-[var(--heading-green)] group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </a>
                </div>

                {/* WhatsApp & Phone */}
                <div className="flex flex-col">
                  <div className="retro-card-tab green-tab">
                    <span>💬 DOSSIER CONTACT • WHATSAPP DIRECT</span>
                  </div>
                  <a
                    href="https://wa.me/213795523399"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="retro-filing-card p-4 hover:border-[#0D7A3E] transition-all flex flex-col justify-between shadow-2xs group flex-1"
                  >
                    <div className="vintage-tape" />
                    <div className="mini-paperclip" />
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-lg bg-[var(--ensb-green-light)] text-[var(--heading-green)] flex items-center justify-center shrink-0 border border-[var(--ensb-green)] group-hover:scale-105 transition-transform">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-extrabold text-[var(--ink-muted)] block uppercase text-[10px]">
                          {t.founderPhoneLabel}
                        </span>
                        <span className="font-extrabold text-[var(--heading-green)] text-xs sm:text-sm block mt-0.5 font-mono" dir="ltr">
                          +213 795 52 33 99
                        </span>
                      </div>
                    </div>
                    <div className="pt-2 mt-3 border-t border-dashed border-[var(--manila-border)] flex items-center justify-between text-[11px]">
                      <span className="font-hand text-base text-[var(--heading-green)] font-bold">
                        ✎ « Disponible par message WhatsApp ou appel »
                      </span>
                      <span className="font-bold text-[var(--heading-green)] group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Direct Buttons to open email or WhatsApp */}
              <div className="flex flex-wrap items-center gap-3 pt-2 font-typewriter">
                <a
                  href="mailto:adam.ameyoud@ensb.dz"
                  className="inline-flex items-center gap-2 bg-[#0D7A3E] hover:bg-[#074723] text-white text-xs font-bold px-4 py-2.5 rounded border border-[#074723]"
                >
                  <Mail className="w-4 h-4" />
                  <span>{t.emailBtn}</span>
                </a>
                <a
                  href="https://wa.me/213795523399"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[var(--manila-folder-tab)] text-[var(--ink-primary)] hover:bg-[var(--manila-card)] text-xs font-bold px-4 py-2.5 rounded border-2 border-[var(--manila-border)]"
                >
                  <Phone className="w-4 h-4 text-[#0D7A3E]" />
                  <span>{t.whatsappBtn}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
