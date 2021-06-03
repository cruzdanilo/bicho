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

export default class Bicho extends NPC {
  static contract: any;

  address: string;

  id: number;

  bus: MessageBus;

  remote: boolean;

  eventId: string;

  constructor(
    address: string,
    id: number,
    bus: MessageBus,
    transformArgs: TransformConstructorArgs,
    remote = false,
  ) {
    super(transformArgs, placeholder, () => {});
    this.address = address;
    this.id = id;
    this.bus = bus;
    this.remote = remote;
    this.eventId = `${this.address}[${this.id}]`;
    this.bus.on(this.eventId, (value) => this.update(value));
  }

  activate() {
    super.activate();
  }

  update({ position, rotation }: UpdateEvent) {
    if (!this.remote) this.bus.emit('bicho', { address: this.address, id: this.id });
    const transform = this.getComponent(Transform);
    if (rotation) transform.rotation.setEuler(0, rotation.y, 0);
    if (position) {
      const offset = this.id % 2 ? 1 : -1;
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
