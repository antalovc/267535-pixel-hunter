import ViewStats from '../view/view-stats.js';

export default class PresenterStats {

  constructor(app) {
    this._app = app;
    this._statsView = new ViewStats(app);
  }

  init() {
    this._statsView.update(this._app);
    this._app.setScreen(this, this._app.HAS_HEADER);
  }

  get element() {
    return this._statsView.element;
  }
}
