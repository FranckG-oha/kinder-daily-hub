import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { Icon } from "@/components/icon";
import { getChild, getReportForChild } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/children/$id/report")({
  loader: ({ params }) => {
    const child = getChild(params.id);
    if (!child) throw notFound();
    return { child, report: getReportForChild(child.id) };
  },
  head: () => ({
    meta: [
      { title: "Daily Report — Digital Sanctuary" },
      { name: "description", content: "Saisir le rapport quotidien : repas, repos, hygiène, activités." },
    ],
  }),
  component: ReportPage,
});

const meals = ["Breakfast", "Lunch", "Snack"] as const;
const portions = ["Full", "Half", "Little"] as const;
const diapers = ["Wet", "BM", "Dry"] as const;
const allActivities = ["Free Play", "Finger Painting", "Story Circle", "Outdoor Play"];

function ReportPage() {
  const navigate = useNavigate();
  const { child } = Route.useLoaderData();
  const [mealPortion, setMealPortion] = useState<Record<string, string>>({
    Breakfast: "Full",
    Lunch: "Full",
    Snack: "Half",
  });
  const [napStart, setNapStart] = useState("13:00");
  const [napEnd, setNapEnd] = useState("15:30");
  const [napQuality, setNapQuality] = useState<"Restless" | "Solid">("Solid");
  const [diapersSel, setDiapersSel] = useState<string[]>(["Dry"]);
  const [temp, setTemp] = useState("36.8");
  const [activities, setActivities] = useState<string[]>(["Finger Painting"]);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  function toggle<T extends string>(arr: T[], v: T): T[] {
    return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => navigate({ to: "/reports" }), 700);
  }

  return (
    <>
      <SubPageHeader title="Sanctuary Care" />
      <Page>
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={child.avatar}
              alt=""
              className="h-20 w-20 rounded-3xl bg-card object-cover"
            />
            <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground ring-4 ring-background">
              <Icon name="check" filled size={14} />
            </span>
          </div>
          <h1 className="mt-3 font-display text-2xl font-extrabold">
            {child.firstName}'s Day
          </h1>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <Icon name="calendar_today" size={16} className="text-primary" />
            {today}
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          <Section icon="restaurant" iconBg="bg-container-peach/60 text-on-container-peach" title="Meals & Snacks">
            <div className="space-y-3">
              {meals.map((m) => (
                <div key={m}>
                  <p className="text-sm font-semibold">{m}</p>
                  <div className="mt-2 flex gap-1 rounded-full bg-secondary p-1">
                    {portions.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setMealPortion({ ...mealPortion, [m]: p })}
                        className={
                          "flex-1 rounded-full py-1.5 text-xs font-semibold transition-colors " +
                          (mealPortion[m] === p
                            ? "bg-card text-foreground shadow-card"
                            : "text-muted-foreground")
                        }
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section icon="bedtime" iconBg="bg-secondary text-primary" title="Rest">
            <div className="flex items-end gap-3">
              <Field label="Start Time">
                <input
                  type="time"
                  value={napStart}
                  onChange={(e) => setNapStart(e.target.value)}
                  className="w-full rounded-full bg-secondary px-4 py-2 text-sm"
                />
              </Field>
              <Icon name="arrow_forward" size={18} className="mb-2 text-muted-foreground" />
              <Field label="End Time">
                <input
                  type="time"
                  value={napEnd}
                  onChange={(e) => setNapEnd(e.target.value)}
                  className="w-full rounded-full bg-secondary px-4 py-2 text-sm"
                />
              </Field>
            </div>
            <p className="mt-4 text-xs font-semibold text-muted-foreground">Sleep Quality</p>
            <div className="mt-2 flex gap-2">
              {(["Restless", "Solid"] as const).map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setNapQuality(q)}
                  className={
                    "flex-1 rounded-full px-4 py-2 text-sm font-semibold " +
                    (napQuality === q
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-muted-foreground")
                  }
                >
                  {q}
                </button>
              ))}
            </div>
          </Section>

          <Section icon="local_hospital" iconBg="bg-secondary text-primary" title="Health & Hygiene">
            <p className="text-xs font-semibold text-muted-foreground">Diaper Changes</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {diapers.map((d) => (
                <Chip
                  key={d}
                  active={diapersSel.includes(d)}
                  onClick={() => setDiapersSel(toggle(diapersSel, d))}
                >
                  {d}
                </Chip>
              ))}
              <button
                type="button"
                aria-label="Add"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground"
              >
                <Icon name="add" size={16} />
              </button>
            </div>
            <p className="mt-4 text-xs font-semibold text-muted-foreground">Temperature check</p>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                className="w-24 rounded-full bg-secondary px-4 py-2 text-sm"
              />
              <span className="text-sm text-muted-foreground">°C</span>
              <span className="text-xs text-muted-foreground">Optional logging</span>
            </div>
          </Section>

          <Section icon="palette" iconBg="bg-accent/60 text-accent-foreground" title="Activities">
            <div className="flex flex-wrap gap-2">
              {allActivities.map((a) => (
                <Chip
                  key={a}
                  active={activities.includes(a)}
                  onClick={() => setActivities(toggle(activities, a))}
                >
                  {a}
                </Chip>
              ))}
              <button
                type="button"
                aria-label="Add activity"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground"
              >
                <Icon name="add" size={16} />
              </button>
            </div>
          </Section>

          <Section icon="edit_note" iconBg="bg-container-peach/60 text-on-container-peach" title="Teacher Note">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary"
            >
              <Icon name="auto_awesome" filled size={14} />
              AI Assist
            </button>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder={`Share a special moment from ${child.firstName}'s day…`}
              className="mt-3 w-full rounded-2xl bg-secondary/60 px-4 py-3 text-sm placeholder:text-muted-foreground"
            />
          </Section>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={saved}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-display text-base font-bold text-primary-foreground shadow-card disabled:opacity-70"
          >
            {saved ? "Report Saved" : "Save Report"}
            <Icon name={saved ? "check_circle" : "send"} filled size={20} />
          </motion.button>
        </form>
      </Page>
    </>
  );
}

function Section({
  icon,
  iconBg,
  title,
  children,
}: {
  icon: string;
  iconBg: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center gap-3">
        <span className={"flex h-9 w-9 items-center justify-center rounded-full " + iconBg}>
          <Icon name={icon} filled size={18} />
        </span>
        <h2 className="font-display text-lg font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex-1 space-y-1">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors " +
        (active
          ? "bg-accent/40 text-accent-foreground ring-1 ring-accent"
          : "bg-secondary text-foreground")
      }
    >
      {children}
    </button>
  );
}