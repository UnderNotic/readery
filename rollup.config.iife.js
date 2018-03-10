
import uglify from 'rollup-plugin-uglify';
import { name } from './package.json';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: `dist/${name}-iife.min.js`,
    name,    
    format: 'iife',
    sourcemap: 'inline'
  },
  plugins: [
    uglify(),
    babel({
        exclude: 'node_modules/**',
      })
  ]
};