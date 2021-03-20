import {
  BoxShape, Color3, Entity, OnClick, TextShape, Transform, Vector3, engine, Texture, Material,
} from 'decentraland-ecs';

export default class BancaModel extends Entity {
  countFinal: number = 2000;

  counterModel?: Entity;

  counterOn: boolean;

  onTicketWishBuy: () => void;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    super();
    this.addComponent(new Transform({ position: new Vector3(x, y, z) }));
    this.addComponent(new BoxShape());

    const bancaMaterial = new Material();
    bancaMaterial.albedoTexture = new Texture('https://dummyimage.com/100x100/ffd700/000000.png&text=BET');

    this.addComponent(bancaMaterial);

    this.counterOn = false;
  }

  addOnTicketWishBuy(onTicketWishBuy: () => void) {
    this.onTicketWishBuy = onTicketWishBuy;
    this.addComponent(new OnClick(() => this?.onTicketWishBuy()));
  }

  setCountdown(timeToEventInSec: number) {
    if (this.counterOn) return;
    this.counterModel = new Entity();
    const countNow = Math.floor(Date.now() / 1000);
    this.countFinal = countNow + timeToEventInSec;
    const text = new TextShape((this.countFinal - countNow).toString());
    text.fontSize = 8;
    text.color = Color3.Black();
    this.counterModel.addComponent(text);
    const transform = new Transform({ position: new Vector3(0, 1, 0) });
    this.counterModel.addComponent(transform);
    this.counterModel.setParent(this);
    engine.addEntity(this.counterModel);
    this.counterOn = true;
  }

  update(dt: number) {
    if (this.counterModel) {
      const transform = this.counterModel.getComponent(Transform);
      transform.rotate(Vector3.Up(), dt * 10);
    }

    if (this.counterOn && this.counterModel !== undefined) {
      const countNow = Math.floor(Date.now() / 1000);
      const count = this.countFinal - countNow;

      if (count >= 0) {
        this.counterModel.getComponent(TextShape).value = count.toString();
      } else {
        this.counterModel.getComponent(TextShape).value = '!!!';
      }
    }
  }
}
