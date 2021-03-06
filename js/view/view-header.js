import ViewAbstract from './view-abstract.js';
import Lives from '../presenter/presenter-lives.js';
import Timer from '../presenter/presenter-timer.js';

const CLASS_BUTTON_BACK = `back`;

export default class ViewHeader extends ViewAbstract {

  constructor(app) {
    super();
    this._app = app;
    this._game = app.game;
    this._timer = null;
    this._lives = null;
  }

  get template() {
    return `
    <div class="header__back">
      <button class="${CLASS_BUTTON_BACK}">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>`;
  }

  get templateTag() {
    return `header`;
  }

  get templateClass() {
    return `header`;
  }

  get templateId() {
    return ``;
  }

  get timerView() {
    this._timer = this._timer || new Timer(this._app);
    return this._timer;
  }

  get livesView() {
    this._lives = this._lives || new Lives(this._app);
    return this._lives;
  }

  updateTimer() {
    this.updateGameView(this.timerView);
  }

  updateLives() {
    this.updateGameView(this.livesView);
  }

  updateGameView(elementObject) {
    const element = elementObject.element;
    if (this.isGameRunning()) {
      if (element.parentNode !== this._element) {
        this._element.appendChild(element);
      }
      elementObject.init(this._app);
    } else if (element.parentNode === this._element) {
      this._element.removeChild(element);
    }
  }

  isGameRunning() {
    return this._game && this._game.isRunning;
  }

  bind() {
    this.element.querySelector(`.${CLASS_BUTTON_BACK}`).addEventListener(`click`, () => {
      this.onBackClicked();
    });
  }

  addInnerViews() {
    if (this.isGameRunning()) {
      this._element.appendChild(this.timerView.element);
      this._element.appendChild(this.livesView.element);
    }
  }

  doUpdate(app) {
    this._game = app.game;
    this.updateTimer();
    this.updateLives();
  }

  onBackClicked() {
    throw new Error(`Abstract method called`);
  }

  needsBind() {
    return true;
  }

  hasInnerViews() {
    return true;
  }

  needsUpdate() {
    return true;
  }

}
