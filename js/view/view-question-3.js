import ViewQuestionAbstract from './view-question-abstract.js';

export default class ViewQuestion3 extends ViewQuestionAbstract {

  get template() {
    return `
    ${this.taskElement}
    <form class="${ViewQuestionAbstract.CLASS_GAME_CONTENT}  game__content--triple">
      ${this.picturesElements}
    </form>`;
  }

  get picturesElements() {
    return this._currentQuestion.pictures.reduce((result, picture) => {
      return result + `
      <div class="${ViewQuestionAbstract.CLASS_GAME_OPTION}" width="${picture.width}" height="${picture.height}">
      </div>\n`;
    }, ``);
  }

  bind() {
    Array.from(this.element.querySelectorAll(`.${ViewQuestionAbstract.CLASS_GAME_OPTION}`)).forEach((element) => {
      element.addEventListener(`click`, (evt) => {
        this.onSubAnswer(parseInt(evt.target.querySelector(`img`).alt.slice(-1), 10));
      });
    });
  }

  update(game) {
    this._currentQuestion = game.currentQuestion;
    this._currentQuestion.pictures.forEach((picture, index) => {
      this.replaceImageElement(picture, index);
    });
    super.update(game);
  }

  addInnerViews() {
    const pictures = this._currentQuestion.pictures;
    this._element.querySelectorAll(`.${ViewQuestionAbstract.CLASS_GAME_OPTION}`).forEach((optionElement, index) => {
      optionElement.insertAdjacentElement(`afterbegin`, this.getImageElement(pictures[index]));
    });
  }

  onSubAnswer() {
  }

}
