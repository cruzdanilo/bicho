import BichoButton from './BichoButton'
import Menu from './Menu'

export default class BichoMenu extends Menu {
  onClickImage: (bicho: number) => void
  constructor(bichoCanvas: UICanvas, onClickImage: (bicho: number) => void) {
    super(bichoCanvas, "560", "560", "Pick a Bicho");
    this.__proto__ = BichoMenu.prototype;
    this.onClickImage = onClickImage;
    for (let i = 0; i < 25; i++) {
      this.addBicho(i % 5, Math.floor(i / 5), i + 1);
    }
  }

  addBicho(x: number, y: number, bicho: number) {
    new BichoButton(this, bicho, 110 * x + 10, -110 * y - 10, this.onClickImage);
  }
}
