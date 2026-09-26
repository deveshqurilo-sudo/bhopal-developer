// Update contact details here before connecting this website to your business.
export const siteConfig = {
  name: "Bhoomi Estates",
  company: "[BUILDER / COMPANY NAME]",
  phone: "[PHONE NUMBER]",
  phoneHref: "tel:+910000000000",
  whatsapp: "[WHATSAPP NUMBER]",
  whatsappHref: "https://wa.me/910000000000",
  email: "[EMAIL]",
  office: "[OFFICE ADDRESS]",
  directionsHref: "https://maps.google.com/?q=Bhopal",
  // Set these after your legal pages are ready.
  privacyHref: "#contact",
  termsHref: "#contact",
} as const;

// Original reference assets, preserved at their published resolution.
// Repeated slots match the reference website's image placement.
export const siteImages = {
  hero: "/images/reference/hero.jpg",
  premiumPlots: "/images/reference/project-plots.jpg",
  farmhousePlots: "/images/reference/project-farm.jpg",
  landDevelopment: "/images/reference/hero.jpg",
  locationMap: "/images/reference/location-map.jpg",
  farmhouse: "/images/reference/farmhouse.jpg",
  possibilities: "/images/reference/project-plots.jpg",
  entrance: "/images/reference/entrance.jpg",
  roads: "/images/reference/internal-road.jpg",
  development: "/images/reference/development.jpg",
  surroundings: "/images/reference/hero.jpg",
  siteVisit: "/images/reference/entrance.jpg",
} as const;

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
] as const;

export interface VideoConfig {
  src: string;
  poster: string;
  title: string;
  durationLabel: string;
  captions: readonly {
    src: string;
    language: string;
    label: string;
    default?: boolean;
  }[];
}

export interface BrochureConfig {
  url: string;
  downloadUrl: string;
  title: string;
  description: string;
  sizeLabel: string;
  downloadSizeLabel: string;
}

// Paste public HTTPS delivery URLs, not dashboard/share-page URLs.
// Empty URLs show "coming soon" states. Never put API secrets in this public file.
export const siteMedia: { video: VideoConfig; brochure: BrochureConfig } = {
  video: {
    // Web-optimized MP4 (H.264/AAC). MOV/HLS require a different player setup.
    src: "",
    poster: siteImages.hero,
    title: "A closer look at your future space.",
    durationLabel: "", // Actual duration, e.g. "02:30".
    // Add real same-origin captions, e.g. /captions/tour-en.vtt, for speech.
    captions: [],
  },
  brochure: {
    url: "", // Prefer a compressed PDF for reading on screen.
    // Optional original PDF served with Content-Disposition: attachment.
    // Cross-origin HTML download attributes cannot force a download.
    downloadUrl: "",
    title: "Your next chapter, in detail.",
    description:
      "Take a little time to explore. Keep our project brochure handy, share it with your family, and bring your questions to your site visit.",
    sizeLabel: "", // Real PDF size, e.g. "8 MB".
    downloadSizeLabel: "", // Original download size, e.g. "300 MB".
  },
};
