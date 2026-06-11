import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { AvatarInitial } from "@/components/avatar-initial";
import { MoodPill } from "@/components/badges";
import { children, getChild, reportsToday } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/reports/")({
  head: () => ({
    meta: [
      { title: "Rapports — Éducatrices" },
      { name: "description", content: "Vue d'ensemble des rapports journaliers : brouillons et envoyés." },
      { property: "og:title", content: "Rapports — Éducatrices" },
      { property: "og:description", content: "Suivez les rapports du jour de toute votre classe." },
    ],
  }),
  component: ReportsPage,
});

type Filter = "todo" | "submitted" | "all";

function ReportsPage() {
  const [filter, setFilter] = useState<Filter>("todo");

  const todoChildren = children.filter((c) => {
    const r = reportsToday.find((x) => x.childId === c.id);
    return !r || r.status === "draft";
  });
  const submitted = reportsToday.filter((r) => r.status === "submitted");

  const rows =
    filter === "submitted"
      ? submitted.map((r) => ({ child: getChild(r.childId)!, report: r }))
      : filter === "todo"
        ? todoChildren.map((c) => ({
            child: c,
            report: reportsToday.find((r) => r.childId === c.id),
          }))
        : children.map((c) => ({
            child: c,
            report: reportsToday.find((r) => r.childId === c.id),
          }));

  return (
    <>
      <AppHeader />
      <Page>
        <h1 className="font-display text-2xl font-semibold">Rapports du jour</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {submitted.length}/{children.length} envoyés aux parents
        </p>

        <div className="mt-4 flex gap-1 rounded-full bg-secondary p-1">
          {(["todo", "submitted", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors " +
                (filter === f
                  ? "bg-card text-foreground shadow-card"
                  : "text-muted-foreground")
              }
            >
              {f === "todo" ? "À faire" : f === "submitted" ? "Envoyés" : "Tous"}
            </button>
          ))}
        </div>

        <Link
          to="/reports/week"
          className="mt-3 flex items-center justify-between rounded-xl bg-accent/30 px-4 py-3 text-sm font-medium"
        >
          Voir la semaine
          <ChevronRight className="h-4 w-4" />
        </Link>

        <ul className="mt-4 space-y-2">
          {rows.map(({ child, report }) => (
            <li key={child.id}>
              <Link
                to="/children/$id/report"
                params={{ id: child.id }}
                className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3"
              >
                <AvatarInitial name={`${child.firstName} ${child.lastName}`} size={40} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium leading-tight">{child.firstName}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {report?.highlight ?? "Pas encore commencé"}
                  </p>
                </div>
                {report ? (
                  report.status === "submitted" ? (
                    <span className="rounded-full bg-status-present/15 px-2.5 py-0.5 text-[11px] font-medium text-status-present">
                      Envoyé
                    </span>
                  ) : (
                    <>
                      <MoodPill mood={report.mood} />
                      <span className="rounded-full bg-status-draft/20 px-2.5 py-0.5 text-[11px] font-medium">
                        Brouillon
                      </span>
                    </>
                  )
                ) : (
                  <span className="rounded-full bg-status-absent/15 px-2.5 py-0.5 text-[11px] font-medium text-status-absent">
                    À faire
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}