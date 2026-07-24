/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // — Pearl surfaces (backgrounds) —
        pearl: '#F5EFE7', // main warm pearl background
        sand: '#EDE4D6', // deeper cream for alternating sections
        card: '#FCF8F2', // card surface
        obsidian: '#111111', // retained for deep contrasts / btn text
        charcoal: '#1A1A1A',
        // — Ink (text on pearl) —
        ink: {
          DEFAULT: '#473D31', // warm espresso — primary text
          soft: '#857562', // muted brown — secondary text
        },
        // — Gold accents —
        gold: {
          DEFAULT: '#D4AF37', // Metallic Gold
          muted: '#C5A059', // Muted Gold
          champagne: '#E5C158', // Champagne Accent
          deep: '#7A5F24', // Deep gold — legible text/eyebrows on pearl
        },
        // — Warm light surfaces —
        ivory: '#FAF8F5',
        cream: '#F5F0EB',
        // — Neutral borders —
        stone: '#E0D6C7',
        taupe: '#A89F91',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Quicksand', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.28em',
        wide2: '0.16em',
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(212,175,55,0.35), 0 18px 40px -22px rgba(122,95,36,0.45)',
        'gold-glow': '0 0 48px -12px rgba(212,175,55,0.55)',
        card: '0 22px 50px -30px rgba(90,70,40,0.35)',
      },
      backgroundImage: {
        'gold-gradient':
          'linear-gradient(135deg, #E5C158 0%, #D4AF37 45%, #C5A059 100%)',
        'radial-glow':
          'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.12), transparent 60%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        'bob': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'shimmer 6s linear infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        bob: 'bob 2.2s ease-in-out infinite',
        'spin-slow': 'spin-slow 1s linear infinite',
      },
    },
  },
  plugins: [],
};
