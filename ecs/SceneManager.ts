import { RequestManager, ContractFactory } from 'eth-connect/dist/eth-connect';
import {
  DecentralandInterface, ISystem, Transform, UICanvas, engine,
} from 'decentraland-ecs';
import TicketMenu from './TicketMenu';
import BichoMenu from './BichoMenu';
import BancaModel from './BancaModel';
import BichoModel from './BichoModel';

declare const dcl: DecentralandInterface;

export default class SceneManager implements ISystem {
  onBuyWishEvent: (bicho: number, ticket: number, requestManager: RequestManager, account: string) => Promise<void>;

  bichoMenu: BichoMenu;

  group: any;

  ticketMenu: TicketMenu;

  showingMenu: boolean;

  mainBanca: BancaModel;

  requestManager: RequestManager;

  account: string;

  onCloseMenu() {
    this.showingMenu = false;
  }

  constructor(
    onBuyWishEvent: (bicho: number, ticket: number, requestManager: RequestManager, account: string) => Promise<void>,
  ) {
    this.onBuyWishEvent = onBuyWishEvent;
    this.group = engine.getComponentGroup(Transform);
    const ticketCanvas = new UICanvas();
    const bichoCanvas = new UICanvas();

    this.ticketMenu = new TicketMenu(ticketCanvas, (bicho: number, ticket: number) => {
      this.showingMenu = false;
      this.ticketMenu.visible = false;
      this.onBuyWishEvent(bicho, ticket, this.requestManager, this.account);
      for (const entity of this.group.entities) {
        if (entity instanceof BancaModel) {
          (entity as BancaModel).setCountdown(2000);
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

    dcl.loadModule('web3-provider').then(async ({ rpcHandle }) => {
      const web3 = await dcl.callRpc(rpcHandle, 'getProvider', []);
      this.requestManager = new RequestManager(web3);
    });
    dcl.loadModule('EthereumController').then(async ({ rpcHandle }) => {
      this.account = await dcl.callRpc(rpcHandle, 'getUserAccount', []);
    });
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
  }

  update(dt: number) {
    for (const entity of this.group.entities) {
      // const transform = entity.getComponent(Transform);
      // transform.rotate(Vector3.Up(), dt * 10);
      if (entity instanceof BancaModel) {
        (entity as BancaModel).update(dt);
      }
    }
  }
}
