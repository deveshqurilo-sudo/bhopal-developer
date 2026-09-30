import { siteConfig } from "@/config/site";

export function createEnquiryWhatsAppUrl(
  lines: readonly string[],
): string | null {
  const match = /^https:\/\/wa\.me\/([1-9]\d{7,14})$/.exec(
    siteConfig.whatsappHref,
  );

  if (!match) return null;

  const message = lines.filter(Boolean).join("\n");
  return `${siteConfig.whatsappHref}?text=${encodeURIComponent(message)}`;
}

export function formValue(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}
