import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/bottom-nav";

export const Route = createFileRoute("/_tabs")({
  component: TabsLayout,
});

function TabsLayout() {
  return (
    <div className="relative min-h-screen bg-background text-foreground pb-28">
      <div>
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}