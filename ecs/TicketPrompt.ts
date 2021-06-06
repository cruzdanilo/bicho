/// <reference path="assets.d.ts"/>
import {
  ButtonStyles,
  CustomPrompt,
  CustomPromptButton,
  CustomPromptCheckBox,
  CustomPromptText,
  LoadingIcon,
  PromptStyles,
} from '@dcl/ui-scene-utils';
import { Entity } from 'decentraland-ecs';
import { isPreviewMode } from './@decentraland/EnvironmentAPI';
import { BichoType } from './Bicho';
import image from './images/ticket.jpg';
import getBichoContract from './web3/getBichoContract';
import getSigner from './web3/getSigner';

const IMAGE_SCALE = 2 / 3;
const IMAGE_WIDTH = 580 - 13 - 13;
const IMAGE_HEIGHT = 864 - 104 - 31;

const COLUMN_COUNT = 5;
const COLUMN_WIDTH = IMAGE_WIDTH / COLUMN_COUNT - 1;
const COLUMN_HEIGHT = IMAGE_HEIGHT / COLUMN_COUNT + 1;

const BAR_HEIGHT = 64;
const CONTENT_Y = BAR_HEIGHT / 2;
const BAR_Y = -(IMAGE_HEIGHT * IMAGE_SCALE + 16) / 2;

enum State {
  Bet,
  Waiting,
  Result,
}

interface CustomPromptElement extends Entity {
  hide(): void;
  show(): void;
}

class TicketPrompt extends CustomPrompt {
  protected bichos: CustomPromptCheckBox[];

  protected submitButton: CustomPromptButton;

  protected result: CustomPromptText;

  protected state: State;

  protected groups: { [S in State]?: CustomPromptElement[] } = {};

  protected devMode;

  constructor() {
    super(PromptStyles.LIGHT,
      IMAGE_WIDTH * IMAGE_SCALE + 48, IMAGE_HEIGHT * IMAGE_SCALE + BAR_HEIGHT + 48);

    this.result = this.addText(null, 0, CONTENT_Y);
    this.groups[State.Result] = [this.result,
      this.addButton('OK', 0, BAR_Y, () => this.hide(), ButtonStyles.RED)];

    const loading = new LoadingIcon(null, 0, 0);
    this.elements.push(loading);
    this.groups[State.Waiting] = [loading];

    const ticket = this.addIcon(image, 0, CONTENT_Y,
      IMAGE_WIDTH * IMAGE_SCALE, IMAGE_HEIGHT * IMAGE_SCALE, {
        sourceLeft: 13, sourceTop: 104, sourceWidth: IMAGE_WIDTH, sourceHeight: IMAGE_HEIGHT,
      });
    const cancelButton = this.addButton('Cancel', 100, BAR_Y, () => this.hide(), ButtonStyles.F);
    this.submitButton = this.addButton('Bet', -100, BAR_Y, () => this.submit(), ButtonStyles.RED);
    this.bichos = [...Array(BichoType.COUNT)].map((_: any, i) => {
      const x = i % COLUMN_COUNT;
      const y = Math.floor(i / COLUMN_COUNT);
      const xOffset = (x - (COLUMN_COUNT - 1) / 2) * IMAGE_SCALE * COLUMN_WIDTH;
      const yOffset = ((COLUMN_COUNT - 1) / 2 - y) * IMAGE_SCALE * COLUMN_HEIGHT + CONTENT_Y;
      return this.addCheckbox(
        null,
        xOffset - 38 * IMAGE_SCALE,
        yOffset - 33 * IMAGE_SCALE,
        () => {
          if (!this.devMode) this.bichos.forEach((checkbox, j) => i !== j && checkbox.uncheck());
          this.submitButton.enable();
        },
        () => this.submitButton.grayOut(),
      );
    });
    this.groups[State.Bet] = [ticket, cancelButton, this.submitButton, ...this.bichos];

    this.hide();

    isPreviewMode().then((value) => { this.devMode = value; });
  }

  reset() {
    this.submitButton.grayOut();
    this.bichos.forEach((checkbox) => checkbox.uncheck());
    this.result.text.value = null;
    this.state = State.Bet;
  }

  hide() {
    super.hide();
    this.reset();
  }

  show() {
    this.background.visible = true;
    Object.entries(this.groups).forEach(([key, entities]) => {
      const visible = Number(key) === this.state;
      entities.forEach((entity) => (visible ? entity.show() : entity.hide()));
    });
  }

  async submit() {
    try {
      this.setState(State.Waiting);
      const [contract, signer] = await Promise.all([getBichoContract(), getSigner()]);
      const writableContract = contract.connect(signer);
      let nonce = await signer.getTransactionCount();
      await Promise.all(this.bichos.map(async (checkbox, i) => {
        if (!checkbox.checked) return;
        await writableContract.bet(i, { nonce: ++nonce });
      }));
      this.hide();
    } catch ({ code, message }) {
      if (code === 4001) {
        this.hide();
      } else {
        this.result.text.value = `ERROR\n\n${message ?? ''}`;
        this.setState(State.Result);
      }
    }
  }

  setState(state: State) {
    this.state = state;
    this.show();
  }
}

export default new TicketPrompt();
