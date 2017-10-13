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

}

