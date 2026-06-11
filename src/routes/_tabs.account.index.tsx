import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, HelpCircle, LogOut, Settings, User } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { AvatarInitial } from "@/components/avatar-initial";
import { me, myClassroom, children } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/account/")({
  head: () => ({
    meta: [
      { title: "Compte — Éducatrices" },
      { name: "description", content: "Votre profil, votre classe et vos préférences." },
      { property: "og:title", content: "Compte — Éducatrices" },
      { property: "og:description", content: "Profil et préférences de l'éducatrice." },
    ],
  }),
  component: AccountPage,
});

const items = [
  { to: "/account/profile", label: "Mon profil", Icon: User },
  { to: "/account/preferences", label: "Préférences", Icon: Settings },
  { to: "/account/help", label: "Aide & support", Icon: HelpCircle },
] as const;

function AccountPage() {
  return (
    <>
      <AppHeader />
      <Page>
        <h1 className="font-display text-2xl font-semibold">Compte</h1>

        <section className="mt-4 flex items-center gap-4 rounded-2xl bg-card p-5 shadow-card">
          <AvatarInitial name={`${me.firstName} ${me.lastName}`} size={64} />
          <div className="flex-1">
            <p className="font-display text-lg font-semibold leading-tight">
              {me.firstName} {me.lastName}
            </p>
            <p className="text-xs text-muted-foreground">{me.email}</p>
            <p className="mt-1 text-xs font-medium text-primary">
              {me.role === "lead" ? "Éducatrice référente" : "Assistante"}
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-border/60 bg-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Ma classe
          </p>
          <p className="mt-1 font-display text-base font-semibold">{myClassroom.name}</p>
          <p className="text-sm text-muted-foreground">
            Cycle 0–3 ans · {children.length}/{myClassroom.capacity} enfants
          </p>
        </section>

        <ul className="mt-5 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-card">
          {items.map(({ to, label, Icon }) => (
            <li key={to}>
              <Link to={to} className="flex items-center gap-3 px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="flex-1 text-sm font-medium">{label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>

        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-card px-4 py-3 text-sm font-semibold text-destructive">
          <LogOut className="h-4 w-4" />
          Se déconnecter
        </button>
      </Page>
    </>
  );
}