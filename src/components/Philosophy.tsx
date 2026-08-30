import { Reveal } from "./Reveal";
import { Figure } from "./Figure";
import { photos } from "../data/images";
import { useT } from "../i18n/lang";
import "./Philosophy.css";

export function Philosophy() {
  const t = useT();

  return (
    <section className="phil section" id="filosofia">
      <div className="phil__grid container container--wide">
        <div className="phil__text">
          <Reveal>
            <p className="eyebrow">{t.philosophy.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="phil__statement">{t.philosophy.statement}</h2>
          </Reveal>
          {t.philosophy.body.map((para, i) => (
            <Reveal key={i} delay={0.1 + i * 0.05}>
              <p className="phil__body">{para}</p>
            </Reveal>
          ))}

          <Reveal className="phil__facts" delay={0.2}>
            {t.philosophy.facts.map((fact) => (
              <div key={fact.label} className="phil__fact">
                <span className="phil__fact-value">{fact.value}</span>
                <span className="phil__fact-label">{fact.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="phil__media" delay={0.1}>
          <Figure photo={photos.produce} sizes="(max-width: 60rem) 100vw, 40vw" />
          <figcaption className="phil__caption">
            {t.philosophy.caption}
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
