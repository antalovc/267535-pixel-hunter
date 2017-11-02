import ViewStats from '../view/view-stats.js';

export default class PresenterStats {

  constructor(app) {
    this._statsView = new ViewStats(app.game ? app.game.statistics : null);
  }

  init(app, previousStatistics) {
    this._statsView.update(app.game ? app.game.statistics : null, previousStatistics);
    app.setScreen(this, app.HAS_HEADER);
  }

  get element() {
    return this._statsView.element;
  }
}
