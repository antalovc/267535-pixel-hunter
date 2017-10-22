const TIME_TICK = 1; // seconds
const TIME_MSEC_TO_SEC = 1000;
const TIME_MAX = 30; // seconds

class Timer {

  constructor(callback, timeout) {
    this.initialise(callback, timeout);
  }

  initialise(callback, timeout) {
    this._timeLeft = timeout > 0 ? timeout : TIME_MAX;
    this._timeElapsed = 0;
    this._callback = callback;
    this._timer = null;
  }

  tick() {
    this._timeLeft--;
    this._timeElapsed++;
    this.onTick(this._timeElapsed);
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

  onTick() {
  }
}

export default (timeout, callback) => {
  const timer = new Timer(timeout, callback);
  timer.start();
  return timer;
};


