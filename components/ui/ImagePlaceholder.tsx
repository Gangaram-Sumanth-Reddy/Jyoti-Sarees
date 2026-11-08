import { cn } from "@/lib/cn";

type ImagePlaceholderProps = {
  label?: string;
  className?: string;
  tone?: "cream" | "navy" | "accent" | "midnight";
};

const tones = {
  cream: "bg-cream text-subtle",
  navy: "bg-navy-soft text-white/70",
  accent: "bg-accent text-white/80",
  midnight: "bg-midnight-gradient text-white/75",
} as const;

export function ImagePlaceholder({
  label = "Image placeholder",
  className,
  tone = "cream",
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center px-4 text-center text-small tracking-[0.08em] uppercase",
        tones[tone],
        className,
      )}
      aria-hidden="true"
    >
      {label}
    </div>
  );
}
