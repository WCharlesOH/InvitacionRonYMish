# Música ambiental

Coloca aquí tu pista de fondo con el nombre exacto:

```
ambient.mp3
```

El reproductor flotante (`src/components/AudioPlayer.jsx`) la carga desde
`public/audio/ambient.mp3`. Si el archivo no existe, el botón simplemente no
se muestra — la página nunca se rompe.

**Recomendaciones**

- Formato: `.mp3` (compatibilidad universal). Peso sugerido < 3 MB.
- Usa música con licencia adecuada para uso web.
- Para cambiar el nombre del archivo, edita `audio.src` en
  `src/data/eventData.json`.
