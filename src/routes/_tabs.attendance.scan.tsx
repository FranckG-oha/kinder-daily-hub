import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { QrCode, ZapOff, RotateCw, Check } from "lucide-react";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { children, getChild } from "@/lib/mock";

// T-08 — QR Check-in (mock camera)
export const Route = createFileRoute("/_tabs/attendance/scan")({
  head: () => ({
    meta: [
      { title: "QR Check-in — Digital Sanctuary" },
      { name: "description", content: "Pointage rapide par QR code." },
    ],
  }),
  component: Scan,
});

function Scan() {
  const router = useRouter();
  const [scanned, setScanned] = useState<string | null>(null);

  useEffect(() => {
    if (scanned) return;
    const t = setTimeout(() => {
      const pick = children[Math.floor(Math.random() * children.length)];
      setScanned(pick.id);
    }, 1800);
    return () => clearTimeout(t);
  }, [scanned]);

  const child = scanned ? getChild(scanned) : null;

  return (
    <>
      <SubPageHeader title="QR Check-in" />
      <Page>
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-foreground">
          {/* viewfinder */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative h-3/5 w-3/5">
              <Corner pos="top-0 left-0 border-l-4 border-t-4 rounded-tl-3xl" />
              <Corner pos="top-0 right-0 border-r-4 border-t-4 rounded-tr-3xl" />
              <Corner pos="bottom-0 left-0 border-l-4 border-b-4 rounded-bl-3xl" />
              <Corner pos="bottom-0 right-0 border-r-4 border-b-4 rounded-br-3xl" />
              {!scanned && (
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-primary shadow-[0_0_24px_var(--primary)] animate-pulse" />
              )}
              {!scanned && (
                <QrCode size={64} className="absolute inset-0 m-auto text-card/30" />
              )}
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-card/20 text-card backdrop-blur" aria-label="Flash">
              <ZapOff size={18} />
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-card/20 text-card backdrop-blur" aria-label="Switch camera">
              <RotateCw size={18} />
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {scanned ? "QR détecté" : "Approchez le QR du parent dans le cadre."}
        </p>

        {child && (
          <div className="mt-4 rounded-3xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <img src={child.avatar} alt="" className="h-12 w-12 rounded-full bg-secondary" />
              <div className="flex-1">
                <p className="font-display text-base font-bold">
                  {child.firstName} {child.lastName}
                </p>
                <p className="text-xs text-muted-foreground">Cycle {child.cycle === "CYCLE_0" ? "0" : "1"}</p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success-tint text-[color:var(--status-present)]">
                <Check size={18} strokeWidth={2.25} />
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setScanned(null)}
                className="flex-1 rounded-full bg-secondary py-3 text-sm font-bold text-primary"
              >
                Scanner suivant
              </button>
              <button
                onClick={() => router.navigate({ to: "/attendance" })}
                className="flex-1 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground"
              >
                Confirmer
              </button>
            </div>
          </div>
        )}
      </Page>
    </>
  );
}

function Corner({ pos }: { pos: string }) {
  return <span aria-hidden className={`absolute h-6 w-6 border-primary ${pos}`} />;
}