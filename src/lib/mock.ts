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

// ─── helpers ────────────────────────────────────────────

export const getChild = (id: string) => children.find((c) => c.id === id);
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