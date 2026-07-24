# DESIGN.md — Boda Real · Ron & Mish

Sistema de diseño de la invitación web. Este documento es la fuente de
verdad estética; todo componente nuevo debe respetarlo.

**Dirección de arte:** _Editorial Warm Minimalist · Mármol & Oro_ — inspirada
en el modelo "Nuestra Boda" de Canva, en **formato celular** (columna angosta
`max-w-[28rem]` centrada). **Fondo de mármol muy notorio** sobre el que el
contenido flota como **"cartas"** (paneles crema). Tipografías redondeadas,
acentos dorados y florales de magnolia. Abre con una **carta minimalista**
(`Envelope`) dibujada solo con las **uniones/dobleces** de un sobre (líneas
doradas de las esquinas al centro + sello R&M) que, al tocarse, se desliza
hacia arriba y revela todo el contenido. Nada de azules/índigos genéricos.

**Fondo & cartas:** el `body` usa `src/assets/marble.svg` (mármol generado
con filtros SVG `feDiffuseLighting` + vetas, autocontenido) a pantalla
completa (fixed, cover) + un glow dorado. Las secciones son transparentes;
su contenido va dentro de `Panel` (crema, borde oro, sombra) o de tarjetas
propias, de modo que todo se lee como una carta sobre el mármol.

**Fotos:** los espacios de foto (`components/ui/Photo.jsx`) muestran un
marcador elegante hasta que se suban las imágenes a `public/images/`. La
**portada** (`PhotoHero`) es una sección a pantalla completa cuyo fondo es la
foto de los novios, con **"BODA REAL", el monograma "R&M" y "¡Nos casamos!"**
superpuestos. El fondo de Cuenta Regresiva y el de la sección final también
usan foto; hay una **galería de 4 fotos** (2×2) debajo de los padrinos.

---

## 1. Paleta de color (tokens)

Definida en `tailwind.config.js` (clases) y `src/index.css` (variables CSS).

| Rol                          | Token Tailwind   | Variable CSS   | Hex       |
| ---------------------------- | ---------------- | -------------- | --------- |
| Fondo perla (principal)      | `pearl`          | `--pearl`      | `#F5EFE7` |
| Crema (secciones alternas)   | `sand`           | `--sand`       | `#EDE4D6` |
| Superficie de tarjeta        | `card`           | `--card`       | `#FCF8F2` |
| Texto principal (espresso)   | `ink`            | `--ink`        | `#473D31` |
| Texto secundario (topo)      | `ink-soft`       | `--ink-soft`   | `#857562` |
| Oro metálico (CTA)           | `gold`           | `--gold`       | `#D4AF37` |
| Oro apagado                  | `gold-muted`     | `--gold-muted` | `#C5A059` |
| Champán (acento)             | `gold-champagne` | `--champagne`  | `#E5C158` |
| Oro profundo (texto legible) | `gold-deep`      | `--gold-deep`  | `#7A5F24` |
| Piedra clara (bordes)        | `stone`          | `--stone`      | `#E0D6C7` |

**Reglas de uso**

- Fondo de página: `pearl`; secciones alternas en `sand` para dar ritmo.
- Texto principal sobre perla: `ink`; texto tenue: `ink-soft`.
- Etiquetas doradas pequeñas (eyebrows) y microtexto: `gold-deep`
  (contraste AA sobre perla). Evita `gold`/`gold-muted` para texto pequeño.
- Tarjetas: `.card-luxe` (crema con borde foil) o `.card-ivory` (blanco).
- El oro es un acento (bordes, íconos, CTA, foil), nunca un fondo grande.
- Borde foil estándar: `border border-gold/30`.

## 2. Tipografía (Google Fonts)

Cargadas en `index.html`. Combinación **redondeada y suave**.

| Uso                     | Familia            | Clase Tailwind |
| ----------------------- | ------------------ | -------------- |
| Nombres / script        | **Dancing Script** | `font-script`  |
| Títulos de sección      | **Fraunces**       | `font-display` |
| Frases románticas       | **Fraunces** _it._ | `font-serif`   |
| Cuerpo / UI / botones   | **Quicksand**      | `font-sans`    |

- Los nombres usan **Dancing Script** (redondeada, equilibrada) con
  `font-bold` para que "Ron", "&" y "Mish" combinen y se lean con contraste.
- `.font-script` lleva `line-height: 1.2` global + `pb` puntual para que las
  letras y florituras **nunca se corten**.

- Nombres de los novios y títulos florales: `font-script` (Great Vibes),
  fluido y elegante. Se usa también con `.text-gold-foil`.
- Títulos de sección: `font-display` (Fraunces), serif suave y redondeado.
- Frases en cursiva: `font-serif italic` (Fraunces).
- Etiquetas, botones y formularios: `font-sans` (Quicksand), redondeada.
- Espaciados de letra: `tracking-luxe` (0.28em) para eyebrows en versalitas;
  `tracking-wide2` (0.16em) para botones.

## 3. Componentes utilitarios (`@layer components` en `index.css`)

- `.eyebrow` — versalita dorada (`gold-deep`) para encabezar secciones.
- `.text-gold-foil` / `.text-gold-foil-anim` — texto con degradado oro
  metálico afinado para leerse sobre perla (con shimmer en la variante).
- `.btn-gold` — CTA principal, degradado oro, texto obsidiana, glow al hover.
- `.btn-outline` — botón secundario, contorno oro + texto `gold-deep`.
- `.btn-outline-dark` — alias de `.btn-outline` (compatibilidad).
- `.card-luxe` — tarjeta crema (`card`) con borde foil y sombra suave.
- `.card-ivory` — tarjeta blanca de máximo contraste.
- `.divider-ornate` — separador con diamante/hoja central dorado.
- `.section-pad` — ritmo vertical estándar de sección.

## 4. Movimiento

- **Framer Motion** para entradas al hacer scroll: envoltorio `Section`
  (`whileInView`, `once: true`) y `FadeItem` para escalonar hijos.
- Easing de marca: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Micro-animaciones CSS: `shimmer` (foil), `bob` (indicador de scroll),
  `spin-slow` (spinner / anillo del reproductor).
- Respeta `prefers-reduced-motion` (neutralizado en `index.css`).

## 5. Detalles visuales

- Glow ambiental cálido y suave fijo (`body` background, radiales dorados).
- Acentos botánicos de magnolia en línea (`components/ui/Botanical.jsx`),
  en oro apagado y baja opacidad, en las esquinas.
- Scrollbar y `::selection` teñidos de oro.

## 6. Estructura de secciones (orden en `App.jsx`)

0. **Envelope** — carta de uniones a pantalla completa (gate).
1. **PhotoHero** — portada a pantalla completa: foto de fondo + "BODA REAL",
   monograma "R&M" y "¡Nos casamos!".
2. **Hero** — nombres de los novios en script + fecha.
3. **Intro** — frase de introducción.
4. **Family** — padres del novio / de la novia (2 columnas) + padrinos.
5. **Gallery** — 4 fotos de los novios (2×2).
6. **Countdown** — cuenta regresiva al `date.iso` (24/04/2027, 8:00 AM −05:00),
   con foto de fondo.
7. **LocationMap** — dos ceremonias: Religiosa (Catedral, 8 AM) y Civil
   (Hotel Shullkas, 11 AM), cada una con Google Maps + Waze, más "Agendar".
8. **Itinerary** — línea de tiempo del día.
9. **HotelReservation** — hospedaje (Hotel RN Shullkas Suites).
10. **DressCode** — etiqueta / código de vestimenta.
11. **NoKids** — "No niños" (solo adultos).
12. **RsvpForm** — confirmación de asistencia (3 campos).
13. **GiftRegistry** — mesa de regalos (Yape/Plin/BCP/CCI).
14. **Footer** — cierre con foto de fondo + reproductor de audio flotante.

## 7. Accesibilidad

- CTA con `aria-label` descriptivo; enlaces externos con `target="_blank"`
  + `rel="noopener noreferrer"`.
- Contador con resumen `aria-live="polite"`.
- Modal RSVP con `role="dialog"`, `aria-modal`, `aria-labelledby`.
- Foco visible dorado (`focus-visible:ring-gold`) en todos los controles.
- Contraste de texto conforme a WCAG AA sobre perla y sobre tarjetas.

## 8. Regla de oro del contenido

Todo el contenido editable vive en `src/data/eventData.json`. Para cambiar
nombres, fechas, padres, padrinos, links, horarios o datos bancarios, edita
ese archivo — no los componentes.
