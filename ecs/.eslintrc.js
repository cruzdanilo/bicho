/** @type {import('eslint').Linter.Config} */
module.exports = {
  parserOptions: { project: './tsconfig.ecs.json' },
  env: { node: false },
};
