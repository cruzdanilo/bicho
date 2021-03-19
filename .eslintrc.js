/** @type {import('eslint').Linter.Config} */
module.exports = {
  parserOptions: { project: './tsconfig.tools.json' },
  extends: [
    'airbnb-typescript/base',
    'plugin:eslint-comments/recommended',
  ],
  rules: {
    'no-continue': 'off',
    'no-plusplus': 'off',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'eslint-comments/no-unused-disable': 'error',
  },
  overrides: [
    {
      files: ['**/*.{config,test}.ts', '**/.eslintrc.js'],
      extends: ['plugin:node/recommended'],
      rules: {
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
        'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
  ],
};
