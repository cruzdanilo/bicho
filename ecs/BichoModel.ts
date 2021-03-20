import {
  BoxShape,
  Entity, Material, OnClick, SphereShape, Transform, Vector3,
} from 'decentraland-ecs';
import Bichos from './Bichos';

export default class BichoModel extends Entity {
  onBichoPicked: (bicho: BichoModel) => void;

  bicho: number;

  constructor(bicho: number, x: number = 0, y: number = 0, z: number = 0) {
    super();
    this.bicho = bicho;
    this.addComponent(new Transform({ position: new Vector3(x, y, z),
      scale: new Vector3(0.5, 1, 0.5) }));
    this.addComponent(new BoxShape());

    const bichoMaterial = new Material();
    bichoMaterial.albedoTexture = Bichos.getBichoTexture(bicho);
    bichoMaterial.metallic = 0.9;
    bichoMaterial.roughness = 0.1;

    this.addComponent(bichoMaterial);
  }

  addOnBichoPicked(onBichoPicked: (bicho: BichoModel) => void) {
    this.onBichoPicked = onBichoPicked;
    this.addComponent(new OnClick(() => this.onBichoPicked(this)));
  }
}
