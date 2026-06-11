import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { AvatarInitial } from "@/components/avatar-initial";
import { AttendanceBadge } from "@/components/badges";
import { ageFromBirthdate, attendanceToday, children } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/children/")({
  head: () => ({
    meta: [
      { title: "Enfants — Éducatrices" },
      { name: "description", content: "Les enfants de votre classe et leur statut du jour." },
      { property: "og:title", content: "Enfants — Éducatrices" },
      { property: "og:description", content: "Présences, fiches et rapports par enfant." },
    ],
  }),
  component: ChildrenPage,
});

function ChildrenPage() {
  return (
    <>
      <AppHeader />
      <Page>
        <h1 className="font-display text-2xl font-semibold">Ma classe</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {children.length} enfants · Cycle 0–3 ans
        </p>
        <ul className="mt-5 space-y-2">
          {children.map((c) => (
            <li key={c.id}>
              <Link
                to="/children/$id"
                params={{ id: c.id }}
                className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3 transition-colors hover:bg-secondary/40"
              >
                <AvatarInitial name={`${c.firstName} ${c.lastName}`} size={44} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium leading-tight">
                    {c.firstName} {c.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {ageFromBirthdate(c.birthdate)}
                    {c.allergies.length > 0 && (
                      <> · <span className="text-status-incident">allergie</span></>
                    )}
                  </p>
                </div>
                <AttendanceBadge status={attendanceToday[c.id] ?? "present"} />
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}