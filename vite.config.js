import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://myomyom.github.io/voice-compare/",
  plugins: [react()],
});
