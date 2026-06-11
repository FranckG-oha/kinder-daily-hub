import { createFileRoute, notFound } from "@tanstack/react-router";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { MoodPill } from "@/components/badges";
import { getChild, moodEmoji, type Mood } from "@/lib/mock";

type Entry = { date: string; mood: Mood; highlight: string };

const mockHistory: Entry[] = [
  { date: "Aujourd'hui", mood: "happy", highlight: "Belle concentration sur la tour rose." },
  { date: "Hier", mood: "calm", highlight: "A choisi seul son activité du matin." },
  { date: "Lundi", mood: "tired", highlight: "Sieste plus longue qu'à l'habitude." },
  { date: "Vendredi", mood: "happy", highlight: "Première chanson en groupe sans timidité." },
  { date: "Jeudi", mood: "upset", highlight: "Difficulté à partager les jouets." },
];

export const Route = createFileRoute("/_tabs/children/$id/history")({
  loader: ({ params }) => {
    const child = getChild(params.id);
    if (!child) throw notFound();
    return { child };
  },
  head: () => ({
    meta: [
      { title: "Historique — Éducatrices" },
      { name: "description", content: "Historique des rapports journaliers de l'enfant." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const { child } = Route.useLoaderData();
  return (
    <>
      <SubPageHeader title={`Historique · ${child.firstName}`} />
      <Page>
        <h1 className="sr-only">Historique de {child.firstName}</h1>
        <ol className="relative ml-3 space-y-5 border-l border-border pl-5">
          {mockHistory.map((e, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden
                className="absolute -left-[27px] flex h-5 w-5 items-center justify-center rounded-full bg-card text-xs ring-2 ring-border"
              >
                {moodEmoji[e.mood]}
              </span>
              <div className="rounded-2xl bg-card p-4 shadow-card">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {e.date}
                  </p>
                  <MoodPill mood={e.mood} />
                </div>
                <p className="mt-2 text-sm">{e.highlight}</p>
              </div>
            </li>
          ))}
        </ol>
      </Page>
    </>
  );
}