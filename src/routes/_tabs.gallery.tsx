import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Page } from "@/components/page";
import { children } from "@/lib/mock";

// T-32 — Class Gallery (stub for Lot 0; full version in Lot 5)
export const Route = createFileRoute("/_tabs/gallery")({
  head: () => ({
    meta: [
      { title: "Class Gallery — Digital Sanctuary" },
      { name: "description", content: "Toutes les photos partagees de la classe." },
    ],
  }),
  component: GalleryPage,
});

const seed = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
  "https://images.unsplash.com/photo-1587616211892-f743fcca64f1?w=600",
  "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=600",
  "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600",
  "https://images.unsplash.com/photo-1503602642458-232111445657?w=600",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600",
];

function GalleryPage() {
  return (
    <>
      <AppHeader />
      <Page>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight">
              Class Gallery
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {seed.length} photos · {children.length} children
            </p>
          </div>
          <Link
            to="/log/photo"
            aria-label="Take photo"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card active:scale-95"
          >
            <Camera size={20} />
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-1.5">
          {seed.map((src, i) => (
            <button
              key={i}
              className="aspect-square overflow-hidden rounded-xl bg-secondary"
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </Page>
    </>
  );
}