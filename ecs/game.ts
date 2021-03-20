import TicketMenu from './TicketMenu';
import BichoMenu from './BichoMenu';

class RotatorSystem implements ISystem {
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

const ticketCanvas = new UICanvas();
const ticketMenu = new TicketMenu(ticketCanvas, (bicho: number, ticket: number) => {
  console.log(`Ticket escolhido ${ticket} para o bicho ${bicho}`);
});
ticketMenu.visible = false;

const bichoCanvas = new UICanvas();
const bichoMenu = new BichoMenu(bichoCanvas, (bicho: number) => {
  bichoMenu.visible = false;
  ticketMenu.show(bicho);
});
bichoMenu.visible = false;

cube.addComponent(new OnClick(() => {
  bichoMenu.visible = true;
  bichoMenu.isPointerBlocker = true;
}));

