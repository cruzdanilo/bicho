import { Color3, Texture } from 'decentraland-ecs';

export default class Bichos {
  static getBichoTexture(bicho: number) {
    switch (bicho) {
      case 1: {
        return new Texture('bicho1.png');
      }
      default: {
        return new Texture('bicho1.png');
      }
    }
  }

  static getBichoColor(bicho: number) {
    switch (bicho % 5) {
      case 0: return new Color3(1, (bicho % 5) / 5, (bicho % 5) / 5);
      case 1: return new Color3((bicho % 5) / 5, 1, (bicho % 5) / 5);
      case 2: return new Color3((bicho % 5) / 5, (bicho % 5) / 5, 1);
      case 3: return new Color3((bicho % 5) / 5, 1, 1);
      case 4: return new Color3(0, 0, (bicho % 5) / 5);
      default: return Color3.Black();
    }
  }
}
