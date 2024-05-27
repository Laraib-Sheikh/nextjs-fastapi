/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        362146: "#362146",
        362147: "#4F3472",
      },
      backgroundImage: {
        Home_Desktop: "url('/public/Home_Desktop.png')",
        Signup_Desktop: "url('/asserts/Desktop')",
        Desktop: "url('/asserts/Desktop.png')", // Update the path as needed
        Btn: "url('/public/rectangle.png')",
        gradient: "linear-gradient(to bottom right, #0c0a0d, #9e1dde)", // New gradient background
      },
    },
  },
  plugins: [],
};
