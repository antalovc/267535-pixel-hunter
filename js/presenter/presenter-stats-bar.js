import ViewStatsBar from '../view/view-stats-bar.js';

export default class PresenterStatsBar {

  constructor(statistics) {
    this._statsBarView = new ViewStatsBar(statistics);
  }

  get element() {
    return this._statsBarView.element;
  }

  init(statistics) {
    this._statsBarView.update(statistics);
  }

}
