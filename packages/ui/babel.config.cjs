module.exports = {
  ignore: [
    '**/*.d.ts'
  ],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@components': ['./common/components/*'],
        '@core': ['./core/*'],
        '@hooks': ['./hooks/*'],
        '@types': ['./@types/*']
      }
    }]
  ],
  presets: [
    ['@babel/preset-env', {
      modules: false
    }],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ]
};
