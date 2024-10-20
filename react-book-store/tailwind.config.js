/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "book-banner-image": "url('./library.jpg')",
      },
      colors: {
        primary: "#1C4336",
      },
    },
  },
  plugins: [],
};
