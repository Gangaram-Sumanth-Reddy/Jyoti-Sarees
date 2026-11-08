import Link from "next/link";
import { honeypotFieldName } from "@/lib/form-submission";
import { privacyRoutes } from "@/lib/privacy-config";
import { cn } from "@/lib/cn";

type FormPrivacyNoticeProps = {
  className?: string;
  /** Open the policy in a new tab so in-progress input (e.g. in a dialog) is not lost. */
  openInNewTab?: boolean;
};

/** One-line privacy note shown next to a form's submit button. */
export function FormPrivacyNotice({
  className,
  openInNewTab,
}: FormPrivacyNoticeProps) {
  return (
    <p className={cn("flex items-center justify-center gap-1.5 text-xs leading-snug text-muted", className)}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0 text-navy"
      >
        <path
          d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="m9 12 2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        Your details are safe with us. Read our{" "}
        <Link
          href={privacyRoutes.policy}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener" : undefined}
          className="font-semibold text-navy underline decoration-border-strong underline-offset-2 transition-colors hover:text-accent"
        >
          Privacy Policy
        </Link>
        .
      </span>
    </p>
  );
}

type HoneypotFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

/** Visually hidden spam trap; people never see or fill it. */
export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
      <label>
        Website
        <input
          type="text"
          name={honeypotFieldName}
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    </div>
  );
}
