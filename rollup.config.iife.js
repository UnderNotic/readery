import replace from "rollup-plugin-replace";
import uglify from "rollup-plugin-uglify";
import { name } from "./package.json";
import babel from "rollup-plugin-babel";

export default {
  input: "src/index.js",
  output: {
    file: `dist/${name}-iife.min.js`,
    name,
    format: "iife",
    sourcemap: "inline"
  },
  plugins: [
    uglify(),
    babel({
      exclude: "node_modules/**"
    }),
    replace({
      "process.env.CHUNK_SIZE": process.env.NODE_ENV === 'test' ? JSON.stringify(9) : 256 * 1024
    })
  ]
};
