// Digital Sanctuary — Éducatrices · mock data

export type Mood = "happy" | "calm" | "tired" | "upset" | "sick";
export type AttendanceStatus = "present" | "absent" | "late" | "left";
export type Cycle = "CYCLE_0" | "CYCLE_1";

export type VoiceNote = {
  url: string;
  duration: string;
  transcript: string;
  language: "fr-FR" | "en-US" | "es-ES" | "ar-SA";
};

export type MealEntry = { time: string; what: string; amount: "none" | "some" | "most" | "all" };
export type NapEntry = { start: string; end: string; quality: "light" | "deep" | "restless" };
export type DiaperEntry = { time: string; type: "wet" | "soiled" | "both" };
export type Incident = { time: string; kind: "fall" | "bite" | "fever" | "other"; note: string; severity: 1 | 2 | 3 };

export type DailyReport = {
  id: string;
  childId: string;
  date: string;
  mood: Mood;
  attendance: AttendanceStatus;
  meals: MealEntry[];
  naps: NapEntry[];
  diapers: DiaperEntry[];
  activities: string[];
  incidents: Incident[];
  highlight: string;
  voiceNote?: VoiceNote;
  photos: string[];
  status: "draft" | "submitted";
  submittedAt?: string;
};

export type Child = {
  id: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  avatar: string;
  cycle: Cycle;
  classroomId: string;
  allergies: string[];
  guardians: { name: string; phone: string; relation: string }[];
  notes: string;
};

export type Classroom = {
  id: string;
  name: string;
  cycle: Cycle;
  capacity: number;
  educatorIds: string[];
};

export type Educator = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: "lead" | "assistant" | "director";
  classroomIds: string[];
  email: string;
  phone: string;
  language: "fr" | "en";
};

export type Thread = {
  id: string;
  childId: string;
  parentName: string;
  parentAvatar: string;
  lastMessage: string;
  lastAt: string;
  unread: number;
};

export type Message = {
  id: string;
  threadId: string;
  from: "parent" | "educator";
  text: string;
  at: string;
};

export type Announcement = {
  id: string;
  from: "direction" | "team";
  title: string;
  body: string;
  date: string;
  pinned?: boolean;
};

export type Todo = { id: string; label: string; done: boolean; time?: string };
export type ClassEvent = { id: string; date: string; title: string; kind: "outing" | "birthday" | "meeting" };

// ─── DATA ────────────────────────────────────────────────

export const me: Educator = {
  id: "edu-1",
  firstName: "Camille",
  lastName: "Joubert",
  avatar: "",
  role: "lead",
  classroomIds: ["cls-coccinelles"],
  email: "camille.j@sanctuary.app",
  phone: "+33 6 11 22 33 44",
  language: "fr",
};

export const classrooms: Classroom[] = [
  { id: "cls-coccinelles", name: "Les Coccinelles", cycle: "CYCLE_0", capacity: 10, educatorIds: ["edu-1", "edu-2"] },
];

export const myClassroom = classrooms[0];

export const children: Child[] = [
  { id: "lea", firstName: "Léa", lastName: "Dupont", birthdate: "2022-03-14", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lea", cycle: "CYCLE_0", classroomId: "cls-coccinelles", allergies: ["arachide"], notes: "Aime les activités de transvasement.", guardians: [{ name: "Marie Dupont", phone: "+33 6 12 34 56 78", relation: "Mère" }] },
  { id: "noah", firstName: "Noah", lastName: "Bernard", birthdate: "2021-11-02", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah", cycle: "CYCLE_0", classroomId: "cls-coccinelles", allergies: [], notes: "Sieste difficile en début d'après-midi.", guardians: [{ name: "Julien Bernard", phone: "+33 6 98 76 54 32", relation: "Père" }] },
  { id: "ines", firstName: "Inès", lastName: "Moreau", birthdate: "2022-06-21", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ines", cycle: "CYCLE_0", classroomId: "cls-coccinelles", allergies: ["œuf", "lait"], notes: "Très autonome au repas.", guardians: [{ name: "Sophie Moreau", phone: "+33 6 55 44 33 22", relation: "Mère" }] },
  { id: "tom", firstName: "Tom", lastName: "Lefèvre", birthdate: "2021-09-08", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom", cycle: "CYCLE_0", classroomId: "cls-coccinelles", allergies: [], notes: "Adore les puzzles.", guardians: [{ name: "Claire Lefèvre", phone: "+33 6 22 11 00 99", relation: "Mère" }] },
  { id: "anais", firstName: "Anaïs", lastName: "Petit", birthdate: "2022-01-30", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anais", cycle: "CYCLE_0", classroomId: "cls-coccinelles", allergies: ["gluten"], notes: "Parle déjà beaucoup.", guardians: [{ name: "Olivier Petit", phone: "+33 6 77 88 99 00", relation: "Père" }] },
  { id: "youssef", firstName: "Youssef", lastName: "Khalil", birthdate: "2021-12-12", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Youssef", cycle: "CYCLE_0", classroomId: "cls-coccinelles", allergies: [], notes: "Bilingue français-arabe.", guardians: [{ name: "Leïla Khalil", phone: "+33 6 33 44 55 66", relation: "Mère" }] },
  { id: "mia", firstName: "Mia", lastName: "Rousseau", birthdate: "2022-04-19", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia", cycle: "CYCLE_0", classroomId: "cls-coccinelles", allergies: ["fraise"], notes: "Très calme le matin.", guardians: [{ name: "Hugo Rousseau", phone: "+33 6 12 12 12 12", relation: "Père" }] },
  { id: "raphael", firstName: "Raphaël", lastName: "Garnier", birthdate: "2021-08-25", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raphael", cycle: "CYCLE_0", classroomId: "cls-coccinelles", allergies: [], notes: "Aime la musique.", guardians: [{ name: "Émilie Garnier", phone: "+33 6 45 67 89 01", relation: "Mère" }] },
];

export const attendanceToday: Record<string, AttendanceStatus> = {
  lea: "present", noah: "present", ines: "present", tom: "late",
  anais: "present", youssef: "absent", mia: "present", raphael: "present",
};

const today = new Date().toISOString();

export const reportsToday: DailyReport[] = [
  { id: "r-lea", childId: "lea", date: today, mood: "happy", attendance: "present",
    meals: [{ time: "12:00", what: "Purée carottes", amount: "most" }],
    naps: [{ start: "13:00", end: "14:30", quality: "deep" }],
    diapers: [{ time: "10:15", type: "wet" }],
    activities: ["Tour rose", "Chant collectif"], incidents: [],
    highlight: "Belle concentration sur la tour rose ce matin.",
    photos: [], status: "submitted", submittedAt: today },
  { id: "r-noah", childId: "noah", date: today, mood: "calm", attendance: "present",
    meals: [{ time: "12:00", what: "Poisson riz", amount: "all" }],
    naps: [{ start: "13:15", end: "14:00", quality: "restless" }],
    diapers: [{ time: "09:30", type: "soiled" }, { time: "15:00", type: "wet" }],
    activities: ["Lecture", "Transvasement"], incidents: [],
    highlight: "A choisi seul son activité du matin.",
    photos: [], status: "draft" },
  { id: "r-ines", childId: "ines", date: today, mood: "tired", attendance: "present",
    meals: [{ time: "12:00", what: "Légumes vapeur", amount: "some" }],
    naps: [{ start: "12:45", end: "14:45", quality: "deep" }],
    diapers: [], activities: ["Vie pratique : verser"], incidents: [],
    highlight: "Petite forme aujourd'hui, beaucoup de câlins.",
    photos: [], status: "submitted", submittedAt: today },
  { id: "r-anais", childId: "anais", date: today, mood: "happy", attendance: "present",
    meals: [{ time: "12:00", what: "Pâtes sans gluten", amount: "all" }],
    naps: [{ start: "13:00", end: "14:15", quality: "light" }],
    diapers: [{ time: "11:00", type: "wet" }],
    activities: ["Peinture", "Jardin"], incidents: [],
    highlight: "Première phrase complète : « regarde maîtresse ! »",
    photos: [], status: "submitted", submittedAt: today },
];

export const threads: Thread[] = [
  { id: "t-lea", childId: "lea", parentName: "Marie Dupont", parentAvatar: "", lastMessage: "Merci pour la photo !", lastAt: "09:42", unread: 0 },
  { id: "t-noah", childId: "noah", parentName: "Julien Bernard", parentAvatar: "", lastMessage: "Il a bien dormi cette nuit.", lastAt: "08:15", unread: 2 },
  { id: "t-ines", childId: "ines", parentName: "Sophie Moreau", parentAvatar: "", lastMessage: "Penser à apporter le doudou demain.", lastAt: "hier", unread: 0 },
  { id: "t-tom", childId: "tom", parentName: "Claire Lefèvre", parentAvatar: "", lastMessage: "On arrive avec 15 min de retard.", lastAt: "07:50", unread: 1 },
  { id: "t-youssef", childId: "youssef", parentName: "Leïla Khalil", parentAvatar: "", lastMessage: "Youssef est malade aujourd'hui.", lastAt: "07:10", unread: 0 },
];

export const messagesByThread: Record<string, Message[]> = {
  "t-noah": [
    { id: "m1", threadId: "t-noah", from: "parent", text: "Bonjour Camille, il a bien dormi cette nuit.", at: "08:10" },
    { id: "m2", threadId: "t-noah", from: "parent", text: "Vous pouvez lui proposer son doudou pour la sieste ?", at: "08:15" },
    { id: "m3", threadId: "t-noah", from: "educator", text: "Bonjour ! Bien noté, je m'en occupe.", at: "08:32" },
  ],
  "t-lea": [
    { id: "m1", threadId: "t-lea", from: "educator", text: "Léa était rayonnante ce matin ☀️", at: "09:30" },
    { id: "m2", threadId: "t-lea", from: "parent", text: "Merci pour la photo !", at: "09:42" },
  ],
};

export const announcements: Announcement[] = [
  { id: "a-1", from: "direction", pinned: true, date: "2026-06-12", title: "Sortie au parc vendredi", body: "Prévoir chapeau et gourde pour chaque enfant. Départ 9h30, retour 11h30." },
  { id: "a-2", from: "direction", date: "2026-06-09", title: "Réunion pédagogique", body: "Mercredi 18h en salle des éducatrices." },
  { id: "a-3", from: "team", date: "2026-06-08", title: "Nouvelle activité Montessori", body: "Présentation des solides roses dès la semaine prochaine." },
];

export const todosToday: Todo[] = [
  { id: "td1", label: "Préparer le goûter (compote pomme-poire)", done: true, time: "15:00" },
  { id: "td2", label: "Appeler Mme Bernard pour confirmer rendez-vous", done: false, time: "11:00" },
  { id: "td3", label: "Finaliser 4 rapports en brouillon", done: false },
  { id: "td4", label: "Réapprovisionner les couches", done: false },
];

export const eventsThisWeek: ClassEvent[] = [
  { id: "e1", date: "2026-06-12", title: "Sortie au parc", kind: "outing" },
  { id: "e2", date: "2026-06-14", title: "Anniversaire de Léa", kind: "birthday" },
  { id: "e3", date: "2026-06-15", title: "Réunion équipe", kind: "meeting" },
];

// ─── Today extras (T-05 → T-10) ─────────────────────────

export type ScheduleBlock = {
  id: string;
  start: string; // "HH:MM"
  end: string;
  title: string;
  body: string;
  kind: "circle" | "activity" | "meal" | "nap" | "outdoor" | "story";
};

export const todaySchedule: ScheduleBlock[] = [
  { id: "s1", start: "08:30", end: "09:00", title: "Accueil échelonné", body: "Transition douce avec les parents.", kind: "circle" },
  { id: "s2", start: "09:00", end: "09:30", title: "Morning Circle", body: "Chants, météo, calendrier.", kind: "circle" },
  { id: "s3", start: "09:30", end: "10:30", title: "Ateliers Montessori", body: "Vie pratique & sensoriel.", kind: "activity" },
  { id: "s4", start: "10:30", end: "11:00", title: "Story Time", body: "« La très petite chenille ».", kind: "story" },
  { id: "s5", start: "11:00", end: "11:45", title: "Jardin", body: "Motricité libre extérieure.", kind: "outdoor" },
  { id: "s6", start: "12:00", end: "13:00", title: "Déjeuner", body: "Service en autonomie.", kind: "meal" },
  { id: "s7", start: "13:00", end: "15:00", title: "Sieste", body: "Salle des tournesols.", kind: "nap" },
  { id: "s8", start: "15:30", end: "16:00", title: "Goûter", body: "Compote pomme-poire.", kind: "meal" },
];

export type MedicationDue = {
  id: string;
  childId: string;
  name: string;
  dose: string;
  time: string;
  given: boolean;
};

export const medicationsDueToday: MedicationDue[] = [
  { id: "m1", childId: "lea", name: "Ventoline", dose: "2 puffs", time: "11:30", given: false },
  { id: "m2", childId: "ines", name: "Doliprane", dose: "5 ml", time: "14:00", given: false },
];

export type LatePickup = { childId: string; expectedAt: string; reason: string };

export const latePickupsToday: LatePickup[] = [
  { childId: "mia", expectedAt: "17:30", reason: "Parents +15 min, embouteillage A86." },
];

export type TodayAlert = {
  id: string;
  kind: "medication" | "pickup" | "absent" | "incident" | "weather";
  title: string;
  body: string;
  childId?: string;
  at?: string;
};

export const todayAlerts: TodayAlert[] = [
  { id: "al1", kind: "medication", title: "Ventoline — Léa", body: "À administrer à 11:30.", childId: "lea", at: "11:30" },
  { id: "al2", kind: "pickup", title: "Retard Mia", body: "Parents +15 min (A86).", childId: "mia", at: "17:30" },
  { id: "al3", kind: "absent", title: "Youssef absent", body: "Maman a prévenu — gastro.", childId: "youssef" },
  { id: "al4", kind: "weather", title: "Pic de chaleur 14h–16h", body: "Reporter le jardin à 16h30.", at: "14:00" },
];

// ─── helpers ────────────────────────────────────────────

export const getChild = (id: string) => children.find((c) => c.id === id);

// ─── Personal info (T-13) ────────────────────────────────

export type PersonalInfo = {
  preferredName: string;
  pronouns: string;
  languagesHome: string[];
  livesWith: string;
  siblings: { name: string; age: string }[];
  comfortItem: string;
  favoriteActivities: string[];
  routines: { label: string; value: string }[];
  culturalNotes: string;
};

export const personalByChild: Record<string, PersonalInfo> = {
  lea: {
    preferredName: "Léa", pronouns: "elle",
    languagesHome: ["Français"], livesWith: "Mère (garde principale)",
    siblings: [{ name: "Hugo", age: "5 ans" }],
    comfortItem: "Doudou lapin gris",
    favoriteActivities: ["Transvasement", "Tour rose", "Chant"],
    routines: [
      { label: "Réveil", value: "07:00" },
      { label: "Coucher", value: "20:00" },
      { label: "Sieste à la maison", value: "13:00 — 14:30" },
    ],
    culturalNotes: "Famille végétarienne — pas de viande au repas.",
  },
  noah: {
    preferredName: "Noah", pronouns: "il",
    languagesHome: ["Français", "Anglais"], livesWith: "Père & mère",
    siblings: [], comfortItem: "Petit ours bleu",
    favoriteActivities: ["Lecture", "Voitures"],
    routines: [
      { label: "Réveil", value: "06:45" },
      { label: "Coucher", value: "19:30" },
    ],
    culturalNotes: "Famille bilingue FR/EN — encourager les deux langues.",
  },
  ines: {
    preferredName: "Inès", pronouns: "elle",
    languagesHome: ["Français"], livesWith: "Mère",
    siblings: [{ name: "Lina", age: "8 ans" }],
    comfortItem: "Tétine rose",
    favoriteActivities: ["Vie pratique", "Puzzles"],
    routines: [
      { label: "Réveil", value: "07:15" },
      { label: "Coucher", value: "20:15" },
    ],
    culturalNotes: "—",
  },
};

export const getPersonal = (id: string): PersonalInfo => {
  return (
    personalByChild[id] ?? {
      preferredName: getChild(id)?.firstName ?? "",
      pronouns: "—",
      languagesHome: ["Français"],
      livesWith: "—",
      siblings: [],
      comfortItem: "—",
      favoriteActivities: [],
      routines: [],
      culturalNotes: "—",
    }
  );
};

// ─── Medical info (T-14) ─────────────────────────────────

export type MedicalInfo = {
  bloodType: string;
  weightKg: number;
  heightCm: number;
  doctor: { name: string; phone: string; clinic: string };
  pediatrician?: { name: string; phone: string };
  conditions: string[];
  medications: { name: string; dose: string; schedule: string; authorized: boolean }[];
  vaccines: { name: string; date: string; status: "ok" | "due" | "late" }[];
  lastCheckup: string;
  insurance: { provider: string; number: string };
  notes: string;
};

export const medicalByChild: Record<string, MedicalInfo> = {
  lea: {
    bloodType: "A+", weightKg: 14.2, heightCm: 92,
    doctor: { name: "Dr. Sophie Martin", phone: "+33 1 42 33 44 55", clinic: "Cabinet Pasteur" },
    pediatrician: { name: "Dr. Léo Vidal", phone: "+33 1 44 55 66 77" },
    conditions: ["Asthme léger"],
    medications: [
      { name: "Ventoline", dose: "2 puffs", schedule: "Si besoin / effort", authorized: true },
    ],
    vaccines: [
      { name: "DTP", date: "2023-04-10", status: "ok" },
      { name: "ROR", date: "2023-09-12", status: "ok" },
      { name: "Rappel DTP", date: "2026-08-01", status: "due" },
    ],
    lastCheckup: "2026-03-18",
    insurance: { provider: "CPAM", number: "1 85 03 14 075 042 12" },
    notes: "Crise d'asthme rare, déclenchée par l'effort. Ventoline dans le casier.",
  },
  noah: {
    bloodType: "O+", weightKg: 15.8, heightCm: 95,
    doctor: { name: "Dr. Anne Roche", phone: "+33 1 45 67 89 10", clinic: "Maison médicale Voltaire" },
    conditions: [],
    medications: [],
    vaccines: [
      { name: "DTP", date: "2022-11-02", status: "ok" },
      { name: "ROR", date: "2023-05-14", status: "ok" },
    ],
    lastCheckup: "2026-02-04",
    insurance: { provider: "MGEN", number: "2 21 11 92 014 088 33" },
    notes: "—",
  },
  ines: {
    bloodType: "B-", weightKg: 13.5, heightCm: 90,
    doctor: { name: "Dr. Karim Hadj", phone: "+33 1 48 22 11 09", clinic: "Cabinet République" },
    conditions: ["Intolérance lactose"],
    medications: [
      { name: "Doliprane", dose: "5 ml", schedule: "Si fièvre > 38°C", authorized: true },
    ],
    vaccines: [
      { name: "DTP", date: "2023-06-21", status: "ok" },
      { name: "ROR", date: "2023-12-04", status: "late" },
    ],
    lastCheckup: "2026-04-22",
    insurance: { provider: "CPAM", number: "1 22 06 75 110 022 41" },
    notes: "Régime sans lait — vérifier étiquettes goûter.",
  },
};

export const getMedical = (id: string): MedicalInfo => {
  return (
    medicalByChild[id] ?? {
      bloodType: "—", weightKg: 0, heightCm: 0,
      doctor: { name: "—", phone: "—", clinic: "—" },
      conditions: [], medications: [], vaccines: [],
      lastCheckup: "—",
      insurance: { provider: "—", number: "—" },
      notes: "—",
    }
  );
};

export type EmergencyContact = {
  name: string;
  relation: string;
  phone: string;
  altPhone?: string;
  priority: 1 | 2 | 3;
  canPickup: boolean;
};

export type EmergencyInfo = {
  contacts: EmergencyContact[];
  hospital: { name: string; phone: string; address: string };
  poisonControl: string;
  evacuationPlan: string;
  consentMedicalCare: boolean;
  consentPhotos: boolean;
  specialInstructions: string;
};

export const emergencyByChild: Record<string, EmergencyInfo> = {
  lea: {
    contacts: [
      { name: "Marie Dupont", relation: "Mère", phone: "+33 6 12 34 56 78", priority: 1, canPickup: true },
      { name: "Pierre Dupont", relation: "Père", phone: "+33 6 11 22 33 44", altPhone: "+33 1 42 00 11 22", priority: 2, canPickup: true },
      { name: "Jeanne Dupont", relation: "Grand-mère", phone: "+33 6 88 77 66 55", priority: 3, canPickup: true },
    ],
    hospital: { name: "Hôpital Necker — Enfants malades", phone: "+33 1 44 49 40 00", address: "149 Rue de Sèvres, 75015 Paris" },
    poisonControl: "+33 1 40 05 48 48",
    evacuationPlan: "Sortie principale → Square Saint-Lambert (point de rassemblement A).",
    consentMedicalCare: true,
    consentPhotos: true,
    specialInstructions: "En cas de crise d'asthme, administrer Ventoline puis appeler la mère.",
  },
  noah: {
    contacts: [
      { name: "Julien Bernard", relation: "Père", phone: "+33 6 98 76 54 32", priority: 1, canPickup: true },
      { name: "Camille Bernard", relation: "Mère", phone: "+33 6 14 25 36 47", priority: 2, canPickup: true },
    ],
    hospital: { name: "Hôpital Trousseau", phone: "+33 1 44 73 74 75", address: "26 Avenue du Dr Arnold Netter, 75012 Paris" },
    poisonControl: "+33 1 40 05 48 48",
    evacuationPlan: "Sortie cour arrière → Place Voltaire (point de rassemblement B).",
    consentMedicalCare: true,
    consentPhotos: false,
    specialInstructions: "—",
  },
  ines: {
    contacts: [
      { name: "Sophie Moreau", relation: "Mère", phone: "+33 6 55 44 33 22", priority: 1, canPickup: true },
      { name: "Antoine Moreau", relation: "Père", phone: "+33 6 23 45 67 89", priority: 2, canPickup: true },
      { name: "Lucie Moreau", relation: "Tante", phone: "+33 6 67 89 01 23", priority: 3, canPickup: false },
    ],
    hospital: { name: "Hôpital Robert-Debré", phone: "+33 1 40 03 20 00", address: "48 Bd Sérurier, 75019 Paris" },
    poisonControl: "+33 1 40 05 48 48",
    evacuationPlan: "Sortie principale → Parvis église (point de rassemblement A).",
    consentMedicalCare: true,
    consentPhotos: true,
    specialInstructions: "Allergies œuf/lait — vérifier composition avant tout traitement.",
  },
};

export const getEmergency = (id: string): EmergencyInfo => {
  return (
    emergencyByChild[id] ?? {
      contacts: [],
      hospital: { name: "—", phone: "—", address: "—" },
      poisonControl: "—",
      evacuationPlan: "—",
      consentMedicalCare: false,
      consentPhotos: false,
      specialInstructions: "—",
    }
  );
};

export type PickupPerson = {
  name: string;
  relation: string;
  phone: string;
  photo?: string;
  idVerified: boolean;
  authorized: boolean;
  notes?: string;
};

export type PickupEvent = {
  date: string;
  time: string;
  by: string;
  status: "completed" | "scheduled" | "missed";
  note?: string;
};

export type PickupInfo = {
  defaultTime: string;
  defaultPerson: string;
  authorizedPeople: PickupPerson[];
  blockedPeople: { name: string; reason: string }[];
  upcoming?: PickupEvent;
  history: PickupEvent[];
  requiresPhotoId: boolean;
  requiresPassword: boolean;
  password?: string;
  custodyNotes: string;
};

export const pickupByChild: Record<string, PickupInfo> = {
  lea: {
    defaultTime: "17:30",
    defaultPerson: "Marie Dupont",
    authorizedPeople: [
      { name: "Marie Dupont", relation: "Mère", phone: "+33 6 12 34 56 78", idVerified: true, authorized: true },
      { name: "Pierre Dupont", relation: "Père", phone: "+33 6 11 22 33 44", idVerified: true, authorized: true },
      { name: "Jeanne Dupont", relation: "Grand-mère", phone: "+33 6 88 77 66 55", idVerified: true, authorized: true, notes: "Uniquement les lundis et mardis." },
    ],
    blockedPeople: [],
    upcoming: { date: "2026-06-18", time: "17:30", by: "Marie Dupont", status: "scheduled" },
    history: [
      { date: "2026-06-17", time: "17:42", by: "Marie Dupont", status: "completed" },
      { date: "2026-06-16", time: "18:05", by: "Pierre Dupont", status: "completed", note: "Légèrement en retard." },
      { date: "2026-06-15", time: "17:25", by: "Jeanne Dupont", status: "completed" },
    ],
    requiresPhotoId: false,
    requiresPassword: true,
    password: "Coccinelle",
    custodyNotes: "Garde partagée — semaines paires chez la mère.",
  },
  noah: {
    defaultTime: "17:15",
    defaultPerson: "Julien Bernard",
    authorizedPeople: [
      { name: "Julien Bernard", relation: "Père", phone: "+33 6 98 76 54 32", idVerified: true, authorized: true },
      { name: "Camille Bernard", relation: "Mère", phone: "+33 6 14 25 36 47", idVerified: true, authorized: true },
    ],
    blockedPeople: [],
    upcoming: { date: "2026-06-18", time: "17:15", by: "Julien Bernard", status: "scheduled" },
    history: [
      { date: "2026-06-17", time: "17:18", by: "Camille Bernard", status: "completed" },
      { date: "2026-06-16", time: "17:10", by: "Julien Bernard", status: "completed" },
    ],
    requiresPhotoId: false,
    requiresPassword: false,
    custodyNotes: "—",
  },
  ines: {
    defaultTime: "17:45",
    defaultPerson: "Sophie Moreau",
    authorizedPeople: [
      { name: "Sophie Moreau", relation: "Mère", phone: "+33 6 55 44 33 22", idVerified: true, authorized: true },
      { name: "Antoine Moreau", relation: "Père", phone: "+33 6 23 45 67 89", idVerified: true, authorized: true },
      { name: "Lucie Moreau", relation: "Tante", phone: "+33 6 67 89 01 23", idVerified: false, authorized: false, notes: "ID à fournir avant autorisation." },
    ],
    blockedPeople: [
      { name: "Marc Dubois", reason: "Décision de justice — interdiction de pickup." },
    ],
    upcoming: { date: "2026-06-18", time: "17:45", by: "Sophie Moreau", status: "scheduled" },
    history: [
      { date: "2026-06-17", time: "17:50", by: "Sophie Moreau", status: "completed" },
      { date: "2026-06-16", time: "—", by: "Antoine Moreau", status: "missed", note: "Absence non excusée." },
    ],
    requiresPhotoId: true,
    requiresPassword: true,
    password: "Étoile",
    custodyNotes: "Pickup uniquement par parents — pièce d'identité requise.",
  },
};

export const getPickup = (id: string): PickupInfo => {
  return (
    pickupByChild[id] ?? {
      defaultTime: "—",
      defaultPerson: "—",
      authorizedPeople: [],
      blockedPeople: [],
      history: [],
      requiresPhotoId: false,
      requiresPassword: false,
      custodyNotes: "—",
    }
  );
};

export const getThread = (id: string) => threads.find((t) => t.id === id);
export const getReportForChild = (childId: string) =>
  reportsToday.find((r) => r.childId === childId);

export const moodLabel: Record<Mood, string> = {
  happy: "Joyeux", calm: "Calme", tired: "Fatigué", upset: "Contrarié", sick: "Malade",
};
export const moodEmoji: Record<Mood, string> = {
  happy: "😊", calm: "🌿", tired: "😴", upset: "😢", sick: "🤒",
};
export const attendanceLabel: Record<AttendanceStatus, string> = {
  present: "Présent", absent: "Absent", late: "En retard", left: "Parti",
};

export function ageFromBirthdate(iso: string): string {
  const b = new Date(iso);
  const now = new Date();
  let months = (now.getFullYear() - b.getFullYear()) * 12 + (now.getMonth() - b.getMonth());
  if (now.getDate() < b.getDate()) months -= 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return y > 0 ? `${y} an${y > 1 ? "s" : ""} ${m} m` : `${m} mois`;
}