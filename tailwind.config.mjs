/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B3A5C',
          dark: '#0F2540',
          light: '#2A5080',
        },
        gold: {
          DEFAULT: '#C8960C',
          light: '#E8AE1A',
          pale: '#FDF4DC',
        },
        cream: '#F8F5F0',
        gray: {
          100: '#F4F6F9',
          200: '#E8EDF3',
          400: '#9BA5B5',
          600: '#5A6478',
          800: '#2C3444',
        },
      },
      fontFamily: {
        // Source Sans 3 (formerly Source Sans Pro) - ADA/Section 508 compliant
        body: ['var(--font-body)', 'Source Sans 3', 'Source Sans Pro', 'system-ui', 'sans-serif'],
        // Merriweather for headings - accessible, readable serif
        display: ['var(--font-display)', 'Merriweather', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      },
    },
  },
  plugins: [],
}

export default config
