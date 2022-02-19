module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      animation: {
        flyIn: 'flyIn 0.5s ease-in-out 0.5s forwards',
        flyOut: 'flyOut 0.5s ease-in-out forwards',
        spinner: 'spinner 2s linear infinite',
        scaling: 'scaling 2s ease-in-out forwards',
        flyInRight: 'flyInRight 1s ease-in-out forwards',
        flyOutLeft: 'flyOutLeft 1s ease-in-out forwards',
      },
      keyframes: {
        flyIn: {
          '0%': { transform: 'translateY(3rem)', opacity: 0 },
          '100%': { transform: 'translateY(0) ', opacity: 1}
        },
        flyOut: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(3rem)', opacity: 0 }
        },
        spinner: {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        scaling: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' }
        },
        flyInRight: {
          '0%': { transform: 'translateX(8rem)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 }
        },
        flyOutLeft: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(8rem)', opacity: 0 }
        }
      }
    },
  },
  plugins: [],
}
