import { useState } from 'react';
import { Camera } from 'lucide-react';

/**
 * Photo — renders an image with a graceful, on-brand placeholder shown
 * until the real file exists (the couple will drop their photos into
 * `public/images/` later). If the image is missing or fails to load:
 *   - `showFallback` (default): shows an elegant gradient + icon + label.
 *   - otherwise: renders nothing (used behind dark overlays for backgrounds).
 */
export default function Photo({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  rounded = 'rounded-2xl',
  label,
  icon: Icon = Camera,
  showFallback = true,
  overlay = null,
}) {
  const [failed, setFailed] = useState(!src);
  const url = src ? `${import.meta.env.BASE_URL}${src}` : null;
  const showImage = url && !failed;

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      {showImage && (
        <img
          src={url}
          alt={alt}
          onError={() => setFailed(true)}
          loading="lazy"
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}

      {!showImage && showFallback && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-sand via-card to-stone/70 text-gold-deep">
          <Icon className="h-8 w-8 opacity-70" strokeWidth={1.3} />
          {label && (
            <span className="max-w-[80%] text-center font-sans text-[0.7rem] font-medium uppercase tracking-wide2">
              {label}
            </span>
          )}
        </div>
      )}

      {overlay}
    </div>
  );
}
