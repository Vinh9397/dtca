import type { WorkforceRow } from "@/types";

// Nguồn: Hồ sơ năng lực DTCA 2026, trang 02-05.
export const companyInfo = {
  nameVi: "CÔNG TY TNHH THƯƠNG MẠI VÀ KỸ THUẬT DTCA",
  nameEn: "DTCA TRADING AND TECHNICAL COMPANY LIMITED",
  shortName: "DTCA",
  addressVi: "Xóm 9, Thôn Yên Ngưu, Xã Đại Thanh, Thành phố Hà Nội",
  addressEn: "Xom 9, Yen Ngu Hamlet, Dai Thanh Commune, Hanoi",
  officeVi: "Lô 10, DV 5, Khu đô thị Tây Nam Linh Đàm, Hoàng Liệt, Hà Nội",
  officeEn: "Lot 10, DV 5, Tay Nam Linh Dam Urban Area, Hoang Liet, Hanoi",
  hotline: "0961.282.818",
  email: "contact@dtca.vn",
  taxCode: "0110726852",
  representativeVi: "Đoàn Thị Thu Thảo",
  positionVi: "Giám đốc",
  positionEn: "Director",
  website: "dtca.vn",
};

export const workforce: WorkforceRow[] = [
  { role: { vi: "Kỹ sư quản lý dự án", en: "Project management engineers" }, count: 2 },
  { role: { vi: "Kỹ sư thiết kế dự án", en: "Project design engineers" }, count: 2 },
  { role: { vi: "Kỹ sư thông tin, viễn thông", en: "Telecommunications engineers" }, count: 5 },
  { role: { vi: "Kỹ sư tự động hóa", en: "Automation engineers" }, count: 6 },
  { role: { vi: "Kỹ sư hệ thống điện", en: "Power system engineers" }, count: 6 },
  { role: { vi: "Nhân viên hành chính", en: "Administrative staff" }, count: 3 },
];

export const totalWorkforce = workforce.reduce((sum, row) => sum + row.count, 0);

export const orgChart = {
  root: { vi: "Giám đốc", en: "Director" },
  branches: [
    {
      titleVi: "Ban Quản lý Nhân sự",
      titleEn: "Human Resources Management Board",
      children: [{ vi: "Phòng Nhân sự", en: "Human Resources Department" }, { vi: "Quản lý Dự án", en: "Project Management" }],
    },
    {
      titleVi: "Ban Quản lý Tài chính - Kế toán",
      titleEn: "Finance & Accounting Management Board",
      children: [
        { vi: "Kế toán Tổng hợp", en: "General Accounting" },
        { vi: "Phòng Marketing", en: "Marketing Department" },
        { vi: "Phòng Tư vấn và Phát triển", en: "Consulting & Development Department" },
      ],
    },
    {
      titleVi: "Ban Thiết kế - Thi công",
      titleEn: "Design & Construction Board",
      children: [{ vi: "Phòng Kỹ thuật", en: "Technical Department" }, { vi: "Xưởng Thi công", en: "Workshop" }],
    },
  ],
};
