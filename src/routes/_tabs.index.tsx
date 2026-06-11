import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { Icon } from "@/components/icon";
import { RoomBadge } from "@/components/room-badge";
import { coordClassrooms, coordinator, priorityAlerts } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/")({
  head: () => ({
    meta: [
      { title: "Overview — Digital Sanctuary" },
      { name: "description", content: "Coordinator overview: attendance, health alerts and report progress across classrooms." },
      { property: "og:title", content: "Overview — Digital Sanctuary" },
      { property: "og:description", content: "Age-group coordinator daily cockpit." },
    ],
  }),
  component: OverviewPage,
});

function OverviewPage() {
  const present = coordClassrooms.reduce((s, c) => s + c.present, 0);
  const enrolled = coordClassrooms.reduce((s, c) => s + c.enrolled, 0);
  const reportsDone = coordClassrooms.reduce((s, c) => s + c.reportsDone, 0);
  const reportsTotal = coordClassrooms.reduce((s, c) => s + c.reportsTotal, 0);
  const healthAlerts = 2;

  const dateLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <AppHeader />
      <Page>
        <section className="flex items-center gap-3">
          <img
            src={coordinator.avatar}
            alt=""
            className="h-12 w-12 rounded-full bg-card object-cover"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {dateLabel}
            </p>
            <h1 className="font-display text-xl font-extrabold tracking-tight text-primary">
              {coordinator.group}
            </h1>
          </div>
        </section>

        <h2 className="mt-6 font-display text-2xl font-extrabold tracking-tight">
          Today&apos;s Overview
        </h2>

        <div className="mt-4 space-y-3">
          <StatCard
            icon="groups"
            label="Present"
            tone="primary"
            value={`${present}`}
            suffix={` / ${enrolled}`}
          />
          <StatCard
            icon="medical_services"
            label="Health Alerts"
            tone="danger"
            value={`${healthAlerts}`}
          />
          <StatCard
            icon="task_alt"
            label="Daily Reports"
            tone="success"
            value={`${reportsDone}`}
            suffix={` / ${reportsTotal}`}
            progress={Math.round((reportsDone / reportsTotal) * 100)}
          />
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">
              My Classrooms
            </h2>
            <Link to="/classes" className="text-sm font-semibold text-primary">
              View all
            </Link>
          </div>

          <div className="mt-4 space-y-4">
            {coordClassrooms.map((c) => {
              const pct = Math.round((c.reportsDone / c.reportsTotal) * 100);
              return (
                <Link
                  key={c.id}
                  to="/classes/$id"
                  params={{ id: c.id }}
                  className="block rounded-3xl bg-card p-5 shadow-card transition-transform active:scale-[0.99]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <RoomBadge flower={c.flower} />
                      <div>
                        <h3 className="font-display text-lg font-bold leading-tight">
                          {c.name}
                        </h3>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <Icon name="person" size={14} />
                          Lead: {c.lead.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-stretch gap-4">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Attendance
                      </span>
                      <span className="font-display text-lg font-bold text-primary">
                        {c.present}
                        <span className="text-muted-foreground">/{c.enrolled}</span>
                      </span>
                    </div>
                    <div className="w-px bg-border" />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Reports
                      </span>
                      <span className="font-display text-lg font-bold text-[var(--status-present)]">
                        {c.reportsDone}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Report progress</span>
                      <span
                        className={
                          "font-bold " +
                          (pct >= 100
                            ? "text-[var(--status-present)]"
                            : pct < 50
                              ? "text-[var(--status-late)]"
                              : "text-primary")
                        }
                      >
                        {pct}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background:
                            pct >= 100
                              ? "var(--status-present)"
                              : pct < 50
                                ? "var(--status-late)"
                                : "var(--primary)",
                        }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">
            Priority Alerts
          </h2>
          <div className="mt-4 space-y-3">
            {priorityAlerts.map((a) => (
              <PriorityAlertRow key={a.id} alert={a} />
            ))}
          </div>
        </section>
      </Page>
    </>
  );
}

const toneStyles = {
  primary: { wash: "color-mix(in oklab, var(--primary) 12%, var(--card))", icon: "var(--primary)", text: "text-primary" },
  danger: { wash: "color-mix(in oklab, var(--destructive) 12%, var(--card))", icon: "var(--destructive)", text: "text-destructive" },
  success: { wash: "color-mix(in oklab, var(--status-present) 14%, var(--card))", icon: "var(--status-present)", text: "text-[var(--status-present)]" },
} as const;

function StatCard({
  icon,
  label,
  value,
  suffix,
  tone,
  progress,
}: {
  icon: string;
  label: string;
  value: string;
  suffix?: string;
  tone: keyof typeof toneStyles;
  progress?: number;
}) {
  const t = toneStyles[tone];
  return (
    <div className="rounded-3xl bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ background: t.wash, color: t.icon }}
          >
            <Icon name={icon} filled size={18} />
          </span>
          {label}
        </p>
      </div>
      <p className="mt-3 font-display text-3xl font-extrabold tracking-tight">
        <span className={t.text}>{value}</span>
        {suffix && <span className="text-base font-bold text-muted-foreground">{suffix}</span>}
      </p>
      {typeof progress === "number" && (
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, background: "var(--status-present)" }}
          />
        </div>
      )}
    </div>
  );
}

const alertConfig = {
  fever: { icon: "thermostat", color: "var(--destructive)", wash: "color-mix(in oklab, var(--destructive) 12%, var(--card))" },
  missing: { icon: "warning", color: "var(--status-late)", wash: "color-mix(in oklab, var(--status-late) 16%, var(--card))" },
  pickup: { icon: "schedule", color: "var(--primary)", wash: "color-mix(in oklab, var(--primary) 12%, var(--card))" },
} as const;

function PriorityAlertRow({ alert }: { alert: (typeof priorityAlerts)[number] }) {
  const c = alertConfig[alert.kind];
  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      className="rounded-2xl bg-card p-4 shadow-card"
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ background: c.wash, color: c.color }}
        >
          <Icon name={c.icon} filled size={20} />
        </span>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-sm font-bold">{alert.title}</h3>
            <span className="shrink-0 text-[11px] text-muted-foreground">{alert.ago}</span>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{alert.body}</p>
          <button className="mt-2 text-sm font-semibold text-primary">{alert.action}</button>
        </div>
      </div>
    </motion.div>
  );
}
