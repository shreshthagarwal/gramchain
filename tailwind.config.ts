import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
}

// Add this separate daisyui configuration
/** @type {import('daisyui').Config} */
export const daisyui = {
  themes: ["light", "dark"],
}

export default config