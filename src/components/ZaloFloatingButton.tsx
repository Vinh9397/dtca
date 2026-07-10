import { companyInfo } from "@/lib/data/company";

const zaloPhone = companyInfo.hotline.replace(/\./g, "");

export function ZaloFloatingButton() {
  return (
    <a
      href={`https://zalo.me/${zaloPhone}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Zalo"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg transition-transform hover:scale-105"
    >
      <span className="text-sm font-black tracking-tighter">Zalo</span>
    </a>
  );
}
