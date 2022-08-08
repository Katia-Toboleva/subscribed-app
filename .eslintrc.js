module.exports = {
  env: {
    // 'jest/globals': true,
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'next',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'jest',
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'object-curly-newline': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/no-unresolved': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': 0,
    'operator-linebreak': 0,
    'dot-notation': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'no-undef': 0,
    'react/react-in-jsx-scope': 0,
    'import/order': 0,
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'multiline-block-like',
          'multiline-expression',
          'block',
          'block-like',
          'cjs-export',
          'class',
          'export',
          'import',
        ],
      },
      {
        blankLine: 'always',
        prev: [
          'multiline-block-like',
          'multiline-expression',
          'block',
          'block-like',
          'cjs-export',
          'class',
          'export',
          'import',
        ],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: [
          'export',
          'import',
        ],
        next: [
          'export',
          'import',
        ],
      },
    ],
  },
  overrides: [
    // {
    //   // enable the rule specifically for TypeScript files
    //   files: ['*.ts', '*.tsx'],
    //   rules: {
    //     '@typescript-eslint/explicit-function-return-type': ['error'],
    //   },
    // },
    {
      files: [
        '**/*.test.ts',
        '**/*.test.tsx',
      ],
      env: {
        browser: true,
        es2021: true,
        jest: true,
      },
      rules: {
        'react/jsx-props-no-spreading': 0,
      },
    },
  ],
  globals: {
    TSX: true,
    JSX: true,
    URL: true,
    window: true,
  },
};
