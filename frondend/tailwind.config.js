/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
             backgroundImage: {
          'gradient-135': 'linear-gradient(135deg, #4F46E5, #8B5CF6, #EC4899)'
      },

    },
  },
  plugins: [],
}

