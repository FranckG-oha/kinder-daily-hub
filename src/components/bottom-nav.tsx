import { Link } from "@tanstack/react-router";
import { Home, Users, FileText, MessageCircle, User } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { to: "/", label: "Today", Icon: Home, exact: true },
  { to: "/children", label: "Enfants", Icon: Users, exact: false },
  { to: "/reports", label: "Rapports", Icon: FileText, exact: false },
  { to: "/messages", label: "Messages", Icon: MessageCircle, exact: false },
  { to: "/account", label: "Compte", Icon: User, exact: false },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Navigation principale"
      className="sticky bottom-0 z-30 border-t border-border/60 bg-background/95 backdrop-blur"
    >
      <ul className="mx-auto flex max-w-[440px] items-stretch justify-between px-2 py-1.5">
        {items.map(({ to, label, Icon, exact }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              aria-label={label}
              activeOptions={{ exact }}
              className="group flex flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-muted-foreground transition-colors data-[status=active]:text-primary"
            >
              {({ isActive }) => (
                <>
                  <motion.span
                    whileTap={{ scale: 0.9 }}
                    className="relative flex h-7 w-7 items-center justify-center"
                  >
                    <Icon className="h-5 w-5" />
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-1 h-1 w-1 rounded-full bg-primary"
                      />
                    )}
                  </motion.span>
                  <span className="text-[10px] font-medium">{label}</span>
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}