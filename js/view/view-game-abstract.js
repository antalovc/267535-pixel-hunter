import ViewAbstract from './view-abstract.js';

export default class ViewGameAbstract extends ViewAbstract {

  constructor(main) {
    super();
    this._currentQuestion = main.game.currentQuestion;
    this._statistics = main.game.statistics;
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

  update(main) {
    this._statistics = main.game.statistics;
    if (this._statistics.statsBar.element.parentNode !== this.element) {
      this._element.appendChild(this._statistics.statsBar.element);
    }
    return this;
  }

  addInnerViews() {
    this._element.appendChild(this._statistics.statsBar.element);
  }

}
