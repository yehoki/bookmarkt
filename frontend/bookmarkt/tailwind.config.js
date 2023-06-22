/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'goodreads-beige': '#F4F1EA',
        'goodreads-brown': '#382110',
        'goodreads-mybooks-green': '#00635D',
      },
      fontFamily: {
        Lato: 'Lato, Helvetica Neue, Helvetica, sans-serif',
      },
      minHeight: {
        fulldvh: '100dvh',
      },
      screens: {
        desktop: '1240px',
        navOne: '1200px',
      },
      padding: {
        'min-nav': 'clamp(40px, 10%, 16%)',
      },
    },
  },
  plugins: [],
};
