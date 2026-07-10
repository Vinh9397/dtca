"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      message: String(formData.get("message") ?? ""),
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-navy-800">
            {t("name")} *
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1.5 w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-navy-800">
            {t("phone")} *
          </label>
          <input
            id="phone"
            name="phone"
            required
            className="mt-1.5 w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-navy-800">
            {t("email")} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="company" className="text-sm font-medium text-navy-800">
            {t("company")}
          </label>
          <input
            id="company"
            name="company"
            className="mt-1.5 w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-navy-800">
          {t("message")} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-md bg-navy-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60"
      >
        {status === "submitting" ? t("sending") : t("send")}
      </button>

      {status === "success" ? (
        <p className="text-sm font-medium text-accent-green">{t("success")}</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm font-medium text-accent-red">{t("error")}</p>
      ) : null}
    </form>
  );
}
