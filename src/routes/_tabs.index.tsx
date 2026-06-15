import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ChevronRight,
  Pill,
  Clock3,
  QrCode,
  CalendarDays,
} from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import {
  attendanceToday,
  children,
  myClassroom,
  reportsToday,
  todaySchedule,
  medicationsDueToday,
  todayAlerts,
  getChild,
  type AttendanceStatus,
} from "@/lib/mock";

// T-05 — Today (Dashboard)
export const Route = createFileRoute("/_tabs/")({
  head: () => ({
    meta: [
      { title: "Today — Digital Sanctuary" },
      { name: "description", content: "Cockpit du jour : présences, alertes, planning et progression." },
      { property: "og:title", content: "Today — Digital Sanctuary" },
      { property: "og:description", content: "Cockpit quotidien de l'éducatrice Montessori." },
    ],
  }),
  component: TodayPage,
});

function minutesNow() {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}
function toMin(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function TodayPage() {
  const total = children.length;
  const present = Object.values(attendanceToday).filter((s) => s === "present").length;
  const absent = Object.values(attendanceToday).filter((s) => s === "absent").length;
  const late = Object.values(attendanceToday).filter((s) => s === "late").length;

  const submitted = reportsToday.filter((r) => r.status === "submitted").length;
  const photoCount = 8;

  const now = minutesNow();
  const currentIdx = todaySchedule.findIndex(
    (s) => toMin(s.start) <= now && now < toMin(s.end),
  );
  const upcoming = todaySchedule
    .map((s, i) => ({ s, i }))
    .filter(({ s, i }) => i === currentIdx || toMin(s.start) > now)
    .slice(0, 3);

  const dateLabel = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <>
      <AppHeader />
      <Page>
        {/* Header card */}
        <section className="rounded-3xl bg-card p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {dateLabel}
          </p>
          <h1 className="mt-1 font-display text-3xl font-extrabold leading-tight tracking-tight">
            {myClassroom.name}
          </h1>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <Stat value={`${present}/${total}`} label="Présents" tone="primary" />
            <Stat value={String(late)} label="Retards" tone="warning" />
            <Stat value={String(absent)} label="Absents" tone="danger" />
          </div>
        </section>

        {/* Quick actions */}
        <section className="mt-4 grid grid-cols-3 gap-3">
          <QuickTile to="/attendance" Icon={ChevronRight} label="Roll Call" />
          <QuickTile to="/attendance/scan" Icon={QrCode} label="QR Scan" />
          <QuickTile to="/schedule" Icon={CalendarDays} label="Schedule" />
        </section>

        {/* Attendance strip */}
        <section className="mt-6">
          <SectionHeader title="Attendance" to="/attendance" cta="Roll Call" />
          <ul className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {children.map((c) => {
              const st = attendanceToday[c.id];
              return (
                <li key={c.id} className="flex min-w-[68px] flex-col items-center gap-1.5">
                  <Link
                    to="/children/$id"
                    params={{ id: c.id }}
                    className="block"
                    aria-label={`${c.firstName} — ${st}`}
                  >
                    <AttendanceAvatar src={c.avatar} name={c.firstName} status={st} />
                  </Link>
                  <span className="text-[11px] font-semibold text-foreground/80">{c.firstName}</span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Alerts */}
        {todayAlerts.length > 0 && (
          <section className="mt-6">
            <SectionHeader title="Alerts" to="/alerts" cta="Tout voir" />
            <div className="mt-3 space-y-2.5">
              {todayAlerts.slice(0, 3).map((a) => (
                <AlertRow key={a.id} alert={a} />
              ))}
            </div>
          </section>
        )}

        {/* Medications */}
        {medicationsDueToday.length > 0 && (
          <section className="mt-6 rounded-3xl bg-card p-5 shadow-card">
            <div className="flex items-center gap-2">
              <Pill size={18} className="text-primary" strokeWidth={2} />
              <h2 className="font-display text-base font-bold">Médicaments du jour</h2>
            </div>
            <ul className="mt-3 space-y-2">
              {medicationsDueToday.map((m) => {
                const c = getChild(m.childId);
                return (
                  <li
                    key={m.id}
                    className="flex items-center gap-3 rounded-2xl bg-secondary px-3 py-2.5"
                  >
                    <img src={c?.avatar} alt="" className="h-9 w-9 rounded-full bg-card" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">
                        {c?.firstName} — {m.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {m.dose} · {m.time}
                      </p>
                    </div>
                    <span className="rounded-full bg-warning-tint px-3 py-1 text-[11px] font-bold text-warning-ink">
                      À donner
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* Schedule */}
        <section className="mt-6">
          <SectionHeader title="Today's Schedule" to="/schedule" cta="Tout voir" />
          <ol className="relative mt-4 space-y-4 border-l-2 border-secondary pl-6">
            {upcoming.map(({ s, i }) => {
              const isNow = i === currentIdx;
              const isPast = toMin(s.end) <= now;
              return (
                <ScheduleItem
                  key={s.id}
                  time={`${s.start}${isNow ? " • NOW" : ""}`}
                  title={s.title}
                  body={s.body}
                  current={isNow}
                  past={isPast}
                />
              );
            })}
          </ol>
        </section>

        {/* Progress */}
        <section className="mt-6 rounded-3xl bg-card p-5 shadow-card">
          <h2 className="font-display text-base font-bold">Daily Progress</h2>
          <div className="mt-4 space-y-4">
            <ProgressRow label="Rapports envoyés" value={submitted} total={total} />
            <ProgressRow label="Photos partagées" value={photoCount} total={total} />
          </div>
        </section>
      </Page>
    </>
  );
}

// ─── sub-components ───────────────────────────────────────

function Stat({
  value,
  label,
  tone,
}: {
  value: string;
  label: string;
  tone: "primary" | "warning" | "danger";
}) {
  const cls =
    tone === "primary"
      ? "text-primary"
      : tone === "warning"
        ? "text-[color:var(--status-late)]"
        : "text-destructive";
  return (
    <div className="flex flex-col items-center rounded-2xl bg-secondary py-3">
      <span className={`font-display text-2xl font-extrabold ${cls}`}>{value}</span>
      <span className="mt-0.5 text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}

function QuickTile({
  to,
  Icon,
  label,
}: {
  to: "/attendance" | "/attendance/scan" | "/schedule";
  Icon: typeof ChevronRight;
  label: string;
}) {
  return (
    <motion.div whileTap={{ scale: 0.96 }}>
      <Link
        to={to}
        className="flex flex-col items-center gap-2 rounded-2xl bg-card p-3.5 text-primary shadow-card"
      >
        <Icon size={22} strokeWidth={1.75} />
        <span className="text-xs font-bold text-foreground">{label}</span>
      </Link>
    </motion.div>
  );
}

function SectionHeader({
  title,
  to,
  cta,
}: {
  title: string;
  to: "/attendance" | "/alerts" | "/schedule";
  cta: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-display text-xl font-bold">{title}</h2>
      <Link
        to={to}
        className="rounded-full bg-card px-3 py-1.5 text-[11px] font-bold text-primary shadow-card"
      >
        {cta}
      </Link>
    </div>
  );
}

const STATUS_RING: Record<AttendanceStatus, string> = {
  present: "ring-[color:var(--status-present)]",
  absent: "ring-[color:var(--status-absent)] opacity-50",
  late: "ring-[color:var(--status-late)]",
  left: "ring-[color:var(--status-left)]",
};

function AttendanceAvatar({
  src,
  name,
  status,
}: {
  src: string;
  name: string;
  status: AttendanceStatus;
}) {
  return (
    <div
      className={`h-12 w-12 overflow-hidden rounded-full bg-card ring-[3px] ring-offset-2 ring-offset-background ${STATUS_RING[status]}`}
    >
      <img src={src} alt={name} className="h-full w-full object-cover" />
    </div>
  );
}

function AlertRow({ alert }: { alert: { kind: string; title: string; body: string; at?: string } }) {
  const isMed = alert.kind === "medication";
  const isPickup = alert.kind === "pickup";
  const tone = isMed
    ? "bg-warning-tint text-warning-ink"
    : isPickup
      ? "bg-secondary text-primary"
      : "bg-secondary text-foreground";
  const Ico = isMed ? Pill : isPickup ? Clock3 : AlertTriangle;
  return (
    <div className={`flex items-start gap-3 rounded-2xl p-3.5 ${tone}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card">
        <Ico size={18} strokeWidth={1.75} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold">{alert.title}</p>
        <p className="mt-0.5 text-xs opacity-80">{alert.body}</p>
      </div>
      {alert.at && (
        <span className="self-center text-[11px] font-bold opacity-70">{alert.at}</span>
      )}
    </div>
  );
}

function ScheduleItem({
  time,
  title,
  body,
  past,
  current,
}: {
  time: string;
  title: string;
  body: string;
  past?: boolean;
  current?: boolean;
}) {
  return (
    <li className="relative">
      <span
        className={
          "absolute -left-[31px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-4 border-background " +
          (current
            ? "bg-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_20%,transparent)]"
            : "bg-secondary")
        }
      >
        {current && <span className="h-1.5 w-1.5 rounded-full bg-card" />}
      </span>
      <div
        className={
          "rounded-2xl p-4 " +
          (current
            ? "bg-secondary"
            : "bg-card shadow-card " + (past ? "opacity-60" : ""))
        }
      >
        <p className={"text-xs font-semibold " + (current ? "text-primary" : "text-muted-foreground")}>
          {time}
        </p>
        <h3 className="mt-1 font-display text-lg font-bold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}

function ProgressRow({ label, value, total }: { label: string; value: number; total: number }) {
  const pct = Math.round((value / total) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-bold text-primary">
          {value} / {total}
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}