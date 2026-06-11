import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { Icon } from "@/components/icon";
import { myClassroom, children, attendanceToday } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/calendar")({
  head: () => ({
    meta: [
      { title: "Today's Flow — Digital Sanctuary" },
      { name: "description", content: "Le déroulé pédagogique de la journée." },
      { property: "og:title", content: "Today's Flow — Digital Sanctuary" },
      { property: "og:description", content: "Le déroulé pédagogique de la journée." },
    ],
  }),
  component: CalendarPage,
});

const flow = [
  {
    time: "8:30",
    period: "AM",
    icon: "groups",
    title: "Morning Circle",
    body: "Welcome songs, weather check, and introducing the theme of the day: \"Autumn Leaves\".",
    chips: [
      { icon: "music_note", label: "Songs" },
      { icon: "light_mode", label: "Weather" },
    ],
  },
  {
    time: "9:15",
    period: "AM",
    icon: "palette",
    title: "Art Corner: Leaf Rubbings",
    body: "Using crayons and real leaves collected yesterday to create textured art pieces.",
    now: true,
  },
  {
    time: "10:00",
    period: "AM",
    icon: "restaurant",
    title: "Morning Snack",
    body: "Apple slices and warm milk in the cozy corner.",
  },
  {
    time: "12:00",
    period: "PM",
    icon: "bedtime",
    title: "Lunch & Nap",
    body: "Quiet time after lunch in the sunflower room.",
  },
];

function CalendarPage() {
  const present = Object.values(attendanceToday).filter((s) => s === "present").length;
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <AppHeader />
      <Page>
        <p className="text-xs font-semibold uppercase tracking-wider text-[oklch(0.55_0.16_55)]">
          {myClassroom.name}
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight tracking-tight">
          Today's Flow
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {today} • {present}/{children.length} Children Present
        </p>
        <button
          type="button"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-card active:scale-95"
        >
          <Icon name="edit" size={18} />
          Adjust Schedule
        </button>

        <ol className="mt-8 space-y-6">
          {flow.map((item) => (
            <li key={item.time}>
              <p className="mb-2">
                <span
                  className={
                    "font-display text-2xl font-extrabold " +
                    (item.now ? "text-primary" : "text-foreground")
                  }
                >
                  {item.time}
                </span>
                <span className="ml-1 text-sm font-semibold text-muted-foreground">
                  {item.period}
                </span>
              </p>
              <div
                className={
                  "rounded-3xl p-5 " +
                  (item.now ? "bg-secondary" : "bg-card shadow-card")
                }
              >
                {item.now && (
                  <span className="mb-3 inline-block rounded-full bg-card px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    Happening Now
                  </span>
                )}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon name={item.icon} filled size={22} />
                </div>
                <h2 className="mt-3 font-display text-xl font-bold">{item.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                {item.chips && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.chips.map((c) => (
                      <span
                        key={c.label}
                        className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium"
                      >
                        <Icon name={c.icon} size={14} className="text-muted-foreground" />
                        {c.label}
                      </span>
                    ))}
                  </div>
                )}
                {item.now && (
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-primary shadow-card"
                  >
                    <Icon name="photo_camera" size={16} />
                    Log Activity
                  </button>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Page>
    </>
  );
}