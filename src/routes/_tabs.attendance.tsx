import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, Clock, LogOut } from "lucide-react";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import {
  attendanceToday as initial,
  children,
  type AttendanceStatus,
  attendanceLabel,
} from "@/lib/mock";

// T-06 — Roll Call
export const Route = createFileRoute("/_tabs/attendance")({
  head: () => ({
    meta: [
      { title: "Roll Call — Digital Sanctuary" },
      { name: "description", content: "Pointage des présences de la classe." },
    ],
  }),
  component: RollCall,
});

const ACTIONS: { value: AttendanceStatus; Icon: typeof Check; tone: string }[] = [
  { value: "present", Icon: Check, tone: "text-[color:var(--status-present)] bg-success-tint" },
  { value: "late", Icon: Clock, tone: "text-[color:var(--status-late)] bg-warning-tint" },
  { value: "absent", Icon: X, tone: "text-destructive bg-danger-tint" },
  { value: "left", Icon: LogOut, tone: "text-muted-foreground bg-secondary" },
];

function RollCall() {
  const [state, setState] = useState<Record<string, AttendanceStatus>>({ ...initial });
  const present = Object.values(state).filter((s) => s === "present").length;

  return (
    <>
      <SubPageHeader title="Roll Call" />
      <Page>
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-muted-foreground">
            {present}/{children.length} présents
          </p>
          <Link
            to="/attendance/summary"
            className="rounded-full bg-card px-4 py-1.5 text-xs font-bold text-primary shadow-card"
          >
            Voir le résumé
          </Link>
        </div>

        <ul className="mt-4 space-y-2">
          {children.map((c) => {
            const cur = state[c.id];
            return (
              <li key={c.id} className="rounded-3xl bg-card p-3 shadow-card">
                <div className="flex items-center gap-3">
                  <img src={c.avatar} alt="" className="h-12 w-12 rounded-full bg-secondary" />
                  <div className="flex-1">
                    <p className="font-display text-sm font-bold">
                      {c.firstName} {c.lastName}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {attendanceLabel[cur]}
                    </p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {ACTIONS.map(({ value, Icon, tone }) => {
                    const active = cur === value;
                    return (
                      <button
                        key={value}
                        onClick={() => setState((s) => ({ ...s, [c.id]: value }))}
                        aria-label={attendanceLabel[value]}
                        className={`flex h-11 items-center justify-center rounded-xl text-sm font-bold transition ${
                          active ? tone + " ring-2 ring-current" : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        <Icon size={18} strokeWidth={2} />
                      </button>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => {
            const next: Record<string, AttendanceStatus> = {};
            children.forEach((c) => (next[c.id] = "present"));
            setState(next);
          }}
          className="mt-5 w-full rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-card active:scale-[0.99]"
        >
          Tout marquer présent
        </button>
      </Page>
    </>
  );
}