import type { ReactNode } from "react";

/**
 * Shared form field shell and input styling.
 *
 * The focus treatment is deliberately just a border colour change: the global
 * `:focus-visible` rule in globals.css already paints one accent outline on
 * every focusable thing. The old `focus:ring-2` here stacked a second blue ring
 * underneath that outline, so a focused input showed three concentric lines.
 */
export const inputClasses =
  "mt-1.5 block w-full rounded-lg border border-ink-300 bg-white px-3.5 py-2.5 " +
  "text-[15px] text-ink-900 placeholder:text-ink-400 transition-colors focus:border-brand-500";

/** Native checkbox tinted to brand. `text-*` does nothing without a forms plugin. */
export const checkboxClasses = "mt-0.5 h-4 w-4 shrink-0 rounded accent-brand-600";

export function Field({
  label,
  optional,
  className = "",
  children,
}: {
  label: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-semibold text-ink-800">
        {label}
        {optional ? (
          <span className="ml-1.5 font-normal text-ink-500">optional</span>
        ) : null}
      </span>
      {children}
    </label>
  );
}
