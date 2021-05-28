import {
  DecentralandInterface,
  EngineEvent,
  IEngine,
  ISystem,
  MessageBus,
} from 'decentraland-ecs';
import Bicho from './Bicho';
import getUserBichos from './utils/getUserBichos';

declare const dcl: DecentralandInterface;

interface BaseEvent {
  address: string;
}

interface BichoEvent extends BaseEvent {
  id: number;
}

export default class SceneManager implements ISystem {
  bus = new MessageBus();

  bichos = {} as Record<string, Record<number, Bicho>>;

  engine: IEngine;

  address: string;

  activate(engine: IEngine) {
    this.engine = engine;

    dcl.subscribe('positionChanged');
    dcl.subscribe('rotationChanged');
    dcl.onEvent((event) => this.onDCLEvent(event));

    this.bus.on('request', () => this.onRequest());
    this.bus.on('bicho', ({ address, id }: BichoEvent) => this.onBicho(address, id));
    this.bus.on('deactivate', ({ address }: BaseEvent) => this.onDeactivate(address));
    this.bus.emit('request', null);
    getUserBichos().then(({ address, bichos }) => {
      this.address = address;
      bichos.forEach((id) => this.bus.emit('bicho', { address, id } as BichoEvent));
    });
  }

  deactivate() {
    this.bus.emit('deactivate', { address: this.address });
  }

  onDCLEvent(event: EngineEvent) {
    if (!this.bichos[this.address]) return;
    Object.values(this.bichos[this.address]).forEach((bicho) => bicho.onDCLEvent(event));
  }

  onBicho(address: string, id: number) {
    this.bichos[address] ??= {};
    if (this.bichos[address][id]) return;
    const bicho = new Bicho(address, id, this.bus, {}, address !== this.address);
    this.engine.addEntity(bicho);
    this.bichos[address][id] = bicho;
  }

  onRequest() {
    if (!this.address || !this.bichos[this.address]) return;
    Object.keys(this.bichos[this.address]).forEach((id) => this.bus.emit('bicho',
      { address: this.address, id: Number(id) } as BichoEvent));
  }

  onDeactivate(address: string) {
    if (!this.bichos[address]) return;
    Object.values(this.bichos[address]).forEach((bicho) => this.engine.removeEntity(bicho));
    delete this.bichos[address];
  }
}
