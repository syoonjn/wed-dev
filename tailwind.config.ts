import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App Router 경로
    "./pages/**/*.{js,ts,jsx,tsx}", // Pages Router 경로
    "./components/**/*.{js,ts,jsx,tsx}", // 컴포넌트 경로
    "./styles/**/*.{css}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)", "sans-serif"],
        nanumbarungothic: ['var(--font-pretendard)', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['before', 'after'],
      borderColor: ['before', 'after'],
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};

export default config;