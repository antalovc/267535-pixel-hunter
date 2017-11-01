import ViewAbstract from './view-abstract.js';

const CLASS_BUTTON_RESTART = `notification__restart`;
const CLASS_BUTTON_PLAY = `notification__play`;

export default class ViewNotification extends ViewAbstract {

  constructor() {
    super();
  }

  get template() {
    return `
      <p>Текущая игра будет потеряна!</p>
      <div class="notification__buttons">
        <button class="${CLASS_BUTTON_RESTART}" type="button" title="Начать сначала">
          Начать сначала
        </button>
        <button class="${CLASS_BUTTON_PLAY}" type="button" title="Играть дальше">
          Играть дальше
        </button>
      </div>`;
  }

  get templateTag() {
    return `section`;
  }

  get templateClass() {
    return `notification`;
  }

  get templateId() {
    return ``;
  }

  bind() {
    this.element.querySelector(`.${CLASS_BUTTON_RESTART}`).addEventListener(`click`, () => {
      this.onRestartClicked();
    });
    this.element.querySelector(`.${CLASS_BUTTON_PLAY}`).addEventListener(`click`, () => {
      this.onPlayClicked();
    });
  }

  onRestartClicked() {
  }

  onPlayClicked() {
  }
}
