import ViewAbstract from './view-abstract.js';

export default class ViewTimer extends ViewAbstract {

  constructor(app) {
    super();
    this._timer = app.timer;
    this._timer.onTick = () => {
      this.updateCounter();
    };
  }

  get template() {
    return `${this._timer.timeElapsed}`;
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

  update() {
    this.updateCounter();
  }

  updateCounter() {
    this._element.innerHTML = `${this._timer.timeElapsed}`;
  }

}
