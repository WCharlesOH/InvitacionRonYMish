import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Envelope from './components/Envelope.jsx';
import PhotoHero from './components/PhotoHero.jsx';
import Hero from './components/Hero.jsx';
import Intro from './components/Intro.jsx';
import Family from './components/Family.jsx';
import Gallery from './components/Gallery.jsx';
import Countdown from './components/Countdown.jsx';
import LocationMap from './components/LocationMap.jsx';
import Itinerary from './components/Itinerary.jsx';
import HotelReservation from './components/HotelReservation.jsx';
import DressCode from './components/DressCode.jsx';
import NoKids from './components/NoKids.jsx';
import RsvpForm from './components/RsvpForm.jsx';
import GiftRegistry from './components/GiftRegistry.jsx';
import AudioPlayer from './components/AudioPlayer.jsx';
import Divider from './components/ui/Divider.jsx';
import Botanical from './components/ui/Botanical.jsx';
import Photo from './components/ui/Photo.jsx';
import eventData from './data/eventData.json';

export default function App() {
  const { couple, date, intro, photos } = eventData;
  const [opened, setOpened] = useState(false);

  // Lock scrolling while the envelope gate is showing.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  function handleOpen() {
    setOpened(true);
    window.scrollTo(0, 0);
  }

  return (
    <div className="relative min-h-screen">
      {/* Phone-format column centered on the marble backdrop */}
      <div className="relative z-10 mx-auto w-full max-w-[28rem] bg-transparent shadow-[0_0_90px_-30px_rgba(70,55,30,0.45)]">
        <main>
          <PhotoHero />
          <Hero />
          <Intro />
          <Family />
          <Gallery />
          <Countdown />
          <LocationMap />
          <Itinerary />
          <HotelReservation />
          <DressCode />
          <NoKids />
          <RsvpForm />
          <GiftRegistry />
        </main>

        {/* Closing — couple-photo background */}
        <footer className="relative overflow-hidden px-6 py-24 text-center sm:py-28">
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a231b] via-[#3b3025] to-[#241d16]" />
            <Photo
              src={photos.finalBg}
              showFallback={false}
              rounded=""
              className="absolute inset-0 h-full w-full opacity-80"
            />
            <div className="absolute inset-0 bg-obsidian/60" />
            <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.35] mix-blend-overlay" />
          </div>

          <Botanical
            position="top-left"
            className="left-0 top-0 text-gold-champagne opacity-30"
            size={160}
          />
          <Botanical
            position="bottom-right"
            className="bottom-0 right-0 text-gold-champagne opacity-30"
            size={160}
          />

          <div className="relative z-10 mx-auto max-w-xl">
            <p className="mx-auto mb-8 max-w-md font-serif text-lg italic text-white/85">
              {intro.closing}
            </p>
            <p className="pb-1 font-script text-5xl text-gold-champagne sm:text-6xl">
              {couple.partnerA} &amp; {couple.partnerB}
            </p>
            <Divider className="my-6" icon="diamond" />
            <p className="font-script text-4xl text-white">¡Te esperamos!</p>
            <p className="mt-4 font-display text-lg tracking-wide2 text-white/90">
              {date.display}
            </p>
            <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-luxe text-gold-champagne">
              {couple.hashtag}
            </p>
            <p className="mt-8 font-sans text-[0.7rem] uppercase tracking-wide2 text-white/60">
              Con amor · {couple.partnerA} &amp; {couple.partnerB} · Huancayo,
              Junín, Perú
            </p>
          </div>
        </footer>

        {opened && <AudioPlayer />}
      </div>

      {/* Landing gate */}
      <AnimatePresence>
        {!opened && <Envelope key="envelope" onOpen={handleOpen} />}
      </AnimatePresence>
    </div>
  );
}
