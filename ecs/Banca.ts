import {
  ActionButton,
  BoxShape,
  Entity,
  Material,
  OnPointerDown,
  Texture,
  Transform,
  TransformConstructorArgs,
} from 'decentraland-ecs';
import TicketPrompt from './TicketPrompt';

export default class Banca extends Entity {
  constructor(transformArgs: TransformConstructorArgs) {
    super('Banca');
    this.addComponent(new Transform(transformArgs));
    this.addComponent(new BoxShape());

    const material = new Material();
    material.albedoTexture = new Texture('https://dummyimage.com/100x100/ffd700/000000.png&text=BET');
    this.addComponent(material);

    this.addComponent(new OnPointerDown(() => TicketPrompt.show(),
      { hoverText: 'Bet', showFeedback: true, button: ActionButton.POINTER }));
  }
}
