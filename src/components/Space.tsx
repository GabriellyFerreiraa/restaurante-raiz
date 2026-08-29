import { Reveal } from "./Reveal";
import { Figure } from "./Figure";
import { photos } from "../data/images";
import "./Space.css";

export function Space() {
  return (
    <section className="space" id="mesa">
      <div className="space__media">
        <Figure photo={photos.room} sizes="100vw" />
      </div>

      <div className="space__inner container container--wide">
        <div className="space__text">
          <Reveal>
            <p className="eyebrow space__eyebrow">La mesa</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="space__title">
              Un salón, doce mesas, una sola cocina abierta.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="space__body">
              No hay barra de espera ni segundo turno apurado. Reservás una mesa
              y es tuya toda la noche. La cocina está a la vista: vas a escuchar
              el fuego y ver salir cada plato.
            </p>
          </Reveal>
          <Reveal className="space__list" delay={0.15}>
            <dl>
              <div>
                <dt>Formato</dt>
                <dd>Degustación de 7 pasos o à la carte, misma sala.</dd>
              </div>
              <div>
                <dt>Grupos</dt>
                <dd>Hasta 8 personas en línea; más de 8 lo armamos aparte.</dd>
              </div>
              <div>
                <dt>Cocina abierta</dt>
                <dd>Pedí la mesa 1 o 2 si querés estar frente a las brasas.</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
