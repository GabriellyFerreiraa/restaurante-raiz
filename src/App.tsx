import { SmoothScroll } from "./components/SmoothScroll";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Philosophy } from "./components/Philosophy";
import { Menu } from "./components/Menu";
import { Space } from "./components/Space";
import { Reservation } from "./components/Reservation";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <SmoothScroll>
      <a className="skip-link" href="#menu">
        Saltar al menú
      </a>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Menu />
        <Space />
        <Reservation />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
