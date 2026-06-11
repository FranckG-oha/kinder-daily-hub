import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/page";
import { Icon } from "@/components/icon";
import { RoomBadge } from "@/components/room-badge";
import {
  getCoordClassroom,
  sunflowerRoster,
  type AttendanceStatus,
  type RosterChild,
} from "@/lib/mock";

const enLabel: Record<AttendanceStatus, string> = {
  present: "Present",
  absent: "Absent",
  late: "Late",
  left: "Left",
};

export const Route = createFileRoute("/_tabs/classes/$id")({
  head: () => ({
    meta: [{ title: "Classroom — Digital Sanctuary" }],
  }),
  component: ClassroomDetailPage,
});

const tabs = ["Attendance", "Reports", "Health", "Media"] as const;
type Tab = (typeof tabs)[number];

const statusStyle: Record<AttendanceStatus, { pill: string; ring: string; badge: string; icon: string }> = {
  present: {
    pill: "bg-[color-mix(in_oklab,var(--status-present)_16%,var(--card))] text-[var(--status-present)]",
    ring: "var(--status-present)",
    badge: "var(--status-present)",
    icon: "check",
  },
  absent: {
    pill: "bg-[color-mix(in_oklab,var(--destructive)_14%,var(--card))] text-destructive",
    ring: "var(--destructive)",
    badge: "var(--destructive)",
    icon: "close",
  },
  late: {
    pill: "bg-[color-mix(in_oklab,var(--status-late)_18%,var(--card))] text-[var(--status-late)]",
    ring: "var(--status-late)",
    badge: "var(--status-late)",
    icon: "schedule",
  },
  left: {
    pill: "bg-secondary text-muted-foreground",
    ring: "var(--status-left)",
    badge: "var(--status-left)",
    icon: "logout",
  },
};

function ClassroomDetailPage() {
  const { id } = useParams({ from: "/_tabs/classes/$id" });
  const room = getCoordClassroom(id);
  const [tab, setTab] = useState<Tab>("Attendance");

  if (!room) {
    return (
      <Page>
        <p className="text-center text-muted-foreground">Classroom not found.</p>
        <Link to="/classes" className="mt-4 block text-center font-semibold text-primary">
          Back to classes
        </Link>
      </Page>
    );
  }

  const absent = room.enrolled - room.present;

  return (
    <>
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-[440px] items-center gap-2 px-5 py-4 text-sm">
          <Link
            to="/classes"
            className="inline-flex items-center gap-1 font-semibold text-muted-foreground"
          >
            <Icon name="arrow_back" size={18} />
            All classes
          </Link>
          <Icon name="chevron_right" size={16} className="text-muted-foreground" />
          <span className="truncate font-semibold text-foreground">{room.name}</span>
        </div>
      </header>

      <Page>
        <section className="rounded-3xl bg-card p-5 shadow-card">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--status-late)]">
            <RoomBadge flower={room.flower} size={24} />
            {room.ageBand.split("•")[0].trim()} Room
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
            {room.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {room.lead.name} • {room.ageBand.split("•")[1]?.trim() ?? room.ageBand}
          </p>
          <Link
            to="/comms"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform active:scale-95"
          >
            <Icon name="chat_bubble" filled size={18} />
            Message teacher
          </Link>
        </section>

        <section className="relative mt-4 overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full"
            style={{ background: "color-mix(in oklab, white 12%, transparent)" }}
          />
          <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
            Today&apos;s attendance
          </p>
          <p className="mt-2 font-display text-5xl font-extrabold">
            {room.present}
            <span className="text-2xl opacity-70"> / {room.enrolled}</span>
          </p>
          <p className="mt-2 text-sm opacity-80">
            {absent} absent, 1 late
          </p>
        </section>

        <nav className="mt-6 flex gap-6 border-b border-border">
          {tabs.map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={
                  "relative pb-3 text-sm font-semibold transition-colors " +
                  (active ? "text-primary" : "text-muted-foreground")
                }
              >
                {t}
                {active && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </nav>

        {tab === "Attendance" ? (
          <AttendanceTab roster={sunflowerRoster} />
        ) : (
          <div className="mt-8 rounded-3xl bg-card p-10 text-center shadow-card">
            <Icon name="hourglass_empty" size={32} className="text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              {tab} view coming soon for this room.
            </p>
          </div>
        )}
      </Page>
    </>
  );
}

function AttendanceTab({ roster }: { roster: RosterChild[] }) {
  return (
    <>
      <section className="mt-6 rounded-3xl bg-secondary p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Quick status</h2>
          <button className="text-sm font-semibold text-primary">Mark all present</button>
        </div>
        <ul className="mt-4 flex gap-4 overflow-x-auto pb-1">
          {roster.map((c) => {
            const s = statusStyle[c.status];
            return (
              <li key={c.id} className="flex min-w-[60px] flex-col items-center gap-1.5">
                <div className="relative">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="h-14 w-14 rounded-full bg-card object-cover"
                    style={{ boxShadow: `0 0 0 3px ${s.ring}` }}
                  />
                  <span
                    className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full text-white"
                    style={{ background: s.badge }}
                  >
                    <Icon name={s.icon} filled size={12} />
                  </span>
                </div>
                <span className="text-xs font-medium">{c.name.split(" ")[0]}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-lg font-bold">Detailed log</h2>
        <ul className="mt-3 space-y-3">
          {roster.map((c) => {
            const s = statusStyle[c.status];
            return (
              <li
                key={c.id}
                className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card"
              >
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="h-11 w-11 rounded-full bg-secondary object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-bold">{c.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                    {c.status === "absent" && (
                      <Icon name="error" filled size={13} className="text-destructive" />
                    )}
                    {c.detail}
                  </p>
                </div>
                <span
                  className={
                    "shrink-0 rounded-full px-3 py-1 text-xs font-bold " + s.pill
                  }
                >
                  {enLabel[c.status]}
                </span>
                <button aria-label="More" className="text-muted-foreground">
                  <Icon name="more_vert" size={18} />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
