import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Gift, Copy, Check, ChevronDown } from 'lucide-react';
import Section, { FadeItem } from './ui/Section.jsx';
import Divider from './ui/Divider.jsx';
import eventData from '../data/eventData.json';

export default function GiftRegistry() {
  const { gifts } = eventData;
  const [open, setOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  async function copy(value, index) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback for older / insecure contexts.
      const el = document.createElement('textarea');
      el.value = value;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand('copy');
      } catch {
        /* ignore */
      }
      document.body.removeChild(el);
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex((c) => (c === index ? null : c)), 2000);
  }

  return (
    <Section id="regalos" className="section-pad relative">
      <div className="mx-auto max-w-2xl text-center">
        <FadeItem>
          <p className="eyebrow mb-4">{gifts.eyebrow}</p>
          <h2 className="font-display text-3xl text-ink sm:text-5xl">
            {gifts.title}
          </h2>
          <Divider className="my-8" icon="leaf" />
          <p className="mx-auto max-w-lg font-serif text-lg text-ink/75">
            {gifts.message}
          </p>
        </FadeItem>

        <FadeItem delay={0.1}>
          <div className="card-luxe mt-10 overflow-hidden text-left">
            {/* Accordion header */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="gift-panel"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gold/5 sm:px-8"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/5">
                  <Gift className="h-5 w-5 text-gold" strokeWidth={1.5} />
                </span>
                <span className="font-display text-lg text-ink sm:text-xl">
                  Datos para transferencias
                </span>
              </span>
              <ChevronDown
                className={`h-5 w-5 text-gold transition-transform duration-300 ${
                  open ? 'rotate-180' : ''
                }`}
                strokeWidth={1.5}
              />
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id="gift-panel"
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="divide-y divide-gold/10 border-t border-gold/10 px-6 pb-4 sm:px-8">
                    {gifts.methods.map((m, i) => (
                      <li
                        key={m.label}
                        className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0">
                          <p className="font-sans text-xs uppercase tracking-wide2 text-gold-deep">
                            {m.label}
                          </p>
                          <p className="mt-1 truncate font-display text-lg text-ink">
                            {m.value}
                          </p>
                          <p className="mt-0.5 font-serif text-sm italic text-ink-soft">
                            {m.holder} · {m.hint}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copy(m.value, i)}
                          aria-label={`Copiar ${m.label}`}
                          className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 font-sans text-xs uppercase tracking-wide2 transition-all duration-300 ${
                            copiedIndex === i
                              ? 'border-gold bg-gold/15 text-gold'
                              : 'border-gold/30 text-ink/80 hover:border-gold hover:text-gold'
                          }`}
                        >
                          {copiedIndex === i ? (
                            <>
                              <Check className="h-3.5 w-3.5" strokeWidth={2} />
                              ¡Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" strokeWidth={2} />
                              Copiar
                            </>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeItem>
      </div>
    </Section>
  );
}
