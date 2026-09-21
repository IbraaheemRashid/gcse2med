import Link from "next/link";
import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ReactNode } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "inverse"
  | "onBrand"
  | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  // `align-middle` kills the baseline descender gap these leave under themselves
  // when they sit as an inline-level box in a plain block.
  // `text-center` matters for w-full buttons whose label wraps.
  "inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-full text-center align-middle " +
  "font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary:
    "bg-white text-brand-700 ring-1 ring-inset ring-brand-200 hover:bg-brand-50 hover:ring-brand-300",
  // Yellow needs dark text to clear WCAG AA — never white on accent.
  accent: "bg-accent-300 text-ink-900 hover:bg-accent-400",
  ghost: "text-brand-700 hover:bg-brand-50",
  inverse: "bg-white text-brand-800 hover:bg-brand-50",
  // Secondary actions sitting ON a coloured panel. These exist as variants
  // rather than className overrides because Tailwind resolves a bg-brand-600 /
  // bg-brand-700 clash by stylesheet order, not by the order classes are
  // written — an override here would be luck, not intent.
  onBrand: "bg-brand-700 text-white hover:bg-brand-800",
  onDark: "bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/20",
};

// On a rounded-full pill the corner radius is half the height, so horizontal
// padding BELOW that radius puts the first glyph inside the end cap's curve and
// the label stops looking like it belongs to the button. Each size therefore
// pads wider than its own radius:
//   sm 36px tall / r18 / p20   md 44px / r22 / p24   lg 52px / r26 / p32
// The explicit leading is what makes those heights predictable — `text-[15px]`
// is an arbitrary value and ships no line-height of its own, so md was
// inheriting 1.5 from body and landing on a fractional 42.5px.
const sizes: Record<Size, string> = {
  sm: "px-5 py-2 text-sm leading-5",
  md: "px-6 py-2.5 text-[15px] leading-6",
  lg: "px-8 py-3.5 text-base leading-6",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className = "",
}: Omit<CommonProps, "children">): string {
  return [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");
}

type ButtonLinkProps = CommonProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </Link>
  );
}

// React 19 passes `ref` through as a normal prop, so no forwardRef needed.
type ButtonProps = CommonProps &
  Omit<ComponentPropsWithRef<"button">, "className" | "children">;

export function Button({ variant, size, className, children, ...rest }: ButtonProps) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
