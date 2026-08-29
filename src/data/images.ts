/**
 * Fotografía del sitio.
 *
 * Se usan URLs de Unsplash (CDN estable) para que el proyecto se vea completo
 * sin binarios en el repo. Para producción real, descargá las fotos a
 * `public/img/` y reemplazá cada `id` por una ruta local, p. ej. "/img/hero.jpg".
 * El componente `<Figure>` arma el srcset a partir de estos datos.
 */

export interface Photo {
  /** id de Unsplash o ruta local que empiece con "/" */
  id: string;
  alt: string;
  /** color sólido de respaldo mientras carga o si la imagen falla */
  tone: string;
  /** foco del encuadre para object-position */
  focus?: string;
}

const UNSPLASH = "https://images.unsplash.com/photo-";

export function photoSrc(photo: Photo, width: number): string {
  if (photo.id.startsWith("/")) return photo.id;
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    q: "72",
    w: String(width),
  });
  return `${UNSPLASH}${photo.id}?${params.toString()}`;
}

export const photos = {
  hero: {
    id: "1414235077428-338989a2e8c0",
    alt: "Salón del restaurante al atardecer, mesas vestidas y luz cálida",
    tone: "#241c15",
    focus: "50% 60%",
  },
  produce: {
    id: "1467453678174-768ec283a940",
    alt: "Verduras de estación recién llegadas de la huerta sobre una mesa de madera",
    tone: "#2c2a1c",
    focus: "50% 50%",
  },
  plate: {
    id: "1600891964599-f61ba0e24092",
    alt: "Plato emplatado con vegetales asados y salsa de hierbas",
    tone: "#3a2c20",
    focus: "50% 50%",
  },
  room: {
    id: "1552566626-52f8b828add9",
    alt: "Comedor con cocina abierta al fondo y doce mesas de madera",
    tone: "#1b1712",
    focus: "50% 45%",
  },
  hands: {
    id: "1556910103-1c02745aae4d",
    alt: "Cocinero terminando un plato con una pinza",
    tone: "#2a211a",
    focus: "50% 50%",
  },
  wine: {
    id: "1510812431401-41d2bd2722f3",
    alt: "Copa de vino natural servida junto a una vela",
    tone: "#241a17",
    focus: "50% 50%",
  },
} satisfies Record<string, Photo>;
