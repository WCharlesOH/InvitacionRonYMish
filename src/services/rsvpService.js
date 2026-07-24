// ─────────────────────────────────────────────────────────────
//  rsvpService — handles submitting the attendance confirmation.
//
//  Primary path:  POST to a Google Apps Script Web App endpoint
//                 (configured via the VITE_GOOGLE_SHEETS_URL env var),
//                 which appends the row to a Google Sheet.
//
//  Fallback path: if no endpoint is configured — or the network call
//                 fails — the confirmation is persisted to localStorage
//                 so nothing is ever lost (demo / offline mode).
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'boda-real:rsvps';
const ENDPOINT = import.meta.env.VITE_GOOGLE_SHEETS_URL;

/** Read every confirmation stored locally. */
export function getLocalRsvps() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

/** Append a confirmation to localStorage. */
function saveLocal(record) {
  try {
    const all = getLocalRsvps();
    all.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // localStorage may be unavailable (private mode); fail silently.
  }
}

/**
 * Submit an RSVP.
 * @param {{ nombre_completo: string, asistencia: 'si'|'no', telefono: string }} data
 * @returns {Promise<{ ok: boolean, mode: 'remote'|'local'|'local-fallback' }>}
 */
export async function submitRsvp(data) {
  const record = {
    ...data,
    asistencia_label:
      data.asistencia === 'si' ? 'Sí, asistiré' : 'No podré asistir',
    timestamp: new Date().toISOString(),
    user_agent:
      typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
  };

  // No endpoint configured → local demo mode.
  if (!ENDPOINT) {
    saveLocal(record);
    return { ok: true, mode: 'local' };
  }

  try {
    // Google Apps Script Web Apps do not send permissive CORS headers,
    // so we use `no-cors`. The response is opaque (unreadable), but the
    // request still reaches the script and appends the row. A resolved
    // promise means the request was dispatched successfully.
    await fetch(ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(record),
    });
    // Keep a local copy too, as a safety net.
    saveLocal(record);
    return { ok: true, mode: 'remote' };
  } catch (err) {
    // Network failure → never lose the guest's response.
    // eslint-disable-next-line no-console
    console.error('[rsvpService] remote submit failed, saved locally:', err);
    saveLocal(record);
    return { ok: true, mode: 'local-fallback' };
  }
}
