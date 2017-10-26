import ViewStatsBar from '../view/view-stats-bar';

export default class PresenterStatsBar {

  constructor(app) {
    this._statsBarView = new ViewStatsBar(app.game.statistics);
  }

  update(app) {
    this._statsBarView.update(app.game.statistics);
  }

  get element() {
    return this._statsBarView.element;
  }

}
