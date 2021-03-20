
export default class BancaModel extends Entity {
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    super();
    this.addComponent(new Transform({ position: new Vector3(x, y, z) }));
    this.addComponent(new BoxShape());
  }
}
