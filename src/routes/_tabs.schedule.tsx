import { createFileRoute } from "@tanstack/react-router";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { todaySchedule } from "@/lib/mock";

// T-09 — Full Schedule
export const Route = createFileRoute("/_tabs/schedule")({
  head: () => ({
    meta: [
      { title: "Today's Schedule — Digital Sanctuary" },
      { name: "description", content: "Planning complet de la journée." },
    ],
  }),
  component: SchedulePage,
});

function minNow() {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}
const toMin = (h: string) => {
  const [a, b] = h.split(":").map(Number);
  return a * 60 + b;
};

function SchedulePage() {
  const now = minNow();
  return (
    <>
      <SubPageHeader title="Today's Schedule" />
      <Page>
        <ol className="relative space-y-4 border-l-2 border-secondary pl-6">
          {todaySchedule.map((s) => {
            const isNow = toMin(s.start) <= now && now < toMin(s.end);
            const isPast = toMin(s.end) <= now;
            return (
              <li key={s.id} className="relative">
                <span
                  className={
                    "absolute -left-[31px] top-2 flex h-5 w-5 items-center justify-center rounded-full border-4 border-background " +
                    (isNow
                      ? "bg-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_20%,transparent)]"
                      : "bg-secondary")
                  }
                />
                <div
                  className={
                    "rounded-2xl p-4 " +
                    (isNow
                      ? "bg-secondary"
                      : "bg-card shadow-card " + (isPast ? "opacity-60" : ""))
                  }
                >
                  <p className={"text-xs font-semibold " + (isNow ? "text-primary" : "text-muted-foreground")}>
                    {s.start} – {s.end} {isNow && "• NOW"}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Page>
    </>
  );
}