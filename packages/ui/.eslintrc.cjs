require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  ignorePatterns: [
    'build/*',
    'public/*',
    'coverage/*',
    'node_modules/*',
    '.eslintrc.cjs',
    '.eslintrc.js',
    '.eslintrc.mjs',
    '.github/**',
    '.prettierrc.cjs',
    '.vscode/**',
    '.yarn/**',
    'tsconfig.json',
    'tsconfig.eslint.json',
    'tsconfig.base.json',
  ],
  extends: [
    'eslint:recommended',
    require.resolve('eslint-config-standard'),
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      files: ['*.js', '*.cjs', '*.mjs', '*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
    extraFileExtensions: [".cjs", ".mjs"],
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'import-newlines',
    'react-hooks',
    'simple-import-sort',
    'sort-destructure-keys',
  ],
  rules: {
    // required as 'off' since typescript-eslint has own versions
    indent: 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/indent': ['error', 2],
    // rules from semistandard (don't include it, has standard dep version mismatch)
    semi: [2, 'always'],
    'no-extra-semi': 2,
    // specific overrides
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
    'arrow-parens': ['error', 'always'],
    'default-param-last': [0], // conflicts with TS version (this one doesn't allow TS ?)
    'import-newlines/enforce': ['error', 2048],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/prop-types': [0], // this is a completely broken rule
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: 'never',
        ObjectPattern: 'never',
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: '*', next: 'try' },
      { blankLine: 'always', prev: 'try', next: '*' },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'import' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-closing-bracket-location': [1, 'tag-aligned'],
    'react/jsx-first-prop-new-line': [1, 'multiline-multiprop'],
    'react/jsx-fragments': 'error',
    'react/jsx-max-props-per-line': [
      1,
      {
        maximum: 1,
        when: 'always',
      },
    ],
    'react/jsx-no-bind': 'off',
    'react/jsx-sort-props': [
      1,
      {
        noSortAlphabetically: false,
      },
    ],
    'react/jsx-tag-spacing': [
      2,
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],
    'sort-destructure-keys/sort-destructure-keys': [
      2,
      {
        caseSensitive: true,
      },
    ],
    'simple-import-sort/imports': [
      2,
      {
        groups: [
          ['^\u0000'],
          ['^[^/\\.]'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // local (. last)
        ],
      },
    ],
    'sort-keys': 'error',
  },
  settings: {
    'import/extensions': ['.js', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': require.resolve('eslint-import-resolver-node'),
    react: {
      version: 'detect',
    },
  },
};
