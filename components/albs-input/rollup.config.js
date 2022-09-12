import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
const outputDir = "dist";

export default {
  // defines the files to be included into the build: all components + smart manager + translations + i18n
  input: "dist/build/src/index.js",
  output: {
    dir: outputDir,
    sourcemap: true,
    // add a hash on every file
    entryFileNames: "[name].js",
    // Rollup's import hoisting is not really useful here as we're applying a more aggressive import hoisting strategy with the deps-manifest.json
    hoistTransitiveImports: false,
  },
  plugins: [
    // transform .json files into ES6 modules. (Used by statuses library). TODO: we should get rid of this library
    json(),
    // convert CommonJS modules to ESM
    commonjs(),
    // support resolving module using Node resolution algorithm. TODO: figure out why we need that
    resolve(),
  ],
};
