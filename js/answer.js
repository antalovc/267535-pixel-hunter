export default class Answer {

  constructor(isCorrect, time) {
    this._time = time;
    this._isCorrect = isCorrect;
  }

  get isCorrect() {
    return this._isCorrect;
  }

  get time() {
    return this._time;
  }

  isFast() {
    return this.time < Answer.FAST_TIME;
  }

  isSlow() {
    return this.time > Answer.SLOW_TIME;
  }

  static get SLOW_TIME() {
    return 20;
  }

  static get FAST_TIME() {
    return 10;
  }
}

