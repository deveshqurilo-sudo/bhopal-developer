import { siteImages } from "@/config/site";

export interface Project {
  id: string;
  name: string;
  type: string;
  location: string;
  description: string;
  image: string;
}

export const projects: readonly Project[] = [
  {
    id: "premium-plots",
    name: "[PROJECT NAME]",
    type: "Premium Plots",
    location: "[LOCATION], Bhopal",
    description:
      "Thoughtfully planned plots in a developing location, suitable for residential use, future investment and weekend living.",
    image: siteImages.premiumPlots,
  },
  {
    id: "farmhouse-plots",
    name: "[PROJECT NAME]",
    type: "Farmhouse Plots",
    location: "[LOCATION], Bhopal",
    description:
      "Spacious farmhouse plots surrounded by greenery, designed for peaceful weekend living and long-term ownership.",
    image: siteImages.farmhousePlots,
  },
  {
    id: "land-development",
    name: "[PROJECT NAME]",
    type: "Premium Land Development",
    location: "[LOCATION], Bhopal",
    description:
      "A carefully planned development offering well-connected land parcels in an emerging location.",
    image: siteImages.landDevelopment,
  },
];

export const locations = [
  "Bhopal",
  "[Location 1]",
  "[Location 2]",
  "[Location 3]",
] as const;
export const statistics = [
  { value: "[XX]+", label: "Acres Developed" },
  { value: "[XX]+", label: "Plots" },
  { value: "[XX]+", label: "Happy Customers" },
  { value: "[XX]", label: "Project Locations" },
] as const;

export interface GalleryItem {
  src: string;
  alt: string;
  tall?: boolean;
}
export const gallery: readonly GalleryItem[] = [
  { src: siteImages.entrance, alt: "Project entrance", tall: true },
  { src: siteImages.roads, alt: "Internal roads", tall: true },
  { src: siteImages.premiumPlots, alt: "Plot layouts" },
  { src: siteImages.farmhousePlots, alt: "Green surroundings" },
  { src: siteImages.farmhouse, alt: "Farmhouse concept" },
  { src: siteImages.development, alt: "Development work" },
  { src: siteImages.surroundings, alt: "Nearby surroundings" },
  { src: siteImages.siteVisit, alt: "Site visit", tall: true },
];
