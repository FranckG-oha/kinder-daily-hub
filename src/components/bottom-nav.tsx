import { Link } from "@tanstack/react-router";
import {
  LayoutGrid,
  Users,
  Image as ImageIcon,
  MessageCircle,
  Plus,
  type LucideIcon,
} from "lucide-react";

type Tab = { to: string; label: string; icon: LucideIcon; exact: boolean };

const left: Tab[] = [
  { to: "/", label: "Today", icon: LayoutGrid, exact: true },
  { to: "/children", label: "My Class", icon: Users, exact: false },
];
const right: Tab[] = [
  { to: "/gallery", label: "Gallery", icon: ImageIcon, exact: false },
  { to: "/messages", label: "Messages", icon: MessageCircle, exact: false },
];

function TabLink({ tab }: { tab: Tab }) {
  const { to, label, icon: Ico, exact } = tab;
  return (
    <Link
      to={to}
      aria-label={label}
      activeOptions={{ exact }}
      className="flex flex-1 flex-col items-center justify-center gap-1 py-2 text-foreground/45 transition-colors data-[status=active]:text-primary"
    >
      {({ isActive }) => (
        <>
          <Ico
            size={24}
            strokeWidth={isActive ? 2.25 : 1.75}
            fill={isActive ? "currentColor" : "none"}
            fillOpacity={isActive ? 0.15 : 0}
          />
          <span
            className={
              "text-[10px] font-semibold tracking-tight " +
              (isActive ? "" : "opacity-80")
            }
          >
            {label}
          </span>
          <span
            aria-hidden
            className={
              "h-0.5 w-6 rounded-full " +
              (isActive ? "bg-primary" : "bg-transparent")
            }
          />
        </>
      )}
    </Link>
  );
}

export function BottomNav() {
  return (
    <nav
      aria-label="Navigation principale"
      className="fixed bottom-0 left-1/2 z-30 w-full max-w-[440px] -translate-x-1/2 border-t border-border/60 bg-card/80 px-2 pb-6 pt-2 backdrop-blur-xl shadow-[var(--shadow-nav)]"
    >
      <div className="relative flex items-stretch justify-between gap-1">
        {left.map((t) => (
          <TabLink key={t.to} tab={t} />
        ))}

        {/* Center FAB — Quick Log */}
        <div className="flex w-16 items-start justify-center">
          <Link
            to="/quick-log"
            aria-label="Quick Log"
            className="-mt-7 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_24px_-6px_rgba(45,107,228,0.55)] ring-4 ring-card transition-transform active:scale-95"
          >
            <Plus size={28} strokeWidth={2.5} />
          </Link>
        </div>

        {right.map((t) => (
          <TabLink key={t.to} tab={t} />
        ))}
      </div>
    </nav>
  );
}