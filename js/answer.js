const TIME_SLOW = 20; // seconds
const TIME_FAST = 20; // seconds

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

  get isFast() {
    return this.time < TIME_FAST;
  }

  get isSlow() {
    return this.time > TIME_SLOW;
  }
}

