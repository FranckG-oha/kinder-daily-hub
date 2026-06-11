import { createFileRoute } from "@tanstack/react-router";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { children } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/reports/week")({
  head: () => ({
    meta: [
      { title: "Semaine — Rapports" },
      { name: "description", content: "Taux de complétion des rapports sur les 7 derniers jours." },
    ],
  }),
  component: WeekPage,
});

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const completion = [100, 88, 100, 75, 50, 0, 0]; // mock

function WeekPage() {
  return (
    <>
      <SubPageHeader title="Cette semaine" />
      <Page>
        <h1 className="font-display text-xl font-semibold">Complétion des rapports</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {children.length} enfants suivis quotidiennement
        </p>
        <div className="mt-6 flex items-end justify-between gap-2 rounded-2xl bg-card p-5 shadow-card">
          {days.map((d, i) => (
            <div key={d} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-32 w-full items-end">
                <div
                  className="w-full rounded-t-md bg-primary transition-all"
                  style={{ height: `${completion[i]}%`, opacity: completion[i] ? 1 : 0.15 }}
                  aria-label={`${d} : ${completion[i]}%`}
                />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground">{d}</span>
              <span className="text-xs font-semibold">{completion[i]}%</span>
            </div>
          ))}
        </div>
      </Page>
    </>
  );
}