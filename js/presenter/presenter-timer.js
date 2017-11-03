import ViewTimer from '../view/view-timer.js';

export default class PresenterTimer {

  constructor(app) {
    this._timer = app.timer;
    this._timerView = new ViewTimer(app.timer.timeLeft);
    this._timer.onTick = () => {
      this._timerView.update(this._timer.timeLeft, this._timer.isLow());
    };
  }

  get element() {
    return this._timerView.element;
  }

  init() {
    this._timerView.update(this._timer.timeLeft, this._timer.isLow());
  }

}
