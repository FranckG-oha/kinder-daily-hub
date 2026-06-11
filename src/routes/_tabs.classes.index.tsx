import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { Icon } from "@/components/icon";
import { RoomBadge } from "@/components/room-badge";
import { coordClassrooms } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/classes/")({
  head: () => ({
    meta: [
      { title: "Classes — Digital Sanctuary" },
      { name: "description", content: "Live pulse of every supervised classroom: attendance, alerts and report progress." },
    ],
  }),
  component: ClassesPage,
});

type Filter = "all" | "alerts" | "incomplete";

const filters: { id: Filter; label: string; dot?: boolean }[] = [
  { id: "all", label: "All" },
  { id: "alerts", label: "With alerts", dot: true },
  { id: "incomplete", label: "Incomplete reports" },
];

function ClassesPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const list = coordClassrooms.filter((c) => {
    if (filter === "alerts") return Boolean(c.alert);
    if (filter === "incomplete") return c.reportsDone < c.reportsTotal;
    return true;
  });

  return (
    <>
      <AppHeader />
      <Page>
        <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance">
          Classes Overview
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Here&apos;s the current pulse of your supervised rooms.
        </p>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={
                  "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors " +
                  (active
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground/70 shadow-card")
                }
              >
                {f.dot && (
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                )}
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 space-y-5">
          {list.map((c) => {
            const pct = Math.round((c.reportsDone / c.reportsTotal) * 100);
            return (
              <Link
                key={c.id}
                to="/classes/$id"
                params={{ id: c.id }}
                className="block rounded-3xl bg-card p-5 shadow-card transition-transform active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-3">
                  <RoomBadge flower={c.flower} size={52} />
                  <div className="text-right">
                    <span className="font-display text-2xl font-extrabold">
                      {c.present}
                      <span className="text-base font-bold text-muted-foreground">
                        /{c.enrolled}
                      </span>
                    </span>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Attendance
                    </p>
                  </div>
                </div>

                <h3 className="mt-3 font-display text-xl font-bold">{c.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Icon name="person" size={16} />
                  {c.lead.name}
                </p>

                {c.alert ? (
                  <div
                    className="mt-4 flex items-start gap-3 rounded-2xl p-4"
                    style={{ background: "color-mix(in oklab, var(--status-late) 14%, var(--card))" }}
                  >
                    <div className="flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--status-late)]">
                        Alert: {c.alert.title}
                      </p>
                      <p className="mt-1 text-sm text-foreground/80">{c.alert.body}</p>
                    </div>
                    <Icon name="warning" filled size={20} className="text-[var(--status-late)]" />
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl bg-secondary px-4 py-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold uppercase tracking-wide text-muted-foreground">
                        Report progress
                      </span>
                      <span className="font-bold text-primary">{pct}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-card">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )}
              </Link>
            );
          })}

          {list.length === 0 && (
            <p className="rounded-3xl bg-card p-8 text-center text-sm text-muted-foreground shadow-card">
              No classrooms match this filter.
            </p>
          )}
        </div>
      </Page>
    </>
  );
}
