// rollup.config.js
// import typescript from "@rollup/plugin-typescript";
import esbuild from "rollup-plugin-esbuild";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import scss from "rollup-plugin-scss";
import fs from "fs";
import path from "path";

const themeBuildSteps = [];
const files = fs.readdirSync(path.join(__dirname, "src/styles/themes/"));
files.forEach((file) => {
  const config = {
    input: `src/styles/themes/${file}`,
    output: { file: null },
    plugins: [
      scss({
        output: `lib/themes/${file.replace(".scss", "")}.css`,
        outputStyle: "compressed",
      }),
    ],
  };
  themeBuildSteps.push(config);
});

export default [
  {
    input: "src/index.ts",
    output: {
      file: "lib/index.js",
      format: "esm",
      name: "potzblitz",
    },
    plugins: [
      esbuild(),
      resolve({ browser: true }),
      commonjs({}),
      scss({
        fileName: "potzblitz.css",
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: "lib/index.umd.js",
      format: "umd",
      name: "potzblitz",
    },
    plugins: [
      esbuild(),
      resolve({ browser: true }),
      commonjs({}),
      scss({
        output: false,
      }),
    ],
  },
  ...themeBuildSteps,
];
