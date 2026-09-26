"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { controlClassName } from "@/components/ui/Input";
import { cn } from "@/lib/cn";
import { filterSuggestions } from "@/lib/india-locations";

type SearchableFieldProps = {
  id?: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  minChars?: number;
};

export function SearchableField({
  id,
  name,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required,
  disabled,
  minChars = 1,
}: SearchableFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? `${name}-${generatedId}`;
  const listId = `${fieldId}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const suggestions = useMemo(() => {
    if (value.trim().length < minChars) return [];
    return filterSuggestions(options, value, 8);
  }, [options, value, minChars]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function selectOption(option: string) {
    onChange(option);
    setOpen(false);
    setActiveIndex(-1);
  }

  return (
    <div ref={rootRef} className="relative flex w-full flex-col gap-2">
      <label
        htmlFor={fieldId}
        className="text-small font-semibold tracking-[0.04em] text-navy"
      >
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      <input
        id={fieldId}
        name={name}
        role="combobox"
        aria-expanded={open && suggestions.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-invalid={Boolean(error) || undefined}
        autoComplete="off"
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
            setOpen(true);
            return;
          }
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((current) =>
              Math.min(current + 1, suggestions.length - 1),
            );
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((current) => Math.max(current - 1, 0));
          } else if (event.key === "Enter" && activeIndex >= 0) {
            event.preventDefault();
            const option = suggestions[activeIndex];
            if (option) selectOption(option);
          } else if (event.key === "Escape") {
            setOpen(false);
            setActiveIndex(-1);
          }
        }}
        className={cn(controlClassName)}
      />
      {error ? (
        <p className="text-small font-semibold text-navy-deep" role="alert">
          {error}
        </p>
      ) : null}

      {open && suggestions.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute top-[calc(100%-0.15rem)] z-30 mt-1 max-h-52 w-full overflow-auto rounded-md border border-border bg-white py-1 shadow-card"
        >
          {suggestions.map((option, index) => (
            <li key={option} role="option" aria-selected={index === activeIndex}>
              <button
                type="button"
                className={cn(
                  "flex w-full px-3 py-2 text-left text-small text-rich-black transition-colors",
                  index === activeIndex
                    ? "bg-cream text-navy"
                    : "hover:bg-cream/80",
                )}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectOption(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
