import { Baby } from 'lucide-react';
import Section, { FadeItem } from './ui/Section.jsx';
import Divider from './ui/Divider.jsx';
import eventData from '../data/eventData.json';

export default function NoKids() {
  const { noKids } = eventData;

  return (
    <Section id="no-ninos" className="section-pad relative">
      <div className="mx-auto max-w-xl text-center">
        <FadeItem>
          <div className="card-luxe px-6 py-10 sm:px-12 sm:py-12">
            <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/5">
              <Baby className="h-7 w-7 text-gold" strokeWidth={1.5} />
              {/* diagonal "no" stroke */}
              <span
                aria-hidden="true"
                className="absolute h-[2px] w-12 rotate-45 rounded-full bg-gold-deep/70"
              />
            </span>
            <p className="eyebrow mt-6">{noKids.eyebrow}</p>
            <h2 className="mt-2 pb-1 font-script text-4xl text-gold-foil sm:text-5xl">
              {noKids.title}
            </h2>
            <Divider className="my-6" icon="diamond" />
            <p className="mx-auto max-w-md font-serif text-lg italic text-ink/80">
              {noKids.message}
            </p>
          </div>
        </FadeItem>
      </div>
    </Section>
  );
}
