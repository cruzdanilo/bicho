import { RequestManager, ContractFactory } from 'eth-connect/dist/eth-connect';
import {
  DecentralandInterface, ISystem, Transform, UICanvas, engine,
} from 'decentraland-ecs';
import TicketMenu from './TicketMenu';
import BichoMenu from './BichoMenu';
import BancaModel from './BancaModel';
import BichoModel from './BichoModel';
// @ts-ignore
import Bicho from '../artifacts/contracts/Bicho.sol/Bicho.json';

declare const dcl: DecentralandInterface;
// declare const BICHO_ADDRESS: string;
const BICHO_ADDRESS = '0xef4A759402d7Cd4790161c28084209674778B8c2';

export default class SceneManager implements ISystem {
  onBuyWishEvent: (bicho: number, ticket: number, requestManager: RequestManager) => Promise<void>;

  bichoMenu: BichoMenu;

  group: any;

  ticketMenu: TicketMenu;

  showingMenu: boolean;

  mainBanca: BancaModel;

  requestManager: RequestManager;

  onCloseMenu() {
    this.showingMenu = false;
  }

  constructor(
    onBuyWishEvent: (bicho: number, ticket: number, requestManager: RequestManager) => Promise<void>,
  ) {
    this.onBuyWishEvent = onBuyWishEvent;
    this.group = engine.getComponentGroup(Transform);
    const ticketCanvas = new UICanvas();
    const bichoCanvas = new UICanvas();

    this.ticketMenu = new TicketMenu(ticketCanvas, (bicho: number, ticket: number) => {
      this.showingMenu = false;
      this.ticketMenu.visible = false;
      this.onBuyWishEvent(bicho, ticket, this.requestManager);
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
      const factory = new ContractFactory(this.requestManager, Bicho.abi);
      const contract = (await factory.at(BICHO_ADDRESS)) as any;
      const value = { from: '0xC8b8Ed1276e58dF741aD1a556505ab0ED1F6f91a', value: 1231239 };
      // console.log('abriu');
      console.log(await contract.endGame({ from: '0xC8b8Ed1276e58dF741aD1a556505ab0ED1F6f91a' }));
      // console.log(await contract.redeem({ from: '0xC8b8Ed1276e58dF741aD1a556505ab0ED1F6f91a' }), 'fecha');
      // console.log('fechou');
      // await contract.redeem({ from: '0xC8b8Ed1276e58dF741aD1a556505ab0ED1F6f91a' });
      // await Promise.all(Array(25).fill(null).map((_, num) => contract.bet(num, value)));
      // console.log(await contract.bet({ from: '0xC8b8Ed1276e58dF741aD1a556505ab0ED1F6f91a', value: 123123984 }), 'bet!');
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
