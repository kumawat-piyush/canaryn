module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'cal-sans': ['Cal Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      fontSize: {
        '13px': '13px'
      },
      backgroundImage: {
        'text-gradient': 'radial-gradient(circle, #CA9AF4, #feb47b)'
      }
    }
  },
  plugins: []
}
