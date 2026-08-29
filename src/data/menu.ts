export type DietTag = "v" | "vg" | "st";

export const DIET_LABEL: Record<DietTag, string> = {
  v: "vegetariano",
  vg: "vegano",
  st: "sin TACC",
};

export interface Dish {
  name: string;
  description: string;
  price: number;
  tags?: DietTag[];
}

export interface MenuGroup {
  group: string;
  items: Dish[];
}

/** Estación vigente — se muestra en el encabezado del menú. */
export const season = "Otoño 2026";
export const seasonNote =
  "El menú cambia cada vez que cambia la feria. Lo de abajo es lo que estamos cocinando esta semana.";

export const tasting = {
  name: "Menú Raíz",
  courses: 7,
  price: 78000,
  pairing: 46000,
  description:
    "Siete pasos que siguen a la huerta de la semana. Una sola cocina para toda la mesa; avisános las restricciones al reservar.",
  steps: [
    { name: "Encurtidos de la semana", note: "lo que sobró maduró bien" },
    { name: "Pan de masa madre, manteca ahumada", note: "masa de 30 h" },
    { name: "Zapallo asado, avellana, café", note: "st" },
    { name: "Remolachas a la sal, queso de cabra, ciruela", note: "v" },
    { name: "Ravioles de acelga y ricota, manteca noisette", note: "v" },
    { name: "Cordero de la Patagonia, hinojo, ají amarillo", note: "st" },
    { name: "Membrillo, crema quemada, hierba buena", note: "v · st" },
  ],
} as const;

export const alacarte: MenuGroup[] = [
  {
    group: "Para empezar",
    items: [
      {
        name: "Provoleta de campo, miel de romero",
        description: "A la parrilla, con pan grillado y un hilo de miel infusionada.",
        price: 12800,
        tags: ["v", "st"],
      },
      {
        name: "Ensalada de estación",
        description: "Hojas amargas de la huerta, pera, nuez pecán y vinagreta de manzana.",
        price: 11200,
        tags: ["vg", "st"],
      },
      {
        name: "Empanada de osobuco",
        description: "Cocción de seis horas, masa de grasa, cortada a cuchillo. Una unidad.",
        price: 6900,
      },
      {
        name: "Burrata, tomates asados, albahaca morada",
        description: "Tomates del último sol de la temporada, aceite de oliva de San Juan.",
        price: 13400,
        tags: ["v", "st"],
      },
    ],
  },
  {
    group: "Principales",
    items: [
      {
        name: "Bife de chorizo madurado 30 días",
        description: "A las brasas de quebracho, con papas aplastadas y chimichurri de la casa.",
        price: 27600,
        tags: ["st"],
      },
      {
        name: "Trucha de montaña, beurre blanc de limón",
        description: "Del criadero de Junín de los Andes, con arvejas y estragón.",
        price: 24900,
        tags: ["st"],
      },
      {
        name: "Risotto de hongos de pino",
        description: "Carnaroli, caldo de gallina y hongos secados por nosotros. Terminado con parmesano.",
        price: 21300,
        tags: ["v", "st"],
      },
      {
        name: "Calabaza entera a la llama",
        description: "Rellena de trigo burgol, garbanzos y salsa de yogur de anacardos.",
        price: 19800,
        tags: ["vg"],
      },
    ],
  },
  {
    group: "Postres",
    items: [
      {
        name: "Flan de dulce de leche, crema doble",
        description: "El de siempre. No lo vamos a cambiar.",
        price: 8600,
        tags: ["v", "st"],
      },
      {
        name: "Tarta fina de manzana, helado de crema",
        description: "Masa quebrada, manzanas verdes finísimas, caramelo de sidra.",
        price: 9200,
        tags: ["v"],
      },
      {
        name: "Chocolate 70%, aceite de oliva, sal",
        description: "Cremoso de chocolate de origen, con crocante de cacao.",
        price: 8900,
        tags: ["vg", "st"],
      },
    ],
  },
];
