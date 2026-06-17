import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Phone,
  FileText,
  History,
  AlertTriangle,
  MessageCircle,
  Camera,
  Plus,
  Utensils,
  Moon,
  Smile,
  Clock,
} from "lucide-react";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { AvatarInitial } from "@/components/avatar-initial";
import {
  ageFromBirthdate,
  attendanceToday,
  getChild,
  getReportForChild,
  attendanceLabel,
  moodEmoji,
  moodLabel,
} from "@/lib/mock";
import type { Child } from "@/lib/mock";

// T-12 — Child Overview
export const Route = createFileRoute("/_tabs/children/$id/")({
  loader: ({ params }) => {
    const child: Child | undefined = getChild(params.id);
    if (!child) throw notFound();
    return { child: child as Child };
  },
  head: ({ params }) => ({
    meta: [
      { title: `Fiche enfant — ${params.id}` },
      { name: "description", content: "Fiche enfant : informations, allergies, tuteurs et rapport du jour." },
    ],
  }),
  component: ChildPage,
});

const tabs = [
  { key: "overview", label: "Aperçu", to: "/children/$id" as const },
  { key: "personal", label: "Personnel", to: "/children/$id/personal" as const },
  { key: "medical", label: "Médical", to: "/children/$id" as const },
  { key: "emergency", label: "Urgence", to: "/children/$id" as const },
  { key: "pickup", label: "Pickup", to: "/children/$id" as const },
  { key: "attendance", label: "Présence", to: "/children/$id" as const },
  { key: "reports", label: "Rapports", to: "/children/$id/history" as const },
];

function ChildPage() {
  const { child } = Route.useLoaderData();
  const report = getReportForChild(child.id);
  const status = attendanceToday[child.id] ?? "present";
  const statusTone: Record<string, string> = {
    present: "bg-status-present",
    late: "bg-status-late",
    absent: "bg-status-absent",
    left: "bg-status-left",
  };
  const primaryGuardian = child.guardians[0];
  const meal = report?.meals[0];
  const nap = report?.naps[0];

  return (
    <>
      <SubPageHeader title={`${child.firstName} ${child.lastName}`} />
      <Page>
        <h1 className="sr-only">
          Fiche de {child.firstName} {child.lastName}
        </h1>

        {/* Hero */}
        <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-primary-light to-card p-5 shadow-card">
          <div className="flex items-center gap-4">
            <div className="relative">
              <AvatarInitial name={`${child.firstName} ${child.lastName}`} size={72} />
              <span
                aria-hidden
                className={
                  "absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full ring-2 ring-card " +
                  statusTone[status]
                }
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[20px] font-extrabold leading-tight tracking-tight">
                {child.firstName} {child.lastName}
              </p>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                {ageFromBirthdate(child.birthdate)} · né le{" "}
                {new Date(child.birthdate).toLocaleDateString("fr-FR")}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 text-[11px] font-semibold">
                  <span className={"h-1.5 w-1.5 rounded-full " + statusTone[status]} />
                  {attendanceLabel[status]}
                </span>
                {report && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 text-[11px] font-semibold">
                    <span>{moodEmoji[report.mood]}</span>
                    {moodLabel[report.mood]}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick actions */}
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
          {tabs.map((t, i) => {
            const active = i === 0;
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

        {/* Allergies */}
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

        {/* Today snapshot */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Aujourd'hui
            </h2>
            {report && (
              <span className="text-[10px] font-semibold uppercase text-muted-foreground">
                {report.status === "submitted" ? "Envoyé" : "Brouillon"}
              </span>
            )}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <Stat
              icon={<Smile size={16} strokeWidth={1.75} />}
              label="Humeur"
              value={report ? moodLabel[report.mood] : "—"}
            />
            <Stat
              icon={<Utensils size={16} strokeWidth={1.75} />}
              label="Repas"
              value={meal ? mealAmount(meal.amount) : "—"}
            />
            <Stat
              icon={<Moon size={16} strokeWidth={1.75} />}
              label="Sieste"
              value={nap ? napDuration(nap.start, nap.end) : "—"}
            />
          </div>

          {report?.highlight && (
            <p className="mt-3 rounded-xl bg-primary-light px-3 py-2 text-sm leading-snug">
              « {report.highlight} »
            </p>
          )}

          {report?.activities && report.activities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {report.activities.map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium"
                >
                  {a}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Guardians */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Tuteurs
          </h2>
          <ul className="mt-3 divide-y divide-border/60">
            {child.guardians.map((g: { name: string; phone: string; relation: string }) => (
              <li key={g.phone} className="flex items-center gap-3 py-3">
                <AvatarInitial name={g.name} size={36} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{g.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {g.relation} · {g.phone}
                  </p>
                </div>
                <a
                  aria-label={`Appeler ${g.name}`}
                  href={`tel:${g.phone.replace(/\s+/g, "")}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Phone size={16} strokeWidth={1.75} />
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Pedagogical notes */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Notes pédagogiques
          </h2>
          <p className="mt-2 text-sm text-foreground/90">{child.notes}</p>
        </section>

        {/* CTA */}
        <div className="mt-5 grid grid-cols-2 gap-3 pb-4">
          <Link
            to="/children/$id/report"
            params={{ id: child.id }}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-primary p-5 text-primary-foreground shadow-card"
          >
            <FileText size={20} strokeWidth={1.75} />
            <span className="text-sm font-semibold">Rapport du jour</span>
          </Link>
          <Link
            to="/children/$id/history"
            params={{ id: child.id }}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-5"
          >
            <History size={20} strokeWidth={1.75} />
            <span className="text-sm font-semibold">Historique</span>
          </Link>
        </div>
      </Page>
    </>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-secondary/40 p-3">
      <div className="flex items-center gap-1 text-primary">
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="mt-1 text-sm font-bold leading-tight">{value}</p>
    </div>
  );
}

function mealAmount(a: "none" | "some" | "most" | "all"): string {
  return { none: "Rien", some: "Un peu", most: "Bien", all: "Tout" }[a];
}

function napDuration(start: string, end: string): string {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const mins = eh * 60 + em - (sh * 60 + sm);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h${m.toString().padStart(2, "0")}` : `${m} min`;
}

// keep import used
void Clock;