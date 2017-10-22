import ViewAbstract from "./view-abstract.js";

export default class ViewTimer extends ViewAbstract {

  constructor(game) {
    super();
    this._time = game.currentQuestion.timeLeft;
  }

  get template() {
    return `${this._time}`;
  }

  get templateTag() {
    return `h1`;
  }

  get templateClass() {
    return `game__timer`;
  }

  get templateId() {
    return ``;
  }

  update(game) {
    this._time = game.currentQuestion.timeLeft;
    this._element.innerHTML = `${this._time}`;
    return this;
  }

}
