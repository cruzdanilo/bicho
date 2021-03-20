/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: [
    ['@babel/env', { corejs: 3, useBuiltIns: 'usage' }],
    '@babel/typescript'
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
};
