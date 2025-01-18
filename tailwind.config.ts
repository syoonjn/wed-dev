import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App Router 경로
    "./pages/**/*.{js,ts,jsx,tsx}", // Pages Router 경로
    "./components/**/*.{js,ts,jsx,tsx}", // 컴포넌트 경로
    "./node_modules/flowbite-react/**/*.js", // Flowbite-React 경로 추가
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // Flowbite 플러그인 추가
  ],
};

export default config;