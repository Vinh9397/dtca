import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "color" | "white";
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/DTCA_logo.png"
      alt="DTCA Logo"
      width={176}
      height={48}
      className={className}
      priority
    />
  );
}
