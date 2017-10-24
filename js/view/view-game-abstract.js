import ViewAbstract from './view-abstract.js';

export default class ViewGameAbstract extends ViewAbstract {

  constructor(game) {
    super();
    this._currentQuestion = game.currentQuestion;
    this._statistics = game.statistics;
  }

  get templateTag() {
    return `div`;
  }

  get templateClass() {
    return `game`;
  }

  get templateId() {
    return ``;
  }

  onSubAnswer() {
    throw new Error(`Abstract method called`);
  }

  update(game) {
    this._statistics = game.statistics;
    if (this._statistics.statsBar.element.parentNode !== this.element) {
      this._element.appendChild(this._statistics.statsBar.element);
    }
    return this;
  }

  addInnerViews() {
    this._element.appendChild(this._statistics.statsBar.element);
  }

}
