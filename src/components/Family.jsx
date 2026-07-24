import { Heart } from 'lucide-react';
import Section, { FadeItem } from './ui/Section.jsx';
import Divider from './ui/Divider.jsx';
import Panel from './ui/Panel.jsx';
import eventData from '../data/eventData.json';

function ParentColumn({ title, names }) {
  return (
    <div className="text-center">
      <h3 className="pb-1 font-script text-3xl text-gold-foil sm:text-4xl">
        {title}
      </h3>
      <ul className="mt-3 space-y-1.5">
        {names.map((n) => (
          <li key={n} className="font-serif text-lg text-ink sm:text-xl">
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Family() {
  const { family } = eventData;

  return (
    <Section id="familia" className="section-pad relative">
      <Panel className="max-w-3xl text-center">
        <FadeItem>
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/5">
            <Heart className="h-5 w-5 text-gold" strokeWidth={1.5} />
          </span>
          <p className="eyebrow mt-5">{family.eyebrow}</p>
          <p className="mt-2 font-serif text-xl italic text-ink/80 sm:text-2xl">
            {family.line}
          </p>
          <Divider className="my-9" icon="leaf" />
        </FadeItem>

        <FadeItem delay={0.1}>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
            <ParentColumn
              title={family.groomParents.title}
              names={family.groomParents.names}
            />
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-4 top-1/2 hidden h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/50 to-transparent sm:block"
              />
              <ParentColumn
                title={family.brideParents.title}
                names={family.brideParents.names}
              />
            </div>
          </div>
        </FadeItem>

        <FadeItem delay={0.2}>
          <div className="mt-12">
            <Divider className="mb-8" icon="diamond" />
            <h3 className="pb-1 font-script text-3xl text-gold-foil sm:text-4xl">
              {family.padrinos.title}
            </h3>
            <ul className="mt-3 flex flex-col items-center gap-1.5 sm:flex-row sm:justify-center sm:gap-10">
              {family.padrinos.names.map((n) => (
                <li key={n} className="font-serif text-lg text-ink sm:text-xl">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </FadeItem>
      </Panel>
    </Section>
  );
}
