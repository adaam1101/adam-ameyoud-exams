"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useThemeLang } from "@/lib/ThemeLangContext";
import {
  ENSB_DEPARTMENTS,
  ENSB_PALIERS,
  RESOURCE_TYPES,
  ACADEMIC_YEARS,
  AcademicResource,
} from "@/lib/ensb-data";
import {
  Upload,
  CheckCircle2,
  FileText,
  Link as LinkIcon,
  Folder,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X,
  FileUp,
  Check,
} from "lucide-react";

function formatFileSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

export default function SharePage() {
  const router = useRouter();
  const { lang, t } = useThemeLang();
  const ArrowBackIcon = lang === "ar" ? ArrowRight : ArrowLeft;

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Core required fields with smart defaults
  const [formDept, setFormDept] = useState(ENSB_DEPARTMENTS[0].id);
  const [formType, setFormType] = useState<AcademicResource["resourceType"]>("exam");
  const [formModule, setFormModule] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formContributorName, setFormContributorName] = useState("");
  const [formContributorEmail, setFormContributorEmail] = useState("");

  // Upload method & files
  const [uploadMethod, setUploadMethod] = useState<"file" | "link">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formExternalUrl, setFormExternalUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Optional Advanced Details (Folded by default)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formPalier, setFormPalier] = useState<AcademicResource["palierId"]>("PES");
  const [formYear, setFormYear] = useState<number>(1);
  const [formSemester, setFormSemester] = useState<AcademicResource["semester"]>("S1");
  const [formAcademicYear, setFormAcademicYear] = useState(ACADEMIC_YEARS[0]);
  const [formProfessor, setFormProfessor] = useState("");
  const [formDescription, setFormDescription] = useState("");

  // Status & Feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedResource, setSubmittedResource] = useState<AcademicResource | null>(null);

  // Remember contributor name in localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("ensb_contributor_name");
    if (savedName) {
      setFormContributorName(savedName);
    } else {
      setFormContributorName(lang === "ar" ? "طالب(ة) بالمدرسة" : "Étudiant(e) ENSB");
    }
  }, [lang]);

  const currentDeptObj = useMemo(
    () => ENSB_DEPARTMENTS.find((d) => d.id === formDept) || ENSB_DEPARTMENTS[0],
    [formDept]
  );

  // Auto-generate title if user hasn't explicitly typed one
  function getAutoTitle(moduleVal: string, typeVal: string): string {
    const typeLabel = RESOURCE_TYPES.find((r) => r.id === typeVal)?.name[lang] || typeVal;
    if (moduleVal.trim()) {
      return `${typeLabel} — ${moduleVal.trim()} (${formAcademicYear})`;
    }
    return "";
  }

  function handleFileSelect(file: File) {
    setSelectedFile(file);
    setSubmitError(null);

    // If title is empty, prefill with clean file name
    if (!formTitle.trim()) {
      const cleanName = file.name
        .replace(/\.[^/.]+$/, "") // remove extension
        .replace(/[-_]/g, " ")
        .trim();
      setFormTitle(cleanName);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    // Validation
    if (uploadMethod === "file" && !selectedFile) {
      setSubmitError(
        lang === "ar"
          ? "يرجى سحب أو اختيار ملف الامتحان/الدرس أولاً."
          : lang === "fr"
          ? "Veuillez sélectionner ou glisser votre fichier de cours/examen."
          : "Please select or drop your file first."
      );
      return;
    }

    if (uploadMethod === "link" && !formExternalUrl.trim()) {
      setSubmitError(
        lang === "ar"
          ? "يرجى لصق رابط Google Drive أو السحابة."
          : lang === "fr"
          ? "Veuillez coller un lien Google Drive ou Cloud valide."
          : "Please enter a valid Google Drive or Cloud link."
      );
      return;
    }

    if (!formModule.trim()) {
      setSubmitError(
        lang === "ar"
          ? "يرجى كتابة اسم المقياس أو اختياره من القائمة السريعة."
          : lang === "fr"
          ? "Veuillez indiquer le nom du module (ou cliquer sur une suggestion)."
          : "Please specify the module name."
      );
      return;
    }

    const finalTitle = formTitle.trim() || getAutoTitle(formModule, formType) || "Document ENSB";
    const finalContributor = formContributorName.trim() || (lang === "ar" ? "طالب بالمدرسة" : "Étudiant ENSB");

    try {
      setIsSubmitting(true);
      const data = new FormData();
      data.append("title", finalTitle);
      data.append("departmentId", formDept);
      data.append("palierId", formPalier);
      data.append("yearLevel", String(formYear));
      data.append("semester", formSemester);
      data.append("resourceType", formType);
      data.append("moduleName", formModule.trim());
      data.append("academicYear", formAcademicYear);
      data.append("contributorName", finalContributor);

      if (formProfessor.trim()) data.append("professorName", formProfessor.trim());
      if (formDescription.trim()) data.append("description", formDescription.trim());
      if (formContributorEmail.trim()) data.append("contributorEmail", formContributorEmail.trim());

      if (uploadMethod === "file" && selectedFile) {
        data.append("file", selectedFile);
      } else if (uploadMethod === "link" && formExternalUrl.trim()) {
        data.append("externalUrl", formExternalUrl.trim());
      }

      const res = await fetch("/api/resources", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Upload failed");
      }

      // Save contributor name for future instant uploads
      localStorage.setItem("ensb_contributor_name", finalContributor);
      setSubmittedResource(json.resource);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Failed to upload document.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--manila-bg)] text-[var(--ink-primary)]">
      <SiteHeader />

      <main className="flex-1 py-8 px-4 sm:px-8 max-w-3xl mx-auto w-full space-y-6">
        {/* Navigation Breadcrumb Back to Archive */}
        <div className="flex items-center justify-between">
          <Link
            href="/archive"
            className="inline-flex items-center gap-1.5 font-typewriter text-xs font-bold text-[var(--heading-green)] hover:underline"
          >
            <ArrowBackIcon className="w-3.5 h-3.5" />
            <span>{t.backToArchiveBtn}</span>
          </Link>

          <span className="stamp-seal stamp-green font-typewriter text-[10px]">
            {t.quickUploadBadge}
          </span>
        </div>

        {/* =========================================================================
            EASY QUICK UPLOAD DOSSIER (Physical Manila Folder Layout)
            ========================================================================= */}
        <div className="folder-container theme-green">
          <div className="folder-tab green-tab">
            <span>DÉPÔT EXPRESS • ÉCOLE NORMALE SUPÉRIEURE DE BOUZARÉAH</span>
          </div>

          <div className="folder-body p-5 sm:p-8 space-y-6">
            <div className="paperclip" />

            {/* Header info */}
            <div className="border-b-2 border-[var(--manila-border)] pb-3 space-y-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--heading-green)] font-typewriter">
                {t.sharePageTitle}
              </h1>
              <p className="text-xs text-[var(--ink-secondary)]">
                {lang === "ar"
                  ? "3 خطوات بسيطة: اسحب الملف، اختر القسم والمقياس، واضغط إيداع!"
                  : lang === "fr"
                  ? "3 étapes simples : Glissez votre fichier, choisissez la filière et le module, puis déposez !"
                  : "3 easy steps: Drop your file, pick department & module, then submit!"}
              </p>
            </div>

            {/* SUCCESS STAMPED NOTICE */}
            {submittedResource ? (
              <div className="p-6 sm:p-8 rounded-lg bg-[var(--manila-bg)] border-2 border-dashed border-[#0D7A3E] text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E7F6ED] dark:bg-[#122B1C] text-[var(--heading-green)] flex items-center justify-center mx-auto border-2 border-[#0D7A3E] dark:border-[#22C55E]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <span className="stamp-seal stamp-green text-xs">
                    ARCHIVÉ AVEC SUCCÈS DANS LE CLASSEUR
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-typewriter text-[var(--heading-green)] pt-1">
                    {submittedResource.title}
                  </h3>
                  <p className="text-xs font-typewriter text-[var(--ink-secondary)]">
                    {currentDeptObj.name[lang]} • {submittedResource.moduleName}
                  </p>
                </div>

                <div className="font-hand text-xl text-[var(--heading-green)] font-bold">
                  « Merci ! Votre document est désormais accessible à tous les étudiants de l&apos;ENSB. »
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-center gap-3 font-typewriter">
                  <Link
                    href="/archive"
                    className="inline-flex items-center gap-2 bg-[#0D7A3E] hover:bg-[#074723] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded border border-[#074723] shadow-xs"
                  >
                    <Folder className="w-4 h-4" />
                    <span>Consulter le Classeur</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedResource(null);
                      setSelectedFile(null);
                      setFormTitle("");
                      setFormModule("");
                      setFormExternalUrl("");
                    }}
                    className="inline-flex items-center gap-2 bg-[var(--manila-folder-tab)] text-[var(--ink-primary)] hover:bg-[var(--manila-card)] text-xs sm:text-sm font-bold px-4 py-2.5 rounded border-2 border-[var(--manila-border)] cursor-pointer"
                  >
                    <span>+ Déposer un Autre Document</span>
                  </button>
                </div>
              </div>
            ) : (
              /* =========================================================================
                 THE SIMPLIFIED FORM (Easy, Friendly, 3 Clicks)
                 ========================================================================= */
              <form onSubmit={handleSubmit} className="space-y-6 font-typewriter text-xs">
                {submitError && (
                  <div className="p-3.5 rounded bg-red-50 dark:bg-red-950/40 text-[#D7262D] dark:text-[#F87171] font-typewriter text-xs font-bold border-2 border-[#D7262D] dark:border-[#DC2626]">
                    {submitError}
                  </div>
                )}

                {/* ===================================================================
                    STEP 1: THE HERO DROPZONE (Direct file or Drive link)
                    =================================================================== */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-[var(--heading-green)] text-xs uppercase tracking-wide">
                      1. {lang === "ar" ? "الملف أو الرابط" : "Votre Document / Fichier"} *
                    </label>

                    {/* Toggle between File upload and Drive Link */}
                    <button
                      type="button"
                      onClick={() => setUploadMethod(uploadMethod === "file" ? "link" : "file")}
                      className="text-[11px] text-[var(--heading-green)] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                    >
                      {uploadMethod === "file" ? (
                        <>
                          <LinkIcon className="w-3 h-3" />
                          <span>{t.orGoogleDrive}</span>
                        </>
                      ) : (
                        <>
                          <FileUp className="w-3 h-3" />
                          <span>
                            {lang === "ar" ? "← العودة إلى رفع ملف من الجهاز" : "← Téléverser un fichier local"}
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  {uploadMethod === "file" ? (
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.ppt,.pptx"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileSelect(e.target.files[0]);
                          }
                        }}
                      />

                      {!selectedFile ? (
                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                          }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`p-6 sm:p-8 rounded-lg border-2 border-dashed transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-2 group ${
                            isDragging
                              ? "border-[#0D7A3E] bg-[#E7F6ED] dark:bg-[#122B1C] scale-99"
                              : "border-[var(--manila-border)] bg-[var(--manila-bg)] hover:border-[#0D7A3E] hover:bg-[var(--manila-card)]"
                          }`}
                        >
                          <div className="w-12 h-12 rounded-full bg-[var(--manila-folder-tab)] border border-[var(--manila-border)] text-[#0D7A3E] dark:text-[#22C55E] flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                            <Upload className="w-6 h-6" />
                          </div>

                          <div className="space-y-0.5">
                            <p className="font-bold text-xs sm:text-sm text-[var(--ink-primary)]">
                              {t.dropzoneTitle}
                            </p>
                            <p className="text-[11px] text-[var(--ink-muted)]">
                              {t.dropzoneSub}
                            </p>
                          </div>
                        </div>
                      ) : (
                        /* Selected File Display */
                        <div className="p-4 rounded-lg bg-[var(--manila-bg)] border-2 border-[#0D7A3E] flex items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded bg-[#0D7A3E] text-white flex items-center justify-center shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-xs text-[var(--ink-primary)] truncate">
                                {selectedFile.name}
                              </div>
                              <div className="text-[10px] text-[var(--ink-muted)] flex items-center gap-2">
                                <span>{formatFileSize(selectedFile.size)}</span>
                                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                                  <Check className="w-3 h-3" /> Prêt
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFile(null);
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            className="text-[11px] font-bold text-[#D7262D] hover:underline px-2 py-1 rounded cursor-pointer shrink-0"
                          >
                            {t.removeFileBtn}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Direct Google Drive / Cloud Link Input */
                    <div className="p-4 rounded-lg bg-[var(--manila-bg)] border-2 border-[var(--manila-border)] space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-[var(--heading-green)]">
                        <LinkIcon className="w-4 h-4" />
                        <span>{t.fieldExternalLink}</span>
                      </div>
                      <input
                        type="url"
                        value={formExternalUrl}
                        onChange={(e) => setFormExternalUrl(e.target.value)}
                        placeholder="https://drive.google.com/file/d/... ou Mega..."
                        className="w-full px-3 py-2.5 rounded bg-[var(--manila-card)] border-2 border-[var(--manila-border)] text-xs font-bold text-[var(--ink-primary)] outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* ===================================================================
                    STEP 2: DEPARTMENT & DOCUMENT TYPE (One-Click Badges)
                    =================================================================== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Department Select */}
                  <div>
                    <label className="block font-bold text-[var(--heading-green)] mb-1 uppercase tracking-wide text-xs">
                      2. {t.fieldDepartment} *
                    </label>
                    <select
                      value={formDept}
                      onChange={(e) => {
                        setFormDept(e.target.value);
                        setFormModule(""); // reset module suggestion on change
                      }}
                      className="w-full px-3 py-2.5 rounded bg-[var(--manila-bg)] border-2 border-[var(--manila-border)] text-xs font-bold text-[var(--ink-primary)] outline-none cursor-pointer"
                    >
                      {ENSB_DEPARTMENTS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name[lang]}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Document Nature Selection Chips */}
                  <div>
                    <label className="block font-bold text-[var(--heading-green)] mb-1 uppercase tracking-wide text-xs">
                      3. {t.fieldResourceType} *
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {RESOURCE_TYPES.slice(0, 3).map((rt) => {
                        const isSelected = formType === rt.id;
                        return (
                          <button
                            key={rt.id}
                            type="button"
                            onClick={() => setFormType(rt.id as AcademicResource["resourceType"])}
                            className={`py-2 px-1.5 rounded border-2 text-[11px] font-bold transition-all text-center cursor-pointer truncate ${
                              isSelected
                                ? "bg-[#0D7A3E] text-white border-[#074723] shadow-xs"
                                : "bg-[var(--manila-bg)] text-[var(--ink-secondary)] border-[var(--manila-border)] hover:bg-[var(--manila-card)]"
                            }`}
                          >
                            {rt.name[lang]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ===================================================================
                    STEP 3: MODULE NAME + 1-CLICK PILL SUGGESTIONS
                    =================================================================== */}
                <div className="space-y-1.5">
                  <label className="block font-bold text-[var(--heading-green)] text-xs uppercase tracking-wide">
                    4. {t.fieldModule} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formModule}
                    onChange={(e) => setFormModule(e.target.value)}
                    placeholder={t.fieldModulePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded bg-[var(--manila-bg)] border-2 border-[var(--manila-border)] text-xs font-bold text-[var(--ink-primary)] outline-none"
                  />

                  {/* Quick Clickable Suggestions for chosen department */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-[var(--ink-muted)] font-bold">
                      {lang === "ar" ? "مقاييس شائعة:" : "Suggestions rapides :"}
                    </span>
                    {currentDeptObj.sampleModules.map((m, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormModule(m[lang])}
                        className={`px-2 py-0.5 rounded border text-[11px] font-bold cursor-pointer transition-colors ${
                          formModule === m[lang]
                            ? "bg-[#0D7A3E] text-white border-[#074723]"
                            : "bg-[var(--manila-card)] text-[var(--ink-secondary)] border-[var(--manila-border)] hover:border-[#0D7A3E]"
                        }`}
                      >
                        {m[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ===================================================================
                    OPTIONAL DETAILS ACCORDION (Folded away for extreme simplicity!)
                    =================================================================== */}
                <div className="border-2 border-dashed border-[var(--manila-border)] rounded-lg overflow-hidden bg-[var(--manila-bg)]">
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full p-3 flex items-center justify-between text-start text-xs font-bold text-[var(--heading-green)] cursor-pointer hover:bg-[var(--manila-card)] transition-colors"
                  >
                    <span>{t.optionalDetailsToggle}</span>
                    {showAdvanced ? (
                      <ChevronUp className="w-4 h-4 text-[var(--ink-muted)] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[var(--ink-muted)] shrink-0" />
                    )}
                  </button>

                  {showAdvanced && (
                    <div className="p-4 border-t-2 border-dashed border-[var(--manila-border)] bg-[var(--manila-card)] space-y-4 text-xs">
                      <p className="text-[11px] text-[var(--ink-muted)]">
                        {t.optionalDetailsSubtitle}
                      </p>

                      {/* Custom Title Override */}
                      <div>
                        <label className="block font-bold text-[var(--heading-green)] mb-1">
                          {t.fieldTitle}
                        </label>
                        <input
                          type="text"
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          placeholder={
                            getAutoTitle(formModule, formType) || t.fieldTitlePlaceholder
                          }
                          className="w-full px-3 py-2 rounded bg-[var(--manila-bg)] border border-[var(--manila-border)] text-xs font-bold text-[var(--ink-primary)] outline-none"
                        />
                      </div>

                      {/* Palier, Year, Semester, Academic Year */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block font-bold text-[var(--heading-green)] mb-1">
                            {t.fieldPalier}
                          </label>
                          <select
                            value={formPalier}
                            onChange={(e) => setFormPalier(e.target.value as AcademicResource["palierId"])}
                            className="w-full px-2 py-1.5 rounded bg-[var(--manila-bg)] border border-[var(--manila-border)] text-xs font-bold text-[var(--ink-primary)] outline-none"
                          >
                            {ENSB_PALIERS.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.code}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-[var(--heading-green)] mb-1">
                            {t.fieldYearLevel}
                          </label>
                          <select
                            value={formYear}
                            onChange={(e) => setFormYear(Number(e.target.value))}
                            className="w-full px-2 py-1.5 rounded bg-[var(--manila-bg)] border border-[var(--manila-border)] text-xs font-bold text-[var(--ink-primary)] outline-none"
                          >
                            {[1, 2, 3, 4, 5].map((yr) => (
                              <option key={yr} value={yr}>
                                {yr}A
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-[var(--heading-green)] mb-1">
                            {t.fieldSemester}
                          </label>
                          <select
                            value={formSemester}
                            onChange={(e) => setFormSemester(e.target.value as AcademicResource["semester"])}
                            className="w-full px-2 py-1.5 rounded bg-[var(--manila-bg)] border border-[var(--manila-border)] text-xs font-bold text-[var(--ink-primary)] outline-none"
                          >
                            <option value="S1">{t.semesterS1}</option>
                            <option value="S2">{t.semesterS2}</option>
                            <option value="Annual">{t.semesterAnnual}</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-[var(--heading-green)] mb-1">
                            {t.fieldAcademicYear}
                          </label>
                          <select
                            value={formAcademicYear}
                            onChange={(e) => setFormAcademicYear(e.target.value)}
                            className="w-full px-2 py-1.5 rounded bg-[var(--manila-bg)] border border-[var(--manila-border)] text-xs font-bold text-[var(--ink-primary)] outline-none"
                          >
                            {ACADEMIC_YEARS.map((ay) => (
                              <option key={ay} value={ay}>
                                {ay}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Professor & Note */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-[var(--heading-green)] mb-1">
                            {t.fieldProfessor}
                          </label>
                          <input
                            type="text"
                            value={formProfessor}
                            onChange={(e) => setFormProfessor(e.target.value)}
                            placeholder="ex: Dr. Benali..."
                            className="w-full px-3 py-2 rounded bg-[var(--manila-bg)] border border-[var(--manila-border)] text-xs font-bold text-[var(--ink-primary)] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-[var(--heading-green)] mb-1">
                            {t.fieldDescription}
                          </label>
                          <input
                            type="text"
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                            placeholder="ex: Sujet avec barème / Chapitre 1 à 4..."
                            className="w-full px-3 py-2 rounded bg-[var(--manila-bg)] border border-[var(--manila-border)] text-xs font-bold text-[var(--ink-primary)] outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ===================================================================
                    CONTRIBUTOR SIGNATURE (Pre-filled, remembers user)
                    =================================================================== */}
                <div className="pt-2 border-t-2 border-[var(--manila-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--ink-muted)]">
                      {lang === "ar" ? "المساهم:" : "Signé par :"}
                    </span>
                    <input
                      type="text"
                      value={formContributorName}
                      onChange={(e) => setFormContributorName(e.target.value)}
                      placeholder="Étudiant(e) ENSB"
                      className="px-2.5 py-1 rounded bg-[var(--manila-bg)] border border-[var(--manila-border)] font-bold text-[var(--heading-green)] outline-none w-48 text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/archive"
                      className="px-3.5 py-2 rounded border border-[var(--manila-border)] bg-[var(--manila-bg)] font-bold text-[var(--ink-secondary)] hover:bg-[var(--manila-card)]"
                    >
                      {t.cancelBtn}
                    </Link>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded bg-[#0D7A3E] hover:bg-[#074723] text-white font-bold border-2 border-[#074723] shadow-xs disabled:opacity-50 cursor-pointer transition-transform active:scale-97 text-xs flex items-center gap-1.5"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{isSubmitting ? t.submittingBtn : t.submitBtn}</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
