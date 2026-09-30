"use client";

import { useId, useState, type FormEvent } from "react";
import { createEnquiryWhatsAppUrl, formValue } from "@/lib/whatsapp";

export function EnquiryForm({
  variant = "callback",
}: {
  variant?: "quick" | "callback";
}) {
  const id = useId();
  const [error, setError] = useState("");
  const quick = variant === "quick";
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const lines = [
      quick
        ? "Hello, I have a quick project enquiry."
        : "Hello, I would like a callback about your projects.",
      `Name: ${formValue(values, "name")}`,
      `Mobile: ${formValue(values, "mobile")}`,
    ];

    const city = formValue(values, "city");
    const budget = formValue(values, "budget");
    const message = formValue(values, "message");
    if (city) lines.push(`City: ${city}`);
    if (budget) lines.push(`Preferred budget: ${budget}`);
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
    <form
      aria-label={quick ? "Quick enquiry" : "Request a callback"}
      onSubmit={handleSubmit}
      className={
        quick
          ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          : "grid gap-4 sm:grid-cols-2"
      }
    >
      <label className="sr-only" htmlFor={`${id}-name`}>
        Full Name (required)
      </label>
      <input
        id={`${id}-name`}
        name="name"
        required
        minLength={2}
        maxLength={100}
        autoComplete="name"
        placeholder="Full Name"
        className="form-field"
      />
      <label className="sr-only" htmlFor={`${id}-mobile`}>
        Mobile Number (required)
      </label>
      <input
        id={`${id}-mobile`}
        name="mobile"
        required
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        pattern="[0-9+ ]{10,14}"
        title="Enter a mobile number using 10–14 digits, spaces, or a leading +."
        maxLength={14}
        placeholder="Mobile Number"
        className="form-field"
      />
      {quick ? (
        <>
          <label className="sr-only" htmlFor={`${id}-city`}>
            City
          </label>
          <input
            id={`${id}-city`}
            name="city"
            autoComplete="address-level2"
            maxLength={100}
            placeholder="City"
            className="form-field"
          />
        </>
      ) : (
        <>
          <label className="sr-only" htmlFor={`${id}-budget`}>
            Preferred Budget
          </label>
          <input
            id={`${id}-budget`}
            name="budget"
            maxLength={100}
            placeholder="Preferred Budget"
            className="form-field sm:col-span-2"
          />
          <label className="sr-only" htmlFor={`${id}-message`}>
            Message
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            maxLength={2000}
            placeholder="Message"
            className="form-field sm:col-span-2"
          />
        </>
      )}
      <button
        type="submit"
        className={
          quick
            ? "rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            : "rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:col-span-2 sm:justify-self-start"
        }
      >
        {quick ? "Enquire on WhatsApp" : "Request Callback on WhatsApp"}
      </button>
      <p
        className={`text-xs text-muted-foreground ${quick ? "sm:col-span-2 lg:col-span-4" : "sm:col-span-2"}`}
      >
        WhatsApp will open with your details. Tap Send there to finish.
      </p>
      {error && (
        <p
          role="alert"
          className={`text-sm text-destructive ${quick ? "sm:col-span-2 lg:col-span-4" : "sm:col-span-2"}`}
        >
          {error}
        </p>
      )}
    </form>
  );
}

export function QuickEnquiry() {
  return (
    <div className="relative z-10 -mt-24 px-5 md:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-card p-6 shadow-soft md:p-8">
        <h2 className="mb-5 text-2xl md:text-3xl">
          Interested in a Plot or Farmhouse?
        </h2>
        <EnquiryForm variant="quick" />
      </div>
    </div>
  );
}
