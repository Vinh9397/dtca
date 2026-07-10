import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "outline" | "outlineLight";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-navy-700 text-white hover:bg-navy-800 focus-visible:outline-navy-700",
  secondary:
    "bg-accent-yellow text-navy-950 hover:brightness-95 focus-visible:outline-accent-yellow",
  outline:
    "border border-navy-300 text-navy-800 hover:bg-navy-50 focus-visible:outline-navy-700",
  outlineLight:
    "border border-white/40 text-white hover:bg-white/10 focus-visible:outline-white",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

interface ButtonAsLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
}

export function ButtonLink({ variant = "primary", className, ...props }: ButtonAsLinkProps) {
  return (
    <Link
      className={`${baseClasses} ${variantClasses[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}

interface ButtonAsExternalLinkProps extends ComponentProps<"a"> {
  variant?: Variant;
}

export function ExternalButtonLink({
  variant = "primary",
  className,
  ...props
}: ButtonAsExternalLinkProps) {
  return (
    <a
      className={`${baseClasses} ${variantClasses[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}
