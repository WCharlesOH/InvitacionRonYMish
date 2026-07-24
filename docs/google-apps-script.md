# Conectar el RSVP con Google Sheets

El formulario de confirmación envía cada respuesta a un **Web App de Google
Apps Script**, que la escribe como una fila en tu Google Sheet.

## 1. Crea la hoja

1. Crea una Google Sheet nueva (p. ej. "Boda Real — RSVP").
2. En la fila 1 pon los encabezados:

   | timestamp | nombre_completo | asistencia | asistencia_label | telefono | user_agent |
   | --------- | --------------- | ---------- | ---------------- | -------- | ---------- |

## 2. Pega el script

En la hoja: **Extensiones → Apps Script**, borra lo que haya y pega:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.nombre_completo || '',
      data.asistencia || '',
      data.asistencia_label || '',
      data.telefono || '',
      data.user_agent || '',
    ]);
    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. Implementa como aplicación web

1. **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
   - Descripción: `RSVP Boda Real`
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
3. **Implementar** y autoriza los permisos.
4. Copia la **URL de la aplicación web** (termina en `/exec`).

## 4. Configura el proyecto

Crea un archivo `.env` en la raíz (copia de `.env.example`) y pega la URL:

```
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfy.../exec
```

Reinicia `npm run dev`. Listo: cada confirmación aparecerá en la hoja.

> **Nota sobre CORS:** el `fetch` usa `mode: 'no-cors'`, por lo que el
> navegador no puede leer la respuesta, pero la fila sí se escribe. El
> formulario siempre guarda además una copia en `localStorage` como
> respaldo. Si dejas `VITE_GOOGLE_SHEETS_URL` vacío, todo funciona en modo
> demo usando solo `localStorage`.
