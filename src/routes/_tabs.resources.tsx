import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { Icon } from "@/components/icon";

export const Route = createFileRoute("/_tabs/resources")({
  head: () => ({
    meta: [
      { title: "Resources Library — Digital Sanctuary" },
      { name: "description", content: "Plans de leçons, ressources pédagogiques et fichiers partagés." },
    ],
  }),
  component: ResourcesPage,
});

type Folder = {
  name: string;
  files: number;
  updated: string;
  icon: string;
  bg: string;
  fg: string;
};

const folders: Folder[] = [
  { name: "Storytelling & Phonics", files: 42, updated: "2 hrs ago", icon: "menu_book", bg: "bg-primary/15", fg: "text-primary" },
  { name: "Creative Arts", files: 128, updated: "Yesterday", icon: "palette", bg: "bg-container-peach/60", fg: "text-on-container-peach" },
  { name: "Sensory Play", files: 15, updated: "3 days ago", icon: "toys", bg: "bg-accent/60", fg: "text-accent-foreground" },
  { name: "Motor Skills", files: 24, updated: "1 week ago", icon: "directions_run", bg: "bg-secondary", fg: "text-primary" },
];

const files = [
  { name: "Coloring_Activity_Plan.pdf", meta: "Creative Arts • 1.2 MB", color: "text-destructive", icon: "picture_as_pdf" },
  { name: "Autumn_Songs.mp3", meta: "Storytelling • 4.8 MB", color: "text-primary", icon: "music_note" },
  { name: "Sensory_Bin_Ideas.docx", meta: "Sensory Play • 320 KB", color: "text-on-container-peach", icon: "description" },
];

function ResourcesPage() {
  const [q, setQ] = useState("");

  return (
    <>
      <AppHeader />
      <Page>
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          Resources<br />Library
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Lesson plans, files & inspiration.
        </p>

        <div className="relative mt-5">
          <Icon
            name="search"
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search files, lesson plans, keywords…"
            className="w-full rounded-2xl bg-card px-4 py-3 pl-11 text-sm shadow-card placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <section className="mt-6">
          <h2 className="font-display text-xl font-bold">Folders</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {folders.map((f) => (
              <button
                key={f.name}
                className="flex flex-col justify-between gap-4 rounded-2xl bg-secondary/70 p-4 text-left transition-colors hover:bg-secondary"
              >
                <div className={"flex h-11 w-11 items-center justify-center rounded-full " + f.bg + " " + f.fg}>
                  <Icon name={f.icon} filled size={22} />
                </div>
                <div>
                  <p className="font-display text-sm font-bold leading-tight">{f.name}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {f.files} files · {f.updated}
                  </p>
                </div>
              </button>
            ))}
            <button className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card/30 p-4 text-muted-foreground">
              <Icon name="create_new_folder" size={24} />
              <span className="text-xs font-semibold">New Folder</span>
            </button>
          </div>
        </section>

        <section className="mt-7">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-xl font-bold">Recent Files</h2>
            <button className="text-xs font-semibold text-primary">View all</button>
          </div>
          <ul className="mt-3 space-y-2">
            {files.map((f) => (
              <li
                key={f.name}
                className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-card"
              >
                <div className={"flex h-10 w-10 items-center justify-center rounded-xl bg-secondary " + f.color}>
                  <Icon name={f.icon} size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{f.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{f.meta}</p>
                </div>
                <button className="rounded-full p-2 text-muted-foreground hover:bg-secondary">
                  <Icon name="download" size={18} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </Page>
    </>
  );
}