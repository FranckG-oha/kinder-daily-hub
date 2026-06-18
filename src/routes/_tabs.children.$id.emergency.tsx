import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Phone,
  MessageCircle,
  Plus,
  Camera,
  AlertTriangle,
  Hospital,
  Siren,
  ShieldCheck,
  ShieldOff,
  MapPin,
  Users,
  Pencil,
} from "lucide-react";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { AvatarInitial } from "@/components/avatar-initial";
import {
  ageFromBirthdate,
  getChild,
  getEmergency,
  type Child,
  type EmergencyContact,
} from "@/lib/mock";

// T-15 — Emergency
export const Route = createFileRoute("/_tabs/children/$id/emergency")({
  loader: ({ params }) => {
    const child: Child | undefined = getChild(params.id);
    if (!child) throw notFound();
    return { child: child as Child, emergency: getEmergency(params.id) };
  },
  head: ({ params }) => ({
    meta: [
      { title: `Urgence — ${params.id}` },
      {
        name: "description",
        content: "Contacts d'urgence, hôpital de référence et consentements de l'enfant.",
      },
    ],
  }),
  component: EmergencyPage,
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

const priorityTone: Record<1 | 2 | 3, string> = {
  1: "bg-destructive text-destructive-foreground",
  2: "bg-status-late/30 text-foreground",
  3: "bg-secondary text-foreground/70",
};
const priorityLabel: Record<1 | 2 | 3, string> = {
  1: "Priorité 1", 2: "Priorité 2", 3: "Priorité 3",
};

function EmergencyPage() {
  const { child, emergency } = Route.useLoaderData();
  const primary = emergency.contacts[0];

  return (
    <>
      <SubPageHeader title={`Urgence · ${child.firstName}`} />
      <Page>
        <h1 className="sr-only">Contacts d'urgence de {child.firstName}</h1>

        {/* Hero */}
        <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-destructive/15 to-card p-5 shadow-card">
          <div className="flex items-center gap-4">
            <AvatarInitial name={`${child.firstName} ${child.lastName}`} size={64} />
            <div className="min-w-0 flex-1">
              <p className="font-display text-[18px] font-extrabold leading-tight tracking-tight">
                {child.firstName} {child.lastName}
              </p>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                {ageFromBirthdate(child.birthdate)} · {emergency.contacts.length} contact{emergency.contacts.length > 1 ? "s" : ""}
              </p>
              {primary && (
                <p className="mt-0.5 text-[11px] font-medium text-destructive">
                  Priorité 1 · {primary.name}
                </p>
              )}
            </div>
            <button
              aria-label="Modifier"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-card"
            >
              <Pencil size={16} strokeWidth={1.75} className="text-primary" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {primary && (
              <a
                href={`tel:${primary.phone.replace(/\s+/g, "")}`}
                aria-label={`Appeler ${primary.name}`}
                className="flex flex-col items-center gap-1 rounded-2xl bg-destructive px-2 py-3 text-destructive-foreground shadow-card"
              >
                <Phone size={18} strokeWidth={1.75} />
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
            const active = t.key === "emergency";
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

        {/* Special instructions */}
        {emergency.specialInstructions && emergency.specialInstructions !== "—" && (
          <section className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle size={16} strokeWidth={1.75} />
              <p className="text-sm font-semibold">Consignes prioritaires</p>
            </div>
            <p className="mt-2 text-sm text-foreground/90">{emergency.specialInstructions}</p>
          </section>
        )}

        {/* Contacts */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 text-primary">
            <Users size={16} strokeWidth={1.75} />
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Contacts d'urgence
            </h2>
          </div>
          {emergency.contacts.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">Aucun contact renseigné.</p>
          ) : (
            <ul className="mt-3 space-y-2.5">
              {emergency.contacts.map((c: EmergencyContact) => (
                <li key={c.name} className="rounded-xl bg-secondary/40 p-3">
                  <div className="flex items-center gap-3">
                    <AvatarInitial name={c.name} size={40} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold">{c.name}</p>
                        <span
                          className={
                            "inline-flex shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold " +
                            priorityTone[c.priority]
                          }
                        >
                          {priorityLabel[c.priority]}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {c.relation} · {c.canPickup ? "Pickup autorisé" : "Pickup non autorisé"}
                      </p>
                    </div>
                    <a
                      aria-label={`Appeler ${c.name}`}
                      href={`tel:${c.phone.replace(/\s+/g, "")}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
                    >
                      <Phone size={16} strokeWidth={1.75} />
                    </a>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 pl-[52px] text-[11px] text-muted-foreground">
                    <span>{c.phone}</span>
                    {c.altPhone && <span>· {c.altPhone}</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Hospital */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 text-primary">
            <Hospital size={16} strokeWidth={1.75} />
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Hôpital de référence
            </h2>
          </div>
          <div className="mt-3 flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{emergency.hospital.name}</p>
              <p className="mt-0.5 flex items-start gap-1 text-[11px] text-muted-foreground">
                <MapPin size={11} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                <span>{emergency.hospital.address}</span>
              </p>
            </div>
            <a
              aria-label="Appeler l'hôpital"
              href={`tel:${emergency.hospital.phone.replace(/\s+/g, "")}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <Phone size={16} strokeWidth={1.75} />
            </a>
          </div>
        </section>

        {/* Poison control + Evacuation */}
        <section className="mt-4 grid grid-cols-1 gap-3">
          <a
            href={`tel:${emergency.poisonControl.replace(/\s+/g, "")}`}
            className="flex items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
              <Siren size={18} strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-destructive">
                Centre antipoison
              </p>
              <p className="text-sm font-semibold">{emergency.poisonControl}</p>
            </div>
            <Phone size={16} strokeWidth={1.75} className="text-destructive" />
          </a>
          <div className="rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 text-primary">
              <MapPin size={16} strokeWidth={1.75} />
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Plan d'évacuation
              </h3>
            </div>
            <p className="mt-2 text-sm text-foreground/90">{emergency.evacuationPlan}</p>
          </div>
        </section>

        {/* Consents */}
        <section className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Consentements
          </h2>
          <ul className="mt-3 space-y-2">
            <ConsentRow label="Soins médicaux d'urgence" granted={emergency.consentMedicalCare} />
            <ConsentRow label="Photos & médias" granted={emergency.consentPhotos} />
          </ul>
        </section>

        <div className="h-4" />
      </Page>
    </>
  );
}

function ConsentRow({ label, granted }: { label: string; granted: boolean }) {
  return (
    <li className="flex items-center gap-3 rounded-xl bg-secondary/40 px-3 py-2.5">
      <span
        className={
          "inline-flex h-9 w-9 items-center justify-center rounded-full " +
          (granted ? "bg-status-present/15 text-status-present" : "bg-destructive/15 text-destructive")
        }
      >
        {granted ? (
          <ShieldCheck size={16} strokeWidth={1.75} />
        ) : (
          <ShieldOff size={16} strokeWidth={1.75} />
        )}
      </span>
      <p className="flex-1 text-sm font-medium">{label}</p>
      <span
        className={
          "rounded-full px-2.5 py-0.5 text-[10px] font-semibold " +
          (granted
            ? "bg-status-present/15 text-status-present"
            : "bg-destructive/15 text-destructive")
        }
      >
        {granted ? "Accordé" : "Refusé"}
      </span>
    </li>
  );
}