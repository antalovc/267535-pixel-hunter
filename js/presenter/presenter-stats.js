import ViewStats from '../view/view-stats.js';

export default class PresenterStats {

  constructor(app) {
    this._statsView = new ViewStats(app.game.statistics);
  }

  init(app, previousStatistics) {
    this._statsView.update(app.game.statistics, previousStatistics);
    app.setScreen(this, app.HAS_HEADER);
  }

  get element() {
    return this._statsView.element;
  }
}
