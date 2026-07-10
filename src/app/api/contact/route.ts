import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data-access/config";

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  locale: string;
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { name, email, phone, company, message, locale } = payload;
  if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  let dbError: unknown = null;
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      phone,
      company: company ?? null,
      message,
      locale: locale ?? "vi",
    });
    dbError = error;
  } else {
    console.info("[contact] Supabase chưa được cấu hình — bỏ qua lưu database.", payload);
  }

  let emailError: unknown = null;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "contact@dtca.vn";
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "DTCA Website <website@dtca.vn>",
        to: toEmail,
        replyTo: email,
        subject: `[Website] Yêu cầu tư vấn từ ${name}`,
        text: [
          `Họ tên: ${name}`,
          `Điện thoại: ${phone}`,
          `Email: ${email}`,
          `Công ty: ${company || "-"}`,
          `Ngôn ngữ: ${locale}`,
          "",
          "Nội dung:",
          message,
        ].join("\n"),
      });
    } catch (error) {
      emailError = error;
    }
  } else {
    console.info("[contact] RESEND_API_KEY chưa được cấu hình — bỏ qua gửi email.", payload);
  }

  if (dbError) {
    console.error("[contact] Lỗi lưu Supabase:", dbError);
  }
  if (emailError) {
    console.error("[contact] Lỗi gửi email:", emailError);
  }

  // Chỉ báo lỗi cho người dùng khi CẢ HAI kênh (lưu DB và gửi email) đều được cấu hình nhưng cùng thất bại.
  if (dbError && emailError) {
    return NextResponse.json({ error: "submit_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
