import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import eventData from '../data/eventData.json';

/**
 * Envelope — a minimal "letter" defined only by its fold seams (thin gold
 * lines from the corners to the centre, where a small R&M seal sits). It
 * fills the screen; tapping it slides the whole letter up so the content
 * comes out underneath.
 */
export default function Envelope({ onOpen }) {
  const { couple } = eventData;

  function handleOpen() {
    window.dispatchEvent(new Event('bodareal:open'));
    onOpen();
  }

  return (
    <motion.div
      className="bg-marble fixed inset-0 z-[70] flex justify-center"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
    >
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Abrir la invitación"
        className="relative h-full w-full max-w-[28rem] focus-visible:outline-none"
      >
        {/* Letter fold seams (corners → centre) */}
        <svg
          className="absolute inset-8 h-[calc(100%-4rem)] w-[calc(100%-4rem)] text-gold"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <g
            stroke="currentColor"
            strokeWidth="1.1"
            vectorEffect="non-scaling-stroke"
            opacity="0.85"
          >
            {/* outer edge */}
            <rect x="0.6" y="0.6" width="98.8" height="98.8" rx="1.5" />
            {/* the four folded flaps meeting at the centre */}
            <path d="M0.6 0.6 L50 50" />
            <path d="M99.4 0.6 L50 50" />
            <path d="M0.6 99.4 L50 50" />
            <path d="M99.4 99.4 L50 50" />
          </g>
        </svg>

        {/* Centre wax seal */}
        <span className="absolute left-1/2 top-1/2 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-gradient shadow-gold-glow ring-2 ring-gold/50">
          <span className="pb-0.5 font-script text-2xl font-bold text-obsidian">
            {couple.initials}
          </span>
        </span>

        {/* Hint */}
        <motion.span
          className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-gold-deep"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronUp className="h-5 w-5" strokeWidth={1.5} />
          <span className="font-sans text-xs font-semibold uppercase tracking-luxe">
            Toca para abrir
          </span>
        </motion.span>
      </button>
    </motion.div>
  );
}
