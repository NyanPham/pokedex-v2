module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      animation: {
        flyIn: 'flyIn 0.5s ease-in-out 0.5s forwards',
        flyOut: 'flyOut 0.5s ease-in-out forwards',
        hidden: 'hidden forwards'
      },
      keyframes: {
        flyIn: {
          '0%': { transform: 'translateY(8rem)', opacity: 0 },
          '100%': { transform: 'translateY(0) ', opacity: 1}
        },
        flyOut: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(8rem)', opacity: 0 }
        },
        hidden: {
          '0%': { display: 'flex' },
          '100%': { display: 'none' }
        }
      }
    },
  },
  plugins: [],
}
