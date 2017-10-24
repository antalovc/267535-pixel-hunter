import ViewAbstract from './view-abstract.js';

export default class ViewTimer extends ViewAbstract {

  constructor(main) {
    super();
    this._timer = main.timer;
    this._timer.onTick = () => {
      this.updateCounter();
    };
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

  update() {
    this.updateCounter();
    return this;
  }

  updateCounter() {
    this._element.innerHTML = `${this._timer.timeElapsed}`;
  }

}
