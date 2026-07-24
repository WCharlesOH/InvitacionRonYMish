# Boda Real · Ron & Mish 🤍

Invitación web de boda de una sola página en **formato celular** — fondo de
**mármol**, contenido en forma de "cartas", tipografías redondeadas, inspirada
en el modelo "Nuestra Boda" de Canva. Abre con una **carta a pantalla
completa** que se desliza para revelar todo. Construida con **Vite + React +
Tailwind CSS + Framer Motion + Lucide**.

> **24 de Abril de 2027 · Huancayo, Provincia de Junín, Perú**

## ✨ Secciones

0. **Sobre** — carta a pantalla completa dibujada con las uniones/dobleces
   (líneas doradas) + sello R&M; se toca para abrir.
1. **Portada (foto)** — sección a pantalla completa con la **foto** de fondo y
   **BODA REAL · R&M · ¡Nos casamos!** superpuestos.
2. **Novios** — nombres de los novios (script) y fecha.
2. **Intro** — frase de introducción.
3. **Familia** — padres del novio y de la novia (2 columnas) + padrinos.
4. **Galería** — 4 fotos de los novios (debajo de los padrinos).
5. **Cuenta Regresiva** — contador en tiempo real, con **foto de fondo** de
   los novios.
5. **Nuestras Ceremonias** — Ceremonia Religiosa (Catedral de Huancayo,
   8:00 AM) y Ceremonia Civil (Hotel RN Shullkas, 11:00 AM), cada una con
   Google Maps + Waze, más "Agendar en mi Calendario" (Google + `.ics`).
6. **Itinerario** — línea de tiempo del día.
7. **Hospedaje** — Hotel RN Shullkas Suites, con ubicación y WhatsApp.
8. **Código de Vestimenta** — Elegante / Formal.
9. **No niños** — celebración solo para adultos.
10. **RSVP** — confirmación de asistencia (nombre, asistencia, teléfono) con
    validación, spinner y modal dorado de agradecimiento.
11. **Mesa de Regalos** — acordeón con Yape/Plin/cuenta/CCI y botón "Copiar".
12. **Reproductor de audio** flotante para música ambiental.

## 🚀 Puesta en marcha

```bash
npm install
npm run dev      # servidor local en http://localhost:5173
npm run build    # build de producción → dist/
npm run preview  # previsualiza el build
```

## ✏️ Editar el contenido

**Todo** el contenido vive en un solo archivo:

```
src/data/eventData.json
```

Nombres, fecha, textos, padres, padrinos, enlaces de mapas, datos del hotel
y datos bancarios (Yape/Plin/CBU/CCI) — edítalos ahí, sin tocar los
componentes.

> Son **marcadores de ejemplo** que debes reemplazar por los reales antes de
> publicar: los nombres de los **padres** (`family.groomParents`,
> `family.brideParents`) y **padrinos** (`family.padrinos`), y los **datos
> bancarios** (`gifts.methods`).

### Fecha del evento

El contador apunta a `date.iso` = `2027-04-24T08:00:00-05:00` (8:00 AM hora
de Perú, inicio de la Ceremonia Religiosa). Cambia ese valor en
`eventData.json` si la hora varía.

### Conectar el RSVP a Google Sheets

Sigue [`docs/google-apps-script.md`](docs/google-apps-script.md) y coloca la
URL del Web App en `.env`:

```
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/XXXX/exec
```

Sin esa variable, el formulario funciona en **modo demo** guardando las
confirmaciones en `localStorage`.

### Fotos de los novios

Coloca las fotos en `public/images/` con los nombres indicados en
[`public/images/README.md`](public/images/README.md) (portada, fondos de la
cuenta regresiva y de la sección final, y 4 fotos de galería). Mientras no
existan, se muestran marcadores elegantes y nada se rompe.

### Música de fondo

Coloca tu pista en `public/audio/ambient.mp3` (ver
[`public/audio/README.md`](public/audio/README.md)). La música intenta
iniciarse sola al **abrir el sobre** (gesto del usuario); si no hay archivo,
simplemente no suena.

## 🎨 Diseño

El sistema de diseño (paleta, tipografía, componentes) está documentado en
[`DESIGN.md`](DESIGN.md).

## ☁️ Despliegue (hosting estático)

El build genera una carpeta `dist/` estática, lista para:

- **Netlify** — arrastra `dist/`, o conecta el repo (build: `npm run build`,
  publish: `dist`).
- **Vercel** — framework preset **Vite**, sin configuración extra.
- **GitHub Pages** — publica el contenido de `dist/`.

`vite.config.js` usa `base: './'` (rutas relativas), por lo que funciona
también en subcarpetas.

---

Hecho con cariño para **Ron & Mish** 💛
