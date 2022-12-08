// vite.config.js
import solidPlugin from "vite-plugin-solid";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solidPlugin({})],
  build: {
    target: "esnext",
  },
});
