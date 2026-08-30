import { Reveal } from "./Reveal";
import { Figure } from "./Figure";
import { photos } from "../data/images";
import { useT } from "../i18n/lang";
import "./Space.css";

export function Space() {
  const t = useT();
  const s = t.space;

  return (
    <section className="space" id="mesa">
      <div className="space__media">
        <Figure photo={photos.room} sizes="100vw" />
      </div>

      <div className="space__inner container container--wide">
        <div className="space__text">
          <Reveal>
            <p className="eyebrow space__eyebrow">{s.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="space__title">{s.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="space__body">{s.body}</p>
          </Reveal>
          <Reveal className="space__list" delay={0.15}>
            <dl>
              {s.facts.map((f) => (
                <div key={f.dt}>
                  <dt>{f.dt}</dt>
                  <dd>{f.dd}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
