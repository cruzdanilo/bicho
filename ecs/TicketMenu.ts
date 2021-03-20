import {
  OnClick, Texture, UICanvas, UIImage,
} from 'decentraland-ecs';
import Menu from './Menu';
import Bichos from './Bichos';

export default class TicketMenu extends Menu {
  onClickTicket: (bicho: number, ticket: number) => void;

  image: UIImage;

  bicho: number = 0;

  constructor(ticketCanvas: UICanvas, onClickTicket: (bicho: number, ticket: number) => void) {
    super(ticketCanvas, '280', '500', 'Pick the best bet');

    Object.setPrototypeOf(this, TicketMenu.prototype);

    this.onClickTicket = onClickTicket;
    this.image = new UIImage(this, Bichos.getBichoTexture(0));
    this.image.hAlign = 'center';
    this.image.vAlign = 'top';
    this.image.positionY = -20;
    this.image.width = '200';
    this.image.height = '200';

    this.ticket(-30).onClick = new OnClick(() => onClickTicket(this.bicho, 0));
    this.ticket(-110).onClick = new OnClick(() => onClickTicket(this.bicho, 1));
    this.ticket(-190).onClick = new OnClick(() => onClickTicket(this.bicho, 2));
  }

  ticket(y: number) {
    const ticketButton = new UIImage(this, new Texture('ticket1.png'));
    ticketButton.hAlign = 'center';
    ticketButton.vAlign = 'center';
    ticketButton.width = '100';
    ticketButton.height = '50';
    ticketButton.positionY = y;
    ticketButton.positionX = -50;
    return ticketButton;
  }

  show(bicho: number) {
    this.bicho = bicho;
    this.setTitle(bicho);
    this.visible = true;
    this.isPointerBlocker = true;
    this.image.source = Bichos.getBichoTexture(bicho);
  }
}
