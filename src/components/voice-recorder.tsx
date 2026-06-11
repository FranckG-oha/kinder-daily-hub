import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Square } from "lucide-react";

type Lang = "fr-FR" | "en-US" | "es-ES" | "ar-SA";
const langs: { v: Lang; l: string }[] = [
  { v: "fr-FR", l: "FR" },
  { v: "en-US", l: "EN" },
  { v: "es-ES", l: "ES" },
  { v: "ar-SA", l: "AR" },
];

export function VoiceRecorder({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [recording, setRecording] = useState(false);
  const [lang, setLang] = useState<Lang>("fr-FR");
  const [supported, setSupported] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR: any =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setSupported(Boolean(SR));
  }, []);

  function toggle() {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR: any =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    if (recording) {
      recRef.current?.stop();
      setRecording(false);
      return;
    }
    const rec = new SR();
    rec.lang = lang;
    rec.interimResults = true;
    rec.continuous = true;
    let buffer = value ? value + " " : "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (ev: any) => {
      let interim = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const t = ev.results[i][0].transcript;
        if (ev.results[i].isFinal) buffer += t + " ";
        else interim += t;
      }
      onChange((buffer + interim).trim());
    };
    rec.onend = () => setRecording(false);
    rec.start();
    recRef.current = rec;
    setRecording(true);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={toggle}
          disabled={!supported}
          aria-label={recording ? "Arrêter l'enregistrement" : "Démarrer l'enregistrement"}
          className={
            "flex h-12 w-12 items-center justify-center rounded-full text-primary-foreground transition-colors " +
            (recording ? "bg-status-incident animate-pulse" : "bg-primary") +
            (!supported ? " opacity-50" : "")
          }
        >
          {recording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </motion.button>
        <div className="flex flex-1 gap-1 rounded-full bg-secondary p-1">
          {langs.map((l) => (
            <button
              type="button"
              key={l.v}
              onClick={() => setLang(l.v)}
              className={
                "flex-1 rounded-full px-2 py-1 text-xs font-semibold transition-colors " +
                (lang === l.v
                  ? "bg-card text-foreground shadow-card"
                  : "text-muted-foreground")
              }
            >
              {l.l}
            </button>
          ))}
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder={
          supported
            ? "Appuyez sur le micro et parlez — la transcription apparaît ici…"
            : "Reconnaissance vocale non supportée sur ce navigateur. Vous pouvez taper la note."
        }
        className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
      />
    </div>
  );
}