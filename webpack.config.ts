import 'dotenv/config';
import { Configuration, DefinePlugin, ProvidePlugin } from 'webpack';

const {
  BICHO_ADDRESS = '0xFDf0dC8A74ea2F1261A3bE20ACc0Ee58b4F363e8',
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
      new ProvidePlugin({
        ActionButton: ['decentraland-ecs', 'ActionButton'],
        AnimationState: ['decentraland-ecs', 'AnimationState'],
        Animator: ['decentraland-ecs', 'Animator'],
        Attachable: ['decentraland-ecs', 'Attachable'],
        Camera: ['decentraland-ecs', 'Camera'],
        Color4: ['decentraland-ecs', 'Color4'],
        Component: ['decentraland-ecs', 'Component'],
        Entity: ['decentraland-ecs', 'Entity'],
        Font: ['decentraland-ecs', 'Font'],
        Fonts: ['decentraland-ecs', 'Fonts'],
        GLTFShape: ['decentraland-ecs', 'GLTFShape'],
        Input: ['decentraland-ecs', 'Input'],
        OnClick: ['decentraland-ecs', 'OnClick'],
        OnPointerDown: ['decentraland-ecs', 'OnPointerDown'],
        Quaternion: ['decentraland-ecs', 'Quaternion'],
        Texture: ['decentraland-ecs', 'Texture'],
        Transform: ['decentraland-ecs', 'Transform'],
        UICanvas: ['decentraland-ecs', 'UICanvas'],
        UIContainerRect: ['decentraland-ecs', 'UIContainerRect'],
        UIImage: ['decentraland-ecs', 'UIImage'],
        UIText: ['decentraland-ecs', 'UIText'],
        Vector3: ['decentraland-ecs', 'Vector3'],
        engine: ['decentraland-ecs', 'engine'],
      }),
    ],
  };
}

export default config;
