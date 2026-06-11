import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { Icon } from "@/components/icon";

export const Route = createFileRoute("/_tabs/add")({
  head: () => ({
    meta: [{ title: "Quick action — Digital Sanctuary" }],
  }),
  component: AddPage,
});

const actions = [
  { icon: "campaign", label: "Broadcast announcement", body: "Send a note to every classroom team at once." },
  { icon: "warning", label: "Log priority alert", body: "Flag a health or safety concern for follow-up." },
  { icon: "fact_check", label: "Start evaluation", body: "Kick off a new evaluation cycle for a room." },
  { icon: "event", label: "Schedule visit", body: "Plan an observation or coordination meeting." },
];

function AddPage() {
  return (
    <>
      <AppHeader showAvatar={false} />
      <Page>
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          Quick action
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Coordinate across your age group in a couple of taps.
        </p>

        <div className="mt-6 space-y-3">
          {actions.map((a) => (
            <motion.button
              key={a.label}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center gap-4 rounded-3xl bg-card p-5 text-left shadow-card"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                <Icon name={a.icon} filled size={24} />
              </span>
              <span className="flex-1">
                <span className="block font-display text-base font-bold">{a.label}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{a.body}</span>
              </span>
              <Icon name="chevron_right" size={20} className="text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        <Link
          to="/"
          className="mt-6 block rounded-2xl bg-secondary py-3.5 text-center text-sm font-bold text-primary"
        >
          Cancel
        </Link>
      </Page>
    </>
  );
}
