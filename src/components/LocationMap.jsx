import { useState } from 'react';
import {
  MapPin,
  Navigation,
  CalendarPlus,
  Clock,
  Check,
  Church,
  Gem,
} from 'lucide-react';
import Section, { FadeItem } from './ui/Section.jsx';
import Divider from './ui/Divider.jsx';
import eventData from '../data/eventData.json';
import { downloadICS, googleCalendarUrl } from '../lib/calendar.js';

const ICONS = { church: Church, rings: Gem };

function CeremonyCard({ ceremony, delay }) {
  const Icon = ICONS[ceremony.icon] || MapPin;
  return (
    <FadeItem delay={delay} className="h-full">
      <div className="card-luxe flex h-full flex-col items-center px-6 py-9 text-center sm:px-8">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/5">
          <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
        </span>

        <h3 className="mt-5 font-display text-2xl text-ink">{ceremony.type}</h3>

        <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-sans text-sm font-semibold tracking-wide2 text-gold-deep">
          <Clock className="h-4 w-4" strokeWidth={2} />
          {ceremony.time}
        </span>

        <p className="mt-5 pb-1 font-script text-3xl text-gold-foil">
          {ceremony.venue}
        </p>
        {ceremony.venueSub && (
          <p className="mt-1 font-sans text-xs uppercase tracking-wide2 text-ink-soft">
            {ceremony.venueSub}
          </p>
        )}
        <p className="mt-3 font-serif text-base text-ink/80">
          {ceremony.address}
        </p>

        <div className="mt-auto flex w-full flex-col items-center gap-3 pt-7 sm:flex-row sm:justify-center">
          <a
            href={ceremony.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full sm:w-auto"
            aria-label={`Abrir ${ceremony.venue} en Google Maps (nueva pestaña)`}
          >
            <MapPin className="h-4 w-4" strokeWidth={2} />
            Google Maps
          </a>
          <a
            href={ceremony.wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline w-full sm:w-auto"
            aria-label={`Abrir ${ceremony.venue} en Waze (nueva pestaña)`}
          >
            <Navigation className="h-4 w-4" strokeWidth={2} />
            Waze
          </a>
        </div>
      </div>
    </FadeItem>
  );
}

export default function LocationMap() {
  const { ceremonies, date, couple, event } = eventData;
  const [showCalMenu, setShowCalMenu] = useState(false);

  const calendarPayload = {
    startISO: date.iso,
    durationHours: 10,
    title: `${event.name} · ${couple.partnerA} & ${couple.partnerB}`,
    description: `Ceremonia Religiosa (8:00 AM) y Ceremonia Civil (11:00 AM). ¡Te esperamos!`,
    location: ceremonies.list[0].venue,
  };

  return (
    <Section id="ubicacion" className="section-pad relative">
      <div className="mx-auto max-w-4xl text-center">
        <FadeItem>
          <p className="eyebrow mb-4">{ceremonies.eyebrow}</p>
          <h2 className="font-display text-3xl text-ink sm:text-5xl">
            {ceremonies.title}
          </h2>
          <Divider className="my-8" icon="leaf" />
          <p className="mx-auto mb-10 max-w-lg font-serif text-lg text-ink/75">
            {ceremonies.subtitle}
          </p>
        </FadeItem>

        <div className="grid grid-cols-1 gap-6">
          {ceremonies.list.map((c, i) => (
            <CeremonyCard key={c.type} ceremony={c} delay={i * 0.1} />
          ))}
        </div>

        {/* Add-to-calendar */}
        <FadeItem delay={0.2}>
          <div className="relative mt-9 flex justify-center">
            <button
              type="button"
              onClick={() => setShowCalMenu((v) => !v)}
              aria-expanded={showCalMenu}
              aria-haspopup="menu"
              className="btn-outline w-full sm:w-auto"
            >
              <CalendarPlus className="h-4 w-4" strokeWidth={2} />
              Agendar en mi Calendario
            </button>

            {showCalMenu && (
              <div
                role="menu"
                className="card-luxe absolute top-full z-20 mt-3 w-64 overflow-hidden p-2 text-left"
              >
                <a
                  role="menuitem"
                  href={googleCalendarUrl(calendarPayload)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowCalMenu(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 font-sans text-sm text-ink transition-colors hover:bg-gold/10"
                >
                  <Check className="h-4 w-4 text-gold" strokeWidth={2} />
                  Google Calendar
                </a>
                <button
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    downloadICS(calendarPayload);
                    setShowCalMenu(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-sans text-sm text-ink transition-colors hover:bg-gold/10"
                >
                  <CalendarPlus className="h-4 w-4 text-gold" strokeWidth={2} />
                  Apple / Outlook (.ics)
                </button>
              </div>
            )}
          </div>
        </FadeItem>
      </div>
    </Section>
  );
}
