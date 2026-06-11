import { Link } from "@tanstack/react-router";
import { Icon } from "./icon";
import { me } from "@/lib/mock";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 bg-secondary/80 backdrop-blur">
      <div className="mx-auto flex max-w-[440px] items-center justify-between px-5 py-4">
        <Link to="/profile" aria-label="Mon profil" className="flex items-center gap-3">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${me.firstName}`}
            alt=""
            className="h-10 w-10 rounded-full object-cover bg-card"
          />
          <span className="font-display text-lg font-extrabold tracking-tight text-primary">
            Digital Sanctuary
          </span>
        </Link>
        <button
          aria-label="Notifications"
          className="relative text-primary transition-opacity hover:opacity-80 active:scale-95"
        >
          <Icon name="notifications" size={26} />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-destructive" />
        </button>
      </div>
    </header>
  );
}

export function SubPageHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 bg-secondary/80 backdrop-blur">
      <div className="mx-auto flex max-w-[440px] items-center gap-3 px-5 py-4">
        <button
          onClick={() => window.history.back()}
          aria-label="Retour"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition-opacity hover:opacity-80 active:scale-95"
        >
          <Icon name="arrow_back" />
        </button>
        <h1 className="flex-1 truncate font-display text-lg font-bold text-primary">
          {title}
        </h1>
      </div>
    </header>
  );
}