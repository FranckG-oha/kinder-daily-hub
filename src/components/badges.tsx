import { cn } from "@/lib/utils";
import type { AttendanceStatus, Mood } from "@/lib/mock";
import { attendanceLabel, moodEmoji, moodLabel } from "@/lib/mock";

const attendanceTone: Record<AttendanceStatus, string> = {
  present: "bg-status-present/15 text-status-present",
  absent: "bg-status-absent/15 text-status-absent",
  late: "bg-status-late/20 text-foreground",
  left: "bg-status-left/15 text-status-left",
};

export function AttendanceBadge({ status, className }: { status: AttendanceStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        attendanceTone[status],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {attendanceLabel[status]}
    </span>
  );
}

const moodTone: Record<Mood, string> = {
  happy: "bg-mood-happy/25",
  calm: "bg-mood-calm/25",
  tired: "bg-mood-tired/25",
  upset: "bg-mood-upset/25",
  sick: "bg-mood-sick/25",
};

export function MoodPill({ mood, className }: { mood: Mood; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-foreground",
        moodTone[mood],
        className,
      )}
    >
      <span aria-hidden>{moodEmoji[mood]}</span>
      {moodLabel[mood]}
    </span>
  );
}

export function StatusDot({ tone, label }: { tone: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className={cn("h-2 w-2 rounded-full", tone)} aria-hidden />
      {label}
    </span>
  );
}