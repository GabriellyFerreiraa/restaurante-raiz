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

const longDateCache = new Map<string, Intl.DateTimeFormat>();
function longDate(locale: string) {
  let f = longDateCache.get(locale);
  if (!f) {
    f = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    longDateCache.set(locale, f);
  }
  return f;
}

/** "2026-08-29" -> "sábado, 29 de agosto" (según el locale) */
export function humanDate(iso: string, locale = "es-AR"): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return longDate(locale).format(new Date(y, m - 1, d));
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
