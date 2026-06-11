import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { Icon } from "@/components/icon";
import { attendanceToday, children, myClassroom, reportsToday } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Digital Sanctuary" },
      { name: "description", content: "Cockpit du jour : présences, alertes et progression de la classe." },
      { property: "og:title", content: "Dashboard — Digital Sanctuary" },
      { property: "og:description", content: "Cockpit quotidien de l'éducatrice Montessori." },
    ],
  }),
  component: TodayPage,
});

function TodayPage() {
  const present = Object.values(attendanceToday).filter((s) => s === "present").length;
  const absent = Object.values(attendanceToday).filter((s) => s === "absent").length;
  const total = children.length;
  const submitted = reportsToday.filter((r) => r.status === "submitted").length;
  const photoCount = 8;

  const todayLabel = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const present3 = children.filter((c) => attendanceToday[c.id] === "present").slice(0, 4);

  return (
    <>
      <AppHeader />
      <Page>
        <section className="rounded-3xl bg-card p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Today • {todayLabel}
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground">
            {myClassroom.name}
          </h1>
          <div className="mt-5 flex gap-3">
            <div className="flex flex-1 flex-col items-center rounded-2xl bg-secondary py-4">
              <span className="font-display text-3xl font-bold text-primary">
                {present}/{total}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">Present</span>
            </div>
            <div className="flex flex-1 flex-col items-center rounded-2xl bg-secondary py-4">
              <span className="font-display text-3xl font-bold text-[oklch(0.55_0.18_45)]">
                {absent}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">Absent</span>
            </div>
          </div>
        </section>

        <section className="mt-4 space-y-3">
          <div className="flex items-start gap-4 rounded-2xl bg-container-peach/70 p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card text-on-container-peach">
              <Icon name="medical_services" filled size={22} />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-on-container-peach">
                Medication Due
              </h3>
              <p className="mt-0.5 text-sm text-on-container-peach/80">
                Inhalateur de Léo à 11:30.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-2xl bg-secondary p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card text-primary">
              <Icon name="schedule" filled size={22} />
            </div>
            <div>
              <h3 className="font-display text-base font-bold">Late Collection</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Les parents de Mia auront 15 min de retard.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-secondary p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Attendance</h2>
            <Link
              to="/children"
              className="rounded-full bg-card px-4 py-1.5 text-xs font-semibold text-primary shadow-card"
            >
              Mark All Present
            </Link>
          </div>
          <ul className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {present3.map((c) => (
              <li key={c.id} className="flex min-w-[64px] flex-col items-center gap-1.5">
                <div className="relative">
                  <img
                    src={c.avatar}
                    alt={c.firstName}
                    className="h-14 w-14 rounded-full border-4 border-card bg-card object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Icon name="check" filled size={12} />
                  </span>
                </div>
                <span className="text-xs font-medium">{c.firstName}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="mb-3 font-display text-xl font-bold">Today's Schedule</h2>
          <ol className="relative space-y-5 border-l-2 border-secondary pl-6">
            <ScheduleItem time="09:00 AM" title="Morning Circle" body="Songs and weather check." past />
            <ScheduleItem
              time="10:30 AM • NOW"
              title="Story Time"
              body="Reading 'The Very Hungry Caterpillar'."
              current
            />
            <ScheduleItem time="12:00 PM" title="Lunch & Nap" body="Quiet time in the sunflower room." />
          </ol>
        </section>

        <section className="mt-6 rounded-3xl bg-card p-5 shadow-card">
          <h2 className="font-display text-xl font-bold">Daily Progress</h2>
          <div className="mt-4 space-y-4">
            <ProgressRow label="Daily Reports Sent" value={submitted} total={total} />
            <ProgressRow label="Photos Shared" value={photoCount} total={total} />
          </div>
        </section>

        <section className="mt-4 grid grid-cols-2 gap-3">
          <QuickAction icon="add_a_photo" label="Add Photo" />
          <QuickAction icon="restaurant" label="Log Meal" />
          <QuickAction icon="bedtime" label="Log Sleep" />
          <QuickAction icon="edit_note" label="Write Note" />
        </section>
      </Page>
    </>
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
          (current ? "bg-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_20%,transparent)]" : "bg-secondary")
        }
      >
        {current && <span className="h-1.5 w-1.5 rounded-full bg-card" />}
      </span>
      <div
        className={
          "rounded-2xl p-4 " +
          (current ? "bg-secondary" : "bg-card shadow-card " + (past ? "opacity-70" : ""))
        }
      >
        <p
          className={
            "text-xs font-semibold " +
            (current ? "text-primary" : "text-muted-foreground")
          }
        >
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

function QuickAction({ icon, label }: { icon: string; label: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      type="button"
      className="flex flex-col items-center gap-2 rounded-2xl bg-card p-5 text-primary shadow-card"
    >
      <Icon name={icon} filled size={28} />
      <span className="font-display text-sm font-bold text-foreground">{label}</span>
    </motion.button>
  );
}