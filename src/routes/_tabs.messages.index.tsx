import { createFileRoute, Link } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { AvatarInitial } from "@/components/avatar-initial";
import { getChild, threads } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/messages/")({
  head: () => ({
    meta: [
      { title: "Messages — Éducatrices" },
      { name: "description", content: "Échanges avec les parents et annonces de la direction." },
      { property: "og:title", content: "Messages — Éducatrices" },
      { property: "og:description", content: "Vos conversations parents et annonces." },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  return (
    <>
      <AppHeader />
      <Page>
        <h1 className="font-display text-2xl font-semibold">Messages</h1>

        <Link
          to="/messages/announcements"
          className="mt-4 flex items-center gap-3 rounded-2xl bg-accent/40 px-4 py-4"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card">
            <Megaphone className="h-5 w-5 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Annonces direction</p>
            <p className="text-xs text-muted-foreground">3 nouvelles cette semaine</p>
          </div>
        </Link>

        <ul className="mt-4 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-card">
          {threads.map((t) => {
            const c = getChild(t.childId);
            return (
              <li key={t.id}>
                <Link
                  to="/messages/$threadId"
                  params={{ threadId: t.id }}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <AvatarInitial name={t.parentName} size={44} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate font-medium">{t.parentName}</p>
                      <span className="text-[11px] text-muted-foreground">{t.lastAt}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      parent de {c?.firstName}
                    </p>
                    <p className="mt-0.5 truncate text-sm text-foreground/90">
                      {t.lastMessage}
                    </p>
                  </div>
                  {t.unread > 0 && (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
                      {t.unread}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </Page>
    </>
  );
}