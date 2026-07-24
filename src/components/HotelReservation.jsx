import { BedDouble, MapPin, Phone, MessageCircle } from 'lucide-react';
import Section, { FadeItem } from './ui/Section.jsx';
import Divider from './ui/Divider.jsx';
import Botanical from './ui/Botanical.jsx';
import eventData from '../data/eventData.json';

export default function HotelReservation() {
  const { hotel } = eventData;

  return (
    <Section id="hospedaje" className="section-pad relative">
      <div className="mx-auto max-w-3xl text-center">
        <FadeItem>
          <p className="eyebrow mb-4">{hotel.eyebrow}</p>
          <h2 className="font-display text-3xl text-ink sm:text-5xl">
            ¿Dónde hospedarte?
          </h2>
          <Divider className="my-8" icon="leaf" />
        </FadeItem>

        <FadeItem delay={0.1}>
          <div className="card-ivory relative overflow-hidden px-6 py-10 text-center sm:px-12 sm:py-12">
            <Botanical
              position="top-right"
              className="right-0 top-0 text-gold-muted opacity-20"
              size={160}
            />

            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
              <BedDouble className="h-6 w-6 text-gold-muted" strokeWidth={1.5} />
            </span>

            <h3 className="mt-6 font-display text-2xl text-ink sm:text-3xl">
              {hotel.name}
            </h3>
            <p className="mx-auto mt-3 max-w-md font-serif text-lg text-ink-soft">
              {hotel.tagline}
            </p>

            <div className="mt-6 flex flex-col items-center gap-2 font-sans text-sm text-ink/80">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-muted" strokeWidth={1.5} />
                {hotel.city}
              </span>
              <a
                href={`tel:${hotel.phoneRaw}`}
                className="flex items-center gap-2 transition-colors hover:text-gold-muted"
              >
                <Phone className="h-4 w-4 text-gold-muted" strokeWidth={1.5} />
                {hotel.phone}
              </a>
            </div>

            <p className="mx-auto mt-5 max-w-sm font-serif text-base italic text-ink-soft">
              {hotel.note}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={hotel.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-dark w-full sm:w-auto"
                aria-label="Ver la ubicación del hotel en Google Maps (nueva pestaña)"
              >
                <MapPin className="h-4 w-4" strokeWidth={2} />
                Ver Ubicación del Hotel
              </a>
              <a
                href={hotel.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full sm:w-auto"
                aria-label="Reservar el hotel por WhatsApp (nueva pestaña)"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
                Reservar por WhatsApp
              </a>
            </div>
          </div>
        </FadeItem>
      </div>
    </Section>
  );
}
