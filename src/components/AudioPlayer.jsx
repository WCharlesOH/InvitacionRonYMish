import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause } from 'lucide-react';
import eventData from '../data/eventData.json';

/**
 * AudioPlayer — a floating, minimal play/pause toggle for ambient
 * background music. Gracefully disables itself if the audio file is
 * missing so the page never breaks.
 *
 * Drop your track at:  public/audio/ambient.mp3
 */
export default function AudioPlayer() {
  const { audio } = eventData;
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  // Base-aware source so it works from any hosting sub-path.
  const src = `${import.meta.env.BASE_URL}${audio.src}`;

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => setPlaying(false);
    const onError = () => {
      setAvailable(false);
      setPlaying(false);
    };
    el.addEventListener('ended', onEnded);
    el.addEventListener('error', onError);

    // Start the ambient track when the guest opens the envelope (this is a
    // genuine user gesture, so autoplay is allowed). No-op if no file exists.
    const onOpen = () => {
      el
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          /* file missing or blocked — stay silent, keep the button */
        });
    };
    window.addEventListener('bodareal:open', onOpen);

    return () => {
      el.removeEventListener('ended', onEnded);
      el.removeEventListener('error', onError);
      window.removeEventListener('bodareal:open', onOpen);
    };
  }, []);

  async function toggle() {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        await el.play();
        setPlaying(true);
      }
    } catch {
      // Autoplay blocked or file missing.
      setAvailable(false);
      setPlaying(false);
    }
  }

  if (!available) return null;

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />

      <motion.button
        type="button"
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label={playing ? 'Pausar música' : 'Reproducir música'}
        aria-pressed={playing}
        title={audio.label}
        className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-card/95 text-gold-deep shadow-gold-glow backdrop-blur transition-all duration-300 hover:scale-105 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:h-14 sm:w-14"
      >
        {/* Rotating ring while playing */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 rounded-full border border-gold/30 ${
            playing ? 'animate-[spin-slow_6s_linear_infinite]' : ''
          }`}
        />
        {playing ? (
          <Pause className="h-5 w-5" strokeWidth={1.5} />
        ) : (
          <span className="relative flex items-center justify-center">
            <Music className="h-5 w-5" strokeWidth={1.5} />
            <Play
              className="absolute -bottom-3 -right-3 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
              strokeWidth={2}
            />
          </span>
        )}
      </motion.button>
    </>
  );
}
