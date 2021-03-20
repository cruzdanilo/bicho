import { Configuration } from 'webpack';

function config(_: any, { mode = 'production' }): Configuration {
  const isDevelopment = mode === 'development';
  return {
    entry: './ecs/main.ts',
    resolve: { extensions: ['.ts', '.js'] },
    devtool: isDevelopment && 'eval',
    output: { clean: true },
    cache: { type: 'filesystem', buildDependencies: { config: [__filename] } },
    module: {
      rules: [
        { test: /\.(ts|js)$/, use: 'babel-loader' },
      ],
    },
  };
}

export default config;
