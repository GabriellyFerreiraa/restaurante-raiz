import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { price } from "../lib/format";
import { useT } from "../i18n/lang";
import type { Dict } from "../i18n/strings";
import { ALACARTE, DIET_TAGS, TASTING, type DietTag } from "../data/menu";
import "./Menu.css";

type MenuText = Dict["menu"];

type TabId = "degustacion" | "carta";

function Tags({
  tags,
  labels,
}: {
  tags?: DietTag[];
  labels: Record<DietTag, string>;
}) {
  if (!tags?.length) return null;
  return (
    <span className="menu__tags">
      {tags.map((t) => (
        <abbr key={t} className="menu__tag" title={labels[t]}>
          {t}
        </abbr>
      ))}
    </span>
  );
}

export function Menu() {
  const t = useT();
  const m = t.menu;
  const [tab, setTab] = useState<TabId>("degustacion");
  const reduceMotion = useReducedMotion();
  const panelId = useId();

  const tabs: { id: TabId; label: string }[] = [
    { id: "degustacion", label: m.tabs.tasting },
    { id: "carta", label: m.tabs.carte },
  ];

  return (
    <section className="menu section" id="menu">
      <div className="container">
        <Reveal className="menu__head">
          <p className="eyebrow">{m.eyebrow}</p>
          <h2 className="menu__title">{m.title}</h2>
          <p className="menu__note">{m.note}</p>
        </Reveal>

        <div className="menu__tabs" role="tablist" aria-label={m.typeAria}>
          {tabs.map((tb) => {
            const active = tb.id === tab;
            return (
              <button
                key={tb.id}
                role="tab"
                id={`tab-${tb.id}`}
                aria-selected={active}
                aria-controls={`${panelId}-${tb.id}`}
                tabIndex={active ? 0 : -1}
                className="menu__tab"
                data-active={active}
                onClick={() => setTab(tb.id)}
              >
                {tb.label}
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
          {/* swap por `key`: React desmonta el panel anterior y monta el nuevo
              con un fade de entrada. Sin AnimatePresence => sin animación de
              salida que pueda quedarse trabada (pestaña en segundo plano, etc.). */}
          <motion.div
            key={tab}
            id={`${panelId}-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === "degustacion" ? <Tasting m={m} /> : <ALaCarte m={m} />}
          </motion.div>
        </div>

        <p className="menu__legend">
          {DIET_TAGS.map((tag) => (
            <span key={tag}>
              <b>{tag}</b> {m.diet[tag]}
            </span>
          ))}
          <span>{m.pricesNote}</span>
        </p>
      </div>
    </section>
  );
}

function Tasting({ m }: { m: MenuText }) {
  return (
    <div className="tasting">
      <div className="tasting__aside">
        <p className="tasting__name">{m.tasting.name}</p>
        <p className="tasting__meta">
          {m.tasting.perPerson(TASTING.courses, price(TASTING.price))}
        </p>
        <p className="tasting__meta tasting__meta--muted">
          {m.tasting.pairing(price(TASTING.pairing))}
        </p>
        <p className="tasting__desc">{m.tasting.description}</p>
      </div>

      <ol className="tasting__steps">
        {m.tasting.steps.map((step, i) => (
          <li key={i} className="tasting__step">
            <span className="tasting__step-num">
              {String(i + 1).padStart(2, "0")}
            </span>
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

function ALaCarte({ m }: { m: MenuText }) {
  return (
    <div className="carte">
      {ALACARTE.map((group) => (
        <section key={group.id} className="carte__group">
          <h3 className="carte__group-title">
            {m.groups[group.id as keyof typeof m.groups]}
          </h3>
          <ul className="carte__list">
            {group.items.map((dish) => {
              const text = m.dishes[dish.id];
              return (
                <li key={dish.id} className="carte__item">
                  <div className="carte__item-head">
                    <span className="carte__item-name">
                      {text.name}
                      <Tags tags={dish.tags} labels={m.diet} />
                    </span>
                    <span className="carte__dots" aria-hidden="true" />
                    <span className="carte__item-price">{price(dish.price)}</span>
                  </div>
                  <p className="carte__item-desc">{text.desc}</p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
