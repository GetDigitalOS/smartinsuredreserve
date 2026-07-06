module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#4f46e5', '600': '#4f46e5' },
        surface: '#f9fafb',
        'text-muted': '#4b5563',
      },
    },
  },
  plugins: [],
};
