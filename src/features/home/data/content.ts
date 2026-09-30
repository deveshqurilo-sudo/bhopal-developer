import { projectImages } from "@/features/projects/data/project-images";

export interface Project {
  id: string;
  slug: string;
  name: string;
  type: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const projects: readonly Project[] = [
  {
    id: "premium-plots",
    slug: "shiv-shakti-dham",
    name: "SHIV SHAKTI DHAM",
    type: "Commercial and Residential Plots",
    location:
      "Gopalpur Highway, Behind Collector Office Vidisha Road Raisen, Bhopal",
    description:
      "Welcome to Shiv Shakti Dham, a premium real estate plotting project offering residential and commercial plots strategically located on the main 200 ft highway at Vidisha Road, Raisen. Designed for modern living and smart investment, this project provides excellent connectivity, high visibility, and immense growth potential.",
    image: projectImages["shiv-shakti-dham"][0].src,
    imageAlt: "Shiv Shakti Dham landscaped road rendering",
  },
  {
    id: "farmhouse-plots",
    slug: "royal-green-park",
    name: "ROYAL GREEN PARK",
    type: "Premium Plots",
    location: "Phanda Kalan, Bhopal Indore Bypass, Bhopal",
    description:
      "At Royal Green Park, we've designed every detail with your family's happiness in mind. From strong, wide roads to lush green gardens, from 24x7 security to open spaces where children can run freely - this is more than just a house. It's a place where your dreams of a safe, modern, and peaceful life come true.",
    image: projectImages["royal-green-park"][0].src,
    imageAlt: "Royal Green Park entrance rendering",
  },
  {
    id: "land-development",
    slug: "palm-springs",
    name: "PALM SPRINGS",
    type: "Premium Plot Development",
    location:
      "Palm Spring, Behind Kajlikheda Police Station, Near Kusha Bhau Thakre Nursing College, Kolar 6 Lane Road, Bhopal, Madhya Pradesh 462040 ",
    description:
      "Palm Springs is envisioned to create a happy community of like minded people who appreciate comfortable living amidst natures raw beauty and well designed spaces.",
    image: projectImages["palm-springs"][0].src,
    imageAlt: "Palm Springs entrance photograph",
  },
];

export const locations = [
  "Bhopal",
  "Gopalpur Highway, Behind Collector Office Vidisha Road Raisen, Bhopal",
  "Phanda Kalan, Bhopal Indore Bypass, Bhopal",
  "Palm Spring, Behind Kajlikheda Police Station, Near Kusha Bhau Thakre Nursing College, Kolar 6 Lane Road, Bhopal, Madhya Pradesh 462040 ",
] as const;
export const statistics = [
  { value: "36+", label: "Acres Developed" },
  { value: "726+", label: "Plots" },
  { value: "1000+", label: "Happy Customers" },
  { value: "3", label: "Project Locations" },
] as const;

export interface GalleryItem {
  src: string;
  alt: string;
  tall?: boolean;
}
export const gallery: readonly GalleryItem[] = [
  { ...projectImages["palm-springs"][0], tall: true },
  { ...projectImages["palm-springs"][4], tall: true },
  projectImages["shiv-shakti-dham"][0],
  projectImages["royal-green-park"][0],
  projectImages["palm-springs"][5],
  projectImages["royal-green-park"][9],
  projectImages["shiv-shakti-dham"][4],
  { ...projectImages["palm-springs"][10], tall: true },
];
