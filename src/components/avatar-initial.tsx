import { cn } from "@/lib/utils";

const palette = [
  "bg-mood-happy/30 text-foreground",
  "bg-mood-calm/30 text-foreground",
  "bg-mood-tired/30 text-foreground",
  "bg-accent/40 text-accent-foreground",
  "bg-primary/20 text-primary",
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function AvatarInitial({
  name,
  size = 40,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const tone = palette[hash(name) % palette.length];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold",
        tone,
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </span>
  );
}