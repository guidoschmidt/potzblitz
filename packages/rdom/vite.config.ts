// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  build: {
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "@potzblitz/rdom-components",
      fileName: "index",
    },
  },
});
