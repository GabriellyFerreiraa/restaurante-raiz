import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { z } from "zod";

import { Reveal } from "./Reveal";
import { humanDate, isoInDays, price, todayISO } from "../lib/format";
import { useLang } from "../i18n/lang";
import { DATE_LOCALE } from "../i18n/strings";
import { TASTING } from "../data/menu";
import "./Reservation.css";

const TURNS = ["19:00", "19:30", "21:15", "21:45"] as const;
const OCCASION_IDS = [
  "none",
  "birthday",
  "anniversary",
  "business",
  "celebration",
] as const;
const MIN_DATE = todayISO();
const MAX_DATE = isoInDays(60);
const NOTES_MAX = 280;
const BIG_GROUPS_MAIL = "eventos@raiz.rest";

// El esquema usa CLAVES de error (estables); el texto se traduce al renderizar.
const schema = z.object({
  date: z
    .string()
    .min(1, "date.required")
    .refine((v) => v >= MIN_DATE, "date.past")
    .refine((v) => v <= MAX_DATE, "date.future"),
  turn: z.enum(TURNS, { message: "turn.required" }),
  guests: z.number().int().min(1).max(8),
  name: z.string().trim().min(2, "name.min"),
  email: z.string().trim().email("email.invalid"),
  phone: z
    .string()
    .trim()
    .min(6, "phone.min")
    .regex(/^[\d\s+()-]+$/, "phone.chars"),
  occasion: z.enum(OCCASION_IDS).optional(),
  notes: z.string().max(NOTES_MAX, "notes.max").optional(),
  consent: z.boolean().refine((v) => v, { message: "consent.required" }),
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
  const { t, lang } = useLang();
  const r = t.reservation;
  const locale = DATE_LOCALE[lang];
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
      occasion: "none",
      notes: "",
      consent: false,
    },
  });

  const guests = Number(watch("guests")) || 0;
  const date = watch("date");
  const notes = watch("notes") ?? "";

  const estimate = useMemo(
    () =>
      guests > 0
        ? r.form.estimate(price(guests * TASTING.price), price(TASTING.price))
        : null,
    [guests, r],
  );

  /** traduce una clave de error de zod */
  const tErr = (key?: string) => (key ? r.errors[key] ?? key : "");

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
          <p className="eyebrow">{r.eyebrow}</p>
          <h2 className="rsv__title">{r.title}</h2>
          <p className="rsv__lede">{r.lede}</p>

          <dl className="rsv__facts">
            <div>
              <dt>{r.facts[0].dt}</dt>
              <dd>{r.facts[0].dd}</dd>
            </div>
            <div>
              <dt>{r.facts[1].dt}</dt>
              <dd>
                {r.facts[1].dd}{" "}
                <a href={`mailto:${BIG_GROUPS_MAIL}`}>{BIG_GROUPS_MAIL}</a>
              </dd>
            </div>
            <div>
              <dt>{r.facts[2].dt}</dt>
              <dd>{r.facts[2].dd}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="rsv__panel" delay={0.1}>
          <div aria-live="polite" className="u-visually-hidden">
            {busy && r.live.submitting}
            {status === "success" && r.live.success}
            {status === "error" && r.live.error}
          </div>

          {status === "success" && confirmation ? (
            <motion.div
              key="confirmed"
              className="rsv__confirmed"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
                  {r.confirmed.title(confirmation.name.split(" ")[0])}
                </h3>
                <p className="rsv__confirmed-copy">
                  {r.confirmed.copy(confirmation.code)}
                </p>
                <dl className="rsv__summary">
                  <div>
                    <dt>{r.confirmed.summary.day}</dt>
                    <dd>{humanDate(confirmation.date, locale)}</dd>
                  </div>
                  <div>
                    <dt>{r.confirmed.summary.turn}</dt>
                    <dd>{r.confirmed.turnUnit(confirmation.turn)}</dd>
                  </div>
                  <div>
                    <dt>{r.confirmed.summary.guests}</dt>
                    <dd>{confirmation.guests}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={startOver}
                >
                  {r.confirmed.again}
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
                    <span>{r.banner.text}</span>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      aria-label={r.banner.dismiss}
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="rsv__row rsv__row--date">
                  <div className="field">
                    <label htmlFor="rsv-date">{r.form.date}</label>
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
                      <p className="field__hint">{humanDate(date, locale)}</p>
                    )}
                    {errors.date && (
                      <p className="field__error" id="rsv-date-err">
                        {tErr(errors.date.message)}
                      </p>
                    )}
                  </div>

                  <fieldset className="field field--fieldset">
                    <legend>{r.form.turn}</legend>
                    <div
                      className="chips"
                      role="radiogroup"
                      aria-invalid={!!errors.turn}
                    >
                      {TURNS.map((tn) => (
                        <label key={tn} className="chip">
                          <input type="radio" value={tn} {...register("turn")} />
                          <span>{tn}</span>
                        </label>
                      ))}
                    </div>
                    {errors.turn && (
                      <p className="field__error">{tErr(errors.turn.message)}</p>
                    )}
                  </fieldset>
                </div>

                <fieldset className="field field--fieldset">
                  <legend>{r.form.guests}</legend>
                  <div className="stepper">
                    <button
                      type="button"
                      onClick={() => setGuests(guests - 1)}
                      disabled={guests <= 1}
                      aria-label={r.form.removeGuest}
                    >
                      –
                    </button>
                    <output aria-live="polite">
                      {r.form.guestsUnit(guests)}
                    </output>
                    <button
                      type="button"
                      onClick={() => setGuests(guests + 1)}
                      disabled={guests >= 8}
                      aria-label={r.form.addGuest}
                    >
                      +
                    </button>
                    <input
                      type="hidden"
                      {...register("guests", { valueAsNumber: true })}
                    />
                  </div>
                  {estimate && <p className="field__hint">{estimate}</p>}
                  {guests >= 8 && (
                    <p className="field__hint">
                      {r.form.moreThan8}{" "}
                      <a href={`mailto:${BIG_GROUPS_MAIL}`}>{BIG_GROUPS_MAIL}</a>.
                    </p>
                  )}
                </fieldset>

                <div className="rsv__row">
                  <div className="field">
                    <label htmlFor="rsv-name">{r.form.name}</label>
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
                        {tErr(errors.name.message)}
                      </p>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="rsv-phone">{r.form.phone}</label>
                    <input
                      id="rsv-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+54 11 ..."
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? "rsv-phone-err" : undefined
                      }
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="field__error" id="rsv-phone-err">
                        {tErr(errors.phone.message)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="rsv-email">{r.form.email}</label>
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
                      {tErr(errors.email.message)}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="rsv-occasion">{r.form.occasion}</label>
                  <select id="rsv-occasion" {...register("occasion")}>
                    {OCCASION_IDS.map((id) => (
                      <option key={id} value={id}>
                        {r.occasions[id]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="rsv-notes">{r.form.notes}</label>
                  <textarea
                    id="rsv-notes"
                    rows={2}
                    maxLength={NOTES_MAX}
                    aria-describedby="rsv-notes-count"
                    {...register("notes")}
                  />
                  <p
                    className="field__hint field__hint--count"
                    id="rsv-notes-count"
                  >
                    {notes.length}/{NOTES_MAX}
                  </p>
                  {errors.notes && (
                    <p className="field__error">{tErr(errors.notes.message)}</p>
                  )}
                </div>

                <label className="check">
                  <input type="checkbox" {...register("consent")} />
                  <span>{r.form.consent}</span>
                </label>
                {errors.consent && (
                  <p className="field__error">{tErr(errors.consent.message)}</p>
                )}

                <button
                  type="submit"
                  className="btn btn--solid btn--block rsv__submit"
                  disabled={busy || (submitCount > 0 && !isValid)}
                >
                  {busy ? r.form.submitting : r.form.submit}
                </button>
                <p className="rsv__fineprint">{r.form.fineprint}</p>
              </motion.form>
            )}
        </Reveal>
      </div>
    </section>
  );
}
