export default class Timer {

  constructor() {
    this._time = 0;
    this._timer = null;
  }

  start() {
    this._timer = setInterval(() => {
      this._time++;
    }, 1000);
  }

  stop() {
    clearInterval(this._timer);
  }

  reset() {
    clearInterval(this._timer);
    this._time = 0;
  }

  getTime() {
    return this._time;
  }

}

