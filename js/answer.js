export default class Answer {

  constructor(isValid, time) {
    this._time = time;
    this._isValid = isValid;
  }

  isValid() {
    return this._isValid;
  }

  getTime() {
    return this._time;
  }

}

