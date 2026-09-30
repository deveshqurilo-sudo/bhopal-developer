"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createEnquiryWhatsAppUrl, formValue } from "@/lib/whatsapp";

export function SiteVisitForm({ projectName }: { projectName: string }) {
  const [error, setError] = useState("");
  const dateRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const now = new Date();
    const localToday = new Date(
      now.getTime() - now.getTimezoneOffset() * 60_000,
    )
      .toISOString()
      .slice(0, 10);
    if (dateRef.current) dateRef.current.min = localToday;
  }, []);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const lines = [
      `Hello, I would like to schedule a site visit for ${projectName}.`,
      `Name: ${formValue(values, "name")}`,
      `Mobile: ${formValue(values, "mobile")}`,
      `Preferred date: ${formValue(values, "date")}`,
      `Preferred time: ${formValue(values, "time")}`,
    ];
    const message = formValue(values, "message");
    if (message) lines.push(`Message: ${message}`);

    const url = createEnquiryWhatsAppUrl(lines);
    if (!url) {
      setError(
        "WhatsApp number is not configured yet. Please contact us directly.",
      );
      return;
    }

    setError("");
    window.location.assign(url);
  }
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-soft sm:p-8">
      <form
        onSubmit={handleSubmit}
        aria-label={`Schedule a site visit for ${projectName}`}
        className="grid gap-5 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label
            htmlFor="visit-project"
            className="mb-2 block text-sm font-semibold"
          >
            Project
          </label>
          <input
            id="visit-project"
            value={projectName}
            readOnly
            className="form-field bg-secondary/60"
          />
        </div>
        <div>
          <label
            htmlFor="visit-name"
            className="mb-2 block text-sm font-semibold"
          >
            Full name *
          </label>
          <input
            id="visit-name"
            name="name"
            required
            autoComplete="name"
            maxLength={100}
            className="form-field"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="visit-mobile"
            className="mb-2 block text-sm font-semibold"
          >
            Mobile number *
          </label>
          <input
            id="visit-mobile"
            name="mobile"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            pattern="[0-9+ ]{10,14}"
            maxLength={14}
            className="form-field"
            placeholder="Your mobile number"
          />
        </div>
        <div>
          <label
            htmlFor="visit-date"
            className="mb-2 block text-sm font-semibold"
          >
            Preferred date *
          </label>
          <input
            id="visit-date"
            name="date"
            type="date"
            required
            ref={dateRef}
            className="form-field"
          />
        </div>
        <div>
          <label
            htmlFor="visit-time"
            className="mb-2 block text-sm font-semibold"
          >
            Preferred time *
          </label>
          <input
            id="visit-time"
            name="time"
            type="time"
            required
            className="form-field"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="visit-message"
            className="mb-2 block text-sm font-semibold"
          >
            Message or requirement
          </label>
          <textarea
            id="visit-message"
            name="message"
            rows={4}
            maxLength={1000}
            className="form-field"
            placeholder="Tell us what you would like to know"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:col-span-2 sm:justify-self-start"
        >
          Schedule via WhatsApp
        </button>
        <p className="text-xs text-muted-foreground sm:col-span-2">
          WhatsApp will open with your visit details. Tap Send there to finish.
        </p>
        {error && (
          <p role="alert" className="text-sm text-destructive sm:col-span-2">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
