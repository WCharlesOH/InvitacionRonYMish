/**
 * Divider — an ornamental gold divider with a small central diamond/leaf.
 */
export default function Divider({ className = '', icon = 'diamond' }) {
  return (
    <div
      className={`divider-ornate ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      {icon === 'diamond' ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 0.5 15.5 8 8 15.5 0.5 8 8 0.5Z"
            className="stroke-gold"
            strokeWidth="1"
          />
          <circle cx="8" cy="8" r="2" className="fill-gold" />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path
            d="M11 2c2.5 3 6 4.5 6 8a6 6 0 0 1-12 0c0-3.5 3.5-5 6-8Z"
            className="stroke-gold"
            strokeWidth="1"
          />
          <path d="M11 6v11" className="stroke-gold" strokeWidth="1" />
        </svg>
      )}
    </div>
  );
}
