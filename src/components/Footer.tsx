import { useScrollTo } from "./SmoothScroll";
import "./Footer.css";

export function Footer() {
  const scrollTo = useScrollTo();
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="visita">
      <div className="footer__grid container container--wide">
        <div className="footer__brand">
          <p className="footer__word">Raíz</p>
          <p className="footer__tagline">Cocina de estación desde 2019.</p>
        </div>

        <div className="footer__col">
          <h3>Visitá</h3>
          <address>
            Gorriti 4820, Palermo
            <br />
            Ciudad de Buenos Aires
          </address>
          <p>
            <a
              href="https://maps.google.com/?q=Gorriti+4820+Buenos+Aires"
              target="_blank"
              rel="noreferrer noopener"
            >
              Cómo llegar
            </a>
          </p>
        </div>

        <div className="footer__col">
          <h3>Horarios</h3>
          <p>
            Miércoles a sábado
            <br />
            Turnos 19:00 y 21:15
          </p>
          <p className="footer__muted">Domingo, lunes y martes: cerrado</p>
        </div>

        <div className="footer__col">
          <h3>Contacto</h3>
          <p>
            <a href="tel:+541148200000">+54 11 4820 0000</a>
            <br />
            <a href="mailto:hola@raiz.rest">hola@raiz.rest</a>
          </p>
          <p className="footer__social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer noopener">
              Instagram
            </a>
            <a href="https://ig.com" target="_blank" rel="noreferrer noopener">
              Newsletter
            </a>
          </p>
        </div>
      </div>

      <div className="footer__bar container container--wide">
        <button type="button" onClick={() => scrollTo("#top")}>
          Volver arriba ↑
        </button>
        <p>
          © {year} Raíz. Sitio de demostración — proyecto de portafolio, no es un
          local real.
        </p>
      </div>
    </footer>
  );
}
