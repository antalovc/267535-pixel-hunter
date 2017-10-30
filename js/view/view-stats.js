import ViewAbstract from './view-abstract.js';

export default class ViewStats extends ViewAbstract {

  constructor(statistics, previousStatistics) {
    super();
    this._statistics = statistics;
    this._previousStatistics = previousStatistics;
  }

  get template() {
    return `<h1>${this._statistics.lives ? `Победа!` : `Поражение`}</h1>`;
  }

  get templateTag() {
    return `div`;
  }

  get templateClass() {
    return `result`;
  }

  get templateId() {
    return ``;
  }

  update(statistics, previousStatistics) {
    this._statistics = statistics;
    this._previousStatistics = previousStatistics;
    const header = this.element.removeChild(this.element.querySelector(`h1`));
    this.element.innerHTML = ``;
    this.element.appendChild(header);
    this.addInnerViews();
  }

  addInnerViews() {
    this.element.appendChild(this._statistics.statsTable.element);
    this._previousStatistics.forEach((previousStatistic, index) => {
      previousStatistic.statsTable.index = index + 1;
      this.element.appendChild(previousStatistic.statsTable.element);
    });
  }

}
