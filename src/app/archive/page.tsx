"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useThemeLang } from "@/lib/ThemeLangContext";
import {
  AcademicResource,
  ENSB_DEPARTMENTS,
  ENSB_PALIERS,
  RESOURCE_TYPES,
} from "@/lib/ensb-data";
import {
  Search,
  Upload,
  Download,
  ExternalLink,
  Folder,
  Trash2,
  PenTool,
  Paperclip,
} from "lucide-react";

function formatFileSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

function ArchiveContent() {
  const { lang, t } = useThemeLang();
  const searchParams = useSearchParams();

  const [resources, setResources] = useState<AcademicResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [selectedPalier, setSelectedPalier] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSemester, setSelectedSemester] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [adminPin, setAdminPin] = useState<string | null>(null);

  // Load URL dept param if passed (e.g. /archive?dept=francais)
  useEffect(() => {
    const deptParam = searchParams.get("dept");
    if (deptParam && ENSB_DEPARTMENTS.some((d) => d.id === deptParam)) {
      setSelectedDept(deptParam);
    }
  }, [searchParams]);

  // Fetch live resources from API
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.resources)) {
          setResources(data.resources);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch archive resources:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const selectedDeptObj = useMemo(
    () => ENSB_DEPARTMENTS.find((d) => d.id === selectedDept),
    [selectedDept]
  );

  const departmentCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const dept of ENSB_DEPARTMENTS) {
      map[dept.id] = 0;
    }
    for (const r of resources) {
      map[r.departmentId] = (map[r.departmentId] || 0) + 1;
    }
    return map;
  }, [resources]);

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      if (selectedDept !== "all" && item.departmentId !== selectedDept) return false;
      if (selectedPalier !== "all" && item.palierId !== selectedPalier) return false;
      if (selectedYear !== "all" && String(item.yearLevel) !== selectedYear) return false;
      if (selectedSemester !== "all" && item.semester !== selectedSemester) return false;
      if (selectedType !== "all" && item.resourceType !== selectedType) return false;

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchModule = item.moduleName.toLowerCase().includes(q);
        const matchProf = item.professorName?.toLowerCase().includes(q) ?? false;
        const matchContributor = item.contributorName.toLowerCase().includes(q);
        if (!matchTitle && !matchModule && !matchProf && !matchContributor) {
          return false;
        }
      }
      return true;
    });
  }, [
    resources,
    selectedDept,
    selectedPalier,
    selectedYear,
    selectedSemester,
    selectedType,
    searchQuery,
  ]);

  async function handleDownloadTrigger(resource: AcademicResource) {
    try {
      await fetch(`/api/resources/${resource.id}`, { method: "PATCH" });
      setResources((prev) =>
        prev.map((r) => (r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r))
      );
    } catch {
      // ignore
    }
  }

  async function handleDeleteResource(id: string) {
    if (!adminPin) return;
    try {
      const res = await fetch(`/api/resources/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-pin": adminPin,
        },
      });
      if (res.ok) {
        setResources((prev) => prev.filter((r) => r.id !== id));
      } else {
        alert("Code PIN invalide");
      }
    } catch {
      alert("Erreur de suppression");
    }
  }

  function toggleAdminMode() {
    if (adminPin) {
      setAdminPin(null);
      return;
    }
    const entered = window.prompt(t.adminPinPrompt);
    if (entered === "2026") {
      setAdminPin(entered);
    } else if (entered !== null) {
      alert("Code PIN incorrect");
    }
  }

  function resetAllFilters() {
    setSearchQuery("");
    setSelectedDept("all");
    setSelectedPalier("all");
    setSelectedYear("all");
    setSelectedSemester("all");
    setSelectedType("all");
  }

  return (
    <main className="flex-1 space-y-8 py-8 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      {/* =========================================================================
          TIROIR DE RECHERCHE ARCHIVISTIQUE (Library Card Catalog Search)
          ========================================================================= */}
      <div className="bg-[var(--manila-card)] border-2 border-[var(--manila-border)] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[var(--manila-border)] pb-3 font-typewriter text-xs">
          <div className="flex items-center gap-2">
            <span className="stamp-seal stamp-green">{t.archiveHeaderTag}</span>
            <span className="font-bold text-[var(--heading-green)]">
              {selectedDeptObj ? selectedDeptObj.name[lang] : t.allDepartments}
            </span>
            <span className="font-bold text-[#D7262D]">
              [{filteredResources.length} {t.resultsShowing}]
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/share"
              className="inline-flex items-center gap-1.5 bg-[#D7262D] hover:bg-[#A9141A] text-white text-xs font-typewriter font-bold px-3.5 py-1.5 rounded border border-[#A9141A] shadow-xs cursor-pointer transition-transform active:scale-97"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{t.ctaShareFile}</span>
            </Link>

            <button
              type="button"
              onClick={toggleAdminMode}
              className="text-[11px] font-mono text-[var(--ink-muted)] hover:underline cursor-pointer"
            >
              {adminPin ? t.adminExitBtn : t.adminModeBtn}
            </button>
          </div>
        </div>

        {/* Big Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[var(--ink-muted)] absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full ps-10 pe-10 py-3 bg-[var(--manila-bg)] border-2 border-[var(--manila-border)] rounded-lg text-sm text-[var(--ink-primary)] font-medium placeholder:text-[var(--ink-muted)] focus:outline-none focus:border-[#0D7A3E]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute end-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#D7262D] cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Controls Row: Paliers & Years */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 font-typewriter text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-[var(--heading-green)] me-1">PALIERS:</span>
            <button
              type="button"
              onClick={() => setSelectedPalier("all")}
              className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                selectedPalier === "all"
                  ? "bg-[#0D7A3E] text-white border-[#074723] font-bold"
                  : "bg-[var(--manila-folder-tab)] text-[var(--ink-secondary)] border-[var(--manila-border)] hover:bg-[var(--manila-card)]"
              }`}
            >
              {t.allPaliers}
            </button>
            {ENSB_PALIERS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPalier(p.id)}
                className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  selectedPalier === p.id
                    ? "bg-[#0D7A3E] text-white border-[#074723] font-bold"
                    : "bg-[var(--manila-folder-tab)] text-[var(--ink-secondary)] border-[var(--manila-border)] hover:bg-[var(--manila-card)]"
                }`}
              >
                {p.code}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-[var(--heading-green)] me-1">ANNÉE:</span>
            {[1, 2, 3, 4, 5].map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setSelectedYear(selectedYear === String(yr) ? "all" : String(yr))}
                className={`px-2.5 py-1 rounded border transition-colors cursor-pointer font-bold ${
                  selectedYear === String(yr)
                    ? "bg-[#D7262D] text-white border-[#A9141A]"
                    : "bg-[var(--manila-folder-tab)] text-[var(--ink-secondary)] border-[var(--manila-border)] hover:bg-[var(--manila-card)]"
                }`}
              >
                {yr}A
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          THE 8 DEPARTMENT BINDERS (Click to filter)
          ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-typewriter text-xs">
          <span className="font-bold text-[var(--heading-green)] uppercase tracking-wide">
            CLASSEURS DES 8 DÉPARTEMENTS ACADÉMIQUES
          </span>
          {selectedDept !== "all" && (
            <button
              type="button"
              onClick={() => setSelectedDept("all")}
              className="text-[#D7262D] font-bold hover:underline cursor-pointer"
            >
              [AFFICHER TOUS LES DÉPARTEMENTS]
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-typewriter text-xs">
          {ENSB_DEPARTMENTS.map((dept) => {
            const count = departmentCounts[dept.id] || 0;
            const isSelected = selectedDept === dept.id;
            return (
              <button
                key={dept.id}
                type="button"
                onClick={() => setSelectedDept(isSelected ? "all" : dept.id)}
                className={`p-2.5 rounded border-2 text-start transition-all cursor-pointer flex flex-col justify-between h-20 ${
                  isSelected
                    ? "bg-[#0D7A3E] text-white border-[#074723] shadow-xs"
                    : "bg-[var(--manila-card)] text-[var(--ink-primary)] border-[var(--manila-border)] hover:border-[#0D7A3E]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-[10px] uppercase opacity-85">
                    {dept.code}
                  </span>
                  <span className="text-[10px] font-mono px-1 rounded bg-black/10">
                    {count}
                  </span>
                </div>
                <div className="font-bold text-[11px] leading-tight line-clamp-2">
                  {dept.shortName[lang]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          DOCUMENT NATURE STAMPED BUTTONS
          ========================================================================= */}
      <div className="flex flex-wrap items-center gap-2 font-typewriter text-xs pt-1">
        <button
          type="button"
          onClick={() => setSelectedType("all")}
          className={`px-3 py-1.5 rounded border-2 transition-all cursor-pointer font-bold ${
            selectedType === "all"
              ? "bg-[#074723] text-white border-[#074723] shadow-xs"
              : "bg-[var(--manila-card)] text-[var(--ink-secondary)] border-[var(--manila-border)] hover:bg-[var(--manila-bg)]"
          }`}
        >
          {t.allTypes}
        </button>

        {RESOURCE_TYPES.map((rt) => (
          <button
            key={rt.id}
            type="button"
            onClick={() => setSelectedType(selectedType === rt.id ? "all" : rt.id)}
            className={`px-3 py-1.5 rounded border-2 transition-all cursor-pointer font-bold ${
              selectedType === rt.id
                ? rt.id === "exam" || rt.id === "rattrapage"
                  ? "bg-[#D7262D] text-white border-[#A9141A] shadow-xs"
                  : "bg-[#0D7A3E] text-white border-[#074723] shadow-xs"
                : "bg-[var(--manila-card)] text-[var(--ink-secondary)] border-[var(--manila-border)] hover:bg-[var(--manila-bg)]"
            }`}
          >
            {rt.name[lang]}
          </button>
        ))}

        {/* Clear Filters */}
        {(selectedDept !== "all" ||
          selectedPalier !== "all" ||
          selectedYear !== "all" ||
          selectedSemester !== "all" ||
          selectedType !== "all" ||
          searchQuery.trim() !== "") && (
          <button
            type="button"
            onClick={resetAllFilters}
            className="ms-auto font-hand text-lg font-bold text-[#D7262D] hover:underline cursor-pointer"
          >
            ✎ {t.clearFilters}
          </button>
        )}
      </div>

      {/* =========================================================================
          THE FOLDER CARDS GRID
          ========================================================================= */}
      {isLoading ? (
        <div className="folder-container theme-green max-w-xl mx-auto my-12 text-center p-8 space-y-4">
          <div className="w-10 h-10 border-4 border-[#0D7A3E] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-typewriter text-xs text-[var(--ink-secondary)]">
            {lang === "ar"
              ? "جاري فتح وفحص سجلات الأرشيف الأكاديمي..."
              : "Ouverture du classeur et consultation des archives académiques..."}
          </p>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="folder-container theme-green max-w-2xl mx-auto my-8">
          <div className="folder-tab green-tab">
            <span>{t.emptyArchiveTitle}</span>
          </div>
          <div className="folder-body p-8 sm:p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[var(--ensb-green-light)] border-2 border-dashed border-[#0D7A3E] text-[#0D7A3E] dark:text-[#22C55E] flex items-center justify-center mx-auto">
              <Folder className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[var(--heading-green)] font-typewriter">
                {t.emptyArchiveTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2 font-typewriter leading-relaxed max-w-md mx-auto">
                {t.emptyArchiveSubtitle}
              </p>
              <div className="font-hand text-2xl text-[var(--heading-green)] font-bold mt-3">
                « Soyez le premier étudiant à inaugurer ce dossier ! »
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/share"
                className="inline-flex items-center gap-2 bg-[#D7262D] hover:bg-[#A9141A] text-white font-typewriter font-bold text-xs sm:text-sm px-6 py-3 rounded border-2 border-[#A9141A] shadow-xs"
              >
                <Upload className="w-4 h-4" />
                <span>+ {t.ctaShareFile}</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((res, index) => {
            const deptObj = ENSB_DEPARTMENTS.find((d) => d.id === res.departmentId);
            const typeObj = RESOURCE_TYPES.find((rt) => rt.id === res.resourceType);
            const isExam = res.resourceType === "exam" || res.resourceType === "rattrapage";

            return (
              <div
                key={res.id}
                className={`folder-container ${isExam ? "theme-red" : "theme-green"}`}
              >
                {/* Physical Folder Tab on top */}
                <div
                  className={`folder-tab ${isExam ? "red-tab" : "green-tab"} flex items-center justify-between w-full max-w-[280px] sm:max-w-[320px]`}
                >
                  <span className="truncate">
                    {t.dossierNumberPrefix} 0{index + 1} • {res.palierId} ({res.yearLevel}A)
                  </span>
                  <span className="text-[10px] opacity-90">{res.semester}</span>
                </div>

                {/* Physical Folder Body */}
                <div className="folder-body flex flex-col justify-between space-y-4">
                  <div className="paperclip" />

                  <div>
                    {/* Badges & Stamps */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-typewriter text-xs">
                      <span className="font-extrabold text-[var(--heading-green)] px-2 py-0.5 bg-[var(--ensb-green-light)] border border-[#0D7A3E] dark:border-[#22C55E] rounded">
                        {deptObj ? deptObj.shortName[lang] : res.departmentId}
                      </span>

                      <span className={`stamp-seal ${isExam ? "stamp-red" : "stamp-green"}`}>
                        {typeObj ? typeObj.name[lang] : res.resourceType}
                      </span>
                    </div>

                    {/* Module & Document Title */}
                    <div className="space-y-1">
                      <span className="font-typewriter text-xs text-[var(--heading-green)] font-bold block uppercase tracking-wide">
                        MODULE : {res.moduleName}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[var(--ink-primary)] leading-snug">
                        {res.title}
                      </h3>
                    </div>

                    {/* Professor & Description */}
                    {(res.professorName || res.description) && (
                      <div className="mt-2 text-xs font-typewriter text-[var(--ink-secondary)] bg-[var(--manila-bg)] p-2.5 rounded border border-[var(--manila-border)] space-y-1">
                        {res.professorName && (
                          <div>
                            <strong>ENSEIGNANT:</strong> {res.professorName}
                          </div>
                        )}
                        {res.description && (
                          <div className="font-hand text-lg text-[var(--heading-green)] font-bold leading-tight">
                            ✎ Note : {res.description}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom Metadata & Actions */}
                  <div className="pt-3 border-t-2 border-dashed border-[var(--manila-border)] flex flex-wrap items-center justify-between gap-3 font-typewriter text-xs">
                    <div>
                      <div className="font-bold text-[var(--heading-green)]">
                        ANNÉE : {res.academicYear}
                      </div>
                      <div className="text-[11px] text-[var(--ink-muted)]">
                        PAR : <strong>{res.contributorName}</strong> ({new Date(res.createdAt).toLocaleDateString(lang === "ar" ? "ar-DZ" : "fr-DZ")})
                        {res.fileSize ? ` • ${formatFileSize(res.fileSize)}` : ""}
                      </div>
                    </div>

                    {/* Download / Open Action Buttons */}
                    <div className="flex items-center gap-2">
                      {res.fileUrl && (
                        <a
                          href={res.fileUrl}
                          download={res.fileName || true}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleDownloadTrigger(res)}
                          className="inline-flex items-center gap-1.5 bg-[#0D7A3E] hover:bg-[#074723] text-white text-xs font-typewriter font-bold px-3.5 py-2 rounded border border-[#074723] dark:border-[#22C55E] shadow-xs transition-transform active:scale-97"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{t.downloadBtn}</span>
                          {res.downloads > 0 && (
                            <span className="px-1.5 py-0.2 rounded bg-white/20 text-[10px]">
                              {res.downloads}
                            </span>
                          )}
                        </a>
                      )}

                      {res.externalUrl && (
                        <a
                          href={res.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleDownloadTrigger(res)}
                          className="inline-flex items-center gap-1.5 bg-[var(--manila-bg)] hover:bg-[var(--manila-card)] text-[var(--heading-green)] text-xs font-typewriter font-bold px-3 py-2 rounded border border-[#0D7A3E] dark:border-[#22C55E]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{t.openLinkBtn}</span>
                        </a>
                      )}

                      {adminPin && (
                        <button
                          type="button"
                          onClick={() => handleDeleteResource(res.id)}
                          className="p-2 rounded bg-red-100 hover:bg-red-200 text-red-700 transition-colors cursor-pointer"
                          title={t.deleteBtn}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default function ArchivePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--manila-bg)] text-[var(--ink-primary)]">
      <SiteHeader />
      <Suspense fallback={<div className="p-12 text-center font-typewriter">Chargement des dossiers d&apos;archives...</div>}>
        <ArchiveContent />
      </Suspense>
      <SiteFooter />
    </div>
  );
}
