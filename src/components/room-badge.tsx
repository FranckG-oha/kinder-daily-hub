import type { RoomFlower } from "@/lib/mock";
import { Icon } from "./icon";

const config: Record<RoomFlower, { icon: string; bg: string; fg: string }> = {
  sunflower: { icon: "filter_vintage", bg: "oklch(0.95 0.06 90)", fg: "oklch(0.62 0.14 75)" },
  buttercup: { icon: "local_florist", bg: "oklch(0.95 0.06 90)", fg: "oklch(0.7 0.13 90)" },
  daisy: { icon: "spa", bg: "oklch(0.94 0.03 350)", fg: "oklch(0.62 0.13 350)" },
};

export function RoomBadge({ flower, size = 48 }: { flower: RoomFlower; size?: number }) {
  const c = config[flower];
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, background: c.bg, color: c.fg }}
    >
      <Icon name={c.icon} filled size={Math.round(size * 0.5)} />
    </span>
  );
}
