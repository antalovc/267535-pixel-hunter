export default class Answer {

  constructor(isValid, time) {
    this._time = time;
    this._isValid = isValid;
  }

  get isValid() {
    return this._isValid;
  }

  get time() {
    return this._time;
  }

}

