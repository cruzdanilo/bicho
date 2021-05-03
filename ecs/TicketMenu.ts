import {
  Color4, OnClick, UICanvas, UIContainerRect, UIImage, UIText,
} from 'decentraland-ecs';
import Bichos from './Bichos';
import Menu from './Menu';

export default class TicketMenu extends Menu {
  onClickTicket: (bicho: number, ticket: number) => void;

  image: UIImage;

  bicho: number = 0;

  constructor(ticketCanvas: UICanvas, onClickTicket: (bicho: number, ticket: number) => void) {
    super(ticketCanvas, '280', '500', 'Pick the best bet');

    Object.setPrototypeOf(this, TicketMenu.prototype);

    this.onClickTicket = onClickTicket;
    this.image = new UIImage(this, Bichos.getBichoTexture(1));
    this.image.sourceLeft = 0;
    this.image.sourceTop = 0;
    this.image.sourceWidth = 100;
    this.image.sourceHeight = 100;
    this.image.hAlign = 'center';
    this.image.vAlign = 'top';
    this.image.positionY = -20;
    this.image.width = '200';
    this.image.height = '200';

    this.ticket(0).onClick = new OnClick(() => onClickTicket(this.bicho, 0));
    this.ticket(1).onClick = new OnClick(() => onClickTicket(this.bicho, 1));
    this.ticket(2).onClick = new OnClick(() => onClickTicket(this.bicho, 2));
  }

  ticket(ticket: number) {
    let y = -30;
    switch (ticket) {
      case 0: y = -30; break;
      case 1: y = -110; break;
      case 2: y = -190; break;
      default: y = -30;
    }

    const ticketButton = new UIImage(this, Bichos.getTicketImage(ticket));
    ticketButton.sourceTop = 0;
    ticketButton.sourceLeft = 0;
    ticketButton.sourceWidth = 100;
    ticketButton.sourceHeight = 100;
    ticketButton.hAlign = 'center';
    ticketButton.vAlign = 'center';
    ticketButton.width = '50';
    ticketButton.height = '50';
    ticketButton.positionY = y;
    ticketButton.positionX = -75;

    const labelContainer = new UIContainerRect(this);
    labelContainer.hAlign = 'center';
    labelContainer.vAlign = 'center';
    labelContainer.width = '125';
    labelContainer.height = '50';
    labelContainer.color = Color4.Black();
    labelContainer.positionY = y;
    labelContainer.positionX = 25;

    const labelDescription = new UIText(labelContainer);
    labelDescription.value = Bichos.getTicketDescription(ticket);
    labelDescription.fontSize = 14;
    labelDescription.positionY = 30;
    labelDescription.positionX = 10;
    labelDescription.hAlign = 'left';
    labelDescription.vAlign = 'center';

    const labelPrice = new UIText(labelContainer);
    labelPrice.value = Bichos.getTicketPrice(ticket);
    labelPrice.fontSize = 10;
    labelPrice.positionY = 10;
    labelPrice.positionX = 10;
    labelPrice.hAlign = 'left';
    labelPrice.vAlign = 'center';

    return ticketButton;
  }

  show(bicho: number) {
    this.bicho = bicho;
    this.setTitle(bicho + 1);
    this.visible = true;
    this.isPointerBlocker = true;
    this.image.source = Bichos.getBichoTexture(bicho);
  }
}
