// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        secondary: '#F5F5F5',
        text: '#333333',
        background: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        base: '16px',
        heading: '24px',
      },
      spacing: {
        sm: '8px',
        md: '16px',
        lg: '24px',
      },
      borderRadius: {
        button: '12px',
      },
      boxShadow: {
        card: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
