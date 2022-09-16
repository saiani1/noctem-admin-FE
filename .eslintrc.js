module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    'arrow-body-style': ['error', 'always'],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
        mjs: 'never',
      },
    ],
    // eslint-disable-next-line no-dupe-keys
    'arrow-body-style': 0,
    'import/prefer-default-export': 'off',
    'no-param-reassign': 0,
    // eslint-disable-next-line no-dupe-keys
    'no-param-reassign': [2, { props: false }],
    'no-underscore-dangle': 'off',
    'prefer-regex-literals': 'off',
    'no-use-before-define': 'off',
    'no-useless-concat': 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
