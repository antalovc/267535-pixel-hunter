import ViewStatsTable from '../view/view-stats-table.js';

export default class PresenterStatsTable {

  constructor(statistics, index) {
    this._statsTableView = new ViewStatsTable(statistics, index || 0);
  }

  update(statistics, index) {
    this._statsTableView.update(statistics, index || 0);
  }

  get element() {
    return this._statsTableView.element;
  }

}
