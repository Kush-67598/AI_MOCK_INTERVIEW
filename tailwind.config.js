/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#090b10',
        panel: '#111521',
        muted: '#8f9ab2',
        accent: '#24d3ee'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(36,211,238,0.2), 0 20px 50px rgba(36,211,238,0.15)'
      }
    }
  },
  plugins: []
};

export default config;