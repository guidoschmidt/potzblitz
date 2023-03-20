// vite.config.js
import { resolve } from "path";
import solid from "vite-plugin-solid";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid()],
  build: {
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "src/solid/index.ts"),
      name: "@potzblitz/components/solid",
    },
    rollupOptions: {
      external: ["solid-js"],
      output: {
        globals: {
          solid: "solid",
        },
      },
    },
  },
});
