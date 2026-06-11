import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { Icon } from "@/components/icon";
import { teacherActionNeeded, teacherThreads } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/comms")({
  head: () => ({
    meta: [
      { title: "Comms — Digital Sanctuary" },
      { name: "description", content: "Connect with educators and coordinate daily activities across all learning environments." },
    ],
  }),
  component: CommsPage,
});

const quickContacts = [
  { initials: "EL", name: "Elena Lopez", room: "Buttercup Room", color: "var(--primary)" },
  { initials: "DW", name: "David Wright", room: "Floater", color: "var(--status-present)" },
];

function CommsPage() {
  const [tab, setTab] = useState<"parents" | "teachers">("teachers");

  return (
    <>
      <AppHeader />
      <Page>
        <h1 className="font-display text-4xl font-extrabold tracking-tight">Comms</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Connect with educators and coordinate daily activities across all
          learning environments.
        </p>

        <div className="mt-5 inline-flex rounded-full bg-secondary p-1">
          {(["parents", "teachers"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                "rounded-full px-5 py-2 text-sm font-bold capitalize transition-colors " +
                (tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground")
              }
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "teachers" ? (
          <>
            <div className="mt-5 space-y-4">
              {teacherThreads.map((t) => {
                const complete = t.reportsDone >= t.reportsTotal;
                return (
                  <article key={t.id} className="rounded-3xl bg-card p-5 shadow-card">
                    <div className="flex items-start gap-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="h-12 w-12 rounded-full bg-secondary object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-lg font-bold leading-tight">
                          {t.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {t.room} • {t.role}
                        </p>
                      </div>
                      <span
                        className={
                          "shrink-0 rounded-full px-3 py-1 text-[11px] font-bold " +
                          (complete
                            ? "bg-[color-mix(in_oklab,var(--status-present)_18%,var(--card))] text-[var(--status-present)]"
                            : "bg-secondary text-primary")
                        }
                      >
                        {t.reportsDone}/{t.reportsTotal} reports done
                      </span>
                    </div>

                    <p className="mt-4 rounded-2xl bg-secondary p-4 text-sm leading-relaxed text-foreground/80">
                      {t.fromMe ? (
                        <>
                          <span className="font-bold text-foreground">You: </span>
                        </>
                      ) : (
                        <span className="font-bold text-foreground">
                          {t.name.split(" ")[0]}:{" "}
                        </span>
                      )}
                      &ldquo;{t.preview}&rdquo;
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        {t.time}
                      </span>
                      <button className="flex items-center gap-1 text-sm font-bold text-primary">
                        Reply
                        <Icon name="arrow_forward" size={16} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <section
              className="mt-5 rounded-3xl p-5"
              style={{ background: "color-mix(in oklab, var(--status-late) 18%, var(--card))" }}
            >
              <h2 className="flex items-center gap-2 font-display text-base font-bold text-[var(--status-late)]">
                <Icon name="warning" filled size={20} />
                Action needed
              </h2>
              <div className="mt-3 rounded-2xl bg-card/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-display text-sm font-bold">
                    {teacherActionNeeded.room}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {teacherActionNeeded.time}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  {teacherActionNeeded.body}
                </p>
                <button className="mt-3 w-full rounded-xl bg-card py-2.5 text-sm font-bold text-primary shadow-card">
                  Acknowledge
                </button>
              </div>
            </section>

            <section className="mt-5 rounded-3xl bg-secondary p-5">
              <h2 className="font-display text-lg font-bold">Quick contact</h2>
              <ul className="mt-3 space-y-3">
                {quickContacts.map((q) => (
                  <li key={q.initials} className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: q.color }}
                    >
                      {q.initials}
                    </span>
                    <div className="flex-1">
                      <p className="font-display text-sm font-bold">{q.name}</p>
                      <p className="text-xs text-muted-foreground">{q.room}</p>
                    </div>
                    <button
                      aria-label={`Message ${q.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary shadow-card"
                    >
                      <Icon name="chat_bubble" filled size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          <div className="mt-8 rounded-3xl bg-card p-10 text-center shadow-card">
            <Icon name="family_restroom" size={32} className="text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Parent conversations are managed by each room&apos;s lead teacher.
            </p>
          </div>
        )}
      </Page>
    </>
  );
}
