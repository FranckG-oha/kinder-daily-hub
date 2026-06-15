import { createFileRoute } from "@tanstack/react-router";
import { Pill, Clock3, AlertTriangle, CloudSun, UserX } from "lucide-react";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { todayAlerts, getChild, type TodayAlert } from "@/lib/mock";

// T-10 — Alerts list
export const Route = createFileRoute("/_tabs/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — Digital Sanctuary" },
      { name: "description", content: "Alertes et rappels du jour." },
    ],
  }),
  component: AlertsPage,
});

const META: Record<
  TodayAlert["kind"],
  { Icon: typeof Pill; tone: string; label: string }
> = {
  medication: { Icon: Pill, tone: "bg-warning-tint text-warning-ink", label: "Médicament" },
  pickup: { Icon: Clock3, tone: "bg-secondary text-primary", label: "Retard" },
  absent: { Icon: UserX, tone: "bg-danger-tint text-destructive", label: "Absence" },
  incident: { Icon: AlertTriangle, tone: "bg-danger-tint text-destructive", label: "Incident" },
  weather: { Icon: CloudSun, tone: "bg-secondary text-foreground", label: "Météo" },
};

function AlertsPage() {
  return (
    <>
      <SubPageHeader title="Alerts" />
      <Page>
        <p className="text-sm text-muted-foreground">
          {todayAlerts.length} alertes à traiter aujourd'hui.
        </p>
        <ul className="mt-4 space-y-3">
          {todayAlerts.map((a) => {
            const m = META[a.kind];
            const child = a.childId ? getChild(a.childId) : null;
            return (
              <li key={a.id} className={`rounded-3xl ${m.tone} p-4`}>
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card">
                    <m.Icon size={20} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                        {m.label}
                      </span>
                      {a.at && <span className="text-[11px] font-bold opacity-70">{a.at}</span>}
                    </div>
                    <p className="mt-0.5 font-display text-base font-bold">{a.title}</p>
                    <p className="mt-1 text-sm opacity-90">{a.body}</p>
                    {child && (
                      <div className="mt-3 flex items-center gap-2">
                        <img src={child.avatar} alt="" className="h-7 w-7 rounded-full bg-card" />
                        <span className="text-xs font-semibold">{child.firstName} {child.lastName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Page>
    </>
  );
}