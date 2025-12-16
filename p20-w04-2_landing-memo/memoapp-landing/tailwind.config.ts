import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7F56D9', // Updated primary color
        'text-dark': '#344054', // Added Text Dark
        'text-light': '#FFFFFF', // Added Text Light (white)
        'bg-light-lavender': '#F7F7FF', // Added Background
        'accent-mint': '#B0E0E6', // Added Accent Mint
        'accent-lavender': '#E6E6FA', // Added Accent Lavender
        'accent-peach': '#FFDAB9', // Added Accent Peach
        'border-gray': '#E5E7EB', // Added for Secondary button border
      },
    },
  },
  plugins: [],
}
export default config
