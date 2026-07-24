/**
 * Panel — a cream "carta" (letter/card) surface that floats on the textured
 * champagne backdrop. Used to wrap section content that doesn't already have
 * its own card, so every section reads as a card.
 */
export default function Panel({ children, className = '' }) {
  return (
    <div
      className={`relative mx-auto overflow-hidden rounded-[2rem] border border-gold/30 bg-card px-6 py-12 shadow-card sm:px-12 sm:py-14 ${className}`}
    >
      {children}
    </div>
  );
}
