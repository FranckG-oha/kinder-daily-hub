import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, AlertTriangle } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import {
  attendanceToday,
  children,
  myClassroom,
  ageFromBirthdate,
  type AttendanceStatus,
} from "@/lib/mock";

// T-11 — My Class (Class List)
export const Route = createFileRoute("/_tabs/children/")({
  head: () => ({
    meta: [
      { title: "My Class — Digital Sanctuary" },
      { name: "description", content: "Liste de la classe avec statut, allergies et accès rapide aux fiches enfants." },
    ],
  }),
  component: ClassListPage,
});

type Filter = "all" | "present" | "late" | "absent" | "allergies";

const statusDot: Record<AttendanceStatus, string> = {
  present: "bg-success",
  late: "bg-warning",
  absent: "bg-destructive",
  left: "bg-muted-foreground",
};

const statusLabel: Record<AttendanceStatus, string> = {
  present: "Présent",
  late: "En retard",
  absent: "Absent",
  left: "Parti",
};

function ClassListPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    return children.filter((c) => {
      const s = (attendanceToday[c.id] ?? "present") as AttendanceStatus;
      if (filter === "allergies" && c.allergies.length === 0) return false;
      if (filter !== "all" && filter !== "allergies" && s !== filter) return false;
      if (q) {
        const hay = `${c.firstName} ${c.lastName}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [q, filter]);

  const counts = useMemo(() => {
    const c = { present: 0, late: 0, absent: 0 };
    children.forEach((ch) => {
      const s = attendanceToday[ch.id] ?? "present";
      if (s === "present") c.present++;
      else if (s === "late") c.late++;
      else if (s === "absent") c.absent++;
    });
    return c;
  }, []);

  return (
    <>
      <AppHeader />
      <Page>
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {myClassroom.name}
          </p>
          <h1 className="mt-1 font-display text-[28px] font-extrabold leading-tight tracking-tight">
            My Class
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {children.length} enfants · {counts.present} présents · {counts.late} en retard ·{" "}
            {counts.absent} absents
          </p>
        </header>

        <div className="relative mt-5">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.75}
          />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un enfant…"
            className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </div>

        <div className="mt-4 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
          {(
            [
              ["all", `Tous · ${children.length}`],
              ["present", `Présents · ${counts.present}`],
              ["late", `Retards · ${counts.late}`],
              ["absent", `Absents · ${counts.absent}`],
              ["allergies", "Allergies"],
            ] as [Filter, string][]
          ).map(([key, label]) => {
            const on = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                aria-pressed={on}
                className={
                  "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors " +
                  (on
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground/70 border border-border")
                }
              >
                {label}
              </button>
            );
          })}
        </div>

        <ul className="mt-4 space-y-2">
          {filtered.map((c) => {
            const s = (attendanceToday[c.id] ?? "present") as AttendanceStatus;
            return (
              <li key={c.id}>
                <Link
                  to="/children/$id"
                  params={{ id: c.id }}
                  className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-card transition-transform active:scale-[0.99]"
                >
                  <div className="relative">
                    <img
                      src={c.avatar}
                      alt=""
                      className={
                        "h-12 w-12 rounded-full bg-secondary object-cover " +
                        (s === "absent" ? "opacity-60 grayscale" : "")
                      }
                    />
                    <span
                      aria-hidden
                      className={
                        "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full ring-2 ring-card " +
                        statusDot[s]
                      }
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-[15px] font-bold leading-tight">
                      {c.firstName} {c.lastName}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {ageFromBirthdate(c.birthdate)} · {statusLabel[s]}
                    </p>
                  </div>
                  {c.allergies.length > 0 && (
                    <span
                      title={`Allergie: ${c.allergies.join(", ")}`}
                      className="inline-flex h-7 items-center gap-1 rounded-full bg-warning-tint px-2 text-[10px] font-semibold text-warning-ink"
                    >
                      <AlertTriangle size={12} strokeWidth={2} />
                      {c.allergies[0]}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Aucun enfant ne correspond.
          </p>
        )}
      </Page>
    </>
  );
}