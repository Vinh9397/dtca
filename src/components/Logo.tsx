import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "color" | "white";
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/DTCA.png"
      alt="DTCA Logo"
      width={352}
      height={96}
      className={className}
      priority
    />
  );
}
