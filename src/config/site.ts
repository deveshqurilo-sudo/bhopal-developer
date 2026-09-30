const contactNumber = "916232005241";
const officeAddress =
  "Palm Spring, Behind Kajlikheda Police Station, Near Kusha Bhau Thakre Nursing College, Kolar 6 Lane Road, Bhopal, Madhya Pradesh 462040";

export const siteConfig = {
  name: "Landmark Builders and Developers.",
  company: "Landmark Builders and Developers",
  brand: {
    name: "Landmark",
    descriptor: "Builders & Developers",
    logo: "/images/logo.jpeg",
  },
  phone: "+91 62320 05241",
  phoneHref: `tel:+${contactNumber}`,
  whatsapp: "+91 62320 05241",
  whatsappHref: `https://wa.me/${contactNumber}`,
  email: "landmarkbuildersdevelopers1@gmail.com",
  office: officeAddress,
  directionsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddress)}`,
  nextDealUrl: "https://nextdeal.in/",
  // Add your business profile URLs to make the footer icons clickable.
  social: {
    instagram: "https://www.instagram.com/landmarkbuildersofficial?stkn=NjNyOTlvc3dmaHY3",
    facebook: "https://www.facebook.com/profile.php?id=61584158966565",
    // linkedin: "",
  },
} as const;

// Original reference assets, preserved at their published resolution.
// Repeated slots match the reference website's image placement.
export const siteImages = {
  hero: "/images/reference/hero.jpg",
  premiumPlots: "/images/reference/project-plots.jpg",
  farmhousePlots: "/images/reference/project-farm.jpg",
  landDevelopment: "/images/reference/hero.jpg",
  locationMap: "/images/reference/location-map.jpg",
  farmhouse: "/images/reference/farmhouse.jpeg",
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

export interface BrochureDocument {
  id: string;
  title: string;
  fileName: string;
  sizeLabel: string;
}

export interface BrochureConfig {
  title: string;
  description: string;
  documents: readonly BrochureDocument[];
}

// Use a public HTTPS video URL and exact PDF filenames from public/pdf.
// Never put API secrets in this public file.
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
    title: "Your next chapter, in detail.",
    description:
      "Download our project brochures, explore the details with your family, and bring your questions to your site visit.",
    documents: [
      {
        id: "updated-project-brochure",
        title: "SHIV SHAKTI DHAM Brochure",
        fileName: "BROCHURE final update.pdf",
        sizeLabel: "3.8 MB",
      },
      {
        id: "palm-spring",
        title: "PALM SPRING Brochure",
        fileName: "Palm Spring.pdf",
        sizeLabel: "3.0 MB",
      },
      {
        id: "rgp",
        title: "RGP Brochure",
        fileName: "RGP BROCHURE-1.pdf",
        sizeLabel: "2.0 MB",
      },
    ],
  },
};
