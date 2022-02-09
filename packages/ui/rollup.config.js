import babel from '@rollup/plugin-babel';
import pluginJson from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import rollupTypescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'build/bundle.js',
    format: 'umd',
    preferConst: true
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    rollupTypescript(),
    pluginJson()
  ]
};
