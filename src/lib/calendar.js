// ─────────────────────────────────────────────────────────────
//  Calendar helpers — generates a downloadable .ics file and a
//  Google Calendar "add event" link for the wedding.
// ─────────────────────────────────────────────────────────────

/** Format a Date into the iCalendar UTC basic format: 20270424T230000Z */
function toICSDate(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Build the event window.
 * @param {string} startISO  Full ISO string incl. timezone offset, e.g.
 *                           "2027-04-24T18:00:00-05:00".
 * @param {number} durationHours  Event length in hours (default 6).
 */
function buildWindow(startISO, durationHours = 6) {
  const start = new Date(startISO);
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
  return { start, end };
}

/**
 * Create an .ics file as a Blob and trigger the browser download.
 */
export function downloadICS({
  startISO,
  durationHours = 6,
  title,
  description = '',
  location = '',
}) {
  const { start, end } = buildWindow(startISO, durationHours);
  const uid = `${toICSDate(start)}-bodareal@ronymish`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Boda Real//Ron & Mish//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${escapeICS(title)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    `LOCATION:${escapeICS(location)}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeICS(title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([lines.join('\r\n')], {
    type: 'text/calendar;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'boda-real-ron-y-mish.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Give the browser a tick before revoking the object URL.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Escape reserved characters per RFC 5545. */
function escapeICS(text = '') {
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Build a Google Calendar "render template" URL.
 */
export function googleCalendarUrl({
  startISO,
  durationHours = 6,
  title,
  description = '',
  location = '',
}) {
  const { start, end } = buildWindow(startISO, durationHours);
  const dates = `${toICSDate(start)}/${toICSDate(end)}`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates,
    details: description,
    location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
