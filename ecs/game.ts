class RotatorSystem {
  group = engine.getComponentGroup(Transform);

  update(dt: number) {
    for (const entity of this.group.entities) {
      const transform = entity.getComponent(Transform);
      transform.rotate(Vector3.Up(), dt * 10);
    }
  }
}

engine.addSystem(new RotatorSystem());

function spawnCube(x: number, y: number, z: number) {
  const cube = new Entity();
  cube.addComponent(new Transform({ position: new Vector3(x, y, z) }));
  cube.addComponent(new BoxShape());
  engine.addEntity(cube);
  return cube;
}

const cube = spawnCube(8, 1, 8);

cube.addComponent(new OnClick(() => {
  cube.getComponent(Transform).scale.z *= 1.1;
  cube.getComponent(Transform).scale.x *= 0.9;

  spawnCube(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1);
}));
