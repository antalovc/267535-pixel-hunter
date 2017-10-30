import ViewAbstract from './view-abstract.js';

export default class ViewStats extends ViewAbstract {

  constructor(statistics) {
    super();
    this._statistics = statistics;
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

  update(statistics) {
    this._statistics = statistics;
    this._element = null;
  }

  addInnerViews() {
    this.element.appendChild(this._statistics.statsTable.element);
  }

}
