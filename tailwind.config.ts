import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fast-food-pattern-yellow': "url('/images/fast-food-pattern-yellow.png')",
        'fast-food-pattern-green': "url('/images/fast-food-pattern-green.png')",
        'fast-food-pattern-red': "url('/images/fast-food-pattern-red.png')",
      }
    },
  },
  plugins: [],
}
export default config
