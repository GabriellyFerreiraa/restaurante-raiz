import { Reveal } from "./Reveal";
import { Figure } from "./Figure";
import { photos } from "../data/images";
import "./Philosophy.css";

const FACTS = [
  { value: "90 km", label: "radio de donde llega casi todo" },
  { value: "12", label: "mesas por servicio" },
  { value: "7", label: "pasos en el menú Raíz" },
  { value: "2019", label: "primer servicio" },
];

export function Philosophy() {
  return (
    <section className="phil section" id="filosofia">
      <div className="phil__grid container container--wide">
        <div className="phil__text">
          <Reveal>
            <p className="eyebrow">La idea</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="phil__statement">
              No elegimos el menú. Lo elige la tierra y nosotros ordenamos los
              platos.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="phil__body">
              Trabajamos con seis productores del cordón hortícola bonaerense y
              un tambo en Suipacha. Compramos lo que está listo, no lo que
              figura en una carta impresa hace seis meses. Si el jueves entran
              alcauciles, el viernes hay alcauciles.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="phil__body">
              Fermentamos, encurtimos y secamos para estirar cada cosecha. Nada
              de lo que entra a la cocina se tira: el recorte de hoy es el caldo
              de mañana y la cáscara es el vinagre del mes que viene.
            </p>
          </Reveal>

          <Reveal className="phil__facts" delay={0.2}>
            {FACTS.map((fact) => (
              <div key={fact.label} className="phil__fact">
                <span className="phil__fact-value">{fact.value}</span>
                <span className="phil__fact-label">{fact.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="phil__media" delay={0.1}>
          <Figure
            photo={photos.produce}
            sizes="(max-width: 60rem) 100vw, 40vw"
          />
          <figcaption className="phil__caption">
            Entrega de los martes — huerta de Open Sky, Mercedes.
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
