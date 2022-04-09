module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      azul1: '#0564F2',
      azul2: '#0CA7F2',
      azul3: '#03CEFF',
      azul4: '#00E6C3',
      verde1: '#0DFC9D',
      verde2: '#0CF25D',
      verde3: '#01F52E',
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      errorColor: '#dc2626'
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("@tailwindcss/aspect-ratio"),
  ],
}
