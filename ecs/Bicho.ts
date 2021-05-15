import { TransformConstructorArgs } from 'decentraland-ecs';
import { NPC, NPCData } from '@dcl/npc-scene-utils';
import placeholder from './models/placeholder.gltf';

export default class Bicho extends NPC {
  constructor(position: TransformConstructorArgs, onActivate: () => void, data?: NPCData) {
    super(position, placeholder, onActivate, data);
  }
}
