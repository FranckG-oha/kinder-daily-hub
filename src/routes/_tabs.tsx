import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/bottom-nav";

export const Route = createFileRoute("/_tabs")({
  component: TabsLayout,
});

function TabsLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <div className="flex-1">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}