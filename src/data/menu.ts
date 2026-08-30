// Estructura del menú (independiente del idioma): ids, precios y etiquetas.
// El texto (nombres, descripciones, notas) vive en src/i18n/strings.ts,
// indexado por estos mismos ids.

export type DietTag = "v" | "vg" | "st";
export const DIET_TAGS = ["v", "vg", "st"] as const;

export interface DishSpec {
  id: string;
  price: number;
  tags?: DietTag[];
}

export interface GroupSpec {
  id: string;
  items: DishSpec[];
}

export const TASTING = {
  courses: 7,
  price: 78000,
  pairing: 46000,
} as const;

export const ALACARTE: GroupSpec[] = [
  {
    id: "start",
    items: [
      { id: "provoleta", price: 12800, tags: ["v", "st"] },
      { id: "ensalada", price: 11200, tags: ["vg", "st"] },
      { id: "empanada", price: 6900 },
      { id: "burrata", price: 13400, tags: ["v", "st"] },
    ],
  },
  {
    id: "mains",
    items: [
      { id: "bife", price: 27600, tags: ["st"] },
      { id: "trucha", price: 24900, tags: ["st"] },
      { id: "risotto", price: 21300, tags: ["v", "st"] },
      { id: "calabaza", price: 19800, tags: ["vg"] },
    ],
  },
  {
    id: "desserts",
    items: [
      { id: "flan", price: 8600, tags: ["v", "st"] },
      { id: "tarta", price: 9200, tags: ["v"] },
      { id: "chocolate", price: 8900, tags: ["vg", "st"] },
    ],
  },
];
