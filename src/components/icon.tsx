export function Icon({
  name,
  filled,
  className,
  size = 24,
}: {
  name: string;
  filled?: boolean;
  className?: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined${filled ? " filled" : ""} ${className ?? ""}`}
      style={{ fontSize: size }}
    >
      {name}
    </span>
  );
}