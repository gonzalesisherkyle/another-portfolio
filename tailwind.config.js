export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        raw: {
          black: '#000000',
          white: '#FFFFFF',
          blue: '#0000FF',
          green: '#008000',
          orange: '#FFA500',
          red: '#FF0000',
          sunken: '#F0F0F0',
          muted: '#CCCCCC',
          soft: '#F5F5F5'
        }
      },
      fontFamily: {
        headline: ['Archivo Black', 'Arial Black', 'Impact', 'sans-serif'],
        sans: ['Work Sans', 'Arial', 'sans-serif'],
        mono: ['Space Mono', 'Consolas', 'monospace']
      },
      boxShadow: {
        none: 'none'
      },
      borderRadius: {
        none: '0'
      }
    }
  },
  plugins: []
};
