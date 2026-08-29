import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { price } from "../lib/format";
import {
  DIET_LABEL,
  alacarte,
  season,
  seasonNote,
  tasting,
  type DietTag,
} from "../data/menu";
import "./Menu.css";

type TabId = "degustacion" | "carta";

const TABS: { id: TabId; label: string }[] = [
  { id: "degustacion", label: "Degustación" },
  { id: "carta", label: "À la carte" },
];

function Tags({ tags }: { tags?: DietTag[] }) {
  if (!tags?.length) return null;
  return (
    <span className="menu__tags">
      {tags.map((t) => (
        <abbr key={t} className="menu__tag" title={DIET_LABEL[t]}>
          {t}
        </abbr>
      ))}
    </span>
  );
}

export function Menu() {
  const [tab, setTab] = useState<TabId>("degustacion");
  const reduceMotion = useReducedMotion();
  const panelId = useId();

  return (
    <section className="menu section" id="menu">
      <div className="container">
        <Reveal className="menu__head">
          <p className="eyebrow">El menú · {season}</p>
          <h2 className="menu__title">Lo que estamos cocinando</h2>
          <p className="menu__note">{seasonNote}</p>
        </Reveal>

        <div className="menu__tabs" role="tablist" aria-label="Tipo de menú">
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active}
                aria-controls={`${panelId}-${t.id}`}
                tabIndex={active ? 0 : -1}
                className="menu__tab"
                data-active={active}
                onClick={() => setTab(t.id)}
              >
                {t.label}
                {active && (
                  <motion.span
                    className="menu__tab-underline"
                    layoutId="menu-tab-underline"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="menu__panel-wrap">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              id={`${panelId}-${tab}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab}`}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              {tab === "degustacion" ? <Tasting /> : <ALaCarte />}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="menu__legend">
          {(Object.keys(DIET_LABEL) as DietTag[]).map((t) => (
            <span key={t}>
              <b>{t}</b> {DIET_LABEL[t]}
            </span>
          ))}
          <span>Precios en pesos, servicio no incluido.</span>
        </p>
      </div>
    </section>
  );
}

function Tasting() {
  return (
    <div className="tasting">
      <div className="tasting__aside">
        <p className="tasting__name">{tasting.name}</p>
        <p className="tasting__meta">
          {tasting.courses} pasos · {price(tasting.price)} por persona
        </p>
        <p className="tasting__meta tasting__meta--muted">
          Maridaje opcional {price(tasting.pairing)}
        </p>
        <p className="tasting__desc">{tasting.description}</p>
      </div>

      <ol className="tasting__steps">
        {tasting.steps.map((step, i) => (
          <li key={step.name} className="tasting__step">
            <span className="tasting__step-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="tasting__step-body">
              <span className="tasting__step-name">{step.name}</span>
              {step.note && (
                <span className="tasting__step-note">{step.note}</span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ALaCarte() {
  return (
    <div className="carte">
      {alacarte.map((group) => (
        <section key={group.group} className="carte__group">
          <h3 className="carte__group-title">{group.group}</h3>
          <ul className="carte__list">
            {group.items.map((dish) => (
              <li key={dish.name} className="carte__item">
                <div className="carte__item-head">
                  <span className="carte__item-name">
                    {dish.name}
                    <Tags tags={dish.tags} />
                  </span>
                  <span className="carte__dots" aria-hidden="true" />
                  <span className="carte__item-price">{price(dish.price)}</span>
                </div>
                <p className="carte__item-desc">{dish.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
