/// <reference path="assets.d.ts"/>
import {
  EngineEvent,
  IEvents,
  MessageBus,
  ReadOnlyVector3,
  Transform,
  TransformConstructorArgs,
} from 'decentraland-ecs';
import { NPC } from '@dcl/npc-scene-utils';
import placeholder from './models/placeholder.gltf';

interface UpdateEvent {
  position?: ReadOnlyVector3;
  rotation?: ReadOnlyVector3;
}

export enum BichoType {
  Avestruz,
  Águia,
  Burro,
  Borboleta,
  Cachorro,
  Cabra,
  Carneiro,
  Camelo,
  Cobra,
  Coelho,
  Cavalo,
  Elefante,
  Galo,
  Gato,
  Jacaré,
  Leão,
  Macaco,
  Porco,
  Pavão,
  Peru,
  Touro,
  Tigre,
  Urso,
  Veado,
  Vaca,
  COUNT,
}

export default class Bicho extends NPC {
  readonly owner: string;

  readonly type: BichoType;

  readonly remote: boolean;

  protected bus: MessageBus;

  protected eventId: string;

  constructor(
    owner: string,
    type: BichoType,
    bus: MessageBus,
    transformArgs: TransformConstructorArgs,
    remote = false,
  ) {
    super(transformArgs, placeholder, () => {},
      { onlyClickTrigger: true, onlyETrigger: true, walkingAnim: 'Walk' });
    this.owner = owner;
    this.type = type;
    this.remote = remote;
    this.bus = bus;
    this.eventId = `${this.owner}[${this.type}]`;
    this.bus.on(this.eventId, (value) => this.update(value));
  }

  activate() {
    super.activate();
  }

  update({ position, rotation }: UpdateEvent) {
    const transform = this.getComponent(Transform);
    if (rotation) transform.rotation.setEuler(0, rotation.y, 0);
    if (position) {
      const offset = this.type % 2 ? 1 : -1;
      transform.position.set(position.x, position.y, position.z + offset);
    }
  }

  onDCLEvent({ type, data }: EngineEvent) {
    switch (type) {
      case 'positionChanged': {
        const { position, playerHeight } = data as IEvents['positionChanged'];
        this.bus.emit(this.eventId,
          { position: { x: position.x, y: position.y - playerHeight, z: position.z } });
        break;
      }
      case 'rotationChanged': {
        const { rotation } = data as IEvents['rotationChanged'];
        this.bus.emit(this.eventId, { rotation });
        break;
      }
      default:
    }
  }
}
