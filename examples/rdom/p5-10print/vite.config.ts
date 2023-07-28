import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      potzblitz: path.resolve(__dirname, "../../lib"),
    },
  },
  publicDir: "../../lib/",
});
