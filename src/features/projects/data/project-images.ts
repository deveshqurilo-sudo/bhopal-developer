export interface ProjectImage {
  src: string;
  alt: string;
}

function fromFolder(
  folder: string,
  images: readonly (readonly [fileName: string, alt: string])[],
): readonly ProjectImage[] {
  return images.map(([fileName, alt]) => ({
    src: `/images/${encodeURIComponent(folder)}/${encodeURIComponent(fileName)}`,
    alt,
  }));
}

export const projectImages = {
  "shiv-shakti-dham": fromFolder("SHIV SHAKTI DHAM", [
    ["IMG-20260926-WA0008.jpg.jpeg", "Landscaped entrance road rendering"],
    ["IMG-20260926-WA0001.jpg.jpeg", "Residential plot layout rendering"],
    ["IMG-20260926-WA0002.jpg.jpeg", "Wide road rendering"],
    ["IMG-20260926-WA0003.jpg.jpeg", "Project layout from above"],
    ["IMG-20260926-WA0005.jpg.jpeg", "Garden seating rendering"],
    ["IMG-20260926-WA0006.jpg.jpeg", "Landscaped park rendering"],
    ["IMG-20260926-WA0010.jpg.jpeg", "Children's play area rendering"],
    ["IMG-20260926-WA0012.jpg.jpeg", "Garden pathway rendering"],
    ["IMG-20260926-WA0017.jpg.jpeg", "Park and seating rendering"],
  ]),
  "royal-green-park": fromFolder("Royal Green Park", [
    ["IMG-20260926-WA0014.jpg.jpeg", "Royal Green Park entrance rendering"],
    ["IMG-20260521-WA0002.jpg.jpeg", "Plot layout rendering"],
    ["IMG-20260521-WA0003.jpg.jpeg", "Plotted development rendering"],
    ["IMG-20260521-WA0004.jpg.jpeg", "Project entrance rendering"],
    ["IMG-20260521-WA0005.jpg.jpeg", "Road intersection rendering"],
    ["IMG-20260521-WA0006.jpg.jpeg", "Tree-lined road rendering"],
    ["IMG-20260521-WA0007.jpg.jpeg", "Entrance gateway rendering"],
    ["IMG-20260521-WA0008.jpg.jpeg", "Farmhouse exterior rendering"],
    ["IMG-20260521-WA0009.jpg.jpeg", "Farmhouse community rendering"],
    ["IMG-20260521-WA0010.jpg.jpeg", "Modern farmhouse rendering"],
    ["IMG-20260521-WA0011.jpg.jpeg", "Pool and garden rendering"],
    ["IMG-20260521-WA0012.jpg.jpeg", "Garden pavilion rendering"],
    ["IMG-20260521-WA0013.jpg.jpeg", "Temple garden rendering"],
    ["IMG-20260521-WA0014.jpg.jpeg", "Children's park rendering"],
    ["IMG-20260521-WA0015.jpg.jpeg", "Temple entrance rendering"],
    ["IMG-20260521-WA0016.jpg.jpeg", "Landscaped temple rendering"],
    ["IMG-20260521-WA0017.jpg.jpeg", "Road and garden layout rendering"],
    ["IMG-20260521-WA0018.jpg.jpeg", "Central garden rendering"],
    ["IMG-20260521-WA0019.jpg.jpeg", "Playground rendering"],
    ["IMG-20260521-WA0020.jpg.jpeg", "Children's play area rendering"],
    ["IMG-20260521-WA0021.jpg.jpeg", "Garden from above rendering"],
    ["IMG-20260521-WA0022.jpg.jpeg", "Garden and road rendering"],
    ["IMG-20260521-WA0023.jpg.jpeg", "Flower garden rendering"],
    ["IMG-20260926-WA0000.jpg.jpeg", "Roadside entrance rendering"],
    ["IMG-20260926-WA0004.jpg.jpeg", "Plot and road layout rendering"],
    ["IMG-20260926-WA0007.jpg.jpeg", "Plotted garden rendering"],
    ["IMG-20260926-WA0009.jpg.jpeg", "Playground slide rendering"],
    ["IMG-20260926-WA0011.jpg.jpeg", "Landscaped road rendering"],
    ["IMG-20260926-WA0015.jpg.jpeg", "Park from above rendering"],
    ["IMG-20260926-WA0016.jpg.jpeg", "Playground and swings rendering"],
  ]),
  "palm-springs": fromFolder("Palm  spring project images", [
    ["IMG-20260424-WA0005.jpg.jpeg", "Palm Springs entrance by day"],
    ["IMG-20260424-WA0002.jpg.jpeg", "Palm Springs entrance at night"],
    ["IMG-20260424-WA0003.jpg.jpeg", "Illuminated entrance driveway"],
    ["IMG-20260502-WA0002.jpg.jpeg", "Landscaped entrance road"],
    ["IMG-20260502-WA0003.jpg.jpeg", "Green lawn beside the clubhouse"],
    ["IMG-20260502-WA0004.jpg.jpeg", "Clubhouse and internal road"],
    ["IMG-20260502-WA0006.jpg.jpeg", "Open lawn and planting"],
    ["IMG-20260502-WA0009.jpg.jpeg", "Tree-lined green space"],
    ["IMG-20260502-WA0012.jpg.jpeg", "Covered seating and pathway"],
    ["IMG-20260502-WA0018.jpg.jpeg", "Palm-lined internal road"],
    ["IMG-20260502-WA0019.jpg.jpeg", "Stepping-stone garden path"],
  ]),
} as const;
