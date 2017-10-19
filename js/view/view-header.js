import ViewAbstract from "./view-abstract.js";

export default class ViewHeader extends ViewAbstract {

  constructor(main) {
    super();
    this._main = main;
  }

  get template() {
    return `
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    ${this._main.game && this._main.game.isRunning ? `
      <h1 class="game__timer">${this._main.game.currentQuestion.timeLeft}</h1>
      <div class="game__lives">
        ${this.drawLives()}
      </div>` : ``}`;
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

  bind() {
    this.element.querySelector(`.back`).addEventListener(`click`, () => {
      this.onBackClicked();
    });
  }

  drawLives() {
    const currentLives = this._main.game.lives;
    let res = ``;
    for (let i = 0; i < this._main.game.livesTotal; i++) {
      res += `<img src="img/heart__${i < currentLives ? `full` : `empty`}.svg" class="game__heart" alt="Life" width="32" height="32">`;
    }
    return res;
  }

  update() {

    return this;
  }

  onBackClicked() {
  }

}
