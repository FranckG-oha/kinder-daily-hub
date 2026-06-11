import { Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { AvatarInitial } from "./avatar-initial";
import { me, myClassroom } from "@/lib/mock";

export function AppHeader({ greeting }: { greeting?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-[440px] items-center gap-3 px-5 py-4">
        <Link to="/account" aria-label="Mon compte">
          <AvatarInitial name={`${me.firstName} ${me.lastName}`} size={40} />
        </Link>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">
            {greeting ?? "Bonjour"}, {me.firstName}
          </p>
          <p className="font-display text-base font-semibold leading-tight">
            {myClassroom.name}
          </p>
        </div>
        <button
          aria-label="Notifications"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/70"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-status-incident" />
        </button>
      </div>
    </header>
  );
}

export function SubPageHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-[440px] items-center gap-3 px-5 py-4">
        <button
          onClick={() => window.history.back()}
          aria-label="Retour"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
        >
          ←
        </button>
        <h1 className="flex-1 truncate font-display text-lg font-semibold">{title}</h1>
      </div>
    </header>
  );
}