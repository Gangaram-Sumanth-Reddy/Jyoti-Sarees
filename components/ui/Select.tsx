import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { controlClassName } from "@/components/ui/Input";

type SelectProps = ComponentProps<"select"> & {
  label: string;
  hideLabel?: boolean;
  children: ReactNode;
  wrapperClassName?: string;
};

export function Select({
  id,
  label,
  hideLabel,
  className,
  wrapperClassName,
  children,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={cn("flex flex-col gap-2", wrapperClassName ?? "w-full")}>
      <label
        htmlFor={selectId}
        className={cn(
          "text-small font-semibold tracking-[0.04em] text-navy",
          hideLabel && "sr-only",
        )}
      >
        {label}
      </label>
      <select
        id={selectId}
        className={cn(controlClassName, "appearance-none pr-10", className)}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' viewBox='0 0 12 8'%3E%3Cpath stroke='%230a2472' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m1 1.5 5 5 5-5'/%3E%3C/svg%3E")`,
          backgroundPosition: "right 0.85rem center",
          backgroundRepeat: "no-repeat",
        }}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
