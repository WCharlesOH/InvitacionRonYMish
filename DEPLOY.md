# Despliegue en GitHub Pages 🚀

El proyecto ya está **listo para publicarse** en GitHub Pages:

- `vite.config.js` usa `base: './'` (rutas relativas) → funciona en
  `https://<usuario>.github.io/<repo>/` sin depender del nombre del repo.
- `gh-pages` instalado y scripts `predeploy` / `deploy` configurados.
- Se genera un `.nojekyll` para que GitHub sirva todos los archivos.
- Build verificado con Vite 8 (`npm run build`).

---

## ✅ Antes de publicar (checklist)

1. **Fotos** en `public/images/` (ver `public/images/README.md`):
   `novios-hero.jpg`, `novios-countdown.jpg`, `novios-final.jpg`,
   `novios-1.jpg` … `novios-4.jpg`. _(Sin ellas se ven marcadores.)_
2. **Música** (opcional): `public/audio/ambient.mp3`.
3. **Datos** en `src/data/eventData.json`: revisa los **datos bancarios**
   (`gifts.methods`) — siguen siendo de ejemplo. _(Padres y padrinos ya están
   con los nombres reales.)_
4. **RSVP** (opcional): crea `.env` con `VITE_GOOGLE_SHEETS_URL=...` (ver
   `docs/google-apps-script.md`). Sin esto, el formulario guarda en
   `localStorage` (modo demo). ⚠️ La variable se lee **al compilar**, así que
   debe existir antes de `npm run deploy`.

---

## Opción A — `gh-pages` (recomendada, ya configurada)

Publica la carpeta `dist/` compilada en una rama `gh-pages`.

### 1) Sube el proyecto a GitHub (solo la primera vez)

```bash
git init
git add .
git commit -m "Invitación Boda Real · Ron & Mish"
git branch -M main
git remote add origin https://github.com/<usuario>/<repo>.git
git push -u origin main
```

### 2) Despliega

```bash
npm run deploy
```

Esto ejecuta `npm run build` y luego publica `dist/` en la rama `gh-pages`.

### 3) Activa Pages (solo la primera vez)

En GitHub: **Settings → Pages**
- **Source:** _Deploy from a branch_
- **Branch:** `gh-pages` / `/(root)` → **Save**

Tu sitio quedará en:

```
https://<usuario>.github.io/<repo>/
```

> Ábrelo **con la barra final `/`**. La primera publicación puede tardar 1–2
> minutos.

### Para actualizar

Cada vez que cambies algo: `npm run deploy` otra vez.

---

## Opción B — GitHub Actions (alternativa automática)

Si prefieres que se publique solo al hacer `git push`, crea el archivo
`.github/workflows/deploy.yml` con:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
        # env:
        #   VITE_GOOGLE_SHEETS_URL: ${{ secrets.VITE_GOOGLE_SHEETS_URL }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Luego en **Settings → Pages → Source: _GitHub Actions_**.

> Usa **una sola** opción (A o B), no ambas: GitHub Pages tiene una única
> fuente de despliegue. Si defines el RSVP por `.env`, en Actions añádelo como
> _secret_ del repo y descomenta las líneas `env:`.
