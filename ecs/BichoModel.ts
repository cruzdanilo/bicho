
export default class BichoModel extends Entity {
  onBichoPicked: (bicho: BichoModel) => void;

  bicho: number;

  constructor(bicho: number, x: number = 0, y: number = 0, z: number = 0) {
    super();
    this.bicho = bicho;
    this.addComponent(new Transform({ position: new Vector3(x, y, z) }));
    this.addComponent(new BoxShape());
  }

  addOnBichoPicked(onBichoPicked: (bicho: BichoModel)=> void) {
    this.onBichoPicked = onBichoPicked;
    this.addComponent(new OnClick(() => {
      this.onBichoPicked(this);
    });
  }
}
