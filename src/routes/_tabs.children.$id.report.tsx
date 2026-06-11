import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Check, Send } from "lucide-react";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { VoiceRecorder } from "@/components/voice-recorder";
import {
  getChild,
  getReportForChild,
  moodEmoji,
  moodLabel,
  type Mood,
} from "@/lib/mock";

export const Route = createFileRoute("/_tabs/children/$id/report")({
  loader: ({ params }) => {
    const child = getChild(params.id);
    if (!child) throw notFound();
    return { child, report: getReportForChild(child.id) };
  },
  head: () => ({
    meta: [
      { title: "Rapport journalier — Éducatrices" },
      { name: "description", content: "Saisir le rapport quotidien de l'enfant : humeur, repas, sieste, activités." },
    ],
  }),
  component: ReportPage,
});

const moods: Mood[] = ["happy", "calm", "tired", "upset", "sick"];
const amounts = [
  { v: "none", l: "Rien" },
  { v: "some", l: "Un peu" },
  { v: "most", l: "Beaucoup" },
  { v: "all", l: "Tout" },
] as const;

function ReportPage() {
  const navigate = useNavigate();
  const { child, report } = Route.useLoaderData();
  const [mood, setMood] = useState<Mood>(report?.mood ?? "calm");
  const [meal, setMeal] = useState<(typeof amounts)[number]["v"]>(
    (report?.meals[0]?.amount as (typeof amounts)[number]["v"]) ?? "most",
  );
  const [napStart, setNapStart] = useState(report?.naps[0]?.start ?? "13:00");
  const [napEnd, setNapEnd] = useState(report?.naps[0]?.end ?? "14:30");
  const [activities, setActivities] = useState((report?.activities ?? []).join(", "));
  const [highlight, setHighlight] = useState(report?.highlight ?? "");
  const [voice, setVoice] = useState<string>(report?.voiceNote?.transcript ?? "");
  const [submitted, setSubmitted] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate({ to: "/reports" }), 600);
  }

  return (
    <>
      <SubPageHeader title={`Rapport · ${child.firstName}`} />
      <Page>
        <h1 className="sr-only">Rapport journalier de {child.firstName}</h1>
        <form className="space-y-5" onSubmit={submit}>
          <Card title="Humeur">
            <div className="grid grid-cols-5 gap-2">
              {moods.map((m) => (
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  key={m}
                  onClick={() => setMood(m)}
                  aria-label={moodLabel[m]}
                  className={
                    "flex flex-col items-center gap-1 rounded-xl border p-2 text-xs transition-colors " +
                    (mood === m
                      ? "border-primary bg-primary/10 font-semibold text-foreground"
                      : "border-border bg-card text-muted-foreground")
                  }
                >
                  <span className="text-xl">{moodEmoji[m]}</span>
                  {moodLabel[m]}
                </motion.button>
              ))}
            </div>
          </Card>

          <Card title="Repas du midi">
            <div className="grid grid-cols-4 gap-2">
              {amounts.map((a) => (
                <button
                  type="button"
                  key={a.v}
                  onClick={() => setMeal(a.v)}
                  className={
                    "rounded-xl border px-2 py-2 text-xs font-medium transition-colors " +
                    (meal === a.v
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground")
                  }
                >
                  {a.l}
                </button>
              ))}
            </div>
          </Card>

          <Card title="Sieste">
            <div className="flex items-center gap-3 text-sm">
              <Field label="Début">
                <input
                  type="time"
                  value={napStart}
                  onChange={(e) => setNapStart(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card px-3 py-2"
                />
              </Field>
              <Field label="Fin">
                <input
                  type="time"
                  value={napEnd}
                  onChange={(e) => setNapEnd(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card px-3 py-2"
                />
              </Field>
            </div>
          </Card>

          <Card title="Activités">
            <input
              type="text"
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              placeholder="Tour rose, chant collectif…"
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
            />
          </Card>

          <Card title="Phrase du jour pour les parents">
            <textarea
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
              rows={3}
              placeholder="Une phrase qui résume la journée…"
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
            />
          </Card>

          <Card title="Note vocale">
            <VoiceRecorder value={voice} onChange={setVoice} />
          </Card>

          <Card title="Photos">
            <button
              type="button"
              aria-label="Ajouter une photo"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-card py-6 text-sm text-muted-foreground"
            >
              <Camera className="h-5 w-5" />
              Ajouter une photo
            </button>
          </Card>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={submitted}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 font-semibold text-primary-foreground shadow-card disabled:opacity-70"
          >
            {submitted ? <Check className="h-5 w-5" /> : <Send className="h-5 w-5" />}
            {submitted ? "Rapport envoyé" : "Envoyer aux parents"}
          </motion.button>
        </form>
      </Page>
    </>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card p-4">
      <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex-1 space-y-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}