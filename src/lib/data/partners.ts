import type { Partner } from "@/types";

// Đối tác cung cấp thiết bị được nhắc tới trong Hồ sơ năng lực DTCA 2026 (trang 02, 03).
// Đây là danh sách các hãng thiết bị DTCA cung cấp/tích hợp — không phải quan hệ phân phối độc quyền.
export const partners: Partner[] = [
  { id: "phoenix-contact", name: "Phoenix Contact", logo: "/images/partners/Phoenix_contact.jpeg" },
  { id: "siemens", name: "Siemens", logo: "/images/partners/Siemens.jpg" },
  { id: "mitsubishi", name: "Mitsubishi Electric", logo: "/images/partners/Mitsubishi.png" },
  { id: "abb", name: "ABB", logo: "/images/partners/ABB.png" },
  { id: "fanox", name: "Fanox", logo: "/images/partners/Fanox.jpg" },
  { id: "robustel", name: "Robustel", logo: "/images/partners/Robustel.webp" },
  { id: "schneider", name: "Schneider Electric", logo: "/images/partners/Schneider.jpg" },
];
