import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { Icon } from "@/components/icon";
import {
  classroomEvals,
  evalStatusLabel,
  evaluationPeriod,
  type EvalStatus,
} from "@/lib/mock";

export const Route = createFileRoute("/_tabs/evaluations")({
  head: () => ({
    meta: [
      { title: "Evaluations — Digital Sanctuary" },
      { name: "description", content: "Oversee classroom evaluation progress, validate submissions and remind teaching staff." },
    ],
  }),
  component: EvaluationsPage,
});

function EvaluationsPage() {
  const overall = Math.round(
    classroomEvals.reduce((s, c) => s + c.progress, 0) / classroomEvals.length,
  );
  const ready = classroomEvals.filter((c) => c.status === "ready").length;
  const pending = classroomEvals.filter((c) => c.status !== "ready").length;

  return (
    <>
      <AppHeader showAvatar={false} />
      <Page>
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          Evaluation period
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-balance">
          {evaluationPeriod}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Oversee classroom evaluation progress, validate submissions, and send
          gentle reminders to teaching staff.
        </p>

        <div className="mt-5 flex gap-3">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-secondary px-4 py-3.5 text-sm font-bold text-primary transition-transform active:scale-95">
            <Icon name="mail" filled size={18} />
            Remind pending ({pending})
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 text-sm font-bold text-primary-foreground transition-transform active:scale-95">
            <Icon name="check_circle" filled size={18} />
            Validate all ready
          </button>
        </div>

        <section className="mt-6 rounded-3xl bg-card p-5 shadow-card">
          <div className="flex items-start justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
              <Icon name="trending_up" filled size={20} />
            </span>
            <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              Overall
            </span>
          </div>
          <p className="mt-4 text-sm font-medium text-muted-foreground">Completion rate</p>
          <p className="font-display text-4xl font-extrabold tracking-tight">{overall}%</p>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${overall}%` }}
            />
          </div>
        </section>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <MiniStat
            icon="check_circle"
            tone="success"
            value={ready}
            label="Classrooms"
            title="Ready to validate"
          />
          <MiniStat
            icon="pending_actions"
            tone="warning"
            value={pending}
            label="Classrooms"
            title="In progress / pending"
          />
        </div>

        <section className="mt-8">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">
            Classroom status
          </h2>
          <div className="mt-4 space-y-4">
            {classroomEvals.map((c) => (
              <EvalRow key={c.id} c={c} />
            ))}
          </div>
        </section>
      </Page>
    </>
  );
}

function MiniStat({
  icon,
  tone,
  value,
  label,
  title,
}: {
  icon: string;
  tone: "success" | "warning";
  value: number;
  label: string;
  title: string;
}) {
  const color = tone === "success" ? "var(--status-present)" : "var(--status-late)";
  return (
    <div className="rounded-3xl bg-card p-5 shadow-card">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          background: `color-mix(in oklab, ${color} 16%, var(--card))`,
          color,
        }}
      >
        <Icon name={icon} filled size={20} />
      </span>
      <p className="mt-4 text-xs font-medium text-muted-foreground">{title}</p>
      <p className="mt-1 font-display text-3xl font-extrabold tracking-tight">
        {value}
        <span className="ml-1 text-sm font-semibold text-muted-foreground">{label}</span>
      </p>
    </div>
  );
}

const evalPill: Record<EvalStatus, { cls: string; icon: string }> = {
  ready: {
    cls: "bg-[color-mix(in_oklab,var(--status-present)_18%,var(--card))] text-[var(--status-present)]",
    icon: "check_circle",
  },
  progress: {
    cls: "bg-secondary text-primary",
    icon: "autorenew",
  },
  notStarted: {
    cls: "bg-[color-mix(in_oklab,var(--status-late)_16%,var(--card))] text-[var(--status-late)]",
    icon: "schedule",
  },
};

function EvalRow({ c }: { c: (typeof classroomEvals)[number] }) {
  const p = evalPill[c.status];
  const cta =
    c.status === "ready" ? "Review" : c.status === "progress" ? "View draft" : "Nudge";
  return (
    <div className="rounded-3xl bg-card p-5 shadow-card">
      <div className="flex items-center gap-3">
        <img
          src={c.avatar}
          alt={c.lead}
          className="h-12 w-12 rounded-full bg-secondary object-cover"
        />
        <div>
          <h3 className="font-display text-lg font-bold leading-tight">{c.name}</h3>
          <p className="text-xs text-muted-foreground">
            Lead: {c.lead} • {c.band}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span
          className={"flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold " + p.cls}
        >
          <Icon name={p.icon} filled size={14} />
          {evalStatusLabel[c.status]}
          {c.status === "progress" && ` (${c.progress}%)`}
        </span>
        <button
          className={
            "flex items-center gap-1 text-sm font-bold " +
            (c.status === "notStarted" ? "text-[var(--status-late)]" : "text-primary")
          }
        >
          {c.status === "notStarted" && <Icon name="notifications" filled size={16} />}
          {cta}
        </button>
      </div>
    </div>
  );
}
