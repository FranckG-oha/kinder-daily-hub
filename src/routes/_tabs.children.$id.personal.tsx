import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Phone,
  MessageCircle,
  Plus,
  Camera,
  Languages,
  Home,
  Users,
  Heart,
  Sparkles,
  Clock,
  Globe,
  Pencil,
} from "lucide-react";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { AvatarInitial } from "@/components/avatar-initial";
import {
  ageFromBirthdate,
  getChild,
  getPersonal,
  type Child,
} from "@/lib/mock";

// T-13 — Personal
export const Route = createFileRoute("/_tabs/children/$id/personal")({
  loader: ({ params }) => {
    const child: Child | undefined = getChild(params.id);
    if (!child) throw notFound();
    return { child: child as Child, personal: getPersonal(params.id) };
  },
  head: ({ params }) => ({
    meta: [
      { title: `Personnel — ${params.id}` },
      {
        name: "description",
        content: "Informations personnelles de l'enfant : préférences, langues, routines.",
      },
    ],
  }),
  component: PersonalPage,
});

const tabs = [
  { key: "overview", label: "Aperçu", to: "/children/$id" as const },
  { key: "personal", label: "Personnel", to: "/children/$id/personal" as const },
  { key: "medical", label: "Médical", to: "/children/$id/medical" as const },
  { key: "emergency", label: "Urgence", to: "/children/$id" as const },
  { key: "pickup", label: "Pickup", to: "/children/$id" as const },
  { key: "attendance", label: "Présence", to: "/children/$id" as const },
  { key: "reports", label: "Rapports", to: "/children/$id/history" as const },
];

function PersonalPage() {
  const { child, personal } = Route.useLoaderData();
  const primaryGuardian = child.guardians[0];

  return (
    <>
      <SubPageHeader title={`Personnel · ${child.firstName}`} />
      <Page>
        <h1 className="sr-only">
          Informations personnelles de {child.firstName}
        </h1>

        {/* Hero compact */}
        <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-primary-light to-card p-5 shadow-card">
          <div className="flex items-center gap-4">
            <AvatarInitial name={`${child.firstName} ${child.lastName}`} size={64} />
            <div className="min-w-0 flex-1">
              <p className="font-display text-[18px] font-extrabold leading-tight tracking-tight">
                {child.firstName} {child.lastName}
              </p>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                {ageFromBirthdate(child.birthdate)} · {personal.pronouns}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Appelé(e) « {personal.preferredName} »
              </p>
            </div>
            <button
              aria-label="Modifier"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-card"
            >
              <Pencil size={16} strokeWidth={1.75} className="text-primary" />
            </button>
          </div>

          {/* Quick actions */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            {primaryGuardian && (
              <a
                href={`tel:${primaryGuardian.phone.replace(/\s+/g, "")}`}
                aria-label={`Appeler ${primaryGuardian.name}`}
                className="flex flex-col items-center gap-1 rounded-2xl bg-card px-2 py-3 shadow-card"
              >
                <Phone size={18} strokeWidth={1.75} className="text-primary" />
                <span className="text-[10px] font-semibold">Appeler</span>
              </a>
            )}
            <Link
              to="/messages"
              className="flex flex-col items-center gap-1 rounded-2xl bg-card px-2 py-3 shadow-card"
            >
              <MessageCircle size={18} strokeWidth={1.75} className="text-primary" />
              <span className="text-[10px] font-semibold">Message</span>
            </Link>
            <Link
              to="/quick-log"
              className="flex flex-col items-center gap-1 rounded-2xl bg-card px-2 py-3 shadow-card"
            >
              <Plus size={18} strokeWidth={1.75} className="text-primary" />
              <span className="text-[10px] font-semibold">Log</span>
            </Link>
            <Link
              to="/log/photo"
              className="flex flex-col items-center gap-1 rounded-2xl bg-card px-2 py-3 shadow-card"
            >
              <Camera size={18} strokeWidth={1.75} className="text-primary" />
              <span className="text-[10px] font-semibold">Photo</span>
            </Link>
          </div>
        </section>

        {/* Tab strip */}
        <nav
          aria-label="Sections de la fiche enfant"
          className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1"
        >
          {tabs.map((t) => {
            const active = t.key === "personal";
            return (
              <Link
                key={t.key}
                to={t.to}
                params={{ id: child.id }}
                aria-current={active ? "page" : undefined}
                className={
                  "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors " +
                  (active
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground/70 border border-border")
                }
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        {/* Identité */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Identité
          </h2>
          <dl className="mt-3 divide-y divide-border/60 text-sm">
            <Row label="Prénom" value={child.firstName} />
            <Row label="Nom" value={child.lastName} />
            <Row
              label="Date de naissance"
              value={new Date(child.birthdate).toLocaleDateString("fr-FR")}
            />
            <Row label="Âge" value={ageFromBirthdate(child.birthdate)} />
            <Row label="Pronoms" value={personal.pronouns} />
            <Row label="Surnom" value={personal.preferredName} />
          </dl>
        </section>

        {/* Langues & domicile */}
        <section className="mt-4 grid grid-cols-2 gap-3">
          <InfoCard
            icon={<Languages size={16} strokeWidth={1.75} />}
            title="Langues à la maison"
          >
            <div className="mt-2 flex flex-wrap gap-1.5">
              {personal.languagesHome.map((l: string) => (
                <span
                  key={l}
                  className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium"
                >
                  {l}
                </span>
              ))}
            </div>
          </InfoCard>
          <InfoCard
            icon={<Home size={16} strokeWidth={1.75} />}
            title="Vit avec"
          >
            <p className="mt-2 text-sm">{personal.livesWith}</p>
          </InfoCard>
        </section>

        {/* Fratrie */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 text-primary">
            <Users size={16} strokeWidth={1.75} />
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Fratrie
            </h2>
          </div>
          {personal.siblings.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">Enfant unique.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {personal.siblings.map((s: { name: string; age: string }) => (
                <li
                  key={s.name}
                  className="flex items-center gap-3 rounded-xl bg-secondary/40 px-3 py-2"
                >
                  <AvatarInitial name={s.name} size={32} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.age}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Doudou & préférences */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 text-primary">
            <Heart size={16} strokeWidth={1.75} />
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Objet de réconfort
            </h2>
          </div>
          <p className="mt-2 text-sm">{personal.comfortItem}</p>

          <div className="mt-4 flex items-center gap-2 text-primary">
            <Sparkles size={16} strokeWidth={1.75} />
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Activités préférées
            </h3>
          </div>
          {personal.favoriteActivities.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">À renseigner.</p>
          ) : (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {personal.favoriteActivities.map((a: string) => (
                <span
                  key={a}
                  className="rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-medium text-primary"
                >
                  {a}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Routines */}
        {personal.routines.length > 0 && (
          <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 text-primary">
              <Clock size={16} strokeWidth={1.75} />
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Routines maison
              </h2>
            </div>
            <dl className="mt-3 divide-y divide-border/60 text-sm">
              {personal.routines.map((r: { label: string; value: string }) => (
                <Row key={r.label} label={r.label} value={r.value} />
              ))}
            </dl>
          </section>
        )}

        {/* Culture */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 text-primary">
            <Globe size={16} strokeWidth={1.75} />
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Notes culturelles
            </h2>
          </div>
          <p className="mt-2 text-sm text-foreground/90">
            {personal.culturalNotes}
          </p>
        </section>

        <div className="h-4" />
      </Page>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-card">
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}