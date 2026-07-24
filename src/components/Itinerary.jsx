import { motion } from 'framer-motion';
import { Church, Gem, UtensilsCrossed, Mail, Music } from 'lucide-react';
import Section, { FadeItem } from './ui/Section.jsx';
import Divider from './ui/Divider.jsx';
import Panel from './ui/Panel.jsx';
import eventData from '../data/eventData.json';

const ICONS = {
  church: Church,
  rings: Gem,
  utensils: UtensilsCrossed,
  mail: Mail,
  music: Music,
};

export default function Itinerary() {
  const { itinerary } = eventData;

  return (
    <Section id="itinerario" className="section-pad relative">
      <Panel className="max-w-lg text-center">
        <FadeItem>
          <p className="eyebrow mb-4">{itinerary.eyebrow}</p>
          <h2 className="font-display text-3xl text-ink sm:text-5xl">
            {itinerary.title}
          </h2>
          <Divider className="my-10" icon="leaf" />
        </FadeItem>

        <ol className="relative mx-auto max-w-sm">
          {itinerary.items.map((item, i) => {
            const Icon = ICONS[item.icon] || Gem;
            const isLast = i === itinerary.items.length - 1;
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.08,
                }}
                className="relative flex items-start gap-5 pb-10 text-left last:pb-0"
              >
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute left-7 top-14 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-gold/50 to-gold/10"
                  />
                )}
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-card shadow-gold">
                  <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
                </span>
                <div className="pt-1.5">
                  <p className="font-sans text-sm font-semibold uppercase tracking-wide2 text-gold-deep">
                    {item.time}
                  </p>
                  <p className="mt-0.5 font-display text-xl text-ink">
                    {item.title}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </Panel>
    </Section>
  );
}
