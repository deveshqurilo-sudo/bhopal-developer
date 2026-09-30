import { projects, type Project } from "@/features/home/data/content";
import { projectImages, type ProjectImage } from "./project-images";

export interface ProjectDetail {
  project: Project;
  gallery: readonly ProjectImage[];
  galleryNote: string;
  highlights: readonly { label: string; value: string }[];
  amenities: readonly {
    title: string;
    items: readonly string[];
  }[];
  brochure: { title: string; href: string; fileName: string };
}

const details: Record<string, Omit<ProjectDetail, "project">> = {
  "shiv-shakti-dham": {
    gallery: projectImages["shiv-shakti-dham"],
    galleryNote: "Project concept renders.",
    highlights: [
      { label: "Property type", value: "Residential & commercial plots" },
      { label: "Setting", value: "Main highway, Vidisha Road, Raisen" },
      {
        label: "Plot sizes",
        value:
          "residential - 800 sqft-1100 sqft Commercial -2500 sqft -15000 sqft",
      },
      {
        label: "Pricing",
        value: "2000/- sqft for Residential  5000/- sqft for commercial ",
      },
    ],
    amenities: [
      {
        title: "Access & planning",
        items: [
          "Main 200 ft road access",
          "Wide cemented internal roads",
          "Vaastu-based planning",
          "Hill-view plots",
        ],
      },
      {
        title: "Utilities & security",
        items: [
          "Concrete drainage system",
          "Electricity",
          "Rainwater harvesting",
          "24×7 security system",
          "Gated community",
        ],
      },
      {
        title: "Green spaces",
        items: ["Temple", "Large gardens", "Forest surroundings"],
      },
    ],
    brochure: {
      title: "Shiv Shakti Dham brochure",
      href: "/pdf/BROCHURE%20final%20update.pdf",
      fileName: "BROCHURE final update.pdf",
    },
  },
  "royal-green-park": {
    gallery: projectImages["royal-green-park"],
    galleryNote: "Project concept renders.",
    highlights: [
      { label: "Property type", value: "Farmhouse plots" },
      { label: "Location", value: "Phanda Kalan, Bhopal Indore Bypass" },
      { label: "Plot sizes", value: "600sqft-1250 sqft" },
      { label: "Pricing", value: "1699/- sqft" },
    ],
    amenities: [
      {
        title: "Access & security",
        items: [
          "Grand entrance gate with guard room",
          "30 ft wide CC roads",
          "24×7 security",
          "CCTV surveillance",
          "LED street lights",
          "Underground electricity",
        ],
      },
      {
        title: "Wellness & recreation",
        items: [
          "Meditation room",
          "Swimming pool",
          "Sports facilities",
          "Children’s play area",
          "Jogging track & pathways",
        ],
      },
      {
        title: "Community & gardens",
        items: [
          "Grand temple",
          "Senior citizen seating area",
          "Gazebo",
          "Clubhouse",
          "Gardens",
        ],
      },
    ],
    brochure: {
      title: "Royal Green Park brochure",
      href: "/pdf/RGP%20BROCHURE-1.pdf",
      fileName: "RGP BROCHURE-1.pdf",
    },
  },
  "palm-springs": {
    gallery: projectImages["palm-springs"],
    galleryNote:
      "Photographs from Palm Springs. Ask our team for the latest site updates.",
    highlights: [
      { label: "Property type", value: "Premium plot development" },
      { label: "Community", value: "Nature-inspired living" },
      { label: "Plot sizes", value: "7000sqft-12000sqft" },
      { label: "Pricing", value: "1499/- sqft" },
    ],
    amenities: [
      {
        title: "Sports & wellness",
        items: [
          "Open gymnasium",
          "Swimming pool",
          "Cricket pitch",
          "Football net",
          "Walking & cycling tracks",
        ],
      },
      {
        title: "Community & setting",
        items: [
          "Gated community",
          "Ample open spaces",
          "Restaurant shown on masterplan",
          "Seasonal water stream shown on masterplan",
        ],
      },
    ],
    brochure: {
      title: "Palm Springs brochure",
      href: "/pdf/Palm%20Spring.pdf",
      fileName: "Palm Spring.pdf",
    },
  },
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  const project = projects.find((item) => item.slug === slug);
  const detail = details[slug];
  return project && detail ? { project, ...detail } : undefined;
}
