import { useEffect, useMemo, useState } from 'react';
import { Heart } from 'lucide-react';
import Section, { FadeItem } from './ui/Section.jsx';
import Divider from './ui/Divider.jsx';
import Photo from './ui/Photo.jsx';
import eventData from '../data/eventData.json';

/** Compute the remaining time between now and the target date. */
function getRemaining(target) {
  const total = target - Date.now();
  const clamped = Math.max(total, 0);
  return {
    total,
    dias: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    horas: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((clamped / (1000 * 60)) % 60),
    segundos: Math.floor((clamped / 1000) % 60),
  };
}

const UNITS = [
  { key: 'dias', label: 'Días' },
  { key: 'horas', label: 'Horas' },
  { key: 'minutos', label: 'Minutos' },
  { key: 'segundos', label: 'Segundos' },
];

export default function Countdown() {
  const { photos } = eventData;
  const target = useMemo(() => new Date(eventData.date.iso).getTime(), []);
  const [time, setTime] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const isOver = time.total <= 0;

  return (
    <Section
      id="cuenta-regresiva"
      className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32"
    >
      {/* Couple-photo background (dark base + photo + tint for legibility) */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a231b] via-[#3b3025] to-[#241d16]" />
        <Photo
          src={photos.countdownBg}
          showFallback={false}
          rounded=""
          className="absolute inset-0 h-full w-full opacity-80"
        />
        <div className="absolute inset-0 bg-obsidian/55" />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.35] mix-blend-overlay" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <FadeItem>
          <p className="font-sans text-xs font-semibold uppercase tracking-luxe text-gold-champagne sm:text-sm">
            ¿Cuánto falta?
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-5xl">
            Cuenta Regresiva
          </h2>
          <Divider className="my-8" icon="leaf" />
        </FadeItem>

        {isOver ? (
          <FadeItem>
            <p className="flex items-center justify-center gap-3 font-script text-4xl text-gold-champagne sm:text-5xl">
              <Heart className="h-7 w-7" strokeWidth={1.5} /> ¡Hoy es el gran día!
            </p>
          </FadeItem>
        ) : (
          <FadeItem
            delay={0.1}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
          >
            {UNITS.map(({ key, label }) => (
              <div
                key={key}
                className="flex flex-col items-center rounded-2xl border border-gold/40 bg-white/10 px-2 py-6 backdrop-blur-md sm:py-8"
              >
                <span
                  className="tabular-nums font-display text-4xl leading-none text-gold-champagne sm:text-6xl"
                  aria-hidden="true"
                >
                  {String(time[key]).padStart(2, '0')}
                </span>
                <span className="mt-3 font-sans text-[0.65rem] uppercase tracking-luxe text-white/70 sm:text-xs">
                  {label}
                </span>
              </div>
            ))}
          </FadeItem>
        )}

        <p className="sr-only" aria-live="polite">
          {isOver
            ? 'La celebración ha comenzado.'
            : `Faltan ${time.dias} días, ${time.horas} horas, ${time.minutos} minutos y ${time.segundos} segundos.`}
        </p>

        <FadeItem delay={0.2}>
          <p className="mt-10 font-serif text-lg italic text-white/80">
            para el {eventData.date.display}
          </p>
        </FadeItem>
      </div>
    </Section>
  );
}
