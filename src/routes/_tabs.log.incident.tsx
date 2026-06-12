import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { Icon } from "@/components/icon";
import { children } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/log/incident")({
  head: () => ({
    meta: [
      { title: "Incident Report — Digital Sanctuary" },
      { name: "description", content: "Documenter un événement ou une note comportementale." },
    ],
  }),
  component: IncidentPage,
});

const categories = [
  "Minor Injury (Scrape/Bump)",
  "Behavioral Event",
  "Illness / Health",
  "Other",
];

const locations = ["Playground", "Classroom", "Lunch room", "Hallway"] as const;

function IncidentPage() {
  const [studentId, setStudentId] = useState(children[0]?.id ?? "");
  const [category, setCategory] = useState(categories[0]);
  const [location, setLocation] = useState<(typeof locations)[number]>("Playground");
  const [time, setTime] = useState("10:30");
  const [description, setDescription] = useState("");
  const [notify, setNotify] = useState(true);

  return (
    <>
      <SubPageHeader title="Incident Report" />
      <Page>
        <p className="text-sm text-muted-foreground">
          Document an event or behavioral note for a student.
        </p>

        <section className="mt-5 rounded-3xl bg-secondary/60 p-5">
          <h2 className="font-display text-base font-bold">Who was involved?</h2>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {children.slice(0, 5).map((c) => {
              const on = studentId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setStudentId(c.id)}
                  className={
                    "relative flex flex-col items-center gap-2 rounded-2xl bg-card p-3 text-center transition-all " +
                    (on ? "ring-2 ring-primary" : "opacity-70")
                  }
                >
                  <img
                    src={c.avatar}
                    alt=""
                    className={
                      "h-14 w-14 rounded-full object-cover " + (on ? "" : "grayscale")
                    }
                  />
                  <span className="text-xs font-semibold">{c.firstName}</span>
                  {on && (
                    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Icon name="check" filled size={12} />
                    </span>
                  )}
                </button>
              );
            })}
            <button className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card/50 p-3 text-muted-foreground">
              <Icon name="search" size={20} />
              <span className="text-xs font-medium">Search…</span>
            </button>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-secondary/60 p-5">
          <h2 className="font-display text-base font-bold">Type & Time</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1.5 w-full rounded-xl border-0 bg-card px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1.5 w-full rounded-xl border-0 bg-card px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Location
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {locations.map((l) => {
                  const on = location === l;
                  return (
                    <button
                      key={l}
                      onClick={() => setLocation(l)}
                      className={
                        "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors " +
                        (on
                          ? "bg-primary/15 text-primary"
                          : "bg-card text-foreground")
                      }
                    >
                      {l}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-secondary/60 p-5">
          <h2 className="font-display text-base font-bold">Description</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Describe what happened, actions taken, and the child's current status…"
            className="mt-3 w-full resize-none rounded-2xl bg-card p-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />

          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-container-peach/60 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card text-on-container-peach">
              <Icon name="campaign" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Notify parents immediately</p>
              <p className="text-xs text-muted-foreground">Push & SMS to emergency contacts.</p>
            </div>
            <button
              role="switch"
              aria-checked={notify}
              onClick={() => setNotify((v) => !v)}
              className={
                "relative h-6 w-11 rounded-full transition-colors " +
                (notify ? "bg-primary" : "bg-border")
              }
            >
              <span
                className={
                  "absolute top-0.5 h-5 w-5 rounded-full bg-card transition-transform " +
                  (notify ? "translate-x-5" : "translate-x-0.5")
                }
              />
            </button>
          </div>
        </section>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 rounded-full bg-secondary py-3 text-sm font-semibold">
            Cancel
          </button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="flex-[2] rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-card"
          >
            Save Report
          </motion.button>
        </div>
      </Page>
    </>
  );
}