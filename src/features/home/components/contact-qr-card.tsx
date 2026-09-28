import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import QRCode from "qrcode";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/config/site";

export async function ContactQrCard() {
  // Generated at build time: no QR service requests or client-side generator.
  const qrImage = await QRCode.toDataURL(siteConfig.nextDealUrl, {
    errorCorrectionLevel: "M",
    margin: 4,
    scale: 8,
    color: { dark: "#000000", light: "#ffffff" },
  });

  return (
    <aside
      aria-labelledby="nextdeal-qr-heading"
      className="mt-12 flex flex-col items-center gap-7 rounded-3xl border bg-card p-6 text-center sm:flex-row sm:gap-10 sm:p-8 sm:text-left"
    >
      <a
        href={siteConfig.nextDealUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open NextDeal in a new tab"
        className="shrink-0 overflow-hidden rounded-2xl border bg-white p-2"
      >
        <Image
          src={qrImage}
          width={198}
          height={198}
          unoptimized
          alt={`QR code linking to ${siteConfig.nextDealUrl}`}
          className="h-[198px] w-[198px]"
        />
      </a>
      <div>
        <p className="eyebrow">Just a scan away</p>
        <h3 id="nextdeal-qr-heading" className="mt-3 text-3xl md:text-4xl">
          Explore NextDeal
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Scan this QR code with your phone&apos;s camera to visit nextdeal.in.
          Already on your phone? Tap below to open the website.
        </p>
        <ButtonLink
          href={siteConfig.nextDealUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6"
          aria-label="Visit NextDeal (opens in a new tab)"
        >
          Visit nextdeal.in <ArrowUpRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </aside>
  );
}
