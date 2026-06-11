import { Link } from "@tanstack/react-router";
import { Icon } from "./icon";

const left = [
  { to: "/", label: "Overview", icon: "dashboard", exact: true },
  { to: "/classes", label: "Classes", icon: "groups", exact: false },
] as const;

const right = [
  { to: "/evaluations", label: "Evaluations", icon: "fact_check", exact: false },
  { to: "/comms", label: "Comms", icon: "chat_bubble", exact: false },
] as const;

function NavItem({
  to,
  label,
  icon,
  exact,
}: {
  to: string;
  label: string;
  icon: string;
  exact: boolean;
}) {
  return (
    <Link
      to={to}
      aria-label={label}
      activeOptions={{ exact }}
      className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-1.5 text-foreground/45 transition-all active:scale-95 data-[status=active]:text-primary"
    >
      {({ isActive }) => (
        <>
          <Icon name={icon} filled={isActive} size={22} />
          <span className="text-[9px] font-bold uppercase tracking-wide">{label}</span>
        </>
      )}
    </Link>
  );
}

export function BottomNav() {
  return (
    <nav
      aria-label="Navigation principale"
      className="fixed bottom-0 left-1/2 z-30 w-full max-w-[440px] -translate-x-1/2 rounded-t-[2rem] bg-card/90 px-3 pb-6 pt-3 backdrop-blur-xl shadow-[var(--shadow-nav)]"
    >
      <div className="flex items-center justify-between gap-1">
        {left.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}

        <div className="flex flex-1 justify-center">
          <Link
            to="/add"
            aria-label="Quick action"
            className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_20px_-4px_color-mix(in_oklab,var(--primary)_60%,transparent)] transition-transform active:scale-95"
          >
            <Icon name="add" filled size={28} />
          </Link>
        </div>

        {right.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </div>
    </nav>
  );
}
