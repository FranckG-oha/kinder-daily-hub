import { createFileRoute } from "@tanstack/react-router";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import {
  attendanceToday,
  children,
  type AttendanceStatus,
  attendanceLabel,
} from "@/lib/mock";

// T-07 — Attendance Summary
export const Route = createFileRoute("/_tabs/attendance/summary")({
  head: () => ({
    meta: [
      { title: "Attendance Summary — Digital Sanctuary" },
      { name: "description", content: "Synthèse des présences du jour." },
    ],
  }),
  component: Summary,
});

const GROUPS: { key: AttendanceStatus; cls: string }[] = [
  { key: "present", cls: "text-[color:var(--status-present)] bg-success-tint" },
  { key: "late", cls: "text-[color:var(--status-late)] bg-warning-tint" },
  { key: "absent", cls: "text-destructive bg-danger-tint" },
  { key: "left", cls: "text-muted-foreground bg-secondary" },
];

function Summary() {
  const byStatus = (s: AttendanceStatus) =>
    children.filter((c) => attendanceToday[c.id] === s);

  return (
    <>
      <SubPageHeader title="Attendance summary" />
      <Page>
        <div className="grid grid-cols-4 gap-2">
          {GROUPS.map((g) => (
            <div key={g.key} className={`rounded-2xl ${g.cls} p-3 text-center`}>
              <p className="font-display text-2xl font-extrabold">{byStatus(g.key).length}</p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide">
                {attendanceLabel[g.key]}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-5">
          {GROUPS.map((g) => {
            const list = byStatus(g.key);
            if (!list.length) return null;
            return (
              <section key={g.key}>
                <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  {attendanceLabel[g.key]} · {list.length}
                </h2>
                <ul className="mt-2 divide-y divide-border rounded-3xl bg-card shadow-card">
                  {list.map((c) => (
                    <li key={c.id} className="flex items-center gap-3 px-4 py-3">
                      <img src={c.avatar} alt="" className="h-9 w-9 rounded-full bg-secondary" />
                      <span className="flex-1 text-sm font-semibold">
                        {c.firstName} {c.lastName}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Page>
    </>
  );
}