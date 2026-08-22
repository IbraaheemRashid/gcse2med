import Link from "next/link";
import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary:
    "bg-white text-brand-700 ring-1 ring-inset ring-brand-200 hover:bg-brand-50 hover:ring-brand-300",
  // Yellow needs dark text to clear WCAG AA — never white on accent.
  accent: "bg-accent-300 text-ink-900 hover:bg-accent-400",
  ghost: "text-brand-700 hover:bg-brand-50",
  inverse: "bg-white text-brand-800 hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[15px]",
  lg: "px-7 py-3.5 text-base",
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
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
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
