import { createFileRoute } from "@tanstack/react-router";
import { Pin } from "lucide-react";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { announcements } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/messages/announcements")({
  head: () => ({
    meta: [
      { title: "Annonces direction — Éducatrices" },
      { name: "description", content: "Annonces et communications de la direction et de l'équipe." },
    ],
  }),
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const sorted = [...announcements].sort((a, b) =>
    a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1,
  );
  return (
    <>
      <SubPageHeader title="Annonces" />
      <Page>
        <h1 className="sr-only">Annonces de la direction</h1>
        <ul className="space-y-3">
          {sorted.map((a) => (
            <li
              key={a.id}
              className={
                "rounded-2xl border p-4 " +
                (a.pinned
                  ? "border-primary/40 bg-primary/5"
                  : "border-border/60 bg-card")
              }
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {a.from === "direction" ? "Direction" : "Équipe"} · {a.date}
                </p>
                {a.pinned && <Pin className="h-4 w-4 text-primary" />}
              </div>
              <h2 className="mt-1 font-display text-base font-semibold">{a.title}</h2>
              <p className="mt-1 text-sm text-foreground/90">{a.body}</p>
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}