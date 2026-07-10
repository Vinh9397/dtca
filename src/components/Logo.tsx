interface LogoProps {
  className?: string;
  variant?: "color" | "white";
}

/**
 * Wordmark DTCA tái tạo dạng vector từ logo trong hồ sơ năng lực (4 khối màu D-T-C-A).
 * Đây là bản dựng tạm thời — thay bằng file logo gốc (SVG/AI) khi công ty cung cấp.
 */
export function Logo({ className, variant = "color" }: LogoProps) {
  const letters: { char: string; color: string }[] =
    variant === "white"
      ? [
          { char: "D", color: "#ffffff" },
          { char: "T", color: "#ffffff" },
          { char: "C", color: "#ffffff" },
          { char: "A", color: "#ffffff" },
        ]
      : [
          { char: "D", color: "var(--color-accent-blue)" },
          { char: "T", color: "var(--color-accent-red)" },
          { char: "C", color: "var(--color-accent-yellow)" },
          { char: "A", color: "var(--color-accent-green)" },
        ];

  return (
    <svg
      viewBox="0 0 176 48"
      className={className}
      role="img"
      aria-label="DTCA"
    >
      {letters.map((letter, index) => (
        <g key={letter.char} transform={`translate(${index * 44}, 0)`}>
          <rect
            x="2"
            y="2"
            width="36"
            height="44"
            rx="8"
            fill={letter.color}
            opacity={variant === "white" ? 0.15 : 1}
          />
          <text
            x="20"
            y="34"
            textAnchor="middle"
            fontFamily="var(--font-geist-sans), Arial, sans-serif"
            fontWeight="800"
            fontSize="26"
            fill={variant === "white" ? "#ffffff" : "#ffffff"}
          >
            {letter.char}
          </text>
        </g>
      ))}
    </svg>
  );
}
