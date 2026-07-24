import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Botanical from './ui/Botanical.jsx';
import eventData from '../data/eventData.json';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const { couple, date, event } = eventData;

  return (
    <header
      id="novios"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-[45vh] w-[45vh] -translate-x-1/2 rounded-full bg-gold/15 blur-[110px]"
      />

      {/* Botanical corner accents */}
      <Botanical
        position="top-left"
        className="left-0 top-0 text-gold-muted opacity-60"
        size={170}
      />
      <Botanical
        position="bottom-right"
        className="bottom-0 right-0 text-gold-muted opacity-60"
        size={170}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        <motion.p variants={item} className="eyebrow mb-6">
          Con la bendición de Dios
        </motion.p>

        <motion.h1 variants={item} className="font-script font-bold text-ink">
          <span className="block text-7xl leading-[1.12] sm:text-8xl">
            {couple.partnerA}
          </span>
          <span className="block text-6xl leading-[1.1] text-gold-foil-anim sm:text-7xl">
            &amp;
          </span>
          <span className="block pb-2 text-7xl leading-[1.12] sm:text-8xl">
            {couple.partnerB}
          </span>
        </motion.h1>

        <motion.div variants={item} className="my-7 flex items-center gap-4">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70 sm:w-16" />
          <span className="font-sans text-sm uppercase tracking-luxe text-gold-deep">
            {date.weekday}
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70 sm:w-16" />
        </motion.div>

        <motion.p
          variants={item}
          className="font-display text-2xl tracking-wide2 text-ink sm:text-3xl"
        >
          {date.display}
        </motion.p>
        <motion.p
          variants={item}
          className="mt-3 font-sans text-[0.7rem] font-medium uppercase tracking-luxe text-ink-soft"
        >
          {event.place}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#intro"
        aria-label="Desplázate para ver más"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="group absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-ink-soft transition-colors hover:text-gold-deep"
      >
        <span className="font-sans text-[0.65rem] font-medium uppercase tracking-luxe">
          Desliza
        </span>
        <ChevronDown className="h-5 w-5 animate-bob" strokeWidth={1.5} />
      </motion.a>
    </header>
  );
}
