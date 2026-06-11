import { Link } from "@tanstack/react-router";
import { Icon } from "./icon";

const items = [
  { to: "/", label: "Dashboard", icon: "dashboard", exact: true },
  { to: "/calendar", label: "Calendar", icon: "calendar_today", exact: false },
  { to: "/children", label: "Children", icon: "child_care", exact: false },
  { to: "/reports", label: "Reports", icon: "assessment", exact: false },
  { to: "/profile", label: "Profile", icon: "person", exact: false },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Navigation principale"
      className="fixed bottom-0 left-1/2 z-30 w-full max-w-[440px] -translate-x-1/2 rounded-t-[2.5rem] bg-card/90 px-2 pb-6 pt-3 backdrop-blur-xl shadow-[var(--shadow-nav)]"
    >
      <ul className="flex items-stretch justify-between gap-1">
        {items.map(({ to, label, icon, exact }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              aria-label={label}
              activeOptions={{ exact }}
              className="flex flex-col items-center justify-center rounded-[1.5rem] px-2 py-2 text-foreground/50 transition-all active:scale-95 data-[status=active]:bg-[color-mix(in_oklab,var(--primary)_18%,transparent)] data-[status=active]:text-primary data-[status=active]:opacity-100"
            >
              {({ isActive }) => (
                <>
                  <Icon name={icon} filled={isActive} size={20} className="mb-0.5" />
                  <span className="text-[9px] font-semibold uppercase tracking-wide">
                    {label}
                  </span>
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}