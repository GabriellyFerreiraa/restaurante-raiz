import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { z } from "zod";

import { Reveal } from "./Reveal";
import { humanDate, isoInDays, price, todayISO } from "../lib/format";
import { tasting } from "../data/menu";
import "./Reservation.css";

const TURNS = ["19:00", "19:30", "21:15", "21:45"] as const;
const OCCASIONS = ["Sin ocasión especial", "Cumpleaños", "Aniversario", "Cena de trabajo", "Celebración"] as const;
const MIN_DATE = todayISO();
const MAX_DATE = isoInDays(60);
const NOTES_MAX = 280;

const schema = z.object({
  date: z
    .string()
    .min(1, "Elegí una fecha")
    .refine((v) => v >= MIN_DATE, "Esa fecha ya pasó")
    .refine((v) => v <= MAX_DATE, "Tomamos reservas con hasta 60 días de anticipación"),
  turn: z.enum(TURNS, { message: "Elegí un turno" }),
  guests: z.number().int().min(1).max(8),
  name: z.string().trim().min(2, "Ingresá tu nombre"),
  email: z.string().trim().email("Revisá el email"),
  phone: z
    .string()
    .trim()
    .min(6, "Ingresá un teléfono de contacto")
    .regex(/^[\d\s+()-]+$/, "Solo números y + ( ) -"),
  occasion: z.enum(OCCASIONS).optional(),
  notes: z.string().max(NOTES_MAX, `Máximo ${NOTES_MAX} caracteres`).optional(),
  consent: z.boolean().refine((v) => v, {
    message: "Necesitamos tu confirmación para guardar la reserva",
  }),
});

type FormValues = z.infer<typeof schema>;

type Status = "idle" | "submitting" | "success" | "error";

interface Confirmation {
  code: string;
  date: string;
  turn: string;
  guests: number;
  name: string;
}

/** Simula el POST a la API de reservas. */
function submitReservation(values: FormValues): Promise<Confirmation> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // gancho para demostrar el estado de error: cualquier email @error.test
      if (values.email.trim().toLowerCase().endsWith("@error.test")) {
        reject(new Error("network"));
        return;
      }
      const code =
        "RZ-" +
        Math.random().toString(36).slice(2, 6).toUpperCase() +
        new Date().getFullYear();
      resolve({
        code,
        date: values.date,
        turn: values.turn as string,
        guests: Number(values.guests),
        name: values.name.trim(),
      });
    }, 1400);
  });
}

export function Reservation() {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid, submitCount },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      date: "",
      guests: 2,
      name: "",
      email: "",
      phone: "",
      occasion: OCCASIONS[0],
      notes: "",
      consent: false,
    },
  });

  const guests = Number(watch("guests")) || 0;
  const date = watch("date");
  const notes = watch("notes") ?? "";

  const estimate = useMemo(
    () => (guests > 0 ? price(guests * tasting.price) : null),
    [guests],
  );

  const onSubmit = handleSubmit(async (values) => {
    setStatus("submitting");
    try {
      const result = await submitReservation(values);
      setConfirmation(result);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  });

  const setGuests = (next: number) => {
    const clamped = Math.min(8, Math.max(1, next));
    setValue("guests", clamped, { shouldValidate: true, shouldDirty: true });
  };

  const startOver = () => {
    reset();
    setConfirmation(null);
    setStatus("idle");
  };

  const showErrorBanner = status === "error";
  const busy = status === "submitting";

  return (
    <section className="rsv section" id="reservar">
      <div className="rsv__grid container container--wide">
        <Reveal className="rsv__intro">
          <p className="eyebrow">Reservá</p>
          <h2 className="rsv__title">Una mesa para toda la noche</h2>
          <p className="rsv__lede">
            Confirmás en el momento. Te mandamos un mail con el detalle y, si
            hace falta cambiar algo, respondés ese mismo mail.
          </p>

          <dl className="rsv__facts">
            <div>
              <dt>Horarios</dt>
              <dd>Miércoles a sábado · turnos 19:00 y 21:15</dd>
            </div>
            <div>
              <dt>Grupos grandes</dt>
              <dd>
                Más de 8 personas:{" "}
                <a href="mailto:eventos@raiz.rest">eventos@raiz.rest</a>
              </dd>
            </div>
            <div>
              <dt>Cancelaciones</dt>
              <dd>Sin cargo hasta 24 h antes.</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="rsv__panel" delay={0.1}>
          <div aria-live="polite" className="u-visually-hidden">
            {busy && "Enviando la reserva…"}
            {status === "success" && "Reserva confirmada."}
            {status === "error" && "No pudimos confirmar la reserva."}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {status === "success" && confirmation ? (
              <motion.div
                key="confirmed"
                className="rsv__confirmed"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="rsv__check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      d="M4 12.5l5 5L20 6.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="rsv__confirmed-title">
                  Listo, {confirmation.name.split(" ")[0]}.
                </h3>
                <p className="rsv__confirmed-copy">
                  Guardamos tu mesa. Te llega el detalle por mail con el código{" "}
                  <b>{confirmation.code}</b>.
                </p>
                <dl className="rsv__summary">
                  <div>
                    <dt>Día</dt>
                    <dd>{humanDate(confirmation.date)}</dd>
                  </div>
                  <div>
                    <dt>Turno</dt>
                    <dd>{confirmation.turn} h</dd>
                  </div>
                  <div>
                    <dt>Comensales</dt>
                    <dd>{confirmation.guests}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={startOver}
                >
                  Hacer otra reserva
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="rsv__form"
                onSubmit={onSubmit}
                noValidate
                initial={false}
                animate={{ opacity: busy ? 0.6 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {showErrorBanner && (
                  <div className="rsv__banner" role="alert">
                    <span>
                      No pudimos conectar con el sistema de reservas. Probá de
                      nuevo en un momento.
                    </span>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      aria-label="Descartar aviso"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="rsv__row">
                  <div className="field">
                    <label htmlFor="rsv-date">Fecha</label>
                    <input
                      id="rsv-date"
                      type="date"
                      min={MIN_DATE}
                      max={MAX_DATE}
                      aria-invalid={!!errors.date}
                      aria-describedby={errors.date ? "rsv-date-err" : undefined}
                      {...register("date")}
                    />
                    {date && !errors.date && (
                      <p className="field__hint">{humanDate(date)}</p>
                    )}
                    {errors.date && (
                      <p className="field__error" id="rsv-date-err">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  <fieldset className="field field--fieldset">
                    <legend>Turno</legend>
                    <div className="chips" role="radiogroup" aria-invalid={!!errors.turn}>
                      {TURNS.map((t) => (
                        <label key={t} className="chip">
                          <input type="radio" value={t} {...register("turn")} />
                          <span>{t}</span>
                        </label>
                      ))}
                    </div>
                    {errors.turn && (
                      <p className="field__error">{errors.turn.message}</p>
                    )}
                  </fieldset>
                </div>

                <fieldset className="field field--fieldset">
                  <legend>Comensales</legend>
                  <div className="stepper">
                    <button
                      type="button"
                      onClick={() => setGuests(guests - 1)}
                      disabled={guests <= 1}
                      aria-label="Quitar un comensal"
                    >
                      –
                    </button>
                    <output aria-live="polite">
                      {guests} {guests === 1 ? "persona" : "personas"}
                    </output>
                    <button
                      type="button"
                      onClick={() => setGuests(guests + 1)}
                      disabled={guests >= 8}
                      aria-label="Sumar un comensal"
                    >
                      +
                    </button>
                    <input
                      type="hidden"
                      {...register("guests", { valueAsNumber: true })}
                    />
                  </div>
                  {estimate && (
                    <p className="field__hint">
                      Con menú Raíz, estimado {estimate} ({price(tasting.price)} pp).
                    </p>
                  )}
                  {guests >= 8 && (
                    <p className="field__hint">
                      ¿Son más de 8? Escribinos a{" "}
                      <a href="mailto:eventos@raiz.rest">eventos@raiz.rest</a>.
                    </p>
                  )}
                </fieldset>

                <div className="rsv__row">
                  <div className="field">
                    <label htmlFor="rsv-name">Nombre y apellido</label>
                    <input
                      id="rsv-name"
                      type="text"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "rsv-name-err" : undefined}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="field__error" id="rsv-name-err">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="rsv-phone">Teléfono</label>
                    <input
                      id="rsv-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+54 11 ..."
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "rsv-phone-err" : undefined}
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="field__error" id="rsv-phone-err">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="rsv-email">Email</label>
                  <input
                    id="rsv-email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "rsv-email-err" : undefined}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="field__error" id="rsv-email-err">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="rsv-occasion">Ocasión (opcional)</label>
                  <select id="rsv-occasion" {...register("occasion")}>
                    {OCCASIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="rsv-notes">
                    Alergias, restricciones o pedidos
                  </label>
                  <textarea
                    id="rsv-notes"
                    rows={3}
                    maxLength={NOTES_MAX}
                    aria-describedby="rsv-notes-count"
                    {...register("notes")}
                  />
                  <p className="field__hint field__hint--count" id="rsv-notes-count">
                    {notes.length}/{NOTES_MAX}
                  </p>
                  {errors.notes && (
                    <p className="field__error">{errors.notes.message}</p>
                  )}
                </div>

                <label className="check">
                  <input type="checkbox" {...register("consent")} />
                  <span>
                    Acepto que Raíz guarde estos datos para gestionar la reserva.
                  </span>
                </label>
                {errors.consent && (
                  <p className="field__error">{errors.consent.message}</p>
                )}

                <button
                  type="submit"
                  className="btn btn--solid btn--block rsv__submit"
                  disabled={busy || (submitCount > 0 && !isValid)}
                >
                  {busy ? "Confirmando…" : "Confirmar reserva"}
                </button>
                <p className="rsv__fineprint">
                  Sin pago por adelantado. Solo pedimos la tarjeta para grupos de
                  6 o más.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
