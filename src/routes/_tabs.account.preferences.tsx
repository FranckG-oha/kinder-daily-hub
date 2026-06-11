import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";

export const Route = createFileRoute("/_tabs/account/preferences")({
  head: () => ({
    meta: [
      { title: "Préférences — Éducatrices" },
      { name: "description", content: "Langue, notifications et préférences de l'application." },
    ],
  }),
  component: PreferencesPage,
});

function PreferencesPage() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [notif, setNotif] = useState(true);
  const [quiet, setQuiet] = useState(false);

  return (
    <>
      <SubPageHeader title="Préférences" />
      <Page>
        <h1 className="sr-only">Préférences</h1>

        <section className="rounded-2xl border border-border/60 bg-card p-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Langue
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(["fr", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={
                  "rounded-xl border px-3 py-2 text-sm font-semibold " +
                  (lang === l
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground")
                }
              >
                {l === "fr" ? "Français" : "English"}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-4 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-card">
          <Toggle label="Notifications push" checked={notif} onChange={setNotif} />
          <Toggle label="Mode silencieux (sieste)" checked={quiet} onChange={setQuiet} />
        </section>
      </Page>
    </>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between px-4 py-3">
      <span className="text-sm font-medium">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={
          "relative h-6 w-11 rounded-full transition-colors " +
          (checked ? "bg-primary" : "bg-secondary")
        }
      >
        <span
          className={
            "absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-all " +
            (checked ? "left-[22px]" : "left-0.5")
          }
        />
      </button>
    </label>
  );
}