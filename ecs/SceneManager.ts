import {
  DecentralandInterface,
  EngineEvent,
  IEngine,
  ISystem,
  MessageBus,
} from 'decentraland-ecs';
import Bicho, { BichoType } from './Bicho';
import getUserAddress from './web3/getUserAddress';
import getUserBichos from './web3/getUserBichos';

declare const dcl: DecentralandInterface;

interface BaseEvent {
  address: string;
}

interface BichoEvent extends BaseEvent {
  type: BichoType;
}

export default class SceneManager implements ISystem {
  bus = new MessageBus();

  bichos: { [address: string]: { [T in BichoType]?: Bicho } } = {};

  engine: IEngine;

  address: string;

  activate(engine: IEngine) {
    this.engine = engine;

    dcl.subscribe('positionChanged');
    dcl.subscribe('rotationChanged');
    dcl.onEvent((event) => this.onDCLEvent(event));

    this.bus.on('request', () => this.onRequest());
    this.bus.on('bicho', ({ address, type }: BichoEvent) => this.onBicho(address, type));
    this.bus.on('deactivate', ({ address }: BaseEvent) => this.onDeactivate(address));
    this.bus.emit('request', null);
    Promise.all([getUserAddress(), getUserBichos()]).then(([address, bichos]) => {
      this.address = address;
      bichos?.forEach((type) => this.bus.emit('bicho', { address, type } as BichoEvent));
    });
  }

  deactivate() {
    this.bus.emit('deactivate', { address: this.address });
  }

  onDCLEvent(event: EngineEvent) {
    if (!this.bichos[this.address]) return;
    Object.values(this.bichos[this.address]).forEach((bicho) => bicho.onDCLEvent(event));
  }

  onBicho(address: string, type: BichoType) {
    this.bichos[address] ??= {};
    if (this.bichos[address][type]) return;
    const bicho = new Bicho(address, type, this.bus, {}, address !== this.address);
    this.engine.addEntity(bicho);
    this.bichos[address][type] = bicho;
  }

  onRequest() {
    if (!this.address || !this.bichos[this.address]) return;
    Object.keys(this.bichos[this.address]).forEach((type) => this.bus.emit('bicho',
      { address: this.address, type: Number(type) } as BichoEvent));
  }

  onDeactivate(address: string) {
    if (!this.bichos[address]) return;
    Object.values(this.bichos[address]).forEach((bicho) => this.engine.removeEntity(bicho));
    delete this.bichos[address];
  }
}
