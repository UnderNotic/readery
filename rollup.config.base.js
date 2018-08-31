import replace from "rollup-plugin-replace";
import { name } from "./package.json";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";

export default (type, minify = false) => ({
  input: "src/index.js",
  output: {
    file: `dist/${name}.${type}${minify ? ".min" : ""}.js`,
    name,
    format: type,
    sourcemap: true
  },
  plugins: [
    replace({
      "process.env.CHUNK_SIZE": process.env.NODE_ENV === 'test' ? JSON.stringify(9) : 256 * 1024
    }),
    babel({
      exclude: "node_modules/**"
    }),
    minify && uglify()
  ]
});
