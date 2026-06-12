import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { Icon } from "@/components/icon";
import { children } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/log/note")({
  head: () => ({
    meta: [
      { title: "Pedagogical Note — Digital Sanctuary" },
      { name: "description", content: "Capter un moment de développement ou de découverte." },
    ],
  }),
  component: NotePage,
});

const domains = ["Cognitive", "Social-Emotional", "Motor", "Language", "Creative"];

function NotePage() {
  const [tagged, setTagged] = useState<string[]>([children[0]?.id].filter(Boolean) as string[]);
  const [active, setActive] = useState<string[]>(["Cognitive", "Social-Emotional"]);
  const [text, setText] = useState("");

  function toggleChild(id: string) {
    setTagged((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));
  }
  function toggleDomain(d: string) {
    setActive((t) => (t.includes(d) ? t.filter((x) => x !== d) : [...t, d]));
  }

  return (
    <>
      <SubPageHeader title="Pedagogical Note" />
      <Page>
        <p className="text-sm text-muted-foreground">
          Capture a meaningful moment of development or discovery.
        </p>

        <section className="mt-5 rounded-3xl bg-card p-5 shadow-card">
          <h3 className="font-display text-base font-bold">Context</h3>

          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Children present
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {children.slice(0, 6).map((c) => {
                const on = tagged.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => toggleChild(c.id)}
                    className={
                      "flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm transition-colors " +
                      (on
                        ? "border-primary bg-secondary text-foreground"
                        : "border-border bg-card text-muted-foreground")
                    }
                  >
                    <img src={c.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
                    <span className="font-medium">{c.firstName}</span>
                    {on && <Icon name="check" size={14} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Learning domains
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {domains.map((d) => {
                const on = active.includes(d);
                return (
                  <button
                    key={d}
                    onClick={() => toggleDomain(d)}
                    className={
                      "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors " +
                      (on
                        ? "bg-accent text-accent-foreground"
                        : "border border-dashed border-border text-muted-foreground")
                    }
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-4 overflow-hidden rounded-3xl bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border/60 bg-secondary/50 px-4 py-2">
            <div className="flex gap-1 text-muted-foreground">
              <button className="rounded p-1.5 hover:bg-card" aria-label="Bold"><Icon name="format_bold" size={18} /></button>
              <button className="rounded p-1.5 hover:bg-card" aria-label="Italic"><Icon name="format_italic" size={18} /></button>
              <button className="rounded p-1.5 hover:bg-card" aria-label="List"><Icon name="format_list_bulleted" size={18} /></button>
              <button className="rounded p-1.5 hover:bg-card" aria-label="Attach"><Icon name="attach_file" size={18} /></button>
            </div>
            <button className="flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-primary">
              <Icon name="auto_awesome" size={14} /> Enhance
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Describe the observation here. What did the child do? Focus on objective details…"
            className="w-full resize-none bg-transparent p-5 text-sm leading-relaxed placeholder:text-muted-foreground/70 focus:outline-none"
          />
        </section>

        <section className="mt-4 flex gap-3 overflow-x-auto pb-2">
          <button className="flex h-24 w-24 flex-shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-border bg-secondary/50 text-muted-foreground">
            <Icon name="add_a_photo" size={22} />
            <span className="text-[10px] font-semibold">Add Photo</span>
          </button>
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-secondary">
            <img alt="" src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=300" className="h-full w-full object-cover" />
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-secondary/60 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-primary">
              <Icon name="auto_awesome" filled size={20} />
            </div>
            <div>
              <h3 className="font-display text-base font-bold">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Frameworks & parent-friendly rephrasing.</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <button className="flex w-full items-start gap-3 rounded-2xl bg-card p-4 text-left shadow-card">
              <Icon name="school" size={20} className="mt-0.5 text-primary" />
              <div>
                <p className="text-sm font-semibold">Identify Milestones</p>
                <p className="text-xs text-muted-foreground">Map to early years framework.</p>
              </div>
            </button>
            <button className="flex w-full items-start gap-3 rounded-2xl bg-card p-4 text-left shadow-card">
              <Icon name="family_restroom" size={20} className="mt-0.5 text-primary" />
              <div>
                <p className="text-sm font-semibold">Draft Parent Message</p>
                <p className="text-xs text-muted-foreground">Warm, parent-friendly version.</p>
              </div>
            </button>
          </div>
        </section>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 rounded-full bg-secondary py-3 text-sm font-semibold text-foreground">
            Save as Draft
          </button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="flex-[2] rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-card"
          >
            Publish Note
          </motion.button>
        </div>
      </Page>
    </>
  );
}