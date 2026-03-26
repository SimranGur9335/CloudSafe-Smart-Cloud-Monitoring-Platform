/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00bfff',
          cyan: '#00ffcc',
          red: '#ff003c',
          yellow: '#ffcc00',
        }
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 191, 255, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 191, 255, 0.6), 0 0 40px rgba(0, 255, 204, 0.4)' },
        }
      }
    },
  },
  plugins: [],
};
