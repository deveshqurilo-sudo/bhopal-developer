"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CircleCheck } from "lucide-react";

export function SiteVisitForm({ projectName }: { projectName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const now = new Date();
    const localToday = new Date(
      now.getTime() - now.getTimezoneOffset() * 60_000,
    )
      .toISOString()
      .slice(0, 10);
    if (dateRef.current) dateRef.current.min = localToday;
  }, [submitted]);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) setSubmitted(true);
  }
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-soft sm:p-8">
      {submitted ? (
        <div
          role="status"
          className="flex gap-3 rounded-2xl bg-accent p-5 text-accent-foreground"
        >
          <CircleCheck className="h-6 w-6 shrink-0 text-primary" />
          <div>
            <p className="font-semibold">Your visit details are ready.</p>
            <p className="mt-1 text-sm">
              This form is a demo; your request has not been sent. Please call
              the team to arrange a visit.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-3 text-sm underline underline-offset-4"
            >
              Edit details
            </button>
          </div>
        </div>
      ) : (
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
            Schedule Site Visit
          </button>
        </form>
      )}
    </div>
  );
}
