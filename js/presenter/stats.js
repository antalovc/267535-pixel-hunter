import ViewStats from '../view/view-stats.js';

class Stats {

  constructor(app) {
    this._app = app;
    this._statsView = new ViewStats(app.main);
  }

  init() {
    this._statsView.update(this._app.main);
    this._app.setScreen(this, this._app.HAS_HEADER);
  }

  get element() {
    return this._statsView.element;
  }
}

export default Stats;
