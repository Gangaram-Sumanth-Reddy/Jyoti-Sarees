import type { ComponentProps } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "border border-transparent bg-button-primary text-button-primary-text hover:bg-button-primary-hover",
  secondary:
    "border border-navy bg-button-secondary text-button-secondary-text hover:bg-button-secondary-hover hover:text-white",
} as const;

const sizes = {
  sm: "min-h-10 px-6 text-small",
  md: "min-h-11 px-6 text-button",
  lg: "min-h-12 px-8 text-button",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-pill font-semibold tracking-[0.04em] transition-colors duration-200 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, size, className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}

type ExternalButtonLinkProps = ComponentProps<"a"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ExternalButtonLink({
  variant = "primary",
  size = "md",
  className,
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}: ExternalButtonLinkProps) {
  return (
    <a
      className={buttonClasses(variant, size, className)}
      target={target}
      rel={rel}
      {...props}
    />
  );
}
