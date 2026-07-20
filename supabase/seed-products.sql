-- Dữ liệu mẫu cho bảng products — chạy sau supabase/schema.sql nếu muốn có sẵn sản phẩm demo.
-- Có thể xóa/sửa thoải mái tại /admin/san-pham sau khi đăng nhập.

insert into public.products
  (name_vi, name_en, slug, brand, subcategory, description_vi, description_en, badge, sort_order)
values
  ('Bộ nguồn DC 24V công nghiệp', 'Industrial 24V DC Power Supply', 'bo-nguon-dc-24v-cong-nghiep', 'Phoenix Contact', 'Bộ nguồn', 'Bộ nguồn ổn định 24VDC cho tủ điều khiển và hệ thống tự động hóa.', 'Stable 24VDC power supply for control cabinets and automation systems.', 'best-sale', 100),
  ('Rơ le trung gian công nghiệp', 'Industrial Interface Relay', 'role-trung-gian-cong-nghiep', 'Phoenix Contact', 'Rơ le', 'Rơ le trung gian cách ly tín hiệu điều khiển, độ tin cậy cao.', 'Interface relay for control signal isolation, high reliability.', null, 90),
  ('PLCnext Controller', 'PLCnext Controller', 'plcnext-controller', 'Phoenix Contact', 'Controller', 'Bộ điều khiển mở, hỗ trợ PROFINET, ứng dụng trong hệ thống tự động hóa quan trọng.', 'Open controller platform supporting PROFINET for critical automation systems.', 'featured', 85),
  ('Switch mạng công nghiệp 8 cổng', '8-Port Industrial Ethernet Switch', 'switch-mang-cong-nghiep-8-cong', 'Atop Technologies', 'Switch', 'Switch Ethernet công nghiệp 8 cổng, chịu nhiệt độ khắc nghiệt.', '8-port industrial Ethernet switch built for harsh environments.', 'best-sale', 80),
  ('Bộ chuyển đổi giao thức Modbus RTU sang TCP', 'Modbus RTU to TCP Protocol Gateway', 'bo-chuyen-doi-modbus-rtu-sang-tcp', 'Atop Technologies', 'Protocol Gateway', 'Chuyển đổi giao thức Modbus RTU sang Modbus TCP/IP cho hệ thống SCADA.', 'Converts Modbus RTU to Modbus TCP/IP for SCADA systems.', null, 70),
  ('Router 4G/5G công nghiệp EX900', 'EX900 Industrial 4G/5G Router', 'router-4g-5g-cong-nghiep-ex900', 'Edgeware Technologies', 'Router 4G/5G', 'Router 4G/5G ứng dụng SCADA điện lực tự động hóa.', '4G/5G router for power grid SCADA automation applications.', 'new', 65),
  ('RTU530 Remote Terminal Unit', 'RTU530 Remote Terminal Unit', 'rtu530-remote-terminal-unit', 'Hitachi Energy', 'RTU', 'Thiết bị đầu cuối RTU cho trạm biến áp và nhà máy điện.', 'Remote terminal unit for substations and power plants.', null, 60),
  ('Phần mềm MicroSCADA SYS600', 'MicroSCADA SYS600 Software', 'phan-mem-microscada-sys600', 'Hitachi Energy', 'Phần mềm SCADA', 'Phần mềm SCADA vận hành, giám sát hệ thống điện.', 'SCADA software for power system operation and monitoring.', 'featured', 55),
  ('Ethernet Switch công nghiệp EtherWAN', 'EtherWAN Industrial Ethernet Switch', 'ethernet-switch-cong-nghiep-etherwan', 'Etherwan', 'Switch', 'Switch mạng công nghiệp bền bỉ, hỗ trợ nhiều cổng quang.', 'Rugged industrial network switch with multiple fiber ports.', null, 50),
  ('Modem 4G công nghiệp', 'Industrial 4G Modem', 'modem-4g-cong-nghiep', 'Etherwan', 'Modem 4G', 'Modem 4G kết nối SCADA từ xa cho trạm biến áp, nhà máy điện.', '4G modem for remote SCADA connectivity at substations and power plants.', 'best-sale', 45),
  ('Phần mềm ActionNet', 'ActionNet Software', 'phan-mem-actionnet', 'Spin Engenharia', 'Phần mềm', 'Phần mềm giám sát và điều khiển lưới điện phân phối.', 'Monitoring and control software for distribution grids.', null, 40),
  ('SCADA Data Gateway', 'SCADA Data Gateway', 'scada-data-gateway', 'Triangle MicroWorks', 'Phần mềm', 'Phần mềm SCADA Data Gateway hỗ trợ đa giao thức truyền thông.', 'Multi-protocol SCADA data gateway software.', null, 35),
  ('Bộ đồng bộ thời gian GPS/GNSS', 'GPS/GNSS Time Synchronization Unit', 'bo-dong-bo-thoi-gian-gps-gnss', 'Z - Thiết bị khác', null, 'Bộ đồng bộ thời gian GPS/GNSS cho hệ thống SCADA trạm biến áp.', 'GPS/GNSS time synchronization unit for substation SCADA systems.', null, 30),
  ('Thiết bị chống sét lan truyền (SPD)', 'Surge Protective Device (SPD)', 'thiet-bi-chong-set-lan-truyen-spd', 'Z - Thiết bị khác', null, 'Thiết bị chống sét lan truyền bảo vệ tủ điều khiển và thiết bị điện.', 'Surge protective device for control cabinets and electrical equipment.', null, 25)
on conflict (slug) do nothing;
