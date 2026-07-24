/**
 * Botanical — decorative magnolia / leaf line-art used as ambient
 * corner accents. Purely presentational; hidden from assistive tech.
 *
 * `position` picks a corner and applies the correct flip so a single
 * SVG can decorate any corner.
 */
const flips = {
  'top-left': 'origin-top-left',
  'top-right': '-scale-x-100 origin-top-right',
  'bottom-left': '-scale-y-100 origin-bottom-left',
  'bottom-right': '-scale-x-100 -scale-y-100 origin-bottom-right',
};

export default function Botanical({
  position = 'top-left',
  className = '',
  size = 220,
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      className={`pointer-events-none absolute text-gold ${flips[position]} ${className}`}
    >
      <g
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.9"
      >
        {/* main stem */}
        <path d="M20 220C40 180 60 150 96 132" />
        {/* leaves along the stem */}
        <path d="M52 178c-14-6-26-4-36 4 12 6 24 6 36-4Z" />
        <path d="M70 160c-10-14-10-26-2-38 8 12 10 24 2 38Z" />
        <path d="M86 146c14-6 26-4 36 4-12 6-24 6-36-4Z" />
        {/* magnolia blossom (layered petals) */}
        <path d="M118 96c-8-16-4-30 8-40 10 12 12 26 4 40Z" />
        <path d="M118 96c16-8 30-4 40 8-12 10-26 12-40 4Z" />
        <path d="M118 96c8 16 4 30-8 40-10-12-12-26-4-40Z" />
        <path d="M118 96c-16 8-30 4-40-8 12-10 26-12 40 4Z" />
        <circle cx="118" cy="96" r="7" />
        {/* small bud */}
        <path d="M150 60c2-10 10-16 20-16-2 10-10 16-20 16Z" />
      </g>
    </svg>
  );
}
