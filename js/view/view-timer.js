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
    const timer = game.currentQuestion.timer;
    timer.onTick = () => {
      this.updateCounter(timer.timeElapsed);
    };
    this._time = timer.timeElapsed;
    this._element.innerHTML = `${this._time}`;
    return this;
  }

  updateCounter(time) {
    this._time = time;
    this._element.innerHTML = `${this._time}`;
  }

}
