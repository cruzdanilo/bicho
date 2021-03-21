import { UICanvas } from 'decentraland-ecs';
import BichoButton from './BichoButton';
import Menu from './Menu';

export default class BichoMenu extends Menu {
  onClickImage: (bicho: number) => void;

  constructor(bichoCanvas: UICanvas, onClickImage: (bicho: number) => void) {
    super(bichoCanvas, '560', '560', 'Pick a Bicho');
    Object.setPrototypeOf(this, BichoMenu.prototype);
    this.onClickImage = onClickImage;
    for (let i = 0; i < 25; i++) {
      this.addBicho(i % 5, Math.floor(i / 5), i);
    }
  }

  addBicho(x: number, y: number, bicho: number) {
    new BichoButton(this, bicho, 110 * x + 10, -110 * y - 10, this.onClickImage);
  }
}
