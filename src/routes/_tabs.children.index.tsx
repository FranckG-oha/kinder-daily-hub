import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { Icon } from "@/components/icon";
import { attendanceToday, children, myClassroom, type AttendanceStatus } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/children/")({
  head: () => ({
    meta: [
      { title: "Morning Check-in — Digital Sanctuary" },
      { name: "description", content: "Faire l'appel du matin : présent, en retard, absent." },
      { property: "og:title", content: "Morning Check-in — Digital Sanctuary" },
      { property: "og:description", content: "Appel du matin de la classe." },
    ],
  }),
  component: ChildrenPage,
});

function ChildrenPage() {
  const [state, setState] = useState<Record<string, AttendanceStatus>>(attendanceToday);

  function setAll() {
    const next: Record<string, AttendanceStatus> = {};
    children.forEach((c) => (next[c.id] = "present"));
    setState(next);
  }

  return (
    <>
      <AppHeader />
      <Page>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-base font-semibold text-muted-foreground">
              {myClassroom.name}
            </h2>
            <h1 className="mt-1 font-display text-4xl font-extrabold leading-tight tracking-tight">
              Morning<br />Check-in
            </h1>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={setAll}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-card"
        >
          <Icon name="check_circle" filled size={20} />
          Mark All Present
        </motion.button>

        <ul className="mt-6 space-y-4">
          {children.map((c) => (
            <li key={c.id} className="rounded-3xl bg-secondary p-4">
              <Link
                to="/children/$id"
                params={{ id: c.id }}
                className="flex items-center gap-3"
              >
                <img
                  src={c.avatar}
                  alt=""
                  className={
                    "h-14 w-14 rounded-full bg-card object-cover " +
                    (state[c.id] === "absent" ? "opacity-60 grayscale" : "")
                  }
                />
                <div className="flex-1 min-w-0">
                  <p className="font-display text-xl font-bold">{c.firstName}</p>
                  {c.allergies.length > 0 ? (
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-container-peach px-2 py-0.5 text-[11px] font-semibold text-on-container-peach">
                      <Icon name="info" filled size={12} /> allergie : {c.allergies.join(", ")}
                    </span>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      {state[c.id] === "late"
                        ? "Attendu après 9:00"
                        : state[c.id] === "absent"
                          ? "Absent aujourd'hui"
                          : "Arrivé 8:45"}
                    </p>
                  )}
                </div>
              </Link>
              <div className="mt-3 flex items-center gap-1 rounded-full bg-card p-1 shadow-card">
                <Toggle
                  active={state[c.id] === "present"}
                  tone="present"
                  onClick={() => setState({ ...state, [c.id]: "present" })}
                  icon="check"
                  label="Present"
                />
                <Toggle
                  active={state[c.id] === "late"}
                  tone="late"
                  onClick={() => setState({ ...state, [c.id]: "late" })}
                  icon="schedule"
                  label="Late"
                />
                <Toggle
                  active={state[c.id] === "absent"}
                  tone="absent"
                  onClick={() => setState({ ...state, [c.id]: "absent" })}
                  icon="close"
                  label="Absent"
                />
              </div>
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}

function Toggle({
  active,
  tone,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  tone: "present" | "late" | "absent";
  onClick: () => void;
  icon: string;
  label: string;
}) {
  const toneClass = active
    ? tone === "present"
      ? "bg-accent text-accent-foreground"
      : tone === "absent"
        ? "bg-destructive/15 text-destructive"
        : "bg-secondary text-foreground"
    : "text-muted-foreground";
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={
        "flex h-11 flex-1 items-center justify-center rounded-full transition-transform active:scale-95 " +
        toneClass
      }
    >
      <Icon name={icon} filled={active} size={20} />
    </button>
  );
}