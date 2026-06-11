import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { Icon } from "@/components/icon";
import { me, myClassroom } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Digital Sanctuary" },
      { name: "description", content: "Profil de l'éducatrice et impact du jour." },
      { property: "og:title", content: "Profile — Digital Sanctuary" },
      { property: "og:description", content: "Profil et activité du jour." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <>
      <AppHeader />
      <Page>
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-primary">Profile</h1>
          <button
            aria-label="Paramètres"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground"
          >
            <Icon name="settings" size={20} />
          </button>
        </div>

        <section className="mt-5 flex flex-col items-center rounded-3xl bg-secondary/70 p-6 text-center">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${me.firstName}`}
            alt=""
            className="h-24 w-24 rounded-full border-4 border-card bg-card object-cover"
          />
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            <Icon name="verified" filled size={16} />
            Sanctuary Certified
          </span>
          <h2 className="mt-2 font-display text-xl font-bold">
            Ms. {me.firstName}
          </h2>
          <p className="text-sm text-muted-foreground">
            Lead Educator • {myClassroom.name}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {["Early Childhood Ed. B.A.", "5 Years Experience", "CPR & First Aid"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-card px-3 py-1 text-xs font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-5 flex w-full gap-2">
            <button
              type="button"
              className="flex-1 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-card active:scale-95"
            >
              Edit Profile
            </button>
            <Link
              to="/calendar"
              className="flex-1 rounded-full bg-card py-3 text-center text-sm font-semibold text-foreground shadow-card"
            >
              View Schedule
            </Link>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="font-display text-2xl font-extrabold">Today's Impact</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A summary of your activities in the {myClassroom.name}.
          </p>
          <div className="mt-4 space-y-3">
            <ImpactCard
              icon="visibility"
              tag="LOGGED"
              tagColor="text-primary"
              value="12"
              label="Student Observations"
              accent="bg-secondary"
            />
            <ImpactCard
              icon="send"
              tag="SENT"
              tagColor="text-on-container-peach"
              value="24"
              label="Updates to Parents"
              accent="bg-container-peach/50"
            />
            <ImpactCard
              icon="star"
              tag="MILESTONE"
              tagColor="text-accent-foreground"
              value="Motor Skills Dev."
              label="Focus of the week completed for 8 students."
              accent="bg-accent/40"
              progress={75}
            />
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Recent Activity</h2>
            <button className="text-sm font-semibold text-primary">View All</button>
          </div>
          <ul className="mt-3 space-y-3">
            <ActivityRow
              icon="photo_camera"
              title="Uploaded a photo to Léo's profile"
              meta="Art project: Finger painting"
              ago="10 MIN"
            />
            <ActivityRow
              icon="edit_note"
              title="Added a milestone for Mia"
              meta="Social-Emotional development"
              ago="1 H"
            />
          </ul>
        </section>

        <Link
          to="/account/help"
          className="mt-6 flex items-center justify-center gap-2 rounded-full border border-border bg-card py-3 text-sm font-semibold text-foreground"
        >
          <Icon name="help" size={18} />
          Help & Support
        </Link>
      </Page>
    </>
  );
}

function ImpactCard({
  icon,
  tag,
  tagColor,
  value,
  label,
  accent,
  progress,
}: {
  icon: string;
  tag: string;
  tagColor: string;
  value: string;
  label: string;
  accent: string;
  progress?: number;
}) {
  return (
    <article className="relative overflow-hidden rounded-3xl bg-card p-5 shadow-card">
      <span
        aria-hidden
        className={"absolute -right-8 -top-8 h-28 w-28 rounded-full " + accent}
      />
      <div className="relative flex items-start justify-between">
        <Icon name={icon} filled size={22} className="text-primary" />
        <span className={"text-[11px] font-bold tracking-wider " + tagColor}>{tag}</span>
      </div>
      <p className="relative mt-4 font-display text-3xl font-extrabold">{value}</p>
      <p className="relative mt-1 text-sm text-muted-foreground">{label}</p>
      {progress !== undefined && (
        <div className="relative mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-accent-foreground"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </article>
  );
}

function ActivityRow({
  icon,
  title,
  meta,
  ago,
}: {
  icon: string;
  title: string;
  meta: string;
  ago: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
        <Icon name={icon} size={18} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{meta}</p>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {ago}
      </span>
    </li>
  );
}