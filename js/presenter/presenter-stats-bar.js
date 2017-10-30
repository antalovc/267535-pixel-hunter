import ViewStatsBar from '../view/view-stats-bar';

export default class PresenterStatsBar {

  constructor(statistics) {
    this._statsBarView = new ViewStatsBar(statistics);
  }

  update(statistics) {
    this._statsBarView.update(statistics);
  }

  get element() {
    return this._statsBarView.element;
  }

}
