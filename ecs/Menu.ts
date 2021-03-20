
import {
  Color4, OnClick, Texture, UICanvas, UIContainerRect, UIImage, UIText,
} from 'decentraland-ecs';

export default class Menu extends UIContainerRect {
  menuCanvas: UICanvas;

  text: UIText;

  onClose: (() => void) | undefined;

  constructor(menuCanvas: UICanvas, width: string | number,
    height: string | number, title: string) {
    super(menuCanvas);
    this.menuCanvas = menuCanvas;
    this.color = Color4.Black();
    this.opacity = 0.8;
    this.width = width;
    this.height = height;
    this.adaptHeight = false;
    this.adaptWidth = false;
    this.hAlign = 'center';
    this.vAlign = 'center';
    this.isPointerBlocker = true;

    const titleBar = new UIContainerRect(this);
    titleBar.color = Color4.Black();
    titleBar.vAlign = 'top';
    titleBar.opacity = 0.8;
    titleBar.width = width;
    titleBar.height = 30;
    titleBar.positionY = titleBar.height;

    this.text = new UIText(titleBar);
    this.text.hAlign = 'left';
    this.text.vAlign = 'top';
    this.text.fontSize = 16;
    this.text.value = title;
    this.text.positionX = 10;
    this.text.positionY = 25;

    this.visible = false;

    const closeButton = new UIImage(titleBar, new Texture('https://dummyimage.com/10x10/000000/C0C0C0.png&text=X'));
    closeButton.sourceLeft = 0;
    closeButton.sourceTop = 0;
    closeButton.sourceWidth = 100;
    closeButton.sourceHeight = 100;
    closeButton.hAlign = 'right';
    closeButton.vAlign = 'center';
    closeButton.height = 10;
    closeButton.positionX = -10;
    closeButton.width = 10;
    closeButton.onClick = new OnClick(() => {
      this.visible = false;
      this.isPointerBlocker = false;
      if (this.onClose !== undefined) {
        this.onClose();
      }
    });
  }

  setTitle(title: number) {
    this.text.value = `Bicho: ${title}`;
  }

  addOnClose(onClose: ()=>void) {
    this.onClose = onClose;
  }
}
