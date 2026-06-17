import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Phone,
  MessageCircle,
  Plus,
  Camera,
  AlertTriangle,
  Pill,
  Syringe,
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  CalendarClock,
  FileText,
  Pencil,
} from "lucide-react";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { AvatarInitial } from "@/components/avatar-initial";
import {
  ageFromBirthdate,
  getChild,
  getMedical,
  type Child,
} from "@/lib/mock";

// T-14 — Medical
export const Route = createFileRoute("/_tabs/children/$id/medical")({
  loader: ({ params }) => {
    const child: Child | undefined = getChild(params.id);
    if (!child) throw notFound();
    return { child: child as Child, medical: getMedical(params.id) };
  },
  head: ({ params }) => ({
    meta: [
      { title: `Médical — ${params.id}` },
      {
        name: "description",
        content: "Informations médicales de l'enfant : allergies, traitements, vaccins, médecin.",
      },
    ],
  }),
  component: MedicalPage,
});

const tabs = [
  { key: "overview", label: "Aperçu", to: "/children/$id" as const },
  { key: "personal", label: "Personnel", to: "/children/$id/personal" as const },
  { key: "medical", label: "Médical", to: "/children/$id/medical" as const },
  { key: "emergency", label: "Urgence", to: "/children/$id" as const },
  { key: "pickup", label: "Pickup", to: "/children/$id" as const },
  { key: "attendance", label: "Présence", to: "/children/$id" as const },
  { key: "reports", label: "Rapports", to: "/children/$id/history" as const },
];

const vaccineTone: Record<"ok" | "due" | "late", string> = {
  ok: "bg-status-present/15 text-status-present",
  due: "bg-status-late/20 text-foreground",
  late: "bg-destructive/15 text-destructive",
};
const vaccineLabel: Record<"ok" | "due" | "late", string> = {
  ok: "À jour", due: "Bientôt", late: "En retard",
};

function MedicalPage() {
  const { child, medical } = Route.useLoaderData();
  const primaryGuardian = child.guardians[0];

  return (
    <>
      <SubPageHeader title={`Médical · ${child.firstName}`} />
      <Page>
        <h1 className="sr-only">
          Dossier médical de {child.firstName}
        </h1>

        {/* Hero compact */}
        <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-primary-light to-card p-5 shadow-card">
          <div className="flex items-center gap-4">
            <AvatarInitial name={`${child.firstName} ${child.lastName}`} size={64} />
            <div className="min-w-0 flex-1">
              <p className="font-display text-[18px] font-extrabold leading-tight tracking-tight">
                {child.firstName} {child.lastName}
              </p>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                {ageFromBirthdate(child.birthdate)} · Groupe {medical.bloodType}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {medical.heightCm} cm · {medical.weightKg} kg
              </p>
            </div>
            <button
              aria-label="Modifier"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-card"
            >
              <Pencil size={16} strokeWidth={1.75} className="text-primary" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {primaryGuardian && (
              <a
                href={`tel:${primaryGuardian.phone.replace(/\s+/g, "")}`}
                aria-label={`Appeler ${primaryGuardian.name}`}
                className="flex flex-col items-center gap-1 rounded-2xl bg-card px-2 py-3 shadow-card"
              >
                <Phone size={18} strokeWidth={1.75} className="text-primary" />
                <span className="text-[10px] font-semibold">Appeler</span>
              </a>
            )}
            <Link
              to="/messages"
              className="flex flex-col items-center gap-1 rounded-2xl bg-card px-2 py-3 shadow-card"
            >
              <MessageCircle size={18} strokeWidth={1.75} className="text-primary" />
              <span className="text-[10px] font-semibold">Message</span>
            </Link>
            <Link
              to="/quick-log"
              className="flex flex-col items-center gap-1 rounded-2xl bg-card px-2 py-3 shadow-card"
            >
              <Plus size={18} strokeWidth={1.75} className="text-primary" />
              <span className="text-[10px] font-semibold">Log</span>
            </Link>
            <Link
              to="/log/photo"
              className="flex flex-col items-center gap-1 rounded-2xl bg-card px-2 py-3 shadow-card"
            >
              <Camera size={18} strokeWidth={1.75} className="text-primary" />
              <span className="text-[10px] font-semibold">Photo</span>
            </Link>
          </div>
        </section>

        {/* Tab strip */}
        <nav
          aria-label="Sections de la fiche enfant"
          className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1"
        >
          {tabs.map((t) => {
            const active = t.key === "medical";
            return (
              <Link
                key={t.key}
                to={t.to}
                params={{ id: child.id }}
                aria-current={active ? "page" : undefined}
                className={
                  "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors " +
                  (active
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground/70 border border-border")
                }
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        {/* Allergies — critical */}
        {child.allergies.length > 0 && (
          <section className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle size={16} strokeWidth={1.75} />
              <p className="text-sm font-semibold">Allergies</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {child.allergies.map((a: string) => (
                <span
                  key={a}
                  className="rounded-full bg-card px-3 py-1 text-xs font-medium"
                >
                  {a}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Conditions */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 text-primary">
            <HeartPulse size={16} strokeWidth={1.75} />
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Conditions médicales
            </h2>
          </div>
          {medical.conditions.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Aucune condition signalée.
            </p>
          ) : (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {medical.conditions.map((c: string) => (
                <span
                  key={c}
                  className="rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-medium text-primary"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Médicaments autorisés */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <Pill size={16} strokeWidth={1.75} />
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Traitements
              </h2>
            </div>
            <Link
              to="/quick-log"
              className="text-[11px] font-semibold text-primary"
            >
              + Donner
            </Link>
          </div>
          {medical.medications.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Aucun traitement en cours.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {medical.medications.map(
                (m: { name: string; dose: string; schedule: string; authorized: boolean }) => (
                  <li
                    key={m.name}
                    className="flex items-center gap-3 rounded-xl bg-secondary/40 px-3 py-2.5"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-light">
                      <Pill size={16} strokeWidth={1.75} className="text-primary" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{m.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {m.dose} · {m.schedule}
                      </p>
                    </div>
                    {m.authorized && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-status-present/15 px-2 py-0.5 text-[10px] font-semibold text-status-present">
                        <ShieldCheck size={11} strokeWidth={1.75} />
                        Autorisé
                      </span>
                    )}
                  </li>
                ),
              )}
            </ul>
          )}
        </section>

        {/* Vaccins */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 text-primary">
            <Syringe size={16} strokeWidth={1.75} />
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Vaccins
            </h2>
          </div>
          <ul className="mt-3 divide-y divide-border/60">
            {medical.vaccines.map(
              (v: { name: string; date: string; status: "ok" | "due" | "late" }) => (
                <li key={v.name} className="flex items-center justify-between py-2.5">
                  <div>
                    <p className="text-sm font-medium">{v.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {new Date(v.date).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <span
                    className={
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold " +
                      vaccineTone[v.status]
                    }
                  >
                    {vaccineLabel[v.status]}
                  </span>
                </li>
              ),
            )}
          </ul>
        </section>

        {/* Médecin */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 text-primary">
            <Stethoscope size={16} strokeWidth={1.75} />
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Médecin traitant
            </h2>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <AvatarInitial name={medical.doctor.name} size={40} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{medical.doctor.name}</p>
              <p className="text-xs text-muted-foreground">{medical.doctor.clinic}</p>
            </div>
            <a
              aria-label={`Appeler ${medical.doctor.name}`}
              href={`tel:${medical.doctor.phone.replace(/\s+/g, "")}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <Phone size={16} strokeWidth={1.75} />
            </a>
          </div>
          {medical.pediatrician && (
            <div className="mt-3 flex items-center gap-3 border-t border-border/60 pt-3">
              <AvatarInitial name={medical.pediatrician.name} size={36} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{medical.pediatrician.name}</p>
                <p className="text-xs text-muted-foreground">Pédiatre</p>
              </div>
              <a
                aria-label={`Appeler ${medical.pediatrician.name}`}
                href={`tel:${medical.pediatrician.phone.replace(/\s+/g, "")}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <Phone size={16} strokeWidth={1.75} />
              </a>
            </div>
          )}
        </section>

        {/* Couverture & visites */}
        <section className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 text-primary">
              <CalendarClock size={16} strokeWidth={1.75} />
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Dernière visite
              </h3>
            </div>
            <p className="mt-2 text-sm font-semibold">
              {medical.lastCheckup !== "—"
                ? new Date(medical.lastCheckup).toLocaleDateString("fr-FR")
                : "—"}
            </p>
          </div>
          <div className="rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 text-primary">
              <FileText size={16} strokeWidth={1.75} />
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Assurance
              </h3>
            </div>
            <p className="mt-2 text-sm font-semibold">{medical.insurance.provider}</p>
            <p className="text-[11px] text-muted-foreground">
              {medical.insurance.number}
            </p>
          </div>
        </section>

        {/* Notes médicales */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Notes médicales
          </h2>
          <p className="mt-2 text-sm text-foreground/90">{medical.notes}</p>
        </section>

        <div className="h-4" />
      </Page>
    </>
  );
}