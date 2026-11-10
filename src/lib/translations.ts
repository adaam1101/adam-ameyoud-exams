import { Language } from "./ensb-data";

export interface TranslationsSchema {
  dir: "rtl" | "ltr";
  schoolMinistry: string;
  schoolOfficialName: string;
  schoolSubName: string;
  platformName: string;
  
  // Navigation
  navHome: string;
  navArchive: string;
  navShare: string;
  navContact: string;

  // Dark Mode & Theme
  themeLight: string;
  themeDark: string;

  // Landing Page: Purpose & Site Info
  landingTag: string;
  landingTitle: string;
  landingSubtitle: string;
  ctaBrowseArchive: string;
  ctaShareFile: string;
  
  purposeTag: string;
  purposeTitle: string;
  purposeLead: string;
  
  card1Title: string;
  card1Body: string;
  card2Title: string;
  card2Body: string;
  card3Title: string;
  card3Body: string;

  // Paliers
  paliersTag: string;
  paliersTitle: string;

  // 8 Departments
  departmentsTag: string;
  departmentsTitle: string;
  departmentsSub: string;
  viewDepartmentFiles: string;

  // Founder Section (Adam Ameyoud)
  founderTag: string;
  founderTitle: string;
  founderRole: string;
  founderBio: string;
  founderEmailLabel: string;
  founderPhoneLabel: string;
  founderSchoolLabel: string;
  founderSchoolValue: string;
  whatsappBtn: string;
  emailBtn: string;
  adminModeBtn: string;
  adminExitBtn: string;
  adminPinPrompt: string;

  // Archive Page (Catalog & Folders)
  archiveHeaderTag: string;
  archiveHeaderTitle: string;
  searchPlaceholder: string;
  allDepartments: string;
  allPaliers: string;
  allYears: string;
  allSemesters: string;
  allTypes: string;
  yearPrefix: string;
  yearSuffix: string;
  semesterS1: string;
  semesterS2: string;
  semesterAnnual: string;
  clearFilters: string;
  resultsShowing: string;
  dossierNumberPrefix: string;
  emptyArchiveTitle: string;
  emptyArchiveSubtitle: string;
  emptyArchiveCta: string;
  downloadBtn: string;
  openLinkBtn: string;
  deleteBtn: string;

  // Share Page (Dedicated Single Page Upload)
  sharePageTag: string;
  sharePageTitle: string;
  sharePageSub: string;
  fieldDepartment: string;
  fieldPalier: string;
  fieldYearLevel: string;
  fieldSemester: string;
  fieldResourceType: string;
  fieldModule: string;
  fieldModulePlaceholder: string;
  suggestedModulesLabel: string;
  fieldTitle: string;
  fieldTitlePlaceholder: string;
  fieldProfessor: string;
  fieldProfessorPlaceholder: string;
  fieldAcademicYear: string;
  fieldUploadMethod: string;
  methodFile: string;
  methodLink: string;
  fieldFileLabel: string;
  fieldFileHint: string;
  fieldExternalLink: string;
  fieldExternalLinkPlaceholder: string;
  fieldDescription: string;
  fieldDescriptionPlaceholder: string;
  fieldContributorName: string;
  fieldContributorNamePlaceholder: string;
  fieldContributorEmail: string;
  fieldContributorEmailPlaceholder: string;
  submitBtn: string;
  submittingBtn: string;
  cancelBtn: string;
  backToArchiveBtn: string;

  // Simplified Quick Deposit
  dropzoneTitle: string;
  dropzoneSub: string;
  orGoogleDrive: string;
  pasteDriveLinkPlaceholder: string;
  optionalDetailsToggle: string;
  optionalDetailsSubtitle: string;
  quickUploadBadge: string;
  removeFileBtn: string;

  // Footer
  footerNote: string;
  footerCredits: string;
}

export const TRANSLATIONS: Record<Language, TranslationsSchema> = {
  ar: {
    dir: "rtl",
    schoolMinistry: "الجمهورية الجزائرية الديمقراطية الشعبية — وزارة التعليم العالي والبحث العلمي",
    schoolOfficialName: "المدرسة العليا للأساتذة ببوزريعة",
    schoolSubName: "المدرسة العليا للأساتذة الشيخ مبارك بن محمد إبراهيمي الميلي — بوزريعة، الجزائر",
    platformName: "مكتبة بوزريعة (ENSB Library)",

    navHome: "الرئيسية والتعريف",
    navArchive: "أرشيف الامتحانات والدروس",
    navShare: "مشاركة وثيقة (صفحة مستقلة)",
    navContact: "معلومات المؤسس والاتصال",

    themeLight: "الوضع النهاري",
    themeDark: "الوضع الليلي",

    landingTag: "مبادرة طلابية أكاديمية موثقة — بدون محتوى وهمي",
    landingTitle: "المنصة الأكاديمية لطلبة المدرسة العليا للأساتذة ببوزريعة",
    landingSubtitle:
      "فضاء منظم ومفهرس يجمع مواضيع الامتحانات السابقة، التصحيحات النموذجية، المحاضرات، والأعمال الموجهة لجميع الأقسام والتخصصات والأطوار (ابتدائي PAP، متوسط PEM، ثانوي PES، وماستر) بمساهمة حقيقية من الطلبة لزملائهم.",
    ctaBrowseArchive: "تصفح ملفات الامتحانات والدروس",
    ctaShareFile: "مشاركة امتحان أو محاضرة الآن",

    purposeTag: "رسالة وأهداف المنصة",
    purposeTitle: "لماذا أُنشئت هذه المنصة الأكاديمية؟",
    purposeLead:
      "في نهاية كل سداسي وقبل الامتحانات، يضيع وقت ثمين لطلبة المدرسة في البحث عن مواضيع السنوات السابقة والمحاضرات وسط مجموعات تيليغرام وميسنجر المؤقتة والمبعثرة. أُنشئت هذه المنصة كأرشيف دائم ومرجع منظم، مصنف بدقة حسب القسم، الطور، السنة، والسداسي.",

    card1Title: "1. هيكلة أكاديمية دقيقة",
    card1Body:
      "كل وثيقة تُصنّف وفق الأقسام المعتمدة بالمدرسة (اللغة العربية، الفرنسية، الإنجليزية، التاريخ والجغرافيا، الفلسفة، الأمازيغية، التربية البدنية، وعلوم التربية المشتركة) والأطوار التعليمية المعتمدة.",
    card2Title: "2. مصداقية وشفافية مطلقة",
    card2Body:
      "لا توجد أي تقييمات مزيفة أو دروس مصطنعة أو إحصائيات وهمية. المنصة تعرض فقط ما يرفعه طلبة المدرسة الفعليون لخدمة زملائهم مع توثيق اسم المساهم وسنة الامتحان.",
    card3Title: "3. تضامن وتوارث المعرفة",
    card3Body:
      "عندما يرفع طالب موضوع امتحان اجتازه اليوم أو ملخصاً أعده، فإنه يبني رصيداً بيداغوجياً دائماً يستفيد منه زملاؤه والدفعات القادمة في مسارهم كإطارات للتربية والتعليم.",

    paliersTag: "أطوار التكوين بالمدرسة",
    paliersTitle: "أطوار التكوين البيداغوجي المعتمدة",

    departmentsTag: "الأقسام والتخصصات",
    departmentsTitle: "الأقسام البيداغوجية الثمانية بالمدرسة",
    departmentsSub: "اختر القسم لتصفح ملفاته الخاصة في الأرشيف مباشرة:",
    viewDepartmentFiles: "عرض ملفات القسم",

    founderTag: "بطاقة التعريف بمؤسس المبادرة",
    founderTitle: "آدم عميود (Adam Ameyoud)",
    founderRole: "طالب بالمدرسة العليا للأساتذة ببوزريعة — مصمم ومؤسس المنصة",
    founderBio:
      "صممتُ هذه المنصة بمبادرة طلابية مستقلة لخدمة طلبة مدرستنا (ENSB) في جميع التخصصات والسنوات، لتكون مرجعاً نظيفاً وخالياً من الفوضى لتبادل مواضيع الامتحانات والملخصات. لأي استفسار، اقتراح، أو إرسال حزم وثائق، يمكنكم التواصل معي مباشرة عبر البريد الأكاديمي أو الهاتف والواتساب.",
    founderEmailLabel: "البريد الأكاديمي الرسمي",
    founderPhoneLabel: "رقم الهاتف / واتساب",
    founderSchoolLabel: "المؤسسة الجامعية",
    founderSchoolValue: "المدرسة العليا للأساتذة ببوزريعة (ENSB - Alger)",
    whatsappBtn: "مراسلة عبر واتساب",
    emailBtn: "إرسال بريد إلكتروني",
    adminModeBtn: "وضع المشرف (آدم)",
    adminExitBtn: "إغلاق وضع المشرف",
    adminPinPrompt: "أدخل رمز المشرف (الافتراضي لآدم: 2026) لتفعيل حذف الوثائق:",

    archiveHeaderTag: "أرشيف الملفات الأكاديمية",
    archiveHeaderTitle: "سجل مواضيع الامتحانات، التصحيحات، والمحاضرات",
    searchPlaceholder: "ابحث عن مقياس (مثال: النحو، علم النفس، Phonetics، Didactique، تاريخ)...",
    allDepartments: "جميع الأقسام",
    allPaliers: "جميع الأطوار",
    allYears: "جميع السنوات",
    allSemesters: "جميع السداسيات",
    allTypes: "جميع أنواع الوثائق",
    yearPrefix: "السنة",
    yearSuffix: "",
    semesterS1: "السداسي الأول (S1)",
    semesterS2: "السداسي الثاني (S2)",
    semesterAnnual: "سنوي (Annuel)",
    clearFilters: "إلغاء التصفية وعرض الكل",
    resultsShowing: "ملف محفوظ في الأرشيف",
    dossierNumberPrefix: "ملف رقم",
    emptyArchiveTitle: "لا توجد وثائق في هذا الفلتر حالياً",
    emptyArchiveSubtitle:
      "التزاماً بمبدأ المصداقية: لا نضع أي دروس وهمية. الفهرس يعرض فقط الوثائق الحقيقية التي يرفعها الطلبة.",
    emptyArchiveCta: "كن أول من يرفع وثيقة في هذا القسم",
    downloadBtn: "تحميل الملف",
    openLinkBtn: "فتح الرابط",
    deleteBtn: "حذف",

    sharePageTag: "مشاركة وثيقة أكاديمية",
    sharePageTitle: "إيداع امتحان أو درس جديد في أرشيف ENSB",
    sharePageSub:
      "صفحة مخصصة لرفع مواضيع الامتحانات أو التصحيحات النموذجية أو المحاضرات. يمكنك رفع ملف مباشرة (PDF، صورة، Word) أو إدراج رابط Google Drive.",
    fieldDepartment: "القسم / التخصص الأكاديمي",
    fieldPalier: "طور التكوين (Palier)",
    fieldYearLevel: "السنة الدراسية",
    fieldSemester: "السداسي",
    fieldResourceType: "نوع الوثيقة",
    fieldModule: "اسم المقياس (Module)",
    fieldModulePlaceholder: "مثال: النحو والصرف / علم نفس النمو / Phonetics...",
    suggestedModulesLabel: "مقاييس شائعة في هذا القسم (اضغط للاختيار):",
    fieldTitle: "عنوان الوثيقة الواضح",
    fieldTitlePlaceholder: "مثال: امتحان السداسي الأول في اللسانيات مع التصحيح النموذجي",
    fieldProfessor: "اسم الأستاذ(ة) (اختياري)",
    fieldProfessorPlaceholder: "مثال: أ.د ...",
    fieldAcademicYear: "السنة الجامعية للامتحان أو الدرس",
    fieldUploadMethod: "طريقة إرفاق الوثيقة",
    methodFile: "رفع ملف من الجهاز (PDF / صورة / مستند)",
    methodLink: "رابط خارجي (Google Drive / OneDrive / Telegram)",
    fieldFileLabel: "اختر الملف (حتى 25 ميغابايت)",
    fieldFileHint: "يدعم ملفات PDF، الصور الواضحة لمواضيع الامتحانات (JPG/PNG/WEBP)، ومستندات Word.",
    fieldExternalLink: "رابط Google Drive أو السحابة",
    fieldExternalLinkPlaceholder: "https://drive.google.com/...",
    fieldDescription: "ملاحظات وتوجيهات إضافية للطلبة (اختياري)",
    fieldDescriptionPlaceholder: "مثال: يتضمن سلم التنقيط، التركيز على السؤال الثاني...",
    fieldContributorName: "اسمك ولقبك (أو صفة الطالب المساهم)",
    fieldContributorNamePlaceholder: "مثال: آدم عميود / طالب سنة ثالثة...",
    fieldContributorEmail: "بريدك الإلكتروني (اختياري)",
    fieldContributorEmailPlaceholder: "adam.ameyoud@ensb.dz",
    submitBtn: "أرشفة الوثيقة ونشرها الآن",
    submittingBtn: "جاري الرفع والحفظ في الأرشيف...",
    cancelBtn: "إلغاء",
    backToArchiveBtn: "← العودة إلى فهرس الامتحانات",

    dropzoneTitle: "اسحب ملف الامتحان أو الدرس هنا، أو اضغط للاختيار",
    dropzoneSub: "يدعم PDF، الصور الواضحة لمواضيع الامتحانات (JPG/PNG)، ومستندات Word (حتى 25 ميغابايت)",
    orGoogleDrive: "أو الصق رابط Google Drive / سحابة بدلاً من رفع ملف",
    pasteDriveLinkPlaceholder: "https://drive.google.com/...",
    optionalDetailsToggle: "⚙️ ضبط تفاصيل أكاديمية إضافية (الطور، السنة، السداسي، الأستاذ) — اختياري",
    optionalDetailsSubtitle: "تم ضبط الإعدادات النموذجية تلقائياً. يمكنك تخصيصها إذا رغبت.",
    quickUploadBadge: "إيداع سريع في 30 ثانية",
    removeFileBtn: "تغيير الملف",

    footerNote: "منصة طلابية تعاونية مخصصة لطلبة المدرسة العليا للأساتذة ببوزريعة (ENSB).",
    footerCredits: "تطوير وإشراف: آدم عميود (adam.ameyoud@ensb.dz • 213795523399)",
  },
  fr: {
    dir: "ltr",
    schoolMinistry: "République Algérienne Démocratique et Populaire — Ministère de l'Enseignement Supérieur",
    schoolOfficialName: "École Normale Supérieure de Bouzaréah (ENSB)",
    schoolSubName: "ENS Cheikh Mebarek Ben Mohamed Brahimi El Mili — Bouzaréah, Alger",
    platformName: "ENSB Library (Bibliothèque)",

    navHome: "Accueil & Mission",
    navArchive: "Classeur des Examens",
    navShare: "Déposer un Document (Page Dédiée)",
    navContact: "Fondateur & Contact",

    themeLight: "Mode Jour",
    themeDark: "Mode Nuit",

    landingTag: "Initiative Étudiante Ouverte — 100% Contenu Réel & Vérifié",
    landingTitle: "La Plateforme Académique des Étudiants de l'ENS de Bouzaréah",
    landingSubtitle:
      "Un espace structuré réunissant annales d'examens (EMD, rattrapages), corrigés types, cours polycopiés et fiches de TD pour tous les départements et paliers (PAP, PEM, PES, Master) de l'ENS de Bouzaréah.",
    ctaBrowseArchive: "Consulter les Classeurs d'Examens",
    ctaShareFile: "Partager un Sujet ou Cours",

    purposeTag: "Vocation & Objectifs du Projet",
    purposeTitle: "Pourquoi cette plateforme a-t-elle été conçue ?",
    purposeLead:
      "Chaque semestre, les sujets d'examens des années précédentes et les cours se perdent dans des groupes de discussion éphémères. Cette plateforme constitue une archive permanente, organisée rigoureusement par département, palier, année et semestre.",

    card1Title: "1. Indexation Pédagogique Claire",
    card1Body:
      "Classement méthodique par filière (Arabe, Français, Anglais, Histoire-Géo, Philosophie, Amazighe, EPS, Psychopédagogie commune) et par palier officiel d'enseignement.",
    card2Title: "2. Authenticité & Zéro Faux Contenu",
    card2Body:
      "Aucun faux avis, aucun cours inventé, aucune statistique artificielle. L'archive contient uniquement les documents authentiques déposés par les étudiants de l'école.",
    card3Title: "3. Solidarité & Entraide Inter-Promotions",
    card3Body:
      "En déposant un sujet d'examen ou un résumé, chaque étudiant contribue au patrimoine académique de l'école au bénéfice direct de ses camarades et des promotions futures.",

    paliersTag: "Paliers & Cycles de Formation",
    paliersTitle: "Cursus d'Enseignement Officiels de l'ENSB",

    departmentsTag: "Filières Académiques",
    departmentsTitle: "Les 8 Départements Pédagogiques",
    departmentsSub: "Sélectionnez votre département pour accéder directement à ses dossiers :",
    viewDepartmentFiles: "Ouvrir les dossiers du département",

    founderTag: "Conception & Administration",
    founderTitle: "Adam Ameyoud",
    founderRole: "Étudiant à l'ENS de Bouzaréah — Concepteur & Responsable de la plateforme",
    founderBio:
      "J'ai conçu cette plateforme à titre d'initiative étudiante pour offrir aux étudiants de notre école un espace propre, structuré et pérenne pour partager les sujets d'examens et cours de toutes les filières. Pour toute question, suggestion ou envoi d'archives groupées, contactez-moi directement par email ou WhatsApp.",
    founderEmailLabel: "Email Académique Officiel",
    founderPhoneLabel: "Téléphone & WhatsApp",
    founderSchoolLabel: "Établissement Universitaire",
    founderSchoolValue: "ENS de Bouzaréah (ENSB - Alger)",
    whatsappBtn: "Contacter sur WhatsApp",
    emailBtn: "Envoyer un Email",
    adminModeBtn: "Mode Admin (Adam)",
    adminExitBtn: "Quitter Mode Admin",
    adminPinPrompt: "Entrez le code administrateur (par défaut : 2026) pour supprimer un document :",

    archiveHeaderTag: "Répertoire Central des Dossiers",
    archiveHeaderTitle: "Classeur des Examens, Corrigés Types & Cours",
    searchPlaceholder: "Rechercher un module (ex: Morphosyntaxe, Phonetics, Didactique, Psychopédagogie)...",
    allDepartments: "Tous les Départements",
    allPaliers: "Tous les Paliers",
    allYears: "Toutes les Années",
    allSemesters: "Tous les Semestres",
    allTypes: "Tous Types de Documents",
    yearPrefix: "",
    yearSuffix: "e Année",
    semesterS1: "Semestre 1 (S1)",
    semesterS2: "Semestre 2 (S2)",
    semesterAnnual: "Annuel",
    clearFilters: "Réinitialiser les filtres",
    resultsShowing: "dossier(s) répertorié(s)",
    dossierNumberPrefix: "Dossier N°",
    emptyArchiveTitle: "Aucun document dans cette sélection pour l'instant",
    emptyArchiveSubtitle:
      "Conformément à notre règle de transparence : aucun faux document n'est pré-rempli. L'archive affiche uniquement les dépôts réels des étudiants.",
    emptyArchiveCta: "Inaugurer ce dossier maintenant",
    downloadBtn: "Télécharger",
    openLinkBtn: "Ouvrir Lien",
    deleteBtn: "Supprimer",

    sharePageTag: "Dépôt de Document Académique",
    sharePageTitle: "Déposer un Examen ou Cours dans l'Archive ENSB",
    sharePageSub:
      "Page dédiée pour partager un sujet d'examen, un corrigé ou un cours. Vous pouvez téléverser directement un fichier (PDF, image, Word) ou insérer un lien Google Drive.",
    fieldDepartment: "Département / Filière",
    fieldPalier: "Palier de Formation",
    fieldYearLevel: "Année d'Étude",
    fieldSemester: "Semestre",
    fieldResourceType: "Type de Document",
    fieldModule: "Intitulé du Module",
    fieldModulePlaceholder: "ex: Morphosyntaxe, Linguistique, Psychologie...",
    suggestedModulesLabel: "Modules fréquents dans cette filière (cliquez pour choisir) :",
    fieldTitle: "Titre Précis du Sujet / Cours",
    fieldTitlePlaceholder: "ex: Examen S1 Morphosyntaxe avec Corrigé Type",
    fieldProfessor: "Nom de l'Enseignant(e) (Optionnel)",
    fieldProfessorPlaceholder: "ex: Pr. ...",
    fieldAcademicYear: "Année Universitaire du Sujet",
    fieldUploadMethod: "Mode de Transmission",
    methodFile: "Téléverser un Fichier (PDF / Image / Word)",
    methodLink: "Lien Externe (Google Drive / OneDrive / Telegram)",
    fieldFileLabel: "Sélectionner le fichier (Max 25 Mo)",
    fieldFileHint: "Formats acceptés : PDF, photos nettes d'examens (JPG, PNG, WEBP), DOCX.",
    fieldExternalLink: "Lien Google Drive ou Cloud",
    fieldExternalLinkPlaceholder: "https://drive.google.com/...",
    fieldDescription: "Précisions ou remarques utiles pour les camarades (Optionnel)",
    fieldDescriptionPlaceholder: "ex: Barème sur 20, indications sur les chapitres...",
    fieldContributorName: "Votre Nom / Prénom (ou mention étudiant)",
    fieldContributorNamePlaceholder: "ex: Adam Ameyoud / Étudiant 2A PEM",
    fieldContributorEmail: "Votre Email (Optionnel)",
    fieldContributorEmailPlaceholder: "adam.ameyoud@ensb.dz",
    submitBtn: "Archiver et Publier dans le Classeur",
    submittingBtn: "Enregistrement du dossier en cours...",
    cancelBtn: "Annuler",
    backToArchiveBtn: "← Retour au Classeur des Examens",

    dropzoneTitle: "Glissez votre sujet d'examen ou cours ici, ou cliquez pour parcourir",
    dropzoneSub: "Accepte PDF, photos nettes d'examens (JPG/PNG) et Word (jusqu'à 25 Mo)",
    orGoogleDrive: "Ou coller un lien Google Drive / Cloud à la place d'un fichier",
    pasteDriveLinkPlaceholder: "https://drive.google.com/...",
    optionalDetailsToggle: "⚙️ Préciser plus de détails (Palier, Année, Semestre, Enseignant) — Optionnel",
    optionalDetailsSubtitle: "Les valeurs courantes sont pré-remplies. Modifiez-les seulement si nécessaire.",
    quickUploadBadge: "Dépôt Express en 30 secondes",
    removeFileBtn: "Changer de fichier",

    footerNote: "Plateforme académique étudiante dédiée à l'École Normale Supérieure de Bouzaréah (ENSB).",
    footerCredits: "Conception & Maintenance : Adam Ameyoud (adam.ameyoud@ensb.dz • +213 795 52 33 99)",
  },
  en: {
    dir: "ltr",
    schoolMinistry: "People's Democratic Republic of Algeria — Ministry of Higher Education",
    schoolOfficialName: "Higher Normal School of Bouzaréah (ENSB)",
    schoolSubName: "ENS Cheikh Mebarek Ben Mohamed Brahimi El Mili — Bouzaréah, Algiers",
    platformName: "ENSB Library",

    navHome: "Home & Purpose",
    navArchive: "Exams & Course Folders",
    navShare: "Share a Document (Single Page)",
    navContact: "Creator & Contact",

    themeLight: "Light Mode",
    themeDark: "Dark Mode",

    landingTag: "Open Student Initiative — 100% Real Academic Materials",
    landingTitle: "The Academic Repository for the Students of ENS Bouzaréah",
    landingSubtitle:
      "A structured platform bringing together past exam papers, answer keys, course handouts, and TD sheets across all 8 departments and all degree tracks (PAP, PEM, PES, Master) at ENS Bouzaréah.",
    ctaBrowseArchive: "Browse Exam & Course Folders",
    ctaShareFile: "Share an Exam or Lesson Now",

    purposeTag: "Platform Mission & Purpose",
    purposeTitle: "Why Was This Platform Created?",
    purposeLead:
      "Every exam period, valuable past exam papers and handouts get lost in ephemeral chat groups. This platform provides a permanent, cleanly cataloged digital library organized by department, degree track, year level, and semester.",

    card1Title: "1. Structured Academic Cataloging",
    card1Body:
      "Every document is organized by official ENSB departments (Arabic, French, English, History-Geo, Philosophy, Amazigh, Physical Education, and Educational Sciences) and training tracks.",
    card2Title: "2. 100% Authentic — Zero Fake Data",
    card2Body:
      "No fake reviews, no placeholder lessons, no fabricated ratings. The directory only contains authentic materials shared by actual ENSB students.",
    card3Title: "3. Inter-Cohort Solidarity",
    card3Body:
      "By uploading an exam you just sat or a study summary, you build a permanent academic legacy that helps your peers and future cohorts succeed.",

    paliersTag: "Teacher Training Tracks",
    paliersTitle: "Official ENS Bouzaréah Degree Tracks",

    departmentsTag: "Academic Majors",
    departmentsTitle: "The 8 Official Academic Departments",
    departmentsSub: "Select a department to view its specific folders:",
    viewDepartmentFiles: "View department folders",

    founderTag: "Platform Creator & Maintainer",
    founderTitle: "Adam Ameyoud",
    founderRole: "Student at ENS Bouzaréah — Platform Creator & Maintainer",
    founderBio:
      "I designed this platform as a student initiative to give our school (ENSB) a clean, structured, and permanent repository to exchange past exams and course materials across all specialties. For inquiries, suggestions, or bulk uploads, contact me directly via official email or WhatsApp.",
    founderEmailLabel: "Official ENSB Email",
    founderPhoneLabel: "Phone & WhatsApp",
    founderSchoolLabel: "University Institution",
    founderSchoolValue: "ENS Bouzaréah (ENSB - Algiers)",
    whatsappBtn: "Chat on WhatsApp",
    emailBtn: "Send an Email",
    adminModeBtn: "Admin Mode (Adam)",
    adminExitBtn: "Exit Admin Mode",
    adminPinPrompt: "Enter Admin PIN (default: 2026) to manage or delete files:",

    archiveHeaderTag: "Master Document Registry",
    archiveHeaderTitle: "Exams, Answer Keys & Course Handouts Directory",
    searchPlaceholder: "Search module (e.g., Morphosyntax, Phonetics, Didactics, Educational Psychology)...",
    allDepartments: "All Departments",
    allPaliers: "All Tracks",
    allYears: "All Years",
    allSemesters: "All Semesters",
    allTypes: "All Document Types",
    yearPrefix: "Year ",
    yearSuffix: "",
    semesterS1: "Semester 1 (S1)",
    semesterS2: "Semester 2 (S2)",
    semesterAnnual: "Annual",
    clearFilters: "Reset all filters",
    resultsShowing: "folder(s) listed",
    dossierNumberPrefix: "Folder #",
    emptyArchiveTitle: "No documents match this filter currently",
    emptyArchiveSubtitle:
      "True to our authenticity pledge: zero dummy files are preloaded. The catalog reflects only real student uploads.",
    emptyArchiveCta: "Inaugurate this folder now",
    downloadBtn: "Download File",
    openLinkBtn: "Open Drive Link",
    deleteBtn: "Delete",

    sharePageTag: "Academic Document Submission",
    sharePageTitle: "Deposit an Exam or Lesson into the ENSB Archive",
    sharePageSub:
      "Dedicated single page to share past papers, solutions, or lecture notes. You can upload a file directly (PDF, image, Word) or provide a Google Drive link.",
    fieldDepartment: "Department / Major",
    fieldPalier: "Degree Track",
    fieldYearLevel: "Year Level",
    fieldSemester: "Semester",
    fieldResourceType: "Document Type",
    fieldModule: "Module Name",
    fieldModulePlaceholder: "e.g., Morphosyntax, Phonetics, Didactics...",
    suggestedModulesLabel: "Common modules in this department (click to fill):",
    fieldTitle: "Precise Document Title",
    fieldTitlePlaceholder: "e.g., S1 Morphosyntax Final Exam with Official Solution",
    fieldProfessor: "Professor Name (Optional)",
    fieldProfessorPlaceholder: "e.g., Prof. ...",
    fieldAcademicYear: "Academic Year of Exam",
    fieldUploadMethod: "Attachment Method",
    methodFile: "Direct File Upload (PDF / Image / Word)",
    methodLink: "External Cloud Link (Google Drive / OneDrive / Telegram)",
    fieldFileLabel: "Select File (Up to 25 MB)",
    fieldFileHint: "Accepted formats: PDF, clear exam paper photos (JPG, PNG, WEBP), Word documents.",
    fieldExternalLink: "Google Drive or Cloud URL",
    fieldExternalLinkPlaceholder: "https://drive.google.com/...",
    fieldDescription: "Useful notes for fellow students (Optional)",
    fieldDescriptionPlaceholder: "e.g., Grading breakdown, tricky questions...",
    fieldContributorName: "Your Full Name (or student credit)",
    fieldContributorNamePlaceholder: "e.g., Adam Ameyoud / 2nd Year PEM",
    fieldContributorEmail: "Your Email (Optional)",
    fieldContributorEmailPlaceholder: "adam.ameyoud@ensb.dz",
    submitBtn: "Archive and Publish Document Now",
    submittingBtn: "Saving dossier to archive...",
    cancelBtn: "Cancel",
    backToArchiveBtn: "← Back to Exam Folders",

    dropzoneTitle: "Drag & drop your exam or lecture file here, or click to browse",
    dropzoneSub: "Accepts PDF, clear exam paper photos (JPG/PNG), and Word (up to 25 MB)",
    orGoogleDrive: "Or paste a Google Drive / Cloud link instead of uploading a file",
    pasteDriveLinkPlaceholder: "https://drive.google.com/...",
    optionalDetailsToggle: "⚙️ Add more academic details (Degree Track, Year, Semester, Professor) — Optional",
    optionalDetailsSubtitle: "Standard defaults are already set. Adjust only if needed.",
    quickUploadBadge: "Quick 30-Second Deposit",
    removeFileBtn: "Change file",

    footerNote: "Collaborative student academic platform dedicated to École Normale Supérieure de Bouzaréah (ENSB).",
    footerCredits: "Designed & Maintained by Adam Ameyoud (adam.ameyoud@ensb.dz • +213 795 52 33 99)",
  },
};
