import { createFileRoute } from "@tanstack/react-router";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { AvatarInitial } from "@/components/avatar-initial";
import { me } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/account/profile")({
  head: () => ({
    meta: [
      { title: "Profil — Éducatrices" },
      { name: "description", content: "Vos informations personnelles." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const rows = [
    { label: "Prénom", value: me.firstName },
    { label: "Nom", value: me.lastName },
    { label: "Email", value: me.email },
    { label: "Téléphone", value: me.phone },
    { label: "Rôle", value: me.role === "lead" ? "Référente" : me.role },
  ];
  return (
    <>
      <SubPageHeader title="Mon profil" />
      <Page>
        <h1 className="sr-only">Profil</h1>
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-card p-6 shadow-card">
          <AvatarInitial name={`${me.firstName} ${me.lastName}`} size={88} />
          <button className="text-xs font-semibold text-primary">Changer la photo</button>
        </div>
        <ul className="mt-5 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-card">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-muted-foreground">{r.label}</span>
              <span className="text-sm font-medium">{r.value}</span>
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}