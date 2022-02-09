module.exports = {
  expandProps: false,
  ext: 'tsx',
  ignoreExisting: true,
  jsxRuntime: 'automatic',
  outDir: './src/components/Icons',
  replaceAttrValues: {
    '#1F78F0': 'var(--icon-accent)',
    '#91BEFF': 'var(--icon-main)'
  },
  titleProp: true,
  typescript: false
};
