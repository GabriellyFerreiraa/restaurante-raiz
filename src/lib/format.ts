const ars = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

/** 27600 -> "$ 27.600" */
export function price(value: number): string {
  // Intl (es-AR) intercala un espacio duro (U+00A0); lo pasamos a espacio normal
  return ars.format(value).replace(/\s+/g, " ").trim();
}

const longDate = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

/** "2026-08-29" -> "sábado, 29 de agosto" */
export function humanDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return longDate.format(new Date(y, m - 1, d));
}

/** YYYY-MM-DD para hoy, en hora local */
export function todayISO(): string {
  const now = new Date();
  const tzOffset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - tzOffset).toISOString().slice(0, 10);
}

/** YYYY-MM-DD a `days` días de hoy */
export function isoInDays(days: number): string {
  const now = new Date();
  now.setDate(now.getDate() + days);
  const tzOffset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - tzOffset).toISOString().slice(0, 10);
}
