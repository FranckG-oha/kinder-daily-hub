import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ChevronRight, Circle, FileText, PartyPopper } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { AttendanceBadge } from "@/components/badges";
import {
  attendanceToday,
  children,
  eventsThisWeek,
  reportsToday,
  todosToday,
} from "@/lib/mock";

export const Route = createFileRoute("/_tabs/")({
  head: () => ({
    meta: [
      { title: "Today — Éducatrices" },
      { name: "description", content: "Cockpit du jour : présences, à faire et alertes de la classe." },
      { property: "og:title", content: "Today — Éducatrices" },
      { property: "og:description", content: "Cockpit quotidien de l'éducatrice Montessori." },
    ],
  }),
  component: TodayPage,
});

function TodayPage() {
  const present = Object.values(attendanceToday).filter((s) => s === "present").length;
  const absent = Object.values(attendanceToday).filter((s) => s === "absent").length;
  const late = Object.values(attendanceToday).filter((s) => s === "late").length;
  const submitted = reportsToday.filter((r) => r.status === "submitted").length;
  const draft = reportsToday.filter((r) => r.status === "draft").length;
  const allergyChildren = children.filter((c) => c.allergies.length > 0);

  return (
    <>
      <AppHeader greeting="Bonne journée" />
      <Page>
        <h1 className="sr-only">Aujourd'hui</h1>

        {/* Roll call */}
        <section aria-labelledby="rollcall" className="rounded-2xl bg-card p-5 shadow-card">
          <div className="flex items-baseline justify-between">
            <h2 id="rollcall" className="font-display text-lg font-semibold">
              Appel du matin
            </h2>
            <Link to="/children" className="text-xs font-medium text-primary">
              Voir tout
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <StatTile value={present} label="Présents" tone="bg-status-present/15 text-status-present" />
            <StatTile value={late} label="Retards" tone="bg-status-late/25 text-foreground" />
            <StatTile value={absent} label="Absents" tone="bg-status-absent/15 text-status-absent" />
          </div>
        </section>

        {/* Reports progress */}
        <Link to="/reports" className="mt-4 block">
          <motion.section
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-4 rounded-2xl bg-primary p-5 text-primary-foreground shadow-card"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/15">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-xs opacity-80">Rapports du jour</p>
              <p className="font-display text-lg font-semibold">
                {submitted}/{children.length} envoyés · {draft} en brouillon
              </p>
            </div>
            <ChevronRight className="h-5 w-5 opacity-80" />
          </motion.section>
        </Link>

        {/* Alerts */}
        <section className="mt-4">
          <h2 className="mb-2 px-1 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Alertes
          </h2>
          <ul className="space-y-2">
            {allergyChildren.map((c) => (
              <li
                key={c.id}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3"
              >
                <AlertTriangle className="h-4 w-4 text-status-incident" />
                <div className="flex-1 text-sm">
                  <span className="font-medium">{c.firstName}</span>{" "}
                  <span className="text-muted-foreground">
                    — allergie : {c.allergies.join(", ")}
                  </span>
                </div>
                <AttendanceBadge status={attendanceToday[c.id] ?? "present"} />
              </li>
            ))}
          </ul>
        </section>

        {/* Todos */}
        <section className="mt-6">
          <h2 className="mb-2 px-1 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            À faire aujourd'hui
          </h2>
          <ul className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-card">
            {todosToday.map((t) => (
              <li key={t.id} className="flex items-center gap-3 px-4 py-3">
                {t.done ? (
                  <CheckCircle2 className="h-5 w-5 text-status-present" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <span
                  className={
                    "flex-1 text-sm " +
                    (t.done ? "text-muted-foreground line-through" : "text-foreground")
                  }
                >
                  {t.label}
                </span>
                {t.time && <span className="text-xs text-muted-foreground">{t.time}</span>}
              </li>
            ))}
          </ul>
        </section>

        {/* Events */}
        <section className="mt-6">
          <h2 className="mb-2 px-1 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Cette semaine
          </h2>
          <ul className="space-y-2">
            {eventsThisWeek.map((e) => (
              <li
                key={e.id}
                className="flex items-center gap-3 rounded-xl bg-accent/30 px-4 py-3"
              >
                <PartyPopper className="h-4 w-4 text-accent-foreground" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{e.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </Page>
    </>
  );
}

function StatTile({ value, label, tone }: { value: number; label: string; tone: string }) {
  return (
    <div className={"rounded-xl p-3 text-center " + tone}>
      <p className="font-display text-2xl font-semibold leading-none">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-wide opacity-80">{label}</p>
    </div>
  );
}