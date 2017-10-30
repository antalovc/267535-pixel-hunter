import ViewAbstract from './view-abstract.js';

export default class ViewTimer extends ViewAbstract {

  constructor(time) {
    super();
    this._time = time;
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

  update(time, blink) {
    this._time = time;
    this.updateCounter();
    this.updateBlinking(blink);
  }

  updateCounter() {
    this._element.innerHTML = `${this._time}`;
  }


  updateBlinking(blink) {
    this._element.classList.toggle(`blinking`, blink);
  }

}
