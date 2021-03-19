/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: { mocha: true },
  extends: [
    'plugin:mocha/recommended',
    'plugin:chai-expect/recommended',
    'plugin:chai-friendly/recommended',
  ],
  rules: {
    'func-names': 'off',
    'mocha/no-mocha-arrows': 'off',
  },
};
