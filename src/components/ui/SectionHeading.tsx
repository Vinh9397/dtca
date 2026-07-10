interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-blue">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-navy-950">{title}</h2>
      {description ? (
        <p className="mt-3 text-base text-slate-600 leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
