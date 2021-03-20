import { UIImage, UIShape, OnClick } from 'decentraland-ecs';
import Bichos from './Bichos';

export default class BichoButton extends UIImage {
  bicho: number;

  constructor(bichoMenu: UIShape, bicho: number, x: number, y: number,
    onClickImage: (bicho: number) => void) {
    super(bichoMenu, Bichos.getBichoTexture(bicho));
    this.bicho = bicho;
    this.hAlign = 'left';
    this.vAlign = 'top';
    this.width = '100';
    this.height = '100';
    this.positionX = x;
    this.positionY = y;
    this.onClick = new OnClick(() => onClickImage(bicho));
  }
}
