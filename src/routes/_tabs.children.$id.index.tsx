import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Phone, FileText, History, AlertTriangle } from "lucide-react";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { AvatarInitial } from "@/components/avatar-initial";
import { AttendanceBadge, MoodPill } from "@/components/badges";
import {
  ageFromBirthdate,
  attendanceToday,
  getChild,
  getReportForChild,
} from "@/lib/mock";
import type { Child } from "@/lib/mock";

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

function ChildPage() {
  const { child } = Route.useLoaderData();
  const report = getReportForChild(child.id);
  const status = attendanceToday[child.id] ?? "present";

  return (
    <>
      <SubPageHeader title={`${child.firstName} ${child.lastName}`} />
      <Page>
        <section className="flex flex-col items-center gap-3 rounded-2xl bg-card p-6 text-center shadow-card">
          <AvatarInitial name={`${child.firstName} ${child.lastName}`} size={88} />
          <div>
            <h1 className="font-display text-xl font-semibold">
              {child.firstName} {child.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {ageFromBirthdate(child.birthdate)} · né le{" "}
              {new Date(child.birthdate).toLocaleDateString("fr-FR")}
            </p>
          </div>
          <div className="flex gap-2">
            <AttendanceBadge status={status} />
            {report && <MoodPill mood={report.mood} />}
          </div>
        </section>

        {child.allergies.length > 0 && (
          <section className="mt-4 rounded-2xl border border-status-incident/30 bg-status-incident/5 p-4">
            <div className="flex items-center gap-2 text-status-incident">
              <AlertTriangle className="h-4 w-4" />
              <p className="text-sm font-semibold">Allergies</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {child.allergies.map((a) => (
                <span key={a} className="rounded-full bg-card px-3 py-1 text-xs font-medium">
                  {a}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="mt-4 rounded-2xl border border-border/60 bg-card p-4">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Tuteurs
          </h2>
          <ul className="mt-3 divide-y divide-border/60">
            {child.guardians.map((g) => (
              <li key={g.phone} className="flex items-center gap-3 py-3">
                <AvatarInitial name={g.name} size={36} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{g.name}</p>
                  <p className="text-xs text-muted-foreground">{g.relation}</p>
                </div>
                <a
                  aria-label={`Appeler ${g.name}`}
                  href={`tel:${g.phone.replace(/\s+/g, "")}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-4 rounded-2xl border border-border/60 bg-card p-4">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Notes pédagogiques
          </h2>
          <p className="mt-2 text-sm text-foreground/90">{child.notes}</p>
        </section>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            to="/children/$id/report"
            params={{ id: child.id }}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-primary p-5 text-primary-foreground shadow-card"
          >
            <FileText className="h-5 w-5" />
            <span className="text-sm font-semibold">Rapport du jour</span>
          </Link>
          <Link
            to="/children/$id/history"
            params={{ id: child.id }}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-5"
          >
            <History className="h-5 w-5" />
            <span className="text-sm font-semibold">Historique</span>
          </Link>
        </div>
      </Page>
    </>
  );
}