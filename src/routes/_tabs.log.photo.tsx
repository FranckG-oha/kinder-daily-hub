import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { Icon } from "@/components/icon";
import { children } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/log/photo")({
  head: () => ({
    meta: [
      { title: "Capture Photo — Digital Sanctuary" },
      { name: "description", content: "Capturer une photo et taguer les enfants présents." },
    ],
  }),
  component: PhotoPage,
});

function PhotoPage() {
  const [tagged, setTagged] = useState<string[]>([children[0]?.id].filter(Boolean) as string[]);
  const [caption, setCaption] = useState("");

  return (
    <>
      <SubPageHeader title="Capture Photo" />
      <Page>
        <section className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-card">
          <img
            alt="Viewfinder"
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-black/30 via-transparent to-black/40 p-4">
            <div className="flex items-center justify-between">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md">
                <Icon name="flash_off" size={20} />
              </button>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                00:00
              </span>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md">
                <Icon name="cameraswitch" size={20} />
              </button>
            </div>
            <div className="flex items-center justify-center pb-3">
              <button
                aria-label="Capture"
                className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white"
              >
                <div className="h-12 w-12 rounded-full bg-white" />
              </button>
            </div>
          </div>
        </section>

        <section className="-mt-6 rounded-3xl bg-card p-5 shadow-card">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-base font-bold">Tag Children</h2>
            <span className="text-xs text-muted-foreground">{tagged.length} tagged</span>
          </div>
          <ul className="mt-3 flex gap-3 overflow-x-auto pb-1">
            {children.map((c) => {
              const on = tagged.includes(c.id);
              return (
                <li key={c.id}>
                  <button
                    onClick={() =>
                      setTagged((t) =>
                        t.includes(c.id) ? t.filter((x) => x !== c.id) : [...t, c.id],
                      )
                    }
                    className="flex min-w-[64px] flex-col items-center gap-1.5"
                  >
                    <div className="relative">
                      <img
                        src={c.avatar}
                        alt=""
                        className={
                          "h-14 w-14 rounded-full border-4 object-cover " +
                          (on ? "border-primary" : "border-card")
                        }
                      />
                      {on && (
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Icon name="check" filled size={12} />
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium">{c.firstName}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Caption (optional)
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            placeholder="What's happening in this moment?"
            className="mt-2 w-full resize-none rounded-2xl border border-border/60 bg-card p-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </section>

        <section className="mt-4 grid grid-cols-2 gap-3">
          {["Activity", "Milestone", "Snack", "Outdoors"].map((t) => (
            <button
              key={t}
              className="rounded-full bg-secondary py-2 text-xs font-semibold text-foreground"
            >
              # {t}
            </button>
          ))}
        </section>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-card"
        >
          <Icon name="send" size={18} /> Share with Parents
        </motion.button>
      </Page>
    </>
  );
}