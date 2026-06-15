import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Utensils,
  Moon,
  Thermometer,
  Pill,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";

// T-19 — Quick Log Hub
export const Route = createFileRoute("/_tabs/quick-log")({
  head: () => ({
    meta: [
      { title: "Quick Log — Digital Sanctuary" },
      { name: "description", content: "Saisie rapide : repas, sieste, temperature, soins, notes, incidents." },
    ],
  }),
  component: QuickLogHub,
});

type Tile = {
  to: string;
  label: string;
  hint: string;
  Icon: typeof Utensils;
  tone: string;
};

const tiles: Tile[] = [
  { to: "/quick-log/meal", label: "Meal", hint: "Batch · all children", Icon: Utensils, tone: "bg-primary/10 text-primary" },
  { to: "/quick-log/nap", label: "Nap", hint: "Start / end / quality", Icon: Moon, tone: "bg-secondary text-primary" },
  { to: "/quick-log/temperature", label: "Temperature", hint: "Per child · fever flag", Icon: Thermometer, tone: "bg-secondary text-foreground" },
  { to: "/quick-log/medication", label: "Medication", hint: "Authorized only", Icon: Pill, tone: "bg-secondary text-on-container-peach" },
  { to: "/log/note", label: "Note / Mood", hint: "Voice · AI assist", Icon: MessageSquare, tone: "bg-primary/10 text-primary" },
  { to: "/log/incident", label: "Incident", hint: "Notify parents", Icon: AlertTriangle, tone: "bg-destructive/10 text-destructive" },
];

function QuickLogHub() {
  return (
    <>
      <SubPageHeader title="Quick Log" />
      <Page>
        <p className="text-sm text-muted-foreground">
          Pick what you need to log right now.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {tiles.map(({ to, label, hint, Icon, tone }) => (
            <motion.div key={to} whileTap={{ scale: 0.96 }}>
              <Link
                to={to}
                className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-card p-4 shadow-card transition-shadow hover:shadow-md"
              >
                <span
                  className={
                    "flex h-11 w-11 items-center justify-center rounded-2xl " + tone
                  }
                >
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-sm font-bold leading-tight">
                    {label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Page>
    </>
  );
}