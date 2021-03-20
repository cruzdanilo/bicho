import 'dotenv/config';
import { Configuration, DefinePlugin } from 'webpack';

const {
  BICHO_ADDRESS = '0x9790a13073521575b145360A27fa49943ffF548B',
} = process.env;

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
    plugins: [
      new DefinePlugin(Object.fromEntries(Object.entries({
        BICHO_ADDRESS,
      }).map(([k, v]) => [k, JSON.stringify(v)]))),
    ],
  };
}

export default config;
