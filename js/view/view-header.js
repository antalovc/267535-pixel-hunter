import ViewAbstract from './view-abstract.js';
import getLives from '../presenter/get-lives.js';
import getTimer from '../presenter/get-timer.js';

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
      <button class="back">
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
    this._timer = this._timer || getTimer(this._app);
    return this._timer;
  }

  get livesView() {
    this._lives = this._lives || getLives(this._game);
    return this._lives;
  }

  bind() {
    this.element.querySelector(`.back`).addEventListener(`click`, () => {
      this.onBackClicked();
    });
  }

  addInnerViews() {
    if (this.isGameRunning()) {
      this._element.appendChild(this.timerView.element);
      this._element.appendChild(this.livesView.element);
    }
  }

  update(app) {
    this._game = app.game;
    this.updateTimer();
    this.updateLives();
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
      elementObject.update(this._game);
    } else {
      this._element.removeChild(element);
    }
  }

  isGameRunning() {
    return this._game && this._game.isRunning;
  }

  onBackClicked() {
  }

}
