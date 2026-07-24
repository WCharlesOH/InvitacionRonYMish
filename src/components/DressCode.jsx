import { Gem } from 'lucide-react';
import Section, { FadeItem } from './ui/Section.jsx';
import Divider from './ui/Divider.jsx';
import eventData from '../data/eventData.json';

export default function DressCode() {
  const { dressCode } = eventData;

  return (
    <Section id="vestimenta" className="section-pad relative">
      <div className="mx-auto max-w-2xl text-center">
        <FadeItem>
          <p className="eyebrow mb-4">{dressCode.eyebrow}</p>
          <Divider className="my-6" icon="diamond" />
        </FadeItem>

        <FadeItem delay={0.1}>
          <div className="card-luxe px-6 py-10 sm:px-12 sm:py-12">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/5">
              <Gem className="h-6 w-6 text-gold" strokeWidth={1.5} />
            </span>
            <h2 className="mt-6 font-display text-2xl text-ink sm:text-4xl">
              {dressCode.title}
            </h2>
            <p className="mx-auto mt-4 max-w-md font-serif text-lg text-ink/75">
              {dressCode.note}
            </p>
            <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-luxe text-gold-deep">
              {dressCode.reserved}
            </p>

            {/* Palette swatches */}
            <div className="mt-8 flex items-center justify-center gap-3">
              {['#473D31', '#857562', '#C5A059', '#D4AF37', '#F5EFE7'].map(
                (c) => (
                  <span
                    key={c}
                    className="h-7 w-7 rounded-full border border-gold/30"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ),
              )}
            </div>
          </div>
        </FadeItem>
      </div>
    </Section>
  );
}
