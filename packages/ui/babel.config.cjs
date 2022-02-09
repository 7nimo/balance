module.exports = {
  ignore: [
    '**/*.d.ts'
  ],
  plugins: [
    '@babel/plugin-proposal-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-logical-assignment-operators',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ],
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
    '@babel/preset-env'
  ]
};
