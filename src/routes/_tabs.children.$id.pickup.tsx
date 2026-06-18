import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Phone,
  MessageCircle,
  Plus,
  Camera,
  Clock,
  UserCheck,
  UserX,
  ShieldCheck,
  KeyRound,
  IdCard,
  Calendar,
  History,
  CheckCircle2,
  XCircle,
  Pencil,
} from "lucide-react";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { AvatarInitial } from "@/components/avatar-initial";
import {
  ageFromBirthdate,
  getChild,
  getPickup,
  type Child,
  type PickupEvent,
  type PickupPerson,
  type PickupInfo,
} from "@/lib/mock";

// T-16 — Pickup
export const Route = createFileRoute("/_tabs/children/$id/pickup")({
  loader: ({ params }) => {
    const child: Child | undefined = getChild(params.id);
    if (!child) throw notFound();
    return { child: child as Child, pickup: getPickup(params.id) };
  },
  head: ({ params }) => ({
    meta: [
      { title: `Pickup — ${params.id}` },
      {
        name: "description",
        content: "Personnes autorisées au pickup, historique et règles de récupération.",
      },
    ],
  }),
  component: PickupPage,
});

const tabs = [
  { key: "overview", label: "Aperçu", to: "/children/$id" as const },
  { key: "personal", label: "Personnel", to: "/children/$id/personal" as const },
  { key: "medical", label: "Médical", to: "/children/$id/medical" as const },
  { key: "emergency", label: "Urgence", to: "/children/$id/emergency" as const },
  { key: "pickup", label: "Pickup", to: "/children/$id/pickup" as const },
  { key: "attendance", label: "Présence", to: "/children/$id" as const },
  { key: "reports", label: "Rapports", to: "/children/$id/history" as const },
];

const statusTone: Record<PickupEvent["status"], string> = {
  completed: "bg-status-present/15 text-status-present",
  scheduled: "bg-primary-light text-primary",
  missed: "bg-destructive/15 text-destructive",
};
const statusLabel: Record<PickupEvent["status"], string> = {
  completed: "Effectué", scheduled: "Prévu", missed: "Manqué",
};

function PickupPage() {
  const { child, pickup } = Route.useLoaderData() as {
    child: Child;
    pickup: PickupInfo;
  };

  return (
    <>
      <SubPageHeader title={`Pickup · ${child.firstName}`} />
      <Page>
        <h1 className="sr-only">Pickup de {child.firstName}</h1>

        {/* Hero */}
        <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-primary-light to-card p-5 shadow-card">
          <div className="flex items-center gap-4">
            <AvatarInitial name={`${child.firstName} ${child.lastName}`} size={64} />
            <div className="min-w-0 flex-1">
              <p className="font-display text-[18px] font-extrabold leading-tight tracking-tight">
                {child.firstName} {child.lastName}
              </p>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                {ageFromBirthdate(child.birthdate)} · Pickup par défaut {pickup.defaultTime}
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-primary">
                {pickup.defaultPerson}
              </p>
            </div>
            <button
              aria-label="Modifier"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-card"
            >
              <Pencil size={16} strokeWidth={1.75} className="text-primary" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            <Link
              to="/quick-log"
              className="flex flex-col items-center gap-1 rounded-2xl bg-card px-2 py-3 shadow-card"
            >
              <CheckCircle2 size={18} strokeWidth={1.75} className="text-primary" />
              <span className="text-[10px] font-semibold">Valider</span>
            </Link>
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
            const active = t.key === "pickup";
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

        {/* Upcoming */}
        {pickup.upcoming && (
          <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 text-primary">
              <Calendar size={16} strokeWidth={1.75} />
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Prochain pickup
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-xl bg-primary-light p-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Clock size={18} strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">
                  {new Date(pickup.upcoming.date).toLocaleDateString("fr-FR", {
                    weekday: "long", day: "numeric", month: "short",
                  })}{" "}
                  · {pickup.upcoming.time}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Par {pickup.upcoming.by}
                </p>
              </div>
              <span
                className={
                  "rounded-full px-2.5 py-0.5 text-[10px] font-semibold " +
                  statusTone[pickup.upcoming.status]
                }
              >
                {statusLabel[pickup.upcoming.status]}
              </span>
            </div>
          </section>
        )}

        {/* Règles */}
        <section className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 text-primary">
              <IdCard size={16} strokeWidth={1.75} />
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Pièce d'identité
              </h3>
            </div>
            <p className="mt-2 text-sm font-semibold">
              {pickup.requiresPhotoId ? "Requise" : "Non requise"}
            </p>
          </div>
          <div className="rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 text-primary">
              <KeyRound size={16} strokeWidth={1.75} />
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Mot de passe
              </h3>
            </div>
            <p className="mt-2 text-sm font-semibold">
              {pickup.requiresPassword ? pickup.password ?? "Requis" : "Non requis"}
            </p>
          </div>
        </section>

        {/* Personnes autorisées */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <UserCheck size={16} strokeWidth={1.75} />
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Personnes autorisées
              </h2>
            </div>
            <button className="text-[11px] font-semibold text-primary">+ Ajouter</button>
          </div>
          <ul className="mt-3 space-y-2.5">
            {pickup.authorizedPeople.map((p: PickupPerson) => (
              <li key={p.name} className="rounded-xl bg-secondary/40 p-3">
                <div className="flex items-center gap-3">
                  <AvatarInitial name={p.name} size={40} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold">{p.name}</p>
                      {p.idVerified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-status-present/15 px-2 py-0.5 text-[10px] font-semibold text-status-present">
                          <ShieldCheck size={11} strokeWidth={1.75} />
                          Vérifié
                        </span>
                      )}
                      {!p.authorized && (
                        <span className="rounded-full bg-status-late/30 px-2 py-0.5 text-[10px] font-semibold text-foreground">
                          En attente
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {p.relation} · {p.phone}
                    </p>
                  </div>
                  <a
                    aria-label={`Appeler ${p.name}`}
                    href={`tel:${p.phone.replace(/\s+/g, "")}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  >
                    <Phone size={16} strokeWidth={1.75} />
                  </a>
                </div>
                {p.notes && (
                  <p className="mt-2 pl-[52px] text-[11px] italic text-muted-foreground">
                    {p.notes}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Personnes bloquées */}
        {pickup.blockedPeople.length > 0 && (
          <section className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-center gap-2 text-destructive">
              <UserX size={16} strokeWidth={1.75} />
              <h2 className="text-sm font-semibold">Personnes non autorisées</h2>
            </div>
            <ul className="mt-2 space-y-2">
              {pickup.blockedPeople.map((b: { name: string; reason: string }) => (
                <li key={b.name} className="rounded-xl bg-card px-3 py-2">
                  <p className="text-sm font-semibold">{b.name}</p>
                  <p className="text-[11px] text-muted-foreground">{b.reason}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Notes de garde */}
        {pickup.custodyNotes && pickup.custodyNotes !== "—" && (
          <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Notes de garde
            </h2>
            <p className="mt-2 text-sm text-foreground/90">{pickup.custodyNotes}</p>
          </section>
        )}

        {/* Historique */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 text-primary">
            <History size={16} strokeWidth={1.75} />
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Historique récent
            </h2>
          </div>
          <ul className="mt-3 divide-y divide-border/60">
            {pickup.history.map((h: PickupEvent, idx: number) => (
              <li key={idx} className="flex items-center gap-3 py-2.5">
                <span
                  className={
                    "inline-flex h-8 w-8 items-center justify-center rounded-full " +
                    (h.status === "missed"
                      ? "bg-destructive/15 text-destructive"
                      : "bg-status-present/15 text-status-present")
                  }
                >
                  {h.status === "missed" ? (
                    <XCircle size={16} strokeWidth={1.75} />
                  ) : (
                    <CheckCircle2 size={16} strokeWidth={1.75} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">
                    {new Date(h.date).toLocaleDateString("fr-FR", {
                      weekday: "short", day: "numeric", month: "short",
                    })}{" "}
                    · {h.time}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {h.by}
                    {h.note ? ` · ${h.note}` : ""}
                  </p>
                </div>
                <span
                  className={
                    "rounded-full px-2.5 py-0.5 text-[10px] font-semibold " +
                    statusTone[h.status]
                  }
                >
                  {statusLabel[h.status]}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="h-4" />
      </Page>
    </>
  );
}