import replace from "rollup-plugin-replace";
import { name } from "./package.json";
import babel from "rollup-plugin-babel";

export default (type) => ({
  input: "src/index.js",
  output: {
    file: `dist/${name}-${type}.min.js`,
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
    })
  ]
});
