import { Heart, Camera } from 'lucide-react';
import Section, { FadeItem } from './ui/Section.jsx';
import Divider from './ui/Divider.jsx';
import Photo from './ui/Photo.jsx';
import eventData from '../data/eventData.json';

export default function Gallery() {
  const { gallery, photos } = eventData;

  return (
    <Section id="galeria" className="section-pad relative">
      <div className="mx-auto max-w-4xl text-center">
        <FadeItem>
          <p className="eyebrow mb-4">{gallery.eyebrow}</p>
          <h2 className="font-script text-4xl text-gold-foil sm:text-6xl">
            {gallery.title}
          </h2>
          <Divider className="my-8" icon="leaf" />
          <p className="mx-auto mb-10 max-w-lg font-serif text-lg text-ink/75">
            {gallery.subtitle}
          </p>
        </FadeItem>

        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {photos.gallery.map((src, i) => (
            <FadeItem key={src} delay={i * 0.08}>
              <Photo
                src={src}
                alt={`Foto ${i + 1} de los novios`}
                icon={i % 2 === 0 ? Camera : Heart}
                label={`Foto ${i + 1}`}
                rounded="rounded-2xl"
                className="aspect-[3/4] border border-gold/30 shadow-card"
              />
            </FadeItem>
          ))}
        </div>
      </div>
    </Section>
  );
}
