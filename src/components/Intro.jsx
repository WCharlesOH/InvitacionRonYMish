import Section, { FadeItem } from './ui/Section.jsx';
import Divider from './ui/Divider.jsx';
import Botanical from './ui/Botanical.jsx';
import Panel from './ui/Panel.jsx';
import eventData from '../data/eventData.json';

export default function Intro() {
  const { intro, couple } = eventData;

  return (
    <Section id="intro" className="section-pad relative">
      <Panel className="max-w-2xl text-center">
        <Botanical
          position="top-right"
          className="right-0 top-0 text-gold-muted opacity-40"
          size={170}
        />
        <FadeItem>
          <p className="eyebrow mb-5">{intro.eyebrow}</p>
          <p className="pb-2 font-script text-6xl text-gold-foil sm:text-7xl">
            {couple.partnerA} &amp; {couple.partnerB}
          </p>
          <Divider className="my-8" icon="leaf" />
        </FadeItem>
        <FadeItem delay={0.1}>
          <p className="font-serif text-2xl italic leading-relaxed text-ink/85 sm:text-3xl">
            “{intro.phrase}”
          </p>
        </FadeItem>
      </Panel>
    </Section>
  );
}
