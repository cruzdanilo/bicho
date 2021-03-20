import { Web3Provider } from '@ethersproject/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  ISystem, Transform, UICanvas, Vector3, engine,
} from 'decentraland-ecs';
import TicketMenu from './TicketMenu';
import BichoMenu from './BichoMenu';
import BancaModel from './BancaModel';
import BichoModel from './BichoModel';

export default class SceneManager implements ISystem {
  onBuyWishEvent: (bicho: number, ticket: number, ethers: Web3Provider) => void;

  bichoMenu: BichoMenu;

  group: any;

  ticketMenu: TicketMenu;

  showingMenu: boolean;

  mainBanca: BancaModel;

  ethers: Web3Provider;

  onCloseMenu() {
    this.showingMenu = false;
  }

  constructor(onBuyWishEvent: (bicho: number, ticket: number, ethers: Web3Provider) => void) {
    this.onBuyWishEvent = onBuyWishEvent;
    this.group = engine.getComponentGroup(Transform);
    const ticketCanvas = new UICanvas();
    const bichoCanvas = new UICanvas();

    this.ticketMenu = new TicketMenu(ticketCanvas, (bicho: number, ticket: number) => {
      this.showingMenu = false;
      this.ticketMenu.visible = false;
      this.onBuyWishEvent(bicho, ticket, this.ethers);
      if (!this.mainBanca) {
        for (const entity of this.group.entities) {
          if (entity instanceof BancaModel) {
            (entity as BancaModel).setCountdown(2000);
          }
        }
      }
    });
    this.ticketMenu.addOnClose(() => this.onCloseMenu());

    this.bichoMenu = new BichoMenu(bichoCanvas, (bicho: number) => {
      this.bichoMenu.visible = false;
      this.ticketMenu.show(bicho);
    });
    this.bichoMenu.addOnClose(() => this.onCloseMenu());

    this.showingMenu = false;

    detectEthereumProvider().then((ethereum) => { this.ethers = new Web3Provider(ethereum); });
  }

  public start() {
    engine.addSystem(this);
  }

  public spawnBicho(bicho: number, x: number = 0, y: number = 0, z: number = 0) {
    const bichoModel = new BichoModel(bicho, x, y, z);
    bichoModel.addOnBichoPicked((picked: BichoModel) => {
      if (!this.showingMenu) {
        this.showingMenu = true;
        this.ticketMenu.show(picked.bicho);
        this.ticketMenu.isPointerBlocker = true;
      }
    });

    engine.addEntity(bichoModel);
  }

  public spawnBanca(x: number = 0, y: number = 0, z: number = 0) {
    const banca = new BancaModel(x, y, z);
    engine.addEntity(banca);
    banca.addOnTicketWishBuy(() => {
      if (!this.showingMenu) {
        this.showingMenu = true;
        this.bichoMenu.visible = true;
        this.bichoMenu.isPointerBlocker = true;
      }
    });
    this.mainBanca = banca;
  }

  update(dt: number) {
    for (const entity of this.group.entities) {
      const transform = entity.getComponent(Transform);
      transform.rotate(Vector3.Up(), dt * 10);
      if (entity instanceof BancaModel) {
        (entity as BancaModel).update(dt);
      }
    }
  }
}