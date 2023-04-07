// vite.config.js
import solid from "vite-plugin-solid";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid({})],
  build: {
    target: "esnext",
  },
});
