// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  build: {
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "@potzblitz/solid-components",
      fileName: "index",
    },
  },
});
