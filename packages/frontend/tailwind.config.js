/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#b91c1c', // red-700
          dark: '#991b1b',    // red-800
          light: '#dc2626',   // red-600
        },
        secondary: {
          DEFAULT: '#1f2937', // gray-800
          dark: '#111827',    // gray-900
          light: '#374151',   // gray-700
        }
      },
    },
  },
  plugins: [],
}