import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Photo from './ui/Photo.jsx';
import eventData from '../data/eventData.json';

/**
 * PhotoHero — a full-screen splash whose entire background is the couple's
 * photo, with "BODA REAL", the R&M monogram and "¡Nos casamos!" overlaid.
 * Falls back to an elegant dark gradient until the photo is uploaded.
 */
export default function PhotoHero() {
  const { photos, couple, event } = eventData;

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Full-bleed couple photo */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a231b] via-[#3b3025] to-[#241d16]" />
        <Photo
          src={photos.hero}
          showFallback={false}
          rounded=""
          className="absolute inset-0 h-full w-full opacity-85"
        />
        <div className="absolute inset-0 bg-obsidian/45" />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.3] mix-blend-overlay" />
      </div>

      {/* Ornamental gold frame */}
      <span className="pointer-events-none absolute inset-5 z-10 rounded-[1.4rem] border border-gold/40" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <p className="font-sans text-xs font-semibold uppercase tracking-luxe text-gold-champagne sm:text-sm">
          {event.name}
        </p>

        <p className="mt-8 pb-2 font-script text-8xl font-bold leading-none text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.6)] sm:text-9xl">
          {couple.initials}
        </p>

        <div className="my-7 flex items-center gap-4">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-champagne/80" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold-champagne" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-champagne/80" />
        </div>

        <p className="font-script text-5xl text-gold-champagne drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-6xl">
          ¡Nos casamos!
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#novios"
        aria-label="Desplázate para ver más"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="group absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/80 transition-colors hover:text-white"
      >
        <span className="font-sans text-[0.65rem] font-medium uppercase tracking-luxe">
          Desliza
        </span>
        <ChevronDown className="h-5 w-5 animate-bob" strokeWidth={1.5} />
      </motion.a>
    </section>
  );
}
