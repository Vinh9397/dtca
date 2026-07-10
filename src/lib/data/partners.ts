import type { Partner } from "@/types";

// Đối tác cung cấp thiết bị được nhắc tới trong Hồ sơ năng lực DTCA 2026 (trang 02, 03).
// Đây là danh sách các hãng thiết bị DTCA cung cấp/tích hợp — không phải quan hệ phân phối độc quyền.
export const partners: Partner[] = [
  { id: "phoenix-contact", name: "Phoenix Contact", logo: "/images/partners/phoenix-contact.svg" },
  { id: "siemens", name: "Siemens", logo: "/images/partners/siemens.svg" },
  { id: "mitsubishi", name: "Mitsubishi Electric", logo: "/images/partners/mitsubishi.svg" },
  { id: "abb", name: "ABB", logo: "/images/partners/abb.svg" },
  { id: "sick", name: "Sick", logo: "/images/partners/sick.svg" },
  { id: "taikai", name: "Taikai", logo: "/images/partners/taikai.svg" },
  { id: "chint", name: "Chint", logo: "/images/partners/chint.svg" },
];
