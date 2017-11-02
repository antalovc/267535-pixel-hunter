const TIME_TICK = 1; // seconds
const TIME_MSEC_TO_SEC = 1000;
const TIME_MAX = 30; // seconds
const TIME_LOW = 5; // seconds

class Timer {

  constructor(timeout) {
    this._callback = null;
    this.initialise(timeout);
  }

  get timeLeft() {
    return this._timeLeft;
  }

  get timeElapsed() {
    return this._timeElapsed;
  }

  set callback(callback) {
    this._callback = callback;
  }

  initialise(timeout) {
    this._timeLeft = timeout > 0 ? timeout : TIME_MAX;
    this._timeElapsed = 0;
    this._timer = null;
  }

  tick() {
    this._timeLeft--;
    this._timeElapsed++;
    this.onTick();
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
      }, TIME_TICK * TIME_MSEC_TO_SEC);
    } else {
      me._call();
    }
  }

  stop() {
    clearInterval(this._timer);
  }

  reset(timeout) {
    clearInterval(this._timer);
    this.initialise(timeout);
  }

  _call() {
    if (typeof this._callback === `function`) {
      this._callback();
    }
  }

  isLow() {
    return this.timeLeft < TIME_LOW;
  }

  onTick() {
  }
}

export default (callback, timeout) => {
  const timer = new Timer(callback, timeout);
  return timer;
};


