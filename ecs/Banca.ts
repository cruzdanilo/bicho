import {
  ActionButton,
  BasicMaterial,
  Billboard,
  BoxShape,
  Color3,
  Entity,
  Material,
  OnPointerDown,
  PlaneShape,
  Quaternion,
  TextShape,
  Texture,
  Transform,
  TransformConstructorArgs,
  Vector3,
} from 'decentraland-ecs';
import { KeepRotatingComponent } from '@dcl/ecs-scene-utils';
import { throttle } from 'throttle-debounce';
import { Bicho as BichoContract } from '../abi/types/Bicho';
import ticketImage from './images/ticket.jpg';
import getBichoContract from './web3/getBichoContract';
import TicketPrompt from './TicketPrompt';
import getSigner from './web3/getSigner';

export default class Banca extends Entity {
  BLOCK_INTERVAL: number;

  protected contract: BichoContract;

  protected text: TextShape;

  protected redeemEntity: Entity;

  constructor(transformArgs: TransformConstructorArgs) {
    super('Banca');

    this.addComponent(new Transform(transformArgs));
    this.addComponent(new Billboard(false, true, false));
    this.text = new TextShape();
    this.text.fontSize = 6;
    this.text.paddingBottom = 6;
    this.addComponent(this.text);

    const ticket = new Entity('Ticket');
    ticket.addComponent(new Transform({
      scale: new Vector3(1.75, 2.625, 1.75), position: new Vector3(0, 1.4, 0),
    }));
    const plane = new PlaneShape();
    plane.uvs = [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1];
    ticket.addComponent(plane);
    const material = new BasicMaterial();
    material.texture = new Texture(ticketImage);
    ticket.addComponent(material);
    ticket.addComponent(new OnPointerDown(() => TicketPrompt.show(),
      { hoverText: 'Bet', showFeedback: true, button: ActionButton.POINTER }));
    ticket.setParent(this);

    getBichoContract().then(async (contract) => {
      const BLOCK_INTERVAL = await contract.BLOCK_INTERVAL();
      this.BLOCK_INTERVAL = BLOCK_INTERVAL.toNumber();
      this.contract = contract;
      this.contract.provider.on('block', throttle(1_000, true, (n: number) => this.onBlock(n)));
    });
  }

  async redeem() {
    return this.contract.connect(await getSigner()).redeem();
  }

  async onBlock(blockNumber: number) {
    const [start, redeemableTicket] = await Promise.all([
      this.contract.start(),
      this.contract.redeemList(0).catch(() => null),
    ]);

    this.text.value = `${Math.max(0, start.toNumber() + this.BLOCK_INTERVAL - blockNumber)}`;

    if (redeemableTicket && !this.redeemEntity) {
      this.redeemEntity = new Entity('Redeem');
      this.redeemEntity.addComponent(new Transform({
        scale: new Vector3(1 / 3, 1 / 3, 1 / 3), position: new Vector3(1.4, 1.4, 0),
      }));
      this.redeemEntity.addComponent(new KeepRotatingComponent(Quaternion.Euler(0, 45, 0)));
      this.redeemEntity.addComponent(new BoxShape());
      const material = new Material();
      material.albedoColor = new Color3(1, 1, 0);
      this.redeemEntity.addComponent(material);
      this.redeemEntity.addComponent(new OnPointerDown(() => this.redeem(),
        { hoverText: 'Redeem', showFeedback: true, button: ActionButton.POINTER }));
      this.redeemEntity.setParent(this);
    } else if (!redeemableTicket && this.redeemEntity) {
      this.redeemEntity.alive = false;
      this.redeemEntity.setParent(null);
    }
  }
}
