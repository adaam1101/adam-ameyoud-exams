export type Language = "ar" | "fr" | "en";

export interface LocalizedText {
  ar: string;
  fr: string;
  en: string;
}

export interface Department {
  id: string;
  code: string;
  name: LocalizedText;
  shortName: LocalizedText;
  description: LocalizedText;
  paliers: ("PAP" | "PEM" | "PES" | "MASTER")[];
  sampleModules: LocalizedText[];
}

export interface Palier {
  id: "PAP" | "PEM" | "PES" | "MASTER";
  code: string;
  duration: LocalizedText;
  name: LocalizedText;
  description: LocalizedText;
  years: number[];
}

export interface ResourceType {
  id: "exam" | "rattrapage" | "corrige" | "cours" | "td_tp" | "resume";
  name: LocalizedText;
  badgeColor: string;
}

export interface AcademicResource {
  id: string;
  title: string;
  departmentId: string;
  palierId: "PAP" | "PEM" | "PES" | "MASTER";
  yearLevel: number; // 1 to 5
  semester: "S1" | "S2" | "Annual";
  resourceType: "exam" | "rattrapage" | "corrige" | "cours" | "td_tp" | "resume";
  moduleName: string;
  academicYear: string; // e.g. "2025/2026", "2024/2025"
  professorName?: string;
  description?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  externalUrl?: string;
  contributorName: string;
  contributorEmail?: string;
  contributorLevel?: string;
  status: "published" | "pending";
  downloads: number;
  createdAt: string;
}

export const ENSB_DEPARTMENTS: Department[] = [
  {
    id: "arabe",
    code: "DEP-ARA",
    name: {
      ar: "قسم اللغة العربية وآدابها",
      fr: "Département de Langue et Littérature Arabes",
      en: "Department of Arabic Language & Literature",
    },
    shortName: {
      ar: "اللغة العربية وآدابها",
      fr: "Langue Arabe",
      en: "Arabic Language",
    },
    description: {
      ar: "اللسانيات، النحو والصرف، الأدب القديم والحديث، النقد الأدبي، البلاغة، وتعليمية اللغة العربية.",
      fr: "Linguistique, grammaire, littérature classique et moderne, critique littéraire, rhétorique et didactique.",
      en: "Linguistics, grammar, classical & modern literature, literary criticism, rhetoric, and Arabic didactics.",
    },
    paliers: ["PAP", "PEM", "PES", "MASTER"],
    sampleModules: [
      { ar: "النحو والصرف", fr: "Grammaire et Morphologie", en: "Grammar & Morphology" },
      { ar: "اللسانيات العامة", fr: "Linguistique Générale", en: "General Linguistics" },
      { ar: "الأدب العربي القديم", fr: "Littérature Arabe Classique", en: "Classical Arabic Literature" },
      { ar: "البلاغة والعروض", fr: "Rhétorique et Prosodie", en: "Rhetoric & Prosody" },
      { ar: "تعليمية اللغة العربية", fr: "Didactique de l'Arabe", en: "Arabic Didactics" },
    ],
  },
  {
    id: "francais",
    code: "DEP-FRA",
    name: {
      ar: "قسم اللغة الفرنسية",
      fr: "Département de Langue Française",
      en: "Department of French Language",
    },
    shortName: {
      ar: "اللغة الفرنسية",
      fr: "Langue Française",
      en: "French Language",
    },
    description: {
      ar: "اللسانيات الفرنسية، الأدب الفرنكوفوني، الصوتيات، التعبير الكتابي والشفوي، وتعليمية الفرنسية (FLE).",
      fr: "Linguistique française, littérature, phonétique, compréhension/production écrite et orale, didactique du FLE.",
      en: "French linguistics, literature, phonetics, written & oral production, and FLE didactics.",
    },
    paliers: ["PAP", "PEM", "PES", "MASTER"],
    sampleModules: [
      { ar: "التركيب والصرف (Morphosyntaxe)", fr: "Morphosyntaxe", en: "Morphosyntax" },
      { ar: "اللسانيات (Linguistique)", fr: "Linguistique Générale", en: "General Linguistics" },
      { ar: "تعليمية الفرنسية (Didactique du FLE)", fr: "Didactique du FLE", en: "FLE Didactics" },
      { ar: "النصوص الأدبية", fr: "Littérature et Textes Littéraires", en: "Literature & Literary Texts" },
      { ar: "الصوتيات (Phonétique)", fr: "Phonétique Correctrice", en: "Corrective Phonetics" },
    ],
  },
  {
    id: "anglais",
    code: "DEP-ANG",
    name: {
      ar: "قسم اللغة الإنجليزية",
      fr: "Département de Langue Anglaise",
      en: "Department of English Language",
    },
    shortName: {
      ar: "اللغة الإنجليزية",
      fr: "Langue Anglaise",
      en: "English Language",
    },
    description: {
      ar: "اللسانيات التطبيقية، الصوتيات، الحضارة والأدب الأنجلوسكسوني، القواعد، ومنهجية تدريس الإنجليزية (TEFL).",
      fr: "Linguistique appliquée, phonétique, civilisation, littérature anglophone, grammaire et méthodologie TEFL.",
      en: "Applied linguistics, phonetics, civilization, literature, grammar,Written/Oral expression, and TEFL methodology.",
    },
    paliers: ["PAP", "PEM", "PES", "MASTER"],
    sampleModules: [
      { ar: "القواعد (Grammar)", fr: "Grammar", en: "Grammar" },
      { ar: "الصوتيات (Phonetics & Phonology)", fr: "Phonetics & Phonology", en: "Phonetics & Phonology" },
      { ar: "اللسانيات (Linguistics)", fr: "Introduction to Linguistics", en: "Introduction to Linguistics" },
      { ar: "الحضارة والأدب (Civilization & Literature)", fr: "Anglo-Saxon Civilization & Literature", en: "British & American Civilization / Literature" },
      { ar: "تعليمية الإنجليزية (TEFL / Didactics)", fr: "TEFL & Didactics", en: "TEFL / English Didactics" },
    ],
  },
  {
    id: "histoire-geo",
    code: "DEP-HIS",
    name: {
      ar: "قسم التاريخ والجغرافيا",
      fr: "Département d'Histoire et Géographie",
      en: "Department of History & Geography",
    },
    shortName: {
      ar: "التاريخ والجغرافيا",
      fr: "Histoire & Géographie",
      en: "History & Geography",
    },
    description: {
      ar: "تاريخ الجزائر الحديث والمعاصر، التاريخ القديم والوسيط، الجغرافيا الطبيعية والبشرية، الخرائطية، وتعليمية المادة.",
      fr: "Histoire de l'Algérie, histoire ancienne/médiévale/contemporaine, géographie physique et humaine, cartographie.",
      en: "History of Algeria, ancient/medieval/modern history, physical & human geography, cartography, and didactics.",
    },
    paliers: ["PEM", "PES", "MASTER"],
    sampleModules: [
      { ar: "تاريخ الجزائر المعاصر", fr: "Histoire Contemporaine de l'Algérie", en: "Contemporary History of Algeria" },
      { ar: "الجغرافيا الطبيعية والمناخ", fr: "Géomorphologie et Climatologie", en: "Physical Geography & Climatology" },
      { ar: "التاريخ الوسيط والحديث", fr: "Histoire Médiévale et Moderne", en: "Medieval & Modern History" },
      { ar: "الخرائطية (Cartographie)", fr: "Cartographie et Analyse Spatiale", en: "Cartography & Spatial Analysis" },
      { ar: "جغرافية الجزائر", fr: "Géographie de l'Algérie", en: "Geography of Algeria" },
    ],
  },
  {
    id: "philosophie",
    code: "DEP-PHI",
    name: {
      ar: "قسم الفلسفة",
      fr: "Département de Philosophie",
      en: "Department of Philosophy",
    },
    shortName: {
      ar: "الفلسفة",
      fr: "Philosophie",
      en: "Philosophy",
    },
    description: {
      ar: "الفلسفة الإسلامية، الفلسفة اليونانية والغربية الحديثة، المنطق الصوري والرمزي، الإبستمولوجيا، وتعليمية الفلسفة.",
      fr: "Philosophie islamique, grecque et moderne, logique formelle, épistémologie, éthique et didactique de la philosophie.",
      en: "Islamic, Greek & modern Western philosophy, formal logic, epistemology, ethics, and philosophy didactics.",
    },
    paliers: ["PES", "MASTER"],
    sampleModules: [
      { ar: "الفلسفة الإسلامية", fr: "Philosophie Islamique", en: "Islamic Philosophy" },
      { ar: "المنطق وفلسفة العلوم", fr: "Logique et Épistémologie", en: "Logic & Epistemology" },
      { ar: "الفلسفة اليونانية والحديثة", fr: "Philosophie Grecque et Moderne", en: "Greek & Modern Philosophy" },
      { ar: "الأخلاق وفلسفة القيم", fr: "Éthique et Axiologie", en: "Ethics & Axiology" },
      { ar: "تعليمية الفلسفة", fr: "Didactique de la Philosophie", en: "Philosophy Didactics" },
    ],
  },
  {
    id: "amazighe",
    code: "DEP-AMZ",
    name: {
      ar: "قسم اللغة الأمازيغية",
      fr: "Département de Langue et Culture Amazighes",
      en: "Department of Amazigh Language & Culture",
    },
    shortName: {
      ar: "اللغة الأمازيغية",
      fr: "Langue Amazighe",
      en: "Amazigh Language",
    },
    description: {
      ar: "اللسانيات الأمازيغية، الصوتيات والتركيب، الأدب والتراث الأمازيغي، الترجمة، وتعليمية اللغة الأمازيغية.",
      fr: "Linguistique amazighe, phonétique et syntaxe, littérature et patrimoine, traduction et didactique.",
      en: "Amazigh linguistics, phonetics & syntax, literature & heritage, translation, and Amazigh didactics.",
    },
    paliers: ["PAP", "PEM", "PES"],
    sampleModules: [
      { ar: "اللسانيات الأمازيغية", fr: "Linguistique Amazighe", en: "Amazigh Linguistics" },
      { ar: "الأدب الأمازيغي", fr: "Littérature Amazighe", en: "Amazigh Literature" },
      { ar: "النحو والصرف الأمازيغي", fr: "Grammaire et Morphologie Amazighes", en: "Amazigh Grammar & Morphology" },
      { ar: "تعليمية اللغة الأمازيغية", fr: "Didactique de Tamazight", en: "Amazigh Didactics" },
    ],
  },
  {
    id: "eps",
    code: "DEP-EPS",
    name: {
      ar: "قسم التربية البدنية والرياضية",
      fr: "Département d'Éducation Physique et Sportive (EPS)",
      en: "Department of Physical Education & Sports (EPS)",
    },
    shortName: {
      ar: "التربية البدنية والرياضية",
      fr: "Éducation Physique (EPS)",
      en: "Physical Education (EPS)",
    },
    description: {
      ar: "فيزيولوجيا الجهد البدني، التشريح الحيوي، نظرية ومنهجية التدريب الرياضي، علم النفس الرياضي، والبيداغوجيا الرياضية.",
      fr: "Physiologie de l'effort, anatomie fonctionnelle, biomécanique, méthodologie de l'entraînement et pédagogie sportive.",
      en: "Exercise physiology, functional anatomy, biomechanics, training methodology, and sports pedagogy.",
    },
    paliers: ["PAP", "PEM", "PES"],
    sampleModules: [
      { ar: "التشريح وفيزيولوجيا الجهد", fr: "Anatomie et Physiologie de l'Effort", en: "Anatomy & Exercise Physiology" },
      { ar: "الميكانيكا الحيوية (Biomécanique)", fr: "Biomécanique du Mouvement", en: "Biomechanics" },
      { ar: "تعليمية التربية البدنية", fr: "Didactique des APS", en: "Physical Education Didactics" },
      { ar: "علم النفس الرياضي", fr: "Psychologie du Sport", en: "Sports Psychology" },
    ],
  },
  {
    id: "psychopedagogie",
    code: "DEP-EDU",
    name: {
      ar: "وحدات علوم التربية وعلم النفس البيداغوجي (جذع مشترك)",
      fr: "Sciences de l'Éducation & Psychopédagogie (Unités Transversales)",
      en: "Educational Sciences & Psychopedagogy (Common Core)",
    },
    shortName: {
      ar: "علوم التربية وعلم النفس",
      fr: "Sciences de l'Éducation",
      en: "Educational Sciences",
    },
    description: {
      ar: "المقاييس التربوية المشتركة بين جميع التخصصات: علم نفس النمو، علم النفس التربوي، التشريع المدرسي، المناهج، والتقويم.",
      fr: "Modules pédagogiques communs à toutes les filières : psychologie de l'enfant/adolescent, législation scolaire, docimologie.",
      en: "Pedagogical modules shared across all majors: developmental psychology, educational psychology, school legislation, evaluation.",
    },
    paliers: ["PAP", "PEM", "PES", "MASTER"],
    sampleModules: [
      { ar: "مدخل إلى علوم التربية", fr: "Introduction aux Sciences de l'Éducation", en: "Intro to Educational Sciences" },
      { ar: "علم نفس النمو (الطفل والمراهق)", fr: "Psychologie du Développement", en: "Developmental Psychology" },
      { ar: "علم النفس التربوي", fr: "Psychopédagogie", en: "Educational Psychology" },
      { ar: "التشريع المدرسي وأخلاقيات المهنة", fr: "Législation Scolaire et Déontologie", en: "School Legislation & Ethics" },
      { ar: "التقويم التربوي وبناء الاختبارات", fr: "Évaluation Pédagogique et Docimologie", en: "Educational Assessment & Docimology" },
    ],
  },
];

export const ENSB_PALIERS: Palier[] = [
  {
    id: "PAP",
    code: "PAP",
    duration: {
      ar: "3 سنوات (الطور الابتدائي)",
      fr: "3 Ans (Cycle Primaire)",
      en: "3 Years (Primary School Track)",
    },
    name: {
      ar: "أستاذ التعليم الابتدائي (PAP)",
      fr: "Professeur de l'Enseignement Primaire (PAP)",
      en: "Primary School Teacher (PAP)",
    },
    description: {
      ar: "تكوين أساتذة الطور الابتدائي عبر 3 سنوات أكاديمية وتطبيقية.",
      fr: "Formation en 3 ans pour les futurs enseignants du cycle primaire.",
      en: "3-year academic and pedagogical track for primary school teachers.",
    },
    years: [1, 2, 3],
  },
  {
    id: "PEM",
    code: "PEM",
    duration: {
      ar: "4 سنوات (الطور المتوسط)",
      fr: "4 Ans (Cycle Moyen)",
      en: "4 Years (Middle School Track)",
    },
    name: {
      ar: "أستاذ التعليم المتوسط (PEM)",
      fr: "Professeur de l'Enseignement Moyen (PEM)",
      en: "Middle School Teacher (PEM)",
    },
    description: {
      ar: "تكوين أساتذة الطور المتوسط عبر 4 سنوات تشمل التربص الميداني.",
      fr: "Formation en 4 ans incluant le stage pratique dans les collèges (CEM).",
      en: "4-year degree program including practical teaching internships in middle schools.",
    },
    years: [1, 2, 3, 4],
  },
  {
    id: "PES",
    code: "PES",
    duration: {
      ar: "5 سنوات (الطور الثانوي)",
      fr: "5 Ans (Cycle Secondaire)",
      en: "5 Years (High School Track)",
    },
    name: {
      ar: "أستاذ التعليم الثانوي (PES)",
      fr: "Professeur de l'Enseignement Secondaire (PES)",
      en: "Secondary / High School Teacher (PES)",
    },
    description: {
      ar: "تكوين أساتذة التعليم الثانوي عبر 5 سنوات ومذكرة التخرج والتربص.",
      fr: "Formation approfondie en 5 ans avec mémoire de fin d'études et stage en lycée.",
      en: "5-year specialist program with thesis and practical training in secondary schools.",
    },
    years: [1, 2, 3, 4, 5],
  },
  {
    id: "MASTER",
    code: "PG",
    duration: {
      ar: "ماستر / ما بعد التدرج",
      fr: "Master / Post-Graduation",
      en: "Master & Postgraduate Studies",
    },
    name: {
      ar: "الماستر والدراسات العليا",
      fr: "Master & Post-Graduation",
      en: "Master & Postgraduate Research",
    },
    description: {
      ar: "بحوث الماستر الأكاديمي، مسابقات الدكتوراه، والمقاييس البحثية.",
      fr: "Master académique, concours de doctorat et séminaires de recherche.",
      en: "Academic Master tracks, doctoral entrance exams, and research seminars.",
    },
    years: [1, 2],
  },
];

export const RESOURCE_TYPES: ResourceType[] = [
  {
    id: "exam",
    name: {
      ar: "امتحان السداسي (Examen)",
      fr: "Sujet d'Examen (EMD)",
      en: "Semester Exam (EMD)",
    },
    badgeColor: "bg-red-900/10 text-red-900 border-red-900/25",
  },
  {
    id: "corrige",
    name: {
      ar: "تصحيح نموذجي (Corrigé Type)",
      fr: "Corrigé Type d'Examen",
      en: "Official Exam Solution (Corrigé)",
    },
    badgeColor: "bg-emerald-900/10 text-emerald-900 border-emerald-900/25",
  },
  {
    id: "rattrapage",
    name: {
      ar: "امتحان استدراكي (Rattrapage)",
      fr: "Sujet de Rattrapage",
      en: "Makeup Exam (Rattrapage)",
    },
    badgeColor: "bg-amber-900/10 text-amber-900 border-amber-900/25",
  },
  {
    id: "cours",
    name: {
      ar: "محاضرات ودروس (Cours / Polycopié)",
      fr: "Cours & Polycopié",
      en: "Lecture Notes / Course (Cours)",
    },
    badgeColor: "bg-stone-900/10 text-stone-900 border-stone-900/25",
  },
  {
    id: "td_tp",
    name: {
      ar: "أعمال موجهة وتطبيقية (TD / TP)",
      fr: "Fiches de TD / Exposés",
      en: "Tutorials & Worksheets (TD / TP)",
    },
    badgeColor: "bg-sky-900/10 text-sky-900 border-sky-900/25",
  },
  {
    id: "resume",
    name: {
      ar: "ملخص مراجعة (Résumé)",
      fr: "Résumé de Révision",
      en: "Study Summary (Résumé)",
    },
    badgeColor: "bg-purple-900/10 text-purple-900 border-purple-900/25",
  },
];

export const ACADEMIC_YEARS = [
  "2025/2026",
  "2024/2025",
  "2023/2024",
  "2022/2023",
  "2021/2022",
  "2020/2021",
  "Earlier / أقدم",
];
