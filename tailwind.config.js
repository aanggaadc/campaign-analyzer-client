/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        // Dark theme palette dengan bold accent
        surface: {
          DEFAULT: '#0f0f11',   // background utama
          card: '#18181b',      // card background
          elevated: '#212127', // hover/elevated
        },
        accent: {
          DEFAULT: '#6366f1',  // indigo bold
          hover: '#818cf8',
          muted: '#312e81',
        },
        brand: {
          orange: '#f97316',   // second accent
          green: '#22c55e',    // success
          red: '#ef4444',      // error/danger
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}