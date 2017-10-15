const TICK_TIME = 1; // seconds
const TIME_MSEC_TO_SEC = 1000;

class Timer {

  constructor(timeout, callback) {
    this.initialise(timeout, callback);
  }

  initialise(timeout, callback) {
    this._timeLeft = timeout > 0 ? timeout : 0;
    this._timeElapsed = 0;
    this._callback = callback;
    this._timer = null;
  }

  tick() {
    this._timeLeft--;
    this._timeElapsed++;
    if (!this._timeLeft) {
      this.stop();
      this._call();
    }
  }

  start() {
    const me = this;
    if (me._timeLeft) {
      this._timer = setInterval(() => {
        me.tick();
      }, TICK_TIME * TIME_MSEC_TO_SEC);
    } else {
      me._call();
    }
  }

  stop() {
    clearInterval(this._timer);
  }

  reset(timeout, callback) {
    clearInterval(this._timer);
    this.initialise(timeout, callback);
  }

  get timeLeft() {
    return this._timeLeft;
  }

  get timeElapsed() {
    return this._timeElapsed;
  }

  _call() {
    if (typeof this._callback === `function`) {
      this._callback();
    }
  }
}

export default (timeout, callback) => {
  return new Timer(timeout, callback);
};


