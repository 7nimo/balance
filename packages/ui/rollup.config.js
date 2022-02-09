import pluginAlias from '@rollup/plugin-alias';
import pluginBabel from '@rollup/plugin-babel';
import pluginCommonjs from '@rollup/plugin-commonjs';
import pluginPostcss from 'rollup-plugin-postcss';
import pluginJson from '@rollup/plugin-json';
import pluginResolve from '@rollup/plugin-node-resolve';
import pluginTypescript from 'rollup-plugin-typescript';
import pluginSvgr from '@svgr/rollup';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM'
};

// https://github.com/d3/d3-interpolate/issues/58
const D3_WARNING = /Circular dependency.*d3-interpolate/

export default {
  input: './src/index.tsx',
  output: [
    {
      dir: 'build',
      format: 'cjs',
      preferConst: true
    }
  ],
  plugins: [
    pluginTypescript(),
    pluginAlias(),
    pluginSvgr(),
    pluginResolve({ browser: true }),
    pluginCommonjs({
      exclude: 'src/**',
    }),
    pluginJson(),
    pluginPostcss({
      modules: true
    }),
    pluginBabel({
      babelHelpers: 'bundled',
      extensions,
      exclude: '/node_modules/**',
      include: ['src/**/*']
    }),
  ],
  onwarn: function ( message ) {
    if ( D3_WARNING.test(message) ) {
      return
    }
  },
  external: Object.keys(globals)
};
