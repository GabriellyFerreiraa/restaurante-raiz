# Raíz — cocina de estación

Landing editorial para un restaurante ficticio, con menú de estación y reserva
en línea. **Proyecto 1 de 5** de mi serie de piezas de portafolio frontend.

**[Ver sitio en vivo →](https://restaurante-raiz.vercel.app)**

## Qué muestra

- **Tipografía editorial** con escala fluida (`clamp()`), *Fraunces* variable para
  display e *Inter* variable para lectura.
- **Foto a sangre** con `<Figure>`: `srcset`/`sizes`, `loading`/`fetchpriority`,
  fundido de entrada y color sólido de respaldo si la imagen no carga.
- **Microinteracciones** con Framer Motion: parallax del hero atado al scroll,
  aparición al entrar en viewport, subrayado de pestañas con `layoutId`,
  transición entre paneles del menú.
- **Formulario de reserva con estados** (`idle → submitting → success | error`):
  validación con Zod + React Hook Form, errores por campo, `aria-live`, foco al
  primer error, panel de confirmación y camino de error con reintento.
- **Scroll suave** con Lenis y navegación por anclas, desactivado
  automáticamente con `prefers-reduced-motion`.
- **Accesibilidad**: landmarks, `label` en todos los campos, `radiogroup`,
  `tablist`/`tabpanel`, skip link, foco visible, respeto de *reduced motion*.
- **Responsive** de 320 px a pantallas anchas, sin scroll horizontal.

## Stack

Vite · React 19 · TypeScript · Framer Motion · React Hook Form · Zod · Lenis ·
Fontsource. CSS a mano (custom properties + archivos por componente), sin
framework de estilos.

## Correr el proyecto

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build de producción
npm run preview    # sirve el build
```

## Probar el formulario

- Completá los campos y confirmá: verás el estado `submitting` (~1,4 s) y luego
  el panel de confirmación con código.
- Para ver el **estado de error**, usá un email terminado en `@error.test`
  (ej. `ana@error.test`). El envío simulado falla y aparece el banner con
  reintento.

## Fotos

Las imágenes vienen del CDN de Unsplash para que el repo no cargue binarios.
Están centralizadas en [`src/data/images.ts`](src/data/images.ts): reemplazá
cada `id` por una ruta local (`/img/hero.jpg` en `public/img/`) para usar fotos
propias. `<Figure>` arma el `srcset` a partir de ese archivo.

## Estructura

```
src/
  components/      un .tsx + .css por componente
    SmoothScroll   provider de Lenis + hook useScrollTo
    Figure         imagen responsive con fallback
    Reveal         wrapper de aparición al hacer scroll
  data/            menú e imágenes (contenido separado de la UI)
  hooks/           useScrolled
  lib/             format.ts (precios en ARS, fechas es-AR)
  styles/          tokens.css · global.css · buttons.css
```
