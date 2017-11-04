import ViewAbstract from './view-abstract.js';

export default class ViewStats extends ViewAbstract {

  constructor(statistics, previousStatistics) {
    super();
    this._statistics = statistics;
    this._previousStatistics = previousStatistics;
  }

  get template() {
    return `<h1>${this.headerContents}</h1>`;
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

  get headerContents() {
    return this._statistics ? `${this._statistics.lives ? `Победа!` : `Поражение`}` : ``;
  }

  doUpdate(statistics, previousStatistics) {
    this._statistics = statistics;
    this._previousStatistics = previousStatistics;
    const header = this.element.removeChild(this.element.querySelector(`h1`));
    header.innerHTML = this.headerContents;
    this.element.innerHTML = ``;
    this.element.appendChild(header);
    this.addInnerViews();
  }

  addInnerViews() {
    let indexIncrement = 0;
    if (this._statistics) {
      indexIncrement = 1;
      this.element.appendChild(this._statistics.statsTable.element);
    }
    this._previousStatistics.forEach((previousStatistic, index) => {
      previousStatistic.statsTable.index = index + indexIncrement;
      this.element.appendChild(previousStatistic.statsTable.element);
    });
  }

  needsBind() {
    return false;
  }

  hasInnerViews() {
    return true;
  }

  needsUpdate() {
    return true;
  }

}
