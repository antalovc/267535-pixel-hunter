import ViewAbstract from './view-abstract.js';

export default class ViewQuestionAbstract extends ViewAbstract {

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

  get taskElement() {
    return `<p class="game__task">${this._currentQuestion.text}</p>`;
  }

  get picturesElements() {
    throw new Error(`Abstract method called`);
  }

  onSubAnswer() {
    throw new Error(`Abstract method called`);
  }

  update(game) {
    this._statistics = game.statistics;
    if (this._statistics.statsBar.element.parentNode !== this.element) {
      this._element.appendChild(this._statistics.statsBar.element);
    }
  }

  addInnerViews() {
    this._element.appendChild(this._statistics.statsBar.element);
  }

}
