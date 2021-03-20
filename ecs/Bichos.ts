export default class Bichos {
  static getBichoTexture(bicho: Number) {
    switch (bicho) {
      case 1: {
        return new Texture("bicho1.png");
      }
      default: {
        return new Texture("bicho1.png");
      }
    }
  }
}
