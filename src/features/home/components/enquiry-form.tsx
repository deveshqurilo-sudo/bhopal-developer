"use client";

import { useId, useState, type FormEvent } from "react";
import { CircleCheck } from "lucide-react";

// UI-only by design: no personal data is logged or persisted in the browser.
// Replace this demo state with a validated server submission when connecting your CRM.
export function EnquiryForm({
  variant = "callback",
}: {
  variant?: "quick" | "callback";
}) {
  const id = useId();
  const [submitted, setSubmitted] = useState(false);
  const quick = variant === "quick";
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) setSubmitted(true);
  }
  if (submitted)
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-2xl bg-accent px-6 py-8 text-accent-foreground"
      >
        <CircleCheck className="h-6 w-6 shrink-0 text-primary" />
        <div>
          <p className="font-medium">Thank you! Your details are ready.</p>
          <p className="mt-1 text-sm">
            This is a demo form. Your enquiry has not been sent.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-3 text-sm underline underline-offset-4"
          >
            Back to form
          </button>
        </div>
      </div>
    );
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
        {quick ? "Submit Enquiry" : "Request a Callback"}
      </button>
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
